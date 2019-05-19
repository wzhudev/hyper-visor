const defaultOpt = {
  trigger: 'command+shift+h',
  position: 'top',
  height: 400,
  hideOnBlur: false
};

const isMac = process.platform === 'darwin';

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
  showInCurrentWorkspace,
  mergeWithDefaultOption,
  isMac
};
