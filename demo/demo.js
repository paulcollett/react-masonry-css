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

    var heights = [100, 500, 300, 100, 200, 500, 300, 200, 100, 100];

    return (
      <div>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          heights={heights}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {(heights)
            ? heights
              .map((h, i) => {
                return <div 
                  style={{ height: h }}
                  key={`${i}-${h}`}
                >
                  {i}. {h}
                </div>
              })
            : [
              <div key={'0'}>Item #1</div>,
              <div key={'1'}>Item #2</div>,
            ]
          }
        </Masonry>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'))
