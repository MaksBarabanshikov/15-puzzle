import {IPosTile} from './types/initial';
import {blankTile, matrix, winMatrix} from './store';
import {setPositionItems} from './position';
import {checkWin, findCoordByNumber, isValidForSwap} from './helper';
import {longSwap, swap} from './swap';

export const handleClick = (tileArray: HTMLElement[]) => (event: any) => {
    const target = event.target as HTMLElement
    const tile = target.closest('.tile') as HTMLElement
    if (!tile) return;
    const tileNumber = Number(tile.dataset.matrixId)
    const tileCoords: IPosTile = findCoordByNumber(tileNumber, matrix)!
    const blankCoords: IPosTile = findCoordByNumber(blankTile, matrix)!
    const isValid = isValidForSwap(tileCoords, blankCoords)
    if (isValid) {
        if (isValid === 'short-swap') {
            swap(blankCoords, tileCoords, matrix)
            setPositionItems(matrix, tileArray)
        }
        if (isValid === 'long-swap') {
            longSwap(blankCoords, tileCoords, matrix)
            setPositionItems(matrix, tileArray)
        }
    }
}

export const handleKey = (tileArray: HTMLElement[]) =>  (event: any) => {
    if (!event.key.includes('Arrow')) return;

    const blankCoords: IPosTile = findCoordByNumber(blankTile, matrix)!
    const tileCoords: IPosTile = {
        x: blankCoords.x,
        y: blankCoords.y
    }

    const direction = event.key.split('Arrow')[1].toLowerCase()
    const maxIndexArray = matrix.length
    switch (direction) {
        case 'up':
            tileCoords.y += 1;
            break;
        case 'down':
            tileCoords.y -= 1;
            break;
        case 'left':
            tileCoords.x += 1;
            break;
        case 'right':
                tileCoords.x -= 1;
                break;
    }

    if (tileCoords.y >= maxIndexArray || tileCoords.y < 0 ||
        tileCoords.x >= maxIndexArray || tileCoords.x < 0) {
        return;
    }

    swap(blankCoords, tileCoords, matrix)
    setPositionItems(matrix, tileArray)
}