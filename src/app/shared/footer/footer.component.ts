import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [MatToolbarModule, NgOptimizedImage, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
