import React, { Component } from 'react';
import starRating from '../assets/Star.svg';
import { Link } from 'react-router-dom';

class MoviePoster extends Component{
    constructor(){
        super();
        this.state = {
            posterPath: '',
            title: '',
            voteAverage: null,
            id: null,
            genres: [],
            lightbox: false
        }
        this.toggleLightbox = this.toggleLightbox.bind(this);
    }
    toggleLightbox(){
        this.setState({ lightbox: !this.state.lightbox });
    }
    componentDidMount(){
        let { posterPath, title, id, voteAverage, genres } = this.props.movie;
        this.setState({ posterPath, title, id, voteAverage, genres });
    }
    render(){
        let { posterPath, title, id, lightbox, voteAverage, genres } = this.state;
        return(
            <>
                <img onClick={ this.toggleLightbox } src={ posterPath } alt={ title } className='moviePoster'/>
                {
                    lightbox 
                    ? (
                        <div className='posterLightbox'>
                            <div className='posterWrap'>
                                <span className='closeLightbox' onClick={this.toggleLightbox}>&times;</span>
                                <Link to={{ pathname: `/movie/${id}` }}>
                                    <img src={ posterPath } alt={ title } className='moviePoster'/>
                                </Link>
                                <span className='movieTitle'>{ title }</span>
                                <span className='userRating blue'>
                                    <img src={starRating} alt='Star Rating'/>{ voteAverage }
                                </span>
                                <span className='genreList grey'>{ genres.join(', ') }</span>
                                <Link to={{ pathname: `/movie/${id}` }}>
                                    <button>View Details</button>
                                </Link>
                            </div>
                        </div>
                    )
                    : null
                }
            </>
        );
    }

}

export default MoviePoster;