// import umijsFabricEsline from "@umijs/fabric/dist/eslint";

export default {
  extends: ["eslint:recommended", "plugin:react/recommended"],
  globals: {},
  plugins: ["react-hooks"],
  rules: {
    "no-restricted-syntax": 0,
    "no-param-reassign": 0,
    "no-unused-expressions": 0,
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
  },
};
