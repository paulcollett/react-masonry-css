import React from "react";
import PropTypes from "prop-types";

class Masonry extends React.Component {
  constructor(props) {
    super(props);

    // Correct scope for when access externally
    this.reCalculateColumnCount = this.reCalculateColumnCount.bind(this);
    this.reCalculateColumnCountDebounce = this.reCalculateColumnCountDebounce.bind(
      this
    );

    // default state
    let columnCount;
    if (this.props.breakpointCols && this.props.breakpointCols.default) {
      columnCount = this.props.breakpointCols.default;
    } else {
      columnCount = 2;
    }

    this.state = {
      columnCount
    };
  }

  componentDidMount() {
    this.reCalculateColumnCount();

    // window may not be available in some environments
    if (window) {
      window.addEventListener("resize", this.reCalculateColumnCountDebounce);
    }
  }

  componentDidUpdate() {
    this.reCalculateColumnCount();
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener("resize", this.reCalculateColumnCountDebounce);
    }
  }

  reCalculateColumnCountDebounce() {
    if (!window || !window.requestAnimationFrame) {
      // IE10+
      this.reCalculateColumnCount();
      return;
    }

    if (window.cancelAnimationFrame) {
      // IE10+
      window.cancelAnimationFrame(this._lastRecalculateAnimationFrame);
    }

    this._lastRecalculateAnimationFrame = window.requestAnimationFrame(() => {
      this.reCalculateColumnCount();
    });
  }

  reCalculateColumnCount() {
    const windowWidth = (window && window.innerWidth) || Infinity;
    let breakpointColsObject = this.props.breakpointCols;

    // Allow passing a single number instead of an object
    if (parseInt(breakpointColsObject) > 0) {
      breakpointColsObject = {
        default: breakpointColsObject
      };
    }

    let matchedBreakpoint = Infinity;
    let columns = breakpointColsObject.default || 2;

    for (let breakpoint in breakpointColsObject) {
      const optBreakpoint = parseInt(breakpoint);
      const isCurrentBreakpoint =
        optBreakpoint > 0 && windowWidth <= optBreakpoint;

      if (isCurrentBreakpoint && optBreakpoint < matchedBreakpoint) {
        matchedBreakpoint = optBreakpoint;
        columns = breakpointColsObject[breakpoint];
      }
    }

    columns = Math.max(1, parseInt(columns) || 1);

    if (this.state.columnCount !== columns) {
      this.setState({
        columnCount: columns
      });
    }
  }

  itemsInColumns() {
    const currentColumnCount = this.state.columnCount;
    const itemsInColumns = new Array(currentColumnCount);
    const items = this.props.children || [];

    for (let i = 0; i < items.length; i++) {
      const columnIndex = i % currentColumnCount;

      if (!itemsInColumns[columnIndex]) {
        itemsInColumns[columnIndex] = [];
      }

      itemsInColumns[columnIndex].push(items[i]);
    }

    return itemsInColumns;
  }

  renderColumns() {
    const { column, columnClassName } = this.props;
    const childrenInColumns = this.itemsInColumns();
    const w = `${100 / childrenInColumns.length}%`;

    return childrenInColumns.map((items, i) => {
      return (
        <div
          key={i}
          className={columnClassName}
          style={{ width: w }}
          {...column}
        >
          {items}
        </div>
      );
    });
  }

  render() {
    const {
      breakpointCols,
      columnClassName,
      column,
      elRef,
      ...wrapperProps
    } = this.props;

    return (
      <div ref={elRef} {...wrapperProps}>
        {this.renderColumns()}
      </div>
    );
  }
}

Masonry.propTypes = {
  breakpointCols: PropTypes.object,
  columnClassName: PropTypes.string
};

Masonry.defaultProps = {
  breakpointCols: {},
  className: "my-masonry-grid",
  columnClassName: "my-masonry-grid_column"
};

export default Masonry;
