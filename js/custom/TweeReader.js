function TweeReader() { }

TweeReader.prototype.ReadFile = function (path, aaa) {
  return new Promise(function (callback, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", path, true);

    xhr.onload = function () {
      if (xhr.status == 200) {
        var dictionary = TweeReader.prototype.Parse(xhr.responseText);
        callback(dictionary);
        aaa.tweeData(dictionary);
      } else {
        reject(new Error("Błąd podczas odczytu pliku"));
      }
    };

    xhr.onerror = function () {
      reject(new Error("Błąd sieciowy"));
    };

    xhr.send();
  });
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

TweeReader.prototype.GetStartPassage = function (dictionary) {
  for (var i = 0; i < dictionary["StoryData"].text.length; i++) {
    var splited = dictionary["StoryData"].text[i].split('"start": "')
    if (splited.length > 1) {
      var result = splited[1].split('"')[0];

      return result;
    }
  }
}