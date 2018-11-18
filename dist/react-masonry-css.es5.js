'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Masonry = function (_React$Component) {
  _inherits(Masonry, _React$Component);

  function Masonry(props) {
    _classCallCheck(this, Masonry);

    var _this = _possibleConstructorReturn(this, (Masonry.__proto__ || Object.getPrototypeOf(Masonry)).call(this, props));

    _this.reCalculateColumnCount = _this.reCalculateColumnCount.bind(_this);

    // default state
    var columnCount = void 0;
    if (_this.props.breakpointCols && _this.props.breakpointCols.default) {
      columnCount = _this.props.breakpointCols.default;
    } else {
      columnCount = 2;
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

      // window may not be avaliable in some environments
      if (window) {
        window.addEventListener('resize', this.reCalculateColumnCount);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this.reCalculateColumnCount();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (window) {
        window.removeEventListener('resize', this.reCalculateColumnCount);
      }
    }
  }, {
    key: 'reCalculateColumnCount',
    value: function reCalculateColumnCount() {
      var windowWidth = window && window.innerWidth || Infinity;
      var breakpointColsObject = this.props.breakpointCols;

      // Allow passing a single number instead of an object
      if (parseInt(breakpointColsObject) > 0) {
        breakpointColsObject = {
          default: breakpointColsObject
        };
      }

      var matchedBreakpoint = Infinity;
      var columns = breakpointColsObject.default || 2;

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
      var items = this.props.children || [];

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
          columnClassName = _props.columnClassName;

      var childrenInColumns = this.itemsInColumns();
      var w = 100 / childrenInColumns.length + '%';

      return childrenInColumns.map(function (items, i) {
        return _react2.default.createElement(
          'div',
          _extends({
            key: i,
            className: columnClassName,
            style: { width: w }
          }, column),
          items
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          breakpointCols = _props2.breakpointCols,
          columnClassName = _props2.columnClassName,
          column = _props2.column,
          wrapperProps = _objectWithoutProperties(_props2, ['breakpointCols', 'columnClassName', 'column']);

      return _react2.default.createElement(
        'div',
        wrapperProps,
        this.renderColumns()
      );
    }
  }]);

  return Masonry;
}(_react2.default.Component);

Masonry.propTypes = {
  breakpointCols: _propTypes2.default.object,
  columnClassName: _propTypes2.default.string
};

Masonry.defaultProps = {
  breakpointCols: {},
  className: 'my-masonry-grid',
  columnClassName: 'my-masonry-grid_column'
};

exports.default = Masonry;
