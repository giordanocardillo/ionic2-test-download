import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TransitionsPage } from '../pages/transitions/transitions';
import { BackPage } from '../pages/back/back';
import { DownloadPage } from '../pages/download/download';
import { TabsPage } from '../pages/tabs/tabs';
import { FileService } from '../file.service';

@NgModule({
  declarations: [
    MyApp,
    TransitionsPage,
    DownloadPage,
    TabsPage,
    BackPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TransitionsPage,
    DownloadPage,
    TabsPage,
    BackPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FileService
  ]
})
export class AppModule { }
