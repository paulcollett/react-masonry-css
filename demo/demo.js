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
    var breakpointColumnsObj = {
      default: 4,
      1100: 3,
      700: 2,
      500: 1
    };

    return (
      <div>
        <Masonry
          breakpointCols={breakpointColumnsObj}
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
