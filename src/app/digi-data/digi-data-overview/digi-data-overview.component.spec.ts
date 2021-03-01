import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigiDataOverviewComponent } from './digi-data-overview.component';

describe('DigiDataOverviewComponent', () => {
  let component: DigiDataOverviewComponent;
  let fixture: ComponentFixture<DigiDataOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigiDataOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DigiDataOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
