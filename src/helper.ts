export const getMatrix = (arr: number[], size: number) => {
    const matrix: any[] = []
    arr.map(() => matrix.push(arr.splice(0, size)))
    return matrix;
}
