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
          <div>Item #3<br />kajsdhf lkasdhf laksjdfh<br />kajsdhf lkasdhf laksjdfh</div>
          <div>Item #4<br />kajsdhf lkasdhf laksjdfh</div>
          <div>Item #5</div>
          <div>Item #6</div>
          <div>Item #7</div>
          <div>Item #8 kajsdhf lkasdhf laksjdfh lkasjhdfklashf lkajshfdlkasjhfklashflkashdfkljashfdkljahsdklfhalskdfjhaslkjdfhjsakdhf</div>
          <div>Item #9 <br />kajsdhf lkasdhf laksjdfh</div>
          <div>Item #10</div>
          <div>Item #11</div>
          <div>Item #12</div>
          <div>Item #13</div>
        </Masonry>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'))