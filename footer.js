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

        var select = document.createElement('select');

        for (var i = 0; i < LINKS.length; i++) {
            var link = LINKS[i];
            var isCurrent = link.href === pathname ||
                (link.href === '/' && (pathname === '/' || pathname === '/index.html'));
            var option = document.createElement('option');
            option.value = link.href;
            option.setAttribute('data-i18n', link.key);
            if (isCurrent) option.selected = true;
            select.appendChild(option);
        }

        select.addEventListener('change', function () {
            window.location.href = this.value;
        });

        footer.appendChild(select);
    });
})();
