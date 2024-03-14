/*:
 * @command Show
 *
 * @arg twee
 * @type string
 */

PluginManager.registerCommand('RightPanel', 'Show', args => {
   tweefile = args.twee;
   SceneManager.push(Scene_RightPanel);
});

