import { fetchData, fetchDataWithError } from '../src/async.js';

beforeEach(() => {
  console.log('Starting a new test...');
})

// Promise
test('should return "data received" (Promise)', () => {
  return fetchData().then((data) => {
    expect(data).toBe('data received');
  });
});

// Async/Await
test('should return "data received" (Async/Await)', async () => {
  const data = await fetchData();
  expect(data).toBe('data received');
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchDataWithError();
  } catch (error) {
    expect(error).toMatch('error');
  }
});