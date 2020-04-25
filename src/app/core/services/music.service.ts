import {Inject, Injectable} from '@angular/core';
import {ItunesMusic} from '../models/itunesMusic';
import {HttpClient} from '@angular/common/http';
import {APP_CONFIG, AppConfig} from '../../app-config/app-config.module';
import {Observable} from 'rxjs';
import {Music} from '../models/music';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private httpClient: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {
  }

  index(): Observable<Music[]> {
    return this.httpClient.get<Music[]>(`${this.config.laravelEndpoint}api/musics`);
  }

  addToPlaylist(music: Music): Observable<Music> {
    return this.httpClient.post<Music>(this.config.laravelEndpoint + 'api/musics', music);
  }
}
