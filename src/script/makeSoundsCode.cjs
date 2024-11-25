"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var path = require('path');
var type = process.argv[2];
var relPath = '../assets/' + type;
var s = fs.readdirSync("".concat(path.resolve(__dirname, relPath)));
console.log(s);
// npx tsc ファイルパスでトランスパイルしたcjsファイルを使用する
// node cjsファイルパス < bgm | se > bgmかseを指定
var makeComponentString = function (files) {
    var str = '';
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        var tempStr = "\n<StandardAudioPlayerPanel\n  sounds={[".concat(type).concat(files.indexOf(file), "]}\n  defVol={0.2}\n  dispName={'").concat(file, "'}\n  bgColor={'case").concat(file.split('_')[0], "'}\n/>");
        str = str + tempStr;
    }
    return str;
};
var makeImportString = function (files) {
    var str = '';
    for (var _i = 0, files_2 = files; _i < files_2.length; _i++) {
        var file = files_2[_i];
        var tempStr = "\n    import ".concat(type).concat(files.indexOf(file), " from '../assets/").concat(type, "/").concat(file, "';");
        str = str + tempStr;
    }
    return str;
};
console.log(makeComponentString(s));
console.log(makeImportString(s));
