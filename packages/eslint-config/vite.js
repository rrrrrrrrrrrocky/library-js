module.exports = [
  {
    plugins: {
      "react-refresh": require("eslint-plugin-react-refresh"),
    },
    rules: Object.freeze({
      "react-refresh/only-export-components": [
        "error",
        { allowConstantExport: true },
      ],
    }),
  },
];
