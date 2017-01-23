import { Ng2StateDeclaration, Transition } from 'ui-router-ng2';

import { GuestComponent } from './guest/guest.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AnnouncementService } from './services/announcement.service';

export const otherwise = {
  state: 'guest.announcements'
};

export const states: Ng2StateDeclaration[] = [{
  name: 'guest',
  url: '/',
  component: GuestComponent
}, {
  name: 'guest.announcements',
  url: 'announcements',
  component: AnnouncementsComponent
}, {
  name: 'guest.announcement',
  url: 'announcement/:id',
  component: AnnouncementComponent,
  resolve: [{
    token: 'announcement',
    deps: [
      Transition,
      AnnouncementService
    ],
    resolveFn: (transition, announcementSvc) => announcementSvc.findOne(transition.params()['id'])
  }]
}];
