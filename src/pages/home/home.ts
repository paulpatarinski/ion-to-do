import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  todos: Array<{ id: number, text: string, complete: boolean }>;
  todoText;
  _storage;
  _todosKey = 'todos';

  constructor(public navCtrl: NavController, public storage: Storage) {
    this._storage = storage;

    this._storage.ready().then(() => {
      this._storage.get(this._todosKey).then((todos) => {
        if(!todos){
          todos = [];
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
      this.markToDoComplete(selectedToDo);
    }
  }

  markToDoComplete(selectedToDo){
      selectedToDo.complete = true;
      this.saveToDos();
  }

  addToDo(newToDo) {
    this.todos.push({
      id: this.todos.length + 1,
      text: newToDo,
      complete: false
    });

    this.saveToDos();
    this.todoText = "";
  }

  saveToDos(){
    this._storage.set(this._todosKey, this.todos);
  }
}