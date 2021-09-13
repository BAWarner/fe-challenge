import React, { Component } from 'react';
import CastMember from './CastMember';
import { Link } from 'react-router-dom';
import backArrow from '../assets/BackArrow.svg';
import starRating from '../assets/Star.svg';
import axios from 'axios';

class SingleMovie extends Component{
    constructor(){
        super();
        this.state = {
            id: null,
            title: '',
            director: {
                name: '',
                profilePath: ''
            },
            genres: [],
            overview: '',
            posterPath: '',
            cast: [],
            voteAverage: null,
            releaseDate: ''
        }
    }
    componentDidMount(){
        let { id: movieID } = this.props.match.params;
        axios
        .get( `http://localhost:2020/api/movies/${movieID}` )
        .then( res => {
            let {
                id, title, director,
                genres, overview,
                posterPath, cast,
                voteAverage, releaseDate
            } = res.data;
            this.setState({
                id, title, director,
                genres, overview,
                posterPath, cast,
                voteAverage, releaseDate
            })
        } )
        .catch( err => console.error( 'SingleMovie ', err ) );
    }

    render(){
        let { title, director, genres, overview, posterPath, cast, voteAverage, releaseDate } = this.state;
        let { goBack } = this.props.history;
        return(
            <>
                <div className='container'>
                    <Link to='#' onClick={ goBack }>
                        <img src={backArrow} alt='Back'/>
                    </Link>
                </div>
                <div className='singleMovie bgDots'>
                    <div className='row container'>
                        <div className='leftColumn'>
                            <img src={ posterPath } alt={ title } className='moviePoster' />
                        </div>
                        <div className='rightColumn'>
                            <div className='ratings mrg-btm-25'>
                                <img src={starRating} alt='Star Rating'/>
                                <span className='blue'>{ voteAverage }</span><span className='grey small'>/10</span>
                            </div>
                            <h1 className='movieTitle'>{title} </h1>
                            <span className='grey releaseYear'>{ `(${releaseDate.split('-')[0]})` }</span>
                            {
                                genres ?
                                (
                                    <span className='genreList'>{ genres.join(', ') }</span>
                                )
                                : null
                            }
                            <div className='mrg-top-60'>
                                { director ? (
                                    <span className='mrg-btm-15 block director'>Director: {director.name}</span>
                                ) : null }
                                <p>{ overview }</p>
                            </div>
                        </div>
                        <div className='row flex-100 mrg-top-60'>
                            { cast ? (
                                <>
                                <h3>Cast</h3>
                                { cast.map( castMember => <CastMember cast={ castMember } key={ castMember.name } /> ) }
                                </>
                            ) : null }
                        </div>
                    </div>
                </div>
            </>
        );
    }



}

export default SingleMovie;