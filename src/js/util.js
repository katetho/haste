export function sum(a,b) {
    return a+b;
}

export const api = (path, options = {}) => {
  return fetch(`http://localhost:5000${path}`, options).then(
    res => res.json()
  );
};
