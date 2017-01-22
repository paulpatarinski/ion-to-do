import {Pipe} from '@angular/core';

// Tell Angular2 we're creating a Pipe with TypeScript decorators
@Pipe({
  name: 'toDoNotCompletePipe',
  pure : false
})

export class toDoNotCompletePipe {

  // Transform is the new "return function(value, args)" in Angular 1.x
  transform(todos, args?) {
    if(!todos)
      return false;
    
    return todos.filter(todo => {
      return !todo.complete;
    });
  }
}