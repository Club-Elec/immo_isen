import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from '../../environments/environment';
import { IAnnouncement } from '../dto/announcement.interface';

@Injectable()
export class AnnouncementService {

  public constructor(private http: Http) { }

  public find(): Promise<IAnnouncement[]> {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${ environment.api }/api/announcement`)
        .subscribe(
          response => resolve(response.json().announcements),
          reject
        );
    });
  }

  public create(announcement: IAnnouncement): Promise<IAnnouncement> {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${ environment.api }/api/announcement`, announcement)
        .subscribe(
          response => resolve(response.json().announcement),
          reject
        );
    });
  }

  public findOne(id: number): Promise<IAnnouncement> {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${ environment.api }/api/announcement/${ id }`)
        .subscribe(
          response => resolve(response.json().announcement),
          reject
        );
    });
  }

  public update(announcement: IAnnouncement): Promise<IAnnouncement> {
    return new Promise((resolve, reject) => {
      this.http
        .put(`${ environment.api }/api/announcement/${ announcement.aid }`, announcement)
        .subscribe(
          response => resolve(response.json().announcement),
          reject
        );
    });
  }

  public delete(id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http
        .delete(`${ environment.api }/api/announcement/${ id }`)
        .subscribe(
          response => resolve(response.json().affected),
          reject
        );
    });
  }
}
