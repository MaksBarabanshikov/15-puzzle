import {matrixStorage, sizeStorage} from '../localStorage';
import { getMatrix } from '../helper';

interface IFifteen {
    size: number,
    fieldArr: number[],
    shuffleFieldArr: number[],
    matrix: number[][],
}

const defaultSize = sizeStorage ? Number(sizeStorage) : 4;
const fieldSize: number = Math.pow(defaultSize, 2)
const defaultFieldArr = () => [...Array(fieldSize).keys()]
const defaultShuffleFieldArr = defaultFieldArr().sort(() => Math.random() - .5)
const defaultMatrix = matrixStorage ? JSON.parse(matrixStorage) : getMatrix(defaultShuffleFieldArr, defaultSize)

const fifteen: IFifteen = {
    size: defaultSize,
    fieldArr: defaultFieldArr(),
    shuffleFieldArr: defaultShuffleFieldArr,
    matrix: defaultMatrix
}

export const {size, fieldArr, shuffleFieldArr, matrix} = fifteen