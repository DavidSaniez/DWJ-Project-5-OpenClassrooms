import {Component, HostListener, OnInit} from '@angular/core';
import {openClose} from '../animation';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {NgForm} from '@angular/forms';
import {ItuneService} from '../shared/itune-service';
import {Results} from '../shared/music';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', 'header-responsive.component.scss'],
  animations: [openClose],
})

export class HeaderComponent implements OnInit {
  constructor(public breakpointObserver: BreakpointObserver, public ituneService: ItuneService) {
  }

  isOpen = true;
  results$: Observable<Results>;

  ngOnInit() {
    this.breakpointObserver
      .observe(['(min-width: 900px)'])
      .subscribe((state: BreakpointState) => {
        this.isOpen = state.matches;
      });
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  // searchFormResults
  onSubmit(form: NgForm) {
    this.results$ = this.ituneService.searchMusic(form.value.search);
  }
}
