import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task, WorkSearchParam } from '../models/task';
import { EnvService } from './env.service';
import { of, debounceTime, switchMap, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  constructor(private _http: HttpClient, private _env: EnvService) { }

  getAll(searchParam: WorkSearchParam = new WorkSearchParam()) {
    let params = new HttpParams();
    if(searchParam.tasker) params = params.append("tasker", searchParam.tasker);
    if(searchParam.state) params = params.append("state", searchParam.state);
    if(searchParam.startDate instanceof Date) params = params.append("startDate", searchParam.startDate.toDateString());
    if(searchParam.endDate instanceof Date) params = params.append("endDate", searchParam.endDate.toDateString());

    return this._http.get<Task[]>(this._env.APIOption.work, {params});
  }

  post(task: Task) {
    return this._http.post(this._env.APIOption.work, task);
  }

  put(task: Task) {
    return this._http.put(this._env.APIOption.work, task);
  }


  private _updatePriority$ = new Subject<Task[]>();
  initUpdatePriority$(): Subject<Task[]> {
    this._updatePriority$.pipe(
      debounceTime(300),
      switchMap((tasks) => this.updatePriority(tasks))
    ).subscribe();
    return this._updatePriority$;
  }

  updatePriority(tasks: Task[]) {
    return this._http.patch(this._env.APIOption.work, tasks);
  }

  delete(id: number) {
    return this._http.delete(`${this._env.APIOption.work}/${id}`);
  }

  getCurrentWeekRange(): { sun: Date, sat: Date } {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();
    const currentDay = today.getDay(); 

    const sun = new Date(year, month, date - currentDay);
    const sat = new Date(year, month, date + (6 - currentDay));

    return { sun, sat };
  }

  initWeekTasks(): {day: number, date: Date, tasks: Task[]}[] {
    const weekTasks = new Array();
    const {sun, sat} = this.getCurrentWeekRange();
    while(sun <= sat) {
      weekTasks.push({day: sun.getDay(), date: new Date(sun), tasks: []});
      sun.setDate(sun.getDate()+1);
    }    
    return weekTasks;
  }

  groupByDate(tasks: Task[]): {day: number, date: Date, tasks: Task[]}[] {
    const weekTasks = this.initWeekTasks();

    return weekTasks.map(day => {
      day.tasks = tasks.filter(t => new Date(t.date).toISOString().split('T')[0] === day.date.toISOString().split('T')[0]);
      return day;
    });
  }
}
