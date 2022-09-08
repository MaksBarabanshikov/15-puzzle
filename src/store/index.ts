import {matrixStorage, sizeStorage} from '../localStorage';
import {IField, IMatrix, ISize} from '../types/initial';
import {getMatrix} from '../helper';

interface IFifteen {
    size: ISize,
    initialField: IField,
    field: IField,
    matrix: IMatrix
}

const _size = sizeStorage ? Number(sizeStorage) : 4;
const _fieldSize: number = Math.pow(_size, 2);
const _initialField = [...Array(_fieldSize).keys()];
const _field = [..._initialField.sort(() => Math.random() - .5)];
const _matrix = matrixStorage ? JSON.parse(matrixStorage) : getMatrix([..._field], _size);
console.log(_matrix)
const fifteen: IFifteen = {
    size: _size,
    initialField: _initialField,
    field: _field,
    matrix: _matrix
}

export const { size, initialField, field, matrix } = fifteen