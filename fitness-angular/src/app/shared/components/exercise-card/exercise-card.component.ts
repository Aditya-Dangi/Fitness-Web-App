import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Exercise } from '../../../core/models/exercise.model';

@Component({
  selector: 'app-exercise-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.scss'],
})
export class ExerciseCardComponent {
  @Input() exercise!: Exercise;
}
