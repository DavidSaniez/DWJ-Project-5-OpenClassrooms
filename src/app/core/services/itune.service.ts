import {ItunesMusic, Results} from '../models/itunesMusic';
import {HttpClient, HttpParams} from '@angular/common/http';
import {APP_CONFIG, AppConfig} from '../../app-config/app-config.module';
import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';
import {map} from 'rxjs/operators';
import {replaceTsWithNgInErrors} from '@angular/compiler-cli/src/ngtsc/diagnostics';
import {Music} from '../models/music';

@Injectable()
export class ItuneService {
  public query: string;
  public music: ItunesMusic[];

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {

  }

  private searchResultsSubject = new BehaviorSubject<Music[]>(null);

  public searchMusic(queryTitle: string) {
    this.query = queryTitle;
    const params = new HttpParams().set('term', this.query).set('kind', 'song');
    this.http.get<Results>(`${this.config.apiEndPoint}search`,
      {params}).subscribe((response: Results) => this.searchResultsSubject.next(this.formatResults(response)));
  }

  public get searchResults(): Observable<Music[]> {
    return this.searchResultsSubject.asObservable();
  }

  formatResults(response: Results) {
    return response.results.map((music: ItunesMusic) =>
      new Music(music.trackName, music.previewUrl, music.artistName, music.trackId, music.artworkUrl100, music.collectionName));
  }
}
