var fontSize = 14;
const xMargin = 24;
const yMargin = 0;

function Window_DialogHolder(text, offset) {
    this._x = Graphics.boxWidth / 2;
    this._width = Graphics.boxWidth / 2;

    this._letterWidth = fontSize / 2;
    this._letterHeight = fontSize + 10;

    this.initialize(...arguments);
    this.opacity = 0;
}

Window_DialogHolder.prototype = Object.create(Window_Base.prototype);
Window_DialogHolder.prototype.constructor = Window_DialogHolder;

Window_DialogHolder.prototype.initialize = function (text, offset) {
    this.lines = [];
    text.forEach(line => {
        this.processLines(line);
    });

    const height = (this.lines.length + 1) * this._letterHeight;
    const rect = new Rectangle(this._x, Graphics.height - yMargin - height - offset, this._width, height);
    Window_Base.prototype.initialize.call(this, rect);
    this.drawText();
};

Window_DialogHolder.prototype.drawText = function () {
    this.contents.fontSize = 14;

    for (var i = 0; i < this.lines.length; i++) {
        this.drawTextEx(this.lines[i], 0, i * this._letterHeight, this._width);
    }
}

Window_DialogHolder.prototype.resetFontSettings = function () {
    this.contents.fontFace = $gameSystem.mainFontFace();
    this.contents.fontSize = 14;
    this.contents.textColor = this.textColor ?? "#FFFFFF";
};

Window_DialogHolder.prototype.moveUp = function (value) {
    this.textColor = "#AAAAAA";
    this.drawText();
    this.y -= value;
}

Window_DialogHolder.prototype.processText = function (text) {
    text.forEach(line => {
        this.processLines(line);
    });
}

Window_DialogHolder.prototype.processLines = function (line) {
    while (line.length * this._letterWidth > this._width - xMargin) {
        for (var i = Math.floor((this._width - xMargin) / this._letterWidth); i > 0; i--) {
            if (line[i] == ' ') {
                this.lines[this.lines.length] = line.substring(0, i);
                line = line.substring(i + 1);

                break;
            }
        }
    }

    this.lines[this.lines.length] = line;
}