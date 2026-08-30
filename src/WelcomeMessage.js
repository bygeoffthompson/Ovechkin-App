import {useTranslation} from 'react-i18next'
import {useOnThisDay} from './useOnThisDay'
import {LEAGUE_META, random} from './constants'

export default function WelcomeMessage({jsonData, onGoalSelect}) {
    const {t} = useTranslation()
    const { onThisDayGoals, month, day, dotwName, dotwMatches } = useOnThisDay(jsonData)
    return (
        <div className="alert alert-secondary border-radius-0 shadow-lg text-bg-light w-100" role="alert">
            <p className="alert-heading h1 mb-3">{t('welcome.title')}</p>
            <div className="align-items-start d-flex flex-column flex-sm-row gap-2">
                <img alt="Recording Light" height="30" src="/gifs/record-light.gif" width="30" />
                <p className="m-0">{t('welcome.clickToSearch')}</p>
            </div>
            <hr className="my-3"/>
            <div className="align-items-center d-flex flex-row flex-wrap gap-3 mb-3">
                <span className="h6 m-0">{t('welcome.dotw')}</span>
                {t('welcome.watchA')}
                <button className="button dotw" disabled={dotwMatches.length === 0} title={`${dotwName} ${t('welcome.goal')}`} type="button" onClick={() => {
                    if (!dotwMatches.length) return
                    onGoalSelect(dotwMatches[random(0, dotwMatches.length - 1)].goal)
                }}>{dotwName} {t('welcome.goal')}</button>
            </div>
            <hr className="my-3"/>
            <div className="align-items-center d-flex flex-row flex-wrap gap-3">
                <span className="h6 m-0">{t('welcome.otd')}</span><span className="badge p-2">{month}/{day}</span>
                {onThisDayGoals.length > 0 && <p className="m-0">{t('welcome.year')}</p>}
                {onThisDayGoals.length > 0 ? onThisDayGoals.map(goal => (
                    <button className="button" key={goal.goal} onClick={() => onGoalSelect(goal.goal)} title={`${goal.year} ${t(`leagueLabel.${goal.league}`)}`} type="button">
                        {goal.year} {t(`leagueLabel.${goal.league}`)}
                    </button>
                )) : (
                    <button className="button" disabled>{t('welcome.noGoals')}</button>
                )}
            </div>
        </div>
    )
}
