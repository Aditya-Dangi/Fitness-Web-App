import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ExerciseService } from '../../../../core/services/exercise.service';
import { Exercise } from '../../../../core/models/exercise.model';

@Component({
  selector: 'app-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.scss'],
})
export class ExercisesListComponent implements OnInit, OnDestroy {
  pageSize = 6;
  pageIndex = 0;

  private destroy$ = new Subject<void>();

  constructor(readonly exerciseService: ExerciseService) {}

  ngOnInit(): void {
    // Reset pagination whenever new exercises are loaded
    this.exerciseService.exercises$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => (this.pageIndex = 0));
  }

  getPagedExercises(exercises: Exercise[]): Exercise[] {
    const start = this.pageIndex * this.pageSize;
    return exercises.slice(start, start + this.pageSize);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    document.getElementById('exercises')?.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
