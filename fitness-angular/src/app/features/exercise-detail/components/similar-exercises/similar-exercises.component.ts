import { Component, Input } from '@angular/core';
import { Exercise } from '../../../../core/models/exercise.model';

@Component({
  selector: 'app-similar-exercises',
  templateUrl: './similar-exercises.component.html',
  styleUrls: ['./similar-exercises.component.scss'],
})
export class SimilarExercisesComponent {
  @Input() targetExercises: Exercise[] = [];
  @Input() equipmentExercises: Exercise[] = [];
}
