function TweeReader() { }


TweeReader.prototype.ReadFile = function (fileName) {
    var data = fs.readFileSync(fileName, 'utf8');
    var links = this.Parse(data);

    return links;
}

TweeReader.prototype.Parse = function (content) {
    const lines = content.split('\n');

    var dictionary = {};
    let passage = null;
    lines.forEach(line => {
        line = line.trim();

        if (line.startsWith("::")) {
            if (passage) {
                dictionary[passage.title] = {
                    text: passage.text,
                    options: passage.options
                }
            }

            const title = line.slice(2).split('{')[0].trim();
            passage = {
                title: title,
                text: [],
                options: []
            };
        } else if (passage) {
            if (line.includes('[[')) {
                var option = line.split("[[")[1].split("]]")[0].split('|');

                passage.options[option[0]] = option[option.length - 1];
            }
            else if (line.trim().length > 0) {
                passage.text.push(line);
            }
        }
    });

    if (passage) {
        dictionary[passage.title] = {
            text: passage.text,
            options: passage.options
        }
    }

    return dictionary;
}
