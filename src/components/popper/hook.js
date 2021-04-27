import { createPopper } from '@popperjs/core';
import { findDOMNode } from '@/assets/util/dom';
import { watch, nextTick, onBeforeUnmount } from 'vue';

const handleOffset = (offset, ...params) => {
  if (typeof offset === 'number') {
    return [ offset, offset ];
  } else {
    return offset instanceof Function ? offset(...params) : offset;
  }
};

const usePopper = ({ target, popper, props }) => {
  if (!target || !popper || !props) {
    throw new Error('Missing property: target|popper|props');
  }

  let instance;

  const rebindPopper = () => {
    const { offset, placement } = props;
    if (instance) {
      instance.destroy();
      instance = null;
    }

    const options = {
      placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: (context) => handleOffset(offset, context),
          },
        },
        {
          name: 'arrow',
          options: {
            padding: 5, // 5px from the edges of the popper
          },
        },
      ],
    };

    instance = createPopper(
      findDOMNode(target.value),
      findDOMNode(popper.value),
      options
    );
  };

  const record = {
    target: null,
    popper: null,
  };
  function onElementsUpdate() {
    if (target.value && popper.value) {
      if (target.value !== record.target || popper.value !== record.target) {
        record.target = target.value;
        record.popper = popper.value;

        // Only rebind popper when target and popper both exists
        nextTick(() => {
          if (findDOMNode(target.value) && findDOMNode(popper.value)) {
            rebindPopper(props);
          }
        });
      }
    }
  }
  watch([target, popper], onElementsUpdate);

  const updatePopper = () => {
    try {
      return instance ? instance.update() : void 0;
    } catch(error) {
      console.error(error);
    }

  };

  onBeforeUnmount(() => {
    if (instance) {
      instance.destroy();
      instance = null;
    }
  });

  return {
    instance,
    rebindPopper,
    updatePopper,
  };
};

export default usePopper;
export {
  usePopper,
};