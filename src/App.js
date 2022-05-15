import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import Card from './components/Card';
import Search from './components/Search';
import './styles/globals.css';

const fetcher = (url) => fetch(url).then((response) => response.json());

function App({ Component, pageProps }) {
    const [selectedLocations, setSelectedLocations] = useState([]);

    const add = useCallback(
        (location) => setSelectedLocations([...selectedLocations, location]),
        [selectedLocations]
    );

    const remove = useCallback(
        (location) =>
            setSelectedLocations(
                selectedLocations.filter((l) => l !== location)
            ),
        [selectedLocations]
    );

    return (
        <>
            <div className='container px-8 mx-auto mt-16 space-y-8 xl:mt-24 xl:space-y-12'>
                <h1 className='mx-auto text-3xl font-semibold text-center w-fit xl:text-5xl'>
                    Compare your Air
                </h1>
                <article className='space-y-3 lg:space-y-2'>
                    <p className='mx-auto text-xl leading-snug text-center w-fit lg:text-2xl'>
                        Compare the air quality between cities in the UK.
                    </p>
                    <p className='mx-auto text-xl leading-snug text-center w-fit lg:text-2xl'>
                        Select cities to compare using the search tool below.
                    </p>
                </article>

                <div className='mx-auto lg:w-5/12'>
                    <Search selectLocation={add} />
                </div>

                {selectedLocations.map((location) => (
                    <Card
                        key={location.city}
                        location={location}
                        lastUpdated={new Date()}
                        removeCallback={remove}
                    />
                ))}
            </div>
        </>
    );
}

export default App;
