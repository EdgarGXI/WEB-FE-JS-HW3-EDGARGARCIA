function appendOutput(id, text) {
    const output = document.getElementById(id);
    output.innerHTML += text + '<br>';
}

document.getElementById('asyncBtn').addEventListener('click', () => {
    appendOutput('asyncOutput', 'Start');
    setTimeout(() => {
        appendOutput('asyncOutput', 'This is async!');
    }, 1000);
    appendOutput('asyncOutput', 'End');
});

document.getElementById('callbackBtn').addEventListener('click', () => {
    function fetchData(callback) {
        setTimeout(() => {
            callback("Data fetched!");
        }, 1500);
    }

    fetchData((result) => {
        appendOutput('callbackOutput', result);
    });
});

document.getElementById('promiseBtn').addEventListener('click', () => {
    function fetchDataPromise() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Data fetched with Promise!");
            }, 1500);
        });
    }

    fetchDataPromise().then((result) => {
        appendOutput('promiseOutput', result);
    });
});

document.getElementById('asyncAwaitBtn').addEventListener('click', async () => {
    async function fetchDataAsync() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("Data fetched with Async/Await!");
            }, 1500);
        });
    }

    async function getData() {
        const result = await fetchDataAsync();
        appendOutput('asyncAwaitOutput', result);
    }

    getData();
});

document.getElementById('eventLoopBtn').addEventListener('click', () => {
    appendOutput('eventLoopOutput', '1');
    setTimeout(() => appendOutput('eventLoopOutput', '2'), 0);
    Promise.resolve().then(() => appendOutput('eventLoopOutput', '3'));
    appendOutput('eventLoopOutput', '4');
});
