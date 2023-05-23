const loadBtn = document.getElementById("load");
loadBtn.addEventListener("click", () => {
    alert("clicked")
    chrome.runtime.sendMessage('get-total-programmers-challenges', (response) => {
        console.log('received total programmers challenges data', response);
    })
})
