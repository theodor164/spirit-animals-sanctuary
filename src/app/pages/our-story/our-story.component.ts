import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-our-story',
  imports: [NgOptimizedImage, RouterModule],
  templateUrl: './our-story.component.html',
  styleUrl: './our-story.component.css',
})
export class OurStoryComponent {}
