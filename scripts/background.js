
async function ProgrammersChallengesCall() {
    return fetch(`https://raw.githubusercontent.com/poundee/algorithm-study-manager/main/src/data/programmers.json`, {method: 'GET'})
}

const p_data = [{"title": "\ubb38\uc790\uc5f4 \ucd9c\ub825\ud558\uae30", "part": "\ucf54\ub529 \uae30\ucd08 \ud2b8\ub808\uc774\ub2dd", "link": "https://school.programmers.co.kr/learn/courses/30/lessons/181952", "level": "Lv.0", "finished_count": "7,483\uba85", "acceptance_rate": "64%", "solved": "solved"}, {"title": "a\uc640 b \ucd9c\ub825\ud558\uae30", "part": "\ucf54\ub529 \uae30\ucd08 \ud2b8\ub808\uc774\ub2dd", "link": "https://school.programmers.co.kr/learn/courses/30/lessons/181951", "level": "Lv.0", "finished_count": "6,152\uba85", "acceptance_rate": "75%", "solved": "solved"}, {"title": "\ubb38\uc790\uc5f4 \ubc18\ubcf5\ud574\uc11c \ucd9c\ub825\ud558\uae30", "part": "\ucf54\ub529 \uae30\ucd08 \ud2b8\ub808\uc774\ub2dd", "link": "https://school.programmers.co.kr/learn/courses/30/lessons/181950", "level": "Lv.0", "finished_count": "5,453\uba85", "acceptance_rate": "83%", "solved": "solved"}]

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'get-total-programmers-challenges') {
        sendResponse(p_data)
        // ProgrammersChallengesCall()
        // .then((res) => sendResponse(res))
    }
})