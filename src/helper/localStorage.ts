import {Counter, IFifteen} from '../types/initial';

export const sizeStorage = localStorage.getItem('size')

export const matrixStorage = localStorage.getItem('matrix')

export const fifteenStorage = localStorage.getItem('fifteen')

export const counterStorage = () => JSON.parse(localStorage.getItem('counter')!)

export const updateLocalStorage = (fifteen: IFifteen) => localStorage.setItem('fifteen', JSON.stringify(fifteen))

export const updateLocalCounter = (counter: Counter) => localStorage.setItem('counter', JSON.stringify(counter))