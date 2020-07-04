import {damageEnemy, damageBoss, playerDamage5,playerDamage10,playerDamage5Disable,playerDamage10Disable,collectCoin,destroyBullet} from '../GameLogic';

var healthyEnemy = {
  destroy: false,
  tint: false,
  health: 10,
};

var healthyEnemy = {
  destroy: false,
  tint: false,
  health: 10,
};

var damagedEnemy = {
  destroy: false,
  tint: false,
  health: 1,
};

var player = {
  destroy: false,
  tint: false,
  health: 50,
};

var damagedPlayer = {
  destroy: false,
  tint: false,
  health: 0,
};

var coin = {
  destroy: false
};

var bullet = {
  destroy: false,
}

var score = 0;
var gameWin = false;

it('Enemy gets damaged', () => {
  expect(damageEnemy(healthyEnemy, bullet, score).enemy.health).not.toBe(10);
});

it('Enemy gets killed', () => {
  expect(damageEnemy(damagedEnemy, bullet,score).enemy.destroy).toBe(true);
});

it('Score 5 points when enemy killed', () => {
  expect(damageEnemy(damagedEnemy, bullet,score).score).toBe(5);
});

it('set tint to enemy on impact', () => {
  expect(damageEnemy(healthyEnemy,bullet,score).enemy.tint).toBe(true);
});

it('destroys bullet on impact', () => {
  expect(damageEnemy(healthyEnemy,bullet,score).bullet.destroy).toBe(true);
});

it('Boss gets damaged', () => {
  expect(damageBoss(healthyEnemy, bullet, score).boss.health).not.toBe(10);
});

it('Boss gets killed', () => {
  expect(damageBoss(damagedEnemy, bullet,score).boss.destroy).toBe(true);
});

it('Game is won', () => {
  expect(damageBoss(damagedEnemy, bullet,score).gameWin).toBe(true);
});

it('Player gets damaged by 10', () => {
  expect(playerDamage10(player, healthyEnemy, score).player.health).toBe(40);
});

it('Player gets damaged by 5', () => {
  expect(playerDamage5(player, healthyEnemy, score).player.health).toBe(35);
});

it('Player gets killed, game over', () => {
  expect(damageEnemy(damagedPlayer,bullet,score).gameOver).not.toBe(null);
});

it('player gets 10 points colecting coin', () => {
  expect(collectCoin(player, coin, score).score).toBe(10);
});

it('coin gets destroyed', () => {
  expect(collectCoin(player, coin, score).coin.destroy).toBe(true);
});

it('coin gets destroyed', () => {
  expect(collectCoin(player, coin, score).coin.destroy).toBe(true);
});

it('bullet gets destroyed', () => {
  expect(destroyBullet(bullet).destroy).toBe(true);
});
