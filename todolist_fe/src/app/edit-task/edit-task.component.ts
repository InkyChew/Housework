import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {

  @Input() visible: boolean = false;
  @Input() task?: Task;
  @Output() onSave = new EventEmitter<Task>();
  @Output() onDelete = new EventEmitter<Task>();
  @Output() onVisibleChange = new EventEmitter<boolean>();
  
  options = {
    periods: ["不要重複", "每日", "每週", "每月", "每年"],
    states: [{label: "待完成", value: 0}, {label: "已完成", value: 1}],
    taskers: ["🐨", "🐼", "🐻"]
  }

  save() {
    this.onSave.emit(this.task);
    this.close();
  }

  delete() {
    this.onDelete.emit(this.task);
    this.close();
  }

  close() {
    this.visible = false;
    this.onVisibleChange.emit(this.visible);
  }
}
