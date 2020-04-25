import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PlaylistComponent} from './components/playlist/playlist.component';
import {MusicListComponent} from './components/music-list/music-list.component';


const routes: Routes = [
  {path: '', component: MusicListComponent},
  {path: 'playlist', component: PlaylistComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
