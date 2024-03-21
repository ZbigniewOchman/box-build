
function Window_DialogHolder(text, offset) {
    this._x = panelX;

    this._letterHeight = fontSize + 10;

    this.initialize(...arguments);
    this.opacity = 0;
}

Window_DialogHolder.prototype = Object.create(Window_Base.prototype);
Window_DialogHolder.prototype.constructor = Window_DialogHolder;

Window_DialogHolder.prototype.initialize = function (text, offset) {
    this.lines = [];
    text.forEach(line => {
        var lines = getSplittedLine(line);
        this.lines = [...this.lines, ...lines];
    });

    const height = (this.lines.length + 1) * this._letterHeight;
    const rect = new Rectangle(this._x, Graphics.height - yMargin - height - offset, panelWidth, height);
    Window_Base.prototype.initialize.call(this, rect);
    this.drawText();
};

Window_DialogHolder.prototype.drawText = function () {
    this.contents.fontSize = fontSize;

    for (var i = 0; i < this.lines.length; i++) {
        this.drawTextEx(this.lines[i], 0 + xMargin, i * this._letterHeight, panelWidth-2*xMargin);
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