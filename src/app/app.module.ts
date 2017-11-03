import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { CommonModule, Location, HashLocationStrategy, LocationStrategy } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component'
import { FightComponent }     from '../components/fight/fight.component'
import { InventoryComponent } from '../components/inventory/inventory.component'
import { PlayerComponent } from '../components/player/player.component'
import { ShopComponent }      from '../components/shop/shop.component'
import { SlotComponent }      from '../components/slot/slot.component'

import { appRoutes } from './app.routes'

import { LoggedInGuard } from '../injectables/logged-in-guard'
import { GameService } from '../injectables/game.service'

@NgModule({
  declarations: [
    AppComponent,
    FightComponent,
    InventoryComponent,
    PlayerComponent,
    ShopComponent,
    SlotComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [
    Location,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    LoggedInGuard,
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
