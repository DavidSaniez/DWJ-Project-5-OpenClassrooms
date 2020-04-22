import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {HeaderComponent} from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatButtonModule} from '@angular/material/button';
import {NgMatSearchBarModule} from 'ng-mat-search-bar';
import { MusicComponent } from './music/music.component';
import { LibraryComponent } from './library/library.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppConfigModule} from './app-config/app-config.module';
import {HttpClientModule} from '@angular/common/http';
import {ItuneService} from './shared/itune-service';
import { MusicListComponent } from './music-list/music-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MusicComponent,
    LibraryComponent,
    MusicListComponent,

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
    HttpClientModule
  ],
  providers: [
    ItuneService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
