const leaderboardFetch = require('./functions/LeaderboardFetch');

beforeEach(() => {
  fetch.resetMocks();
});

it('Api responds adecuately', async () => {
  fetch.mockResponseOnce();
  const response = await leaderboardFetch().data;
  expect(response).not.toBe(null);
});

it('Api doesnt respond', async () => {
  fetch.mockResponseOnce();
  const response = await leaderboardFetch();
  expect(response).toBe(null);
});
