module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
      "react-native-reanimated/plugin",
      ["module-resolver", {
          "root": ["./src"],
          "alias": {
            "api": "./src/api",
            "screens": "./src/screens",
            "components": "./src/components",
            "navigations": "./src/navigations",
            "utils": "./src/utils",
          }
      }]
    ],
  };
};
