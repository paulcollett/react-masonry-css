import React from 'react'
import ReactDom from 'react-dom'
import Masonry from '../src/ReactMasonry'

// Placeholder library
import Dummy from 'dummyjs'

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

    const items = [];

    items.push(<div key="1">My First Item</div>);
    items.push(<div key="2">Second Baby</div>);

    return (
      <div>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
          >
          <div>{Dummy.text('20,60')}</div>
          <div>{Dummy.text('20,60')}</div>
          <div>{Dummy.text('20,60')}</div>
          <div>{Dummy.text('20,60')}</div>
          <div>{Dummy.text('20,60')}</div>
          <div>{Dummy.text('20,60')}</div>
          <div>{Dummy.text('20,60')}</div>
          <div>{Dummy.text('20,60')}</div>
        </Masonry>
        <h4>Masonry retaining width with few items</h4>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
          >
          <div>Item #1</div>
          <div>Item #2</div>
        </Masonry>
        <h4>Array Example</h4>
        <Masonry breakpointCols={breakpointColumnsObj}>
          {items.map(jsx => jsx)}
        </Masonry>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'))
