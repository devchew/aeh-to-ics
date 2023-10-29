import { FunctionComponent, useState } from 'react';
import { DateArray, EventAttributes } from 'ics';

interface Props {
    events: EventAttributes[]
}

const formatFromDate = (date: Date) => [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');

const formatDate = (date?: DateArray) => {
    if (date) {
        return [
            date[0],
            date[1],
            date[2],
        ].join('-');
    }
    return formatFromDate(new Date());
}

const getTime = ([Y,M,D,h,m]: DateArray) => `${h}:${m}`

//["YYYY", "M", "D", "H", "m"]
const splitEventsByDay = (events: EventAttributes[]): {
    [key: string]: EventAttributes[]
} => events.reduce((previousValue, currentValue) => {
    const date = formatDate(currentValue.start);
    return {
        ...previousValue,
        // @ts-ignore
        [date]: [...previousValue[date] || [], currentValue]
    }
}, {})

// @ts-ignore
const getEventTime = (event: EventAttributes) => `${getTime(event.start)} - ${getTime(event.end)}`

const Preview: FunctionComponent<Props> = ({events}) => {

    const byDate = splitEventsByDay(events);
    const [currentDay, setCurrentDay] = useState<string>(formatDate());
    const nextDay = () => setCurrentDay((current) => formatFromDate(new Date(new Date(current).getTime() + (1000 * 60 * 60 * 24))))
    const prevDay = () => setCurrentDay((current) => formatFromDate(new Date(new Date(current).getTime() - (1000 * 60 * 60 * 24))))

    return (
        <section className="block">
            <section>
                <h3>
                    <button onClick={prevDay}>{'<'}</button>
                    {currentDay} {new Date(currentDay).toLocaleDateString(undefined, {weekday: 'long'})}
                    <button onClick={nextDay}>{'>'}</button>
                </h3>
            </section>
            {!byDate[currentDay] && <section>
              <aside>
                <h3>Brak zajęć w tym dniu</h3>
              </aside>
            </section>}
            <section>
                {(byDate[currentDay] || []).map(event => <aside key={event.title}>
                    <h3>{event.title}</h3>
                    <p>{getEventTime(event)}</p>
                    <p><small>{event.description}</small></p>
                </aside>)}
            </section>
        </section>
    );
};

export default Preview;
