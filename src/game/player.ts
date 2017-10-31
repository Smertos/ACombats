import Inventory from './player'
//import * as gamedata from '../../gamedata.json'

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

  constructor (private name: string = 'Anon') {
    this.calculateHealth()
  }

  getInventory (): Inventory {
    return this.inventory
  }

  calculateHealth () {
    this.health = baseHealth + (healthPerLevel * this.level)
  }

  calculateLevel () {
    this.level = Math.log(this.expirience / expirienceBase) / Math.log(expirienceScaleFactor)
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
