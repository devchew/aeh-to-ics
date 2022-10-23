import xlsx from 'node-xlsx';
import * as ics from 'ics';
import fs from 'fs';
import { DateArray } from 'ics';

// Parse a file
const workSheetsFromFile = xlsx.parse(`${__dirname}/PlanZajecOsoby.xls`, );

//example:
// {
//     'data rozpoczęcia': '29.01.2023 14:30',
//     'data zakończenia': '29.01.2023 17:05',
//     'godziny planowane': '3',
//     'nazwa pełna przedmiotu': 'Języki i paradygmaty programowania',
//     'grupa zajęciowa': 'L2',
//     'wykładowcy': 'dr Feliks Kurp',
//     'rodzaj etapu': 'I,Z,PL',
//     'grupy dziekańskie': 'I,Z,PL\ns2: INBo3\ns3: INo2',
//     sala: 'Teams Teams'
// }
interface ParsedCalendar {
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

const parseFile = (data: string[][]): ParsedCalendar[] => {
    const [labels, ...rows] = data;
    return rows.map((row) => row.reduce((element, column, index) => {
        return {
            ...element,
            [labels[index]]: column
        };
        }, {}) as ParsedCalendar
    )
}

//from '29.01.2023 14:30'
// to ["YYYY", "M", "D", "H", "m"]
const transformDate = (date: string): ics.DateArray => {
    const [dmy, time] = date.split(' ');
    const [day, month, year] = dmy.split('.');
    const [hours, minutes] = time.split(':');
    return [year, month, day, hours, minutes].map((value) => parseInt(value, 10)) as ics.DateArray;
}

const createDescription = (event: ParsedCalendar): string => Object.entries(event)
    .map(([name, value]) => `${name}: ${value}`)
    .join('\n')

const convertParsedToCalendar = (data: ParsedCalendar[]):  ics.EventAttributes[] => data.map(event => {
    return {
        end: transformDate(event['data zakończenia']),
        start: transformDate(event['data rozpoczęcia']),
        title: `${event['nazwa pełna przedmiotu']} [${event['grupa zajęciowa']}]`,
        description: createDescription(event)
    }
})

const events = convertParsedToCalendar(parseFile(workSheetsFromFile[0].data as string[][]));

const { error, value } = ics.createEvents(events)

if (error) {
    if (error) {
        console.log(error);
        process.exit(1);
    }
}

fs.writeFileSync(`${__dirname}/event.ics`, value || '')

