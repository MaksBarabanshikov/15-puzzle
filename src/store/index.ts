import { matrixStorage, sizeStorage } from '../localStorage';
import { IField, IMatrix, ISize, IFieldSize } from '../types/initial';
import { getMatrix } from '../helper';
import { initFifteen } from '../init';
import {handleClick, handleKey} from "../listners";

interface IFifteen {
    size: ISize,
    fieldSize: IFieldSize,
    initialField: IField,
    field: IField,
    matrix: IMatrix,
    winMatrix: IMatrix,
    blankTile: number,
}

export const selector: HTMLSelectElement = document.querySelector('.game__select')!

const size = sizeStorage ? Number(sizeStorage) : Number(selector.options[selector.selectedIndex].value);
const fieldSize = Math.pow(size, 2);
const initialField = [...Array(fieldSize - 1).keys()].map(x => ++x);
const field = [...initialField].sort(() => Math.random() - .5).concat(0);
const matrix = matrixStorage ? JSON.parse(matrixStorage) : getMatrix([...field], size);
// const _matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,0],[13,14,15,12]]
const winMatrix = getMatrix([...initialField.concat(0)], size)
const blankTile = 0

export let fifteen: IFifteen = {
    size,
    fieldSize,
    initialField,
    field,
    matrix,
    winMatrix,
    blankTile,
}

if (localStorage.getItem('fifteen')) {
    fifteen = JSON.parse(localStorage.getItem('fifteen')!)
}

selector.addEventListener('change', (event: any) => {
    const target = event.target
    fifteen.size = Number(target.options[target.selectedIndex].value)
    fifteen.fieldSize = Math.pow(fifteen.size, 2);
    fifteen.initialField = [...Array(fifteen.fieldSize - 1).keys()].map(x => ++x)
    fifteen.field = [...fifteen.initialField].sort(() => Math.random() - .5).concat(0)
    fifteen.matrix = getMatrix([...fifteen.field], fifteen.size)
    fifteen.winMatrix = getMatrix([...fifteen.initialField.concat(0)], fifteen.size)
    initFifteen(fifteen.field, fifteen.matrix)
    localStorage.setItem('fifteen', JSON.stringify(fifteen))
})