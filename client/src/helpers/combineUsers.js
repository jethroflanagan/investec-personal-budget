export const combineUsers = (users) => {
  if (!paidIds.length) return '';
  // TODO: use actual paid members here, but derive nested content in container
  return users.reduce((acc, current, i, list) => {
    if (i === 0) return current.name;
    if (i === list.length - 1) return `${acc} and ${current.name}`;
    return `${acc}, ${current.name}`;
  }, '');
}
