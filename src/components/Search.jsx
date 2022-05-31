import { SearchIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import useRequest from '../hooks/useRequest';
import ClickAwayListener from 'react-click-away-listener';
import { baseUrl } from '../helpers/helpers';
const Search = ({ selectLocation }) => {
  const [selected, setSelected] = useState('');
  const [input, setInput] = useState('');
  const [results, setResults] = useState(false);
  const cityArray =
    useRequest(`https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com//v2/locations?limit=200&page=1&offset=0&sort=asc&country_id=GB&order_by=city
    `);
  const { data, isLoading, error } = useRequest(
    `${baseUrl}/locations?country=GB${input.length ? `&city=${input}` : ''}`
  );

  return (
    <div className='mx-auto mt-12 lg:w-5/12'>
      <div className='relative'>
        <div className='relative z-20'>
          <input
            type='search'
            value={selected}
            placeholder='Enter city name'
            autoComplete='off'
            aria-busy={isLoading}
            className='w-full px-4 py-3 pl-12 text-sm leading-5 border-2 border-gray-500 outline-none rounded-xl text-black-100'
            onChange={(event) => {
              setInput(event.target.value);
              setSelected(event.target.value);
            }}
            onFocus={() => setResults(true)}
          />
          <SearchIcon
            className='absolute top-0 h-full text-black-100 left-3 w-7'
            aria-hidden='true'
          />
        </div>

        {results && (
          <div className='relative z-10 pt-8 pb-4 -mt-4 overflow-hidden rounded-xl bg-white-50'>
            <div className='max-h-52 space-y-0.5 overflow-y-auto text-black-100'>
              {data.results
                ? cityArray.data.results
                    .filter(function (location) {
                      if (
                        location.city
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      ) {
                        return location.city
                          .toLowerCase()
                          .includes(input.toLowerCase());
                      } else return '';
                    })
                    .map((location) => (
                      <button
                        key={location.id}
                        className='block w-full px-4 py-2 text-left truncate outbuttonne-none hover:bg-gray-50 focus:bg-gray-50'
                        aria-label={location.city}
                        onClick={() => {
                          selectLocation(location);
                          setResults(false);
                          setSelected('');
                        }}
                        onMouseEnter={() => setSelected(location.city)}
                        onMouseLeave={() => setSelected('')}
                      >
                        {location.city}
                      </button>
                    ))
                : ''}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Search;
