import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component'
import { FightComponent }     from '../components/fight/fight.component'
import { InventoryComponent } from '../components/inventory/inventory.component'
import { ShopComponent }      from '../components/shop/shop.component'
import { appRoutes } from './app.routes'
import { SimpleCanActivate } from '../injectables/simple-can-activate'

@NgModule({
  declarations: [
    AppComponent,
    FightComponent,
    InventoryComponent,
    ShopComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [SimpleCanActivate],
  bootstrap: [AppComponent]
})
export class AppModule { }
