//把前面的配置都写在这里统一管理
//项目中就不用再写了
fis.config.set('roadmap.path', [{
  reg: 'lib/*.js',
  isMod: false
}, {
  reg: '**/*.js',
  isMod: true
}]);
//插件与配置
fis.config.merge({
  roadmap: {
    domain: '.'
  },
  modules: {
    lint: {
      js: 'jshint',
      css: 'csslint'
    },
    postpackager: ['autoload']
  },
  settings: {
    postprocessor: {
      jswrapper: {
        type: 'amd'
      }
    },
    postpackager: {
      autoload: {
        useSiteMap: false
      }
    },
    lint: {
      jshint: {
        ignored: ['lib/**.js'],
      }
    }
  }
});
