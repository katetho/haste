//babel helps jest recognize import/export statements
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
   '@babel/preset-typescript'
  ]
};
