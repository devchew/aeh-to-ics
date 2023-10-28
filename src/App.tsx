import React, { FC, useRef, useState } from 'react';
import { convertCalendarToICS, convertParsedToCalendar } from './helpers/calendar';
import { readXLSFile } from './helpers/xls';

export const App: FC = () => {

    const [downloadAvailable, setDownloadAvailable] = useState<boolean>(false);
    const downloadRef = useRef<HTMLAnchorElement>(null);

    const loadFile = (event: React.FormEvent<HTMLInputElement>) => {
        // @ts-ignore
        readXLSFile(event.target.files[0])
            .then(convertParsedToCalendar)
            .then(convertCalendarToICS)
            .then((data) => {
                if (!downloadRef.current) {
                    return;
                }
                const blob = new Blob([data], {type: 'text/ics'});
                downloadRef.current.href = URL.createObjectURL(blob);
                downloadRef.current.download = "calendar.ics";
            })
            .then(() => setDownloadAvailable(true))
    }

    return (
        <main>
            <h1>Load XLS file</h1>
            <input type="file" accept=".xls" onInput={loadFile}/>
            <a href="#" ref={downloadRef} hidden={!downloadAvailable}>Download</a>
        </main>
    );
}

export default App;
