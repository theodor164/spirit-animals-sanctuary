import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-donate-section',
  imports: [NgOptimizedImage, RouterModule],
  templateUrl: './donate-section.component.html',
  styleUrl: './donate-section.component.css'
})
export class DonateSectionComponent {

}
