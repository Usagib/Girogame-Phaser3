const leaderboardPost = async(name, score) => {
  const id = 'SZ7da2t7aZzwyxcKhZOh'
  const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores`;
  const leader = {
    user: name,
    score: score,
  };
  const params = {
    method: 'POST',
      body: JSON.stringify(leader),
      headers: new Headers({
          'Content-Type': 'application/json'
      })
  };
  try {
    const response = await fetch(url, params);
    let data = await response.json();
    return data
  } catch (e) {
    return null;
  }
};

module.exports = leaderboardPost;
