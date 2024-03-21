getSplittedLine = function (line) {
    const letterWidth = fontSize / 2;

    var lines = [];
    while (line.length * letterWidth > panelWidth - (2*xMargin)) {
        for (var i = Math.floor(((panelWidth - (2*xMargin)) / letterWidth)); i > 0; i--) {
            if (line[i] == ' ') {
                lines[lines.length] = line.substring(0, i);
                line = line.substring(i + 1);

                break;
            }
        }
    }

    lines[lines.length] = line;
    return lines;
}