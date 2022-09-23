import './style/game.css'
import {field, matrix, size} from './store'
import { setPositionItems } from './position';
import { generateGame } from './DOM';
import {handleClick, handleKey} from './listners';

const tileContainer: Element = document.querySelector('.tiles')!
const gridContainer: Element = document.querySelector('.grid')!
const selector: HTMLSelectElement = document.querySelector('.game__select')!

console.log(selector.options[selector.selectedIndex].value)

generateGame({field, gridContainer, tileContainer, matrix})

const tileArray: HTMLElement[] = Array.from(tileContainer!.querySelectorAll('.tile'))

setPositionItems(matrix, tileArray);

tileContainer.addEventListener('click', handleClick(tileArray))

window.addEventListener('keydown', handleKey(tileArray))