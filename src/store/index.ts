import {fifteenStorage, matrixStorage, sizeStorage, updateLocalStorage} from '../helper/localStorage';
import {getMatrix, shuffleField} from '../helper/helper';
import { initFifteen } from '../init';
import {IFifteen} from '../types/initial';
import { resetCounter } from '../helper/DOM';

let urlParams = Number(window.location.search.slice(-1))
export const selector: HTMLSelectElement = document.querySelector('.game__select')!
const selectorValue = Number(selector.options[selector.selectedIndex].value)
const newGameBtn = document.querySelector('#newGameFifteen')!

window.addEventListener('load', () => {
    if (fifteenStorage) {
        const copyStorage = JSON.parse(fifteenStorage)
        urlParams = urlParams > 7 ? urlParams = 7 :
                    urlParams < 3 ? urlParams = 3 :
                    isNaN(urlParams) ? urlParams = 3 : urlParams
        if (urlParams !== copyStorage.size) {
            const result = confirm('Вы уверенны? Текущий процесс будет потерян')
            if (result) {
               resetCounter()
               history.pushState(null, '', `/?size=${urlParams}`);
               initStore(urlParams)
               localStorage.setItem('size', JSON.stringify(urlParams))
            }
        }
    }
})

if (sizeStorage) {
    const options: HTMLOptionElement[] = Array.from(selector.options)
    options.forEach((option: HTMLOptionElement) => {
        if (Number(option.value) === JSON.parse(sizeStorage!)) {
            option.selected = true
            history.pushState(null, '', `/?size=${option.value}`);
        }
    })
}

if (!sizeStorage) {
    localStorage.setItem('size', JSON.stringify(selectorValue))
}

const size = sizeStorage ? Number(sizeStorage) : Number(selector.options[selector.selectedIndex].value);
const fieldSize = Math.pow(size, 2);
const initialField = [...Array(fieldSize - 1).keys()].map(x => ++x);
const field = shuffleField(initialField)
const matrix = matrixStorage ? JSON.parse(matrixStorage) : getMatrix([...field], size);
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
    const result = confirm('Вы уверенны? Текущий процесс будет потерян')
    if (result) {
        resetCounter()
        localStorage.setItem('size', JSON.stringify(selectorValue))
        initStore(selectorValue)
        history.pushState(null, '', `/?size=${selectorValue}`);
    }
})


newGameBtn.addEventListener('click', handleResetGame)


function initStore(currentSize: number) {
    fifteen.size = currentSize
    fifteen.fieldSize = Math.pow(fifteen.size, 2);
    fifteen.initialField = [...Array(fifteen.fieldSize - 1).keys()].map(x => ++x)
    fifteen.field = shuffleField(fifteen.initialField)
    fifteen.matrix = getMatrix([...fifteen.field], fifteen.size)
    fifteen.winMatrix = getMatrix([...fifteen.initialField.concat(0)], fifteen.size)
    updateLocalStorage(fifteen)
    initFifteen(fifteen.field, fifteen.matrix)
}

function handleResetGame(event: any) {
    event.preventDefault()
    const result = confirm('Вы уверенны? Текущий процесс будет потерян')
    if (result) {
        resetCounter()
        initStore(urlParams)
    }
}