import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutCreateStep2Component } from './workout-create-step2.component';

describe('WorkoutCreateStep2Component', () => {
  let component: WorkoutCreateStep2Component;
  let fixture: ComponentFixture<WorkoutCreateStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutCreateStep2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutCreateStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
