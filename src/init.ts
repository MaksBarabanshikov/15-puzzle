import {IField, IMatrix} from './types/initial';
import {setPositionItems} from './position';
import {handleClick, handleKey} from './listners';
import {generateGame} from './DOM';

export const initFifteen = (field: IField, matrix: IMatrix) => {
    const tileContainer: HTMLElement = document.querySelector('.tiles')!
    const gridContainer: HTMLElement = document.querySelector('.grid')!
    tileContainer.innerHTML = ''
    gridContainer.innerHTML = ''
    generateGame({field, gridContainer, tileContainer, matrix})
    const tileArray: HTMLElement[] = Array.from(tileContainer!.querySelectorAll('.tile'))
    setPositionItems(matrix, tileArray);
    tileContainer.removeEventListener('click', handleClick)
    window.removeEventListener('keydown', handleKey)
    tileContainer.addEventListener('click', handleClick)
    window.addEventListener('keydown', handleKey)
}