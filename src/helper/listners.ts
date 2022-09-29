import {IPosTile} from '../types/initial';
import {fifteen}  from '../store';
import {setPositionItems} from './position';
import {findCoordByNumber, incrementCounter, isValidForSwap} from './helper';
import {longSwap, swap} from './swap';
import {updateLocalStorage} from './localStorage';

export const handleClick = (event: any) => {
    const target = event.target as HTMLElement
    const tile = target.closest('.tile') as HTMLElement
    const tileArray: HTMLElement[] = Array.from(document!.querySelectorAll('.tile'))
    if (!tile) return;
    const tileNumber = Number(tile.dataset.matrixId)
    const tileCoords: IPosTile = findCoordByNumber(tileNumber, fifteen.matrix)!
    const blankCoords: IPosTile = findCoordByNumber(fifteen.blankTile, fifteen.matrix)!
    const isValid = isValidForSwap(tileCoords, blankCoords)
    if (isValid) {
        if (isValid === 'short-swap') {
            swap(blankCoords, tileCoords, fifteen.matrix)
            setPositionItems(fifteen.matrix, tileArray)
        }
        if (isValid === 'long-swap') {
            longSwap(blankCoords, tileCoords, fifteen.matrix)
            setPositionItems(fifteen.matrix, tileArray)
        }
        incrementCounter()
        updateLocalStorage(fifteen)
    }
}

export const handleKey = (event: any) => {
    if (!event.key.includes('Arrow')) return;

    const blankCoords: IPosTile = findCoordByNumber(fifteen.blankTile, fifteen.matrix)!
    const tileCoords: IPosTile = {
        x: blankCoords.x,
        y: blankCoords.y
    }
    const tileArray: HTMLElement[] = Array.from(document!.querySelectorAll('.tile'))
    const direction = event.key.split('Arrow')[1].toLowerCase()
    const maxIndexArray = fifteen.matrix.length
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

    swap(blankCoords, tileCoords, fifteen.matrix)
    setPositionItems(fifteen.matrix, tileArray)
}