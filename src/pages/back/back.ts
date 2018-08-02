import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-back',
  templateUrl: 'back.html'
})
export class BackPage {

  constructor(public navCtrl: NavController) {

  }

  goBack() {
    this.navCtrl.pop();
  }

}
