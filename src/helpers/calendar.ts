
import { createEvents, DateArray, EventAttributes } from 'ics';

export interface ParsedCalendar {
    'data rozpoczęcia': string,
    'data zakończenia': string;
    'godziny planowane': string;
    'nazwa pełna przedmiotu': string;
    'grupa zajęciowa': string;
    'wykładowcy': string;
    'rodzaj etapu': string;
    'grupy dziekańskie': string;
    sala: string;
}

//from '29.01.2023 14:30'
// to ["YYYY", "M", "D", "H", "m"]\
export const transformDate = (date: string): DateArray => {
    const [dmy, time] = date.split(' ');
    const [day, month, year] = dmy.split('.');
    const [hours, minutes] = time.split(':');
    return [year, month, day, hours, minutes].map((value) => parseInt(value, 10)) as DateArray;
}

export const createDescription = (event: ParsedCalendar): string => Object.entries(event)
    .map(([name, value]) => `${name}: ${value}`)
    .join('\n')

export const convertParsedToCalendar = (data: ParsedCalendar[]):  EventAttributes[] => data.map(event => ({
    end: transformDate(event['data zakończenia']),
    start: transformDate(event['data rozpoczęcia']),
    title: `${event['nazwa pełna przedmiotu']} [${event['grupa zajęciowa']}]`,
    description: createDescription(event)
}))


export const convertCalendarToICS = (data: EventAttributes[]) => new Promise<string>((resolve, reject) => {
    createEvents(data, (error, value) => {
        if (error) {
            reject(error);
            return
        }
        resolve(value);
    })
})
