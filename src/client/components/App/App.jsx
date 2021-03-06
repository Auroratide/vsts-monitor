import React from 'react';
import Pipeline from '../Pipeline';
import Login from '../Login';

import './style';

const App = () => <Login>
  <Pipeline definitionId='1645' />
  <Pipeline definitionId='1648' />
  <Pipeline definitionId='2013' />
</Login>;

export default App;
