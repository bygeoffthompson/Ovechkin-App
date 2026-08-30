(function () {
    var LINKS = [
        { href: '/', key: 'footer-1' },
        { href: '/about.html', key: 'footer-2' },
        { href: '/assists.html', key: 'footer-3' },
        { href: '/goals.html', key: 'footer-4' },
        { href: '/goalies.html', key: 'footer-5' },
        { href: '/graph.html', key: 'footer-6' },
        { href: '/help.html', key: 'footer-7' },
        { href: '/players.html', key: 'footer-8' }
    ];

    document.addEventListener('DOMContentLoaded', function () {
        var footer = document.querySelector('footer');
        if (!footer) return;
        for (var i = 0; i < LINKS.length; i++) {
            if (i > 0) {
                var sep = document.createElement('span');
                sep.className = 'd-none d-sm-block';
                sep.textContent = '|';
                footer.appendChild(sep);
            }
            var a = document.createElement('a');
            a.href = LINKS[i].href;
            a.setAttribute('data-i18n', LINKS[i].key);
            footer.appendChild(a);
        }
    });
})();
