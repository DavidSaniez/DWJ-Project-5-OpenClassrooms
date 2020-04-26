import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MusicService} from '../../core/services/music.service';
import {faMinusCircle, faPlus} from '@fortawesome/free-solid-svg-icons';
import {Observable, Subscription} from 'rxjs';
import {ItuneService} from '../../core/services/itune.service';
import {Music} from '../../core/models/music';
import {ToastrService} from 'ngx-toastr';
import {SearchBarService} from '../../core/services/search-bar.service';
import {AuthService} from '../../core/services/auth.service';
import {User} from "../../core/models/user";

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss', 'music-list-responsive.component.scss']
})
export class MusicListComponent implements OnInit, OnDestroy {
  constructor(
    private ituneService: ItuneService,
    private musicService: MusicService,
    private toastrService: ToastrService,
    private searchBarService: SearchBarService,
    private authService: AuthService) {
  }

  faPlus = faPlus;
  faMinusCircle = faMinusCircle;
  musicsSubscription: Subscription;
  audio: HTMLAudioElement;
  currentUser$: Observable<User>;
  @Input() musics: Music[];
  @Input() title = 'Résultats';
  @Input() canAdd = true;

  ngOnInit(): void {
    if (!this.musics) {
      this.musicsSubscription = this.ituneService.searchResults.subscribe(musics => {
        if (musics) {
          this.musics = musics;
        }
      });
      this.currentUser$ = this.authService.getCurrentUser();
    }
  }

  add(music: Music) {
    this.musicService.addToPlaylist(music).subscribe((m: Music) => {
      this.toastrService.success(`La musique ${m.name} à été ajouté avec succès`, 'Music');
    });
  }

  delete(music: Music) {
    this.musicService.deleteFromPlaylist(music.id).subscribe(
      () => {
        this.musics = this.musics.filter(m => m.id !== music.id);
        this.toastrService.success(`La musique ${music.name} à été retiré avec succès`, 'Music');
      },
      err => this.toastrService.success(`${err}`)
    );
  }

  ngOnDestroy() {
    if (this.musicsSubscription) {
      this.musicsSubscription.unsubscribe();
    }
  }

  play(music: Music) {
    this.audio = new Audio();
    this.audio.src = music.preview_url;
    this.audio.load();
    this.audio.play();
  }

  stop() {
    this.audio.pause();
    this.audio = null;
  }

  openSearchBar() {
    this.searchBarService.open();
  }
}
