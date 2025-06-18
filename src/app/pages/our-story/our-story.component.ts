import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-our-story',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-story.component.html',
  styleUrls: ['./our-story.component.css'],
})
export class OurStoryComponent {
  // Nu este necesară nicio logică specifică pentru această componentă statică
}
