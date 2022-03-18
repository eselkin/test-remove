module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  rules: {},
  globals: {
    React: true,
    google: true,
    mount: true,
    mountWithRouter: true,
    shallow: true,
    shallowWithRouter: true,
    context: true,
    expect: true,
    jsdom: true,
  },
  extends: ['plugin:prettier/recommended'],
};
