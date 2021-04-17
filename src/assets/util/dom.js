// util/common/dom

/**
 * Find DomNode out of vue-instance/vue-ref and all
 * @param instance - vue-instance/vue-ref
 * @returns {*}
 */
export function findDOMNode(instance) {
  let node = instance && (instance.$el || instance);
  while (node && !node.tagName) {
    node = node.nextSibling;
  }
  return node;
}

/**
 * Get element ClientRect, but converted to Object already
 * @param element
 * @returns {{top: number, left: number, bottom: number, width: number, x: number, y: number, right: number, height: number}}
 */
export function getRectObject(element) {
  const { top, right, bottom, left, width, height, x, y } = element.getBoundingClientRect()
  return { top, right, bottom, left, width, height, x, y };
}

/**
 * Add event-listener to a target, then returns an object that contains method to remove-listener
 * @param target {Object} - listen target
 * @param type {string} - event type
 * @param event {Function} - trigger method
 * @param options {Object|Boolean} - add listener options
 * @returns {{remove: Function}}
 */
export function on(target, type, event, options = false) {
  if (!target?.addEventListener) {
    throw Error('target is not a listenable object');
  }

  target.addEventListener(type, event, options);

  return {
    remove: () => {
      if (target.removeEventListener) {
        target.removeEventListener(type, event);
      }
    },
  };
}

export function off(target, type, event) {
  if (target?.removeEventListener) {
    target.removeEventListener(type, event);
  }
}

/**
 * Set classes for parent, or set to all parents.
 * @param type {'add'|'remove'} - action type
 * @param classes {string|string[]} - classes you wanna add or remove
 * @param each {boolean} - is set classes on each generation of parents
 * @param element {HTMLElement} - DOM target
 */
export function setParentClass(
  type,
  classes = [],
  each = false,
  element = document.body
) {
  if (!Array.isArray(classes)) {
    classes = typeof classes === 'string' ? classes.split(' ') : [classes];
  }

  const body = document.body;
  let parent = (element !== body && element.parentElement) || element;

  const process = () => {
    if (type === 'add') {
      classes.forEach((item) => parent.classList.add(item));
    } else if (type === 'remove') {
      classes.forEach((item) => parent.classList.remove(item));
    }
  };

  if (each) {
    while (parent) {
      process();
      parent = parent.parentElement ?? null;
    }
  } else {
    process();
  }
}

// Stored scrollbar native width,
// only update when resize event triggered.
let scrollBarWidth = null;
window.addEventListener('resize', () => {
  scrollBarWidth = getScrollBarWidth(true);
});

/**
 * Get width of native scrollbar.
 * @returns {number|null}
 */
export function getScrollBarWidth(force = false) {
  if (!force && scrollBarWidth !== null) {
    return scrollBarWidth;
  }

  const outer = document.createElement('div');
  outer.className = 'ls-scrollbar__wrap';
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  scrollBarWidth = widthNoScroll - widthWithScroll;

  return scrollBarWidth;
}

/**
 * Set cursor position to the end of element.
 * @param element
 */
export function setCaretToEnd(element) {
  if (!element) return;

  const { childNodes } = element;
  if (!childNodes?.length) return;

  const { [childNodes.length - 1]: lastNode } = childNodes;
  if (!lastNode) return;

  const position = lastNode.length || (lastNode.innerText || lastNode.textContent).length;

  const range = document.createRange();
  const selection = window.getSelection();
  range.setStart(lastNode, position);
  range.setEnd(lastNode, position);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
}
