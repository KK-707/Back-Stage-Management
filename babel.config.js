module.exports = {
  presets: [
    "@vue/cli-plugin-babel/preset",
    ["@babel/preset-env", { modules: false }], // 让babel转码不要将es6的模块化语法转化为common.js中的require
  ],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk",
      },
    ],
  ],
};
