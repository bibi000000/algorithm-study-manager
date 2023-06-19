const repoName = () =>{
    return $('#name').val().trim();
};

const statusCode = (res, status, name) => {
  switch (status) {
    case 304:
      $('#success').hide();
      $('#error').text(`Error creating ${name} - Unable to modify repository. Try again later!`);
      $('#error').show();
      break;

    case 400:
      $('#success').hide();
      $('#error').text(`Error creating ${name} - Bad POST request, make sure you're not overriding any existing scripts`);
      $('#error').show();
      break;

    case 401:
      $('#success').hide();
      $('#error').text(`Error creating ${name} - Unauthorized access to repo. Try again later!`);
      $('#error').show();
      break;

    case 403:
      $('#success').hide();
      $('#error').text(`Error creating ${name} - Forbidden access to repository. Try again later!`);
      $('#error').show();
      break;

    case 422:
      $('#success').hide();
      $('#error').text(`Error creating ${name} - Unprocessable Entity. Repository may have already been created. Try Linking instead (select 2nd option).`);
      $('#error').show();
      break;

    default:
      /* Change mode type to commit */
      chrome.storage.local.set({ mode_type: 'commit' }, () => {
        $('#error').hide();
        $('#success').html(`Successfully created <a target="blank" href="${res.html_url}">${name}</a>.`);
        $('#success').show();
        $('#unlink').show();
        /* Show new layout */
        document.getElementById('hook_mode').style.display = 'none';
        document.getElementById('commit_mode').style.display = 'inherit';
      });
      /* Set Repo Hook */
      chrome.storage.local.set({ Manager_hook: res.full_name }, () => {
        console.log('Successfully set new repo hook');
      });

      break;
  }
};
const createRepo = (token, name) => {
    const AUTHENTICATION_URL = 'https://api.github.com/user/repos';
    let data = {
      name,
      private: true,
      auto_init: true,
      description: 'This is a auto push.',
    };
    data = JSON.stringify(data);
  
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
      if (xhr.readyState === 4) {
        statusCode(JSON.parse(xhr.responseText), xhr.status, name);
      }
    });
  
    stats = {};
    stats.version = chrome.runtime.getManifest().version;
    stats.submission = {};
    chrome.storage.local.set({ stats });
  
    xhr.open('POST', AUTHENTICATION_URL, true);
    xhr.setRequestHeader('Authorization', `token ${token}`);
    xhr.setRequestHeader('Accept', 'application/vnd.github.v3+json');
    xhr.send(data);
  };
  const linkStatusCode = (status, name) => {
    let bool = false;
    switch (status) {
      case 301:
        $('#success').hide();
        $('#error').html(`Error linking <a target="blank" href="${`https://github.com/${name}`}">${name}</a> to studyManager. <br> This repository has been moved permenantly. Try creating a new one.`);
        $('#error').show();
        break;
  
      case 403:
        $('#success').hide();
        $('#error').html(`Error linking <a target="blank" href="${`https://github.com/${name}`}">${name}</a> to studyManager. <br> Forbidden action. Please make sure you have the right access to this repository.`);
        $('#error').show();
        break;
  
      case 404:
        $('#success').hide();
        $('#error').html(`Error linking <a target="blank" href="${`https://github.com/${name}`}">${name}</a> to studyManager. <br> Resource not found. Make sure you enter the right repository name.`);
        $('#error').show();
        break;
  
      default:
        bool = true;
        break;
    }
    $('#unlink').show();
    return bool;
  };
  
 
  const linkRepo = (token, name) => {
    const AUTHENTICATION_URL = `https://api.github.com/repos/${name}`;
  
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
      if (xhr.readyState === 4) {
        const res = JSON.parse(xhr.responseText);
        const bool = linkStatusCode(xhr.status, name);
        if (xhr.status === 200) {
          // BUG FIX
          if (!bool) {
           
            chrome.storage.local.set({ mode_type: 'hook' }, () => {
              console.log(`Error linking ${name} to BaekjoonHub`);
            });
            
            chrome.storage.local.set({ Manager_hook: null }, () => {
              console.log('Defaulted repo hook to NONE');
            });
  
          
            document.getElementById('hook_mode').style.display = 'inherit';
            document.getElementById('commit_mode').style.display = 'none';
          } else {
         
            chrome.storage.local.set({ mode_type: 'commit', repo: res.html_url }, () => {
              $('#error').hide();
              $('#success').html(`Successfully linked <a target="blank" href="${res.html_url}">${name}</a> to BaekjoonHub. Start <a href="https://www.acmicpc.net/">BOJ</a> now!`);
              $('#success').show();
              $('#unlink').show();
            });
            
  
            stats = {};
            stats.version = chrome.runtime.getManifest().version;
            stats.submission = {};
            chrome.storage.local.set({ stats });
  
            chrome.storage.local.set({ Manager_hook: res.full_name }, () => {
              console.log('Successfully set new repo hook');
              /* Get problems solved count */
              chrome.storage.local.get('stats', (psolved) => {
                const { stats } = psolved;
              });
            });
            
            document.getElementById('hook_mode').style.display = 'none';
            document.getElementById('commit_mode').style.display = 'inherit';
          }
        }
      }
    });
  
    xhr.open('GET', AUTHENTICATION_URL, true);
    xhr.setRequestHeader('Authorization', `token ${token}`);
    xhr.setRequestHeader('Accept', 'application/vnd.github.v3+json');
    xhr.send();
  };
  $('#hook_button').on('click', () => {
  
      chrome.storage.local.get('Manager_token', (data) => {
        const token = data.Manager_token;
        if (token === null || token === undefined) {
          /* Not authorized yet. */
          $('#error').text('Authorization error - Grant AlgoManager access to your GitHub account to continue (launch extension to proceed)');
          $('#error').show();
          $('#success').hide();
        } else {
          createRepo(token, repoName());
        } 
       
      });
    // }
  });