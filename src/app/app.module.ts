import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatButtonModule} from '@angular/material/button';
import {NgMatSearchBarModule} from 'ng-mat-search-bar';
import {PlaylistComponent} from './components/playlist/playlist.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppConfigModule} from './app-config/app-config.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ItuneService} from './core/services/itune.service';
import {MusicListComponent} from './components/music-list/music-list.component';
import {HttpXsrfInterceptor} from './core/interceptors/http-xsrf.interceptor';
import {CredentialInterceptor} from './core/interceptors/credentials.interceptor';
import {LoginDialogComponent} from './shared/dialogs/login-dialog/login-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {CheckAuthInterceptor} from './core/interceptors/check-auth.interceptor';
import {AuthService} from './core/services/auth.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {ToastrModule} from 'ngx-toastr';
import {RegisterDialogComponent} from './shared/dialogs/register-dialog/register-dialog/register-dialog.component';
import {JwtModule} from "@auth0/angular-jwt";
import {getToken} from "codelyzer/angular/styles/cssLexer";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PlaylistComponent,
    MusicListComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FontAwesomeModule,
    MatButtonModule,
    NgMatSearchBarModule,
    ReactiveFormsModule,
    FormsModule,
    AppConfigModule,
    HttpClientModule,
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
    ToastrModule.forRoot({timeOut: 2000, positionClass: 'toast-bottom-right'}),
  ],
  providers: [
    ItuneService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CredentialInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpXsrfInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CheckAuthInterceptor,
      multi: true
    }
  ],
  entryComponents: [LoginDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
