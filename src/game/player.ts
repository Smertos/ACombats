import { Inventory } from './inventory'
import { PlayerStats } from './interfaces/player-stats'
import { BodyPart } from './enums/body-part'
import { Statistic } from './enums/statistic'

const {
  baseHealth, baseArmor,
  healthPerLevel, expirienceBase,
  expirienceScaleFactor, levelCap,
  unarmedDamage, statPointsInitial,
  statPointsPerLevel
} = require('../../gamedata.json')

export class Player {

  inventory: Inventory = new Inventory()

  maximumHealth: number = baseHealth
  currentHealth: number = baseHealth
  inFight: boolean = false
  level: number = 1
  expirience: number = 0
 
  statistics: PlayerStats = {
    strength: 1,
    agility: 1,
    intelligence: 1,
    stamina: 1
  }
  unspentStatPoints: number = statPointsInitial

  constructor (private name: string = 'Anon', level?: number) {
    this.updateHealth()

    if (typeof level === 'number' && level > 1) {
      this.levelUp(level - 1)
    }
  }

  getInventory (): Inventory {
    return this.inventory
  }

  getCurrentHealth (): number { 
    return this.currentHealth
  }

  getMaxHealth (): number {
    return this.maximumHealth
  }

  getLevel (): number {
    return this.level
  }

  getUnspentPoints (): number {
    return this.unspentStatPoints
  }
  
  // TODO: Implement multiplication by strength after adding stats
  getAttackDamage (): number { 
    return this.getInventory().equipped.weapon.stats.damage || unarmedDamage
  }

  getDefenceForPart(part: BodyPart): number {
    return 1
  }

  updateHealth (): number {
    this.maximumHealth = baseHealth + (healthPerLevel * this.level)

    if (!this.inFight) {
      this.currentHealth = this.maximumHealth
    }

    return this.maximumHealth
  }

  updateLevel (): number {
    let oldLevel = this.level
    this.level = Math.log(this.expirience / expirienceBase) / Math.log(expirienceScaleFactor) + 1
    this.unspentStatPoints += (this.level - oldLevel) * statPointsPerLevel

    return this.level
  }

  addExpirience (amount: number) {
    this.expirience = Math.min(this.expirience + amount, expirienceBase * Math.pow(expirienceScaleFactor, levelCap))

    this.updateLevel()
    this.updateHealth() 
  }

  levelUp (amount: number = 1) {
    this.expirience = expirienceBase * Math.pow(expirienceScaleFactor, this.level + amount - 1)

    this.updateLevel()
    this.updateHealth()
  }

  upgradeStatistic (statistic: Statistic) {
    if (this.unspentStatPoints > 0) {
      switch (statistic) {
        case Statistic.Strength:
          this.statistics.strength += 1
          break

        case Statistic.Agility:
          this.statistics.agility += 1
          break

        case Statistic.Intelligence:
          this.statistics.intelligence += 1
          break

        case Statistic.Stamina:
          this.statistics.stamina += 1
          break

        default:
          return
      }

      this.unspentStatPoints -= 1
    }
  }

}

export default Player
