import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StrikePage } from './strike.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { StrikePageRoutingModule } from './strike-routing.module';
import { StressStrikeController } from 'src/app/controller/StressStrikeController';
import { HttpClientUtil } from 'src/app/utils/HttpClientUtil';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    StrikePageRoutingModule,
  ],
  declarations: [StrikePage],
  providers: [
    StressStrikeController,
    HttpClientUtil,
    HTTP
  ]
})
export class StrikePageModule {}
