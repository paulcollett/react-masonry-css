import React from 'react';

const defaultProps = {
  breakpointCols: undefined, // optional, number or object { default: number, [key: number]: number }
  className: undefined, // required, string
  columnClassName: undefined, // required, string

  // Any React children. Typically an array of JSX items
  children: undefined,

  // Custom attributes, however it is advised against
  // using these to prevent unintended issues and future conflicts
  // ...any other attribute, will be added to the container
  columnAttrs: undefined, // object, added to the columns

  // Deprecated props
  // The column property is deprecated.
  // It is an alias of the `columnAttrs` property
  column: undefined
};

const DEFAULT_COLUMNS = 2;

class Masonry extends React.Component {
  constructor(props) {
    super(props);

    // Correct scope for when methods are accessed externally
    this.reCalculateColumnCount = this.reCalculateColumnCount.bind(this);
    this.reCalculateColumnCountDebounce = this.reCalculateColumnCountDebounce.bind(this);

    // default state
    let columnCount
    if (this.props.breakpointCols && this.props.breakpointCols.default) {
      columnCount = this.props.breakpointCols.default
    } else {
      columnCount = parseInt(this.props.breakpointCols) || DEFAULT_COLUMNS
    }

    this.state = {
      columnCount
    };
  }

  componentDidMount() {
    this.reCalculateColumnCount();

    // window may not be available in some environments
    if(window) {
      window.addEventListener('resize', this.reCalculateColumnCountDebounce);
    }
  }

  componentDidUpdate() {
    this.reCalculateColumnCount();
  }

  componentWillUnmount() {
    if(window) {
      window.removeEventListener('resize', this.reCalculateColumnCountDebounce);
    }
  }

  reCalculateColumnCountDebounce() {
    if(!window || !window.requestAnimationFrame) {  // IE10+
      this.reCalculateColumnCount();
      return;
    }

    if(window.cancelAnimationFrame) { // IE10+
      window.cancelAnimationFrame(this._lastRecalculateAnimationFrame);
    }

    this._lastRecalculateAnimationFrame = window.requestAnimationFrame(() => {
      this.reCalculateColumnCount();
    });
  }

  reCalculateColumnCount() {
    const windowWidth = window && window.innerWidth || Infinity;
    let breakpointColsObject = this.props.breakpointCols;

    // Allow passing a single number to `breakpointCols` instead of an object
    if(typeof breakpointColsObject !== 'object') {
      breakpointColsObject = {
        default: parseInt(breakpointColsObject) || DEFAULT_COLUMNS
      }
    }

    let matchedBreakpoint = Infinity;
    let columns = breakpointColsObject.default || DEFAULT_COLUMNS;

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

    // Force children to be handled as an array
    const items = [].concat(this.props.children || []).filter(child => child);

    for (let i = 0; i < items.length; i++) {
      const columnIndex = i % currentColumnCount;

      if(!itemsInColumns[columnIndex]) {
        itemsInColumns[columnIndex] = [];
      }

      itemsInColumns[columnIndex].push(items[i]);
    }

    return itemsInColumns;
  }

  renderColumns() {
    const { column, columnAttrs = {}, columnClassName } = this.props;
    const childrenInColumns = this.itemsInColumns();
    const columnWidth = `${100 / childrenInColumns.length}%`;
    let className = columnClassName;

    if(typeof className !== 'string') {
      this.logDeprecated('The property "columnClassName" requires a string');

      // This is a deprecated default and will be removed soon.
      if(typeof className === 'undefined') {
        className = 'my-masonry-grid_column';
      }
    }

    const columnAttributes = {
      // NOTE: the column property is undocumented and considered deprecated.
      // It is an alias of the `columnAttrs` property
      ...column,
      ...columnAttrs,
      style: {
        ...columnAttrs.style,
        width: columnWidth
      },
      className
    };

    return childrenInColumns.map((items, i) => {
      return <div
        {...columnAttributes}

        key={i}
      >
        {items}
      </div>;
    });
  }

  logDeprecated(message) {
    console.error('[Masonry]', message);
  }

  render() {
    const {
      // ignored
      children,
      breakpointCols,
      columnClassName,
      columnAttrs,
      column,

      // used
      className,

      ...rest
    } = this.props;

    let classNameOutput = className;

    if(typeof className !== 'string') {
      this.logDeprecated('The property "className" requires a string');

      // This is a deprecated default and will be removed soon.
      if(typeof className === 'undefined') {
        classNameOutput = 'my-masonry-grid';
      }
    }

    return (
      <div
        {...rest}
        className={classNameOutput}
      >
        {this.renderColumns()}
      </div>
    );
  }
}

Masonry.defaultProps = defaultProps;

export default Masonry;
