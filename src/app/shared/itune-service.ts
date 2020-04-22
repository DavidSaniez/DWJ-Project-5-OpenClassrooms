import {Music, Results} from './music';
import {HttpClient, HttpParams} from '@angular/common/http';
import {APP_CONFIG, AppConfig} from '../app-config/app-config.module';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class ItuneService {
  public query: string;
  public music: Music[];

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {

  }

  public searchMusic(queryTitle: string): Observable<Results> {
    this.query = queryTitle;
    const params = new HttpParams().set('term', this.query).set('kind', 'song');
    return this.http.get<Results>(`${this.config.apiEndPoint}search`, {params});
  }
}
