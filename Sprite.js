

function Sprite(x, y, sf) {
  this.x = x;
  this.y = y;
  this.sf = sf;
  this.reverse = false;
  this.animations = [];
  this.spriteSheetJson = [];
  this.img = null;
  this.imgSrc = '';
  this.indexImg = 0;
  this.delayT = 100;
  this.lastChecked = 0;
  this.clipW = 0;
  this.clipH = 0;
  this.usingJson = false;
  this.usingFrames = false;
  this.usingSheet = false;
  this.maxFrames = 0;
  this.currentAnimation = 0;

  this.initAnimationFrames = function(name, path, numFiles) {
    this.usingFrames = true;
    var frames = [];
    for (var i = 0; i < numFiles; i++) {
      frames[i] = loadImage(path + i + ".png");
    }
    this.animations.push({name: name, mode: "frames", path: path, frames: frames, max: numFiles});
  }
  this.initAnimation = function(name, path, w, h, maxFrames) {
    var img = new Image();
    img.src = path + ".png";
    this.animations.push({name: name, mode: "sheet", path: path, w: w, h: h, img: img, max: maxFrames});
  }

  this.initAnimationJson = function(path) {
    this.usingJson = true;
    this.spriteSheetJson = loadJSON(path + ".json", function(data) {
      // console.log(data);
      return data;
    });

    var img = new Image();
    img.src = path + ".png";
    this.animations.push({name: name, mode: "json", path: path, img: img, max: this.spriteSheetJson[0].length});
  }
  this.setAnimation = function (name) {
    for (var i = 0; i < this.animations.length; i++) {
      if (this.animations[i].name == name) {
        this.currentAnimation = i;
        this.maxFrames = this.animations[i].max;
        // img, index, canvasX, canvasY, clipX, clipY, clipW, clipH
      }
    }
  }
  this.changeDirection = function() {
    this.reverse = !this.reverse;
  }
  this.display = function() {
    // if (this.usingJson) this.displayJson();
    // else this.displayImage();
    // this.nextImage();
    // console.log("xy", x, y)
    if (this.animations.length > 0) {
      var mode = this.animations[this.currentAnimation].mode;
      if (mode == 'sheet')  {
        cropImage(this.animations[this.currentAnimation].img, this.indexImg, this.x, this.y, this.animations[this.currentAnimation].w, this.animations[this.currentAnimation].h, this.sf);
      }
      else if (mode == 'frames') {
        var img = this.animations[this.currentAnimation].frames[this.indexImg];
        this.indexImg %= this.animations[this.currentAnimation].max;
        image(img, this.x, this.y, this.sf*img.width, this.sf*img.height);
      }
    }
  }
  this.displayFrames = function() {

  }

  // this.displayJson = function() {
  //   if (this.spriteSheetJson != [] && this.spriteSheetJson[0].length > 0) {
  //     this.maxFrames = this.spriteSheetJson[0].length;
  //     var x = this.spriteSheetJson[0][this.indexImg].frame.x;
  //     var y = this.spriteSheetJson[0][this.indexImg].frame.y;
  //     var w = this.spriteSheetJson[0][this.indexImg].frame.width;
  //     var h = this.spriteSheetJson[0][this.indexImg].frame.height;
  //
  //     var c = document.getElementById("defaultCanvas0");
  //     var ctx = c.getContext("2d");
  //
  //     ctx.drawImage(this.img, x, y, w, h, this.x, this.y, w, h);
  //   }
  //   else {
  //     console.log("no sprite sheet?");
  //   }
  // }
  this.previousImage = function() {
    if (millis() - this.lastChecked > this.delayT) {
      this.indexImg--;
      console.log(this.indexImg)
      if (this.indexImg < 0) {
        this.indexImg =  this.getMaxFrames() -1;
      }
      // if (this.usingJson) this.indexImg %= this.spriteSheetJson[0].length;
      // else this.indexImg %= this.getNumImages();
      this.lastChecked = millis();
    }
  }
  this.nextImage = function() {
    if (millis() - this.lastChecked > this.delayT) {
      this.indexImg++;
      if (this.indexImg >= this.getMaxFrames()) {
        this.indexImg = 0;
      }

      // if (this.usingJson) this.indexImg %= this.spriteSheetJson[0].length;
      // else this.indexImg %= this.getNumImages();
      this.lastChecked = millis();
    }
  }
  this.getMaxFrames = function() {
    if (this.animations.length == 0) return 0;
    return this.animations[this.currentAnimation].max;
  }
}

function cropImage(img, index, canvasX, canvasY, clipW, clipH, sf) {
  var numWide = floor(img.width/clipW);
  var numHigh = floor(img.height/clipH);
  var xInd = index % numWide;
  var yInd = floor(index / numWide);
  var x = xInd * clipW;
  var y = yInd * clipH;

  var c = document.getElementById("defaultCanvas0");
  var ctx = c.getContext("2d");
  // console.log(canvasX, canvasY)
  // console.log(clipW*sf, clipH*sf);
  ctx.drawImage(img, x, y, clipW, clipH, canvasX, canvasY, clipW*sf, clipH*sf);
}
