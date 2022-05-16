import useRequest from '../hooks/useRequest';
import { baseUrl } from '../helpers/helpers';
import TimeAgo from 'javascript-time-ago';
import React from 'react';
import ReactTimeAgo from 'react-time-ago';
import en from 'javascript-time-ago/locale/en.json';
TimeAgo.addDefaultLocale(en);

const Card = ({ location, removeCallback }) => {
    const { data } = useRequest(
        `${baseUrl}/countries?country_id=${location.country}`
    );

    const timeAgo = <ReactTimeAgo date={location.lastUpdated} />;
    return (
        <div className='relative p-6 rounded-xl bg-white-50 text-black-100'>
            <button
                onClick={() => removeCallback(location)}
                className='absolute top-3 right-3'
            >
                {/* <XIcon className="w-8 h-8 text-black-50" aria-hidden="true" /> */}
            </button>
            <span className='block text-sm font-medium tracking-wide uppercase'>
                Updated {timeAgo}
            </span>
            <h2 className='block mt-2 text-xl font-semibold text-purple xl:mt-1'>
                {location.name}
            </h2>
            <h3 className='mt-2'>
                in {location.city}
                {!!data?.results && `, ${data.results[0].name}`}
            </h3>
            <span className='block mt-2 font-semibold'>
                Values:{' '}
                {location.parameters.map((p, i) => (
                    <span key={p.id}>
                        {p.displayName}: {Math.round(p.average)}
                        {i !== location.parameters.length - 1 && ', '}
                    </span>
                ))}
            </span>
        </div>
    );
};

export default Card;
