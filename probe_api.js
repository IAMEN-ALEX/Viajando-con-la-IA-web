const fetch = require('node-fetch'); // Native fetch in Node 18+ but let's assume standard usage

const apiKey = "1446|tYX2C3ksgQWCVENLDwDRK1E93nbcHw5lIrtg9YZg";
const baseUrl = "https://www.steadyapi.com";

const endpoints = [
    "/api/v1/chat/completions",
    "/v1/chat/completions",
    "/api/chat/completions",
    "/chat/completions",
    "/api/v1/models"
];

async function probe() {
    for (const ep of endpoints) {
        const url = `${baseUrl}${ep}`;
        console.log(`Probing: ${url}`);
        try {
            // We use a simple HEAD or GET with auth
            const response = await fetch(url, {
                method: 'POST', // standard for chat completions
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: "hi" }]
                })
            });
            console.log(`Status for ${url}: ${response.status}`);
            if (response.status === 200) {
                console.log("SUCCESS FOUND!");
                const data = await response.json();
                console.log(data);
                return;
            }
            const text = await response.text();
            console.log(`Response: ${text.substring(0, 100)}...`);
        } catch (e) {
            console.log(`Error: ${e.message}`);
        }
    }
}

probe();
