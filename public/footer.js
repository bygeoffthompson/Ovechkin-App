(function () {
    var LINKS = [
        { href: '/', key: 'footer-1' },
        { href: '/about.html', key: 'footer-2' },
        { href: '/assists.html', key: 'footer-3' },
        { href: '/goals.html', key: 'footer-4' },
        { href: '/goalies.html', key: 'footer-5' },
        { href: '/graph.html', key: 'footer-6' },
        { href: '/help.html', key: 'footer-7' },
        { href: '/players.html', key: 'footer-8' },
        { href: '/vote.html', key: 'footer-9' }
    ];

    document.addEventListener('DOMContentLoaded', function () {
        var footer = document.querySelector('footer');
        if (!footer) return;
        var pathname = window.location.pathname;
        var first = true;
        for (var i = 0; i < LINKS.length; i++) {
            var href = LINKS[i].href;
            if (href === pathname || (href === '/' && (pathname === '/' || pathname === '/index.html'))) continue;
            if (!first) {
                var sep = document.createElement('span');
                sep.className = 'd-none d-sm-block';
                sep.textContent = '|';
                footer.appendChild(sep);
            }
            first = false;
            var a = document.createElement('a');
            a.href = href;
            a.setAttribute('data-i18n', LINKS[i].key);
            footer.appendChild(a);
        }
    });
})();
