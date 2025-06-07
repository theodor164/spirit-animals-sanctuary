import { Component } from '@angular/core';
import { AboutUsComponent } from '../../sections/about-us/about-us.component';
import { OurImpactComponent } from "../../sections/our-impact/our-impact.component";
import { DonateSectionComponent } from '../../sections/donate-section/donate-section.component';

@Component({
  selector: 'app-home',
  imports: [AboutUsComponent, OurImpactComponent, DonateSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
