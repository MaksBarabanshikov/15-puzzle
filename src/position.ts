import { checkWin } from './helper';
import { fifteen } from './store';

export const setPositionItems = (matrix: any, arr: HTMLElement[]) => {
  for( let y = 0; y < matrix.length; y++) {
    for( let x = 0; x < matrix.length; x++) {
      const value = matrix[y][x];
      const node: HTMLElement | undefined = arr.find(nodeItem => nodeItem.dataset.matrixId === String(value));
      if (node === undefined) return;
      setNodeStyles(node, x + 1, y + 1);
    }
  }
  setTimeout(() => checkWin(matrix, fifteen.winMatrix), 500)
}

export const setNodeStyles = (node: HTMLElement, x: number, y: number) => {
  const position = `tile-position-${x}-${y}`;
  node.className =`tile ${position}`;
}
