import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-body-part-card',
  templateUrl: './body-part-card.component.html',
  styleUrls: ['./body-part-card.component.scss'],
})
export class BodyPartCardComponent {
  @Input() bodyPart!: string;
  @Input() selected = false;
  @Output() bodyPartSelected = new EventEmitter<string>();

  select(): void {
    this.bodyPartSelected.emit(this.bodyPart);
  }
}
