import { Injectable } from "@angular/core";
import { LoadingController, ToastController } from "@ionic/angular";
import { UserAgentDTO } from "../DTO/UserAgentDTO";
import { HttpClientUtil } from "../utils/HttpClientUtil";

@Injectable()
export class StressStrikeController {

    inProgress = false;
    //move this into class
    strikes = { sent: 0, awaitResponse: 0, success: 0, failed: 0 };

    loading;

    constructor(private httpClientUtil: HttpClientUtil,
        private toastController: ToastController,
        private loadingController: LoadingController) { }

    public async initRequests(endpointURL, numberOfRequests, requestTimeoutMillis) {

        this.inProgress = true;
        this.strikes.awaitResponse = numberOfRequests;

        for (let index = 0; index < numberOfRequests; index++) {

            this.strikes.sent = index + 1;

            var rndNumber = (Math.floor(Math.random() * 1000) + 1) - 1;
            var userAgent: string = UserAgentDTO.listOfAgents[rndNumber];

            this.httpClientUtil.executeRequest(endpointURL, userAgent, requestTimeoutMillis).then(data => {
                console.log(data.status);
                console.log(data.data);
                this.strikes.success = this.strikes.success + 1;
                this.strikes.awaitResponse = this.strikes.awaitResponse - 1;

                this.isLastCall(numberOfRequests);

            }).catch(error => {
                console.log(error.status);
                console.log(error.error);
                this.strikes.failed = this.strikes.failed + 1;
                this.strikes.awaitResponse = this.strikes.awaitResponse - 1;

                this.isLastCall(numberOfRequests);
            });
        }

    }

    private isLastCall(numberOfRequests) {
        if (numberOfRequests === (this.strikes.success + this.strikes.failed)) {
            this.presentToast("Execution finished!", "success");
            this.inProgress = false;
        }
    }

    //TODO move this into a class
    private async presentToast(message: string, color: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 3000,
            position: 'top',
            color: color
        });
        toast.present();
    }
    
    public resetStrikeCounters() {
        //Reset counters
        this.strikes.sent = 0;
        this.strikes.awaitResponse = 0;
        this.strikes.success = 0;
        this.strikes.failed = 0;
    }
}