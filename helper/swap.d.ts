import { IMatrix, IPosTile } from '../types/initial';
export declare const swap: (coords1: any, coords2: any, matrix: IMatrix) => void;
export declare const longSwap: (blankCoords: IPosTile, targetCoords: IPosTile, matrix: IMatrix) => number[] | undefined;
