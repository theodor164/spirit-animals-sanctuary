import { Component } from '@angular/core';
import { AboutUsComponent } from '../../sections/about-us/about-us.component';
import { OurImpactComponent } from "../../sections/our-impact/our-impact.component";

@Component({
  selector: 'app-home',
  imports: [AboutUsComponent, OurImpactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
