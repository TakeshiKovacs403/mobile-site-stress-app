import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfigPage } from './config.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ConfigPageRoutingModule } from './config-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: ConfigPage }]),
    ConfigPageRoutingModule
  ],
  declarations: [ConfigPage]
})
export class ConfigPageModule {}
