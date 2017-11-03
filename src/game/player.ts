import { Inventory } from './inventory'
import { PlayerStats } from './interfaces/player-stats'

const {
  baseHealth, baseArmor,
  healthPerLevel, expirienceBase,
  expirienceScaleFactor, levelCap
} = require('../../gamedata.json')

export class Player {

  inventory: Inventory = new Inventory()
  health: number = baseHealth
  level: number = 1
  expirience: number = 0
 
  stats: PlayerStats = {
    strength: 0,
    agility: 0,
    intelligence: 0,
    stamina: 0
  }

  constructor (private name: string = 'Anon') {
    this.calculateHealth()
  }

  getInventory (): Inventory {
    return this.inventory
  }

  calculateHealth (): number {
    this.health = baseHealth + (healthPerLevel * this.level)

    return this.health
  }

  calculateLevel (): number {
    this.level = Math.log(this.expirience / expirienceBase) / Math.log(expirienceScaleFactor)

    return this.level
  }

  addExpirience (amount: number) {
   this.expirience = Math.min(this.expirience + amount, expirienceBase * Math.pow(expirienceScaleFactor, levelCap)) 
  }

  levelUp (amount: number = 1) {
    this.expirience += (Math.pow(expirienceScaleFactor, this.level + amount) - this.expirience)
    this.calculateLevel()
    this.calculateHealth()
  }

}

export default Player
