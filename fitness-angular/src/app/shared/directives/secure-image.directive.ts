import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Fetches authenticated images from the ExerciseDB RapidAPI endpoint.
 *
 * Browsers cannot attach custom headers to <img src>, so images behind
 * RapidAPI auth are fetched via HttpClient (with headers), converted to
 * an object URL, and set as the element's src attribute.
 *
 * Usage: <img [appSecureImage]="exercise.gifUrl" alt="..." />
 */
@Directive({
  selector: 'img[appSecureImage]',
})
export class SecureImageDirective implements OnChanges, OnDestroy {
  @Input('appSecureImage') url = '';

  private blobUrl: string | null = null;
  private sub: Subscription | null = null;

  private readonly headers = new HttpHeaders({
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    'X-RapidAPI-Key': environment.rapidApiKey,
  });

  constructor(
    private el: ElementRef<HTMLImageElement>,
    private http: HttpClient
  ) {}

  ngOnChanges(): void {
    this.cleanup();
    if (!this.url) return;

    const img = this.el.nativeElement;
    img.src = '';

    this.sub = this.http
      .get(this.url, { headers: this.headers, responseType: 'blob' })
      .subscribe({
        next: blob => {
          this.blobUrl = URL.createObjectURL(blob);
          img.src = this.blobUrl;
        },
        error: () => {
          // Fallback to the raw URL — might work if CDN allows public access
          img.src = this.url;
        },
      });
  }

  private cleanup(): void {
    this.sub?.unsubscribe();
    this.sub = null;
    if (this.blobUrl) {
      URL.revokeObjectURL(this.blobUrl);
      this.blobUrl = null;
    }
  }

  ngOnDestroy(): void {
    this.cleanup();
  }
}
