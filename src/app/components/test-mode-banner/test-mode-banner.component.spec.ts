import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModeBannerComponent } from './test-mode-banner.component';

describe('TestModeBannerComponent', () => {
  let component: TestModeBannerComponent;
  let fixture: ComponentFixture<TestModeBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestModeBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestModeBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
