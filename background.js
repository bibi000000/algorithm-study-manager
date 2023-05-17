    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === 'githubLogin') {
      if (request.state === 'start') {
        console.log(11111111);
        // GitHub OAuth 인증 URL을 생성합니다.
        const clientId = "b59f5ff212158998d4a2";
        const redirectUri = chrome.identity.getRedirectURL();
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
        console.log(redirectUri);
        // 상태를 'redirect'로 저장
        chrome.storage.local.set({ state: 'redirect' });
  
        // 새로운 탭에서 GitHub 로그인 페이지  열기
        chrome.tabs.create({ url: authUrl });
      } else if (request.state === 'redirect') {
        console.log("12312312312312");
        // redirect 단계에서 GitHub OAuth 코드
        const code = request.code;
        const clientId = "b59f5ff212158998d4a2";
        const clientSecret = "4ecfeeb6d09638a55a44e123b91b4f60560a8d3b";
        const redirectUri = chrome.identity.getRedirectURL();
        
        // OAuth 코드를 사용하여 액세스 토큰을 요청합니다.
        fetch('https://github.com/login/oauth/access_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code: code,
            redirect_uri: redirectUri
          })
        })
        .then(response => response.json())
        .then(data => {
          const accessToken = data.access_token;
          console.log("!23123123");
  
         
  
          chrome.storage.local.set({ state: 'done' });
          console.log(data);
          sendResponse({ success: true });
        })
        .catch(error => {
          console.error(error);
          sendResponse({ success: false });
        });
        
      }
      else {
        // 올바르지 않은 상태 값일 경우 처리
        console.error('Invalid state value');
        sendResponse({ success: false });
      }
      
      return true; 
    }
  });
  