import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'exercise/:id',
    loadComponent: () =>
      import('./features/exercise-detail/exercise-detail.component').then(
        m => m.ExerciseDetailComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
