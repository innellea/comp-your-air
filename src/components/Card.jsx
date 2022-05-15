const Card = ({ location, lastUpdated, removeCallback }) => {
    return (
        <div>
            <button onClick={() => removeCallback(location)}>X</button>
            {location.city}
        </div>
    );
};

export default Card;
