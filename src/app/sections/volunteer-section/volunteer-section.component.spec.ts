import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerSectionComponent } from './volunteer-section.component';

describe('VolunteerSectionComponent', () => {
  let component: VolunteerSectionComponent;
  let fixture: ComponentFixture<VolunteerSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolunteerSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
