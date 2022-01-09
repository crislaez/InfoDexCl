import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  template:`
  <ion-app>
    <!-- CABECERA  -->
    <ion-header [translucent]="true" no-border>
      <ion-toolbar mode="md|ios">

        <ion-button fill="clear" size="small" slot="start"  (click)="open()">
          <ion-menu-button class="color-menu-second"></ion-menu-button>
        </ion-button>

        <ion-title class="color-menu-second" >{{ 'COMMON.TITLE' | translate }}</ion-title>

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
          <ion-item detail class="color-menu" [routerLink]="['home']" (click)="openEnd()">{{ 'COMMON.POKEMON' | translate }}</ion-item>
          <ion-item detail class="color-menu" [routerLink]="['move']" (click)="openEnd()">{{ 'COMMON.MOVES' | translate }}</ion-item>
          <ion-item detail class="color-menu" [routerLink]="['ability']" (click)="openEnd()">{{ 'COMMON.ABILITIES' | translate }}</ion-item>
          <ion-item detail class="color-menu" [routerLink]="['type']" (click)="openEnd()">{{ 'COMMON.TYPES' | translate }}</ion-item>
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
