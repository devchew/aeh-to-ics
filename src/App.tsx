import React, { FC, useEffect, useRef, useState } from 'react';
import { convertCalendarToICS, convertParsedToCalendar } from './helpers/calendar';
import { readXLSFile } from './helpers/xls';
import { EventAttributes } from 'ics';
import Preview from './Preview';

export const App: FC = () => {
    const [downloadAvailable, setDownloadAvailable] = useState<boolean>(false);
    const downloadRef = useRef<HTMLAnchorElement>(null);
    const [events, setEvents] = useState<EventAttributes[]>([])

    const loadCalendar = (parsed: EventAttributes[]) =>
        Promise.resolve(parsed)
            .then(convertCalendarToICS)
            .then((data) => {
                if (!downloadRef.current) {
                    return;
                }
                const blob = new Blob([data], {type: 'text/ics'});
                downloadRef.current.href = URL.createObjectURL(blob);
                downloadRef.current.download = "events.ics";
            })
            .then(() => setDownloadAvailable(true))

    useEffect(() => {
        if (window.location.hash.slice(1) !== '') {
            try {
                const calendar = JSON.parse(decodeURIComponent(atob(window.location.hash.slice(1))));
                loadCalendar(calendar);
                setEvents(calendar)
                return;
            } catch (c) {console.log(c)}
        }

        const data = localStorage.getItem('calendar');
        if (data) {
            try {
                const calendar = JSON.parse(data);
                loadCalendar(calendar);
                setEvents(calendar)
                return;
            } catch (e) {console.log(e)}
        }

    }, []);

    const loadFile = (event: React.FormEvent<HTMLInputElement>) => {
        // @ts-ignore
        readXLSFile(event.target.files[0])
            .then(convertParsedToCalendar)
            .then((data) => {
                setEvents(data)
                const stringifyData = JSON.stringify(data);
                localStorage.setItem('calendar', stringifyData);
                window.location.hash = btoa(encodeURIComponent(stringifyData));
                return data;
            })
            .then(loadCalendar)
    }

    return (
        <main>
            <section style={{justifyContent: "space-between"}}>
                <div>
                    <h2>Pobierz plik kalendarza z AEH</h2>
                    <ul>
                        <li>log in: <i>mojeaeh.vizja.pl</i></li>
                        <li>"Dydaktyka" {">"} "Plan zajęć"</li>
                        <li>"wydrukuj Kalendarz"</li>
                        <li>"Drukuj XLS"</li>
                    </ul>
                    <h2>Wrzuć plik</h2>
                    <input type="file" accept=".xls" onInput={loadFile} />
                </div>
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
            </section>
            {events.length > 0 && <Preview events={events} />}
        </main>
    );
}

export default App;
