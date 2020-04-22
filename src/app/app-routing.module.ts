import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LibraryComponent} from './library/library.component';
import {MusicComponent} from './music/music.component';


const routes: Routes = [
  {path: 'library', component: LibraryComponent},
  {path: 'music/:musicId', component: MusicComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
