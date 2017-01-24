import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      var statusBarOverlayWebView = platform.is('ios');

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.backgroundColorByHexString("#303F9F");
      StatusBar.overlaysWebView(statusBarOverlayWebView)

      Splashscreen.hide();

      //accessing non-ion-native plugins https://www.joshmorony.com/using-cordova-plugins-in-ionic-2-with-ionic-native/
      if((<any>window).plugins && (<any>window).plugins.headerColor)
        (<any>window).plugins.headerColor.tint("#3F51B5");
    });
  }
}
