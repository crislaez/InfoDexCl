import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';


@Component({
  selector: 'app-root',
  template:`
  <ion-app>
    <!-- CABECERA  -->
    <ion-header [translucent]="true" no-border>
      <ion-toolbar mode="md|ios">

        <ion-button fill="clear" size="small" slot="start"  (click)="open()">
            <ion-menu-button class="color-menu"></ion-menu-button>
        </ion-button>

        <ion-title class="color-menu" >ClDex</ion-title>

        <div size="small" slot="end" class="div-clear"  >
        </div>

      </ion-toolbar>
    </ion-header>

    <!-- MENU LATERAL  -->
    <ion-menu side="start" menuId="first" contentId="main">
      <ion-header>
        <ion-toolbar >
          <ion-title class="color-menu">Menu</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content >
        <ion-list>
          <ion-item class="color-menu" [routerLink]="['home']" (click)="openEnd()">Pokemon</ion-item>
          <ion-item class="color-menu" [routerLink]="['move']" (click)="openEnd()">Moves</ion-item>
          <ion-item class="color-menu" [routerLink]="['ability']" (click)="openEnd()">Abilities</ion-item>
          <ion-item class="color-menu" [routerLink]="['type']" (click)="openEnd()">Type</ion-item>
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

  constructor(private menu: MenuController, private store: Store, private router: Router) {
    // this.menuList$.subscribe(data => console.log(data))
  }

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
