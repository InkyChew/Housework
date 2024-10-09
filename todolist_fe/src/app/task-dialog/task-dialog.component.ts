import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { Oper, IOperTask } from '../models/task';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent {

  oper: Oper = this.data.oper;
  taskForm = new FormGroup({
    name: new FormControl(this.data.task.name, [Validators.required]),
    description: new FormControl(this.data.task.description, [Validators.required]),
    tasker: new FormControl(this.data.task.tasker, [Validators.required]),
    date: new FormControl(this.data.task.date, [Validators.required]),
    period: new FormControl(this.data.task.period, [Validators.required]),
    state: new FormControl(this.data.task.state, [Validators.required]),
  });
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
    console.log(this.taskForm)
    console.log(this.data.task);
    if(this.taskForm.valid) {
      this.data.task.name = this.taskForm.value.name!;
      this.data.task.description = this.taskForm.value.description ?? "";
      this.data.task.tasker = this.taskForm.value.tasker!;
      this.data.task.date = this.taskForm.value.date!;
      this.data.task.period = this.taskForm.value.period!;
      this.data.task.state = this.taskForm.value.state!;
      this._dialogRef.close({oper: oper, task: this.data.task});
    }
  }

  close() {
    this._dialogRef.close();
  }
}
