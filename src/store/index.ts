import {matrixStorage, sizeStorage} from '../localStorage';
import {IField, IMatrix, ISize, IFieldSize} from '../types/initial';
import {getMatrix} from '../helper';

interface IFifteen {
    size: ISize,
    fieldSize: IFieldSize,
    initialField: IField,
    field: IField,
    matrix: IMatrix,
    winMatrix: IMatrix,
    blankTile: number,
}

const selector: HTMLSelectElement = document.querySelector('.game__select')!
const _size = sizeStorage ? Number(sizeStorage) : Number(selector.options[selector.selectedIndex].value);
const _fieldSize = Math.pow(_size, 2);
const _initialField = [...Array(_fieldSize - 1).keys()].map(x => ++x);
const _field = [..._initialField].sort(() => Math.random() - .5).concat(0);
const _matrix = matrixStorage ? JSON.parse(matrixStorage) : getMatrix([..._field], _size);
// const _matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,0],[13,14,15,12]]
const _winMatrix = getMatrix([..._initialField.concat(0)], _size)
const fifteen: IFifteen = {
    size: _size,
    fieldSize: _fieldSize,
    initialField: _initialField,
    field: _field,
    matrix: _matrix,
    winMatrix: _winMatrix,
    blankTile: 0,
}

export let { size, initialField, field, matrix, fieldSize, blankTile, winMatrix } = fifteen