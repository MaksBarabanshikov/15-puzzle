import {IFifteen} from '../types/initial';

export const sizeStorage = localStorage.getItem('size')

export const matrixStorage = localStorage.getItem('matrix')

export const updateLocalStorage = (fifteen: IFifteen) => localStorage.setItem('fifteen', JSON.stringify(fifteen))