import { IgenerateField } from './types/IProps';

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

export const generateGame = ({ field, gridContainer, tileContainer, matrix }: IgenerateField) => {
    generateGridField(matrix, gridContainer);
    field.map((innerText : number) => generateTileField(tileContainer, String(innerText)));
}

const generateGridField = (matrix: number[][], parent: Element) => {
    return matrix.map((gridRow: number[]) => createGridRow(gridRow, parent));
}

const generateTileField = (parent: Element, innerText: string) => {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.dataset.matrixId = innerText;
    tile.innerText = innerText;
    if (innerText === '0') {
        tile.style.opacity = '0';
    }
    parent.appendChild(tile);
}
