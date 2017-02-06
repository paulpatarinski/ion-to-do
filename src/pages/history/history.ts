import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToDo } from '../models/todo';
import * as _ from 'lodash';

@Component({
  selector: 'page-home',
  templateUrl: 'history.html'
})
export class HistoryPage {
  groupedToDos: Array<string>;
  groups : Array<string>;
  _storage;
  _completeTodosKey = 'completeTodos';

  constructor(public navCtrl: NavController, public storage: Storage) {
    this._storage = storage;
  }

  loadHistory() {
    return this._storage.ready().then(() => {
      this._storage.get(this._completeTodosKey).then((completed) => {
        let completedGroupedByDate =  this.groupToDosByDate(completed);
        this.groups = Object.keys(completedGroupedByDate);
        this.groupedToDos = completedGroupedByDate;
      });
    });
  }

  ionViewWillEnter() {
    return this.loadHistory();
  }

  formatCompletedDate(todo : ToDo){
    todo.completedFormatted = todo.completed.toDateString();

    return todo;
  }

  groupToDosByDate(todos: Array<ToDo>) {
    if(todos)
    {
      todos.map(this.formatCompletedDate); 
      
      let groupedByDate = _.groupBy(todos, 'completedFormatted');

      return groupedByDate;
    }
  }
}