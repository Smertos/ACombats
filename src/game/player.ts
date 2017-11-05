import { Inventory } from './inventory'
import { PlayerStats } from './interfaces/player-stats'
import { BodyPart } from './enums/body-part'
import { Statistic } from './enums/statistic'

const {
  baseHealth, baseArmor,
  healthPerLevel, healthPerStatPoint,
  expirienceBase,
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
  expToNextLevel: number = expirienceBase
 
  statistics: PlayerStats = {
    damage: 1,
    health: 1,
    defence: 1
  }
  unspentStatPoints: number = statPointsInitial

  constructor (private name: string, level?: number) {
    this.updateHealth()
    this.updateLevel()

    if (typeof level === 'number' && level > 1) {
      this.levelUp(level - 1)
    }
  }

  getName (): string {
    return this.name
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

  getCurrentExpirience (): number {
    return this.expirience
  }

  getRequiredExpirience (): number {
    return this.expToNextLevel
  }

  getUnspentPoints (): number {
    return this.unspentStatPoints
  }
  
  getAttackDamage (): number { 
    return (
      this.getInventory().equipped.weapon ?
      this.getInventory().equipped.weapon.stats.damage
      : unarmedDamage
    ) * Math.log10(this.statistics.damage + 9) * (this.level / 10)
  }

  getDefenceForPart(part: BodyPart): number {
    let currentDefence: number = 1 + this.statistics.defence

    switch (part) {
      case BodyPart.Head:
        currentDefence += (this.inventory.equipped.helmet ? this.inventory.equipped.helmet.stats.armor : 1)
        break

      case BodyPart.Body:
        currentDefence += (this.inventory.equipped.chestplate ? this.inventory.equipped.chestplate.stats.armor : 1)
        break

      case BodyPart.Waist:
        currentDefence += (this.inventory.equipped.chestplate ? this.inventory.equipped.chestplate.stats.armor : 1) / 2
        currentDefence += (this.inventory.equipped.pants ? this.inventory.equipped.pants.stats.armor : 1) / 2
        break

      case BodyPart.Legs:
        currentDefence += (this.inventory.equipped.pants ? this.inventory.equipped.pants.stats.armor : 1) / 2
        currentDefence += (this.inventory.equipped.boots ? this.inventory.equipped.boots.stats.armor : 1) / 2
        break
    }

    return currentDefence
  }

  recieveDamage (damage: number): void {
    this.currentHealth = Math.max(0, this.currentHealth - damage)
  }

  updateHealth (): number {
    this.maximumHealth = baseHealth + (healthPerLevel * this.level) + (healthPerStatPoint * this.statistics.health)

    Object.keys(this.inventory.equipped).forEach(k => {
      if (this.inventory.equipped[k].stats.health) {
        this.maximumHealth += this.inventory.equipped[k].stats.health
      }
    })

    if (!this.inFight) {
      this.currentHealth = this.maximumHealth
    }

    return this.maximumHealth
  }

  updateLevel (): number {
    if (this.expirience > 0) {
      let oldLevel = this.level

      let currentLevel = 1, currentEXPThreshold = expirienceBase  
      
      while (this.expirience >= currentEXPThreshold) {
        currentEXPThreshold = Math.floor(currentEXPThreshold * expirienceScaleFactor)
        currentLevel += 1
      }

      this.expToNextLevel = currentEXPThreshold

      if (currentLevel > oldLevel) {
        this.level = currentLevel
        this.unspentStatPoints += Math.max(0, (currentLevel - oldLevel) * statPointsPerLevel)
      }

    } else {
      this.level = 1
    }

    return this.level
  }

  addExpirience (amount: number): void {
    this.expirience = Math.floor(Math.min(this.expirience + amount, expirienceBase * Math.pow(expirienceScaleFactor, levelCap)))

    this.updateLevel()
    this.updateHealth() 
  }

  levelUp (amount: number = 1): void {
    this.expirience = Math.floor(expirienceBase * Math.pow(expirienceScaleFactor, this.level + amount - 2))

    this.updateLevel()
    this.updateHealth()
  }

  upgradeStatistic (statistic: Statistic): void {
    if (this.unspentStatPoints >= 1) {
        this.statistics[statistic] += 1
      this.unspentStatPoints -= 1
    }
  }

}

export default Player
