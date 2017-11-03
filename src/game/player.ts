import { Inventory } from './inventory'
import { PlayerStats } from './interfaces/player-stats'

const {
  baseHealth, baseArmor,
  healthPerLevel, expirienceBase,
  expirienceScaleFactor, levelCap,
  unarmedDamage
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

  constructor (private name: string = 'Anon', level?: number) {
    this.updateHealth()

    if (typeof level === 'number' && level > 1) {
      this.levelUp(level - 1)
    }
  }

  getInventory (): Inventory {
    return this.inventory
  }

  getHealth (): number { 
    return this.health
  }

  getLevel (): number {
    return this.level
  }
  
  // TODO: Implement multiplication by strength after adding stats
  getAttackDamage (): number { 
    return this.getInventory().equipped.weapon.stats.damage || unarmedDamage
  }

  updateHealth (): number {
    this.health = baseHealth + (healthPerLevel * this.level)

    return this.health
  }

  updateLevel (): number {
    this.level = Math.log(this.expirience / expirienceBase) / Math.log(expirienceScaleFactor) + 1

    return this.level
  }

  addExpirience (amount: number) {
    this.expirience = Math.min(this.expirience + amount, expirienceBase * Math.pow(expirienceScaleFactor, levelCap))
    this.updateLevel()
  }

  levelUp (amount: number = 1) {
    this.expirience = expirienceBase * Math.pow(expirienceScaleFactor, this.level + amount - 1)

    this.updateLevel()
    this.updateHealth()
  }

}

export default Player
