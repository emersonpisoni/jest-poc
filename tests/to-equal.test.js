test('object assignment', () => {
  const data = { one: 1 };
  data['two'] = 2;
  // it compares by value
  expect(data).toEqual({ one: 1, two: 2 });
});

test('object assignment', () => {
  const data = { one: 1 };
  data['two'] = 2;
  // it compares by reference, not by value
  expect(data).not.toBe({ one: 1, two: 2 });
});