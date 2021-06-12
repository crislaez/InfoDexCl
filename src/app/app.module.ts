import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './core';
import { ENVIRONMENT } from './core/externals';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  entryComponents: [],
  imports: [
    BrowserModule,
    CoreModule,
    IonicModule.forRoot(),
    StoreModule.forRoot({},
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({maxAge:4}),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: ENVIRONMENT,
      useValue: environment
    }
  ],
  bootstrap: [RootComponent],
})
export class AppModule {}
