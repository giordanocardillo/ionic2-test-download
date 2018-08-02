import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { NativePageTransitions } from 'ionic-native';
import { BackPage } from '../back/back'

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }

  animate(animation: string) {
    NativePageTransitions[animation]({});
    this.navCtrl.push(BackPage);
  }

}
