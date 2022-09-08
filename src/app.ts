import './style/game.css'
import { field, matrix } from './store'
import { setNodeStyles, setPositionItems } from './position';
import {generateGame} from './DOM';

const tileContainer: Element = document.querySelector('.tiles')!
const gridContainer: Element = document.querySelector('.grid')!


generateGame({field, gridContainer, tileContainer, matrix})

const tileArray: HTMLElement[] = Array.from(tileContainer!.querySelectorAll('.tile'))

setPositionItems(matrix, tileArray);

console.log(field);
tileContainer.addEventListener('click', (event: any) => {
    const target = event.target as HTMLElement
    const tile = target.closest('.tile') as HTMLElement
    if (!tile) return;
    const tileNumber = Number(tile.dataset.matrixId)
    const tileCoords = findCoordByNumber(tileNumber, matrix)
})

function findCoordByNumber(num: number, matrix: number[][]) {
    for( let y = 0; y < matrix.length; y++) {
        for( let x = 0; x < matrix.length; x++) {
            if (matrix[y][x] === num) {
                console.log({ x, y })
                return { x, y };
            }
        }
    }
    return null;
}