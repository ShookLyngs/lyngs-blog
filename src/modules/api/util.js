/**
 * 传入 <路径预设配置>，返回 当前预设
 *
 * @param {Object<string, Object<string, string>>} setups
 * @param {string} activate - 当前启用的预设名称
 * @returns {Object}
 */
export function createSetup({ setups, activate }) {
  const all = setups?.all ?? {};

  const setup = setups[activate] ?? {};
  const certainAll = setup?.all ?? {};
  const certainSetup = setup?.[process.env.NODE_ENV] ?? setup;

  return {
    ...all,
    ...certainAll,
    ...certainSetup,
  };
}

/**
 * 创建并初始化 API 模块
 *
 * @param {Function} initializer
 * @returns {{}|{useGlobalHttp: (function(*): *), http}}
 */
export function createHttpModule(initializer) {
  if (!(initializer instanceof Function)) return {};

  const http = initializer();

  function install(app) {
    app.config.globalProperties.$http = http;
    app.provide('http', http);
  }

  http.install = install;

  return {
    http,
    install,
  };
}