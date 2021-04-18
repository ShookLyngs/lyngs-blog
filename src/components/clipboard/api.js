import { inject } from 'vue';
import Clipboard from 'clipboard';

const clipboardKey = 'clipboard';

function createOptions(options) {
  return Object.assign({
    appendToBody: true,
  }, options);
}

export function install(app) {
  app.config.globalProperties.$copyText = copyText;
  app.provide(clipboardKey, { copyText });
}

export function useClipboard() {
  return inject(clipboardKey);
}

export function copyText(text, config) {
  const options = createOptions(config);

  const button = document.createElement('button');
  const clipboard = new Clipboard(button, {
    text: () => text,
  });

  if (options.appendToBody) {
    document.body.appendChild(button);
  }
  function destroy() {
    clipboard.destroy();
    if (options.appendToBody) {
      document.body.removeChild(button);
    }
  }

  return new Promise((resolve, reject) => {
    clipboard.once('success', event => {
      destroy();
      resolve(event);
    });
    clipboard.once('error', event => {
      destroy();
      reject(event);
    });

    button.click();
  });
}