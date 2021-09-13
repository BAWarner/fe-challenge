import React, { Component } from 'react';
import MoviePoster from './MoviePoster';
import Select from 'react-select';

class BrowseAll extends Component{

    constructor(){
        super();
        this.state = {
            allMovies: []
        }
        this.sortMovies = this.sortMovies.bind(this);
    }
    sortMovies( sort ){
        let { allMovies } = this.state;
        if( sort === 'voteAverage' ){
            allMovies = allMovies.sort( ( a, b ) => a[sort] < b[sort] ? 1 : -1 );
        }else if( sort === 'releaseDate' ){
            allMovies = allMovies.sort( ( a, b ) => {
                var aDate = new Date( a.releaseDate ),
                    bDate = new Date( b.releaseDate ),
                    comparison = 0;
                if( aDate > bDate ){
                    comparison = 1
                }else if( aDate < bDate ){
                    comparison = -1
                }
                return comparison
            });
        }else if( sort === 'newDate' ){
            allMovies = allMovies.sort( ( a, b ) => {
                var aDate = new Date( a.releaseDate ),
                    bDate = new Date( b.releaseDate ),
                    comparison = 0;
                if( aDate < bDate ){
                    comparison = 1
                }else if( aDate > bDate ){
                    comparison = -1
                }
                return comparison
            });
        }else{
            allMovies = allMovies.sort( ( a, b ) => a[sort] > b[sort] ? 1 : -1 );
        }
        this.setState({ allMovies })
    }
    componentDidMount(){
        let { movies: allMovies } = this.props;
        this.setState({ allMovies });
        console.log(  allMovies )
    }
    render() {
        const filterOptions = [
            { value: 'voteAverage', label: 'Popularity' },
            { value: 'title', label: 'Alphabetical' },
            { value: 'releaseDate', label: 'Release Date (Old to New)' },
            { value: 'newDate', label: 'Release Date (New to Old)' }
        ];
        let { allMovies } = this.state;
        return (
            <>
                <div className='flex-50'>
                    <span className='grey'>Movies</span>
                    <h2>Browse All</h2>
                </div>
                <div className='flex-50'>    
                    <span className='grey inline'>Sort By:</span>
                    <Select className='inline selectStyles' options={ filterOptions } onChange={ e => this.sortMovies( e.value ) }/>
                </div>
                <div className='row browseWrap'>
                    {
                        allMovies
                        .map( movie => <MoviePoster movie={ movie } key={ movie.id } /> ) 
                    }
                </div>
            </>
        )
    }

}

export default BrowseAll;