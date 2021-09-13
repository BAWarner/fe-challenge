import React from 'react';
import { Link } from 'react-router-dom';

const MoviePoster = ( props ) => {
    let { posterPath, title, id } = props.movie;
    return(
        <>
            <Link to={{ pathname: `/movie/${id}` }}>
                <img src={ posterPath } alt={ title } className='moviePoster'/>
            </Link>
        </>
    );

}

export default MoviePoster;