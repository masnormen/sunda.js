module.exports = (api) => {
  api.cache(true);
  return {
    presets: [
      "@babel/preset-typescript"
    ],
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-private-methods",
      "@babel/plugin-transform-runtime",
      "@babel/plugin-transform-regenerator",
      "@babel/plugin-transform-async-to-generator",
    ],
  };
};
