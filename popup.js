const GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize";
const YOUR_CLIENT_ID = "b59f5ff212158998d4a2";
const YOUR_CLIENT_SECRET = "4ecfeeb6d09638a55a44e123b91b4f60560a8d3b";
const YOUR_SCOPE = ['repo'];

function authorize() {
  const redirectUrl = chrome.identity.getRedirectURL();
  console.log(redirectUrl);
  // const url = `https://www.github.com/login/`;
  const url = `https://github.com/login/oauth/authorize?client_id=${YOUR_CLIENT_ID}&redirect_uri=${encodeURIComponent(chrome.identity.getRedirectURL())}&scope=${YOUR_SCOPE}&state=${generateRandomString()}`
  // const url = `${GITHUB_AUTH_URL}?client_id=${YOUR_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUrl)}&scope=user`;
  console.log(url);
  chrome.identity.launchWebAuthFlow(
    {
      url: url,
      interactive: true,
    },
    (responseUrl) => {
      console.log(responseUrl);
      console.log(123);
      const code = new URL(responseUrl).searchParams.get("code");
      if (code) {
        getToken(code)
          .then((token) => getUserData(token))
          .then((userData) => console.log(userData))
          .catch((error) => console.error(error));
      }
    }
  );
}

async function getToken(code) {
  const url = "https://github.com/login/oauth/access_token";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: YOUR_CLIENT_ID,
      client_secret: YOUR_CLIENT_SECRET,
      code: code,
    }),
  };
  const response = await fetch(url, options);
  const data = await response.text();
  const params = new URLSearchParams(data);
  return params.get("access_token");
}

async function getUserData(token) {
  const url = "https://api.github.com/user";
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);
  return response.json();
}
function generateRandomString() {
  const state = new Uint32Array(1);
  window.crypto.getRandomValues(state);
  return state.toString();
}

document.getElementById("authorize").addEventListener("click", authorize);
