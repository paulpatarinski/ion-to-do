import { Component } from '@angular/core';
import { NavController, reorderArray } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {ToDo} from '../models/todo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  todos: Array<ToDo>;
  todoText;
  _storage;
  _todosKey = 'todos';
  _completeTodosKey = 'completeTodos';

  constructor(public navCtrl: NavController, public storage: Storage) {
    this._storage = storage;

    this._storage.ready().then(() => {
      this._storage.get(this._todosKey).then((todos) => {
        if (!todos) {
          var defaultToDo = new ToDo();

          defaultToDo.id = 1;
          defaultToDo.text =  "Swipe me to the right to complete...";
          defaultToDo.created = new Date();
          defaultToDo.completed = null;

          todos = new Array<ToDo>(defaultToDo);

          this._storage.set(this._todosKey, todos);
        }

        this.todos = todos;
      });
    });
  }

  itemDragged(slidingItem: ItemSliding, selectedToDo : ToDo) {
    let percent = slidingItem.getSlidingPercent();

    if (percent < -1.8) {
      slidingItem.close();
      this.completeTodo(selectedToDo);
    }
  }

  completeTodo(selectedToDo : ToDo) {
    var selectedToDoIndex = this.todos.indexOf(selectedToDo);

    if (selectedToDoIndex != -1) {
      selectedToDo.completed = new Date();

      this.todos.splice(selectedToDoIndex, 1);
      this.saveToDos();
      this.addToCompletedToDos(selectedToDo);
    }
  }

  addToCompletedToDos(todo : ToDo)
  {
    this._storage.get(this._completeTodosKey).then((completed) => {
        if(!completed){
          return [todo];
        }

        completed.unshift(todo);
        return completed;
      }).then((completed) => {
        this._storage.set(this._completeTodosKey, completed);
      });
  }

  addToDo(newToDoText : string) {
    if (newToDoText) {
      var todo = new ToDo();
      
      todo.id = this.todos.length + 1;
      todo.text = newToDoText;
      todo.created = new Date();
      todo.completed = null;

      this.todos.unshift(todo);
      this.saveToDos();
      this.todoText = "";
    }
  }

  saveToDos() {
    this._storage.set(this._todosKey, this.todos);
  }

  reorderToDos(indexes) {
    this.todos = reorderArray(this.todos, indexes);
    this.saveToDos();
  }
}