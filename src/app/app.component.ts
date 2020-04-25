import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MakeYourPlaylist';

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.authService.getUser();
  }
}
