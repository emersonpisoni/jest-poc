import { getUsers } from '../src/api';
import { forEach } from '../src/for-each'
import axios from 'axios';

const mockCallback = jest.fn(x => 42 + x);
jest.mock('axios');

test('forEach mock function', () => {
  forEach([0, 1], mockCallback);

  // The mock function was called twice
  expect(mockCallback.mock.calls).toHaveLength(2);

  // The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // The first argument of the second call to the function was 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // The return value of the first call to the function was 42
  expect(mockCallback.mock.results[0].value).toBe(42);
});

describe('mock return values', () => {
  test('mockReturnValueOnce', () => {
    const myMock = jest.fn();
    console.log(myMock());
    // > undefined

    myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);

    console.log(myMock(), myMock(), myMock(), myMock());
    // > 10, 'x', true, true
  })

  test('mock callback logic', () => {
    const filterTestFn = jest.fn();

    // Make the mock return `true` for the first call,
    // and `false` for the second call
    filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

    /**
    This one is very relevant becaue you don't need to recreate the logic to make filterTestFn
    works as expected, just use mockReturnValueOnce to set the return value for each call
    */

    const result = [11, 12].filter(num => filterTestFn(num));

    console.log(result);
    // > [11]
    console.log(filterTestFn.mock.calls[0][0]); // 11
    console.log(filterTestFn.mock.calls[1][0]); // 12
  })
})

describe('Mocking modules', () => {
  test('should fetch users', async () => {
    const users = { data: [{ id: 1, name: "John Doe" }, { id: 2, name: "Jane Smith" }] };
    axios.get.mockResolvedValue(users);

    const usersByApi = await getUsers();
    expect(usersByApi).toEqual(users);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(users);
  })
})

describe('Mocking implementations', () => {
  test('simple mockImplementation', () => {
    const myMockFn = jest.fn(cb => cb(null, true));

    myMockFn((err, val) => console.log(val));
    // > true
  })

  test('mockImplementationOnce', () => {
    const myMockFn = jest
      .fn()
      .mockImplementationOnce(cb => cb(null, true))
      .mockImplementationOnce(cb => cb(null, false));

    const mockFn2 = jest.fn().mockImplementationOnce(cb => cb(true)).mockImplementationOnce(cb => cb('second call'));

    mockFn2(console.log)
    mockFn2(console.log)

    // myMockFn((err, val) => console.log(val));
    // // > true

    // myMockFn((err, val) => console.log(val));
    // > false
  })
})

function tal(cb) {
  return cb(true)
}

tal(() => console.log())