const fs = require('fs');
const path = require('path');
const type = process.argv[2];
const relPath = '../assets/' + type
const s = fs.readdirSync(`${path.resolve(__dirname, relPath)}`);
console.log(s);

// npx tsc ファイルパスでトランスパイルしたcjsファイルを使用する
// node cjsファイルパス < bgm | se > bgmかseを指定

const makeComponentString = (files: string[]) => {
  let str = '';
  for (const file of files) {
    const tempStr = `
<StandardAudioPlayerPanel
  sounds={[${type}${files.indexOf(file)}]}
  defVol={0.2}
  dispName={'${file.split('_').slice(0,-1).join('_')}'}
  bgColor={'case${file.split('_')[0]}'}
/>`
    str = str + tempStr;
  }
  return str;
}

const makeImportString = (files: string[]) => {
  let str = '';
  for (const file of files) {
    const tempStr = `
    import ${type}${files.indexOf(file)} from '../assets/${type}/${file}';`
    str = str + tempStr;
  }
  return str;
}

console.log(makeComponentString(s));
console.log(makeImportString(s));