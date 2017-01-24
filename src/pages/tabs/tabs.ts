import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { HistoryPage } from '../history/history';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
todos;
history;

  constructor() {
  this.todos = HomePage;
  this.history = HistoryPage;

  }
}