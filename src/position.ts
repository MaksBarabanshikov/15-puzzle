export const setPositionItems = (matrix: any, arr: HTMLElement[]) => {
  for( let y = 0; y < matrix.length; y++) {
    for( let x = 0; x < matrix.length; x++) {
      const value = matrix[y][x] + 1;
        const node = arr[value - 1]
        setNodeStyles(node, x+1, y+1)
    }
  }
}

export const setNodeStyles = (node: HTMLElement, x: number, y: number) => {
  const position = `tile-position-${x}-${y}`
  node.classList.add(position)
}
