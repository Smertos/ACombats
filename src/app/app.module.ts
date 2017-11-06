import { BrowserModule }        from '@angular/platform-browser'
import { NgModule }             from '@angular/core'
import {
  CommonModule,
  Location,
  HashLocationStrategy,
  LocationStrategy
}                               from '@angular/common'
import { FormsModule }          from '@angular/forms'
import { RouterModule }         from '@angular/router'
import { NgxAutoScroll }        from 'ngx-auto-scroll/lib/ngx-auto-scroll.directive'

import { AppComponent }         from './app.component'
import { FightComponent }       from '../components/fight/fight.component'
import { InventoryComponent }   from '../components/inventory/inventory.component'
import { HealthBarComponent }   from '../components/health-bar/health-bar.component'
import { PlayerComponent }      from '../components/player/player.component'
import { QuickHelpComponent }   from '../components/quick-help/quick-help.component'
import { ShopComponent }        from '../components/shop/shop.component'
import { SlotComponent }        from '../components/slot/slot.component'
import { ItemTooltipComponent } from '../components/item-tooltip/item-tooltip.component'
import { ItemTooltipDirective } from '../directives/item-tooltip.directive'

import { appRoutes }            from './app.routes'

import { LoggedInGuard }        from '../injectables/logged-in-guard'
import { GameService }          from '../injectables/game.service'
import { ItemTooltipService }   from '../injectables/item-tooltip.service'

@NgModule({
  declarations: [
    AppComponent,
    FightComponent,
    HealthBarComponent,
    InventoryComponent,
    PlayerComponent,
    QuickHelpComponent,
    ShopComponent,
    SlotComponent,
    ItemTooltipComponent,
    ItemTooltipDirective,
    NgxAutoScroll
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )
  ],
  providers: [
    Location,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    LoggedInGuard,
    GameService,
    ItemTooltipService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
