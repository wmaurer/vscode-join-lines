import * as vscode from 'vscode';

const whitespaceAtStartOfLine = /^\s*/;
const whitespaceAtEndOfLine = /\s*$/;

export function activate() {

	vscode.commands.registerTextEditorCommand('extension.join-lines', (textEditor, edit) => {
		const document = textEditor.getTextDocument();

		const newSelections: { numLinesRemoved: number, selection: vscode.Selection }[] = [];

		textEditor.edit(editBuilder => {
			const onlyOneSelection = textEditor.getSelections().length === 1;
			textEditor.getSelections()
				.forEach(selection => {
					if (isRangeSimplyCursorPosition(selection)) {
						const newSelectionEnd =  document.getLineMaxColumn(selection.start.line) - joinLineWithNext(selection.start.line, editBuilder, document).whitespaceLengthAtEnd;
						newSelections.push({
							numLinesRemoved: 1,
							selection: new vscode.Selection(
								selection.start.line, newSelectionEnd,
								selection.end.line, newSelectionEnd)
						});
					} else if (isRangeOnOneLine(selection)) {
						joinLineWithNext(selection.start.line, editBuilder, document);
						newSelections.push({ numLinesRemoved: 1, selection });
					} else {
						const numberOfCharactersOnFirstLine = document.getLineMaxColumn(selection.start.line);
						let endCharacterOffset = 0;
						for (let lineIndex = selection.start.line; lineIndex <= selection.end.line - 1; lineIndex++) {
							const charactersInLine = lineIndex == selection.end.line - 1 ? selection.end.character : document.getLineMaxColumn(lineIndex + 1);
							const whitespaceLengths = joinLineWithNext(lineIndex, editBuilder, document);
							endCharacterOffset += charactersInLine - whitespaceLengths.whitespaceLengthAtEnd - whitespaceLengths.whitespaceLengthAtStart;
						}
						newSelections.push({
							numLinesRemoved: selection.end.line - selection.start.line,
							selection: new vscode.Selection(
								selection.start.line, selection.start.character,
								selection.start.line, numberOfCharactersOnFirstLine + endCharacterOffset)
						});
					}
				});
		}).then(() => {
			const selections = newSelections.map((x, i) => {
				const { numLinesRemoved, selection } = x;
				const numPreviousLinesRemoved = i == 0 ? 0 : newSelections.slice(0, i).map(x => x.numLinesRemoved).reduce((a, b) => a + b);
				const newLineNumber = selection.start.line - numPreviousLinesRemoved;
				return new vscode.Selection(newLineNumber, selection.start.character, newLineNumber, selection.end.character);
			});

			textEditor.setSelections(selections);
		});
	});
}

function isRangeOnOneLine(range: vscode.Range): boolean {
	return range.start.line === range.end.line;
}

function isRangeSimplyCursorPosition(range: vscode.Range): boolean {
	return isRangeOnOneLine(range) && range.start.character === range.end.character;
}

function joinLineWithNext(line: number, editBuilder: vscode.TextEditorEdit, document: vscode.TextDocument): { whitespaceLengthAtEnd: number, whitespaceLengthAtStart: number } {
	const matchWhitespaceAtEnd = document.getTextOnLine(line).match(whitespaceAtEndOfLine);
	const matchWhitespaceAtStart = document.getTextOnLine(line + 1).match(whitespaceAtStartOfLine);
	const range = new vscode.Range(
		line, document.getLineMaxColumn(line) - matchWhitespaceAtEnd[0].length,
		line + 1, matchWhitespaceAtStart[0].length + 1);
	editBuilder.replace(range, ' ');
	return {
		whitespaceLengthAtEnd: matchWhitespaceAtEnd[0].length,
		whitespaceLengthAtStart: matchWhitespaceAtStart[0].length
	}
}
