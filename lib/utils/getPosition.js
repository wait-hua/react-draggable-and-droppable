"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(el) {
  var doc = el && el.ownerDocument;
  var docElem = doc && doc.documentElement;
  var body = doc && doc.body;
  var box = el.getBoundingClientRect ? el.getBoundingClientRect() : {
    left: 0,
    top: 0
  };
  var clientLeft = docElem.clientLeft || body.clientLeft || 0;
  var clientTop = docElem.clientTop || body.clientTop || 0;
  return {
    left: box.left - clientLeft,
    top: box.top - clientTop
  };
}