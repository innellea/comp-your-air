import React from 'react';
import ReactTimeAgo from 'react-time-ago';
import { trimString } from '../helpers/helpers';

const Card = ({ location, removeCallback }) => {
    const timeAgo = <ReactTimeAgo date={location.lastUpdated} />;
    return (
        <div className='relative p-6 rounded-xl bg-white-50 text-black-100'>
            <button
                onClick={() => removeCallback(location)}
                className='absolute top-3 right-3'
            >
                X
            </button>

            <span className='block text-sm font-medium tracking-wide uppercase'>
                Updated {timeAgo}
            </span>
            <h2 className='block mt-2 text-xl font-semibold text-purple xl:mt-1'>
                {location.name}
            </h2>
            <h3 className='mt-2'>in {location.city}</h3>
            <span className='block mt-2 font-semibold'>
                Values:{' '}
                {location.parameters.map((parameter, i) => (
                    <span key={parameter.id}>
                        {trimString(parameter.displayName, 3)} :{' '}
                        {parameter.lastValue}
                        {parameter.unit}
                        {i !== location.parameters.length - 1 && ', '}
                    </span>
                ))}
            </span>
        </div>
    );
};

export default Card;
