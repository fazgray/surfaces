export const moveToEnd = (list: string[], id: string): void => {
  const index = list.indexOf(id)
  if (index !== -1) {
    list.splice(index, 1)
  }
  list.push(id)
}
