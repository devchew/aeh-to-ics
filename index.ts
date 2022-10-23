import fs from 'fs';
import * as ics from 'ics';
import xlsx from 'node-xlsx';
import { pipe } from 'pipe-ts';
import { findFilesInRoot } from './helpers/findFileInRoot';
import { convertParsedToCalendar, parseFile } from './helpers/calendar';

const processFile = pipe(
    findFilesInRoot,
    (files) => files[0],
    xlsx.parse,
    (file) => file[0].data as string[][],
    parseFile,
    convertParsedToCalendar,
    ics.createEvents
);

const { error, value } = processFile()

if (error) {
    if (error) {
        console.log(error);
        process.exit(1);
    }
}

fs.writeFileSync(`${__dirname}/event.ics`, value || '')
process.exit(0);
