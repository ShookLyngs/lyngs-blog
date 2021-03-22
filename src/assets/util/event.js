import raf from 'raf';

/**
 * Create an throttle function using raf(requestAnimationFrame).
 * @param callback
 * @returns {Function}
 */
export const animationFrameThrottle = (callback) => {
  let id = null;

  const event = (args = []) => () => {
    id = null;
    callback(...args);
  };

  const throttle = (...args) => {
    if (id === null) {
      id = raf(event(args));
    }
  };
  throttle.cancel = () => raf.cancel(id);

  return throttle;
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