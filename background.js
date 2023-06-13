
function testHandle(request, sender, sendResponse) {
  if (request && request.closeWebPage === true && request.isSuccess === true) {
  
    console.log("이제 되나");
   
    const urlOnboarding = `chrome-extension://${chrome.runtime.id}/index.html`;
    chrome.tabs.create({ url: urlOnboarding, selected: true }); // creates new tab
  } else if (request && request.closeWebPage === true && request.isSuccess === false) {
    alert('Something went wrong while trying to authenticate your profile!');
 }

  return true;
}

chrome.runtime.onMessage.addListener(testHandle);




// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   console.log(sender + " " + sendResponse + " " + request);
//   const st = '';
//   if (request.type === 'githubLogin') {
//     if (request.state === 'start') {
//       // 로그인 시작 단계에서 GitHub OAuth 인증 URL을 생성합니다.
//       const clientId = "b59f5ff212158998d4a2";
//       const redirectUri = "https://lpgfgjpiojnpdiloofmicomgojgikmec.chromiumapp.org/";
//       const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;

//       // 상태를 'redirect'로 저장합니다.
//       chrome.storage.local.set({ state: 'redirect' }, function() {
//         console.log(request.state + "12라인 "); // 'redirect' 출력
//         console.log(chrome.storage.local);
        
//       });

//       // 새로운 탭에서 GitHub 로그인 페이지를 엽니다.
//       chrome.tabs.create({ url: authUrl }, function(tab) {
//         const tabId = tab.id;
//         console.log(tab );
        
//         // 탭이 완전히 로드되었을 때 실행되는 콜백 함수
//         chrome.tabs.onUpdated.addListener(function(updatedTabId, changeInfo, updatedTab) {
//           if (updatedTabId === tabId && changeInfo.status === 'complete') {
//             // 탭이 완전히 로드된 후에 탭 상태를 확인합니다.
//             chrome.tabs.get(tabId, function(updatedTab) {
//               console.log(updatedTab.status + " 24라인"); // 'complete' 출력
//               // console.log(response);
//               chrome.storage.local.set({state : 'redirect'});
//               console.log(chrome.storage.local.get('state'));
              
//               console.log("11111");
//               sendResponse({state : "redirect"});
//               window.close();
//               // 필요한 작업을 수행합니다.

//               // 이후의 코드를 계속 작성합니다.
//             });
//           }
//         });
//       });
     
//     } else if (request.state === 'redirect') {
//       console.log("Redirect");
//       // 로그인 리디렉션 단계에서 GitHub OAuth 코드를 받아옵니다.
//       const code = request.code;
//       const clientId = "b59f5ff212158998d4a2";
//       const clientSecret = "4ecfeeb6d09638a55a44e123b91b4f60560a8d3b";
//       const redirectUri = "https://hlcknjlhodaiinfhbcppnlpkmidfmkal.chromiumapp.org/";

//       // OAuth 코드를 사용하여 액세스 토큰을 요청합니다.
//       fetch('https://github.com/login/oauth/access_token', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json'
//         },
//         body: JSON.stringify({
//           client_id: clientId,
//           client_secret: clientSecret,
//           code: code,
//           redirect_uri: redirectUri
//         })
//       })
//       .then(response => response.json())
//       .then(data => {
//         const accessToken = data.access_token;

//         // 액세스 토큰을 사용하여 GitHub API에 요청을 보낼 수 있습니다.
//         // 이 부분에서 원하는 작업을 수행할 수 있습니다.

//         chrome.storage.local.set({ state: 'done' });
//         sendResponse({ success: true });
//       })
//       .catch(error => {
//         console.error(error);
//         sendResponse({ success: false });
//       });
//     } else {
//       console.log('Invalid state value:', request.state);
//       // 올바르지 않은 상태 값일 경우 처리
//       sendResponse({ success: false });
//     }

//     return true; // 비동기 응답을 위해 true를 반환합니다.
//   }
// });
