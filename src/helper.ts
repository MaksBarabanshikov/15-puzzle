export const drawTiles = (arr: Array<number>) => {
    arr.map(tile => createTile(tile.toString()))
}

export const createTile = (text: string) => {
    const tile = document.createElement('div');
    tile.className = 'tile';
    return tile.innerText = text
}
