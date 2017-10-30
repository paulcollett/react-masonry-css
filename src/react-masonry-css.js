import React from 'react';
import PropTypes from 'prop-types';

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

    // window may not be avaliable in some environments
    if(window) {
      window.addEventListener('resize', this.reCalculateColumnCount);
    }
  }

  componentWillReceiveProps() {
    this.reCalculateColumnCount();
  }

  componentWillUnmount() {
    if(window) {
      window.removeEventListener('resize', this.reCalculateColumnCount);
    }
  }

  reCalculateColumnCount() {
    const windowWidth = window && window.innerWidth || Infinity;
    let breakpointColsObject = this.props.breakpointCols;

    // Allow passing a single number instead of an object
    if(parseInt(breakpointColsObject) > 0) {
      breakpointColsObject = {
        default: breakpointColsObject
      }
    }

    let matchedBreakpoint = Infinity;
    let columns = breakpointColsObject.default || 2;

    for(let breakpoint in breakpointColsObject) {
      const optBreakpoint = parseInt(breakpoint);
      const isCurrentBreakpoint = optBreakpoint > 0 && windowWidth <= optBreakpoint;

      if(isCurrentBreakpoint && optBreakpoint < matchedBreakpoint) {
        matchedBreakpoint = optBreakpoint;
        columns = breakpointColsObject[breakpoint];
      }
    }

    columns = Math.max(1, parseInt(columns) || 1);

    if(this.state.columnCount !== columns) {
      this.setState({
        columnCount: columns
      });
    }
  }

  itemsInColumns() {
    const currentColumnCount = this.state.columnCount;
    const itemsInColumns = new Array(currentColumnCount);
    const items = this.props.children || [];
    const {itemStyle, itemClassName} = this.props;

    for (let i = 0; i < items.length; i++) {
      const columnIndex = i % currentColumnCount;

      if(!itemsInColumns[columnIndex]) {
        itemsInColumns[columnIndex] = [];
      }

      itemsInColumns[columnIndex].push(
        <div className={itemClassName} style={itemStyle}>
          {items[i]}
        </div>
      );
    }

    return itemsInColumns;
  }

  renderColumns() {
    const { column, columnClassName, gutter } = this.props;
    const childrenInColumns = this.itemsInColumns();
    const width = `${100 / childrenInColumns.length}%`;

    return childrenInColumns.map((items, i) => {
      return <div
        key={i}
        className={columnClassName}
        style={{
          width,
          borderLeft: `${gutter}px solid transparent`,
          backgroundClip: 'padding-box'
        }}
        {...column}
             >
        {items}
      </div>;
    });
  }

  render() {
    const {
      gutter,
      ...wrapperProps
    } = this.props;

    return (
      <div
        style={{
          display: 'flex',
          marginLeft: -gutter
        }}
        {...wrapperProps}
      >
        {this.renderColumns()}
      </div>
    );
  }
}

Masonry.propTypes = {
  breakpointCols: PropTypes.object,
  columnClassName: PropTypes.string,
  itemClassName: PropTypes.string,
  gutter: PropTypes.number,
  itemStyle: PropTypes.object
};

Masonry.defaultProps = {
  breakpointCols: {},
  className: 'my-masonry-grid',
  columnClassName: 'my-masonry-grid_column',
  itemClassName: 'my-masonry-grid_item',
  gutter: 30,
  itemStyle: {}
};

export default Masonry;
