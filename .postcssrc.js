module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue ({ file }) {
        return file.indexOf('van') !== -1 ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}
