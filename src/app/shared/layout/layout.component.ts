import {Component, HostListener, OnInit} from '@angular/core';
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('35ms', style({ opacity: 0 })),
      ]),
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate(
          '500ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(1turn)', offset: '1' }),
          ]),
        ),
      ]),
    ]),
  ],
})
export class LayoutComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event: object) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
    }
  }

  collapsed: boolean = true;
  screenWidth: number = 0;
  navData = [
    {
      routeLink: '',
      icon: 'bi bi-house',
      label: 'Главная',
    },
    {
      routeLink: '/login',
      icon: 'bi bi-person',
      label: 'Войти',
    },
    {
      routeLink: '/warehouse',
      icon: 'bi bi-houses',
      label: 'Склады',
    },
    {
      routeLink: '/container',
      icon: 'bi bi-box-seam',
      label: 'Контейнеры',
    },
  ]

  constructor() {
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  closeSidenav(): void {
    this.collapsed = false;
  }

  getLayoutClass(): string {
    let styleClass = '';

    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'layout-trimmed';
    } else if (
      this.collapsed &&
      this.screenWidth <= 768 &&
      this.screenWidth < 0
    ) {
      styleClass = 'layout-md-screen';
    }

    return styleClass;
  }

}
