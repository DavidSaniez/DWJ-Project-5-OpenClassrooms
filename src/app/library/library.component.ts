import {Component, Input, OnInit} from '@angular/core';
import {faPlay} from '@fortawesome/free-solid-svg-icons/faPlay';
import {Music} from '../shared/music';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss', 'library-responsive.component.scss']
})
export class LibraryComponent implements OnInit {

  constructor() {
  }

  @Input()
  public musics: Music[];

  ngOnInit(): void {
  }

}
