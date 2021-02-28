class Theme {
  constructor(theme) {
    const instance = theme instanceof Function ? theme() : theme;

    if (!instance?.name) throw new Error('Missing Theme property: name');
    if (!instance?.data) throw new Error('Missing Theme property: data');

    this.value = instance;
  }
}

class ThemeManager {
  constructor(options) {
    const _defaultElement = defaultElement();

    if (Object.prototype.toString.apply(options) === '[object Object]') {
      const { element = _defaultElement, themes } = options;
      this.element = element;
      this.themes  = themes.filter(theme => theme instanceof Theme);
    }
    else if (Array.isArray(options)) {
      this.element = _defaultElement;
      this.themes = [].concat(options);
    }
    else {
      throw new Error(`Param 'options' must be Object or Array`);
    }

    this.theme = null;
    if (this.themes.length && this.element) {
      this.setTheme(this.themes[0]);
    }
  }

  setTheme(theme) {
    if (typeof theme === 'string') {
      theme = this.themes.find(row => row.value.name === theme);
    }
    if (!theme instanceof Theme) {
      console.log('is not theme');
      theme = createTheme(theme);
    }

    console.log(theme);

    const variables = createVariables(theme);
    setDocumentVariables(this.element, variables);
    if (this.theme) {
      this.theme.value = theme.value;
    } else {
      this.theme = theme;
    }
  }

  getThemeDataKeys() {
    return this.themes.reduce((collection, theme) => {
      const data = theme.value.data;

      Object.keys(data).forEach(key => {
        const flatMap = createFlatVarMap(data[key]);
        Object.keys(flatMap).forEach(flatMapKey => {
          if (!collection[key]) collection[key] = [];
          if (!collection[key].includes(flatMapKey)) {
            collection[key].push(flatMapKey);
          }
        });
      }, {});

      return collection;
    }, {});
  }
}

function createTheme(module) {
  return new Theme(module?.default ?? module);
}

function createThemeManager(options) {
  return new ThemeManager(options);
}

function createTailwindPreset(themeManager) {
  if (!themeManager instanceof ThemeManager) {
    throw new Error(`Param 'themeManager' must be a ThemeManager`);
  }

  const shape = themeManager.getThemeDataKeys();
  console.log(shape);

  return {
    theme: {
      extend: {
        ...createTailwindThemeData(shape),
      },
    },
  };
}

function defaultElement() {
  try {
    return document.querySelector(':root');
  } catch {
    return void 0;
  }
}

function createVariables(theme) {
  if (!theme instanceof Theme) {
    throw new Error(`Param 'theme' must be a Theme`);
  }

  const { colors } = theme.value.data;

  return {
    ...colors,
  };
}

function setDocumentVariables(element, object) {
  if (!element) return;

  const map = createFlatMap(object);
  Object.keys(map).forEach(key => element.style.setProperty(
    createVarName(key),
    map[key]
  ));
}

function createVarName(name) {
  return name.startsWith('--') ? name : `--${name}`;
}

function createVarContent(name) {
  return `var(${createVarName(name)})`;
}

function createFlatMap(object, inherit = [], reduce = {}) {
  return Object.keys(object).reduce((collection, key) => {
    const value = object[key];
    const names = [].concat(inherit, [ key ]);

    if (Object.prototype.toString.call(value) === '[object Object]') {
      collection = createFlatMap(value, names, reduce);
    } else {
      collection[names.join('-')] = value;
    }

    return collection;
  }, reduce);
}

function createFlatVarMap(object) {
  const flatMap = createFlatMap(object);
  return Object.keys(flatMap).reduce((collection, key) => {
    collection[key] = `var(${createVarName(key)})`;
    return collection;
  }, {});
}

function createTailwindThemeData(shape) {
  return Object.keys(shape).reduce((collection, key) => {
    if (!collection[key]) collection[key] = {};
    shape[key].forEach(shapeKey => {
      collection[key][shapeKey] = createVarContent(shapeKey);
    });

    return collection;
  }, {});
}

export {
  createTheme,
  createThemeManager,
  createTailwindPreset,
};
