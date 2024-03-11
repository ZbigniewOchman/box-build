const fs = require('fs');

function Scene_RightPanel() {
    this.initialize(...arguments);
    this.tweeReader = new TweeReader();
    //$gamePlayer.center(16,11);
    //$gameMap.startScroll(16,11,1    );
    SceneManager._scene._spriteset.updatePosition();
}

Scene_RightPanel.prototype.tweeReader;
Scene_RightPanel.prototype.twee;
Scene_RightPanel.prototype = Object.create(Scene_MenuBase.prototype);
Scene_RightPanel.prototype.constructor = Scene_RightPanel;

Scene_RightPanel.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_RightPanel.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this.addBackground.call(this);

    this.dialogHolders = [];
    this.twee = this.tweeReader.ReadFile("data/Twee/lalka.twee");
    this.optionSelected("Untitled Passage");
}

Scene_RightPanel.prototype.optionSelected = function (option) {

    if (option == "KONIEC GRY") {
        SceneManager.goto(Scene_Title);

        return;
    }

    var dialog = this.twee[option];

    if (dialog.options.length == 0 && dialog.text.length == 0) {
        SceneManager.pop();
        return;
    }
    var previousHeight = 0;

    if (this.options != undefined) {
        previousHeight = this.options.height;
        this.options.close();
    }

    this.options = new Window_DialogOptions(dialog.options, this);
    this.addChild(this.options);
    this.append(dialog.text, this.options.height, previousHeight);
}

Scene_RightPanel.prototype.append = function (text, height, previousHeight) {
    var dialogHolder = new Window_DialogHolder(text, height);
    this.addChild(dialogHolder);
    for (var i = 0; i < this.dialogHolders.length; i++) {
        this.dialogHolders[i].moveUp(dialogHolder.height - (previousHeight - height))
    }

    this.dialogHolders[this.dialogHolders.length] = dialogHolder;
}

Scene_RightPanel.prototype.addBackground = function () {
    var sprite = new Sprite();

    sprite.bitmap = ImageManager.loadPicture('back');
    sprite.x = Graphics.boxWidth / 2;

    this.addChild(sprite);
    this._backgroundFilter.enabled = false;
}


