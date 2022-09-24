import { IMatrix, IPosTile } from '../types/initial';
export declare const getMatrix: (arr: number[], size: number) => any[];
export declare const findCoordByNumber: (num: number, matrix: IMatrix) => {
    x: number;
    y: number;
} | undefined;
export declare const isValidForSwap: (coords1: IPosTile, coords2: IPosTile) => false | "short-swap" | "long-swap";
export declare const firstZeroConcat: (row: any, blank: any, end: number) => never[];
export declare const checkWin: (matrix: IMatrix, matrixWin: IMatrix) => void;
