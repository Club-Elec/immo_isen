import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { UIRouterModule } from 'ui-router-ng2';

import { AppComponent } from './app.component';
import { states, otherwise } from './app.state';
import { AnnouncementComponent } from './announcement/announcement.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { GuestComponent } from './guest/guest.component';
import { AnnouncementService } from './services/announcement.service';

@NgModule({
  declarations: [
    AppComponent,
    AnnouncementComponent,
    AnnouncementsComponent,
    GuestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    UIRouterModule.forRoot({ states, otherwise, useHash: true })
  ],
  providers: [AnnouncementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
