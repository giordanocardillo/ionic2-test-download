import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { NativePageTransitions } from 'ionic-native';
import { BackPage } from '../back/back'

@Component({
  selector: 'page-transitions',
  templateUrl: 'transitions.html'
})
export class TransitionsPage {

  constructor(public navCtrl: NavController) {

  }

  animate(animation: string) {
    NativePageTransitions[animation]({});
    this.navCtrl.push(BackPage);
  }

}
