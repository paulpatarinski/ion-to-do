import * as Raven from 'raven-js';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Storage } from '@ionic/storage';
import { OnFocusDirective } from '../components/input-clear';
import { RavenErrorHandler } from '../components/raven-error-handler';

Raven
  .config('https://330077f0dcce472d99af81c727d78157@sentry.io/131557')
  .install();

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    OnFocusDirective
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [{provide: ErrorHandler, useClass: RavenErrorHandler}, Storage]
})
export class AppModule {}
