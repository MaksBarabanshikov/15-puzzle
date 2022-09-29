export type ISize = number;

export type IField = number[];

export type IMatrix = Coordinate[][];

export type IFieldSize = number;

export interface IPosTile {
    x: Coordinate;
    y: Coordinate;
}

export type Coordinate = number;

export type Counter = number

export interface IFifteen {
    size: ISize,
    fieldSize: IFieldSize,
    initialField: IField,
    field: IField,
    matrix: IMatrix,
    winMatrix: IMatrix,
    blankTile: number,
}