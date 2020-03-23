import { api } from './util.js';

beforeEach(() => {
  fetch.resetMocks();
});

test('returns result if array', () => {
  fetch.mockResponseOnce(JSON.stringify([{ id: 1 }]));
});


test('returns result if array', () => {
  fetch.mockResponseOnce(JSON.stringify([{ id: 1 }]));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return api('/tickets')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();

      expect(onResponse.mock.calls[0][0][0]).toEqual({ id: 1 }); //???????
    });
});
