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

function setRange(node, start, end) {
  const childNodes = node.childNodes;
  console.log(childNodes, start);

  for (let i = 0; i < childNodes.length; i++) {
    const childNode = childNodes[i];
    const childLength = Math.max((childNode.innerText || childNode.textContent)?.length, 1);

    if (start > childLength || end > childLength) {
      console.log('too long', start, childLength, childNode);
      start -= start > childLength ? childLength : 0;
      end -= end > childLength ? childLength : 0;
      continue;
    }
    if (start === 1 && !(childNode.innerText || childNode.textContent)) {
      start = 0;
      end = 0;
    }

    console.log(start, end);

    const newRange = createRange();
    newRange.setStart(childNode, start);
    newRange.setEnd(childNode, end);
    newRange.collapse(start === end);

    const currentSelection = getSelection();
    currentSelection.removeAllRanges();
    currentSelection.addRange(newRange);
  }
}
function isInNode(node) {
  return node === selection.value.focusNode.parentNode;
}
function updateSelection(newSelection = getSelection()) {
  selection.value = newSelection;
  range.value = selection.value.getRangeAt(0);
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
      commonNode: commonAncestorContainer.parentNode,
    };

    lastContent.value = text;
  }
  function restoreSelection() {
    if (!isCurrent.value) {
      return;
    }

    const currentText = getRangeText(range.value);
    const lastText = lastContent.value;
    const lastOffset = lastRange.value.endOffset;
    const diff = createDiff(lastText, currentText, lastOffset);

    console.log({ lastText }, { currentText }, lastOffset);

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

    setRange(target.value, changedOffset, changedOffset);
  }
  function clearSelection() {
    updateSelection();
  }

  watch(range, () => {
    console.log('watch range', getRangeText(range.value));
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
