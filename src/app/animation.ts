import {
  animation, trigger, animateChild, group,
  transition, animate, style, query, state
} from '@angular/animations';

export const openClose =
  trigger('openClose', [
    // ...
    state('open', style({
      transform: 'translateY(0)'
    })),
    state('closed', style({
      transform: 'translateY(-100%)'
    })),

    transition('* => closed', [
      animate('350ms'),
    ]),
    transition('* => open', [
      animate('350ms')
    ]),
  ]);
