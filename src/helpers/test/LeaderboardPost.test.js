const leaderboardPost = require('./functions/LeaderboardPost');

beforeEach(() => {
  fetch.resetMocks();
});

it('Api responds adecuately', async () => {
  fetch.mockResponseOnce();
  const response = await leaderboardPost('test', 0);
  expect(response).toBe(null);
});
