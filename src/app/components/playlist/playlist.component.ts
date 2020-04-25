import {Component, Input, OnInit} from '@angular/core';
import {MusicService} from '../../core/services/music.service';
import {Observable} from 'rxjs';
import {Music} from '../../core/models/music';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss', 'playlist-responsive.component.scss']
})
export class PlaylistComponent implements OnInit {

  constructor(private musicService: MusicService) {
  }

  @Input() public musics$: Observable<Music[]>;

  ngOnInit(): void {
    this.musics$ = this.musicService.index();
  }

}
