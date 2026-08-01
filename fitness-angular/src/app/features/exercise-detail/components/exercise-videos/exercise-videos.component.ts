import { Component, Input } from '@angular/core';
import { VideoItem } from '../../../../core/models/exercise.model';

@Component({
  selector: 'app-exercise-videos',
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
