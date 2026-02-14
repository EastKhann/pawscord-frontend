var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { d as requireReact, a as React, r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { r as requireCjs, D as Draggable } from "./cjs-B_ypQz0b.js";
import { r as requirePropTypes$1 } from "./ui-vendor-iPoN0WGz.js";
var reactResizable = { exports: {} };
var Resizable = {};
var utils = {};
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  utils.__esModule = true;
  utils.cloneElement = cloneElement;
  var _react = _interopRequireDefault(requireReact());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  __name(_interopRequireDefault, "_interopRequireDefault");
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  __name(ownKeys, "ownKeys");
  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  __name(_objectSpread, "_objectSpread");
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  __name(_defineProperty, "_defineProperty");
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
  __name(_toPropertyKey, "_toPropertyKey");
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== void 0) {
      var res = prim.call(input, hint);
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  __name(_toPrimitive, "_toPrimitive");
  function cloneElement(element, props) {
    if (props.style && element.props.style) {
      props.style = _objectSpread(_objectSpread({}, element.props.style), props.style);
    }
    if (props.className && element.props.className) {
      props.className = element.props.className + " " + props.className;
    }
    return /* @__PURE__ */ _react.default.cloneElement(element, props);
  }
  __name(cloneElement, "cloneElement");
  return utils;
}
__name(requireUtils, "requireUtils");
var propTypes = {};
var hasRequiredPropTypes;
function requirePropTypes() {
  if (hasRequiredPropTypes) return propTypes;
  hasRequiredPropTypes = 1;
  propTypes.__esModule = true;
  propTypes.resizableProps = void 0;
  var _propTypes = _interopRequireDefault(/* @__PURE__ */ requirePropTypes$1());
  requireCjs();
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  __name(_interopRequireDefault, "_interopRequireDefault");
  var resizableProps = {
    /*
    * Restricts resizing to a particular axis (default: 'both')
    * 'both' - allows resizing by width or height
    * 'x' - only allows the width to be changed
    * 'y' - only allows the height to be changed
    * 'none' - disables resizing altogether
    * */
    axis: _propTypes.default.oneOf(["both", "x", "y", "none"]),
    className: _propTypes.default.string,
    /*
    * Require that one and only one child be present.
    * */
    children: _propTypes.default.element.isRequired,
    /*
    * These will be passed wholesale to react-draggable's DraggableCore
    * */
    draggableOpts: _propTypes.default.shape({
      allowAnyClick: _propTypes.default.bool,
      cancel: _propTypes.default.string,
      children: _propTypes.default.node,
      disabled: _propTypes.default.bool,
      enableUserSelectHack: _propTypes.default.bool,
      offsetParent: _propTypes.default.node,
      grid: _propTypes.default.arrayOf(_propTypes.default.number),
      handle: _propTypes.default.string,
      nodeRef: _propTypes.default.object,
      onStart: _propTypes.default.func,
      onDrag: _propTypes.default.func,
      onStop: _propTypes.default.func,
      onMouseDown: _propTypes.default.func,
      scale: _propTypes.default.number
    }),
    /*
    * Initial height
    * */
    height: /* @__PURE__ */ __name(function height() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var props = args[0];
      if (props.axis === "both" || props.axis === "y") {
        var _PropTypes$number;
        return (_PropTypes$number = _propTypes.default.number).isRequired.apply(_PropTypes$number, args);
      }
      return _propTypes.default.number.apply(_propTypes.default, args);
    }, "height"),
    /*
    * Customize cursor resize handle
    * */
    handle: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
    /*
    * If you change this, be sure to update your css
    * */
    handleSize: _propTypes.default.arrayOf(_propTypes.default.number),
    lockAspectRatio: _propTypes.default.bool,
    /*
    * Max X & Y measure
    * */
    maxConstraints: _propTypes.default.arrayOf(_propTypes.default.number),
    /*
    * Min X & Y measure
    * */
    minConstraints: _propTypes.default.arrayOf(_propTypes.default.number),
    /*
    * Called on stop resize event
    * */
    onResizeStop: _propTypes.default.func,
    /*
    * Called on start resize event
    * */
    onResizeStart: _propTypes.default.func,
    /*
    * Called on resize event
    * */
    onResize: _propTypes.default.func,
    /*
    * Defines which resize handles should be rendered (default: 'se')
    * 's' - South handle (bottom-center)
    * 'w' - West handle (left-center)
    * 'e' - East handle (right-center)
    * 'n' - North handle (top-center)
    * 'sw' - Southwest handle (bottom-left)
    * 'nw' - Northwest handle (top-left)
    * 'se' - Southeast handle (bottom-right)
    * 'ne' - Northeast handle (top-center)
    * */
    resizeHandles: _propTypes.default.arrayOf(_propTypes.default.oneOf(["s", "w", "e", "n", "sw", "nw", "se", "ne"])),
    /*
    * If `transform: scale(n)` is set on the parent, this should be set to `n`.
    * */
    transformScale: _propTypes.default.number,
    /*
     * Initial width
     */
    width: /* @__PURE__ */ __name(function width() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      var props = args[0];
      if (props.axis === "both" || props.axis === "x") {
        var _PropTypes$number2;
        return (_PropTypes$number2 = _propTypes.default.number).isRequired.apply(_PropTypes$number2, args);
      }
      return _propTypes.default.number.apply(_propTypes.default, args);
    }, "width")
  };
  propTypes.resizableProps = resizableProps;
  return propTypes;
}
__name(requirePropTypes, "requirePropTypes");
var hasRequiredResizable;
function requireResizable() {
  if (hasRequiredResizable) return Resizable;
  hasRequiredResizable = 1;
  Resizable.__esModule = true;
  Resizable.default = void 0;
  var React2 = _interopRequireWildcard(requireReact());
  var _reactDraggable = requireCjs();
  var _utils = requireUtils();
  var _propTypes = requirePropTypes();
  var _excluded = ["children", "className", "draggableOpts", "width", "height", "handle", "handleSize", "lockAspectRatio", "axis", "minConstraints", "maxConstraints", "onResize", "onResizeStop", "onResizeStart", "resizeHandles", "transformScale"];
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
    var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
    return (_getRequireWildcardCache = /* @__PURE__ */ __name(function _getRequireWildcardCache2(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    }, "_getRequireWildcardCache"))(nodeInterop);
  }
  __name(_getRequireWildcardCache, "_getRequireWildcardCache");
  function _interopRequireWildcard(obj, nodeInterop) {
    if (obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return { default: obj };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache) {
      cache.set(obj, newObj);
    }
    return newObj;
  }
  __name(_interopRequireWildcard, "_interopRequireWildcard");
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  __name(_extends, "_extends");
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
    return target;
  }
  __name(_objectWithoutPropertiesLoose, "_objectWithoutPropertiesLoose");
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  __name(ownKeys, "ownKeys");
  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  __name(_objectSpread, "_objectSpread");
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  __name(_defineProperty, "_defineProperty");
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
  __name(_toPropertyKey, "_toPropertyKey");
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== void 0) {
      var res = prim.call(input, hint);
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  __name(_toPrimitive, "_toPrimitive");
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }
  __name(_inheritsLoose, "_inheritsLoose");
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : /* @__PURE__ */ __name(function _setPrototypeOf2(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    }, "_setPrototypeOf");
    return _setPrototypeOf(o, p);
  }
  __name(_setPrototypeOf, "_setPrototypeOf");
  var Resizable$1 = /* @__PURE__ */ (function(_React$Component) {
    _inheritsLoose(Resizable2, _React$Component);
    function Resizable2() {
      var _this;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
      _this.handleRefs = {};
      _this.lastHandleRect = null;
      _this.slack = null;
      return _this;
    }
    __name(Resizable2, "Resizable");
    var _proto = Resizable2.prototype;
    _proto.componentWillUnmount = /* @__PURE__ */ __name(function componentWillUnmount() {
      this.resetData();
    }, "componentWillUnmount");
    _proto.resetData = /* @__PURE__ */ __name(function resetData() {
      this.lastHandleRect = this.slack = null;
    }, "resetData");
    _proto.runConstraints = /* @__PURE__ */ __name(function runConstraints(width, height) {
      var _this$props = this.props, minConstraints = _this$props.minConstraints, maxConstraints = _this$props.maxConstraints, lockAspectRatio = _this$props.lockAspectRatio;
      if (!minConstraints && !maxConstraints && !lockAspectRatio) return [width, height];
      if (lockAspectRatio) {
        var ratio = this.props.width / this.props.height;
        var deltaW = width - this.props.width;
        var deltaH = height - this.props.height;
        if (Math.abs(deltaW) > Math.abs(deltaH * ratio)) {
          height = width / ratio;
        } else {
          width = height * ratio;
        }
      }
      var oldW = width, oldH = height;
      var _ref = this.slack || [0, 0], slackW = _ref[0], slackH = _ref[1];
      width += slackW;
      height += slackH;
      if (minConstraints) {
        width = Math.max(minConstraints[0], width);
        height = Math.max(minConstraints[1], height);
      }
      if (maxConstraints) {
        width = Math.min(maxConstraints[0], width);
        height = Math.min(maxConstraints[1], height);
      }
      this.slack = [slackW + (oldW - width), slackH + (oldH - height)];
      return [width, height];
    }, "runConstraints");
    _proto.resizeHandler = /* @__PURE__ */ __name(function resizeHandler(handlerName, axis) {
      var _this2 = this;
      return function(e, _ref2) {
        var node = _ref2.node, deltaX = _ref2.deltaX, deltaY = _ref2.deltaY;
        if (handlerName === "onResizeStart") _this2.resetData();
        var canDragX = (_this2.props.axis === "both" || _this2.props.axis === "x") && axis !== "n" && axis !== "s";
        var canDragY = (_this2.props.axis === "both" || _this2.props.axis === "y") && axis !== "e" && axis !== "w";
        if (!canDragX && !canDragY) return;
        var axisV = axis[0];
        var axisH = axis[axis.length - 1];
        var handleRect = node.getBoundingClientRect();
        if (_this2.lastHandleRect != null) {
          if (axisH === "w") {
            var deltaLeftSinceLast = handleRect.left - _this2.lastHandleRect.left;
            deltaX += deltaLeftSinceLast;
          }
          if (axisV === "n") {
            var deltaTopSinceLast = handleRect.top - _this2.lastHandleRect.top;
            deltaY += deltaTopSinceLast;
          }
        }
        _this2.lastHandleRect = handleRect;
        if (axisH === "w") deltaX = -deltaX;
        if (axisV === "n") deltaY = -deltaY;
        var width = _this2.props.width + (canDragX ? deltaX / _this2.props.transformScale : 0);
        var height = _this2.props.height + (canDragY ? deltaY / _this2.props.transformScale : 0);
        var _this2$runConstraints = _this2.runConstraints(width, height);
        width = _this2$runConstraints[0];
        height = _this2$runConstraints[1];
        var dimensionsChanged = width !== _this2.props.width || height !== _this2.props.height;
        var cb = typeof _this2.props[handlerName] === "function" ? _this2.props[handlerName] : null;
        var shouldSkipCb = handlerName === "onResize" && !dimensionsChanged;
        if (cb && !shouldSkipCb) {
          e.persist == null ? void 0 : e.persist();
          cb(e, {
            node,
            size: {
              width,
              height
            },
            handle: axis
          });
        }
        if (handlerName === "onResizeStop") _this2.resetData();
      };
    }, "resizeHandler");
    _proto.renderResizeHandle = /* @__PURE__ */ __name(function renderResizeHandle(handleAxis, ref) {
      var handle = this.props.handle;
      if (!handle) {
        return /* @__PURE__ */ React2.createElement("span", {
          className: "react-resizable-handle react-resizable-handle-" + handleAxis,
          ref
        });
      }
      if (typeof handle === "function") {
        return handle(handleAxis, ref);
      }
      var isDOMElement = typeof handle.type === "string";
      var props = _objectSpread({
        ref
      }, isDOMElement ? {} : {
        handleAxis
      });
      return /* @__PURE__ */ React2.cloneElement(handle, props);
    }, "renderResizeHandle");
    _proto.render = /* @__PURE__ */ __name(function render() {
      var _this3 = this;
      var _this$props2 = this.props, children = _this$props2.children, className = _this$props2.className, draggableOpts = _this$props2.draggableOpts;
      _this$props2.width;
      _this$props2.height;
      _this$props2.handle;
      _this$props2.handleSize;
      _this$props2.lockAspectRatio;
      _this$props2.axis;
      _this$props2.minConstraints;
      _this$props2.maxConstraints;
      _this$props2.onResize;
      _this$props2.onResizeStop;
      _this$props2.onResizeStart;
      var resizeHandles = _this$props2.resizeHandles;
      _this$props2.transformScale;
      var p = _objectWithoutPropertiesLoose(_this$props2, _excluded);
      return (0, _utils.cloneElement)(children, _objectSpread(_objectSpread({}, p), {}, {
        className: (className ? className + " " : "") + "react-resizable",
        children: [].concat(children.props.children, resizeHandles.map(function(handleAxis) {
          var _this3$handleRefs$han;
          var ref = (_this3$handleRefs$han = _this3.handleRefs[handleAxis]) != null ? _this3$handleRefs$han : _this3.handleRefs[handleAxis] = /* @__PURE__ */ React2.createRef();
          return /* @__PURE__ */ React2.createElement(_reactDraggable.DraggableCore, _extends({}, draggableOpts, {
            nodeRef: ref,
            key: "resizableHandle-" + handleAxis,
            onStop: _this3.resizeHandler("onResizeStop", handleAxis),
            onStart: _this3.resizeHandler("onResizeStart", handleAxis),
            onDrag: _this3.resizeHandler("onResize", handleAxis)
          }), _this3.renderResizeHandle(handleAxis, ref));
        }))
      }));
    }, "render");
    return Resizable2;
  })(React2.Component);
  Resizable.default = Resizable$1;
  Resizable$1.propTypes = _propTypes.resizableProps;
  Resizable$1.defaultProps = {
    axis: "both",
    handleSize: [20, 20],
    lockAspectRatio: false,
    minConstraints: [20, 20],
    maxConstraints: [Infinity, Infinity],
    resizeHandles: ["se"],
    transformScale: 1
  };
  return Resizable;
}
__name(requireResizable, "requireResizable");
var ResizableBox = {};
var hasRequiredResizableBox;
function requireResizableBox() {
  if (hasRequiredResizableBox) return ResizableBox;
  hasRequiredResizableBox = 1;
  ResizableBox.__esModule = true;
  ResizableBox.default = void 0;
  var React2 = _interopRequireWildcard(requireReact());
  var _propTypes = _interopRequireDefault(/* @__PURE__ */ requirePropTypes$1());
  var _Resizable = _interopRequireDefault(requireResizable());
  var _propTypes2 = requirePropTypes();
  var _excluded = ["handle", "handleSize", "onResize", "onResizeStart", "onResizeStop", "draggableOpts", "minConstraints", "maxConstraints", "lockAspectRatio", "axis", "width", "height", "resizeHandles", "style", "transformScale"];
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  __name(_interopRequireDefault, "_interopRequireDefault");
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
    var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
    return (_getRequireWildcardCache = /* @__PURE__ */ __name(function _getRequireWildcardCache2(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    }, "_getRequireWildcardCache"))(nodeInterop);
  }
  __name(_getRequireWildcardCache, "_getRequireWildcardCache");
  function _interopRequireWildcard(obj, nodeInterop) {
    if (obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return { default: obj };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache) {
      cache.set(obj, newObj);
    }
    return newObj;
  }
  __name(_interopRequireWildcard, "_interopRequireWildcard");
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  __name(_extends, "_extends");
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  __name(ownKeys, "ownKeys");
  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  __name(_objectSpread, "_objectSpread");
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  __name(_defineProperty, "_defineProperty");
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
  __name(_toPropertyKey, "_toPropertyKey");
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== void 0) {
      var res = prim.call(input, hint);
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  __name(_toPrimitive, "_toPrimitive");
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
    return target;
  }
  __name(_objectWithoutPropertiesLoose, "_objectWithoutPropertiesLoose");
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }
  __name(_inheritsLoose, "_inheritsLoose");
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : /* @__PURE__ */ __name(function _setPrototypeOf2(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    }, "_setPrototypeOf");
    return _setPrototypeOf(o, p);
  }
  __name(_setPrototypeOf, "_setPrototypeOf");
  var ResizableBox$1 = /* @__PURE__ */ (function(_React$Component) {
    _inheritsLoose(ResizableBox2, _React$Component);
    function ResizableBox2() {
      var _this;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
      _this.state = {
        width: _this.props.width,
        height: _this.props.height,
        propsWidth: _this.props.width,
        propsHeight: _this.props.height
      };
      _this.onResize = function(e, data) {
        var size = data.size;
        if (_this.props.onResize) {
          e.persist == null ? void 0 : e.persist();
          _this.setState(size, function() {
            return _this.props.onResize && _this.props.onResize(e, data);
          });
        } else {
          _this.setState(size);
        }
      };
      return _this;
    }
    __name(ResizableBox2, "ResizableBox");
    ResizableBox2.getDerivedStateFromProps = /* @__PURE__ */ __name(function getDerivedStateFromProps(props, state) {
      if (state.propsWidth !== props.width || state.propsHeight !== props.height) {
        return {
          width: props.width,
          height: props.height,
          propsWidth: props.width,
          propsHeight: props.height
        };
      }
      return null;
    }, "getDerivedStateFromProps");
    var _proto = ResizableBox2.prototype;
    _proto.render = /* @__PURE__ */ __name(function render() {
      var _this$props = this.props, handle = _this$props.handle, handleSize = _this$props.handleSize;
      _this$props.onResize;
      var onResizeStart = _this$props.onResizeStart, onResizeStop = _this$props.onResizeStop, draggableOpts = _this$props.draggableOpts, minConstraints = _this$props.minConstraints, maxConstraints = _this$props.maxConstraints, lockAspectRatio = _this$props.lockAspectRatio, axis = _this$props.axis;
      _this$props.width;
      _this$props.height;
      var resizeHandles = _this$props.resizeHandles, style = _this$props.style, transformScale = _this$props.transformScale, props = _objectWithoutPropertiesLoose(_this$props, _excluded);
      return /* @__PURE__ */ React2.createElement(_Resizable.default, {
        axis,
        draggableOpts,
        handle,
        handleSize,
        height: this.state.height,
        lockAspectRatio,
        maxConstraints,
        minConstraints,
        onResizeStart,
        onResize: this.onResize,
        onResizeStop,
        resizeHandles,
        transformScale,
        width: this.state.width
      }, /* @__PURE__ */ React2.createElement("div", _extends({}, props, {
        style: _objectSpread(_objectSpread({}, style), {}, {
          width: this.state.width + "px",
          height: this.state.height + "px"
        })
      })));
    }, "render");
    return ResizableBox2;
  })(React2.Component);
  ResizableBox.default = ResizableBox$1;
  ResizableBox$1.propTypes = _objectSpread(_objectSpread({}, _propTypes2.resizableProps), {}, {
    children: _propTypes.default.element
  });
  return ResizableBox;
}
__name(requireResizableBox, "requireResizableBox");
var hasRequiredReactResizable;
function requireReactResizable() {
  if (hasRequiredReactResizable) return reactResizable.exports;
  hasRequiredReactResizable = 1;
  reactResizable.exports = function() {
    throw new Error("Don't instantiate Resizable directly! Use require('react-resizable').Resizable");
  };
  reactResizable.exports.Resizable = requireResizable().default;
  reactResizable.exports.ResizableBox = requireResizableBox().default;
  return reactResizable.exports;
}
__name(requireReactResizable, "requireReactResizable");
var reactResizableExports = requireReactResizable();
const FloatingVoiceIsland = /* @__PURE__ */ __name(({ islandState, onDrag, onResize, children, isMobile, headerActions }) => {
  const nodeRef = reactExports.useRef(null);
  const [isInteracting, setIsInteracting] = reactExports.useState(false);
  const [isMinimized, setIsMinimized] = reactExports.useState(false);
  const [isHovered, setIsHovered] = reactExports.useState(false);
  const [animationClass, setAnimationClass] = reactExports.useState("");
  reactExports.useEffect(() => {
    setAnimationClass("island-enter");
    const timer = setTimeout(() => setAnimationClass(""), 600);
    return () => clearTimeout(timer);
  }, []);
  const safeIslandState = islandState || {
    x: isMobile ? 10 : window.innerWidth / 2 - 175,
    y: isMobile ? 60 : window.innerHeight * 0.15,
    width: isMobile ? window.innerWidth - 20 : 350,
    height: isMobile ? 200 : 280
  };
  const minConstraints = isMobile ? [200, 150] : [320, 220];
  const maxConstraints = [window.innerWidth - 20, window.innerHeight - 80];
  const handleMinimize = /* @__PURE__ */ __name(() => {
    setIsMinimized(!isMinimized);
  }, "handleMinimize");
  const minimizedWidth = isMobile ? 180 : 220;
  const minimizedHeight = 50;
  const currentWidth = isMinimized ? minimizedWidth : safeIslandState.width;
  const currentHeight = isMinimized ? minimizedHeight : safeIslandState.height;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
                @keyframes island-enter {
                    from {
                        opacity: 0;
                        transform: scale(0.85) translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }

                @keyframes pulse-glow {
                    0%, 100% { box-shadow: 0 5px 40px rgba(88, 101, 242, 0.3), 0 0 20px rgba(88, 101, 242, 0.1); }
                    50% { box-shadow: 0 5px 50px rgba(88, 101, 242, 0.5), 0 0 30px rgba(88, 101, 242, 0.2); }
                }

                @keyframes slide-up {
                    from { transform: translateY(10px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                .island-enter {
                    animation: island-enter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .island-container {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .island-container:hover {
                    box-shadow: 0 8px 50px rgba(88, 101, 242, 0.4), 0 0 30px rgba(88, 101, 242, 0.15) !important;
                }

                .drag-handle-modern {
                    transition: all 0.25s ease;
                }

                .drag-handle-modern:hover {
                    background: linear-gradient(135deg, rgba(88, 101, 242, 0.25), rgba(114, 137, 218, 0.25)) !important;
                }

                .voice-btn-modern {
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .voice-btn-modern:hover {
                    transform: translateY(-2px) scale(1.05);
                    box-shadow: 0 5px 15px rgba(88, 101, 242, 0.4);
                }

                .voice-btn-modern:active {
                    transform: translateY(0) scale(0.98);
                }

                /* Mobile touch optimization */
                @media (max-width: 768px) {
                    .voice-btn-modern {
                        min-width: 44px;
                        min-height: 44px;
                    }
                }

                /* Scrollbar styling */
                .content-area-modern::-webkit-scrollbar {
                    width: 6px;
                }

                .content-area-modern::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: 3px;
                }

                .content-area-modern::-webkit-scrollbar-thumb {
                    background: rgba(88, 101, 242, 0.5);
                    border-radius: 3px;
                }

                .content-area-modern::-webkit-scrollbar-thumb:hover {
                    background: rgba(88, 101, 242, 0.7);
                }
            ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Draggable,
      {
        nodeRef,
        handle: ".drag-handle-modern",
        position: { x: safeIslandState.x || 0, y: safeIslandState.y || 0 },
        onStart: /* @__PURE__ */ __name(() => setIsInteracting(true), "onStart"),
        onStop: /* @__PURE__ */ __name((e, data) => {
          setIsInteracting(false);
          onDrag(data);
        }, "onStop"),
        disabled: false,
        bounds: "parent",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref: nodeRef,
            style: {
              position: "absolute",
              zIndex: 1e3
            },
            className: animationClass,
            children: isMinimized ? (
              // 🎯 MINIMIZED STATE - Compact Bar
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    ...styles.minimizedContainer,
                    width: minimizedWidth,
                    height: minimizedHeight
                  },
                  onMouseEnter: /* @__PURE__ */ __name(() => setIsHovered(true), "onMouseEnter"),
                  onMouseLeave: /* @__PURE__ */ __name(() => setIsHovered(false), "onMouseLeave"),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "drag-handle-modern", style: styles.minimizedDragHandle, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.minimizedIcon, children: "🎤" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.minimizedText, children: "Voice Chat" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: handleMinimize,
                        onMouseDown: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onMouseDown"),
                        onTouchStart: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onTouchStart"),
                        style: styles.expandButton,
                        className: "voice-btn-modern",
                        children: "⬆️"
                      }
                    )
                  ] })
                }
              )
            ) : (
              // 🎯 EXPANDED STATE - Full Panel
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                reactResizableExports.ResizableBox,
                {
                  width: currentWidth,
                  height: currentHeight,
                  minConstraints,
                  maxConstraints,
                  onResizeStart: /* @__PURE__ */ __name((e) => {
                    e.stopPropagation();
                    setIsInteracting(true);
                  }, "onResizeStart"),
                  onResizeStop: /* @__PURE__ */ __name((e, data) => {
                    e.stopPropagation();
                    setIsInteracting(false);
                    if (onResize) {
                      onResize(data.size);
                    }
                  }, "onResizeStop"),
                  style: {
                    ...styles.islandContainer,
                    animation: isHovered ? "pulse-glow 2s infinite" : "none"
                  },
                  className: "island-container",
                  draggableOpts: { enableUserSelectHack: false },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "drag-handle-modern",
                        style: styles.dragHandle,
                        onMouseEnter: /* @__PURE__ */ __name(() => setIsHovered(true), "onMouseEnter"),
                        onMouseLeave: /* @__PURE__ */ __name(() => setIsHovered(false), "onMouseLeave"),
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerContent, children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.voiceIcon, children: "🎤" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.panelHeader, children: "VOICE CHAT" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerRight, children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                onMouseDown: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onMouseDown"),
                                onTouchStart: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onTouchStart"),
                                onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"),
                                children: headerActions && headerActions
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                onClick: handleMinimize,
                                onMouseDown: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onMouseDown"),
                                onTouchStart: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onTouchStart"),
                                style: styles.minimizeButton,
                                className: "voice-btn-modern",
                                title: "Minimize",
                                children: "➖"
                              }
                            )
                          ] })
                        ] })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "content-area-modern",
                        style: {
                          ...styles.contentArea,
                          pointerEvents: isInteracting ? "none" : "auto",
                          opacity: isInteracting ? 0.92 : 1
                        },
                        children
                      }
                    ),
                    isInteracting && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.interactionShield })
                  ]
                }
              )
            )
          }
        )
      }
    )
  ] });
}, "FloatingVoiceIsland");
const styles = {
  // 🎨 MAIN CONTAINER - Glassmorphism Design
  islandContainer: {
    background: "linear-gradient(135deg, rgba(30, 31, 34, 0.95), rgba(35, 36, 40, 0.95))",
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
    borderRadius: "16px",
    boxShadow: "0 8px 40px rgba(0, 0, 0, 0.7), 0 0 20px rgba(88, 101, 242, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    border: "1px solid rgba(88, 101, 242, 0.3)"
  },
  // 🎯 MINIMIZED CONTAINER
  minimizedContainer: {
    background: "linear-gradient(135deg, rgba(30, 31, 34, 0.98), rgba(35, 36, 40, 0.98))",
    backdropFilter: "blur(15px)",
    borderRadius: "25px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.6), 0 0 15px rgba(88, 101, 242, 0.25)",
    border: "1px solid rgba(88, 101, 242, 0.4)",
    overflow: "hidden",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
  },
  minimizedDragHandle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
    height: "100%",
    cursor: "move",
    userSelect: "none"
  },
  minimizedIcon: {
    fontSize: "20px",
    marginRight: "8px"
  },
  minimizedText: {
    flex: 1,
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: "14px",
    fontWeight: "600",
    letterSpacing: "0.5px"
  },
  expandButton: {
    background: "rgba(88, 101, 242, 0.2)",
    border: "1px solid rgba(88, 101, 242, 0.4)",
    borderRadius: "8px",
    padding: "6px 10px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s ease",
    outline: "none"
  },
  // 🎨 MODERN DRAG HANDLE
  dragHandle: {
    padding: "14px 16px",
    cursor: "move",
    background: "linear-gradient(135deg, rgba(88, 101, 242, 0.15), rgba(114, 137, 218, 0.15))",
    borderBottom: "1px solid rgba(88, 101, 242, 0.3)",
    userSelect: "none",
    backdropFilter: "blur(10px)"
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  voiceIcon: {
    fontSize: "20px",
    filter: "drop-shadow(0 0 8px rgba(88, 101, 242, 0.6))"
  },
  panelHeader: {
    margin: 0,
    color: "rgba(255, 255, 255, 0.95)",
    fontSize: "15px",
    fontWeight: "700",
    letterSpacing: "1.5px",
    textShadow: "0 0 10px rgba(88, 101, 242, 0.5)"
  },
  headerRight: {
    display: "flex",
    gap: "8px"
  },
  minimizeButton: {
    background: "rgba(88, 101, 242, 0.2)",
    border: "1px solid rgba(88, 101, 242, 0.4)",
    borderRadius: "6px",
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "14px",
    outline: "none",
    color: "rgba(255, 255, 255, 0.9)"
  },
  // 🌊 GLASSMORPHISM CONTENT
  contentArea: {
    flex: 1,
    padding: "0",
    // 🔥 REMOVED PADDING for full-width immersive feel
    overflowY: "auto",
    overflowX: "hidden",
    display: "flex",
    flexWrap: "wrap",
    gap: "0",
    // Handled by inner grid
    alignContent: "flex-start",
    justifyContent: "center",
    background: "linear-gradient(180deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3))",
    position: "relative"
  },
  // 🛡️ INTERACTION SHIELD
  interactionShield: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 9999,
    cursor: "grabbing",
    backgroundColor: "transparent"
  }
};
const FloatingVoiceIsland_default = React.memo(FloatingVoiceIsland);
export {
  FloatingVoiceIsland_default as default
};
