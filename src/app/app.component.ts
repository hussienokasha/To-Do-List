import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
  ],
})
export class AppComponent implements OnInit {
  ArrOfTasks: any[] = [];
  ngOnInit(): void {
    this.getTaskFromLocal();
  }
  addToList(label: string) {
    const task = { data: label, id: Date.now(), isCompleted: false };
    if (label == '') {
      return;
    }
    this.ArrOfTasks.push(task);
    localStorage.setItem('task', JSON.stringify(this.ArrOfTasks));
  }
  delete(id: number) {
    let newArr = this.ArrOfTasks.filter((t) => t.id != id);
    localStorage.clear();
    localStorage.setItem('task', JSON.stringify(newArr));
    this.ArrOfTasks = newArr;
  }
  getTaskFromLocal() {
    const task = localStorage.getItem('task');

    if (task) {
      const parsedTask = JSON.parse(task);
      this.ArrOfTasks.push(...parsedTask);
    }

    return this.ArrOfTasks;
  }
  isCompletedFn(id: number) {
    this.ArrOfTasks.forEach((task) => {
      if (id == task.id) {
        task.isCompleted = !task.isCompleted;
      }
    });
    localStorage.clear();
    localStorage.setItem('task', JSON.stringify(this.ArrOfTasks));
    return this.ArrOfTasks;
  }
}
