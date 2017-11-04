import { Player } from './player'
import { BodyPart } from './enums/body-part'

const { enemyName, levelCap } = require('../../gamedata.json')

export class Fight {

  constructor (private player: Player, private enemy: Player) {
    this.player.inFight = true
    this.enemy.inFight = true
  }

  makeTurn (attackPart: BodyPart, defencePart: BodyPart) {
    let enemyAttack: BodyPart = randomRange(0, 3) 
    let enemyDefence: BodyPart = randomRange(0, 3) 

    let playerAttackDamage = this.getSpreadedDamage(this.player)
    let enemyAttackDamage = this.getSpreadedDamage(this.enemy)
  }

  getSpreadedDamage (attacker: Player): number {
    return Math.max(1, randomRange(attacker.getAttackDamage() - attacker.getLevel(), attacker.getAttackDamage() + attacker.getLevel()))
  }

  getDamageReduction (defender: Player, part: BodyPart): number {
    return defender.getDefenceForPart(part)
  }

  endFight (winner: Player, looser: Player) {
    this.player.inFight = false
    this.enemy.inFight = false

    // Make better formula for expirience? :thinking:
    winner.addExpirience(looser.getLevel() * 5)
    looser.addExpirience(winner.getLevel() * 2.5)
  }

  static getRandomEnemy (playerLevel: number): Player {
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
