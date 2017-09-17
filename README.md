# RZL Map

## How to set up

1. run `yarn` to install all dependencies.
2. run `yarn build` to compile everything
3. open the `index.html`
4. ???
5. profit

## Config

See `src/config.js`.

The Config format consists out of two sections. Topics and Controls.

### Topics

The topics section defines the mqtt interfaces.

### Controls

The Controls define the UI Controls.

| Name            | Type              | Optional?  | Default         |
|-----------------|-------------------|------------|-----------------|
| type | "toggle" &#124; "dropDown" &#124; "slider" | No |           |
| text            | string            | No         |                 |
| topic           | string            | No         |                 |
| enableCondition | string => boolean | Yes        | () => true      |
| **Toggle Options**                                                 |
| on              | string            | Yes        | "on"            |
| off             | string            | Yes        | "off"           |
| toggled         | string => boolean | Yes        | x => x == "off" |
| **DropDown Options**                                               |
| options         | Map<string,*>     | Yes        | {}              |
| **Slider Options**                                                 |
| min             | number            | Yes        | 0               |
| max             | number            | Yes        | 1               |
| step            | number            | Yes        | 1               |
