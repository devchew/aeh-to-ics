import { read, utils } from 'xlsx';

export const readXLSFile = (blob: Blob) => new Promise<any>((resolve, reject) => {

    const reader = new FileReader();
    reader.onload = function() {
        // @ts-ignore
        const array = new Uint8Array(this.result);
        // @ts-ignore
        const binaryString = String.fromCharCode.apply(null, array);

        /* Call XLSX */
        const workbook = read(binaryString, {
            type: "binary"
        });
        const first_sheet_name = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[first_sheet_name];
        const raw = utils.sheet_to_json(worksheet, {
            raw: true
        });

        resolve(raw);
    }

    reader.readAsArrayBuffer(blob);
})
