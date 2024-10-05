import { Component } from '@angular/core';
import { Task, WorkSearchParam } from '../models/task';
import { WorkService } from '../services/work.service';

@Component({
  selector: 'app-week-tasks',
  templateUrl: './week-tasks.component.html',
  styleUrls: ['./week-tasks.component.css']
})
export class WeekTasksComponent {

  title: string = "家事週計劃";
  weekTasks = this._service.initWeekTasks();

  constructor(private _service: WorkService) { }

  ngOnInit() {
    this.getTasks();    
  }

  getTasks() {
    const {sun, sat} = this._service.getCurrentWeekRange();
    const params = {...new WorkSearchParam(), startDate: sun, endDate: sat};
    this._service.getAll(params).subscribe(tasks => {
      this.weekTasks = this._service.groupByDate(tasks);
    });
  }  
  
  add(task: Task) {
    this._service.post(task).subscribe(() => this.getTasks());
  }

  edit(task: Task) {
    this._service.put(task).subscribe(() => this.getTasks());
  }

  delete(task: Task) {
    this._service.delete(task.id).subscribe(() => this.getTasks());
  }

  draggedTask?: {dayIndex: number, taskIndex: number};
  dragStart(dayIndex: number, taskIndex: number) {
    this.draggedTask = {dayIndex, taskIndex};
  }
  drop(dropIndex: number) {
    if (this.draggedTask) {
      const {dayIndex, taskIndex} = this.draggedTask;
      const task = this.weekTasks[dayIndex].tasks[taskIndex];
      if(dayIndex != dropIndex) {
        task.date = this.weekTasks[dropIndex].date;
        this.edit(task);
      }
    }
  }

  isAdd: boolean = false;
  isEdit: boolean = false;
  editTask?: Task;

  showAddDialog() {
    this.isAdd = true;
  }
  showEditDialog(task: any) {
    this.isEdit = true;
    this.editTask = {...task, date: new Date(task.date)};
  }
}
