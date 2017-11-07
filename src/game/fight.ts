import { Player } from './player'
import { BodyPart } from './enums/body-part'

const { enemyName, levelCap, defenceFactor } = require('../../gamedata.json')

export class Fight {

  isFightFinished: boolean = false
  finishCallback:  Function
  logCallback:     Function

  constructor (private player: Player, private enemy: Player) {
    this.player.inFight = true
    this.enemy.inFight = true
  }

  onFightFinish (callback: Function): void {
    this.finishCallback = callback
  }

  onFightLog (callback: Function): void {
    this.logCallback = callback
    this.log('Fight has been started')
  }

  makeTurn (attackPart: BodyPart, defencePart: BodyPart): void {
    let enemyAttack:  BodyPart = <BodyPart>Object.keys(BodyPart)[randomRange(0, 3)] 
    let enemyDefence: BodyPart = <BodyPart>Object.keys(BodyPart)[randomRange(0, 3)]

    let playerAttackDamage = Fight.getSpreadedDamage(this.player)
    let enemyAttackDamage  = Fight.getSpreadedDamage(this.enemy)

    let playerDamage = playerAttackDamage * (attackPart === enemyDefence ? defenceFactor : 1) * Fight.getDamageReduction(this.enemy, attackPart)
    let enemyDamage  = enemyAttackDamage  * (defencePart === enemyAttack ? defenceFactor : 1) * Fight.getDamageReduction(this.player, enemyAttack)

    this.player.receiveDamage(enemyDamage)
    this.enemy.receiveDamage(playerDamage)

    this.logCallback && this.logCallback(`${this.player.getName()} attacks ${this.enemy.getName()} in ${attackPart} and deals ${Math.floor(playerDamage)} damage`)
    this.logCallback && this.logCallback(`${this.enemy.getName()} attacks ${this.player.getName()} in ${enemyAttack} and deals ${Math.floor(enemyDamage)} damage`)

    if(this.enemy.getCurrentHealth() < 1 && this.player.getCurrentHealth() < 1) {
      this.endFight(null, null, true)
    } else if (this.enemy.getCurrentHealth() < 1) {
      this.endFight(this.player, this.enemy)
    } else if(this.player.getCurrentHealth() < 1) {
      this.endFight(this.enemy, this.player)
    }
  } 

  endFight (winner: Player, looser: Player, isDraw: boolean = false): void {
    this.isFightFinished = true

    this.player.inFight = false
    this.player.updateHealth()

    if (isDraw) {
      this.log('Both players died at the same turn')
      this.log('It\'s a draw!')
    } else {
      // Make better formula for expirience? :thinking:
      let exp  = this.enemy.getLevel() * (this.player === winner ? 5  : 2.5)
      let gold = this.enemy.getLevel() * (this.player === winner ? 10 : 2.5)
      
      this.player.addExpirience(exp)
      this.player.getInventory().addGold(gold)

      this.log(`${winner.getName()} won!`)
      this.log(`${Math.floor(exp)} EXP aquired`)
      this.log(`${Math.floor(gold)} gold found`)
    }
    this.finishCallback && this.finishCallback(winner, looser, isDraw)
  }

  log (msg: string): void {
    this.logCallback && this.logCallback(msg)
  }

  static getSpreadedDamage (attacker: Player): number {
    return Math.max(1, randomRange(attacker.getAttackDamage() - attacker.getLevel(), attacker.getAttackDamage() + attacker.getLevel()))
  }

  static getDamageReduction (target: Player, part: BodyPart): number {
    return 1 - (Math.log10(target.getDefenceForPart(part)) * 10 / 100)
  }

  static getRandomEnemy (playerLevel: number): Player {
    let enemy = new Player(enemyName, randomRange(
      Math.max(playerLevel - 2, 1),
      Math.min(playerLevel + 1, levelCap <= 0 ? Infinity : levelCap)
    ))

    enemy.statistics.damage  = randomRange(1, enemy.getLevel() * 4)
    enemy.statistics.defence = randomRange(1, enemy.getLevel() * 5)
    enemy.statistics.health  = randomRange(1, enemy.getLevel() * 8)

    return enemy
  }

}

function randomRange (min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min)
}
