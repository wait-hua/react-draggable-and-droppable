"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(el, property) {
  var computedStyle = window.getComputedStyle(el, null);
  return property ? computedStyle.getPropertyValue(property) : computedStyle;
}