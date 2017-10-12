'use strict'

const React = require('react')
const ReactDom = require('react-dom')
const Masonry = require('../lib/ReactMasonry')
//import {Masonry} from '../lib-es5/ReactMasonry'

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {};
  }

  render () {
    var breakpointCols = [
      [1, '(max-width: 500px)'],
      [2, '(max-width: 700px)'],
      [3, '(max-width: 1100px)'],
      [4, '(min-width: 1101px)'],
    ];

    return (
      <div>
        <Masonry
          breakpointCols={breakpointCols}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          <div>Item #1z</div>
          <div>Item #2</div>
        </Masonry>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'))
