import 'babel-polyfill';
import React, { Component } from 'react';
import { render } from 'react-dom';

interface Props {}

class App extends Component<Props, object> {
   render(): JSX.Element {
      return (
          <div>Hello Word!!</div>
      )
   }
}


render(
    <App />,
    document.getElementById('root')
);
