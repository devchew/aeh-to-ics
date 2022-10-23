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
