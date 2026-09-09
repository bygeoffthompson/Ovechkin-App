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

        var label = document.createElement('label');
        label.htmlFor = 'footer-menu';
        label.className = 'small text-uppercase';
        label.setAttribute('data-i18n', 'footer-explore');

        var select = document.createElement('select');
        select.id = 'footer-menu';

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

        var group = document.createElement('div');
        group.className = 'd-flex gap-2 align-items-center';
        group.appendChild(label);
        group.appendChild(select);

        footer.appendChild(group);
    });
})();
