

const localAuth = {
   
    init(){
        this.KEY = 'Manager_token';
        this.ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';
        this.AUTHORIZATION_URL = 'https://github.com/login/oauth/authorize';
        this.CLIENT_ID = 'b59f5ff212158998d4a2';
        this.CLIENT_SECRET = '766c45ca56c3bf3d7350c5729b1c13bdf622bca1';
        this.REDIRECT_URL = 'https://github.com/'; // for example, https://github.com
        this.SCOPES = ['repo'];
    },
  

    parseAccessCode(url) {
      if (url.match(/\?error=(.+)/)) {
        chrome.tabs.getCurrent(function (tab) {
          chrome.tabs.remove(tab.id, function () {});
        });
      } else {
       
        const accessCode = url.match(/\?code=([\w\/\-]+)/);
        if (accessCode) {

          this.requestToken(accessCode[1]);
        }
      }
    },
  
 

    requestToken(code) {
      const that = this;
      const data = new FormData();
      data.append('client_id', this.CLIENT_ID);
      data.append('client_secret', this.CLIENT_SECRET);
      data.append('code', code);
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log("123123");
            that.finish(xhr.responseText.match(/access_token=([^&]*)/)[1]);
          } else {
            chrome.runtime.sendMessage({
              closeWebPage: true,
              isSuccess: false,
            });
          }
        }
      });
      xhr.open('POST', this.ACCESS_TOKEN_URL, true);
      xhr.send(data);
    },
  
   
    finish(token) {
      
      const AUTHENTICATION_URL = 'https://api.github.com/user';
  
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const username = JSON.parse(xhr.responseText).login;
            chrome.runtime.sendMessage({
              closeWebPage: true,
              isSuccess: true,
              token,
              username,
              KEY: this.KEY,
            });
          }
        }
      });
      xhr.open('GET', AUTHENTICATION_URL, true);
      xhr.setRequestHeader('Authorization', `token ${token}`);
      xhr.send();
    },
  };
  
  localAuth.init(); 
  const link = window.location.href;
  
  
  if (window.location.host === 'github.com') {
    chrome.storage.local.get('pipe_studymanager', (data) => {
      if (data && data.pipe_studymanager) {
        localAuth.parseAccessCode(link);
      }
    });
  }