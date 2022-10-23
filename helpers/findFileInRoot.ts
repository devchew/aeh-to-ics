import fs from 'fs';
import path from 'path';

export const findFilesInRoot = () => fs
    .readdirSync(__dirname)
    .filter(file => path.extname(file) == ".xls")
    .map(filename => path.resolve(__dirname, filename));
