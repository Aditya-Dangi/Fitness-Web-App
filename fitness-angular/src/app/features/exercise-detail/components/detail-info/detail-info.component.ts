import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { Exercise } from '../../../../core/models/exercise.model';

interface ExerciseDetail {
  icon: string;
  label: string;
  value: string;
}

@Component({
  selector: 'app-detail-info',
  standalone: true,
  imports: [NgFor],
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.scss'],
})
export class DetailInfoComponent {
  @Input() exercise!: Exercise;

  get details(): ExerciseDetail[] {
    return [
      { icon: 'assets/icons/body-part.png', label: 'Body Part', value: this.exercise.bodyPart },
      { icon: 'assets/icons/target.png', label: 'Target Muscle', value: this.exercise.target },
      { icon: 'assets/icons/equipment.png', label: 'Equipment', value: this.exercise.equipment },
    ];
  }
}
