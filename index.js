/**
 * This module export hyper-visor plugin.
 */

const electron = require('electron');
const { mergeWithDefaultOption } = require('./utils');
const Visor = require('./visor');
const { globalShortcut } = electron;

const VisorPlugin = {};

let visorInstance;
let shortcut;

VisorPlugin.onApp = function registerVisorPlugin(app) {
  const opt = mergeWithDefaultOption(app.config.getConfig().visor || {});

  if (visorInstance) {
    visorInstance.dispose();
  }

  visorInstance = new Visor(app, opt);

  if (shortcut) {
    globalShortcut.unregister(shortcut);
  }

  shortcut = opt.trigger;
  globalShortcut.register(opt.trigger, () => {
    if (visorInstance) visorInstance.onTrigger();
  });
};

VisorPlugin.decorateBrowserOptions = options => {
  return Object.assign({}, options, { show: false });
};

module.exports = VisorPlugin;
