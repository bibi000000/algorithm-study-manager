chrome.runtime.sendMessage('get-total-programmers-challenges', (response) => {
    console.log('received total programmers challenges data', response);
    initializeUI(response);
})