import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Exercise } from '../../../../core/models/exercise.model';
import { ExerciseCardComponent } from '../../../../shared/components/exercise-card/exercise-card.component';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-similar-exercises',
  standalone: true,
  imports: [NgIf, NgFor, ExerciseCardComponent, LoaderComponent],
  templateUrl: './similar-exercises.component.html',
  styleUrls: ['./similar-exercises.component.scss'],
})
export class SimilarExercisesComponent {
  @Input() targetExercises: Exercise[] = [];
  @Input() equipmentExercises: Exercise[] = [];
}
