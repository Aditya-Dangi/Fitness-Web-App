import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ExerciseService } from '../../../../core/services/exercise.service';
import { BodyPartCardComponent } from '../../../../shared/components/body-part-card/body-part-card.component';

@Component({
  selector: 'app-search-exercises',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    BodyPartCardComponent,
  ],
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
