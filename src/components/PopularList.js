import React from 'react';
import PopularPoster from './PopularPoster';

const PopularList = ( props ) => {

    const { movies } = props;
    var sortedMovies = movies.sort( (a, b) => a.voteAverage > b.voteAverage ? -1 : 1 ).slice(0,5);

    return(
        <div className='container bgDots calcWidth'>
            <span className='grey title xl inline'>Movies: </span>
            <h2 className='inline'> Top 5</h2>
            <div className='row popularWrap'>
                { sortedMovies.map( movie => <PopularPoster movie={movie} key={movie.title} /> ) }
            </div>
        </div>
    );

}

export default PopularList;