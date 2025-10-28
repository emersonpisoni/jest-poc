export function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('data received');
    }, 100);
  });
}

export function fetchDataWithError() {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject('error');
    }, 100);
  });
}
