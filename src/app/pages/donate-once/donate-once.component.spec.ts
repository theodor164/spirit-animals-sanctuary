import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateOnceComponent } from './donate-once.component';

describe('DonateOnceComponent', () => {
  let component: DonateOnceComponent;
  let fixture: ComponentFixture<DonateOnceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonateOnceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonateOnceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
