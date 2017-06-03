const version = '2017060303';
const cdn = 'https://oqyv3hzi3.bkt.clouddn.com';
const setting = {
  "entry": "src/index.js",
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        ["import", { "libraryName": "antd", "style": "css" }]
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime",
        ["import", { "libraryName": "antd", "style": "css" }]
      ],
      // "outputPath": `./dist/${version}`,
      // "publicPath": `${cdn}$/${version}/`,
    }
  },
};

export default setting;
