import { Component } from '@angular/core';
import { NavController, reorderArray } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  todos: Array<{ id: number, text: string }>;
  todoText;
  _storage;
  _todosKey = 'todos';

  constructor(public navCtrl: NavController, public storage: Storage) {
    this._storage = storage;

    this._storage.ready().then(() => {
      this._storage.get(this._todosKey).then((todos) => {
        if (!todos) {
          todos = [{
            id : 1,
            text : "Swipe me to the right to complete..."
          }];
          this._storage.set(this._todosKey, todos);
        }

        this.todos = todos;
      });
    });
  }

  itemDragged(slidingItem: ItemSliding, selectedToDo) {
    let percent = slidingItem.getSlidingPercent();

    if (percent < -1.8) {
      slidingItem.close();
      this.removeCompletedToDo(selectedToDo);
    }
  }

  removeCompletedToDo(selectedToDo) {
    var selectedToDoIndex = this.todos.indexOf(selectedToDo);

    if (selectedToDoIndex != -1) {
      this.todos.splice(selectedToDoIndex, 1);
      this.saveToDos();
    }
  }

  addToDo(newToDo) {
    if (newToDo) {
      this.todos.unshift({
        id: this.todos.length + 1,
        text: newToDo
      });

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