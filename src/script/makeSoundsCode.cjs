"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var path = require('path');
var type = process.argv[2];
var relPath = '../assets/' + type;
var s = fs.readdirSync("".concat(path.resolve(__dirname, relPath)));
console.log(s);
var makeComponentString = function (files) {
    var str = '';
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        var tempStr = "\n<StandardAudioPlayerPanel\n  sounds={[sound".concat(files.indexOf(file), "]}\n  defVol={0.2}\n  dispName={'").concat(file, "'}\n  bgColor={'se'}\n/>");
        str = str + tempStr;
    }
    return str;
};
var makeImportString = function (files) {
    var str = '';
    for (var _i = 0, files_2 = files; _i < files_2.length; _i++) {
        var file = files_2[_i];
        var tempStr = "\n    import sound".concat(files.indexOf(file), " from '../assets/").concat(file, "';");
        str = str + tempStr;
    }
    return str;
};
console.log(makeComponentString(s));
console.log(makeImportString(s));
