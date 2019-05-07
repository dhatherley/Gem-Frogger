// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    if (this.x < 606) {
        this.x += this.speed * dt;
    }
    if (this.x >= 606) {
        this.x = -150;
    }
    // collision purposely doesn't reset game but adds to death counter which is displayed at the end of the game 
    if (player.x > this.x - 70 && player.x < this.x + 70 && player.y == this.y) {
        player.deaths++;
        ctx
        player.x = 202;
        player.y = 375;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// The class for creating the player object 
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 202;
        this.y = 375;
        this.gems = 0;
        this.deaths = 0;
    }
    update(dt) {
        document.getElementById("deaths").textContent = player.deaths + " death/s";
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // endgame
    win() {
        setTimeout(function () {
            document.querySelector(".modal").classList.toggle("show-modal");
            document.getElementById("win").textContent = "YOU WIN with " + player.deaths + " death/s";
        }, 100);
    }
    // resets the game
    reset() {
        ctx
        allGems = [new Gem('images/gem-blue.png', 43), new Gem('images/gem-green.png', 126), new Gem('images/gem-orange.png', 209)];
        player.gems = 0;
        player.deaths = 0;
        player.x = 202;
        player.y = 375;
        if (document.querySelector(".modal").classList.toggle("show-modal") == true) {
            document.querySelector(".modal").classList.toggle("show-modal");
        }
    }
    // parameters for moving around
    up() {
        if (this.y == 43) {
            if (this.x == 202 && player.gems == 3) {
                this.y -= 83;
                this.win();
            }
        } else {
            this.y -= 83;
        }
    }
    down() {
        if (this.y == 375) {} else {
            this.y += 83;
        }
    }
    left() {
        if (this.x == 2) {} else {
            if (this.y == -40) {} else {
                this.x -= 100;
            }
        }
    }
    right() {
        if (this.x == 402) {} else {
            if (this.y == -40) {} else {
                this.x += 100;
            }
        }
    }
    handleInput(key) {
        if (key == 'left') {
            this.left();
        } else if (key == 'up') {
            this.up();
        } else if (key == 'right') {
            this.right();
        } else if (key == 'down') {
            this.down()
        }
    }
};

// The portal used to indicate that you have
// collected every gem and you can finish the game
var Portal = function () {
    this.sprite = 'images/selector.png';
    this.x = 202;
    this.y = -40;
}

Portal.prototype.render = function () {
    if (player.gems == 3) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// A gem class used in the game to unlock the end portal
class Gem {
    constructor(sprite, y) {
        this.sprite = sprite;
        this.xArray = [102, 202, 302, 402];
        this.x = this.xArray[Math.floor(Math.random() * this.xArray.length)];
        this.y = y;
    }
    update() {
        if (player.x == this.x && player.y == this.y) {
            this.x = -100;
            this.y = -100;
            player.gems++;
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// instantiates all the objects.
var portal = new Portal();
var allEnemies = [
    new Enemy(-150, 43, 150), new Enemy(-150, 43, 350),
    new Enemy(-150, 126, 260), new Enemy(-150, 126, 300),
    new Enemy(-150, 209, 300), new Enemy(-150, 209, 450)
];
var allGems = [
    new Gem('images/gem-blue.png', 43),
    new Gem('images/gem-green.png', 126),
    new Gem('images/gem-orange.png', 209)
];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// This adds the on-screen controls 
document.addEventListener('mouseup', function (e) {
    if (e.target == document.getElementById('left')) {
        player.left()
    }
    if (e.target == document.getElementById('up')) {
        player.up()
    }
    if (e.target == document.getElementById('right')) {
        player.right()
    }
    if (e.target == document.getElementById('down')) {
        player.down()
    }
});