export const PERIOD_NAME = { 1: 'P1', 2: 'P2', 3: 'P3', 4: 'OT' }
export const DOTW = { 1: 'Sunday', 2: 'Monday', 3: 'Tuesday', 4: 'Wednesday', 5: 'Thursday', 6: 'Friday', 7: 'Saturday' }
export const LEAGUE = { 1: 'NHL Regular', 2: 'NHL Playoffs', 3: 'KHL', 4: 'Olympics', 5: 'World Championships', 6: 'World Cup', 7: 'All Star' }
export const LEAGUE_ORDER = [1, 2, 3, 4, 5, 6, 7]
export const LEAGUE_META = {
    1: { label: 'NHL',       title: 'NHL Regular Season' },
    2: { label: 'Playoffs',  title: 'NHL Playoffs' },
    3: { label: 'KHL',       title: 'KHL' },
    4: { label: 'Olympics',  title: 'Olympics' },
    5: { label: 'Worlds',    title: 'World Championships' },
    6: { label: 'World Cup', title: 'World Cup' },
    7: { label: 'All Star',  title: 'All Star' },
}

export const canadianTeams = ['Calgary Flames', 'Edmonton Oilers', 'Montreal Canadiens', 'Ottawa Senators', 'Toronto Maple Leafs', 'Vancouver Canucks', 'Winnipeg Jets']
export const youngGunsPlayers = ['Alex Semin', 'Mike Green', 'Nicklas Backstrom']
export const itemSeason = (item) => item.year - (item.month >= 10 ? 2004 : 2005)
export const itemDotw = (item) => new Date(item.year, item.month - 1, item.day).getDay() + 1

export function random(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const normalize = (s) => s.toString().normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export const TEAMS = [
    ['Anaheim Ducks'],
    ['Mighty Ducks of Anaheim', '• Mighty Ducks'],
    ['Arizona Coyotes'],
    ['Phoenix Coyotes', '• Phoenix Coyotes'],
    ['Atlanta Thrashers'],
    ['Boston Bruins'],
    ['Buffalo Sabres'],
    ['Calgary Flames'],
    ['Carolina Hurricanes'],
    ['Chicago Blackhawks'],
    ['Colorado Avalanche'],
    ['Columbus Blue Jackets'],
    ['Dallas Stars'],
    ['Detroit Red Wings'],
    ['Edmonton Oilers'],
    ['Florida Panthers'],
    ['Los Angeles Kings'],
    ['Minnesota Wild'],
    ['Montreal Canadiens'],
    ['Nashville Predators'],
    ['New Jersey Devils'],
    ['New York Islanders'],
    ['New York Rangers'],
    ['Ottawa Senators'],
    ['Philadelphia Flyers'],
    ['Pittsburgh Penguins'],
    ['San Jose Sharks'],
    ['Seattle Kraken'],
    ['St. Louis Blues'],
    ['Tampa Bay Lightning'],
    ['Toronto Maple Leafs'],
    ['Utah Mammoth'],
    ['Vancouver Canucks'],
    ['Vegas Golden Knights'],
    ['Winnipeg Jets'],
]
