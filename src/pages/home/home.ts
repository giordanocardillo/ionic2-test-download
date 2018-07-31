import { Component } from '@angular/core';
import { FileOpener, FileEntry, Transfer } from 'ionic-native';
import { Platform } from 'ionic-angular';
import * as path from 'path';

declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public platform: Platform) {
  }

  openPDF(https = false) {
    this.platform.ready().then(() => {

      try {
        const fileTransfer = new Transfer();
        let fileURL = 'http://www.orimi.com/pdf-test.pdf';
        if (https) {
          fileURL = 'https://www.adobe.com/content/dam/acom/en/devnet/pdf/pdfs/pdf_reference_archives/PDFReference.pdf';
        }
        const storageDirectory = this.platform.is('android') ? cordova.file.externalCacheDirectory : cordova.file.tempDirectory;
        const fileDownloadPath = storageDirectory + path.basename(fileURL);

        fileTransfer.download(encodeURI(fileURL), fileDownloadPath, true)
          .then((downloaded: FileEntry) => {
            console.info(downloaded);
            FileOpener.open(downloaded.toURL(), 'application/pdf')
              .catch((err) => {

                console.error(err);
              });
          }).catch((err) => {
            console.error("ERRORING");
            console.error(err);
          })
      } catch (err) {
        console.error(err);
      }
    });
  }
}
