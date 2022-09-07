import './style/game.css'
import { matrix, fieldArr } from './store'
import {setNodeStyles, setPositionItems} from './position';
import {generateGame} from './DOM';

const tileContainer: Element = document.querySelector('.tiles')!
const gridContainer: Element = document.querySelector('.grid')!

generateGame({fieldArr, grid: gridContainer, tiles: tileContainer})

const tileArray: HTMLElement[] = Array.from(tileContainer!.querySelectorAll('.tile'))

setPositionItems(matrix, tileArray);

tileContainer.addEventListener('click', (event: any) => {
    const target = event.target as HTMLElement
    const tile = target.closest('.tile') as HTMLElement
    if (!tile) return;
    const tileNumber = Number(tile.dataset.matrixId)
    const tileCoords = findCoordByNumber(tileNumber, matrix)
    console.log(matrix);
})

function findCoordByNumber(num: number, matrix: number[][]) {
    for( let y = 0; y < matrix.length; y++) {
        for( let x = 0; x < matrix.length; x++) {
            if (matrix[y][x] === num) {
                return { x, y };
            }
        }
    }
    return null;
}