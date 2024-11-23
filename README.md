# pondashi_prod
ポン出し本番用

- 構成
  - Vite React TypeScriptテンプレート
  - MUI、emotion（MUI同梱）、~~use-soundを使用~~

使用方法
1. src/assets/bgmまたはassets/seフォルダに音声ファイルを入れる（.mp3のみ動作確認済み）
  - 音声ファイルはファイル名頭に`1_`,`2_`,`3_`,`4_`,`5_`,`6_`,`7_`,`se_`のどれかをつけること
1. src/scriptフォルダのスクリプトで、音声ファイルのimport文とコンポーネント呼び出し文を生成する
1. src/components/MainContents.tsxにコンポーネント呼び出し文とimport文を貼り付ける
1. npm run devで開発サーバを起動して使う

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
