(function () {
    var STORAGE_KEY = 'ovechkin-app-language';
    var DEFAULT_LANG = 'en';

    var LANGUAGES = [
        { code: 'en', label: 'English' },
        { code: 'es', label: 'Español' },
        { code: 'fr', label: 'Français' },
        { code: 'ru', label: 'Русский' },
        { code: 'sv', label: 'Svenska' },
        { code: 'fi', label: 'Suomi' }
    ];

    var T = {
        en: {
            tagline: 'Relive the Red Lights',
            nav: { home: 'Home', about: 'About', assists: 'Assists', goals: 'Goals', goalies: 'Goalies', graph: 'Graph', help: 'Help', players: 'Players' },
            col: { player: 'Player', goalie: 'Goalie', nhlReg: 'NHL Regular', nhlPlayoffs: 'NHL Playoffs', khl: 'KHL', olympic: 'Olympic', worldChampionship: 'World Championship', worldCup: 'World Cup', date: 'Date', goal: 'Goal', leagueSeason: 'League/Season', opponent: 'Opponent', period: 'Period', league: 'League', number: '#' },
            about: { title: 'About Ovechkin App', description: 'The complete catalog of Ovechkin goal videos from first to last including Playoff, KHL, Olympic, World Championship, and World Cup goals.', body1: 'Our searchable and sequential index allows users to find Ovi goals in a new and useful way.', body2: 'Specific goals and curated sets of goals can be retrieved by text search for date, opponent, goaltender, period, points, jersey, and other tags.', thankYou: 'Thank You', thankYouBody: 'To all embedded Youtube channels.', contact: 'Contact' },
            assists: { title: 'Ovechkin Goal Assists', description: 'A report of players who have registered an assist on Ovechkin goals.' },
            goals: { title: 'All Ovechkin Goals', description: 'A chronological and comprehensive list of Ovechkin goals with supporting details.' },
            goalies: { title: 'Ovechkin Goal Goalies', description: 'A list of goalies who have been scored on by Ovechkin.' },
            graph: { title: 'Goal Graph', description: "A timeline of Ovechkin's NHL goals shows his complete career scoring arc. Goals can be filtered with several available options.", allNhlGoals: 'All NHL Goals', league: 'League', homeAway: 'Home/Away', home: 'Home', away: 'Away', period: 'Period', first: 'First', second: 'Second', third: 'Third', overtime: 'Overtime', winLoss: 'Win/Loss', win: 'Win', loss: 'Loss', type: 'Type', all: 'All' },
            help: { title: 'Ovechkin App Help', assistSearch: 'Assist Search', dateSearch: 'Date Search', goalSearch: 'Goal Search', leagueSearch: 'League Search', textSearch: 'Text Search', urlQueries: 'URL Queries' },
            players: { title: 'Players in the Ovechkin App', description: 'A chronological list of every player in Ovechkin App.' },
            voting: { title: 'Ovechkin App Voting', description: "A record of visitor's votes for their favorite Ovechkin goals." },
            '404': { title: 'Page Not Found' }
        },
        es: {
            tagline: 'Revive las Luces Rojas',
            nav: { home: 'Inicio', about: 'Acerca de', assists: 'Asistencias', goals: 'Goles', goalies: 'Porteros', graph: 'Gráfica', help: 'Ayuda', players: 'Jugadores' },
            col: { player: 'Jugador', goalie: 'Portero', nhlReg: 'NHL Regular', nhlPlayoffs: 'Playoffs NHL', khl: 'KHL', olympic: 'Olímpico', worldChampionship: 'Campeonato Mundial', worldCup: 'Copa del Mundo', date: 'Fecha', goal: 'Gol', leagueSeason: 'Liga/Temporada', opponent: 'Oponente', period: 'Período', league: 'Liga', number: '#' },
            about: { title: 'Acerca de Ovechkin App', description: 'El catálogo completo de videos de goles de Ovechkin, del primero al último, incluyendo Playoffs, KHL, Olímpicos, Campeonato Mundial y Copa del Mundo.', body1: 'Nuestro índice secuencial y buscable permite a los usuarios encontrar los goles de Ovi de una manera nueva y útil.', body2: 'Goles específicos y conjuntos seleccionados pueden recuperarse mediante búsqueda de texto por fecha, rival, portero, período, puntos, camiseta y otras etiquetas.', thankYou: 'Gracias', thankYouBody: 'A todos los canales de Youtube incluidos.', contact: 'Contacto' },
            assists: { title: 'Asistencias en Goles de Ovechkin', description: 'Un informe de los jugadores que han registrado una asistencia en los goles de Ovechkin.' },
            goals: { title: 'Todos los Goles de Ovechkin', description: 'Una lista cronológica y completa de los goles de Ovechkin con detalles de apoyo.' },
            goalies: { title: 'Porteros de Goles de Ovechkin', description: 'Una lista de porteros a los que Ovechkin ha marcado.' },
            graph: { title: 'Gráfica de Goles', description: 'Una línea de tiempo de los goles NHL de Ovechkin que muestra el arco de anotación de toda su carrera. Los goles se pueden filtrar con varias opciones disponibles.', allNhlGoals: 'Todos los Goles NHL', league: 'Liga', homeAway: 'Local/Visitante', home: 'Local', away: 'Visitante', period: 'Período', first: 'Primero', second: 'Segundo', third: 'Tercero', overtime: 'Tiempo Extra', winLoss: 'Victoria/Derrota', win: 'Victoria', loss: 'Derrota', type: 'Tipo', all: 'Todos' },
            help: { title: 'Ayuda de Ovechkin App', assistSearch: 'Búsqueda de Asistencias', dateSearch: 'Búsqueda por Fecha', goalSearch: 'Búsqueda de Goles', leagueSearch: 'Búsqueda por Liga', textSearch: 'Búsqueda de Texto', urlQueries: 'Consultas URL' },
            players: { title: 'Jugadores en Ovechkin App', description: 'Una lista cronológica de cada jugador en Ovechkin App.' },
            voting: { title: 'Votación de Ovechkin App', description: 'Un registro de los votos de los visitantes por sus goles favoritos de Ovechkin.' },
            '404': { title: 'Página No Encontrada' }
        },
        fr: {
            tagline: 'Revivez les Lumières Rouges',
            nav: { home: 'Accueil', about: 'À propos', assists: 'Passes', goals: 'Buts', goalies: 'Gardiens', graph: 'Graphique', help: 'Aide', players: 'Joueurs' },
            col: { player: 'Joueur', goalie: 'Gardien', nhlReg: 'LNH Régulier', nhlPlayoffs: 'Séries LNH', khl: 'KHL', olympic: 'Olympique', worldChampionship: 'Championnat du Monde', worldCup: 'Coupe du Monde', date: 'Date', goal: 'But', leagueSeason: 'Ligue/Saison', opponent: 'Adversaire', period: 'Période', league: 'Ligue', number: '#' },
            about: { title: "À propos d'Ovechkin App", description: 'Le catalogue complet des vidéos de buts d\'Ovechkin, du premier au dernier, incluant les séries éliminatoires, la KHL, les Jeux olympiques, le Championnat du monde et la Coupe du monde.', body1: "Notre index séquentiel et consultable permet aux utilisateurs de trouver les buts d'Ovi d'une manière nouvelle et pratique.", body2: 'Des buts spécifiques et des ensembles sélectionnés peuvent être récupérés par recherche textuelle par date, adversaire, gardien, période, points, maillot et autres balises.', thankYou: 'Merci', thankYouBody: 'À toutes les chaînes Youtube intégrées.', contact: 'Contact' },
            assists: { title: "Passes sur les Buts d'Ovechkin", description: "Un rapport des joueurs qui ont enregistré une passe sur les buts d'Ovechkin." },
            goals: { title: "Tous les Buts d'Ovechkin", description: "Une liste chronologique et complète des buts d'Ovechkin avec les détails." },
            goalies: { title: "Gardiens des Buts d'Ovechkin", description: 'Une liste des gardiens sur lesquels Ovechkin a marqué.' },
            graph: { title: 'Graphique des Buts', description: "Une chronologie des buts NHL d'Ovechkin montrant l'arc complet de sa carrière de buteur. Les buts peuvent être filtrés avec plusieurs options disponibles.", allNhlGoals: 'Tous les Buts NHL', league: 'Ligue', homeAway: 'Domicile/Extérieur', home: 'Domicile', away: 'Extérieur', period: 'Période', first: 'Première', second: 'Deuxième', third: 'Troisième', overtime: 'Prolongation', winLoss: 'Victoire/Défaite', win: 'Victoire', loss: 'Défaite', type: 'Type', all: 'Tous' },
            help: { title: 'Aide Ovechkin App', assistSearch: 'Recherche de Passes', dateSearch: 'Recherche par Date', goalSearch: 'Recherche de Buts', leagueSearch: 'Recherche par Ligue', textSearch: 'Recherche Textuelle', urlQueries: 'Requêtes URL' },
            players: { title: 'Joueurs dans Ovechkin App', description: 'Une liste chronologique de chaque joueur dans Ovechkin App.' },
            voting: { title: 'Vote Ovechkin App', description: "Un historique des votes des visiteurs pour leurs buts préférés d'Ovechkin." },
            '404': { title: 'Page Introuvable' }
        },
        ru: {
            tagline: 'Снова переживи красные огни',
            nav: { home: 'Главная', about: 'О нас', assists: 'Передачи', goals: 'Голы', goalies: 'Вратари', graph: 'График', help: 'Помощь', players: 'Игроки' },
            col: { player: 'Игрок', goalie: 'Вратарь', nhlReg: 'НХЛ Регулярный', nhlPlayoffs: 'Плей-офф НХЛ', khl: 'КХЛ', olympic: 'Олимпийский', worldChampionship: 'Чемпионат Мира', worldCup: 'Кубок Мира', date: 'Дата', goal: 'Гол', leagueSeason: 'Лига/Сезон', opponent: 'Соперник', period: 'Период', league: 'Лига', number: '#' },
            about: { title: 'Об Ovechkin App', description: 'Полный каталог видео голов Овечкина — от первого до последнего, включая плей-офф, КХЛ, Олимпийские игры, Чемпионат мира и Кубок мира.', body1: 'Наш последовательный и удобный для поиска индекс позволяет пользователям находить голы Ови новым и удобным способом.', body2: 'Конкретные голы и подборки можно найти с помощью текстового поиска по дате, сопернику, вратарю, периоду, очкам, форме и другим тегам.', thankYou: 'Благодарности', thankYouBody: 'Всем встроенным каналам Youtube.', contact: 'Контакты' },
            assists: { title: 'Передачи на Голы Овечкина', description: 'Отчёт об игроках, зафиксировавших передачи на голы Овечкина.' },
            goals: { title: 'Все Голы Овечкина', description: 'Хронологический и полный список голов Овечкина с дополнительными деталями.' },
            goalies: { title: 'Вратари Голов Овечкина', description: 'Список вратарей, которым Овечкин забивал голы.' },
            graph: { title: 'График Голов', description: 'Хронология голов Овечкина в НХЛ, показывающая полную дугу его карьерной результативности. Голы можно фильтровать с помощью нескольких доступных параметров.', allNhlGoals: 'Все Голы НХЛ', league: 'Лига', homeAway: 'Дома/В гостях', home: 'Дома', away: 'В гостях', period: 'Период', first: 'Первый', second: 'Второй', third: 'Третий', overtime: 'Овертайм', winLoss: 'Победа/Поражение', win: 'Победа', loss: 'Поражение', type: 'Тип', all: 'Все' },
            help: { title: 'Помощь Ovechkin App', assistSearch: 'Поиск Передач', dateSearch: 'Поиск по Дате', goalSearch: 'Поиск Голов', leagueSearch: 'Поиск по Лиге', textSearch: 'Текстовый Поиск', urlQueries: 'URL-запросы' },
            players: { title: 'Игроки в Ovechkin App', description: 'Хронологический список всех игроков в Ovechkin App.' },
            voting: { title: 'Голосование Ovechkin App', description: 'Запись голосований посетителей за любимые голы Овечкина.' },
            '404': { title: 'Страница Не Найдена' }
        },
        sv: {
            tagline: 'Återupplev de röda ljusen',
            nav: { home: 'Hem', about: 'Om', assists: 'Assistpoäng', goals: 'Mål', goalies: 'Målvakter', graph: 'Graf', help: 'Hjälp', players: 'Spelare' },
            col: { player: 'Spelare', goalie: 'Målvakt', nhlReg: 'NHL Regular', nhlPlayoffs: 'NHL Playoffs', khl: 'KHL', olympic: 'Olympisk', worldChampionship: 'VM', worldCup: 'World Cup', date: 'Datum', goal: 'Mål', leagueSeason: 'Liga/Säsong', opponent: 'Motståndare', period: 'Period', league: 'Liga', number: '#' },
            about: { title: 'Om Ovechkin App', description: 'Den kompletta katalogen av Ovechkins målvideor från det första till det sista, inklusive slutspel, KHL, OS, VM och World Cup.', body1: 'Vårt sökbara och sekventiella index låter användare hitta Ovis mål på ett nytt och användbart sätt.', body2: 'Specifika mål och utvalda samlingar kan hämtas via textsökning på datum, motståndare, målvakt, period, poäng, tröja och andra taggar.', thankYou: 'Tack', thankYouBody: 'Till alla inbäddade Youtube-kanaler.', contact: 'Kontakt' },
            assists: { title: 'Assistpoäng på Ovechkins Mål', description: 'En rapport över spelare som registrerat en assist på Ovechkins mål.' },
            goals: { title: 'Alla Ovechkins Mål', description: 'En kronologisk och fullständig lista över Ovechkins mål med kompletterande detaljer.' },
            goalies: { title: 'Målvakter vid Ovechkins Mål', description: 'En lista över målvakter som Ovechkin har gjort mål mot.' },
            graph: { title: 'Målgraf', description: 'En tidslinje över Ovechkins NHL-mål som visar hela karriärens poängbåge. Mål kan filtreras med flera tillgängliga alternativ.', allNhlGoals: 'Alla NHL-mål', league: 'Liga', homeAway: 'Hemma/Borta', home: 'Hemma', away: 'Borta', period: 'Period', first: 'Första', second: 'Andra', third: 'Tredje', overtime: 'Övertid', winLoss: 'Vinst/Förlust', win: 'Vinst', loss: 'Förlust', type: 'Typ', all: 'Alla' },
            help: { title: 'Hjälp för Ovechkin App', assistSearch: 'Assistsökning', dateSearch: 'Datumsökning', goalSearch: 'Målsökning', leagueSearch: 'Ligasökning', textSearch: 'Textsökning', urlQueries: 'URL-frågor' },
            players: { title: 'Spelare i Ovechkin App', description: 'En kronologisk lista över varje spelare i Ovechkin App.' },
            voting: { title: 'Ovechkin App Röstning', description: 'En registrering av besökares röster för sina favoritmmål av Ovechkin.' },
            '404': { title: 'Sidan Hittades Inte' }
        },
        fi: {
            tagline: 'Elä uudelleen punaiset valot',
            nav: { home: 'Etusivu', about: 'Tietoja', assists: 'Syötöt', goals: 'Maalit', goalies: 'Maalivahdit', graph: 'Kaavio', help: 'Ohje', players: 'Pelaajat' },
            col: { player: 'Pelaaja', goalie: 'Maalivaht', nhlReg: 'NHL Runkosarja', nhlPlayoffs: 'NHL Pudotuspelit', khl: 'KHL', olympic: 'Olympia', worldChampionship: 'MM-kisat', worldCup: 'World Cup', date: 'Päivämäärä', goal: 'Maali', leagueSeason: 'Liiga/Kausi', opponent: 'Vastustaja', period: 'Erä', league: 'Liiga', number: '#' },
            about: { title: 'Tietoja Ovechkin App:stä', description: 'Täydellinen luettelo Ovechkinin maalivideosta ensimmäisestä viimeiseen, mukaan lukien pudotuspelit, KHL, olympialaiset, MM-kisat ja World Cup.', body1: 'Haettava ja peräkkäinen hakemistomme antaa käyttäjille mahdollisuuden löytää Ovin maalit uudella ja hyödyllisellä tavalla.', body2: 'Tiettyjä maaleja ja valittuja kokoelmia voidaan hakea tekstihaulla päivämäärän, vastustajan, maalivahdin, erän, pisteiden, paidan ja muiden tunnisteiden mukaan.', thankYou: 'Kiitos', thankYouBody: 'Kaikille upotetuille Youtube-kanaville.', contact: 'Yhteystiedot' },
            assists: { title: 'Syötöt Ovechkinin Maaleille', description: 'Raportti pelaajista, jotka ovat rekisteröineet syötön Ovechkinin maaleille.' },
            goals: { title: 'Kaikki Ovechkinin Maalit', description: 'Kronologinen ja kattava luettelo Ovechkinin maaleista tukevine tietoineen.' },
            goalies: { title: 'Ovechkinin Maalien Maalivahdit', description: 'Luettelo maalivahdista, joille Ovechkin on tehnyt maaleja.' },
            graph: { title: 'Maalikaavio', description: 'Aikajana Ovechkinin NHL-maaleista, joka näyttää hänen uransa täydellisen pistekäyrän. Maaleja voidaan suodattaa useilla käytettävissä olevilla vaihtoehdoilla.', allNhlGoals: 'Kaikki NHL-maalit', league: 'Liiga', homeAway: 'Koti/Vieras', home: 'Koti', away: 'Vieras', period: 'Erä', first: 'Ensimmäinen', second: 'Toinen', third: 'Kolmas', overtime: 'Jatkoaika', winLoss: 'Voitto/Tappio', win: 'Voitto', loss: 'Tappio', type: 'Tyyppi', all: 'Kaikki' },
            help: { title: 'Ovechkin App Ohje', assistSearch: 'Syöttöhaku', dateSearch: 'Päivämäärähaku', goalSearch: 'Maalihaku', leagueSearch: 'Liigahaku', textSearch: 'Tekstihaku', urlQueries: 'URL-kyselyt' },
            players: { title: 'Pelaajat Ovechkin App:ssä', description: 'Kronologinen luettelo kaikista pelaajista Ovechkin App:ssä.' },
            voting: { title: 'Ovechkin App Äänestys', description: 'Kirjaus vierailijoiden äänistä heidän suosikeistaan Ovechkinin maaleista.' },
            '404': { title: 'Sivua Ei Löydy' }
        }
    };

    function getLang() {
        try { return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG; } catch (e) { return DEFAULT_LANG; }
    }

    function t(key, lang) {
        var parts = key.split('.');
        var obj = T[lang] || T[DEFAULT_LANG];
        for (var i = 0; i < parts.length; i++) {
            if (obj == null) return key;
            obj = obj[parts[i]];
        }
        return obj != null ? obj : key;
    }

    function applyTranslations(lang) {
        var els = document.querySelectorAll('[data-i18n]');
        for (var i = 0; i < els.length; i++) {
            els[i].textContent = t(els[i].getAttribute('data-i18n'), lang);
        }
        document.documentElement.setAttribute('lang', lang);
    }

    function injectSelector(lang) {
        var footer = document.querySelector('footer');
        if (!footer) return;

        var label = document.createElement('label');
        label.setAttribute('for', 'language');
        label.textContent = 'Language';
        label.hidden = true;

        var select = document.createElement('select');
        select.id = 'language';
        for (var i = 0; i < LANGUAGES.length; i++) {
            var opt = document.createElement('option');
            opt.value = LANGUAGES[i].code;
            opt.textContent = LANGUAGES[i].label;
            if (LANGUAGES[i].code === lang) opt.selected = true;
            select.appendChild(opt);
        }
        select.addEventListener('change', function (e) {
            try { localStorage.setItem(STORAGE_KEY, e.target.value); } catch (err) {}
            window.location.reload();
        });

        var sep = document.createElement('span');
        sep.className = 'd-none d-sm-block';
        sep.textContent = '|';

        footer.insertBefore(sep, footer.firstChild);
        footer.insertBefore(select, footer.firstChild);
        footer.insertBefore(label, footer.firstChild);
    }

    document.addEventListener('DOMContentLoaded', function () {
        var lang = getLang();
        applyTranslations(lang);
        injectSelector(lang);
    });
})();
