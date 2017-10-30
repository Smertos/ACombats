import Inventory from './player'

export class Player {

  inventory: Inventory = new Inventory()
  baseHealth: number = 50
  armor = {
    head: 4,
    body: 6,
    legs: 4,
    boots: 2
  }

  constructor (private name: string = 'Anon') { }

  addItem (itemID: number) {
    this.inventory.addItem(itemID)
  }

}

export default Player
