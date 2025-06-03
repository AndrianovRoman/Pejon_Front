import {Component, HostListener, OnInit} from '@angular/core';
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {AuthService} from "../../core/auth/auth.service";

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

  isLogged: boolean = false;
  collapsed: boolean = true;
  screenWidth: number = 0;
  navData: { routeLink: string, icon: string, label: string, isLogged: boolean, }[] = [];
  userId: string | null = null;

  role: string | undefined;

  constructor(private authService: AuthService) {
    this.isLogged = this.authService.getIsLoggedIn();
    this.userId = this.authService.getUserInfo();
    // console.log(this.isLogged)
    this.authService.getIsRole().subscribe(data => {
      this.role = data.name;
      this.createNavbar()
    });
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;

    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
      this.userId = this.authService.getUserInfo();
      console.log(this.isLogged)
      if(this.isLogged) {
        this.authService.getIsRole().subscribe(data => {
          this.role = data.name;
          this.createNavbar()
        });
      }
      this.createNavbar();
    });
  }

  createNavbar() {
    return this.navData = [
      {
        routeLink: '',
        icon: 'bi bi-house',
        label: 'Главная',
        isLogged: true,
      },
      {
        routeLink: '/warehouse',
        icon: 'bi bi-houses',
        label: 'Склады',
        isLogged: this.isLogged,
      },
      {
        routeLink: '/container',
        icon: 'bi bi-box-seam',
        label: 'Контейнеры',
        isLogged: this.isLogged,
      },
      {
        routeLink: '/user',
        icon: 'bi bi-people',
        label: 'Пользователи',
        isLogged: this.isLogged && this.role === 'Админ',
      },
      {
        routeLink: '/user/' + this.userId,
        icon: 'bi bi-person',
        label: 'Профиль',
        isLogged: this.isLogged,
      },
      {
        routeLink: this.isLogged ? '/logout' : '/login',
        icon: this.isLogged ? 'bi bi-door-closed' : 'bi bi-door-open',
        label: this.isLogged ? 'Выйти' : 'Войти',
        isLogged: true,
      },
    ];
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

  logout(){
    this.authService.logout();
  }

}
