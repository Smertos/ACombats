import { Player } from './player'


describe('Player', () => {

  it('should level up 1 LVL', () => {
    let player: Player = new Player('TestPlayer')

    player.levelUp()

    expect(player.getLevel()).toBe(2)
  })

  it('should level up 2 LVLs', () => {
    let player: Player = new Player('TestPlayer')

    player.levelUp(2)

    expect(player.getLevel()).toBe(3)
  })

  it('create player with LVL 2', () => {
    let player: Player = new Player('TestPlayer', 2)

    expect(player.getLevel()).toBe(2)
  })

})
