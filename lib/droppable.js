"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _manager = _interopRequireDefault(require("./manager"));

var Droppable =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(Droppable, _PureComponent);

  function Droppable() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Droppable);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Droppable)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "$el", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "dragEnter", function (origin) {
      if (_this.$el && _this.$el instanceof Element) {
        _this.$el.classList.add('droppable-target', 'droppable-target');
      }

      var onDragEnter = _this.props.onDragEnter;
      onDragEnter(Object.assign({
        origin: origin,
        target: (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))
      }, _manager.default));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "dragOver", function (origin) {
      var onDragOver = _this.props.onDragOver;
      onDragOver(Object.assign({
        origin: origin,
        target: (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))
      }, _manager.default));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "dragLeave", function (origin) {
      if (_this.$el && _this.$el instanceof Element) {
        _this.$el.classList.remove('droppable-target');
      }

      var onDragLeave = _this.props.onDragLeave;
      onDragLeave(Object.assign({
        origin: origin,
        target: (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))
      }, _manager.default));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "drop", function (origin) {
      var onDrop = _this.props.onDrop;
      onDrop(Object.assign({
        origin: origin,
        target: (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))
      }, _manager.default));
    });
    return _this;
  }

  (0, _createClass2.default)(Droppable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // eslint-disable-next-line react/no-find-dom-node
      this.$el = _reactDom.default.findDOMNode(this);

      _manager.default.droppables.push(this);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _manager.default.droppables.splice(_manager.default.droppables.indexOf(this), 1);
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      return _react.default.createElement(_react.default.Fragment, null, children);
    }
  }]);
  return Droppable;
}(_react.PureComponent);

(0, _defineProperty2.default)(Droppable, "propTypes", {
  onDragEnter: _propTypes.default.func,
  onDragOver: _propTypes.default.func,
  onDragLeave: _propTypes.default.func,
  onDrop: _propTypes.default.func,
  children: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node, _propTypes.default.element]).isRequired
});
(0, _defineProperty2.default)(Droppable, "defaultProps", {
  onDragEnter: function onDragEnter() {},
  onDragOver: function onDragOver() {},
  onDragLeave: function onDragLeave() {},
  onDrop: function onDrop() {}
});
var _default = Droppable;
exports.default = _default;