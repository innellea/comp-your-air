import { Combobox, Transition } from '@headlessui/react';
import { SearchIcon, SelectorIcon } from '@heroicons/react/solid';
import { Fragment, useState } from 'react';
import useRequest from '../hooks/useRequest';
import ClickAwayListener from 'react-click-away-listener';
import { baseUrl } from '../helpers/helpers';
const Search = ({ selectLocation }) => {
    const [selected, setSelected] = useState('');
    const [query, setQuery] = useState('');
    const [showResults, setShowResults] = useState(false);
    const cityArray =
        useRequest(`https://docs.openaq.org/v2/locations?limit=100&page=1&offset=0&sort=asc&country_id=GB&order_by=city
    `);
    const { data, isLoading, error } = useRequest(
        `${baseUrl}/locations?country=GB${query.length ? `&city=${query}` : ''}`
    );

    return (
        <ClickAwayListener onClickAway={() => setShowResults(false)}>
            <div className='relative'>
                <div className='relative z-20'>
                    <input
                        type='search'
                        value={selected}
                        placeholder='Enter city name'
                        autoComplete='off'
                        aria-busy={isLoading}
                        className='w-full px-4 py-3 pl-12 text-sm leading-5 border-2 border-gray-500 outline-none rounded-xl text-black-50'
                        onChange={(event) => {
                            setQuery(event.target.value);
                            setSelected(event.target.value);
                        }}
                        onFocus={() => setShowResults(true)}
                    />
                    <SearchIcon
                        className='absolute top-0 h-full text-gray-500 left-3 w-7'
                        aria-hidden='true'
                    />
                </div>
                <div>
                    {showResults && (
                        <div className='relative z-10 pt-8 pb-4 -mt-4 overflow-hidden rounded-xl bg-white-50'>
                            <div className='max-h-52 space-y-0.5 overflow-y-auto text-black-50'>
                                {data.results
                                    ? cityArray.data.results
                                          .filter(function (location) {
                                              if (
                                                  location.city
                                                      .toLowerCase()
                                                      .includes(
                                                          query.toLowerCase()
                                                      )
                                              ) {
                                                  //   console.log(
                                                  //       `filter:${location.city}`
                                                  //   );

                                                  return location.city
                                                      .toLowerCase()
                                                      .includes(
                                                          query.toLowerCase()
                                                      );
                                              } else return '';
                                          })
                                          .map((location) => (
                                              <button
                                                  key={location.id}
                                                  className='block w-full px-4 py-2 text-left truncate outbuttonne-none hover:bg-gray-50 focus:bg-gray-50'
                                                  aria-label={location.city}
                                                  onClick={() => {
                                                      selectLocation(location);
                                                      setShowResults(false);
                                                      setSelected('');
                                                  }}
                                                  onMouseEnter={() =>
                                                      setSelected(location.city)
                                                  }
                                                  onMouseLeave={() =>
                                                      setSelected('')
                                                  }
                                              >
                                                  {location.city}
                                              </button>
                                          ))
                                    : ''}

                                {!isLoading && !data?.results && (
                                    <p className='relative px-4 py-2 cursor-default select-none'>
                                        Nothing found.
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ClickAwayListener>
    );
};
export default Search;
