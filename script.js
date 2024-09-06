function appendOutput(id, text) {
    const output = document.getElementById(id);
    output.innerHTML += text + '<br>';
}

// Async example
document.getElementById('asyncBtn').addEventListener('click', () => {
    const pageStructure = document.getElementById('pageStructure');
    const pageContent = document.getElementById('pageContent');
    const pageImages = document.getElementById('pageImages');

    pageStructure.style.display = 'block';
    appendOutput('asyncOutput', 'Start loading page');

    setTimeout(() => {
        pageImages.style.display = 'block';
        appendOutput('asyncOutput', 'Images loaded');
    }, 2000);

    setTimeout(() => {
        pageContent.style.display = 'block';
        appendOutput('asyncOutput', 'Content loaded');
    }, 1000);

    appendOutput('asyncOutput', 'End of script');
});

// Callback example
document.getElementById('callbackBtn').addEventListener('click', () => {
    appendOutput('callbackOutput', 'Querying database...');

    function queryDatabase(query, callback) {
        setTimeout(() => {
            const result = { id: 1, name: "John Doe" };
            callback(result);
        }, 2000);
    }

    queryDatabase("SELECT * FROM users", (result) => {
        appendOutput('callbackOutput', `User found: ${result.name} (ID: ${result.id})`);
    });
});

// Promise example
document.getElementById('promiseBtn').addEventListener('click', () => {
    appendOutput('promiseOutput', 'Fetching weather data...');

    function fetchWeather() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const weather = { temp: 72, condition: "Sunny" };
                resolve(weather);
            }, 2000);
        });
    }

    fetchWeather()
        .then(weather => appendOutput('promiseOutput', `Temperature: ${weather.temp}°F, Condition: ${weather.condition}`))
        .catch(error => appendOutput('promiseOutput', `Error: ${error.message}`));
});

// Async/Await example
document.getElementById('asyncAwaitBtn').addEventListener('click', async () => {
    appendOutput('asyncAwaitOutput', 'Ordering product...');

    async function fetchProduct(id) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { id, name: "Awesome Gadget" };
    }

    async function createOrder(product) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { id: 1001, product };
    }

    async function shipOrder(order) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { id: order.id, address: "123 Main St" };
    }

    async function orderProduct(productId) {
        try {
            const product = await fetchProduct(productId);
            appendOutput('asyncAwaitOutput', `Product fetched: ${product.name}`);

            const order = await createOrder(product);
            appendOutput('asyncAwaitOutput', `Order created: #${order.id}`);

            const shipment = await shipOrder(order);
            appendOutput('asyncAwaitOutput', `Order shipped to: ${shipment.address}`);

            return `Order ${shipment.id} shipped to ${shipment.address}`;
        } catch (error) {
            return `Error: ${error.message}`;
        }
    }

    const result = await orderProduct(123);
    appendOutput('asyncAwaitOutput', result);
});

// Event Loop example
document.getElementById('eventLoopBtn').addEventListener('click', runEventLoop);

function runEventLoop() {
    const output = document.getElementById('eventLoopOutput');
    const callStack = document.getElementById('callStack');
    const taskQueue = document.getElementById('taskQueue');
    const microtaskQueue = document.getElementById('microtaskQueue');

    // Clear previous outputs
    output.innerHTML = '';
    callStack.innerHTML = '';
    taskQueue.innerHTML = '';
    microtaskQueue.innerHTML = '';

    // Helper function to append output with a delay
    function appendOutput(text, delay = 0) {
        setTimeout(() => {
            output.innerHTML += text + '<br>';
        }, delay);
    }

    // Helper function to update visual representation
    function updateVisual(stack, macroQueue, microQueue, delay = 0) {
        setTimeout(() => {
            callStack.innerHTML = stack.map(item => `<div class="stack-item ${item.executing ? 'executing' : ''}">${item.name}</div>`).join('');
            taskQueue.innerHTML = macroQueue.map(item => `<div class="queue-item">${item}</div>`).join('');
            microtaskQueue.innerHTML = microQueue.map(item => `<div class="queue-item">${item}</div>`).join('');
        }, delay);
    }

    let delay = 0;
    const delayIncrement = 1000;

    // Simulate event loop execution
    // 1. Synchronous task
    appendOutput("1. Synchronous task", delay);
    updateVisual([{name: "Main", executing: true}], [], [], delay);
    delay += delayIncrement;

    // Add setTimeout to task queue
    updateVisual([{name: "Main", executing: true}], ["setTimeout"], [], delay);
    delay += delayIncrement;

    // Add Promise to microtask queue
    updateVisual([{name: "Main", executing: true}], ["setTimeout"], ["Promise"], delay);
    delay += delayIncrement;

    // 2. Synchronous task
    appendOutput("2. Synchronous task", delay);
    updateVisual([{name: "Main", executing: true}], ["setTimeout"], ["Promise"], delay);
    delay += delayIncrement;

    // Execute microtask
    appendOutput("3. Microtask", delay);
    updateVisual([{name: "Main", executing: false}, {name: "Promise callback", executing: true}], ["setTimeout"], [], delay);
    delay += delayIncrement;

    // Execute macrotask (setTimeout callback)
    appendOutput("4. Timer callback", delay);
    updateVisual([{name: "Main", executing: false}, {name: "setTimeout callback", executing: true}], [], [], delay);
    delay += delayIncrement;

    // Clear call stack
    updateVisual([], [], [], delay);
}