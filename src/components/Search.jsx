import { Combobox, Transition } from '@headlessui/react';
import { SearchIcon, SelectorIcon } from '@heroicons/react/solid';
import { Fragment, useState } from 'react';
import useRequest from '../hooks/useRequest';
export const url = 'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2';

const Search = ({ selectLocation }) => {
    const [selected, setSelected] = useState([]);
    const [query, setQuery] = useState('');

    /**
     * @description Provided design seems to limit results to GB location
     */
    const { data, isLoading, error } = useRequest(
        `${url}/cities?country=GB${
            query.length
                ? `&city=${query.charAt(0).toUpperCase() + query.slice(1)}`
                : ''
        }`,
        {
            fallback: []
        }
    );

    return (
        <Combobox value={selected} onChange={setSelected}>
            <div className='relative mt-1'>
                <div className='relative z-10 w-full overflow-hidden text-left border-2 border-gray-500 rounded-lg outline-none cursor-default bg-white-50 sm:text-sm'>
                    <Combobox.Input
                        className='w-full px-4 py-3 pl-10 text-sm leading-5 border-none rounded-lg outline-none text-black-50'
                        displayValue={(location) => location.city}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder='Enter city name'
                        autoComplete='off'
                    />
                    <Combobox.Button className='absolute inset-y-0 flex items-center pr-2 left-3'>
                        <SearchIcon
                            className='w-5 h-5 text-gray-500'
                            aria-hidden='true'
                        />
                    </Combobox.Button>
                </div>
                <div className='-mt-2 overflow-hidden rounded-md'>
                    <Transition
                        as={Fragment}
                        leave='transition ease-in duration-100'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className='relative z-0 w-full py-1 overflow-auto text-base shadow-lg max-h-60 bg-white-50 ring-1 ring-blue ring-opacity-5 focus:outline-none sm:text-sm'>
                            {data?.results && data.results.length ? (
                                data.results.map((location) => (
                                    <Combobox.Option
                                        key={location.city}
                                        className={({ active }) =>
                                            `relative block w-full  cursor-default select-none py-2 px-4 text-left text-black-50 hover:cursor-pointer ${
                                                active ? 'bg-gray-50' : ''
                                            }`
                                        }
                                        value={location.city}
                                        as='button'
                                        onClick={() => selectLocation(location)}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        selected
                                                            ? 'font-medium'
                                                            : 'font-normal'
                                                    }`}
                                                >
                                                    {location.city}
                                                </span>
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            ) : (
                                <div className='relative px-4 py-2 cursor-default select-none text-black-50'>
                                    Nothing found.
                                </div>
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </div>
        </Combobox>
    );
};

export default Search;
