import React from 'react'
import ReactDom from 'react-dom'
import Masonry from '../dist/react-masonry-css.cjs'

// Placeholder text library
import Dummy from 'dummyjs'

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      breakpointColumnsObj: {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
      }
    };
  }

  handleChange() {
    // Previously changed? Revert back to initial state
    if(this.initialState) {
      this.setState(this.initialState);

      delete this.initialState;

    // Capture initial state and update
    } else {
      this.initialState = this.state;

      this.setState({
        breakpointColumnsObj: {
          default: 5,
          1100: 4,
          700: 3,
          500: 2
        }
      });
    }
  }

  render () {
    const breakpointColumnsObj = this.state.breakpointColumnsObj;

    const items = new Array(8).fill().map((item, i) => {
      return (
        <div key={i}>
          <strong>Item #{i + 1}</strong>
          <div><img src={Dummy.src(500,400)} style={{width:'100%'}} /></div>
          <div>{Dummy.text('20,60')}</div>
        </div>
      )
    });

    return (
      <div>
        <button onClick={() => this.forceUpdate()}>Refresh</button>
        {' '}
        <button onClick={() => this.handleChange()}>Change "breakpointCols"</button>
        <hr style={{visibility: 'hidden'}} />
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
          columnAttrs={{ className: 'should be overridden', 'data-test': '', style: { '--test': 'test' }}}
        >
          {items}
        </Masonry>
        <div style={{marginTop: '60px',color:'#555'}}>Placeholder images and dummy text from "dummyjs" react module. See <a href="http://dummyjs.com" target="_blank">DummyJs.com</a></div>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'))
