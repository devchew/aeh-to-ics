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
            <h2>Pobierz plik kalendarza z AEH</h2>
            <ul>
                <li>log in: <i>mojeaeh.vizja.pl</i></li>
                <li>"Dydaktyka" {">"} "Plan zajęć"</li>
                <li>"wydrukuj Kalendarz"</li>
                <li>"Drukuj XLS"</li>
            </ul>
            <h2>Wrzuć plik</h2>
            <input type="file" accept=".xls" onInput={loadFile} />
            <div hidden={!downloadAvailable}>
                <h2>Pobierz plik kalendarza</h2>
                <a href="#" ref={downloadRef} >Pobierz plik</a>

                <h2>Wrzuć go do kalendarza outlock'a</h2>
                <ul>
                    <li><a href="https://outlook.office.com/calendar/addcalendar" target="_blank">https://outlook.office.com/calendar/addcalendar</a></li>
                    <li>przekaż z pliki</li>
                    <li>zaimportuj wygenerowany plik</li>
                </ul>
            </div>
        </main>
    );
}

export default App;
