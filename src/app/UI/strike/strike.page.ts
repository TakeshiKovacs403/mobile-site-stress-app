import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { StressStrikeController } from 'src/app/controller/StressStrikeController';

@Component({
  selector: 'app-strike',
  templateUrl: 'strike.page.html',
  styleUrls: ['strike.page.scss']
})

export class StrikePage {

  constructor(private alertController: AlertController,
    private toastController: ToastController,
    private stressStrikeController: StressStrikeController) { }

  endpointURL = "";
  numberOfRequests = 10;
  requestTimeoutMillis = 1000;

  onClickInitRequests() {

    if (this.validateParameters(this.endpointURL, this.numberOfRequests)) {
      this.stressStrikeController.resetStrikeCounters();
      this.presentConfirm();
    }
  }

  // TODO Implement this method
  // onClickStopRequests() {
  //   console.log('onClickStopRequests');
  //   //Interrupt strike
  //   this.presentToast("Stress strike stopped", 'success');
  //   this.stessStrikeInProgress = false;
  // }

  private async presentConfirm() {
    const alert = await this.alertController.create({
      header: 'Start stress strike?',
      message: 'Are you sure you want to start stress strike?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: async () => {
            this.presentCancelToast();
          }
        },
        {
          text: 'Yes',
          id: 'confirm-button',
          handler: async () => {
            this.stressStrikeController.initRequests(this.endpointURL, this.numberOfRequests, this.requestTimeoutMillis);
          }
        }
      ]
    });

    await alert.present();
  }

  private async presentCancelToast() {
    const toast = await this.toastController.create({
      message: 'Your stress strike as been canceled.',
      duration: 2000,
      position: 'top',
      color: 'primary'
    });
    toast.present();
  }

  private async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: color
    });
    toast.present();
  }

  private validateParameters(endpointURL: string, numberOfRequests: number): boolean {

    var message: string = "";
    var valid: boolean = true;

    var regex = new RegExp("(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})");

    //validate if URL follows HTTP domain pattern
    if (endpointURL === undefined || endpointURL === "" || !regex.test(endpointURL)) {
      message = "The site URL must follow the HTTP domain pattern (https://site.example.com);";
      valid = false;
    }

    //validate if number of requestst has other characters
    if (numberOfRequests === undefined || numberOfRequests <= 0) {
      message = message + "The number of request parameter must be bigger then 0 and can't contain other characters;";
      valid = false;
    }

    //Present error message if validation process fails
    if (!valid) {
      this.presentToast(message, 'danger');
    }

    return valid;
  }
}
