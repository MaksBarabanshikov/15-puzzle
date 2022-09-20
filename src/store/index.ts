import {matrixStorage, sizeStorage} from '../localStorage';
import {IField, IMatrix, ISize, IFieldSize} from '../types/initial';
import {getMatrix} from '../helper';

interface IFifteen {
    size: ISize,
    fieldSize: IFieldSize,
    initialField: IField,
    field: IField,
    matrix: IMatrix
}

const _size = sizeStorage ? Number(sizeStorage) : 4;
const _fieldSize = Math.pow(_size, 2);
const _initialField = [...Array(_fieldSize - 1).keys()].map(x => ++x);
const _field = [..._initialField].sort(() => Math.random() - .5).concat(0);
const _matrix = matrixStorage ? JSON.parse(matrixStorage) : getMatrix([..._field], _size);
const fifteen: IFifteen = {
    size: _size,
    fieldSize: _fieldSize,
    initialField: _initialField,
    field: _field,
    matrix: _matrix
}

export const { size, initialField, field, matrix, fieldSize } = fifteen