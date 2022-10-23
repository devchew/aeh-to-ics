//from '29.01.2023 14:30'
// to ["YYYY", "M", "D", "H", "m"]
import * as ics from 'ics';
import { ParsedCalendar } from '../types/Calendar';

export const parseFile = (data: string[][]): ParsedCalendar[] => {
    const [labels, ...rows] = data;
    return rows.map((row) => row.reduce((element, column, index) => {
            return {
                ...element,
                [labels[index]]: column
            };
        }, {}) as ParsedCalendar
    )
}

export const transformDate = (date: string): ics.DateArray => {
    const [dmy, time] = date.split(' ');
    const [day, month, year] = dmy.split('.');
    const [hours, minutes] = time.split(':');
    return [year, month, day, hours, minutes].map((value) => parseInt(value, 10)) as ics.DateArray;
}

export const createDescription = (event: ParsedCalendar): string => Object.entries(event)
    .map(([name, value]) => `${name}: ${value}`)
    .join('\n')

export const convertParsedToCalendar = (data: ParsedCalendar[]):  ics.EventAttributes[] => data.map(event => {
    return {
        end: transformDate(event['data zakończenia']),
        start: transformDate(event['data rozpoczęcia']),
        title: `${event['nazwa pełna przedmiotu']} [${event['grupa zajęciowa']}]`,
        description: createDescription(event)
    }
})
