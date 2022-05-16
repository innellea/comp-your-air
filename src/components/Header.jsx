export const Header = () => {
    return (
        <div>
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
        </div>
    );
};
