"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(el) {
  var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'outside';

  if (mode === 'inside') {
    return {
      width: el.clientWidth,
      height: el.clientHeight
    };
  }

  if (mode === 'center') {
    return {
      width: (el.clientWidth + el.offsetWidth) / 2,
      height: (el.offsetHeight + el.clientHeight) / 2
    };
  }

  if (mode === 'outside') {
    return {
      width: el.offsetWidth,
      height: el.offsetHeight
    };
  }

  return {
    width: 0,
    height: 0
  };
}