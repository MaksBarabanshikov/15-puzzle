import {matrixStorage, sizeStorage, updateLocalStorage} from '../helper/localStorage';
import { getMatrix } from '../helper/helper';
import { initFifteen } from '../init';
import {IFifteen} from '../types/initial';

export const selector: HTMLSelectElement = document.querySelector('.game__select')!
const selectorValue = Number(selector.options[selector.selectedIndex].value)

if (sizeStorage) {
    const options: HTMLOptionElement[] = Array.from(selector.options)
    options.forEach((option: HTMLOptionElement) => {
        if (option.value === sizeStorage) {
            option.selected = true
        }
    })
}
if (!sizeStorage) {
    localStorage.setItem('size', JSON.stringify(selectorValue))
}

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
    const selectorValue = Number(target.options[target.selectedIndex].value)
    localStorage.setItem('size', JSON.stringify(selectorValue))
    fifteen.size = selectorValue
    fifteen.fieldSize = Math.pow(fifteen.size, 2);
    fifteen.initialField = [...Array(fifteen.fieldSize - 1).keys()].map(x => ++x)
    fifteen.field = [...fifteen.initialField].sort(() => Math.random() - .5).concat(0)
    fifteen.matrix = getMatrix([...fifteen.field], fifteen.size)
    fifteen.winMatrix = getMatrix([...fifteen.initialField.concat(0)], fifteen.size)
    updateLocalStorage(fifteen)
    initFifteen(fifteen.field, fifteen.matrix)
})