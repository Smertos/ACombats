import { Routes}  from '@angular/router'

import { FightComponent }     from '../components/fight/fight.component'
import { InventoryComponent } from '../components/inventory/inventory.component'
import { ShopComponent }      from '../components/shop/shop.component'

export const appRoutes: Routes = [
  { path: 'fight',     component: FightComponent },
  { path: 'backpack',  component: InventoryComponent },
  { path: 'shop',      component: ShopComponent }
]
