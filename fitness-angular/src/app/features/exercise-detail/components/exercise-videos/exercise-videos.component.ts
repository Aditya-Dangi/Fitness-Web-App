import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { VideoItem } from '../../../../core/models/exercise.model';

@Component({
  selector: 'app-exercise-videos',
  standalone: true,
  imports: [NgIf, NgFor, MatIconModule],
  templateUrl: './exercise-videos.component.html',
  styleUrls: ['./exercise-videos.component.scss'],
})
export class ExerciseVideosComponent {
  @Input() videos: VideoItem[] = [];
  @Input() exerciseName = '';

  get displayVideos(): VideoItem[] {
    return this.videos.slice(0, 3);
  }
}
