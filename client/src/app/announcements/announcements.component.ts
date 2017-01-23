import { Component, OnInit } from '@angular/core';

import { AnnouncementService } from '../services/announcement.service';
import { IAnnouncement } from '../dto/announcement.interface';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css'],
  providers: [
    AnnouncementService
  ]
})
export class AnnouncementsComponent implements OnInit {

  private announcements: IAnnouncement[];

  constructor(private announcementSvc: AnnouncementService) {
    this.announcements = [];
  }

  ngOnInit() {
    this.announcementSvc
      .find()
      .then(announcements => this.announcements = announcements)
      .catch(console.error);
  }
}
