const leaderboardPost = (name, score) => {
  const id = 'SZ7da2t7aZzwyxcKhZOh'
  const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores`;
  const leader = {
    user: name,
    score: score,
  };
  const request = new Request(url, {
    method: 'POST',
      body: JSON.stringify(leader),
      headers: new Headers({
          'Content-Type': 'application/json'
      })
  });

  fetch(request)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };

export default leaderboardPost;
