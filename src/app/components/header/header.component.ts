import {Component, HostListener, OnInit} from '@angular/core';
import {openClose} from '../../shared/animation';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {NgForm} from '@angular/forms';
import {ItuneService} from '../../core/services/itune.service';
import {Results} from '../../core/models/itunesMusic';
import {Observable} from 'rxjs';
import {AuthService} from '../../core/services/auth.service';
import {User} from '../../core/models/user';
import {LoginDialogComponent} from '../../shared/dialogs/login-dialog/login-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {RegisterDialogComponent} from "../../shared/dialogs/register-dialog/register-dialog/register-dialog.component";


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
    public dialog: MatDialog,
    private router: Router) {
  }

  isOpen = true;
  currentUser$: Observable<User>;

  ngOnInit() {
    this.breakpointObserver
      .observe(['(min-width: 900px)'])
      .subscribe((state: BreakpointState) => {
        this.isOpen = state.matches;
      });
    this.currentUser$ = this.authService.getCurrentUser();
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
