import { Component } from '@angular/core';
import { IOperTask, Oper, Task, WorkSearchParam } from '../models/task';
import { WorkService } from '../services/work.service';
import { Dialog } from '@angular/cdk/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-week-tasks',
  templateUrl: './week-tasks.component.html',
  styleUrls: ['./week-tasks.component.scss']
})
export class WeekTasksComponent {

  title: string = "家事週計劃";
  weekTasks = this._service.initWeekTasks();
  private _updatePriority$ = this._service.initUpdatePriority$();

  constructor(private _service: WorkService,
    private _dialog: Dialog) {}

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

  openDialog(editTask?: Task): void {
    const data = editTask ? { oper: Oper.Edit, task: editTask } : { oper: Oper.Add, task: new Task() };
  
    const dialogRef = this._dialog.open<IOperTask>(TaskDialogComponent, {data: data});

    dialogRef.closed.subscribe(data => {
      console.log(data);
      if(data) {
        switch(data.oper) {
          case Oper.Delete:
            this.delete(data.task.id);
            break;
          case Oper.Add:
            this.add(data.task);
            break;
          case Oper.Edit:
            this.edit(data.task);
            break;
        }
      }
    });
  }

  add(task: Task) {
    this._service.post(task).subscribe(() => this.getTasks());
  }

  edit(task: Task) {
    this._service.put(task).subscribe(() => this.getTasks());
  }

  delete(id: number) {
    this._service.delete(id).subscribe(() => this.getTasks());
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log("update priority");
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      console.log("update date");
    }
  }
}
