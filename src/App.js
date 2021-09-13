import Home from './Home';
import { Route, Switch } from 'react-router-dom';
import SingleMovie from 'components/SingleMovie';
import SingleGenre from 'components/SingleGenre';

/**
 * This function is used to simulate performance benchmarking.
 *
 * Should you choose to complete this step, this
 * function should be called only on first page load.
 **/
export const trackInitialLoad = () => {
  console.log('First page load');
};

/**
 * This function is used to simulate performance benchmarking.
 *
 * Should you choose to complete this step, this
 * function should be called only once the page has completely
 * loaded.
 **/
export const trackPageCompletedLoading = () => {
  console.log('Page done loading');
};

const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/movie/:id" component={SingleMovie} />
      <Route path="/genre/:title" component={SingleGenre} />
    </Switch>
  );
};

export default App;
