import { Component } from '@angular/core';
import { Transfer, FileEntry } from 'ionic-native';
import { Platform, LoadingController } from 'ionic-angular';
import * as path from 'path';

declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public platform: Platform, public loadingCtrl: LoadingController) {
  }

  openPDF(https = false) {
    const loading = this.loadingCtrl.create({
      content: 'Downloading...'
    });
    try {
      loading.present();
      const fileTransfer = new Transfer();
      let fileURL = 'http://www.orimi.com/pdf-test.pdf';
      if (https) {
        fileURL = 'https://www.adobe.com/content/dam/acom/en/devnet/pdf/pdfs/pdf_reference_archives/PDFReference.pdf';
      }
      const deviceDirectory = this.platform.is('android') ? cordova.file.externalCacheDirectory : cordova.file.tempDirectory;
      const fileDownloadPath = path.join(deviceDirectory, path.basename(fileURL))
      fileTransfer.download(fileURL, fileDownloadPath, true)
        .then((downloaded: FileEntry) => {
          console.info(downloaded, downloaded.toInternalURL());
          /*try {
            loading.dismiss();
            FileOpener.open(downloaded.toInternalURL(), 'application/pdf')
              .catch((err) => {
                loading.dismiss();
                console.error(err);
              });
          } catch (err) {
            console.error(err);
          }*/
        })
        .catch((err) => {
          console.error("ERRORING");
          console.error(err);
        })
    } catch (err) {
      loading.dismiss();
      console.error(err);
    }
  }

}
