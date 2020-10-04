# MQTT Control Map

[![Build Status](https://travis-ci.org/uwap/mqtt-control-map.svg?branch=master)](https://travis-ci.org/uwap/mqtt-control-map)

## Development / Configuration

1. run `yarn` to install all dependencies.
2. run `yarn watch CONFIG` to run a local build server that automatically builds
your the mqtt control map for the given CONFIG everytime something changes.
3. run `yarn dev CONFIG` to create just a single build of the mqtt control map
for the given config.
4. run `yarn build CONFIG` to generate all files for production use.

## Config

See `config/`.

The Config format consists out of two sections. Topics and Controls.

### Topics

The topics section defines the mqtt interfaces.

### Controls

The Controls define the UI Controls.

| Name            | Type              | Optional?  | Default         | Description |
|-----------------|-------------------|------------|-----------------|-------------|
| type | "toggle" \| "dropDown" \| "slider" | No   |                 | The type of the UI element. |
| text            | string            | No         |                 | The text displayed right next to the UI element. |
| topic           | string            | No         |                 | The topic the UI element is supposed to change and/or receive its status from. |
| enableCondition | (key: string, value: *) => boolean | Yes | () => true | This option allows you to enable or disable UI elements, depending on the current state. The first parameter is the internal representation of the value. For example "off". The second parameter is the actual value that was received via MQTT. Return true to enable the element and false to disable it. |
| **Toggle Options**                                                 |
| on              | string            | Yes        | "on"            | If the state is equal to the value of this option the toggle will be toggled on (if the toggled function is not overriden). This is also the value that will be sent when the button is toggled on. |
| off             | string            | Yes        | "off"           | If the state is equal to the value of this option the toggle will be toggled off (if the toggled function is not overriden). This is also the value that will be sent when the button is toggled off. |
| toggled | (key: string, value: *) => boolean | Yes | Use the on and off options | This is the function that decides whether the button should be in a toggled state or not. The parameters are equivalent to those of `enableCondition`. Return true to set the button to a toggled state. Return false to set it to the untoggled state. |
| **DropDown Options**                                               |
| options         | Map<string,string>| Yes        | {}              | This is an attribute set that will map all values defined in the topics section to a description text. For example `{ on: "Lights On", off: "Lights Off" }` will give the drop down element two options, one that is named `Lights On` and one that is named `Lights Off`. |
| **Slider Options**                                                 |
| min             | number            | Yes        | 0               | The minimum value of that slider. |
| max             | number            | Yes        | 1               | The maximum value of that slider. |
| step            | number            | Yes        | 1               | The smallest step of the slider. |
