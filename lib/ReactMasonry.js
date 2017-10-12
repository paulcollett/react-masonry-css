import React from 'react';
import PropTypes from 'prop-types';


const getIndexOfLowestValue = (list) => {
  return list.reduce(
    (acc, val, i) => {
      return (val < acc.value)
        ? { index: i, value: val }
        : acc;
    },
    { index: 0, value: Infinity }
  ).index;
};


const propTypes = {
  breakpointCols: PropTypes.object,
  columnClassName: PropTypes.string,
  heights: PropTypes.array,
};

const defaultProps = {
  breakpointCols: {},
  columnClassName: null,
  heights: null,
};


//export default class Masonry extends React.Component {

class Masonry extends React.Component {
  constructor(props) {
    super(props);

    this.reCalculateColumnCount = this.reCalculateColumnCount.bind(this);

    // default state
    this.state = {
      columnCount: 2
    };
  }

  componentDidMount() {
    this.reCalculateColumnCount();

    window.addEventListener('resize', this.reCalculateColumnCount);
  }

  componentWillReceiveProps() {
    this.reCalculateColumnCount();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.reCalculateColumnCount);
  }

  reCalculateColumnCount() {
    const windowWidth = (window ? window.innerWidth : null) || Infinity;
    const breakpointColsObject = this.props.breakpointCols || {};
    let matchedBreakpoint = Infinity;
    let columns = Math.max(1, breakpointColsObject.default || 2);

    for(let breakpoint in breakpointColsObject) {
      const optBreakpoint = parseInt(breakpoint);
      const isMaybeCurrentBreakpoint = windowWidth <= optBreakpoint && optBreakpoint < matchedBreakpoint;

      if(optBreakpoint > 0 && isMaybeCurrentBreakpoint) {
        matchedBreakpoint = optBreakpoint;
        columns = Math.max(1, breakpointColsObject[breakpoint]);
      }
    }

    if(columns !== this.state.columnCount) {
      this.setState({
        columnCount: columns
      });
    }
  }

  itemsInColumns() {
    const { columnCount } = this.state;
    const itemsInColumns = new Array(columnCount);
    const items = this.props.children || [];

    // optional prop: list of item heights
    const { heights } = this.props;

    // keep track of current column height
    let currentColHeights = new Array(columnCount);
    currentColHeights.fill(0);

    for (let i = 0; i < items.length; i++) {
      let columnIndex = i % columnCount;
      if (heights) {
        columnIndex = getIndexOfLowestValue(currentColHeights);
        currentColHeights[columnIndex] += heights[i];
      }

      if(!itemsInColumns[columnIndex]) {
        itemsInColumns[columnIndex] = [];
      }

      itemsInColumns[columnIndex].push(items[i]);
    }

    return itemsInColumns;
  }

  renderColumns() {
    const childrenInColumns = this.itemsInColumns();

    return childrenInColumns.map((items, columnIdx) => {
      return (
        <div
          key={columnIdx}
          className={this.props.columnClassName || 'my-masonry-grid_column'}
          style={{width: (100 / childrenInColumns.length) + '%'}}
          {...this.props.column}
        >
          {items}
        </div>
      );
    });
  }

  render() {
    const { breakpointCols, columnClassName, column, heights, ...wrapperProps } = this.props;

    return (
      <div
        className="my-masonry-grid"
        {...wrapperProps}
      >
        {this.renderColumns()}
      </div>
    );
  }
}

Masonry.propTypes = propTypes;
Masonry.defaultProps = defaultProps;
module.exports = Masonry;

