import { Player } from './player'

const { enemyName } = require('../../gamedata.json')

export enum BodyPart {
  Head, Body, Waist, Legs
}

export class Fight {

  enemy: Player

  playerHealth: number
  enemyHealth: number

  constructor (private player: Player) {
    this.enemy = this.getRandomEnemy(this.player.getLevel())

    this.playerHealth = this.player.getHealth()
    this.enemyHealth = this.enemy.getHealth()
  }

  makeTurn (attackPart: BodyPart, defencePart: BodyPart) {
 
  }

  getRandomEnemy (playerLevel: number): Player {
    let enemy = new Player(enemyName, randomRange(
      Math.max(playerLevel - 2, 1),
      Math.min(playerLevel + 2, levelCap <= 0 ? Infinity : levelCap)
    ))

    return enemy
  }

}

function randomRange (min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min)
}
