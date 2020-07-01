const leaderboardFetch = async() => {
  const id = 'SZ7da2t7aZzwyxcKhZOh'
  const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores`;
  let response = await fetch(url, {mode: 'cors'});
  let data = await response.json()
  return data;
};

export default leaderboardFetch;
