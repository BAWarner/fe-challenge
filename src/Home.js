import './Home.css';
import { useFetchAllMovies } from './rest';
import Header from 'components/Header';
import BrowseAll from 'components/BrowseAll';
import PopularList from 'components/PopularList';
import GenreList from 'components/GenreList';

/**
 * You have the option to use either REST
 * or GraphQL, whichever you prefer.
 *
 * Defaults to REST.
 *
 * Use `graphql/useAllMoviesQuery` instead for
 * GraphQL.
 **/
const Home = ( props ) => {
  const { data, loading } = useFetchAllMovies();
  
  var genreArr = [];
  data.forEach( movie => {
    movie.genres.forEach( genre => genreArr.indexOf(genre) === -1 ? genreArr.push( genre ) : '' )
  } );
  

  return (
    <>
      <Header />
      <div className="home-container">
        <PopularList movies={ data } />
        <GenreList genres={ genreArr }/>

        { loading ? (
          <div>Loading movies...</div>
          ) : (
            <div className='container mrg-top-30'>
              <div className='flex-100 row spaceBetween'>
                <BrowseAll movies={ data } />
              </div>
            </div>
        )}
      </div>
    </>
  );
};

export default Home;
