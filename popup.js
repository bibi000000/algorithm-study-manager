document.addEventListener('DOMContentLoaded', function() {
  const loginButton = document.getElementById('loginButton');
  loginButton.addEventListener('click', function() {
    chrome.runtime.sendMessage({ type: 'githubLogin', state: 'start' }, function(response) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
      }

      if (response.success) {
        console.log('로그인 성공');
      } else {
        console.error('로그인 실패.');
      }
    });
  });
});