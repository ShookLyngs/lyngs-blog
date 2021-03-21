/**
 * Set classes for parent, or set to all parents.
 * @param type {'add'|'remove'} - action type
 * @param classes {string|string[]} - classes you wanna add or remove
 * @param each {boolean} - is set classes on each generation of parents
 * @param element {HTMLElement} - DOM target
 */

export const setParentClass = (type, classes = [], each = false,element = document.body) => {
  if (!Array.isArray(classes)) {
    classes = typeof classes === 'string' ? classes.split(' ') : [ classes ];
  }

  const body   = document.body;
  let   parent = (element !== body && element.parentElement) || element;

  const process = () => {
    if (type === 'add') {
      classes.forEach(item => parent.classList.add(item));
    } else if (type === 'remove') {
      classes.forEach(item => parent.classList.remove(item));
    }
  };

  if (each) {
    while(parent) {
      process();
      parent = parent.parentElement ?? null;
    }
  } else {
    process();
  }
};

/**
 * Create a throttle that will delay.
 * Each call will reset the last undone timer.
 * @param callback {Function}
 * @param delay {number} - timer will be processed after delay.
 * @returns {Function}
 */
export const delayThrottle = (callback, delay = 200) => {
  let timer = null;

  const event = (args = []) => {
    timer = null;
    callback(...args);
  };

  const throttle = (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => event(args), delay);
  };
  throttle.cancel = () => clearTimeout(timer);

  return throttle;
};