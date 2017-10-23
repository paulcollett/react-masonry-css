import React from 'react'
import ReactDom from 'react-dom'
import Masonry from '../src/react-masonry-css'

// Placeholder text library
import Dummy from 'dummyjs'

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {};
  }

  render () {
    const breakpointColumnsObj = {
      default: 4,
      1100: 3,
      700: 2,
      500: 1
    };

    const items = new Array(8).fill().map((item, i) => {
      return (
        <div key={i}>
          <strong>Item #{i + 1}</strong>
          <div>{Dummy.text('20,60')}</div>
        </div>
      )
    });

    return (
      <div>
        <button onClick={this.forceUpdate.bind(this, null)}>Refresh</button>
        <hr style={{visibility: 'hidden'}} />
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {items}
        </Masonry>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'))
