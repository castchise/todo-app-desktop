# Desktop ToDo Application

## About

Simple todo application with an ability to pause and edit timer, removal of the items themselves and a couple of QoL features. (hotkeys, dark theme)

### Installation

Download latest release installer on https://github.com/castchise/todo-app-desktop/releases

### Support

Currently only Windows OS is supported.
_(extension of `makers` is available through `forge.config`)_

    makers: [
        new MakerSquirrel({
          iconUrl: path.join(__dirname, "/src/assets/icon.ico"),
          setupIcon: path.join(__dirname, "/src/assets/icon.ico"),
        }),
        ... // extend with another forge maker
      ],

### Tech-Stack

- electron / electron-forge
- shadcn, tailwind, lucide-react
- dayjs
