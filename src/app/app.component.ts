import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';

declare const cordova: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(private platform: Platform) {
    if (platform.is('cordova')) {
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        let permissions = cordova.plugins.permissions;
        permissions.hasPermission(
          permissions.WRITE_EXTERNAL_STORAGE,
          (status: any) => {
            console.info(status);
            if (!status.hasPermission) {
              permissions.requestPermission(permissions.WRITE_EXTERNAL_STORAGE,
                (status) => {
                  console.info(status);
                },
                (err) => {
                  console.error(err);
                })
            }
          }
        );

        StatusBar.styleDefault();
        Splashscreen.hide();
      });
    }
  }
}
