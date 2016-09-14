var fs = require('fs');
var path = require('path');
var xml = require('xml-parser');
var inspect = require('util').inspect;

var dict = {};
var keyDict = {};
var emojiDict = {};

var FILE_PATH = path.join(__dirname, 'emoji/emoji.xml');

var fileContent = fs.readFileSync(FILE_PATH, 'utf8');

var emojis = xml(fileContent).root.children;

var curKey, curArr, curEmoji;
while(emojis.length) {
    curArr = emojis.pop().children;
    curKey = emojis.pop().content;
    if(curKey === 'readings') {
        continue;
    }
    //console.log(curKey, curArr);
    while(curEmoji = curArr.pop()) {
        curEmoji = curEmoji.content;
        //console.log(curEmoji);

        // fill key dictionary
        if(keyDict.hasOwnProperty(curKey)) {
            keyDict[curKey].push(curEmoji);
            dict[curKey].push(curEmoji);
        } else {
            keyDict[curKey] = [curEmoji];
            dict[curKey] = [curEmoji];
        }

        // fill emoji dictionary
        if(emojiDict.hasOwnProperty(curEmoji)) {
            emojiDict[curEmoji].push(curKey);
            dict[curEmoji].push(curKey);
        } else {
            emojiDict[curEmoji] = [curKey];
            dict[curEmoji] = [curKey];
        }
    }
}

fs.writeFileSync(path.join(__dirname, 'tempData/key.json'), JSON.stringify(keyDict), 'utf8');
fs.writeFileSync(path.join(__dirname, 'tempData/emoji.json'), JSON.stringify(emojiDict), 'utf8');
fs.writeFileSync(path.join(__dirname, 'tempData/all.json'), JSON.stringify(dict), 'utf8');

//console.log(inspect(dict));
//console.log(inspect(keyDict));
//console.log(inspect(emojiDict));
