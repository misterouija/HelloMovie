const Hero = (props) => {
    return (
        <div
            className='text-center bg-image vh-100'
            style={{
                backgroundImage:
                    "url('https://cdn.pixabay.com/photo/2017/08/05/15/00/auditorium-2584269_960_720.jpg')",
            }}
        >
            <div
                className='mask'
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            >
                <div className='d-flex justify-content-center align-items-center h-100'>
                    <div className='text-white'>
                        <h1 className='mb-3'>Welcome to HelloMovie</h1>
                        <h4 className='mb-3'>A movie recommendation engine</h4>
                        <button
                            className='btn btn-secondary btn-lg rounded-pill heroButton'
                            type='button'
                            onClick={() => {
                                document
                                    .querySelector('input[name="search"]')
                                    .focus();
                                props.setShowHero(false);
                                props.setShowPop(true);
                            }}
                        >
                            Start discovering
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
