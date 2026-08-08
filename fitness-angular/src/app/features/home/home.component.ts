import { Component } from '@angular/core';
import { HeroBannerComponent } from './components/hero-banner/hero-banner.component';
import { SearchExercisesComponent } from './components/search-exercises/search-exercises.component';
import { ExercisesListComponent } from './components/exercises-list/exercises-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroBannerComponent, SearchExercisesComponent, ExercisesListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
