import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Subject, forkJoin } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ExerciseService } from '../../core/services/exercise.service';
import { Exercise, VideoItem } from '../../core/models/exercise.model';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { DetailInfoComponent } from './components/detail-info/detail-info.component';
import { ExerciseVideosComponent } from './components/exercise-videos/exercise-videos.component';
import { SimilarExercisesComponent } from './components/similar-exercises/similar-exercises.component';

@Component({
  selector: 'app-exercise-detail',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    LoaderComponent,
    DetailInfoComponent,
    ExerciseVideosComponent,
    SimilarExercisesComponent,
  ],
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.scss'],
})
export class ExerciseDetailComponent implements OnInit, OnDestroy {
  exercise: Exercise | null = null;
  videos: VideoItem[] = [];
  targetExercises: Exercise[] = [];
  equipmentExercises: Exercise[] = [];
  loading = true;
  error: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private exerciseService: ExerciseService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap(params => {
          const id = params.get('id') ?? '';
          this.loading = true;
          this.error = null;
          this.exercise = null;
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return this.exerciseService.getExerciseById(id);
        }),
        switchMap(exercise => {
          this.exercise = exercise;
          return forkJoin({
            videos: this.exerciseService.getExerciseVideos(exercise.name),
            targetExercises: this.exerciseService.getExercisesByTarget(exercise.target),
            equipmentExercises: this.exerciseService.getExercisesByEquipment(exercise.equipment),
          });
        })
      )
      .subscribe({
        next: ({ videos, targetExercises, equipmentExercises }) => {
          this.videos = videos.contents ?? [];
          this.targetExercises = targetExercises;
          this.equipmentExercises = equipmentExercises;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load exercise details. Please try again.';
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
