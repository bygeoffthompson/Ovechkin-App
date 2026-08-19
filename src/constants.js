export const PERIOD_NAME = { 1: 'P1', 2: 'P2', 3: 'P3', 4: 'OT' }
export const DOTW = { 1: 'Sunday', 2: 'Monday', 3: 'Tuesday', 4: 'Wednesday', 5: 'Thursday', 6: 'Friday', 7: 'Saturday' }
export const LEAGUE = { 1: 'NHL Regular', 2: 'NHL Playoffs', 3: 'KHL', 4: 'Olympics', 5: 'World Championships', 6: 'World Cup', 7: 'All Star' }
export const LEAGUE_LABEL = { 1: 'NHL', 2: 'Playoffs', 3: 'KHL', 4: 'Olympics', 5: 'Worlds', 6: 'World Cup', 7: 'All Star' }
export const itemSeason = (item) => item.year - (item.month >= 10 ? 2004 : 2005)
export const itemDotw = (item) => new Date(item.year, item.month - 1, item.day).getDay() + 1

export function random(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}
