import {IField, IMatrix} from './types/initial';
import {setPositionItems} from './helper/position';
import {handleClick, handleKey} from './helper/listners';
import {generateGame} from './helper/DOM';

export const initFifteen = (field: IField, matrix: IMatrix) => {
    const tileContainer: HTMLElement = document.querySelector('.tiles')!
    const gridContainer: HTMLElement = document.querySelector('.grid')!
    tileContainer.removeEventListener('click', handleClick)
    window.removeEventListener('keydown', handleKey)
    tileContainer.innerHTML = ''
    gridContainer.innerHTML = ''
    generateGame({field, gridContainer, tileContainer, matrix})
    const tileArray: HTMLElement[] = Array.from(tileContainer!.querySelectorAll('.tile'))
    setPositionItems(matrix, tileArray);
    tileContainer.addEventListener('click', handleClick)
    window.addEventListener('keydown', handleKey)
}