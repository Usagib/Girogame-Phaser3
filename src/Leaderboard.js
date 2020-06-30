const leaderboardFetch = () => {
  const url = "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/";
  const game = {
    name: 'Giro the game'
  };
  const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify(game),
      headers: new Headers({
          'Content-Type': 'application/json'
      })
  });
  console.log(request);

  fetch(request)
      .then(res => res.json())
      .then(res => console.log(res)).catch(err => console.log(err));
  };

export default leaderboardFetch;

/*let response = await fetch("http://localhost:8001/api/parameters/1",{
       method: 'POST',
 headers: new Headers({
    'Authorization': 'Basic ' + username + ":" + password,
    'Content-Type': 'application/json;'
       }),
      'body':JSON.stringify(input)
   })
   let data = await response.json()
   console.log(data)
   */
