import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutCreateStep1Component } from './workout-create-step1.component';

describe('WorkoutCreateStep1Component', () => {
  let component: WorkoutCreateStep1Component;
  let fixture: ComponentFixture<WorkoutCreateStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutCreateStep1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutCreateStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
