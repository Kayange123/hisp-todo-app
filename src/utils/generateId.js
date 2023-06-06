export const generateId = () => {
  const letters = "abcdefghijklmnopqrstuvwxyz1234567890";
  let id = "todo-";
  for (let i = 0; i < 6; i++) {
    id += letters[Math.floor(Math.random() * letters.length)];
  }
  return id;
};
