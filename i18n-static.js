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
            '404-1': 'Page Not Found',

            'about-1': 'About Ovechkin App',
            'about-2': 'The complete catalog of Ovechkin goal videos from first to last including Playoff, KHL, Olympic, World Championship, and World Cup goals.',
            'about-3': 'Our searchable and sequential index allows users to find Ovi goals in a new and useful way.',
            'about-4': 'Specific goals and curated sets of goals can be retrieved by text search for date, opponent, goaltender, period, points, jersey, and other tags.',
            'about-5': 'Thank You', 'about-6': 'To all embedded Youtube channels.', 'about-7': 'Contact',

            'assists-1': 'Ovechkin Goal Assists',
            'assists-2': 'A report of players who have registered an assist on Ovechkin goals.',
            'assists-3': 'Player', 'assists-4': 'NHL Regular', 'assists-5': 'NHL Playoffs',
            'assists-6': 'KHL', 'assists-7': 'Olympic', 'assists-8': 'World Championship', 'assists-9': 'World Cup',

            'goalies-1': 'Ovechkin Goal Goalies',
            'goalies-2': 'A list of goalies who have been scored on by Ovechkin.',
            'goalies-3': 'Goalie', 'goalies-4': 'Date', 'goalies-5': 'NHL Regular', 'goalies-6': 'NHL Playoffs',
            'goalies-7': 'KHL', 'goalies-8': 'Olympic', 'goalies-9': 'World Championship', 'goalies-10': 'World Cup',

            'goals-1': 'All Ovechkin Goals',
            'goals-2': 'A chronological and comprehensive list of Ovechkin goals with supporting details.',
            'goals-3': 'Goal', 'goals-4': 'League/Season', 'goals-5': 'Date', 'goals-6': 'Goalie',
            'goals-7': 'Opponent', 'goals-8': 'Period',

            'graph-1': 'Goal Graph',
            'graph-2': "A timeline of Ovechkin's NHL goals shows his complete career scoring arc. Goals can be filtered with several available options.",
            'graph-3': 'All NHL Goals',
            'graph-4': 'League', 'graph-5': 'All', 'graph-6': 'NHL Regular', 'graph-7': 'NHL Playoffs',
            'graph-8': 'Home/Away', 'graph-9': 'All', 'graph-10': 'Home', 'graph-11': 'Away',
            'graph-12': 'Period', 'graph-13': 'All', 'graph-14': 'First', 'graph-15': 'Second',
            'graph-16': 'Third', 'graph-17': 'Overtime',
            'graph-18': 'Win/Loss', 'graph-19': 'All', 'graph-20': 'Win', 'graph-21': 'Loss',
            'graph-22': 'Type', 'graph-23': 'All',

            'help-1': 'Ovechkin App Help',
            'help-2': 'Assist Search',
            'help-3': 'Assist data is in sequential format ([Primary Assist Name] [Secondary Assist Name])',
            'help-4': 'Date Search',
            'help-5': 'Dates are stored in three formats (no leading zeros)',
            'help-6': 'December 10 2013', 'help-7': 'March 20 2025', 'help-8': 'November 2018', 'help-9': 'March 2024',
            'help-10': 'Goal Search',
            'help-11': 'Goals are identified by a unique number.',
            'help-12': 'NHL regular season goals are indexed 1 to 929. All other goals are intertwined as floats.',
            'help-13': '0.02 is World Championship Goal #2 (2005)',
            'help-14': '21 is NHL Goal #21 (2005)',
            'help-15': '36.04 is Olympic Goal #4 (2006)',
            'help-16': '288.05 is All Star Goal #5 (2011)',
            'help-17': '525.02 is World Cup Goal #2 (2016)',
            'help-18': '897.75 is Playoff Goal #75 (2025)',
            'help-19': 'In a few cases this cataloging produced duplicate floats which were resolved by incrementing the NHL regular season goal number by one.',
            'help-20': 'League Search', 'help-21': 'Text Search',
            'help-22': '20th goals', 'help-23': '30th goals', 'help-24': '40th goals', 'help-25': '50th goals', 'help-26': '60th goals',
            'help-27': 'Second goals of a game', 'help-28': 'Hat Trick goals', 'help-29': 'Fourth goals of a game',
            'help-30': 'Century mark goals', 'help-31': 'Rocket Richard winning goals', 'help-32': "Goals against season's Vezina winner",
            'help-33': 'First goals of season', 'help-34': 'Last goals of season', 'help-35': 'Goals against a former teammate',
            'help-36': 'Game Winning Goals', 'help-37': 'Overtime goals', 'help-38': 'Power Play Goals',
            'help-39': 'Shorthanded Goals', 'help-40': 'Empty Net Goals',
            'help-41': 'First period goals', 'help-42': 'Second period goals', 'help-43': 'Third period goals',
            'help-44': 'Rookie season goals', 'help-45': 'Career high 7 game goal streak',
            'help-46': 'Home Opener goals', 'help-47': 'Goals wearing special TUUKs',
            'help-48': 'Playoff games 1 through 7',
            'help-49': 'Climbing the leaderboard', 'help-50': 'A goalie scored against just once',
            'help-51': '5 on 3 goals', 'help-52': '6 on 5 goals', 'help-53': 'Penalty Shot goals',
            'help-54': 'Halloween goals', 'help-55': 'Canadian Thanksgiving goals', 'help-56': 'Boxing Day goals',
            'help-57': 'New Years Eve and Day goals', 'help-58': 'Superbowl Sunday goals', 'help-59': "Valentine's Day goals",
            'help-60': 'Red Capitals jersey', 'help-61': 'White Capitals jersey', 'help-62': 'Black Capitol jersey',
            'help-63': 'White Screagle jersey', 'help-64': 'Red and White Throwback jersey',
            'help-65': 'Navy Third jersey', 'help-66': 'Black and Red Reverse Retro jersey',
            'help-67': '2015 Winter Classic jersey', 'help-68': '2018 Stadium Series jersey',
            'help-69': 'URL Queries',
            'help-70': 'Ovechkin App accepts URL queries to return specific goals',
            'help-71': 'or a set of filtered search results',

            'index-1': 'Relive the Red Lights',

            'players-1': 'Players in the Ovechkin App',
            'players-2': 'A chronological list of every player in Ovechkin App.',
            'players-3': '#', 'players-4': 'Player', 'players-5': 'League', 'players-6': 'Date',

            'vote-1': 'Ovechkin App Vote',
            'vote-2': 'A record of visitor votes for Ovechkin goals.',
            'vote-3': 'Vote for your favorite goal with the [Vote] button that displays above videos.',

            'leagueLabel-1': 'NHL', 'leagueLabel-2': 'Playoffs', 'leagueLabel-3': 'KHL',
            'leagueLabel-4': 'Olympics', 'leagueLabel-5': 'Worlds', 'leagueLabel-6': 'World Cup',

            'footer-1': 'Home', 'footer-2': 'About', 'footer-3': 'Assists', 'footer-4': 'Goals',
            'footer-5': 'Goalies', 'footer-6': 'Graph', 'footer-7': 'Help', 'footer-8': 'Players', 'footer-9': 'Vote'
        },
        es: {
            '404-1': 'Página No Encontrada',

            'about-1': 'Acerca de Ovechkin App',
            'about-2': 'El catálogo completo de videos de goles de Ovechkin, del primero al último, incluyendo Playoffs, KHL, Olímpicos, Campeonato Mundial y Copa del Mundo.',
            'about-3': 'Nuestro índice secuencial y buscable permite a los usuarios encontrar los goles de Ovi de una manera nueva y útil.',
            'about-4': 'Goles específicos y conjuntos seleccionados pueden recuperarse mediante búsqueda de texto por fecha, rival, portero, período, puntos, camiseta y otras etiquetas.',
            'about-5': 'Gracias', 'about-6': 'A todos los canales de Youtube incluidos.', 'about-7': 'Contacto',

            'assists-1': 'Asistencias en Goles de Ovechkin',
            'assists-2': 'Un informe de los jugadores que han registrado una asistencia en los goles de Ovechkin.',
            'assists-3': 'Jugador', 'assists-4': 'NHL Regular', 'assists-5': 'Playoffs NHL',
            'assists-6': 'KHL', 'assists-7': 'Olímpico', 'assists-8': 'Campeonato Mundial', 'assists-9': 'Copa del Mundo',

            'goalies-1': 'Porteros de Goles de Ovechkin',
            'goalies-2': 'Una lista de porteros a los que Ovechkin ha marcado.',
            'goalies-3': 'Portero', 'goalies-4': 'Fecha', 'goalies-5': 'NHL Regular', 'goalies-6': 'Playoffs NHL',
            'goalies-7': 'KHL', 'goalies-8': 'Olímpico', 'goalies-9': 'Campeonato Mundial', 'goalies-10': 'Copa del Mundo',

            'goals-1': 'Todos los Goles de Ovechkin',
            'goals-2': 'Una lista cronológica y completa de los goles de Ovechkin con detalles de apoyo.',
            'goals-3': 'Gol', 'goals-4': 'Liga/Temporada', 'goals-5': 'Fecha', 'goals-6': 'Portero',
            'goals-7': 'Oponente', 'goals-8': 'Período',

            'graph-1': 'Gráfica de Goles',
            'graph-2': 'Una línea de tiempo de los goles NHL de Ovechkin que muestra el arco de anotación de toda su carrera. Los goles se pueden filtrar con varias opciones disponibles.',
            'graph-3': 'Todos los Goles NHL',
            'graph-4': 'Liga', 'graph-5': 'Todos', 'graph-6': 'NHL Regular', 'graph-7': 'Playoffs NHL',
            'graph-8': 'Local/Visitante', 'graph-9': 'Todos', 'graph-10': 'Local', 'graph-11': 'Visitante',
            'graph-12': 'Período', 'graph-13': 'Todos', 'graph-14': 'Primero', 'graph-15': 'Segundo',
            'graph-16': 'Tercero', 'graph-17': 'Tiempo Extra',
            'graph-18': 'Victoria/Derrota', 'graph-19': 'Todos', 'graph-20': 'Victoria', 'graph-21': 'Derrota',
            'graph-22': 'Tipo', 'graph-23': 'Todos',

            'help-1': 'Ayuda de Ovechkin App',
            'help-2': 'Búsqueda de Asistencias',
            'help-3': 'Los datos de asistencias están en formato secuencial ([Nombre del Asistente Primario] [Nombre del Asistente Secundario])',
            'help-4': 'Búsqueda por Fecha',
            'help-5': 'Las fechas se almacenan en tres formatos (sin ceros iniciales)',
            'help-6': '10 de Diciembre de 2013', 'help-7': '20 de Marzo de 2025', 'help-8': 'Noviembre de 2018', 'help-9': 'Marzo de 2024',
            'help-10': 'Búsqueda de Goles',
            'help-11': 'Los goles se identifican por un número único.',
            'help-12': 'Los goles de temporada regular de la NHL están indexados del 1 al 929. Todos los demás goles se entrelazan como decimales.',
            'help-13': '0.02 es el Gol #2 del Campeonato Mundial (2005)',
            'help-14': '21 es el Gol #21 de la NHL (2005)',
            'help-15': '36.04 es el Gol Olímpico #4 (2006)',
            'help-16': '288.05 es el Gol #5 del All Star (2011)',
            'help-17': '525.02 es el Gol #2 de la Copa del Mundo (2016)',
            'help-18': '897.75 es el Gol #75 de Playoffs (2025)',
            'help-19': 'En algunos casos esta catalogación produjo decimales duplicados que se resolvieron incrementando el número de gol de temporada regular de la NHL en uno.',
            'help-20': 'Búsqueda por Liga', 'help-21': 'Búsqueda de Texto',
            'help-22': 'Goles número 20', 'help-23': 'Goles número 30', 'help-24': 'Goles número 40', 'help-25': 'Goles número 50', 'help-26': 'Goles número 60',
            'help-27': 'Segundo gol de un partido', 'help-28': 'Goles de hat trick', 'help-29': 'Cuarto gol de un partido',
            'help-30': 'Goles en cifras redondas', 'help-31': 'Goles ganadores del Rocket Richard', 'help-32': 'Goles contra el ganador del Vezina de la temporada',
            'help-33': 'Primeros goles de temporada', 'help-34': 'Últimos goles de temporada', 'help-35': 'Goles contra un excompañero',
            'help-36': 'Goles ganadores del partido', 'help-37': 'Goles en tiempo extra', 'help-38': 'Goles en powerplay',
            'help-39': 'Goles en inferioridad', 'help-40': 'Goles con portería vacía',
            'help-41': 'Goles en el primer período', 'help-42': 'Goles en el segundo período', 'help-43': 'Goles en el tercer período',
            'help-44': 'Goles de temporada de novato', 'help-45': 'Mejor racha de 7 partidos con gol',
            'help-46': 'Goles en el partido inaugural en casa', 'help-47': 'Goles con patines TUUK especiales',
            'help-48': 'Partidos de playoffs del 1 al 7',
            'help-49': 'Escalando el ranking', 'help-50': 'Un portero marcado solo una vez',
            'help-51': 'Goles 5 contra 3', 'help-52': 'Goles 6 contra 5', 'help-53': 'Goles de tiro penal',
            'help-54': 'Goles en Halloween', 'help-55': 'Goles en Acción de Gracias canadiense', 'help-56': 'Goles en Boxing Day',
            'help-57': 'Goles en Nochevieja y Año Nuevo', 'help-58': 'Goles en el domingo del Super Bowl', 'help-59': 'Goles en el Día de San Valentín',
            'help-60': 'Camiseta roja de los Capitals', 'help-61': 'Camiseta blanca de los Capitals', 'help-62': 'Camiseta Capitol negra',
            'help-63': 'Camiseta Screagle blanca', 'help-64': 'Camiseta Throwback roja y blanca',
            'help-65': 'Tercera camiseta azul marino', 'help-66': 'Camiseta Reverse Retro negra y roja',
            'help-67': 'Camiseta Winter Classic 2015', 'help-68': 'Camiseta Stadium Series 2018',
            'help-69': 'Consultas URL',
            'help-70': 'Ovechkin App acepta consultas URL para devolver goles específicos',
            'help-71': 'o un conjunto de resultados filtrados',

            'index-1': 'Revive las Luces Rojas',

            'players-1': 'Jugadores en Ovechkin App',
            'players-2': 'Una lista cronológica de cada jugador en Ovechkin App.',
            'players-3': '#', 'players-4': 'Jugador', 'players-5': 'Liga', 'players-6': 'Fecha',

            'vote-1': 'Ovechkin App Voto',
            'vote-2': 'Un registro de votos de visitantes por goles de Ovechkin.',
            'vote-3': 'Vota por tu gol favorito con el botón [Votar] que aparece encima de los videos.',

            'leagueLabel-1': 'NHL', 'leagueLabel-2': 'Eliminatorios', 'leagueLabel-3': 'KHL',
            'leagueLabel-4': 'Olimpiadas', 'leagueLabel-5': 'Mundiales', 'leagueLabel-6': 'Copa',

            'footer-1': 'Inicio', 'footer-2': 'Acerca de', 'footer-3': 'Asistencias', 'footer-4': 'Goles',
            'footer-5': 'Porteros', 'footer-6': 'Gráfica', 'footer-7': 'Ayuda', 'footer-8': 'Jugadores', 'footer-9': 'Votar'
        },
        fr: {
            '404-1': 'Page Introuvable',

            'about-1': "À propos d'Ovechkin App",
            'about-2': "Le catalogue complet des vidéos de buts d'Ovechkin, du premier au dernier, incluant les séries éliminatoires, la KHL, les Jeux olympiques, le Championnat du monde et la Coupe du monde.",
            'about-3': "Notre index séquentiel et consultable permet aux utilisateurs de trouver les buts d'Ovi d'une manière nouvelle et pratique.",
            'about-4': 'Des buts spécifiques et des ensembles sélectionnés peuvent être récupérés par recherche textuelle par date, adversaire, gardien, période, points, maillot et autres balises.',
            'about-5': 'Merci', 'about-6': 'À toutes les chaînes Youtube intégrées.', 'about-7': 'Contact',

            'assists-1': "Passes sur les Buts d'Ovechkin",
            'assists-2': "Un rapport des joueurs qui ont enregistré une passe sur les buts d'Ovechkin.",
            'assists-3': 'Joueur', 'assists-4': 'LNH Régulier', 'assists-5': 'Séries LNH',
            'assists-6': 'KHL', 'assists-7': 'Olympique', 'assists-8': 'Championnat du Monde', 'assists-9': 'Coupe du Monde',

            'goalies-1': "Gardiens des Buts d'Ovechkin",
            'goalies-2': 'Une liste des gardiens sur lesquels Ovechkin a marqué.',
            'goalies-3': 'Gardien', 'goalies-4': 'Date', 'goalies-5': 'LNH Régulier', 'goalies-6': 'Séries LNH',
            'goalies-7': 'KHL', 'goalies-8': 'Olympique', 'goalies-9': 'Championnat du Monde', 'goalies-10': 'Coupe du Monde',

            'goals-1': "Tous les Buts d'Ovechkin",
            'goals-2': "Une liste chronologique et complète des buts d'Ovechkin avec les détails.",
            'goals-3': 'But', 'goals-4': 'Ligue/Saison', 'goals-5': 'Date', 'goals-6': 'Gardien',
            'goals-7': 'Adversaire', 'goals-8': 'Période',

            'graph-1': 'Graphique des Buts',
            'graph-2': "Une chronologie des buts NHL d'Ovechkin montrant l'arc complet de sa carrière de buteur. Les buts peuvent être filtrés avec plusieurs options disponibles.",
            'graph-3': 'Tous les Buts NHL',
            'graph-4': 'Ligue', 'graph-5': 'Tous', 'graph-6': 'LNH Régulier', 'graph-7': 'Séries LNH',
            'graph-8': 'Domicile/Extérieur', 'graph-9': 'Tous', 'graph-10': 'Domicile', 'graph-11': 'Extérieur',
            'graph-12': 'Période', 'graph-13': 'Tous', 'graph-14': 'Première', 'graph-15': 'Deuxième',
            'graph-16': 'Troisième', 'graph-17': 'Prolongation',
            'graph-18': 'Victoire/Défaite', 'graph-19': 'Tous', 'graph-20': 'Victoire', 'graph-21': 'Défaite',
            'graph-22': 'Type', 'graph-23': 'Tous',

            'help-1': 'Aide Ovechkin App',
            'help-2': 'Recherche de Passes',
            'help-3': 'Les données de passes sont en format séquentiel ([Nom du Premier Passeur] [Nom du Second Passeur])',
            'help-4': 'Recherche par Date',
            'help-5': 'Les dates sont stockées en trois formats (sans zéros initiaux)',
            'help-6': '10 Décembre 2013', 'help-7': '20 Mars 2025', 'help-8': 'Novembre 2018', 'help-9': 'Mars 2024',
            'help-10': 'Recherche de Buts',
            'help-11': 'Les buts sont identifiés par un numéro unique.',
            'help-12': 'Les buts de saison régulière NHL sont indexés de 1 à 929. Tous les autres buts sont entrelacés sous forme de décimales.',
            'help-13': '0.02 est le But #2 du Championnat du Monde (2005)',
            'help-14': '21 est le But NHL #21 (2005)',
            'help-15': '36.04 est le But Olympique #4 (2006)',
            'help-16': "288.05 est le But #5 du Match des Étoiles (2011)",
            'help-17': '525.02 est le But #2 de la Coupe du Monde (2016)',
            'help-18': '897.75 est le But #75 des Séries (2025)',
            'help-19': "Dans quelques cas, ce catalogage a produit des décimales en double qui ont été résolues en incrémentant le numéro de but de saison régulière NHL d'une unité.",
            'help-20': 'Recherche par Ligue', 'help-21': 'Recherche Textuelle',
            'help-22': 'Buts numéro 20', 'help-23': 'Buts numéro 30', 'help-24': 'Buts numéro 40', 'help-25': 'Buts numéro 50', 'help-26': 'Buts numéro 60',
            'help-27': 'Deuxième but du match', 'help-28': 'Buts du tour du chapeau', 'help-29': 'Quatrième but du match',
            'help-30': 'Buts du centenaire', 'help-31': 'Buts gagnants du Rocket Richard', 'help-32': 'Buts contre le gagnant du Vézina',
            'help-33': 'Premiers buts de la saison', 'help-34': 'Derniers buts de la saison', 'help-35': 'Buts contre un ancien coéquipier',
            'help-36': 'Buts gagnants du match', 'help-37': 'Buts en prolongation', 'help-38': 'Buts en avantage numérique',
            'help-39': 'Buts en désavantage numérique', 'help-40': 'Buts dans un filet désert',
            'help-41': 'Buts en première période', 'help-42': 'Buts en deuxième période', 'help-43': 'Buts en troisième période',
            'help-44': 'Buts en saison recrue', 'help-45': 'Meilleure série de 7 matchs avec but',
            "help-46": "Buts au match d'ouverture à domicile", 'help-47': 'Buts avec des patins TUUK spéciaux',
            'help-48': 'Matchs de séries 1 à 7',
            'help-49': 'Montée au classement', 'help-50': 'Un gardien battu une seule fois',
            'help-51': 'Buts 5 contre 3', 'help-52': 'Buts 6 contre 5', 'help-53': 'Buts sur tir de pénalité',
            "help-54": "Buts le soir d'Halloween", "help-55": "Buts lors de l'Action de grâce canadienne", 'help-56': 'Buts le lendemain de Noël',
            "help-57": "Buts le réveillon et le jour de l'an", 'help-58': 'Buts le dimanche du Super Bowl', 'help-59': 'Buts à la Saint-Valentin',
            'help-60': 'Maillot rouge des Capitals', 'help-61': 'Maillot blanc des Capitals', 'help-62': 'Maillot Capitol noir',
            'help-63': 'Maillot Screagle blanc', 'help-64': 'Maillot Throwback rouge et blanc',
            'help-65': 'Troisième maillot bleu marine', 'help-66': 'Maillot Reverse Retro noir et rouge',
            'help-67': 'Maillot Winter Classic 2015', 'help-68': 'Maillot Stadium Series 2018',
            'help-69': 'Requêtes URL',
            'help-70': 'Ovechkin App accepte des requêtes URL pour retourner des buts spécifiques',
            'help-71': 'ou un ensemble de résultats filtrés',

            'index-1': 'Revivez les Lumières Rouges',

            'players-1': 'Joueurs dans Ovechkin App',
            'players-2': 'Une liste chronologique de chaque joueur dans Ovechkin App.',
            'players-3': '#', 'players-4': 'Joueur', 'players-5': 'Ligue', 'players-6': 'Date',

            'vote-1': 'Vote Ovechkin App',
            'vote-2': "Un historique des votes des visiteurs pour les buts d'Ovechkin.",
            'vote-3': "Votez pour votre but préféré avec le bouton [Voter] qui s'affiche au-dessus des vidéos.",

            'leagueLabel-1': 'NHL', 'leagueLabel-2': 'Séries', 'leagueLabel-3': 'KHL',
            'leagueLabel-4': 'JO', 'leagueLabel-5': 'Mondiaux', 'leagueLabel-6': 'Coupe',

            'footer-1': 'Accueil', 'footer-2': 'À propos', 'footer-3': 'Passes', 'footer-4': 'Buts',
            'footer-5': 'Gardiens', 'footer-6': 'Graphique', 'footer-7': 'Aide', 'footer-8': 'Joueurs', 'footer-9': 'Vote'
        },
        ru: {
            '404-1': 'Страница Не Найдена',

            'about-1': 'Об Ovechkin App',
            'about-2': 'Полный каталог видео голов Овечкина — от первого до последнего, включая плей-офф, КХЛ, Олимпийские игры, Чемпионат мира и Кубок мира.',
            'about-3': 'Наш последовательный и удобный для поиска индекс позволяет пользователям находить голы Ови новым и удобным способом.',
            'about-4': 'Конкретные голы и подборки можно найти с помощью текстового поиска по дате, сопернику, вратарю, периоду, очкам, форме и другим тегам.',
            'about-5': 'Благодарности', 'about-6': 'Всем встроенным каналам Youtube.', 'about-7': 'Контакты',

            'assists-1': 'Передачи на Голы Овечкина',
            'assists-2': 'Отчёт об игроках, зафиксировавших передачи на голы Овечкина.',
            'assists-3': 'Игрок', 'assists-4': 'НХЛ Регулярный', 'assists-5': 'Плей-офф НХЛ',
            'assists-6': 'КХЛ', 'assists-7': 'Олимпийский', 'assists-8': 'Чемпионат Мира', 'assists-9': 'Кубок Мира',

            'goalies-1': 'Вратари Голов Овечкина',
            'goalies-2': 'Список вратарей, которым Овечкин забивал голы.',
            'goalies-3': 'Вратарь', 'goalies-4': 'Дата', 'goalies-5': 'НХЛ Регулярный', 'goalies-6': 'Плей-офф НХЛ',
            'goalies-7': 'КХЛ', 'goalies-8': 'Олимпийский', 'goalies-9': 'Чемпионат Мира', 'goalies-10': 'Кубок Мира',

            'goals-1': 'Все Голы Овечкина',
            'goals-2': 'Хронологический и полный список голов Овечкина с дополнительными деталями.',
            'goals-3': 'Гол', 'goals-4': 'Лига/Сезон', 'goals-5': 'Дата', 'goals-6': 'Вратарь',
            'goals-7': 'Соперник', 'goals-8': 'Период',

            'graph-1': 'График Голов',
            'graph-2': 'Хронология голов Овечкина в НХЛ, показывающая полную дугу его карьерной результативности. Голы можно фильтровать с помощью нескольких доступных параметров.',
            'graph-3': 'Все Голы НХЛ',
            'graph-4': 'Лига', 'graph-5': 'Все', 'graph-6': 'НХЛ Регулярный', 'graph-7': 'Плей-офф НХЛ',
            'graph-8': 'Дома/В гостях', 'graph-9': 'Все', 'graph-10': 'Дома', 'graph-11': 'В гостях',
            'graph-12': 'Период', 'graph-13': 'Все', 'graph-14': 'Первый', 'graph-15': 'Второй',
            'graph-16': 'Третий', 'graph-17': 'Овертайм',
            'graph-18': 'Победа/Поражение', 'graph-19': 'Все', 'graph-20': 'Победа', 'graph-21': 'Поражение',
            'graph-22': 'Тип', 'graph-23': 'Все',

            'help-1': 'Помощь Ovechkin App',
            'help-2': 'Поиск Передач',
            'help-3': 'Данные о передачах представлены в последовательном формате ([Имя первого ассистента] [Имя второго ассистента])',
            'help-4': 'Поиск по Дате',
            'help-5': 'Даты хранятся в трёх форматах (без ведущих нулей)',
            'help-6': '10 Декабря 2013', 'help-7': '20 Марта 2025', 'help-8': 'Ноябрь 2018', 'help-9': 'Март 2024',
            'help-10': 'Поиск Голов',
            'help-11': 'Голы идентифицируются уникальным номером.',
            'help-12': 'Голы регулярного сезона НХЛ индексируются от 1 до 929. Все остальные голы переплетаются в виде десятичных дробей.',
            'help-13': '0.02 — это Гол #2 Чемпионата Мира (2005)',
            'help-14': '21 — это Гол НХЛ #21 (2005)',
            'help-15': '36.04 — это Олимпийский Гол #4 (2006)',
            'help-16': '288.05 — это Гол #5 Матча Всех Звёзд (2011)',
            'help-17': '525.02 — это Гол #2 Кубка Мира (2016)',
            'help-18': '897.75 — это Гол плей-офф #75 (2025)',
            'help-19': 'В некоторых случаях эта каталогизация создавала дублирующиеся десятичные дроби, которые были устранены увеличением номера гола регулярного сезона НХЛ на единицу.',
            'help-20': 'Поиск по Лиге', 'help-21': 'Текстовый Поиск',
            'help-22': 'Голы с числом 20', 'help-23': 'Голы с числом 30', 'help-24': 'Голы с числом 40', 'help-25': 'Голы с числом 50', 'help-26': 'Голы с числом 60',
            'help-27': 'Второй гол в матче', 'help-28': 'Голы хет-трика', 'help-29': 'Четвёртый гол в матче',
            'help-30': 'Голы в круглых цифрах', 'help-31': 'Голы, принёсшие Ракету Ричарда', 'help-32': 'Голы против обладателя Везина',
            'help-33': 'Первые голы сезона', 'help-34': 'Последние голы сезона', 'help-35': 'Голы против бывшего партнёра по команде',
            'help-36': 'Победные голы', 'help-37': 'Голы в овертайме', 'help-38': 'Голы в большинстве',
            'help-39': 'Голы в меньшинстве', 'help-40': 'Голы в пустые ворота',
            'help-41': 'Голы в первом периоде', 'help-42': 'Голы во втором периоде', 'help-43': 'Голы в третьем периоде',
            'help-44': 'Голы в сезоне новичка', 'help-45': 'Лучшая серия из 7 матчей с голом',
            'help-46': 'Голы на домашнем открытии', 'help-47': 'Голы в специальных коньках TUUK',
            'help-48': 'Матчи плей-офф с 1 по 7',
            'help-49': 'Подъём в рейтинге', 'help-50': 'Вратарь, пропустивший только один раз',
            'help-51': 'Голы при игре 5 на 3', 'help-52': 'Голы при игре 6 на 5', 'help-53': 'Голы с буллита',
            'help-54': 'Голы на Хэллоуин', 'help-55': 'Голы на канадский День благодарения', 'help-56': 'Голы на Боксёрский день',
            'help-57': 'Голы в канун и день Нового года', 'help-58': 'Голы в воскресенье Супербоула', 'help-59': 'Голы в День святого Валентина',
            'help-60': 'Красная форма Capitals', 'help-61': 'Белая форма Capitals', 'help-62': 'Чёрная форма Capitol',
            'help-63': 'Белая форма Screagle', 'help-64': 'Ретро форма красно-белая',
            'help-65': 'Тёмно-синяя третья форма', 'help-66': 'Форма Reverse Retro чёрно-красная',
            'help-67': 'Форма Winter Classic 2015', 'help-68': 'Форма Stadium Series 2018',
            'help-69': 'URL-запросы',
            'help-70': 'Ovechkin App принимает URL-запросы для возврата конкретных голов',
            'help-71': 'или набора отфильтрованных результатов',

            'index-1': 'Снова переживи красные огни',

            'players-1': 'Игроки в Ovechkin App',
            'players-2': 'Хронологический список всех игроков в Ovechkin App.',
            'players-3': '#', 'players-4': 'Игрок', 'players-5': 'Лига', 'players-6': 'Дата',

            'vote-1': 'Голосование Ovechkin App',
            'vote-2': 'Запись голосов посетителей за голы Овечкина.',
            'vote-3': 'Голосуйте за любимый гол с помощью кнопки [Голосовать], которая отображается над видео.',

            'leagueLabel-1': 'NHL', 'leagueLabel-2': 'Плей-офф', 'leagueLabel-3': 'KHL',
            'leagueLabel-4': 'Олимпиада', 'leagueLabel-5': 'ЧМ', 'leagueLabel-6': 'Кубок',

            'footer-1': 'Главная', 'footer-2': 'О нас', 'footer-3': 'Передачи', 'footer-4': 'Голы',
            'footer-5': 'Вратари', 'footer-6': 'График', 'footer-7': 'Помощь', 'footer-8': 'Игроки', 'footer-9': 'Голосовать'
        },
        sv: {
            '404-1': 'Sidan Hittades Inte',

            'about-1': 'Om Ovechkin App',
            'about-2': 'Den kompletta katalogen av Ovechkins målvideor från det första till det sista, inklusive slutspel, KHL, OS, VM och World Cup.',
            'about-3': 'Vårt sökbara och sekventiella index låter användare hitta Ovis mål på ett nytt och användbart sätt.',
            'about-4': 'Specifika mål och utvalda samlingar kan hämtas via textsökning på datum, motståndare, målvakt, period, poäng, tröja och andra taggar.',
            'about-5': 'Tack', 'about-6': 'Till alla inbäddade Youtube-kanaler.', 'about-7': 'Kontakt',

            'assists-1': 'Assistpoäng på Ovechkins Mål',
            'assists-2': 'En rapport över spelare som registrerat en assist på Ovechkins mål.',
            'assists-3': 'Spelare', 'assists-4': 'NHL Regular', 'assists-5': 'NHL Playoffs',
            'assists-6': 'KHL', 'assists-7': 'Olympisk', 'assists-8': 'VM', 'assists-9': 'World Cup',

            'goalies-1': 'Målvakter vid Ovechkins Mål',
            'goalies-2': 'En lista över målvakter som Ovechkin har gjort mål mot.',
            'goalies-3': 'Målvakt', 'goalies-4': 'Datum', 'goalies-5': 'NHL Regular', 'goalies-6': 'NHL Playoffs',
            'goalies-7': 'KHL', 'goalies-8': 'Olympisk', 'goalies-9': 'VM', 'goalies-10': 'World Cup',

            'goals-1': 'Alla Ovechkins Mål',
            'goals-2': 'En kronologisk och fullständig lista över Ovechkins mål med kompletterande detaljer.',
            'goals-3': 'Mål', 'goals-4': 'Liga/Säsong', 'goals-5': 'Datum', 'goals-6': 'Målvakt',
            'goals-7': 'Motståndare', 'goals-8': 'Period',

            'graph-1': 'Målgraf',
            'graph-2': 'En tidslinje över Ovechkins NHL-mål som visar hela karriärens poängbåge. Mål kan filtreras med flera tillgängliga alternativ.',
            'graph-3': 'Alla NHL-mål',
            'graph-4': 'Liga', 'graph-5': 'Alla', 'graph-6': 'NHL Regular', 'graph-7': 'NHL Playoffs',
            'graph-8': 'Hemma/Borta', 'graph-9': 'Alla', 'graph-10': 'Hemma', 'graph-11': 'Borta',
            'graph-12': 'Period', 'graph-13': 'Alla', 'graph-14': 'Första', 'graph-15': 'Andra',
            'graph-16': 'Tredje', 'graph-17': 'Övertid',
            'graph-18': 'Vinst/Förlust', 'graph-19': 'Alla', 'graph-20': 'Vinst', 'graph-21': 'Förlust',
            'graph-22': 'Typ', 'graph-23': 'Alla',

            'help-1': 'Hjälp för Ovechkin App',
            'help-2': 'Assistsökning',
            'help-3': 'Assistdata visas i sekventiellt format ([Namn på primär assistent] [Namn på sekundär assistent])',
            'help-4': 'Datumsökning',
            'help-5': 'Datum lagras i tre format (inga inledande nollor)',
            'help-6': '10 December 2013', 'help-7': '20 Mars 2025', 'help-8': 'November 2018', 'help-9': 'Mars 2024',
            'help-10': 'Målsökning',
            'help-11': 'Mål identifieras med ett unikt nummer.',
            'help-12': 'NHL-grundseriemål är indexerade från 1 till 929. Alla andra mål är sammanflätade som decimaltal.',
            'help-13': '0.02 är VM-mål #2 (2005)',
            'help-14': '21 är NHL-mål #21 (2005)',
            'help-15': '36.04 är OS-mål #4 (2006)',
            'help-16': '288.05 är All Star-mål #5 (2011)',
            'help-17': '525.02 är World Cup-mål #2 (2016)',
            'help-18': '897.75 är slutspelsmål #75 (2025)',
            'help-19': 'I några fall producerade denna katalogisering dubbla decimaltal som löstes genom att öka NHL-grundseriemålnumret med ett.',
            'help-20': 'Ligasökning', 'help-21': 'Textsökning',
            'help-22': 'Mål nummer 20', 'help-23': 'Mål nummer 30', 'help-24': 'Mål nummer 40', 'help-25': 'Mål nummer 50', 'help-26': 'Mål nummer 60',
            'help-27': 'Andra målet i matchen', 'help-28': 'Hat trick-mål', 'help-29': 'Fjärde målet i matchen',
            'help-30': 'Jämna hundratal-mål', 'help-31': 'Rocket Richard-avgörande mål', 'help-32': 'Mål mot säsongens Vezina-vinnare',
            'help-33': 'Säsongens första mål', 'help-34': 'Säsongens sista mål', 'help-35': 'Mål mot en före detta lagkamrat',
            'help-36': 'Matchavgörande mål', 'help-37': 'Övertidsmål', 'help-38': 'Powerplay-mål',
            'help-39': 'Boxplay-mål', 'help-40': 'Mål i tomt mål',
            'help-41': 'Mål i första perioden', 'help-42': 'Mål i andra perioden', 'help-43': 'Mål i tredje perioden',
            'help-44': 'Rookiesäsongens mål', 'help-45': 'Bästa sviten med 7 matcher med mål',
            'help-46': 'Mål på hemmainvigning', 'help-47': 'Mål med speciella TUUK-skridskor',
            'help-48': 'Slutspelsmatcher 1 till 7',
            'help-49': 'Klättrar på topplistan', 'help-50': 'En målvakt bara slagen en gång',
            'help-51': '5 mot 3-mål', 'help-52': '6 mot 5-mål', 'help-53': 'Straffskottsmål',
            'help-54': 'Halloweenmål', 'help-55': 'Kanadensisk Thanksgivingmål', 'help-56': 'Annandag jul-mål',
            'help-57': 'Nyårsafton och nyårsdagsmål', 'help-58': 'Super Bowl-söndagsmål', 'help-59': 'Alla hjärtans dag-mål',
            'help-60': 'Röd Capitals-tröja', 'help-61': 'Vit Capitals-tröja', 'help-62': 'Svart Capitol-tröja',
            'help-63': 'Vit Screagle-tröja', 'help-64': 'Röd och vit Throwback-tröja',
            'help-65': 'Mörkblå tredje tröja', 'help-66': 'Svart och röd Reverse Retro-tröja',
            'help-67': '2015 Winter Classic-tröja', 'help-68': '2018 Stadium Series-tröja',
            'help-69': 'URL-frågor',
            'help-70': 'Ovechkin App accepterar URL-frågor för att returnera specifika mål',
            'help-71': 'eller en uppsättning filtrerade sökresultat',

            'index-1': 'Återupplev de röda ljusen',

            'players-1': 'Spelare i Ovechkin App',
            'players-2': 'En kronologisk lista över varje spelare i Ovechkin App.',
            'players-3': '#', 'players-4': 'Spelare', 'players-5': 'Liga', 'players-6': 'Datum',

            'vote-1': 'Ovechkin App Röst',
            'vote-2': 'En registrering av besökares röster för Ovechkins mål.',
            'vote-3': 'Rösta på ditt favoritmål med knappen [Rösta] som visas ovanför videorna.',

            'leagueLabel-1': 'NHL', 'leagueLabel-2': 'Slutspel', 'leagueLabel-3': 'KHL',
            'leagueLabel-4': 'OS', 'leagueLabel-5': 'VM', 'leagueLabel-6': 'WC',

            'footer-1': 'Hem', 'footer-2': 'Om', 'footer-3': 'Assistpoäng', 'footer-4': 'Mål',
            'footer-5': 'Målvakter', 'footer-6': 'Graf', 'footer-7': 'Hjälp', 'footer-8': 'Spelare', 'footer-9': 'Rösta'
        },
        fi: {
            '404-1': 'Sivua Ei Löydy',

            'about-1': 'Tietoja Ovechkin App:stä',
            'about-2': 'Täydellinen luettelo Ovechkinin maalivideosta ensimmäisestä viimeiseen, mukaan lukien pudotuspelit, KHL, olympialaiset, MM-kisat ja World Cup.',
            'about-3': 'Haettava ja peräkkäinen hakemistomme antaa käyttäjille mahdollisuuden löytää Ovin maalit uudella ja hyödyllisellä tavalla.',
            'about-4': 'Tiettyjä maaleja ja valittuja kokoelmia voidaan hakea tekstihaulla päivämäärän, vastustajan, maalivahdin, erän, pisteiden, paidan ja muiden tunnisteiden mukaan.',
            'about-5': 'Kiitos', 'about-6': 'Kaikille upotetuille Youtube-kanaville.', 'about-7': 'Yhteystiedot',

            'assists-1': 'Syötöt Ovechkinin Maaleille',
            'assists-2': 'Raportti pelaajista, jotka ovat rekisteröineet syötön Ovechkinin maaleille.',
            'assists-3': 'Pelaaja', 'assists-4': 'NHL Runkosarja', 'assists-5': 'NHL Pudotuspelit',
            'assists-6': 'KHL', 'assists-7': 'Olympia', 'assists-8': 'MM-kisat', 'assists-9': 'World Cup',

            'goalies-1': 'Ovechkinin Maalien Maalivahdit',
            'goalies-2': 'Luettelo maalivahdista, joille Ovechkin on tehnyt maaleja.',
            'goalies-3': 'Maalivaht', 'goalies-4': 'Päivämäärä', 'goalies-5': 'NHL Runkosarja', 'goalies-6': 'NHL Pudotuspelit',
            'goalies-7': 'KHL', 'goalies-8': 'Olympia', 'goalies-9': 'MM-kisat', 'goalies-10': 'World Cup',

            'goals-1': 'Kaikki Ovechkinin Maalit',
            'goals-2': 'Kronologinen ja kattava luettelo Ovechkinin maaleista tukevine tietoineen.',
            'goals-3': 'Maali', 'goals-4': 'Liiga/Kausi', 'goals-5': 'Päivämäärä', 'goals-6': 'Maalivaht',
            'goals-7': 'Vastustaja', 'goals-8': 'Erä',

            'graph-1': 'Maalikaavio',
            'graph-2': 'Aikajana Ovechkinin NHL-maaleista, joka näyttää hänen uransa täydellisen pistekäyrän. Maaleja voidaan suodattaa useilla käytettävissä olevilla vaihtoehdoilla.',
            'graph-3': 'Kaikki NHL-maalit',
            'graph-4': 'Liiga', 'graph-5': 'Kaikki', 'graph-6': 'NHL Runkosarja', 'graph-7': 'NHL Pudotuspelit',
            'graph-8': 'Koti/Vieras', 'graph-9': 'Kaikki', 'graph-10': 'Koti', 'graph-11': 'Vieras',
            'graph-12': 'Erä', 'graph-13': 'Kaikki', 'graph-14': 'Ensimmäinen', 'graph-15': 'Toinen',
            'graph-16': 'Kolmas', 'graph-17': 'Jatkoaika',
            'graph-18': 'Voitto/Tappio', 'graph-19': 'Kaikki', 'graph-20': 'Voitto', 'graph-21': 'Tappio',
            'graph-22': 'Tyyppi', 'graph-23': 'Kaikki',

            'help-1': 'Ovechkin App Ohje',
            'help-2': 'Syöttöhaku',
            'help-3': 'Syöttödata on peräkkäisessä muodossa ([Ensisijainen Syöttäjä] [Toissijainen Syöttäjä])',
            'help-4': 'Päivämäärähaku',
            'help-5': 'Päivämäärät tallennetaan kolmessa muodossa (ei johtavia nollia)',
            'help-6': '10 Joulukuuta 2013', 'help-7': '20 Maaliskuuta 2025', 'help-8': 'Marraskuu 2018', 'help-9': 'Maaliskuu 2024',
            'help-10': 'Maalihaku',
            'help-11': 'Maalit tunnistetaan yksilöllisellä numerolla.',
            'help-12': "NHL:n runkosarjan maalit on indeksoitu 1:stä 929:ään. Kaikki muut maalit ovat lomittain desimaalilukuina.",
            'help-13': '0.02 on MM-kisojen Maali #2 (2005)',
            'help-14': '21 on NHL Maali #21 (2005)',
            'help-15': '36.04 on Olympialaisten Maali #4 (2006)',
            'help-16': '288.05 on All Star Maali #5 (2011)',
            'help-17': '525.02 on World Cup Maali #2 (2016)',
            'help-18': '897.75 on Pudotuspelien Maali #75 (2025)',
            'help-19': "Muutamissa tapauksissa tämä luettelointi tuotti päällekkäisiä desimaalilukuja, jotka ratkaistiin kasvattamalla NHL:n runkosarjan maalinumeroa yhdellä.",
            'help-20': 'Liigahaku', 'help-21': 'Tekstihaku',
            'help-22': 'Maalit numero 20', 'help-23': 'Maalit numero 30', 'help-24': 'Maalit numero 40', 'help-25': 'Maalit numero 50', 'help-26': 'Maalit numero 60',
            'help-27': 'Ottelun toinen maali', 'help-28': 'Hat trick -maalit', 'help-29': 'Ottelun neljäs maali',
            'help-30': 'Pyöreiden lukujen maalit', 'help-31': 'Rocket Richard -palkinnon ratkaisseet maalit', 'help-32': 'Maalit kauden Vezina-voittajaa vastaan',
            'help-33': 'Kauden ensimmäiset maalit', 'help-34': 'Kauden viimeiset maalit', 'help-35': 'Maalit entistä joukkuekaveria vastaan',
            'help-36': 'Voittomaalit', 'help-37': 'Jatkoaikamaalit', 'help-38': 'Ylivoimamaalit',
            'help-39': 'Alivoimamaalit', 'help-40': 'Maalit tyhjään maaliin',
            'help-41': 'Ensimmäisen erän maalit', 'help-42': 'Toisen erän maalit', 'help-43': 'Kolmannen erän maalit',
            'help-44': 'Rookiekauden maalit', 'help-45': 'Paras 7 ottelun maaliputki',
            'help-46': 'Kotiareenan avajaismaalit', 'help-47': 'Maalit erityisillä TUUK-luistimilla',
            'help-48': 'Pudotuspeliottelut 1–7',
            'help-49': 'Kiipeäminen listalla', 'help-50': 'Maalivaht jolle maalattu vain kerran',
            'help-51': '5 vastaan 3 -maalit', 'help-52': '6 vastaan 5 -maalit', 'help-53': 'Rangaistuslaukausmaalit',
            'help-54': 'Halloween-maalit', 'help-55': 'Kanadalaisen Thanksgivingin maalit', 'help-56': 'Boxing Day -maalit',
            'help-57': 'Uudenvuodenaaton ja uudenvuodenpäivän maalit', 'help-58': 'Super Bowl -sunnuntain maalit', 'help-59': 'Ystävänpäivän maalit',
            'help-60': 'Punainen Capitals-paita', 'help-61': 'Valkoinen Capitals-paita', 'help-62': 'Musta Capitol-paita',
            'help-63': 'Valkoinen Screagle-paita', 'help-64': 'Punainen ja valkoinen Throwback-paita',
            'help-65': 'Tummansininen kolmas paita', 'help-66': 'Musta ja punainen Reverse Retro -paita',
            'help-67': '2015 Winter Classic -paita', 'help-68': '2018 Stadium Series -paita',
            'help-69': 'URL-kyselyt',
            'help-70': 'Ovechkin App hyväksyy URL-kyselyitä palauttaakseen tiettyjä maaleja',
            'help-71': 'tai joukon suodatettuja hakutuloksia',

            'index-1': 'Elä uudelleen punaiset valot',

            'players-1': 'Pelaajat Ovechkin App:ssä',
            'players-2': 'Kronologinen luettelo kaikista pelaajista Ovechkin App:ssä.',
            'players-3': '#', 'players-4': 'Pelaaja', 'players-5': 'Liiga', 'players-6': 'Päivämäärä',

            'vote-1': 'Ovechkin App Äänestys',
            'vote-2': 'Kirjaus vierailijoiden äänistä Ovechkinin maaleista.',
            'vote-3': 'Äänestä suosikkimaaliasi [Äänestä]-painikkeella, joka näkyy videoiden yläpuolella.',

            'leagueLabel-1': 'NHL', 'leagueLabel-2': 'Pudotuspelit', 'leagueLabel-3': 'KHL',
            'leagueLabel-4': 'Olympia', 'leagueLabel-5': 'MM', 'leagueLabel-6': 'World Cup',

            'footer-1': 'Etusivu', 'footer-2': 'Tietoja', 'footer-3': 'Syötöt', 'footer-4': 'Maalit',
            'footer-5': 'Maalivahdit', 'footer-6': 'Kaavio', 'footer-7': 'Ohje', 'footer-8': 'Pelaajat', 'footer-9': 'Äänestä'
        }
    };

    function getLang() {
        try { return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG; } catch (e) { return DEFAULT_LANG; }
    }

    function t(key, lang) {
        var obj = T[lang] || T[DEFAULT_LANG];
        return obj[key] != null ? obj[key] : key;
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
        sep.className = 'd-none d-md-block';
        sep.textContent = '|';

        footer.insertBefore(sep, footer.firstChild);
        footer.insertBefore(select, footer.firstChild);
        footer.insertBefore(label, footer.firstChild);
    }

    var LEAGUE_KEYS = { 1: 'leagueLabel-1', 2: 'leagueLabel-2', 3: 'leagueLabel-3', 4: 'leagueLabel-4', 5: 'leagueLabel-5', 6: 'leagueLabel-6' };
    var _lang = getLang();
    window.i18nLeague = function(id) { return LEAGUE_KEYS[id] ? t(LEAGUE_KEYS[id], _lang) : null; };

    document.addEventListener('DOMContentLoaded', function () {
        var lang = getLang();
        applyTranslations(lang);
        injectSelector(lang);
    });
})();
