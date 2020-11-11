import React from 'react';
import { Provider } from 'react-redux';
import { makeStore } from './legacy/container/store';
import routes from './routes';
import "./legacy/styles/index.scss";
import "./legacy/styles/play.scss";
import "./legacy/styles/how-to-play.scss";
import "./legacy/styles/choose-mode.scss";
import "./legacy/styles/wait-for-opponent.scss";
import "./legacy/styles/strategies.scss";

function App() {
  const store = makeStore();
  return <Provider store={store}>{routes}</Provider>;
}

export default App;
