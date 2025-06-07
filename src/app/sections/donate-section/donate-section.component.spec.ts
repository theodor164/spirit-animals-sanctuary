import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateSectionComponent } from './donate-section.component';

describe('DonateSectionComponent', () => {
  let component: DonateSectionComponent;
  let fixture: ComponentFixture<DonateSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonateSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonateSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
