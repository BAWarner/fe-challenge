import { Link } from 'react-router-dom';
import { useState } from 'react';
import arrow from '../assets/BackArrow.svg';

const GenreList = ( props ) => {
    let { genres } = props;
    const [ slidePos, updatePos ] = useState(0);
    const maxPos = ( ( genres.length -4 ) * 328 );

    return(
        <div className='genreWrap'>
            <div className='row'>
                <span className='h4 grey'>Browse</span>
                <h2>by Genre</h2>
                <div className='genreCarousel' style={{ left: slidePos }}>
                    {
                        genres.map( genre => {
                                let cleanGenre = genre.toLowerCase().split(' ').join('-');
                                return (
                                    <div className='genreBox'>
                                        <Link to={{ pathname: `/genre/${cleanGenre}` }}>
                                            <span>{ genre }</span>
                                        </Link>
                                    </div>
                                )
                            }

                        )
                    }
                </div>
                <div className='mrg-top-60 carouselArrows'>
                    <button className='arrowButton' onClick={ () => slidePos < 0 ? updatePos( slidePos + 328 ) : '' }>
                        <img src={arrow} alt='Previous Arrow' />
                    </button>
                    <button className='arrowButton' onClick={ () => slidePos > -maxPos ? updatePos( slidePos - 328 ) : '' }>
                        <img src={arrow} alt='Next Arrow' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GenreList;