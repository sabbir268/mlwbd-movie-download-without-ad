document.addEventListener('DOMContentLoaded', () => {
    const dialogBox = document.getElementById('dialog-box');
    const movieBox = document.getElementById('movie_link');
    const query = { active: true, currentWindow: true };

    chrome.tabs.query(query, (tabs) => {
        if (tabs[0].url.includes("https://mlwbd") && tabs[0].url.includes("movie")) {
            chrome.scripting.executeScript({
                target: {
                    tabId: tabs[0].id
                },
                function: getMovieInitUrl
            });
            //get runtime message
            chrome.runtime.onMessage.addListener((message) => {
                movieBox.innerHTML = `Redirecting to ${message.name}`;
                chrome.tabs.update({ url: message.url });
            });


        } else if (tabs[0].url.includes("https://adsgo")) {
            chrome.scripting.executeScript({
                target: {
                    tabId: tabs[0].id
                },
                function: getMovieLastUrl
            });
            //get runtime message
            chrome.runtime.onMessage.addListener((message) => {
                movieBox.innerHTML = ``;
                chrome.tabs.update({ url: message.url });
            });

        } else {
            dialogBox.innerHTML = wrongPage();
        }
    });
});



function getMovieInitUrl() {
    const movieUrl = document.querySelector('input[name="FU"]').value;
    const movieName = document.querySelector('input[name="FN"]').value;
    const movie = {
        url: movieUrl,
        name: movieName
    }
    chrome.runtime.sendMessage(null, movie);
}

function getMovieLastUrl() {
    const downloadUrl = document.querySelector('input[name="FU6"]').value;
    const data = {
        url: downloadUrl,
    }
    chrome.runtime.sendMessage(null, data);
}

function wrongPage() {
    return "You must be on the MLWBD  website movie link page or adsgo page to use this extension.";
}