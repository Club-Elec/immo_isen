import { Component, Input } from '@angular/core';

import { IAnnouncement } from '../dto/announcement.interface';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent {

  @Input()
  private announcement: IAnnouncement;

}
