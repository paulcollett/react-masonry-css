import React from 'react';

const _excluded = ["children", "breakpointCols", "columnClassName", "columnAttrs", "column", "className"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const defaultProps = {
  breakpointCols: undefined,
  // optional, number or object { default: number, [key: number]: number }
  className: undefined,
  // required, string
  columnClassName: undefined,
  // optional, string
  // Any React children. Typically an array of JSX items
  children: undefined,
  // Custom attributes, however it is advised against
  // using these to prevent unintended issues and future conflicts
  // ...any other attribute, will be added to the container
  columnAttrs: undefined,
  // object, added to the columns
  // Deprecated props
  // The column property is deprecated.
  // It is an alias of the `columnAttrs` property
  column: undefined
};
const DEFAULT_COLUMNS = 2;
const LIMIT_DELTA = 10;

class Masonry extends React.Component {
  constructor(props) {
    super(props); // Correct scope for when methods are accessed externally

    this.reCalculateColumnCount = this.reCalculateColumnCount.bind(this);
    this.reCalculateColumnCountDebounce = this.reCalculateColumnCountDebounce.bind(this); // default state

    let columnCount;

    if (this.props.breakpointCols && this.props.breakpointCols.default) {
      columnCount = this.props.breakpointCols.default;
    } else {
      columnCount = parseInt(this.props.breakpointCols) || DEFAULT_COLUMNS;
    }

    this.state = {
      columnCount,
      outerHeight: window.outerHeight
    };
  }

  componentDidMount() {
    this.reCalculateColumnCount(); // window may not be available in some environments

    if (window) {
      window.addEventListener('resize', this.reCalculateColumnCountDebounce);
    }
  }

  componentDidUpdate() {
    this.reCalculateColumnCount();
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener('resize', this.reCalculateColumnCountDebounce);
    }
  }

  reCalculateColumnCountDebounce() {
    setTimeout(() => {
      if (Math.abs(this.state.outerHeight - window.outerHeight) < LIMIT_DELTA) {
        return;
      }

      this.setState(_objectSpread(_objectSpread({}, this.state), {}, {
        outerHeight: window.outerHeight
      }));

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
    }, 10);
  }

  reCalculateColumnCount() {
    const windowWidth = window && window.innerWidth || Infinity;
    let breakpointColsObject = this.props.breakpointCols; // Allow passing a single number to `breakpointCols` instead of an object

    if (typeof breakpointColsObject !== 'object') {
      breakpointColsObject = {
        default: parseInt(breakpointColsObject) || DEFAULT_COLUMNS
      };
    }

    let matchedBreakpoint = Infinity;
    let columns = breakpointColsObject.default || DEFAULT_COLUMNS;

    for (let breakpoint in breakpointColsObject) {
      const optBreakpoint = parseInt(breakpoint);
      const isCurrentBreakpoint = optBreakpoint > 0 && windowWidth <= optBreakpoint;

      if (isCurrentBreakpoint && optBreakpoint < matchedBreakpoint) {
        matchedBreakpoint = optBreakpoint;
        columns = breakpointColsObject[breakpoint];
      }
    }

    columns = Math.max(1, parseInt(columns) || 1);

    if (this.state.columnCount !== columns) {
      this.setState(_objectSpread(_objectSpread({}, this.state), {}, {
        columnCount: columns
      }));
    }
  }

  itemsInColumns() {
    const currentColumnCount = this.state.columnCount;
    const itemsInColumns = new Array(currentColumnCount); // Force children to be handled as an array

    const items = React.Children.toArray(this.props.children);

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
    const {
      column,
      columnAttrs = {},
      columnClassName
    } = this.props;
    const childrenInColumns = this.itemsInColumns();
    const columnWidth = `${100 / childrenInColumns.length}%`;
    let className = columnClassName;

    if (className && typeof className !== 'string') {
      this.logDeprecated('The property "columnClassName" requires a string'); // This is a deprecated default and will be removed soon.

      if (typeof className === 'undefined') {
        className = 'my-masonry-grid_column';
      }
    }

    const columnAttributes = _objectSpread(_objectSpread(_objectSpread({}, column), columnAttrs), {}, {
      style: _objectSpread(_objectSpread({}, columnAttrs.style), {}, {
        width: columnWidth
      }),
      className
    });

    return childrenInColumns.map((items, i) => {
      return /*#__PURE__*/React.createElement("div", _extends({}, columnAttributes, {
        key: i
      }), items);
    });
  }

  logDeprecated(message) {
    console.error('[Masonry]', message);
  }

  render() {
    const _this$props = this.props,
          {
      // ignored
      children,
      breakpointCols,
      columnClassName,
      columnAttrs,
      column,
      // used
      className
    } = _this$props,
          rest = _objectWithoutProperties(_this$props, _excluded);

    let classNameOutput = className;

    if (typeof className !== 'string') {
      this.logDeprecated('The property "className" requires a string'); // This is a deprecated default and will be removed soon.

      if (typeof className === 'undefined') {
        classNameOutput = 'my-masonry-grid';
      }
    }

    return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
      className: classNameOutput
    }), this.renderColumns());
  }

}

Masonry.defaultProps = defaultProps;

export { Masonry as default };
