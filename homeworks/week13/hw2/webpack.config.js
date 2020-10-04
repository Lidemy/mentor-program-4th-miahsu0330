/* eslint-disable */
const path = require('path');

module.exports = {
    // mode: 'development',                     // 開發方式: 'production': 'none', 'development', 'production'
    entry: './src/index.js',                    // 程式入口點
    output: {
        filename: 'main.js',                    // 輸出的檔案名稱
        path: path.resolve(__dirname, 'dist'),  // 輸出的資料夾
        library: 'commentPlugin',
    },
};