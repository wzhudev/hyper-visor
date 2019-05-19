const electron = require('electron');
const { Menu, BrowserWindow } = electron;
const { showInCurrentWorkspace, isMac } = require('./utils');

class Visor {
  constructor(app, opt) {
    this.app = app;
    this.config = opt;

    // Hide the icon.
    if (this.config.hideDock) this.app.dock.hide();
  }

  onTrigger() {
    if (!this.visorWindow) {
      this.previouslyFocusedApp = BrowserWindow.getFocusedWindow();
      this.createVisorWindow(() => {
        this.layoutWindow();
        this.visorWindow.focus();
      });
      return;
    }

    const focused = this.visorWindow.isFocused();
    const visible = this.visorWindow.isVisible();
    const fullScreen = this.visorWindow.isFullScreen();

    if (focused) {
      if (!fullScreen) {
        this.toggleVisible(false);
      }
      this.returnFocus();
      return;
    }

    if (visible) {
      this.layoutWindow();
      this.toggleVisible(true);
      return;
    }

    this.previouslyFocusedApp = BrowserWindow.getFocusedWindow();
    this.layoutWindow();
    this.toggleVisible(true);
  }

  createVisorWindow(cb) {
    // FIXME: not save this window's layout as default, otherwise it would create a full-size terminal the next time terminal startup.
    this.app.createWindow(window => {
      this.visorWindow = window;
      this.visorWindow.on('close', () => {
        this.handleVisorWindowClose();
      });
      this.visorWindow.on('blur', () => {
        if (this.config.hideOnBlur) {
          this.visorWindow.hide();
          this.returnFocus();
        }
      });
      window.rpc.emit('termgroup add req'); // Init terminal in the new window.
      if (cb) cb();
    });
  }

  playSound() {}

  /**
   * Layout the visor on the correct position.
   */
  layoutWindow() {
    const screen = electron.screen;
    const point = screen.getCursorScreenPoint();
    const display = screen.getDisplayNearestPoint(point);
    const bounds = display.workArea;
    const { height, width } = bounds;

    switch (this.config.position) {
      case 'bottom':
        bounds.y += this.config.height || height / 2;
        bounds.width = this.config.width || width;
      case 'top':
        bounds.height = this.config.height || height / 2;
        bounds.width = this.config.width || width;
        break;
      case 'right':
        bounds.x += this.config.width || width / 2;
        bounds.height = this.config.height || height;
      case 'left':
        bounds.width = this.config.width || width / 2;
        bounds.height = this.config.height || height;
        break;
    }

    bounds.y = Math.round(bounds.y);
    bounds.width = Math.round(bounds.width);
    bounds.x = Math.round(bounds.x);
    bounds.height = Math.round(bounds.height);

    this.visorWindow.setBounds(bounds);
  }

  handleVisorWindowClose() {
    this.visorWindow = null;
  }

  toggleVisible(visible) {
    if (visible) {
      this.visorWindow.show();
      this.visorWindow.focus();
      showInCurrentWorkspace(this.visorWindow);
    } else {
      this.visorWindow.hide();
    }
  }

  returnFocus() {
    if (((this.previouslyFocusedApp || {}).sessions || {}).size) {
      this.previouslyFocusedApp.focus();
    }
    // FIXME: return focus without hiding other windows of Hyper.
    // else if (isMac) {
    //   // If it's on Mac, missing this would lead to focusing on Hyper.
    //   Menu.sendActionToFirstResponder('hide:');
    // }
  }

  dispose() {
    if (this.visorWindow) {
      this.visorWindow.dispose();
      this.visorWindow = null;
    }
  }
}
module.exports = Visor;
