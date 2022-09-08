import {IField, IMatrix} from './initial';

export interface IgenerateField  {
    field: IField,
    gridContainer: HTMLElement | Element,
    tileContainer: HTMLElement | Element,
    matrix: IMatrix
}