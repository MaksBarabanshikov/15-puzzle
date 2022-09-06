import './style/game.css'
import { matrix, fieldArr } from './store'
import { setPositionItems } from './position';
import {generateGame} from './DOM';

const tileContainer: Element = document.querySelector('.tiles')!
const gridContainer: Element = document.querySelector('.grid')!

generateGame({fieldArr, grid: gridContainer, tiles: tileContainer})

const tileArray: HTMLElement[] = Array.from(tileContainer!.querySelectorAll('.tile'))

setPositionItems(matrix, tileArray);
