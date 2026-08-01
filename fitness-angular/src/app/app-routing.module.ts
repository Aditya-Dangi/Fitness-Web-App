import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ExerciseDetailComponent } from './features/exercise-detail/exercise-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'exercise/:id', component: ExerciseDetailComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
