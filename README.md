# Join Lines Extension for Visual Studio Code

Use Ctrl-j | ⌘-j to join lines, just like in Atom and similar to Sublime Text: the next line is joined to
the current line, and all whitespace is replaced with a single space.

The Rules are:
* If nothing is selected, the current line is joined with the next, and the cursor position is moved to the end
of the original line (minus whitespace)
* If text is selected, and it's all on one line, the current line is joined with the next, and the selection is retained
* If text is selected, and it spans multiple lines, the selected lines are joined, and the selection is retained (minus whitespace)

Multiple selections are also supported.


