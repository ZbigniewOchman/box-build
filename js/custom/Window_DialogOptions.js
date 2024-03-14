function Window_DialogOptions(options, sender) {
    this.options = options;
    this.sender = sender;
    
    this._x = panelX;
    this._width = panelWidth;
    
    this._letterWidth = fontSize / 2;
    this._letterHeight = fontSize + 10;

    this.initialize(...arguments);
    this.opacity = 0;
}

Window_DialogOptions.prototype.callback;
Window_DialogOptions.prototype.options = [];
Window_DialogOptions.prototype = Object.create(Window_Command.prototype);
Window_DialogOptions.prototype.constructor = Window_DialogOptions;

Window_DialogOptions.prototype.initialize = function () {
    const height = (Object.keys(this.options).length + 1) * (this._letterHeight + 4);
    const rect = new Rectangle(this._x+xMargin, Graphics.height - yMargin - height, this._width - (2*xMargin) , height);
    Window_Command.prototype.initialize.call(this, rect);
};

Window_DialogHolder.prototype.resetFontSettings = function () {
    this.contents.fontFace = $gameSystem.mainFontFace();
    this.contents.textColor = this.textColor ?? "#FFFFFF";
};

Window_DialogOptions.prototype.lineHeight = function() {
    return 18;
};

Window_DialogOptions.prototype.processOk = function() {
    Window_MenuCommand._lastCommandSymbol = this.currentSymbol();
    Window_Command.prototype.processOk.call(this);
    this.sender.optionSelected(Window_MenuCommand._lastCommandSymbol);
};

Window_DialogOptions.prototype.drawText = function(text, x, y, maxWidth, align) {
    this.contents.fontSize = fontSize;
    this.contents.drawText(text, x, y, maxWidth, this.lineHeight(), align);
};

Window_DialogOptions.prototype.makeCommandList = function () {
    for (const key in this.options) {
        this.addCommand(key, this.options[key]);
    }
};

Window_DialogOptions.prototype.itemTextAlign = function () {
    return "left";
};