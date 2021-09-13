import React, { Component } from 'react';
import axios from 'axios';
import MoviePoster from 'components/MoviePoster';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import backArrow from '../assets/BackArrow.svg';

class SingleGenre extends Component{
    constructor(){
        super();
        this.state = {
            genreTitle: '',
            moviesByGenre: [],
            loading: true

        }
        this.sortMovies = this.sortMovies.bind(this);

    }
    componentDidMount(){
        axios
        .get('http://localhost:2020/api/movies/')
        .then( res => {
            let { moviesByGenre, genreTitle } = this.state,
                { data } = res;
            if( genreTitle === 'Tv Movie' ){
                genreTitle = 'TV Movie';
            }
            moviesByGenre = data.reduce(
                ( filtered, movie ) => {

                    if( movie.genres.includes(genreTitle) ){
                        filtered.push(movie);
                    }
                    return filtered;
                },
                []
            );
            this.setState({
                ...this.state,
                loading: false,
                moviesByGenre
            });
            
        } )
        .catch( err => console.error('SingleGenre ', err) );

        let { title } = this.props.match.params;

        var genreTitle = [];
        title
            .split('-')
            .forEach( word => { var pushWord = word.charAt(0).toUpperCase() + word.substring(1); genreTitle.push( pushWord ) } );
    
        genreTitle = genreTitle.join(' ');

        this.setState({ ...this.state, genreTitle })
        
    }
    sortMovies( sort ){
        let { moviesByGenre } = this.state;
        if( sort === 'voteAverage' ){
            moviesByGenre = moviesByGenre.sort( ( a, b ) => a[sort] < b[sort] ? 1 : -1 );
        }else if( sort === 'releaseDate' ){
            moviesByGenre = moviesByGenre.sort( ( a, b ) => {
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
            moviesByGenre = moviesByGenre.sort( ( a, b ) => {
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
            moviesByGenre = moviesByGenre.sort( ( a, b ) => a[sort] > b[sort] ? 1 : -1 );
        }
        this.setState({ moviesByGenre })
    }
    render(){
        let { genreTitle, moviesByGenre, loading } = this.state;
        const filterOptions = [
            { value: 'voteAverage', label: 'Popularity' },
            { value: 'title', label: 'Alphabetical' },
            { value: 'releaseDate', label: 'Release Date (Old to New)' },
            { value: 'newDate', label: 'Release Date (New to Old)' }
        ];
        return(
            <div className='container bgDots'>
                <div className='row'>
                    <div className='flex-50'>
                        <Link to='#' onClick={ this.props.history.goBack }>
                            <img src={backArrow} alt='Back'/>
                        </Link>
                        <span className='grey inline'>Movies:</span>
                        <h2 className='mrg-left-10 inline'>{ genreTitle }</h2>
                    </div>
                    <div className='flex-50'>
                        <span className='grey inline'>Sort By:</span>
                        <Select className='inline selectStyles' options={ filterOptions } onChange={ e => this.sortMovies( e.value ) } />
                    </div>
                </div>
                {
                    loading ? (
                        <span>Loading Movies...</span>
                    ) : (
                        <div className='row browseWrap mrg-top-60'>
                            {
                                moviesByGenre.map( movie => <MoviePoster movie={movie} key={movie.id} /> ) 
                            }
                        </div>
                    )
                }
            </div>
        );
    }
}

export default SingleGenre;