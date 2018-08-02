import { Component } from '@angular/core';

import { DownloadPage } from '../download/download';
import { TransitionsPage } from '../transitions/transitions';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = DownloadPage;
  tab2Root: any = TransitionsPage;

  constructor() {

  }
}
