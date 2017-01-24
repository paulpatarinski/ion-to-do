import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'history.html'
})
export class HistoryPage {
  completeTodos: Array<{ id: number, text: string }>;
  _storage;
  _completeTodosKey = 'completeTodos';

  constructor(public navCtrl: NavController, public storage: Storage) {
    this._storage = storage;
  }

  loadHistory() {
    return this._storage.ready().then(() => {
      this._storage.get(this._completeTodosKey).then((completed) => {
        this.completeTodos = completed;
      });
    });
  }

  ionViewWillEnter() { // THERE IT IS!!!
    return this.loadHistory();
  }
}