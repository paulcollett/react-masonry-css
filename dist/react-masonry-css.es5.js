'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultProps = {
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

var DEFAULT_COLUMNS = 2;

var Masonry = function (_React$Component) {
  _inherits(Masonry, _React$Component);

  function Masonry(props) {
    _classCallCheck(this, Masonry);

    // Correct scope for when methods are accessed externally
    var _this = _possibleConstructorReturn(this, (Masonry.__proto__ || Object.getPrototypeOf(Masonry)).call(this, props));

    _this.reCalculateColumnCount = _this.reCalculateColumnCount.bind(_this);
    _this.reCalculateColumnCountDebounce = _this.reCalculateColumnCountDebounce.bind(_this);

    // default state
    var columnCount = void 0;
    if (_this.props.breakpointCols && _this.props.breakpointCols.default) {
      columnCount = _this.props.breakpointCols.default;
    } else {
      columnCount = parseInt(_this.props.breakpointCols) || DEFAULT_COLUMNS;
    }

    _this.state = {
      columnCount: columnCount
    };
    return _this;
  }

  _createClass(Masonry, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.reCalculateColumnCount();

      // window may not be available in some environments
      if (window) {
        window.addEventListener('resize', this.reCalculateColumnCountDebounce);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.reCalculateColumnCount();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (window) {
        window.removeEventListener('resize', this.reCalculateColumnCountDebounce);
      }
    }
  }, {
    key: 'reCalculateColumnCountDebounce',
    value: function reCalculateColumnCountDebounce() {
      var _this2 = this;

      if (!window || !window.requestAnimationFrame) {
        // IE10+
        this.reCalculateColumnCount();
        return;
      }

      if (window.cancelAnimationFrame) {
        // IE10+
        window.cancelAnimationFrame(this._lastRecalculateAnimationFrame);
      }

      this._lastRecalculateAnimationFrame = window.requestAnimationFrame(function () {
        _this2.reCalculateColumnCount();
      });
    }
  }, {
    key: 'reCalculateColumnCount',
    value: function reCalculateColumnCount() {
      var windowWidth = window && window.innerWidth || Infinity;
      var breakpointColsObject = this.props.breakpointCols;

      // Allow passing a single number to `breakpointCols` instead of an object
      if ((typeof breakpointColsObject === 'undefined' ? 'undefined' : _typeof(breakpointColsObject)) !== 'object') {
        breakpointColsObject = {
          default: parseInt(breakpointColsObject) || DEFAULT_COLUMNS
        };
      }

      var matchedBreakpoint = Infinity;
      var columns = breakpointColsObject.default || DEFAULT_COLUMNS;

      for (var breakpoint in breakpointColsObject) {
        var optBreakpoint = parseInt(breakpoint);
        var isCurrentBreakpoint = optBreakpoint > 0 && windowWidth <= optBreakpoint;

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
  }, {
    key: 'itemsInColumns',
    value: function itemsInColumns() {
      var currentColumnCount = this.state.columnCount;
      var itemsInColumns = new Array(currentColumnCount);

      // Force children to be handled as an array
      var items = [].concat(this.props.children || []);

      for (var i = 0; i < items.length; i++) {
        var columnIndex = i % currentColumnCount;

        if (!itemsInColumns[columnIndex]) {
          itemsInColumns[columnIndex] = [];
        }

        itemsInColumns[columnIndex].push(items[i]);
      }

      return itemsInColumns;
    }
  }, {
    key: 'renderColumns',
    value: function renderColumns() {
      var _props = this.props,
          column = _props.column,
          _props$columnAttrs = _props.columnAttrs,
          columnAttrs = _props$columnAttrs === undefined ? {} : _props$columnAttrs,
          columnClassName = _props.columnClassName;

      var childrenInColumns = this.itemsInColumns();
      var columnWidth = 100 / childrenInColumns.length + '%';
      var className = columnClassName;

      if (typeof className !== 'string') {
        this.logDeprecated('The property "columnClassName" requires a string');

        // This is a deprecated default and will be removed soon.
        if (typeof className === 'undefined') {
          className = 'my-masonry-grid_column';
        }
      }

      var columnAttributes = _extends({}, column, columnAttrs, {
        style: _extends({}, columnAttrs.style, {
          width: columnWidth
        }),
        className: className
      });

      return childrenInColumns.map(function (items, i) {
        return _react2.default.createElement(
          'div',
          _extends({}, columnAttributes, {

            key: i
          }),
          items
        );
      });
    }
  }, {
    key: 'logDeprecated',
    value: function logDeprecated(message) {
      console.error('[Masonry]', message);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          children = _props2.children,
          breakpointCols = _props2.breakpointCols,
          columnClassName = _props2.columnClassName,
          columnAttrs = _props2.columnAttrs,
          column = _props2.column,
          className = _props2.className,
          rest = _objectWithoutProperties(_props2, ['children', 'breakpointCols', 'columnClassName', 'columnAttrs', 'column', 'className']);

      var classNameOutput = className;

      if (typeof className !== 'string') {
        this.logDeprecated('The property "className" requires a string');

        // This is a deprecated default and will be removed soon.
        if (typeof className === 'undefined') {
          classNameOutput = 'my-masonry-grid';
        }
      }

      return _react2.default.createElement(
        'div',
        _extends({}, rest, {
          className: classNameOutput
        }),
        this.renderColumns()
      );
    }
  }]);

  return Masonry;
}(_react2.default.Component);

Masonry.defaultProps = defaultProps;

exports.default = Masonry;
