var healthGraphics
var glucose = 0
var glucoseMod = 1
var glucoseText
var levelText
var background
var wbc
var wbcGreen
var wbcRed
var wbcs = []
var virus
var viruses = []
var targetViruses = []
var level = 1
var useButton
var useButtonExists
var bone
var shopbar
var sellText
var priceText
var sellImage
var sellItems = ['wbc', 10]
var sellIndex = 0
var rightarrow
var leftarrow
var gameObjects
var placed
var health = 100
var healthBar
var stop = false
var mobile

function boneClicked() {
  glucose += glucoseMod
  glucoseText.setText(`Glucose: ${Math.round(glucose)}`)
}

function buyItem() {
  if (glucose >= sellItems[sellIndex + 1] && placed == true) {
    if (mobile) {
      placed = false
      var placeArea = gameObjects.create(480, 263, 'placeArea')
        .setScale(3.1)
        .setInteractive()
        .on('pointerdown', function(pointer) {
          placeArea.destroy()
          wbc = gameObjects.create(pointer.x, pointer.y, sellItems[sellIndex])
            .setInteractive()
          placeItem(wbc, pointer.x, pointer.y)
        })
    } else {
      placed = false
      wbc = gameObjects.create(game.input.mousePointer.x, game.input.mousePointer.y, sellItems[sellIndex])
        .setInteractive()
        .on('pointerdown', () => placeItem(wbc, game.input.mousePointer.x, game.input.mousePointer.y))
      var updatePosition = setInterval(function() {
        if (placed) {
          clearInterval(updatePosition)
        } else if (stop) {
          clearInterval(updatePosition)
        }
        wbc.x = game.input.mousePointer.x
        wbc.y = game.input.mousePointer.y
      }, 10)
    }
  }
}

function placeItem(wbc, x, y) {
  placed = true
  if (x >= 169 && x <= 791 && y >= 450 && y <= 540) {
    wbc.destroy()
  } else {
    glucose -= sellItems[sellIndex + 1]
    glucoseText.setText(`Glucose: ${Math.round(glucose)}`)
    sellItems[sellIndex + 1] = Math.round(sellItems[sellIndex + 1] * 1.35)
    priceText.setText(`| Cost: ${sellItems[sellIndex + 1]} |`)
    wbc.destroy()
    wbc = gameObjects.create(x, y, sellItems[sellIndex])
      .setInteractive()
      .on('pointerdown', () => attackVirus(wbc))
    wbcs.push(wbc)
    // var index = wbcs.length - 1
    // var setPosition = setInterval(function() {
    //   if (wbcs[index].x != wbc.x || wbcs[index].y != wbc.y) {
    //     wbc.x = wbcs[index].x
    //     wbc.y = wbcs[index].y
    //   } else if (stop) {
    //     clearInterval(setPosition)
    //   }
    // }, 50)
  }
}

function spawnViruses() {
  for (var i = 0; i < level; i++) {
    virus = gameObjects.create(Math.random() * 200 + 700, Math.random() * 370 + 50, 'virus')
      .setScale(0.09)
      .setInteractive()
    viruses.push(virus)
    targetViruses.push(false)
    moveViruses(virus)
  }
}

function moveViruses(virus) {
  var index
  for (var i = 0; i < viruses.length; i += 1) {
    if (viruses[i].x == virus.x && viruses[i].y == virus.y) {
      index = i
      break
    }
  }
  var moveVirus = setInterval(function() {
    if (virus.x > 58 && virus.x < 123 && virus.y > 290 && virus.y < 430) {
      clearInterval(moveVirus)
      var doDamage = setInterval(function() {
        if (viruses[index] == true) {
          clearInterval(moveVirus)
          clearInterval(doDamage)
          setTimeout(function() {
            virus.destroy()
          }, 5000)
        } else if (stop) {
          clearInterval(moveVirus)
          clearInterval(doDamage)
          clearInterval(moveVirus)
          clearInterval(doDamage)
        } else {
          health -= 20 / (1 + Math.exp(level / -10)) - 9.5
          healthGraphics.clear()
          healthGraphics.strokeRect(65, 255, 50, 15)
          healthGraphics.fillRect(65, 255, health * 0.5, 15)
        }
      }, 1000)
    } else {
      if (viruses[index] == true) {
        clearInterval(moveVirus)
        setTimeout(function() {
          virus.destroy()
        }, 5000)
      } else if (stop) {
        clearInterval(moveVirus)
      }
      virus.x -= 1.5
      virus.y -= (virus.y - 360) * (1.5 / (virus.x - 90))
    }
  }, 50)
}

