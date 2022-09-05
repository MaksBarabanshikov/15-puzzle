export const draw = (arr: Array<number>, parent: Element) => arr.map(tile => createHTML(tile.toString(), parent))

export const createHTML = (text: string, parent: Element) => {
    if (text !== "0") {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.innerText = text;
        return parent.appendChild(tile);
    }
    return;
}

export const getMatrix = (arr: number[], size: number) => {
    const matrix: Array<any> = []
    arr.map(() => matrix.push(arr.splice(0, size)))
    return matrix;
}
