import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HowToPlay, Main, Play } from './pages';

const routes = (
  <Router>
    <Switch>
      <Route path="/" component={Main} exact />
      <Route path="/play" component={Play} />
      <Route path="/how-to-play" component={HowToPlay} />
    </Switch>
  </Router>
);

export default routes;
