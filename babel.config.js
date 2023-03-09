module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const isProd = process.env.NODE_ENV === 'production';
  const presets = [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
    'mobx',
  ];
  const plugins = [
    '@babel/plugin-proposal-optional-chaining',
    ['module:fast-async', { spec: true }],
    !isProd && 'react-refresh/babel',
  ].filter(Boolean);

  return {
    presets,
    plugins,
  };
};