function attackVirus(wbc) {
  if (useButtonExists) {} else {
    useButtonExists = true
    useButton = gameObjects.create(wbc.x, wbc.y, 'useButton')
      .setScale(0.22)
      .setInteractive()
      .on('pointerdown', (i) => {
        var virusI = 0
        var virusD = 100000
        var virusNull = 0
        var abort = false
        wbc.input.enabled = false
        if (viruses.length == 0) {
          useButton.destroy()
          useButtonExists = false
          wbc.input.enabled = true
        } else {
          useButton.destroy()
          useButtonExists = false
          for (var i = 0; i < viruses.length; i++) {
            if (targetViruses[i] == true) {
              virusNull++
              if (virusNull == viruses.length) {
                abort = true
                wbc.input.enabled = true
              }
            } else if (Math.sqrt(Math.pow((viruses[i].x - wbc.x), 2) + Math.pow((wbc.y - viruses[i].y), 2)) < virusD) {
              virusI = i
              virusD = Math.sqrt(Math.pow((viruses[i].x - wbc.x), 2) + Math.pow((wbc.y - viruses[i].y), 2))
            }
          }
          targetViruses[virusI] = true
          // console.log(`0:${Math.sqrt(Math.pow((viruses[0].x - wbc.x), 2) + Math.pow((wbc.y - viruses[0].y), 2))}, 1:${Math.sqrt(Math.pow((viruses[1].x - wbc.x), 2) + Math.pow((wbc.y - viruses[1].y), 2))}`)
          // console.log(`virusI: ${virusI}, virusD: ${virusD}`)
          // console.log(viruses)
          var pass = 0
          if (abort) {} else {
            var attackVirus = setInterval(function() {
              if (stop) {
                clearInterval(attackVirus)
              } else if (wbc.x + 10 > viruses[virusI].x && viruses[virusI].x > wbc.x - 10) {
                pass++
                if (pass > 20) {
                  wbc.x -= 30
                  wbc.y += Math.abs(viruses[virusI].y - wbc.y)
                }
              } else if (viruses[virusI].x > wbc.x - 19 && viruses[virusI].x < wbc.x + 19 && viruses[virusI].y > wbc.y - 19 && viruses[virusI].y < wbc.y + 19) {
                clearInterval(attackVirus)
                viruses[virusI] = true
                var virusesDestroyed = 0
                for (var i = 0; i < viruses.length; i++) {
                  if (viruses[i] == true) {
                    virusesDestroyed++
                  }
                }
                if (virusesDestroyed == viruses.length) {
                  setTimeout(function() {
                    glucose += Math.pow(level, 1.4) * 10
                    glucoseText.setText(`Glucose: ${Math.round(glucose)}`)
                    glucoseMod += level / 4
                    level++
                    levelText.setText(`Level: ${level}`)
                    setTimeout(function() {
                      spawnViruses()
                    }, Math.random() * 1500 + 8500)
                  }, 2000)
                }
                setTimeout(function() {
                  var waitTime = 16
                  var reloadWbc = setInterval(function() {
                    if (stop) {
                      clearInterval(reloadWbc)
                    } else if (waitTime == 0) {
                      wbc.input.enabled = true
                      wbc.anims.play('wbcGreen', false)
                      clearInterval(reloadWbc)
                    } else {
                      waitTime--
                      wbc.anims.play('wbcRed', false)
                    }
                  }, 1000)
                }, 5000)
              } else {
                if (viruses[virusI].x - wbc.x > 0) {
                  wbc.x += 2
                  wbc.y -= (wbc.y - viruses[virusI].y) * (2 / (viruses[virusI].x - wbc.x))
                } else {
                  wbc.x -= 2
                  wbc.y -= (wbc.y - viruses[virusI].y) * (-2 / (viruses[virusI].x - wbc.x))
                }
              }
            }, 50)
          }
        }
      })
  }
}

class Game extends Phaser.Scene {
  constructor() {
    super({
      key: 'Game'
    })
  }

  preload() {
    glucose = 0
    glucoseMod = 1
    placed = true
    wbcs = []
    viruses = []
    targetViruses = []
    sellItems = ['wbc', 10]
    sellIndex = 0
    health = 100
    level = 1
    stop = false

    this.load.image('wbc', './wbc.png')
    this.load.image('bone', './bone.png')
    this.load.image('virus', './virus.png')
    this.load.image('useButton', './useButton.png')
    this.load.image('body', './body.png')
    this.load.image('shopbar', './shopbar.png')
    this.load.image('rightarrow', './rightarrow.png')
    this.load.image('placeArea', './placeArea.svg')
    this.load.spritesheet('wbcs',
      './wbcs.png', {
        frameWidth: 64,
        frameHeight: 64
      }
    )
  }

