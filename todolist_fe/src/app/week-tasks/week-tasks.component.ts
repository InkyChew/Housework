import { Component } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-week-tasks',
  templateUrl: './week-tasks.component.html',
  styleUrls: ['./week-tasks.component.css']
})
export class WeekTasksComponent {

  title: string = "家事週計劃";
  weekTasks = [
    {week: 7, tasks: [{tasker: "🐨", name: "清理陽台", state: 1, date: new Date("2024-09-29")}]},
    {week: 1, tasks: [{tasker: "🐻", name: "清理臥室", state: 0, date: new Date("2024-09-30")}]},
    {week: 2, tasks: [{tasker: "🐻‍❄️", name: "倒垃圾", state: 0, date: new Date("2024-10-01")}]},
    {week: 3, tasks: [{tasker: "🐨", name: "洗衣服", state: 1, date: new Date("2024-10-02")}]},
    {week: 4, tasks: [{tasker: "🐼", name: "清理浴室", state: 0, date: new Date("2024-10-03")}]},
    {week: 5, tasks: [{tasker: "🐻", name: "清理冰箱", state: 1, date: new Date("2024-10-04")}]},
    {week: 6, tasks: [{tasker: "🐨", name: "採買物品", state: 1, date: new Date("2024-10-05")}]}
  ];
  draggedTask = new Array(2);

  dragStart(w: number, t: number) {
    this.draggedTask = [w, t];
  }

  drop(i: number) {
    if (this.draggedTask) {
      const draggedWeekIndex = this.draggedTask[0];
      const draggedTaskIndex = this.draggedTask[1];
      const task = this.weekTasks[draggedWeekIndex].tasks[draggedTaskIndex];
      this.weekTasks[i].tasks.push(task);
      this.weekTasks[draggedWeekIndex].tasks.splice(draggedTaskIndex, 1);
      this.draggedTask = [];
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
    this.editTask = task;
  }
  
  add(e: any) {
    console.log(e);
    
    // this.add = false;
  }

  edit(e: any) {
    console.log(e);
    // this.edit = false
  }

  delete(e: any) {
    console.log(e);
    // this.edit = false
  }
}
