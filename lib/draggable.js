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

var _getPosition = _interopRequireDefault(require("./utils/getPosition"));

var _getSize = _interopRequireDefault(require("./utils/getSize"));

var _getComputedStyle = _interopRequireDefault(require("./utils/getComputedStyle"));

var _manager = _interopRequireDefault(require("./manager"));

var Draggable =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(Draggable, _PureComponent);

  function Draggable() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Draggable);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Draggable)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "$el", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onMousedown", function (event) {
      event.preventDefault();
      if (_this.props.disabled) return;
      Object.assign(_manager.default, {
        screenX: event.screenX,
        screenY: event.screenY,
        clientX: event.clientX,
        clientY: event.clientY,
        pageX: event.pageX,
        pageY: event.pageY,
        startX: event.clientX,
        startY: event.clientY,
        dragX: 0,
        dragY: 0
      });
      window.addEventListener('mousemove', _this.onMouseMove);
      window.addEventListener('mouseup', _this.onMouseUp);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onMouseMove", function (event) {
      event.preventDefault();
      Object.assign(_manager.default, {
        screenX: event.screenX,
        screenY: event.screenY,
        clientX: event.clientX,
        clientY: event.clientY,
        pageX: event.pageX,
        pageY: event.pageY,
        dragX: event.clientX - _manager.default.startX,
        dragY: event.clientY - _manager.default.startY
      });

      if (_manager.default.dragging) {
        _this.onMouseMoving(event);
      } else {
        _this.onMouseMoveStart(event);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onMouseMoveStart", function () {
      // 开始移动, 获取代理元素，先clone本身吧
      var proxy = _this.getproxy();

      var computedStyle = proxy ? window.getComputedStyle(proxy) : {
        left: null,
        top: null
      };
      if (!computedStyle.left || computedStyle.left === 'auto') computedStyle.left = '0px';
      if (!computedStyle.top || computedStyle.top === 'auto') computedStyle.top = '0px';
      Object.assign(_manager.default, {
        dragging: true,
        proxy: proxy,
        value: _this.props.value,
        startLeft: +computedStyle.left.slice(0, -2),
        startTop: +computedStyle.top.slice(0, -2),
        droppable: undefined
      });
      _manager.default.left = _manager.default.startLeft;
      _manager.default.top = _manager.default.startTop; // 拖拽开始

      _this.dragStart();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onMouseMoving", function (event) {
      // 拖拽约束
      var next = Draggable.defaultConstraint(_manager.default); // 设置位置

      if (_manager.default.proxy) {
        _manager.default.proxy.style.left = "".concat(next.left, "px");
        _manager.default.proxy.style.top = "".concat(next.top, "px");
      } // 更新当前位置


      _manager.default.left = next.left;
      _manager.default.top = next.top;

      _this.drag();

      if (!_manager.default.dragging) return;
      var pointEl;

      if (_manager.default.proxy) {
        _manager.default.proxy.style.display = 'none';
        pointEl = document.elementFromPoint(event.clientX, event.clientY);
        _manager.default.proxy.style.display = '';
      } else pointEl = document.elementFromPoint(event.clientX, event.clientY);

      var pointDroppable = null; // 查找是否进入到drop的元素中去

      pointDroppable = _manager.default.droppables.find(function (droppable) {
        if (droppable.$el) {
          return droppable.$el.contains(pointEl);
        }

        return false;
      });

      if (_manager.default.droppable !== pointDroppable) {
        if (_manager.default.droppable) {
          _manager.default.droppable.dragLeave((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        }

        if (!_manager.default.dragging) return;

        if (pointDroppable) {
          pointDroppable.dragEnter((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        }

        _manager.default.droppable = pointDroppable;
      } // dragEnter之后也要dragOver


      if (pointDroppable) {
        pointDroppable.dragOver((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onMouseUp", function () {
      window.removeEventListener('mousemove', _this.onMouseMove);
      window.removeEventListener('mouseup', _this.onMouseUp);

      if (_manager.default.dragging) {
        _this.dragEnd();

        if (typeof _manager.default.droppable !== 'undefined') {
          _manager.default.droppable.drop((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        }

        _this.cancel();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "dragStart", function () {
      if (!(_this.$el instanceof Element)) {
        return;
      }

      _this.$el.classList.add('draggable-source');

      if (_manager.default.proxy) {
        _manager.default.proxy.classList.add(_this.props.proxyClass);
      }

      var cancel = false;
      var onDragStart = _this.props.onDragStart;
      onDragStart(Object.assign({
        origin: (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)),
        preventDefault: function preventDefault() {
          cancel = true;
        }
      }, _manager.default));

      if (cancel) {
        _this.dragEnd();

        _this.cancel();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "drag", function () {
      var onDrag = _this.props.onDrag;
      onDrag(Object.assign({
        origin: (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))
      }, _manager.default));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "dragEnd", function () {
      if (!(_this.$el instanceof Element)) {
        return;
      }

      _this.$el.classList.remove('draggable-source');

      var onDragEnd = _this.props.onDragEnd;
      onDragEnd(Object.assign({
        origin: (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))
      }, _manager.default));

      if (_manager.default.proxy) {
        // 清除proxy节点
        // manager.proxy.parentElement.removeChild(manager.proxy);
        document.body.removeChild(_manager.default.proxy);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "cancel", function () {
      Object.assign(_manager.default, {
        dragging: false,
        value: undefined,
        proxy: undefined,
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        startX: 0,
        startY: 0,
        dragX: 0,
        dragY: 0,
        startLeft: 0,
        startTop: 0,
        left: 0,
        top: 0,
        droppable: undefined
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getproxy", function () {
      if (!(_this.$el instanceof Element)) {
        return '';
      } // 默认是clone


      if (_this.props.proxy === 'clone') {
        var proxy = _this.$el.cloneNode(true);

        Draggable.setProxyFixed(proxy, (0, _getPosition.default)(_this.$el));
        var size = (0, _getSize.default)(_this.$el);
        proxy.style.width = "".concat(size.width, "px");
        proxy.style.height = "".concat(size.height, "px"); // this.$el.appendChild(proxy);

        document.body.appendChild(proxy);
        return proxy;
      }

      return '';
    });
    return _this;
  }

  (0, _createClass2.default)(Draggable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // eslint-disable-next-line react/no-find-dom-node
      this.$el = _reactDom.default.findDOMNode(this);
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      return _react.default.cloneElement(children, {
        onMouseDown: this.onMousedown
      });
    }
  }], [{
    key: "initProxy",
    value: function initProxy(proxy) {
      var obj = proxy; // 如果position为static，则设置为relative，保证可以移动

      if ((0, _getComputedStyle.default)(proxy, 'position') === 'static') {
        obj.style.position = 'relative';
      }
    }
  }, {
    key: "setProxyFixed",
    value: function setProxyFixed(proxy) {
      var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        left: 0,
        top: 0
      };
      var obj = proxy;
      obj.style.left = "".concat(position.left, "px");
      obj.style.top = "".concat(position.top, "px");
      obj.style.zIndex = '99';
      obj.style.position = 'fixed';
      obj.style.display = '';
    }
  }, {
    key: "defaultConstraint",
    value: function defaultConstraint(params) {
      return {
        left: params.startLeft + params.dragX,
        top: params.startTop + params.dragY
      };
    }
  }]);
  return Draggable;
}(_react.PureComponent);

(0, _defineProperty2.default)(Draggable, "propTypes", {
  proxy: _propTypes.default.string,
  proxyClass: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  onDragStart: _propTypes.default.func,
  onDrag: _propTypes.default.func,
  onDragEnd: _propTypes.default.func,
  // 目前先暂时定义这几个类型
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object, _propTypes.default.number]).isRequired,
  children: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node, _propTypes.default.element]).isRequired
});
(0, _defineProperty2.default)(Draggable, "defaultProps", {
  proxy: 'clone',
  proxyClass: 'z-dragproxy',
  disabled: false,
  onDragStart: function onDragStart() {},
  onDrag: function onDrag() {},
  onDragEnd: function onDragEnd() {}
});
var _default = Draggable;
exports.default = _default;