  create() {
    this.add.image(90, 360, 'body')
      .setScale(0.32)

    healthGraphics = this.add.graphics({
      lineStyle: {
        color: 0x000000
      },
      fillStyle: {
        color: 0x00ff00
      }
    })
    healthGraphics.strokeRect(65, 255, 50, 15)
    healthGraphics.fillRect(65, 255, 50, 15)

    glucoseText = this.add.text(100, 16, 'Glucose: 0', {
      fontFamily: 'comic sans ms',
      fontSize: '20px',
      fill: '#000'
    })

    levelText = this.add.text(700, 16, `Level: ${level}`, {
      fontFamily: 'comic sans ms',
      fontSize: '20px',
      fill: '#000'
    })

    bone = this.add.image(120, 100, 'bone')
      .setScale(0.15)
      .setInteractive()
      .on('pointerdown', () => boneClicked())

    shopbar = this.add.image(480, 270, 'shopbar')

    if (mobile) {
      sellImage = this.add.image(280, 507, 'wbc')
        .setScale(0.85)
        .setInteractive()
        .on('pointerdown', () => buyItem())
    } else {
      sellImage = this.add.image(280, 507, 'wbc')
        .setScale(0.85)
        .setInteractive()
        .on('pointermove', () => buyItem())
    }

    wbcGreen = this.anims.create({
      key: 'wbcGreen',
      frames: this.anims.generateFrameNumbers('wbcs', {
        start: 0,
        end: 1
      }),
      frameRate: 0,
      repeat: 0
    })

    wbcRed = this.anims.create({
      key: 'wbcRed',
      frames: this.anims.generateFrameNumbers('wbcs', {
        start: 1,
        end: 2
      }),
      frameRate: 0,
      repeat: 0
    })

    sellText = this.add.text(325, 493, '|   White Blood Cell   |', {
      fontFamily: 'comic sans ms',
      fontSize: '22px',
      fill: '#000'
    })

    priceText = this.add.text(575, 493, '|   Cost: 10   |', {
      fontFamily: 'comic sans ms',
      fontSize: '22px',
      fill: '#000'
    })

    rightarrow = this.add.image(737, 507, 'rightarrow')
      .setScale(0.05)
      .setInteractive()
    leftarrow = this.add.image(230, 507, 'rightarrow')
      .setScale(-0.05, 0.05)
      .setInteractive()

    gameObjects = this.add.group()

    setTimeout(spawnViruses, Math.random() * 1500 + 8500)
  }

  update() {
    if (health <= 0) {
      stop = true
      this.cameras.main.shake(400)
      this.time.delayedCall(400, function() {
        this.scene.start('Lose')
      }, [], this)
    }
  }
}

class Title extends Phaser.Scene {
  constructor() {
    super({
      key: 'Title',
      active: true
    })
  }

  preload() {
    this.load.image('button', './startButton.svg')
  }

  create() {
    mobile = !this.sys.game.device.os.desktop
    this.add.text(290, 50, 'Leukocyte', {
      fontFamily: 'comic sans ms',
      fontSize: '80px',
      fill: '#000'
    })
    this.add.image(470, 350, 'button')
      .setScale(0.4)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.stop('Title')
        this.scene.launch('Game')
      })
  }
}

class Lose extends Phaser.Scene {
  constructor() {
    super({
      key: 'Lose'
    })
  }

  preload() {
    this.load.image('again', './again.svg')
  }

  create() {
    background = new Phaser.Geom.Rectangle(0, 0, 960, 540)
    var graphics = this.add.graphics({
      fillStyle: {
        color: 0xd84a3d
      }
    })
    graphics.fillRectShape(background)

    this.add.text(290, 50, 'Infected!', {
      fontFamily: 'comic sans ms',
      fontSize: '80px',
      fill: '#000'
    })

    this.add.text(260, 200, `You Survived Until Level: ${level}`, {
      fontFamily: 'comic sans ms',
      fontSize: '32px',
      fill: '#000'
    })

    this.add.image(470, 350, 'again')
      .setScale(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('Game')
      })
  }
}

var config

if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  console.log('mobile')
  config = {
    type: Phaser.AUTO,
    parent: 'game',
    scene: [Title, Game, Lose],
    width: 960,
    height: 540,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#eeeeee'
  }
  width = window.innerWidth - 8
  height = (window.innerWidth - 8) * 9 / 16
} else {
  console.log('desktop')
  config = {
    type: Phaser.AUTO,
    parent: 'game',
    scene: [Title, Game, Lose],
    width: 960,
    height: 540,
    backgroundColor: '#eeeeee'
  }
}

const game = new Phaser.Game(config)
