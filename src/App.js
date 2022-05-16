import React, { useState, useEffect, useCallback } from 'react';
import Card from './components/Card';
import Search from './components/Search';

function App() {
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
        <section className='container h-screen px-8 mx-auto mt-16 xl:mt-24'>
            <h1 className='mx-auto text-3xl font-semibold text-center w-fit xl:text-5xl'>
                Compare your Air
            </h1>
            <article className='mt-8 space-y-3 lg:space-y-2'>
                <p className='mx-auto text-xl leading-snug text-center w-fit lg:text-2xl'>
                    Compare the air quality between cities in the UK.
                </p>
                <p className='mx-auto text-xl leading-snug text-center w-fit lg:text-2xl'>
                    Select cities to compare using the search tool below.
                </p>
            </article>

            <div className='mx-auto mt-12 lg:w-5/12'>
                <Search selectLocation={add} />
            </div>

            {!!selectedLocations.length && (
                <div className='grid gap-4 mt-10 lg:mt-24 lg:grid-cols-2 xl:mx-36 xl:gap-16'>
                    {selectedLocations.map((location) => (
                        <Card
                            key={location.id}
                            location={location}
                            removeCallback={remove}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default App;
