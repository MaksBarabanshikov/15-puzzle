import { IgenerateField } from './types/IProps';
import { matrix } from './store';

const createGridRow = (gridRow: number[], parent: Element) => {
    const gridRowDOM: HTMLElement = document.createElement('div');
    gridRowDOM.className = 'grid__row';
    parent.appendChild(gridRowDOM)
    return gridRow.map(() => createGridCell(gridRowDOM))
}

const createGridCell = (parent: Element) => {
    const gridCellDom = document.createElement('div');
    gridCellDom.className = 'grid__cell';
    return parent.appendChild(gridCellDom)
}

export const generateGame = ({ fieldArr, grid, tiles }: IgenerateField) => {
    createHTML(grid)
    fieldArr.map((innerText : number, index : number) => {
        createHTML(tiles, innerText.toString(), String(index));
    });
}

export const createHTML = (parent: Element, innerText?: string, index?: string): any => {
    if (!innerText) {
      return generateGridField(matrix, parent)
    }
    if (index) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.dataset.matrixId = index;
        tile.innerText = innerText;
        if (innerText === '0') {
            tile.style.display = 'none';
        }
        parent.appendChild(tile);
    }
}

export const generateGridField = (matrix: number[][], parent: Element) => {
    return matrix.map((gridRow: number[]) => createGridRow(gridRow, parent));
}
