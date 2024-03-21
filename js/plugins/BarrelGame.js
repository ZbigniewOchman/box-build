/*:
 * @command SwitchPressed
 */

PluginManager.registerCommand('BarrelGame', 'SwitchPressed', args => {
   var barrels = [];
   var barrelSpots = [];
   var platform = [];

   $gameMap.data()[9][4] = 0; // Wartość 0 reprezentuje pusty kafelek
   $gameMap.events().forEach(function (event) {
      var name = event.event().name;

      if (name == 'Barrel') {
         barrels.push(event);
      }

      if (name == 'BarrelSpot') {
         platform.push(event);
         barrelSpots.push(event);
      }

      if (name == 'Platform') {
         platform.push(event);
      }
      if (name == 'Switch') {
         platform.push(event);
      }
   });

   var barrelsOnSpot = 0;
   (barrels).forEach(barrel => {
      (barrelSpots).forEach(barrelSpot => {
         if (barrel.x == barrelSpot.x && barrel.y == barrelSpot.y) {
            barrelsOnSpot++;
         }
      });
   });



   if (barrelsOnSpot == barrels.length) {
    
      $gameVariables.setValue(2, 1);
      platform.forEach(function (event) {
         var switchKey = [$gameMap.mapId(), event.eventId(), 'A'];
   
         $gameSelfSwitches.setValue(switchKey, true);
      });
   
      barrels.forEach(function (event) {
         var switchKey = [$gameMap.mapId(), event.eventId(), 'A'];
   
         $gameSelfSwitches.setValue(switchKey, true);
      });
   }

});

