import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { AppComponent } from '../app/app.component'
import { Player } from '../game/player'

class Permissions {

}

@Injectable()
export class SimpleCanActivate implements CanActivate {

  constructor (private permissions: Permissions, private appComponent: AppComponent) {}
  
  getCanActivate (): boolean {
    return this.appComponent.player !== void 0
  }

}

