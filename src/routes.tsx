import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HowToPlay, Main, Play } from './pages';
import LegacyMain from './legacy/pages/index';
import LegacyPlay from './legacy/pages/play';
import LegacyStrategies from './legacy/pages/strategies';
import LegacyHowToPlay from './legacy/pages/how-to-play';
import LegacyChooseMode from './legacy/pages/choose-mode';

const routes = (
  <Router>
    <Switch>
      <Route path="/" component={Main} exact />
      <Route path="/play" component={Play} />
      <Route path="/how-to-play" component={HowToPlay} />
      <Route path="/legacy" component={LegacyMain} exact />
      <Route path="/legacy/play" component={LegacyPlay} />
      <Route path="/legacy/strategies" component={LegacyStrategies} />
      <Route path="/legacy/how-to-play" component={LegacyHowToPlay} />
      <Route path="/legacy/choose-mode" component={LegacyChooseMode} />
    </Switch>
  </Router>
);

export default routes;
