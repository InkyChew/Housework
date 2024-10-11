import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskerChartComponent } from './tasker-chart.component';

describe('TaskerChartComponent', () => {
  let component: TaskerChartComponent;
  let fixture: ComponentFixture<TaskerChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskerChartComponent]
    });
    fixture = TestBed.createComponent(TaskerChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
