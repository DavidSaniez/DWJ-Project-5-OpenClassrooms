import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {openClose} from '../../shared/animation';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {NgForm} from '@angular/forms';
import {ItuneService} from '../../core/services/itune.service';
import {Results} from '../../core/models/itunesMusic';
import {Observable, Subscription} from 'rxjs';
import {AuthService} from '../../core/services/auth.service';
import {User} from '../../core/models/user';
import {LoginDialogComponent} from '../../shared/dialogs/login-dialog/login-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {RegisterDialogComponent} from '../../shared/dialogs/register-dialog/register-dialog/register-dialog.component';
import {SearchBarService} from '../../core/services/search-bar.service';
import {MatSearchBarComponent} from 'ng-mat-search-bar/src/app/ng-mat-search-bar/mat-search-bar/mat-search-bar.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', 'header-responsive.component.scss'],
  animations: [openClose],
})

export class HeaderComponent implements OnInit {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private ituneService: ItuneService,
    private authService: AuthService,
    private searchBarService: SearchBarService,
    public dialog: MatDialog,
    private router: Router) {
  }

  isOpen = true;
  currentUser$: Observable<User>;
  isSearchBarOpenSubscription: Subscription;
  @ViewChild('searchBarComponent') searchBarComponent: MatSearchBarComponent;

  ngOnInit() {
    this.breakpointObserver
      .observe(['(min-width: 900px)'])
      .subscribe((state: BreakpointState) => {
        this.isOpen = state.matches;
      });
    this.currentUser$ = this.authService.getCurrentUser();
    this.isSearchBarOpenSubscription = this.searchBarService.getIsOpen().subscribe(state => {
      if (this.searchBarComponent && state) {
        this.searchBarComponent.open();
      }
    });
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }


  logout() {
    this.authService.logout();
  }

  login() {
    this.dialog.open(LoginDialogComponent, {
      width: '450px',
    });
  }

  register() {
    this.dialog.open((RegisterDialogComponent), {
      width: '450px'
    });
  }

  onSubmit($event) {
    this.ituneService.searchMusic($event.target.value);
    this.router.navigate(['/']);
  }
}
