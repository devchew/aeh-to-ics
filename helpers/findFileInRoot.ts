import fs from 'fs';
import path from 'path';

export const findFilesInRoot = (dir:string) => fs
    .readdirSync(dir)
    .filter(file => path.extname(file) === ".xls")
    .map(filename => path.resolve(dir, filename));
