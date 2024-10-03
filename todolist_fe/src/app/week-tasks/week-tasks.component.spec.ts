import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekTasksComponent } from './week-tasks.component';

describe('WeekTasksComponent', () => {
  let component: WeekTasksComponent;
  let fixture: ComponentFixture<WeekTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeekTasksComponent]
    });
    fixture = TestBed.createComponent(WeekTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
