module.exports = {
  plugins: [
    ["relay"],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    ["@babel/plugin-proposal-private-methods", { loose: true }],
    ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
    ["react-native-reanimated/plugin"],
    [
      "import",
      {
        libraryName: "lodash",
        libraryDirectory: "",
        camel2DashComponentName: false,
      },
      "lodash",
    ],
  ],
  presets: ["@expo/next-adapter/babel", "next/babel"],
  env: {
    development: {
      presets: [
        [
          "next/babel",
          {
            "preset-env": {
              targets: {
                node: "current",
                browsers: "last 2 chrome versions",
              },
            },
          },
        ],
      ],
    },
  },
};
