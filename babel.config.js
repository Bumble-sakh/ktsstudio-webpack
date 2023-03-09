module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const isProd = process.env.NODE_ENV === 'production';
  const presets = ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript', 'babel-preset-mobx'];
  const plugins = [
    'module:fast-async',
    '@babel/plugin-proposal-optional-chaining',
    !isProd && 'react-refresh/babel',
  ].filter(Boolean);

  return {
    presets,
    plugins,
  };
};
