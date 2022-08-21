# yt playlist sorter 🚀

yeah but how do i use it?

## Installation

1. `git clone https://github.com/anujjoshi63/yt-sort-chrome-extension.git`

1. run `npm run build` **note: this will fail on windows. read solution before judging :)**

1. go to `chrome://extensions/`

1. enable developer mode

1. click on `load unpacked`

1. select the `build` folder

1. enjoy

## solution for windows

Goto `package.json` and change the `build` script to

```cmd
set INLINE_RUNTIME_CHUNK=true && craco build
```
