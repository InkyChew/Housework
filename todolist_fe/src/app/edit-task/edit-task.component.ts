import { Component, Inject } from '@angular/core';
import { IOperTask, Oper, Task } from '../models/task';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {

  oper: Oper = this.data.oper;
  task: Task = this.data.task;
  options = {
    periods: [{label: "不要重複", value: 0},
      {label: "每日", value: 1},
      {label: "每週", value: 2},
      {label: "每月", value: 3},
      {label: "每年", value: 4}],
    states: [{label: "待完成", value: 0}, {label: "已完成", value: 1}],
    taskers: ["🐨", "🐼", "🐻"]
  }

  constructor(private _dialogRef: DialogRef<IOperTask>, @Inject(DIALOG_DATA) public data: IOperTask) {}

  getTitle(oper: Oper) {
    switch(oper) {
      case Oper.Delete:
        return "Delete";
      case Oper.Add:
        return "Add";
      case Oper.Edit:
        return "Edit";
    }
  }

  save(oper: Oper) {
    this._dialogRef.close({oper: oper, task: this.task});
  }

  close() {
    this._dialogRef.close();
  }
}
