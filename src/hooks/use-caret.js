import { ref, computed } from 'vue';
import { diffChars } from 'diff';

// Current
const selection = ref(null);
const range = ref(null);

function getSelection() {
  return window.getSelection();
}
function createRange() {
  return document.createRange();
}
function setRange(node, start, end) {
  const [ childNode ] = node.childNodes;
  if (!childNode) return;

  const newRange = createRange();
  newRange.setStart(childNode, start);
  newRange.setEnd(childNode, end);
  newRange.collapse(start === end);

  const currentSelection = getSelection();
  currentSelection.removeAllRanges();
  currentSelection.addRange(newRange);
  console.log(start, end, newRange);
}
function isInNode(node) {
  return node === selection.value.focusNode.parentNode;
}
function updateSelection(newSelection = getSelection()) {
  selection.value = newSelection;
  range.value = selection.value.getRangeAt(0);
  // console.log(selection.value, range.value);
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

  const storeRange = ref(null);
  const storeContent = ref(null);
  function saveSelection(text) {
    const {
      startOffset, endOffset, collapse,
      commonAncestorContainer, startContainer, endContainer
    } = range.value;
    storeRange.value = {
      startOffset, endOffset, collapse,
      commonAncestorContainer, startContainer, endContainer
    };
    storeContent.value = text;
    console.log('save', storeRange.value);
  }
  function restoreSelection() {
    if (!isCurrent.value) return;

    console.log('store', range.value, storeRange.value);
    const currentText = range.value.commonAncestorContainer.textContent;
    const storeText = storeContent.value;
    console.log(currentText, storeText, diffChars(storeText, currentText));
    //setRange(target.value, storeRange.value.startOffset, storeRange.value.endOffset);
  }

  return {
    selection,
    range,
    isCurrent,
    setRange,
    createRange,
    getSelection,
    saveSelection,
    restoreSelection,
  };
}