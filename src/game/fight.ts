import { Player } from './player'
import { BodyPart } from './enums/body-part'

const { enemyName, levelCap, defenceFactor } = require('../../gamedata.json')

export class Fight {

  onFightEnd: Function

  constructor (private player: Player, private enemy: Player) {
    this.player.inFight = true
    this.enemy.inFight = true
  }

  subscribe (callback: Function) {
    this.onFightEnd = callback
  }

  makeTurn (attackPart: BodyPart, defencePart: BodyPart) {
    let enemyAttack: BodyPart = <BodyPart>Object.keys(BodyPart)[randomRange(0, 3)] 
    let enemyDefence: BodyPart = <BodyPart>Object.keys(BodyPart)[randomRange(0, 3)]

    let playerAttackDamage = this.getSpreadedDamage(this.player)
    let enemyAttackDamage = this.getSpreadedDamage(this.enemy)

    let playerDamage = playerAttackDamage * (attackPart === enemyDefence ? defenceFactor : 1) * this.getDamageReduction(this.enemy, attackPart)
    let enemyDamage = enemyAttackDamage * (defencePart === enemyAttack ? defenceFactor : 1) * this.getDamageReduction(this.player, enemyAttack)

    this.player.recieveDamage(enemyDamage)
    this.enemy.recieveDamage(playerDamage)

    if (this.enemy.getCurrentHealth() < 1) {
      this.endFight(this.player, this.enemy)
    } else if(this.player.getCurrentHealth() < 1) {
      this.endFight(this.enemy, this.player)
    }
  }

  getSpreadedDamage (attacker: Player): number {
    return Math.max(1, randomRange(attacker.getAttackDamage() - attacker.getLevel(), attacker.getAttackDamage() + attacker.getLevel()))
  }

  getDamageReduction (target: Player, part: BodyPart): number {
    return 1 - (Math.log10(target.getDefenceForPart(part)) * 10 / 100)
  }

  endFight (winner: Player, looser: Player) {
    this.player.inFight = false
    this.player.updateHealth()

    // Make better formula for expirience? :thinking:
    this.player.addExpirience(this.enemy.getLevel() * (this.player === winner ? 5 : 2.5))

    this.onFightEnd && this.onFightEnd(winner, looser)
  }

  static getRandomEnemy (playerLevel: number): Player {
    let enemy = new Player(enemyName, randomRange(
      Math.max(playerLevel - 2, 1),
      Math.min(playerLevel + 2, levelCap <= 0 ? Infinity : levelCap)
    ))

    enemy.statistics.damage = randomRange(1, enemy.getLevel() * 4)
    enemy.statistics.defence = randomRange(1, enemy.getLevel() * 5)
    enemy.statistics.health = randomRange(1, enemy.getLevel() * 8)

    return enemy
  }

}

function randomRange (min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min)
}
