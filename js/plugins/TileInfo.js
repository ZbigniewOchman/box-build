/*:
 * @command GetTile
 */

PluginManager.registerCommand('TileInfo', 'GetTile', args => {
   debugger;

   var sender = $gameMap.event($gameMap._interpreter._eventId);
   var x = sender._x * 2 - $gamePlayer._x;
   var y = sender._y * 2 - $gamePlayer._y;

   var targetSpot = $gameMap.event($gameMap.eventIdXy(x, y));
   var tile = $gameMap.tileId(x, y, 0);
   if (targetSpot != undefined && 
      (targetSpot.event().name == 'BarrelSpot' || targetSpot.event().name == 'Platform')) {
      $gameVariables.setValue(1, 1);
   }

   if (tile == 1589) {
      $gameVariables.setValue(1, 1);
   }
});

