import { lowlight } from 'lowlight';
import type { Span, Text } from 'lowlight/lib/core';
import haskell from 'highlight.js/lib/languages/haskell';

import { LangsType } from './types';

// Register additional languages and aliases to lowloight
lowlight.registerLanguage('haskell', haskell);
lowlight.registerAlias('haskell', 'Haskell');
lowlight.registerAlias('javascript', ['React', 'NextJS']);

/**
 * Adds line numbers into code snippet text for proper representation
 * @param snippet
 * @returns Populated with line numbers value of initial snippet
 */
function addLineNumsToSnippet(snippet: string): string {
  if (snippet.length === 0) return snippet;

  let lineCounter = 1;
  // Mark the first line
  let populatedSnippet: string = `${lineCounter}  ${snippet}`;
  lineCounter++;

  for (let i = 3; i < populatedSnippet.length; i++) {
    if (populatedSnippet.charCodeAt(i) === 10) {
      let counterNum: string;
      if (lineCounter < 10) {
        counterNum = `${lineCounter}  `;
      } else {
        counterNum = `${lineCounter} `;
      }

      populatedSnippet =
        populatedSnippet.slice(0, i + 1) +
        counterNum +
        populatedSnippet.slice(i + 1);
      lineCounter++;
    }
  }

  return populatedSnippet;
}

/**
 * Adds special class name for a line number inside code snippet
 * @param elements
 * @returns Changed list of elements
 */
function changeClassForLineNumbers(
  elements: (Span | Text)[],
  className?: string
) {
  if (!className) className = 'code-line-number';

  const numOfTreeElements = elements.length;
  for (let i = 0; i < numOfTreeElements; i++) {
    const node = elements[i];
    let prevNode = i !== 0 ? elements[i - 1] : null;

    // Check whether the element of the tree is a line number
    if (
      node.type !== 'element' ||
      node.properties?.className[0] !== 'hljs-number'
    ) {
      continue;
    }

    // Change class for a first element or
    // for a number with preceeding new line character
    if (
      i === 0 ||
      (prevNode?.type === 'text' &&
        prevNode.value.charCodeAt(prevNode.value.length - 1) === 10)
    ) {
      node.properties.className = [className];
      continue;
    }
  }

  return elements;
}

/**
 * Creates a a tree object from string representation of the code snippet.
 * It can be used to create a React Element
 * @param snippet
 * @param lang
 * @returns Tree object of the code snippet
 */
export function createSnippetTree(snippet: string, lang: LangsType) {
  const populatedSnippet = addLineNumsToSnippet(snippet);

  let tree =
    lang === 'Other' || !lang
      ? lowlight.highlightAuto(populatedSnippet)
      : lowlight.highlight(lang, populatedSnippet);

  /*
  Add class for line numbers only for identified languages and
  use 'Bash' as a placeholder language because lowlight.highlightAuto()
  doesn't create a node for undefined languages
  */
  if (tree.children.length !== 0) {
    tree.children = changeClassForLineNumbers(tree.children);
  } else {
    tree = lowlight.highlight('Bash', populatedSnippet);
  }

  return tree;
}

export default createSnippetTree;
