import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Exercise, VideoItem } from '../models/exercise.model';

@Injectable({ providedIn: 'root' })
export class ExerciseService {
  private exerciseHeaders = new HttpHeaders({
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    'X-RapidAPI-Key': environment.rapidApiKey,
  });

  private youtubeHeaders = new HttpHeaders({
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
    'X-RapidAPI-Key': environment.youtubeApiKey,
  });

  // Shared reactive state
  readonly exercises$ = new BehaviorSubject<Exercise[] | null>(null);
  readonly bodyParts$ = new BehaviorSubject<string[]>([]);
  readonly selectedBodyPart$ = new BehaviorSubject<string>('all');
  readonly loading$ = new BehaviorSubject<boolean>(false);
  readonly error$ = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  /**
   * The ExerciseDB v2 CDN requires the RapidAPI key to serve images.
   * Since browsers cannot send custom headers via <img src>, we append
   * the key as a query parameter so the CDN authenticates the request.
   */
  private fixGifUrl(url: string): string {
    if (!url) return url;
    const sep = url.includes('?') ? '&' : '?';
    return `${url}${sep}rapidapi-key=${environment.rapidApiKey}`;
  }

  private patchExercise(ex: Exercise): Exercise {
    const resolvedGifUrl = ex?.gifUrl
      ? this.fixGifUrl(ex.gifUrl)
      : `${environment.exerciseDbBaseUrl}/image?exerciseId=${encodeURIComponent(
          ex.id
        )}&resolution=180&rapidapi-key=${environment.rapidApiKey}`;

    return { ...ex, gifUrl: resolvedGifUrl };
  }

  private patchList(list: Exercise[]): Exercise[] {
    return list.map(ex => this.patchExercise(ex));
  }

  loadBodyParts(): void {
    this.http
      .get<string[]>(`${environment.exerciseDbBaseUrl}/exercises/bodyPartList`, {
        headers: this.exerciseHeaders,
      })
      .pipe(catchError(() => of([])))
      .subscribe(parts => this.bodyParts$.next(['all', ...parts]));
  }

  loadExercisesByBodyPart(bodyPart: string): void {
    this.loading$.next(true);
    this.error$.next(null);
    this.selectedBodyPart$.next(bodyPart);

    const url =
      bodyPart === 'all'
        ? `${environment.exerciseDbBaseUrl}/exercises`
        : `${environment.exerciseDbBaseUrl}/exercises/bodyPart/${bodyPart}`;

    this.http
      .get<Exercise[]>(url, { headers: this.exerciseHeaders })
      .pipe(
        map(exercises => this.patchList(exercises)),
        catchError(() => {
          this.error$.next('Failed to load exercises. Please try again.');
          return of([]);
        }),
        finalize(() => this.loading$.next(false))
      )
      .subscribe(exercises => this.exercises$.next(exercises));
  }

  searchExercises(query: string): void {
    this.loading$.next(true);
    this.error$.next(null);

    this.http
      .get<Exercise[]>(`${environment.exerciseDbBaseUrl}/exercises`, {
        headers: this.exerciseHeaders,
      })
      .pipe(
        catchError(() => {
          this.error$.next('Search failed. Please try again.');
          return of([]);
        }),
        finalize(() => this.loading$.next(false))
      )
      .subscribe(exercises => {
        const q = query.toLowerCase();
        const filtered = exercises.filter(
          e =>
            e.name.toLowerCase().includes(q) ||
            e.target.toLowerCase().includes(q) ||
            e.equipment.toLowerCase().includes(q) ||
            e.bodyPart.toLowerCase().includes(q)
        );
        this.exercises$.next(this.patchList(filtered));
      });
  }

  getExerciseById(id: string): Observable<Exercise> {
    return this.http
      .get<Exercise>(`${environment.exerciseDbBaseUrl}/exercises/exercise/${id}`, {
        headers: this.exerciseHeaders,
      })
      .pipe(map(ex => this.patchExercise(ex)));
  }

  getExercisesByTarget(target: string): Observable<Exercise[]> {
    return this.http
      .get<Exercise[]>(`${environment.exerciseDbBaseUrl}/exercises/target/${target}`, {
        headers: this.exerciseHeaders,
      })
      .pipe(map(list => this.patchList(list)), catchError(() => of([])));
  }

  getExercisesByEquipment(equipment: string): Observable<Exercise[]> {
    return this.http
      .get<Exercise[]>(`${environment.exerciseDbBaseUrl}/exercises/equipment/${equipment}`, {
        headers: this.exerciseHeaders,
      })
      .pipe(map(list => this.patchList(list)), catchError(() => of([])));
  }

  getExerciseVideos(name: string): Observable<{ contents: VideoItem[] }> {
    return this.http
      .get<{ contents: VideoItem[] }>(
        `${environment.youtubeSearchUrl}/search?query=${encodeURIComponent(name)} exercise`,
        { headers: this.youtubeHeaders }
      )
      .pipe(catchError(() => of({ contents: [] })));
  }
}
