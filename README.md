# edk2-uni-formatter

The Microsoft VSCode extension formats EDK2 unicode files(_.uni_).

## Installation

Via Visual Studio Marketplace [edk2-uni-formatter](https://marketplace.visualstudio.com/items?itemName=pinshengjuan.edk2-uni-formatter)

## Under editor text focus

- Under _.uni_ file, right click and select "Formate Document".
  ![](img/gif/uni-editor.gif)

## Under EXPLORER

- Right click and select "Formate Document"(support both single file and multiple files).
  ![](img/gif/uni-explorer-single.gif)
  ![](img/gif/uni-explorer-multi.gif)

## Keybinding

- editor text focus.
  ![](img/gif/uni-keybinding-editor.gif)
- EXPLORER (single file).
  ![](img/gif/uni-keybinding-exp-single.gif)
- EXPLORER (multiple files).
  ![](img/gif/uni-keybinding-exp-multi.gif)

### Configuration

1. The configuration "End Of Line With":
   The escape code that adds at the end of each line.
2. The configuration "Space Between Token and LanguageCode":
   The extension will first make an alignment base on the longest name of Token, then this configuration is used to add space(s) behind, the number of space(s) is/are user's define.

### Unsupported encoding: UTF-16 BE
