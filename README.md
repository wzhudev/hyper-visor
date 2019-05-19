
<div style="text-align: center">
  <img src="./img/icon@2x.png">
</div>

# hyper-visor

Add visor mode to your Hyper terminal.

## Installation

Run this command in your terminal

```bash
$ hyper i silicic-hyper-visor
```

## Config

In you `.hyper.js` file

```js
module.exports = {
  config: {
    visor: {
      trigger: 'command+shift+h', // trigger to open or hide the visor terminal
      position: 'top', // or 'bottom', 'left', 'right'
      width: undefined, // 100% width if not set
      height: 500, // 100% height if not set
      hideOnBlur: true // hide it when the visor terminal blurs
    }
  }
}
```

## Artwork

Icon on [Figma](https://www.figma.com/file/N5iSJfGFNeOWCht6qGxaHMtj/hyper-visor?node-id=2%3A2).

## Known Problems

> I am trying to fix on these problems:

- When you press the trigger shortkey when the visor terminal is focused, it won't bring you back to the previously active application.
- No animation.
- It doesn't reload when you update settings.
- The default size of a new window is messed up.

## License

MIT
