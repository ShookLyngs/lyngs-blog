import { ref, computed, watch } from 'vue';
import createDiff from 'fast-diff';

// Current
const selection = ref(null);
const range = ref(null);

function getSelection() {
  return window.getSelection();
}
function createRange() {
  return document.createRange();
}
function getRangeText(target) {
  const parent = target.commonAncestorContainer.parentNode;
  if (parent) return parent.innerText;

  const { innerText, textContent } = target.commonAncestorContainer;
  return innerText ?? textContent;
}

function getRelativeOffset(wrapper, inner, innerOffset, inheritOffset = 0) {
  const { childNodes } = wrapper;
  const wrapperContent = wrapper.innerText || wrapper.textContent;

  console.log('node-start', childNodes, inner, innerOffset);
  for (let i = 0; i < childNodes.length; i++) {
    const childNode = childNodes[i];
    const isLastNode = i + 1 >= childNodes.length;

    console.log(`node-${i}-0`, childNode.textContent, inner.textContent, childNode === inner);
    if (childNode === inner) {
      console.log(`node-${i}-1`);
      const fixLength = innerOffset === 0 && isLastNode && childNode.nodeName === 'BR' ? 1 : 0;
      return inheritOffset + innerOffset + fixLength;
    } else if (childNode.childNodes?.length) {
      console.log(`node-${i}-2`);
      inheritOffset = getRelativeOffset(childNode, inner, innerOffset, inheritOffset);
    } else {
      console.log(`node-${i}-3`, wrapperContent);
      const { innerText, textContent } = childNode;
      const nodeLength = Math.max((innerText || textContent).length, 1);
      inheritOffset += wrapperContent?.length ? nodeLength : 0;
    }
  }

  return inheritOffset;
}

function setRange(node, start, end) {
  console.log('offset-start', start);
  const childNodes = node.childNodes;

  for (let i = 0; i < childNodes.length; i++) {
    const childNode = childNodes[i];
    const childLength = Math.max((childNode.innerText || childNode.textContent)?.length, 1);

    if (start > childLength || end > childLength) {
      start -= start > childLength ? childLength : 0;
      end -= end > childLength ? childLength : 0;
      continue;
    }
    if (start === 1 && !(childNode.innerText || childNode.textContent)) {
      start = 0;
      end = 0;
    }

    console.log('offset-end', start, { childNode });

    const newRange = createRange();
    newRange.setStart(childNode, start);
    newRange.setEnd(childNode, end);
    newRange.collapse(start === end);

    const currentSelection = getSelection();
    currentSelection.removeAllRanges();
    currentSelection.addRange(newRange);
    break;
  }
}
function isInNode(node) {
  return node === selection.value.focusNode.parentNode;
}
function updateSelection(newSelection = getSelection()) {
  try {
    selection.value = newSelection;
    range.value = selection.value.getRangeAt(0);
  } catch {
    /**/
  }
}

document.addEventListener('selectionchange', () => updateSelection());

export function useCaret(target) {
  const isCurrent = computed(() => {
    if (target.value) {
      return isInNode(target.value);
    } else {
      return false;
    }
  });

  const lastTarget = ref(null);
  const lastRange = ref(null);
  const lastContent = ref(null);
  function saveSelection(text) {
    const {
      startOffset, endOffset, collapse,
      startContainer, endContainer, commonAncestorContainer,
    } = range.value;
    lastRange.value = {
      startOffset,
      endOffset,
      collapse,
      startContainer,
      endContainer,
      commonAncestorContainer,
    };

    lastTarget.value = {
      childNodes: [ ...target.value.childNodes ],
      innerText: text,
    };

    lastContent.value = text;
  }
  function restoreSelection() {
    if (!isCurrent.value) return;

    const currentText = getRangeText(range.value);
    const lastText = lastContent.value;
    console.log('last-range', lastRange.value);
    const lastOffset = getRelativeOffset(lastTarget.value, lastRange.value.endContainer, lastRange.value.endOffset);
    const isLastAtEnd = lastText.length === lastOffset;
    const diff = createDiff(lastText, currentText, lastOffset).map(row => [row[0], row[1], row[1].length]);

    let changedOffset = lastOffset;
    for (let i = 0; i < diff.length; i++) {
      const rowState = diff[i][0];
      const rowContent = diff[i][1];
      if (rowState < 0) {
        changedOffset -= rowContent.length;
      } else if (rowState > 0) {
        changedOffset += rowContent.length;
      }
    }
    changedOffset = Math.max(Math.min(changedOffset, currentText.length), 0);

    console.log('offset-diff', diff, lastText.length, lastOffset, isLastAtEnd);
    console.log('offset-start', lastRange.value.endOffset, lastOffset, changedOffset);
    setRange(target.value, changedOffset, changedOffset);
  }
  function clearSelection() {
    updateSelection();
  }

  watch(range, () => {
    if (range.value) {
      saveSelection(getRangeText(range.value));
    }
  });

  return {
    selection,
    range,

    isCurrent,

    lastRange,
    lastContent,
    saveSelection,
    restoreSelection,
    clearSelection,
  };
}
