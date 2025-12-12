import { trigger, animate, style, group, query, transition } from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    /* Define your animation properties here */
    group([
      query(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      query(':leave', [
        animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)', opacity: 0 })),
      ]),
    ]),
  ]),
]);
