export declare type ISize = number;
export declare type IField = number[];
export declare type IMatrix = Coordinate[][];
export declare type IFieldSize = number;
export interface IPosTile {
    x: Coordinate;
    y: Coordinate;
}
export declare type Coordinate = number;
export interface IFifteen {
    size: ISize;
    fieldSize: IFieldSize;
    initialField: IField;
    field: IField;
    matrix: IMatrix;
    winMatrix: IMatrix;
    blankTile: number;
}
