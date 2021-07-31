const append = (parent, child) => "append" in parent && parent.append(child);

export const appendMultiple = (parent, children) =>
  children.map(child => append(parent, child));

export default append;
