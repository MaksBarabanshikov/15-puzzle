import { checkWin } from './helper';
import { fifteen } from '../store';
import {IMatrix} from '../types/initial';
import {currentTileAudio} from './audio';

export const setPositionItems = (matrix: any, arr: HTMLElement[]) => {
  for( let y = 0; y < matrix.length; y++) {
    for( let x = 0; x < matrix.length; x++) {
      const value = matrix[y][x];
      const node: HTMLElement | undefined = arr.find(nodeItem => nodeItem.dataset.matrixId === String(value));
      if (node === undefined) return;
      setNodeStyles(node, x + 1, y + 1);
    }
  }
  checkCurrentTile(matrix, fifteen.winMatrix).forEach((currentValue: number) => addCurrentTileClass(currentValue))
  setTimeout(() => checkWin(matrix, fifteen.winMatrix), 500)
}

const setNodeStyles = (node: HTMLElement, x: number, y: number) => {
  const position = `tile-position-${x}-${y}`;
  node.className =`tile ${position}`;
}

const checkCurrentTile = (matrix: IMatrix, matrixWin: IMatrix): number[] => {
  const currentField = [...matrix].flat()
  const currentWinField = [...matrixWin].flat()

  const currentValue = []
  for (let i = 0; i < currentField.length; i++) {
    if (currentField[i] === currentWinField[i]) {
      currentValue.push(currentWinField[i])
    }
  }
  return currentValue
}

const addCurrentTileClass = (currentTile: number) => {
  const tiles: any = document.querySelectorAll('.tile')!
  tiles.forEach((tile: HTMLElement) => {
    const matrixId = Number(tile.dataset.matrixId)
    if (matrixId === currentTile && matrixId !== 0) {
      tile.classList.add('tile_correct')
    }
  })
}
