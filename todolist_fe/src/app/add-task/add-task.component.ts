import { Component } from '@angular/core';
import { Task } from '../models/task';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  
  task: Task = new Task();
  options = {
    periods: [{label: "不要重複", value: 0},
      {label: "每日", value: 1},
      {label: "每週", value: 2},
      {label: "每月", value: 3},
      {label: "每年", value: 4}],
    states: [{label: "待完成", value: 0}, {label: "已完成", value: 1}],
    taskers: ["🐨", "🐼", "🐻"]
  };

  constructor(private _dialogRef: DialogRef<Task>) {}

  save() {
    this._dialogRef.close(this.task);
  }

  close() {
    this._dialogRef.close();
  }
}
