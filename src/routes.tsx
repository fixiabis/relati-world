import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Main, Play } from './pages';
import LegacyHowToPlay from './legacy/pages/how-to-play';
import LegacyChooseMode from './legacy/pages/choose-mode';

const routes = (
  <Router>
    <Switch>
      <Route path="/" component={Main} exact />
      <Route path="/play" component={Play} />
      <Route path="/how-to-play" component={LegacyHowToPlay} />
      <Route path="/choose-mode" component={LegacyChooseMode} />
    </Switch>
  </Router>
);

export default routes;
