module.exports = {
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    'eslint:recommended'
  ],
  plugins: ['vue'],
  rules: {
    // prop 必须使用短线连接，不允许使用驼峰命名法
    'vue/attribute-hyphenation': 'error',
    // 使用短线命名法给 component 命名
    'vue/component-definition-name-casing': [ 'warn', 'kebab-case' ],
    // 在 HTML 中优先使用双引号
    'vue/html-quotes': [ 'error', 'double', { 'avoidEscape': false } ],
    // 每行最多同时存在 3 个prop
    'vue/max-attributes-per-line': [ 'error', {
      'singleline': 3,
      'multiline': {
        'max': 3,
        'allowFirstLine': false
      }
    }],
    // 允许空行
    'vue/multiline-html-element-content-newline': ['error', {
      'allowEmptyLines': true
    }]
  }
};
