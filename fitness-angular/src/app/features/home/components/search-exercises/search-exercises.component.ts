import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ExerciseService } from '../../../../core/services/exercise.service';

@Component({
  selector: 'app-search-exercises',
  templateUrl: './search-exercises.component.html',
  styleUrls: ['./search-exercises.component.scss'],
})
export class SearchExercisesComponent implements OnInit {
  searchControl = new FormControl('');

  constructor(readonly exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.exerciseService.loadBodyParts();
    this.exerciseService.loadExercisesByBodyPart('all');
  }

  search(): void {
    const query = (this.searchControl.value ?? '').trim();
    if (!query) return;

    this.exerciseService.searchExercises(query);
    this.searchControl.setValue('');

    setTimeout(() => {
      document.getElementById('exercises')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') this.search();
  }

  selectBodyPart(bodyPart: string): void {
    this.exerciseService.loadExercisesByBodyPart(bodyPart);
    setTimeout(() => {
      document.getElementById('exercises')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  }
}
