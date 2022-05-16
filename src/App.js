import React, { useState, useCallback } from 'react';
import Card from './components/Card';
import Search from './components/Search';
import { Header } from './components/Header';
function App() {
    const [selectedLocations, setSelectedLocations] = useState([]);

    const addLocation = useCallback(
        (location) => setSelectedLocations([...selectedLocations, location]),
        [selectedLocations]
    );
    const removeLocation = useCallback(
        (location) =>
            setSelectedLocations(
                selectedLocations.filter((i) => i !== location)
            ),
        [selectedLocations]
    );

    return (
        <section className='container h-screen px-8 mx-auto mt-16 text-white-50 xl:mt-24'>
            <Header />
            <Search selectLocation={addLocation} />
            {selectedLocations.length>0 && (
                <div className='grid gap-4 mt-10 lg:mt-24 lg:grid-cols-2 xl:mx-36 xl:gap-16'>
                    {selectedLocations.map((location) => (
                        <Card
                            key={location.id}
                            location={location}
                            removeCallback={removeLocation}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default App;
