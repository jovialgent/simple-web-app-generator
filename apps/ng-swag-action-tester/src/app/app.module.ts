import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreComponent } from './core/core.component';
import { SwagBasicComponentsModule } from '@simple-web-app-generator/client/basic';


@NgModule({
  declarations: [AppComponent, CoreComponent],
  imports: [BrowserModule, SwagBasicComponentsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
