# ~~Join Lines Extension for Visual Studio Code~~

## DEPRECATION NOTICE

First of all, I'd like to thank all the users of this extension. At the time of writing, it has been installed 6,741 times, and it's satisfying to know that people have found it to be useful. Thanks especially to those who gave positive feedback.

**This extension is no longer required**<br>
In the November 2016 release of Visual Studio Code 1.8, a Join Lines command has built into Visual Studio Code [(see release notes)](https://code.visualstudio.com/updates#_sublime-text-compatibility).

As a result, this extension will no longer be maintained.

Cheers<br>
-Wayne

<br>
<br>
<br>
<br>
<br>

## ~~Feature Overview~~

~~Use Ctrl+j | ⌘+j to join lines, just like in Atom and similar to Sublime Text: the next line is joined to
the current line, and all whitespace is replaced with a single space.~~

![join-lines-preview](https://cloud.githubusercontent.com/assets/2899448/11255751/36ee036a-8e48-11e5-8e1f-8889bf2df026.gif)

## ~~Install~~

~~Launch VS Code Quick Open (Ctrl/Cmd+P), paste the following command, and press enter.~~
```
ext install join-lines
```

## ~~Functionality in Detail~~

~~The Rules are:~~
~~* If nothing is selected, the current line is joined with the next, and the cursor position is moved to the end
of the original line (minus whitespace)~~
~~* If text is selected, and it's all on one line, the current line is joined with the next, and the selection is retained~~
~~* If text is selected, and it spans multiple lines, the selected lines are joined, and the selection is retained (minus whitespace)~~

~~Multiple selections are also supported.~~

## ~~Support~~

~~[Create an issue](https://github.com/wmaurer/vscode-join-lines/issues), or ping [@waynemaurer](https://twitter.com/waynemaurer) on Twitter.~~
