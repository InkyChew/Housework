import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

  @Input() visible: boolean = false;
  @Output() onSave = new EventEmitter<Task>();
  @Output() onVisibleChange = new EventEmitter<boolean>();
  
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

  save() {
    this.onSave.emit(this.task);
    this.close();
  }

  close() {
    this.visible = false;
    this.task = new Task();
    this.onVisibleChange.emit(this.visible);
  }
}
