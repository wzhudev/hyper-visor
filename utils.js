const DEBUG = process.env.NODE_ENV === 'development' || process.env.DEBUG || false;

const defaultOpt = {
  trigger: 'command+shift+h',
  position: 'top',
  height: 400,
  hideOnBlur: true
};

const isMac = process.platform === 'darwin';

if (DEBUG) {
  log = require('electron-log');
  log.transports.file.level = 'silly';
}

function debug(...args) {
  if (DEBUG) {
    console.error('hyper-visor:', ...args);
    log.info('hyper-visor:', ...args);
  }

  let log;
}

/**
 * Make a window move to the current activated workspace.
 * Ref: https://github.com/electron/electron/issues/8734#issuecomment-350145566
 * @param {BrowserWindow} window Window that should be displayed
 */
function showInCurrentWorkspace(window) {
  window.setVisibleOnAllWorkspaces(true);
  window.focus();
  window.setVisibleOnAllWorkspaces(false);
}

function mergeWithDefaultOption(opt) {
  return Object.assign({}, defaultOpt, opt);
}

module.exports = {
  debug,
  showInCurrentWorkspace,
  mergeWithDefaultOption,
  isMac
};
