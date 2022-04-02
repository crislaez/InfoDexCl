import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  template:`
  <ion-app>
    <!-- CABECERA  -->
    <ion-header  class="ion-no-border">
      <ion-toolbar >

        <ion-button fill="clear" size="small" slot="start"  (click)="open()">
          <ion-menu-button class="color-menu-second"></ion-menu-button>
        </ion-button>

        <ion-title *ngIf="currentSection$ |async as currentSection" class="color-menu-second" >{{ currentSection | translate }}</ion-title>

        <div size="small" slot="end" class="div-clear"  >
        </div>

      </ion-toolbar>
    </ion-header>

    <!-- MENU LATERAL  -->
    <ion-menu side="start" menuId="first" contentId="main">
      <ion-header>
        <ion-toolbar >
          <ion-title class="color-menu-second">{{ 'COMMON.MENU' | translate }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content >
        <ion-list>
          <ion-item *ngFor="let item of menuList" detail class="color-menu" [routerLink]="[item?.link]" (click)="openEnd()">{{ item?.label | translate }}</ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <!-- RUTER  -->
    <ion-router-outlet id="main"></ion-router-outlet>

  </ion-app>
  `,
  styleUrls: ['./root.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent {

  currentSection$: Observable<string> = this.router.events.pipe(
    filter((event: any) => event instanceof NavigationStart),
    map((event: NavigationEnd) => {
      const { url = ''} = event || {};
      if(url === '/home') return 'COMMON.POKEMON_TITLE';
      if(url?.includes('/pokemon/')) return 'COMMON.POKEMON_TITLE';
      if(url === '/move') return 'COMMON.MOVES_TITLE';
      if(url?.includes('/move/')) return 'COMMON.MOVE_TITLE';
      if(url === '/ability') return 'COMMON.ABILITIES_TITLE';
      if(url?.includes('/ability/')) return 'COMMON.ABILITY_TITLE';
      if(url === '/type') return 'COMMON.TYPES_TITLE';
      if(url?.includes('/type/')) return 'COMMON.TYPE_TITLE';
      return 'COMMON.TITLE';
    })
  );

  menuList = [
    {id:1, label:'COMMON.POKEMON', link:'home'},
    {id:2, label:'COMMON.MOVES', link:'move'},
    {id:3, label:'COMMON.ABILITIES', link:'ability'},
    {id:4, label:'COMMON.TYPES', link:'type'}
  ]

  constructor(
    private menu: MenuController,
    private router: Router
  ) {  }


  open() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  redirectTo(passage: string): void{
    this.router.navigate(['/chapter/'+passage])
    this.menu.close('first')
  }

  openEnd() {
    this.menu.close();
  }
}
