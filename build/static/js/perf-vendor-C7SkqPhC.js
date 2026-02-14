var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports } from "./react-core-BiY6fgAJ.js";
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
__name(_extends, "_extends");
function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
__name(_assertThisInitialized, "_assertThisInitialized");
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
    return t2.__proto__ = e2, t2;
  }, _setPrototypeOf(t, e);
}
__name(_setPrototypeOf, "_setPrototypeOf");
function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
}
__name(_inheritsLoose, "_inheritsLoose");
var safeIsNaN = Number.isNaN || /* @__PURE__ */ __name(function ponyfill(value) {
  return typeof value === "number" && value !== value;
}, "ponyfill");
function isEqual(first, second) {
  if (first === second) {
    return true;
  }
  if (safeIsNaN(first) && safeIsNaN(second)) {
    return true;
  }
  return false;
}
__name(isEqual, "isEqual");
function areInputsEqual(newInputs, lastInputs) {
  if (newInputs.length !== lastInputs.length) {
    return false;
  }
  for (var i = 0; i < newInputs.length; i++) {
    if (!isEqual(newInputs[i], lastInputs[i])) {
      return false;
    }
  }
  return true;
}
__name(areInputsEqual, "areInputsEqual");
function memoizeOne(resultFn, isEqual2) {
  if (isEqual2 === void 0) {
    isEqual2 = areInputsEqual;
  }
  var lastThis;
  var lastArgs = [];
  var lastResult;
  var calledOnce = false;
  function memoized() {
    var newArgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      newArgs[_i] = arguments[_i];
    }
    if (calledOnce && lastThis === this && isEqual2(newArgs, lastArgs)) {
      return lastResult;
    }
    lastResult = resultFn.apply(this, newArgs);
    calledOnce = true;
    lastThis = this;
    lastArgs = newArgs;
    return lastResult;
  }
  __name(memoized, "memoized");
  return memoized;
}
__name(memoizeOne, "memoizeOne");
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
__name(_objectWithoutPropertiesLoose, "_objectWithoutPropertiesLoose");
var hasNativePerformanceNow = typeof performance === "object" && typeof performance.now === "function";
var now = hasNativePerformanceNow ? function() {
  return performance.now();
} : function() {
  return Date.now();
};
function cancelTimeout(timeoutID) {
  cancelAnimationFrame(timeoutID.id);
}
__name(cancelTimeout, "cancelTimeout");
function requestTimeout(callback, delay) {
  var start = now();
  function tick() {
    if (now() - start >= delay) {
      callback.call(null);
    } else {
      timeoutID.id = requestAnimationFrame(tick);
    }
  }
  __name(tick, "tick");
  var timeoutID = {
    id: requestAnimationFrame(tick)
  };
  return timeoutID;
}
__name(requestTimeout, "requestTimeout");
var size = -1;
function getScrollbarSize(recalculate) {
  if (recalculate === void 0) {
    recalculate = false;
  }
  if (size === -1 || recalculate) {
    var div = document.createElement("div");
    var style = div.style;
    style.width = "50px";
    style.height = "50px";
    style.overflow = "scroll";
    document.body.appendChild(div);
    size = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
  }
  return size;
}
__name(getScrollbarSize, "getScrollbarSize");
var cachedRTLResult = null;
function getRTLOffsetType(recalculate) {
  if (recalculate === void 0) {
    recalculate = false;
  }
  if (cachedRTLResult === null || recalculate) {
    var outerDiv = document.createElement("div");
    var outerStyle = outerDiv.style;
    outerStyle.width = "50px";
    outerStyle.height = "50px";
    outerStyle.overflow = "scroll";
    outerStyle.direction = "rtl";
    var innerDiv = document.createElement("div");
    var innerStyle = innerDiv.style;
    innerStyle.width = "100px";
    innerStyle.height = "100px";
    outerDiv.appendChild(innerDiv);
    document.body.appendChild(outerDiv);
    if (outerDiv.scrollLeft > 0) {
      cachedRTLResult = "positive-descending";
    } else {
      outerDiv.scrollLeft = 1;
      if (outerDiv.scrollLeft === 0) {
        cachedRTLResult = "negative";
      } else {
        cachedRTLResult = "positive-ascending";
      }
    }
    document.body.removeChild(outerDiv);
    return cachedRTLResult;
  }
  return cachedRTLResult;
}
__name(getRTLOffsetType, "getRTLOffsetType");
var IS_SCROLLING_DEBOUNCE_INTERVAL$1 = 150;
var defaultItemKey$1 = /* @__PURE__ */ __name(function defaultItemKey3(index, data) {
  return index;
}, "defaultItemKey3");
function createListComponent(_ref) {
  var _class;
  var getItemOffset3 = _ref.getItemOffset, getEstimatedTotalSize4 = _ref.getEstimatedTotalSize, getItemSize3 = _ref.getItemSize, getOffsetForIndexAndAlignment5 = _ref.getOffsetForIndexAndAlignment, getStartIndexForOffset3 = _ref.getStartIndexForOffset, getStopIndexForStartIndex3 = _ref.getStopIndexForStartIndex, initInstanceProps5 = _ref.initInstanceProps, shouldResetStyleCacheOnItemSizeChange = _ref.shouldResetStyleCacheOnItemSizeChange, validateProps5 = _ref.validateProps;
  return _class = /* @__PURE__ */ (function(_PureComponent) {
    _inheritsLoose(List, _PureComponent);
    function List(props) {
      var _this;
      _this = _PureComponent.call(this, props) || this;
      _this._instanceProps = initInstanceProps5(_this.props, _assertThisInitialized(_this));
      _this._outerRef = void 0;
      _this._resetIsScrollingTimeoutId = null;
      _this.state = {
        instance: _assertThisInitialized(_this),
        isScrolling: false,
        scrollDirection: "forward",
        scrollOffset: typeof _this.props.initialScrollOffset === "number" ? _this.props.initialScrollOffset : 0,
        scrollUpdateWasRequested: false
      };
      _this._callOnItemsRendered = void 0;
      _this._callOnItemsRendered = memoizeOne(function(overscanStartIndex, overscanStopIndex, visibleStartIndex, visibleStopIndex) {
        return _this.props.onItemsRendered({
          overscanStartIndex,
          overscanStopIndex,
          visibleStartIndex,
          visibleStopIndex
        });
      });
      _this._callOnScroll = void 0;
      _this._callOnScroll = memoizeOne(function(scrollDirection, scrollOffset, scrollUpdateWasRequested) {
        return _this.props.onScroll({
          scrollDirection,
          scrollOffset,
          scrollUpdateWasRequested
        });
      });
      _this._getItemStyle = void 0;
      _this._getItemStyle = function(index) {
        var _this$props = _this.props, direction = _this$props.direction, itemSize = _this$props.itemSize, layout = _this$props.layout;
        var itemStyleCache = _this._getItemStyleCache(shouldResetStyleCacheOnItemSizeChange && itemSize, shouldResetStyleCacheOnItemSizeChange && layout, shouldResetStyleCacheOnItemSizeChange && direction);
        var style;
        if (itemStyleCache.hasOwnProperty(index)) {
          style = itemStyleCache[index];
        } else {
          var _offset = getItemOffset3(_this.props, index, _this._instanceProps);
          var size2 = getItemSize3(_this.props, index, _this._instanceProps);
          var isHorizontal = direction === "horizontal" || layout === "horizontal";
          var isRtl = direction === "rtl";
          var offsetHorizontal = isHorizontal ? _offset : 0;
          itemStyleCache[index] = style = {
            position: "absolute",
            left: isRtl ? void 0 : offsetHorizontal,
            right: isRtl ? offsetHorizontal : void 0,
            top: !isHorizontal ? _offset : 0,
            height: !isHorizontal ? size2 : "100%",
            width: isHorizontal ? size2 : "100%"
          };
        }
        return style;
      };
      _this._getItemStyleCache = void 0;
      _this._getItemStyleCache = memoizeOne(function(_, __, ___) {
        return {};
      });
      _this._onScrollHorizontal = function(event) {
        var _event$currentTarget = event.currentTarget, clientWidth = _event$currentTarget.clientWidth, scrollLeft = _event$currentTarget.scrollLeft, scrollWidth = _event$currentTarget.scrollWidth;
        _this.setState(function(prevState) {
          if (prevState.scrollOffset === scrollLeft) {
            return null;
          }
          var direction = _this.props.direction;
          var scrollOffset = scrollLeft;
          if (direction === "rtl") {
            switch (getRTLOffsetType()) {
              case "negative":
                scrollOffset = -scrollLeft;
                break;
              case "positive-descending":
                scrollOffset = scrollWidth - clientWidth - scrollLeft;
                break;
            }
          }
          scrollOffset = Math.max(0, Math.min(scrollOffset, scrollWidth - clientWidth));
          return {
            isScrolling: true,
            scrollDirection: prevState.scrollOffset < scrollOffset ? "forward" : "backward",
            scrollOffset,
            scrollUpdateWasRequested: false
          };
        }, _this._resetIsScrollingDebounced);
      };
      _this._onScrollVertical = function(event) {
        var _event$currentTarget2 = event.currentTarget, clientHeight = _event$currentTarget2.clientHeight, scrollHeight = _event$currentTarget2.scrollHeight, scrollTop = _event$currentTarget2.scrollTop;
        _this.setState(function(prevState) {
          if (prevState.scrollOffset === scrollTop) {
            return null;
          }
          var scrollOffset = Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight));
          return {
            isScrolling: true,
            scrollDirection: prevState.scrollOffset < scrollOffset ? "forward" : "backward",
            scrollOffset,
            scrollUpdateWasRequested: false
          };
        }, _this._resetIsScrollingDebounced);
      };
      _this._outerRefSetter = function(ref) {
        var outerRef = _this.props.outerRef;
        _this._outerRef = ref;
        if (typeof outerRef === "function") {
          outerRef(ref);
        } else if (outerRef != null && typeof outerRef === "object" && outerRef.hasOwnProperty("current")) {
          outerRef.current = ref;
        }
      };
      _this._resetIsScrollingDebounced = function() {
        if (_this._resetIsScrollingTimeoutId !== null) {
          cancelTimeout(_this._resetIsScrollingTimeoutId);
        }
        _this._resetIsScrollingTimeoutId = requestTimeout(_this._resetIsScrolling, IS_SCROLLING_DEBOUNCE_INTERVAL$1);
      };
      _this._resetIsScrolling = function() {
        _this._resetIsScrollingTimeoutId = null;
        _this.setState({
          isScrolling: false
        }, function() {
          _this._getItemStyleCache(-1, null);
        });
      };
      return _this;
    }
    __name(List, "List");
    List.getDerivedStateFromProps = /* @__PURE__ */ __name(function getDerivedStateFromProps(nextProps, prevState) {
      validateSharedProps$1(nextProps, prevState);
      validateProps5(nextProps);
      return null;
    }, "getDerivedStateFromProps");
    var _proto = List.prototype;
    _proto.scrollTo = /* @__PURE__ */ __name(function scrollTo(scrollOffset) {
      scrollOffset = Math.max(0, scrollOffset);
      this.setState(function(prevState) {
        if (prevState.scrollOffset === scrollOffset) {
          return null;
        }
        return {
          scrollDirection: prevState.scrollOffset < scrollOffset ? "forward" : "backward",
          scrollOffset,
          scrollUpdateWasRequested: true
        };
      }, this._resetIsScrollingDebounced);
    }, "scrollTo");
    _proto.scrollToItem = /* @__PURE__ */ __name(function scrollToItem(index, align) {
      if (align === void 0) {
        align = "auto";
      }
      var _this$props2 = this.props, itemCount = _this$props2.itemCount, layout = _this$props2.layout;
      var scrollOffset = this.state.scrollOffset;
      index = Math.max(0, Math.min(index, itemCount - 1));
      var scrollbarSize = 0;
      if (this._outerRef) {
        var outerRef = this._outerRef;
        if (layout === "vertical") {
          scrollbarSize = outerRef.scrollWidth > outerRef.clientWidth ? getScrollbarSize() : 0;
        } else {
          scrollbarSize = outerRef.scrollHeight > outerRef.clientHeight ? getScrollbarSize() : 0;
        }
      }
      this.scrollTo(getOffsetForIndexAndAlignment5(this.props, index, align, scrollOffset, this._instanceProps, scrollbarSize));
    }, "scrollToItem");
    _proto.componentDidMount = /* @__PURE__ */ __name(function componentDidMount() {
      var _this$props3 = this.props, direction = _this$props3.direction, initialScrollOffset = _this$props3.initialScrollOffset, layout = _this$props3.layout;
      if (typeof initialScrollOffset === "number" && this._outerRef != null) {
        var outerRef = this._outerRef;
        if (direction === "horizontal" || layout === "horizontal") {
          outerRef.scrollLeft = initialScrollOffset;
        } else {
          outerRef.scrollTop = initialScrollOffset;
        }
      }
      this._callPropsCallbacks();
    }, "componentDidMount");
    _proto.componentDidUpdate = /* @__PURE__ */ __name(function componentDidUpdate() {
      var _this$props4 = this.props, direction = _this$props4.direction, layout = _this$props4.layout;
      var _this$state = this.state, scrollOffset = _this$state.scrollOffset, scrollUpdateWasRequested = _this$state.scrollUpdateWasRequested;
      if (scrollUpdateWasRequested && this._outerRef != null) {
        var outerRef = this._outerRef;
        if (direction === "horizontal" || layout === "horizontal") {
          if (direction === "rtl") {
            switch (getRTLOffsetType()) {
              case "negative":
                outerRef.scrollLeft = -scrollOffset;
                break;
              case "positive-ascending":
                outerRef.scrollLeft = scrollOffset;
                break;
              default:
                var clientWidth = outerRef.clientWidth, scrollWidth = outerRef.scrollWidth;
                outerRef.scrollLeft = scrollWidth - clientWidth - scrollOffset;
                break;
            }
          } else {
            outerRef.scrollLeft = scrollOffset;
          }
        } else {
          outerRef.scrollTop = scrollOffset;
        }
      }
      this._callPropsCallbacks();
    }, "componentDidUpdate");
    _proto.componentWillUnmount = /* @__PURE__ */ __name(function componentWillUnmount() {
      if (this._resetIsScrollingTimeoutId !== null) {
        cancelTimeout(this._resetIsScrollingTimeoutId);
      }
    }, "componentWillUnmount");
    _proto.render = /* @__PURE__ */ __name(function render() {
      var _this$props5 = this.props, children = _this$props5.children, className = _this$props5.className, direction = _this$props5.direction, height = _this$props5.height, innerRef = _this$props5.innerRef, innerElementType = _this$props5.innerElementType, innerTagName = _this$props5.innerTagName, itemCount = _this$props5.itemCount, itemData = _this$props5.itemData, _this$props5$itemKey = _this$props5.itemKey, itemKey = _this$props5$itemKey === void 0 ? defaultItemKey$1 : _this$props5$itemKey, layout = _this$props5.layout, outerElementType = _this$props5.outerElementType, outerTagName = _this$props5.outerTagName, style = _this$props5.style, useIsScrolling = _this$props5.useIsScrolling, width = _this$props5.width;
      var isScrolling = this.state.isScrolling;
      var isHorizontal = direction === "horizontal" || layout === "horizontal";
      var onScroll = isHorizontal ? this._onScrollHorizontal : this._onScrollVertical;
      var _this$_getRangeToRend = this._getRangeToRender(), startIndex = _this$_getRangeToRend[0], stopIndex = _this$_getRangeToRend[1];
      var items = [];
      if (itemCount > 0) {
        for (var _index = startIndex; _index <= stopIndex; _index++) {
          items.push(reactExports.createElement(children, {
            data: itemData,
            key: itemKey(_index, itemData),
            index: _index,
            isScrolling: useIsScrolling ? isScrolling : void 0,
            style: this._getItemStyle(_index)
          }));
        }
      }
      var estimatedTotalSize = getEstimatedTotalSize4(this.props, this._instanceProps);
      return reactExports.createElement(outerElementType || outerTagName || "div", {
        className,
        onScroll,
        ref: this._outerRefSetter,
        style: _extends({
          position: "relative",
          height,
          width,
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          willChange: "transform",
          direction
        }, style)
      }, reactExports.createElement(innerElementType || innerTagName || "div", {
        children: items,
        ref: innerRef,
        style: {
          height: isHorizontal ? "100%" : estimatedTotalSize,
          pointerEvents: isScrolling ? "none" : void 0,
          width: isHorizontal ? estimatedTotalSize : "100%"
        }
      }));
    }, "render");
    _proto._callPropsCallbacks = /* @__PURE__ */ __name(function _callPropsCallbacks() {
      if (typeof this.props.onItemsRendered === "function") {
        var itemCount = this.props.itemCount;
        if (itemCount > 0) {
          var _this$_getRangeToRend2 = this._getRangeToRender(), _overscanStartIndex = _this$_getRangeToRend2[0], _overscanStopIndex = _this$_getRangeToRend2[1], _visibleStartIndex = _this$_getRangeToRend2[2], _visibleStopIndex = _this$_getRangeToRend2[3];
          this._callOnItemsRendered(_overscanStartIndex, _overscanStopIndex, _visibleStartIndex, _visibleStopIndex);
        }
      }
      if (typeof this.props.onScroll === "function") {
        var _this$state2 = this.state, _scrollDirection = _this$state2.scrollDirection, _scrollOffset = _this$state2.scrollOffset, _scrollUpdateWasRequested = _this$state2.scrollUpdateWasRequested;
        this._callOnScroll(_scrollDirection, _scrollOffset, _scrollUpdateWasRequested);
      }
    }, "_callPropsCallbacks");
    _proto._getRangeToRender = /* @__PURE__ */ __name(function _getRangeToRender() {
      var _this$props6 = this.props, itemCount = _this$props6.itemCount, overscanCount = _this$props6.overscanCount;
      var _this$state3 = this.state, isScrolling = _this$state3.isScrolling, scrollDirection = _this$state3.scrollDirection, scrollOffset = _this$state3.scrollOffset;
      if (itemCount === 0) {
        return [0, 0, 0, 0];
      }
      var startIndex = getStartIndexForOffset3(this.props, scrollOffset, this._instanceProps);
      var stopIndex = getStopIndexForStartIndex3(this.props, startIndex, scrollOffset, this._instanceProps);
      var overscanBackward = !isScrolling || scrollDirection === "backward" ? Math.max(1, overscanCount) : 1;
      var overscanForward = !isScrolling || scrollDirection === "forward" ? Math.max(1, overscanCount) : 1;
      return [Math.max(0, startIndex - overscanBackward), Math.max(0, Math.min(itemCount - 1, stopIndex + overscanForward)), startIndex, stopIndex];
    }, "_getRangeToRender");
    return List;
  })(reactExports.PureComponent), _class.defaultProps = {
    direction: "ltr",
    itemData: void 0,
    layout: "vertical",
    overscanCount: 2,
    useIsScrolling: false
  }, _class;
}
__name(createListComponent, "createListComponent");
var validateSharedProps$1 = /* @__PURE__ */ __name(function validateSharedProps3(_ref2, _ref3) {
  _ref2.children;
  _ref2.direction;
  _ref2.height;
  _ref2.layout;
  _ref2.innerTagName;
  _ref2.outerTagName;
  _ref2.width;
  _ref3.instance;
}, "validateSharedProps3");
var DEFAULT_ESTIMATED_ITEM_SIZE$1 = 50;
var getItemMetadata$1 = /* @__PURE__ */ __name(function getItemMetadata3(props, index, instanceProps) {
  var _ref = props, itemSize = _ref.itemSize;
  var itemMetadataMap = instanceProps.itemMetadataMap, lastMeasuredIndex = instanceProps.lastMeasuredIndex;
  if (index > lastMeasuredIndex) {
    var offset = 0;
    if (lastMeasuredIndex >= 0) {
      var itemMetadata = itemMetadataMap[lastMeasuredIndex];
      offset = itemMetadata.offset + itemMetadata.size;
    }
    for (var i = lastMeasuredIndex + 1; i <= index; i++) {
      var size2 = itemSize(i);
      itemMetadataMap[i] = {
        offset,
        size: size2
      };
      offset += size2;
    }
    instanceProps.lastMeasuredIndex = index;
  }
  return itemMetadataMap[index];
}, "getItemMetadata3");
var findNearestItem$1 = /* @__PURE__ */ __name(function findNearestItem3(props, instanceProps, offset) {
  var itemMetadataMap = instanceProps.itemMetadataMap, lastMeasuredIndex = instanceProps.lastMeasuredIndex;
  var lastMeasuredItemOffset = lastMeasuredIndex > 0 ? itemMetadataMap[lastMeasuredIndex].offset : 0;
  if (lastMeasuredItemOffset >= offset) {
    return findNearestItemBinarySearch$1(props, instanceProps, lastMeasuredIndex, 0, offset);
  } else {
    return findNearestItemExponentialSearch$1(props, instanceProps, Math.max(0, lastMeasuredIndex), offset);
  }
}, "findNearestItem3");
var findNearestItemBinarySearch$1 = /* @__PURE__ */ __name(function findNearestItemBinarySearch3(props, instanceProps, high, low, offset) {
  while (low <= high) {
    var middle = low + Math.floor((high - low) / 2);
    var currentOffset = getItemMetadata$1(props, middle, instanceProps).offset;
    if (currentOffset === offset) {
      return middle;
    } else if (currentOffset < offset) {
      low = middle + 1;
    } else if (currentOffset > offset) {
      high = middle - 1;
    }
  }
  if (low > 0) {
    return low - 1;
  } else {
    return 0;
  }
}, "findNearestItemBinarySearch3");
var findNearestItemExponentialSearch$1 = /* @__PURE__ */ __name(function findNearestItemExponentialSearch3(props, instanceProps, index, offset) {
  var itemCount = props.itemCount;
  var interval = 1;
  while (index < itemCount && getItemMetadata$1(props, index, instanceProps).offset < offset) {
    index += interval;
    interval *= 2;
  }
  return findNearestItemBinarySearch$1(props, instanceProps, Math.min(index, itemCount - 1), Math.floor(index / 2), offset);
}, "findNearestItemExponentialSearch3");
var getEstimatedTotalSize = /* @__PURE__ */ __name(function getEstimatedTotalSize2(_ref2, _ref3) {
  var itemCount = _ref2.itemCount;
  var itemMetadataMap = _ref3.itemMetadataMap, estimatedItemSize = _ref3.estimatedItemSize, lastMeasuredIndex = _ref3.lastMeasuredIndex;
  var totalSizeOfMeasuredItems = 0;
  if (lastMeasuredIndex >= itemCount) {
    lastMeasuredIndex = itemCount - 1;
  }
  if (lastMeasuredIndex >= 0) {
    var itemMetadata = itemMetadataMap[lastMeasuredIndex];
    totalSizeOfMeasuredItems = itemMetadata.offset + itemMetadata.size;
  }
  var numUnmeasuredItems = itemCount - lastMeasuredIndex - 1;
  var totalSizeOfUnmeasuredItems = numUnmeasuredItems * estimatedItemSize;
  return totalSizeOfMeasuredItems + totalSizeOfUnmeasuredItems;
}, "getEstimatedTotalSize2");
var VariableSizeList = /* @__PURE__ */ createListComponent({
  getItemOffset: /* @__PURE__ */ __name(function getItemOffset(props, index, instanceProps) {
    return getItemMetadata$1(props, index, instanceProps).offset;
  }, "getItemOffset"),
  getItemSize: /* @__PURE__ */ __name(function getItemSize(props, index, instanceProps) {
    return instanceProps.itemMetadataMap[index].size;
  }, "getItemSize"),
  getEstimatedTotalSize,
  getOffsetForIndexAndAlignment: /* @__PURE__ */ __name(function getOffsetForIndexAndAlignment3(props, index, align, scrollOffset, instanceProps, scrollbarSize) {
    var direction = props.direction, height = props.height, layout = props.layout, width = props.width;
    var isHorizontal = direction === "horizontal" || layout === "horizontal";
    var size2 = isHorizontal ? width : height;
    var itemMetadata = getItemMetadata$1(props, index, instanceProps);
    var estimatedTotalSize = getEstimatedTotalSize(props, instanceProps);
    var maxOffset = Math.max(0, Math.min(estimatedTotalSize - size2, itemMetadata.offset));
    var minOffset = Math.max(0, itemMetadata.offset - size2 + itemMetadata.size + scrollbarSize);
    if (align === "smart") {
      if (scrollOffset >= minOffset - size2 && scrollOffset <= maxOffset + size2) {
        align = "auto";
      } else {
        align = "center";
      }
    }
    switch (align) {
      case "start":
        return maxOffset;
      case "end":
        return minOffset;
      case "center":
        return Math.round(minOffset + (maxOffset - minOffset) / 2);
      case "auto":
      default:
        if (scrollOffset >= minOffset && scrollOffset <= maxOffset) {
          return scrollOffset;
        } else if (scrollOffset < minOffset) {
          return minOffset;
        } else {
          return maxOffset;
        }
    }
  }, "getOffsetForIndexAndAlignment3"),
  getStartIndexForOffset: /* @__PURE__ */ __name(function getStartIndexForOffset(props, offset, instanceProps) {
    return findNearestItem$1(props, instanceProps, offset);
  }, "getStartIndexForOffset"),
  getStopIndexForStartIndex: /* @__PURE__ */ __name(function getStopIndexForStartIndex(props, startIndex, scrollOffset, instanceProps) {
    var direction = props.direction, height = props.height, itemCount = props.itemCount, layout = props.layout, width = props.width;
    var isHorizontal = direction === "horizontal" || layout === "horizontal";
    var size2 = isHorizontal ? width : height;
    var itemMetadata = getItemMetadata$1(props, startIndex, instanceProps);
    var maxOffset = scrollOffset + size2;
    var offset = itemMetadata.offset + itemMetadata.size;
    var stopIndex = startIndex;
    while (stopIndex < itemCount - 1 && offset < maxOffset) {
      stopIndex++;
      offset += getItemMetadata$1(props, stopIndex, instanceProps).size;
    }
    return stopIndex;
  }, "getStopIndexForStartIndex"),
  initInstanceProps: /* @__PURE__ */ __name(function initInstanceProps2(props, instance) {
    var _ref4 = props, estimatedItemSize = _ref4.estimatedItemSize;
    var instanceProps = {
      itemMetadataMap: {},
      estimatedItemSize: estimatedItemSize || DEFAULT_ESTIMATED_ITEM_SIZE$1,
      lastMeasuredIndex: -1
    };
    instance.resetAfterIndex = function(index, shouldForceUpdate) {
      if (shouldForceUpdate === void 0) {
        shouldForceUpdate = true;
      }
      instanceProps.lastMeasuredIndex = Math.min(instanceProps.lastMeasuredIndex, index - 1);
      instance._getItemStyleCache(-1);
      if (shouldForceUpdate) {
        instance.forceUpdate();
      }
    };
    return instanceProps;
  }, "initInstanceProps2"),
  shouldResetStyleCacheOnItemSizeChange: false,
  validateProps: /* @__PURE__ */ __name(function validateProps2(_ref5) {
    _ref5.itemSize;
  }, "validateProps2")
});
let m;
typeof window < "u" ? m = window : typeof self < "u" ? m = self : m = global;
let R = null, E = null;
const N = 20, y = m.clearTimeout, S = m.setTimeout, F = m.cancelAnimationFrame || m.mozCancelAnimationFrame || m.webkitCancelAnimationFrame, W = m.requestAnimationFrame || m.mozRequestAnimationFrame || m.webkitRequestAnimationFrame;
F == null || W == null ? (R = y, E = /* @__PURE__ */ __name(function(l) {
  return S(l, N);
}, "E")) : (R = /* @__PURE__ */ __name(function([l, _]) {
  F(l), y(_);
}, "R"), E = /* @__PURE__ */ __name(function(l) {
  const _ = W(
    function() {
      y(f), l();
    }
  ), f = S(function() {
    F(_), l();
  }, N);
  return [_, f];
}, "E"));
function D(z) {
  let l, _, f, u, T, r, a;
  const c = typeof document < "u" && document.attachEvent;
  if (!c) {
    r = /* @__PURE__ */ __name(function(t) {
      const i = t.__resizeTriggers__, h = i.firstElementChild, b = i.lastElementChild, L = h.firstElementChild;
      b.scrollLeft = b.scrollWidth, b.scrollTop = b.scrollHeight, L.style.width = h.offsetWidth + 1 + "px", L.style.height = h.offsetHeight + 1 + "px", h.scrollLeft = h.scrollWidth, h.scrollTop = h.scrollHeight;
    }, "r"), T = /* @__PURE__ */ __name(function(t) {
      return t.offsetWidth !== t.__resizeLast__.width || t.offsetHeight !== t.__resizeLast__.height;
    }, "T"), a = /* @__PURE__ */ __name(function(t) {
      if (t.target.className && typeof t.target.className.indexOf == "function" && t.target.className.indexOf("contract-trigger") < 0 && t.target.className.indexOf("expand-trigger") < 0)
        return;
      const i = this;
      r(this), this.__resizeRAF__ && R(this.__resizeRAF__), this.__resizeRAF__ = E(function() {
        T(i) && (i.__resizeLast__.width = i.offsetWidth, i.__resizeLast__.height = i.offsetHeight, i.__resizeListeners__.forEach(
          function(L) {
            L.call(i, t);
          }
        ));
      });
    }, "a");
    let e = false, s = "";
    f = "animationstart";
    const d = "Webkit Moz O ms".split(" ");
    let o = "webkitAnimationStart animationstart oAnimationStart MSAnimationStart".split(
      " "
    ), p = "";
    {
      const t = document.createElement("fakeelement");
      if (t.style.animationName !== void 0 && (e = true), e === false) {
        for (let i = 0; i < d.length; i++)
          if (t.style[d[i] + "AnimationName"] !== void 0) {
            p = d[i], s = "-" + p.toLowerCase() + "-", f = o[i], e = true;
            break;
          }
      }
    }
    _ = "resizeanim", l = "@" + s + "keyframes " + _ + " { from { opacity: 0; } to { opacity: 0; } } ", u = s + "animation: 1ms " + _ + "; ";
  }
  const n = /* @__PURE__ */ __name(function(e) {
    if (!e.getElementById("detectElementResize")) {
      const s = (l || "") + ".resize-triggers { " + (u || "") + 'visibility: hidden; opacity: 0; } .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; z-index: -1; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }', d = e.head || e.getElementsByTagName("head")[0], o = e.createElement("style");
      o.id = "detectElementResize", o.type = "text/css", z != null && o.setAttribute("nonce", z), o.styleSheet ? o.styleSheet.cssText = s : o.appendChild(e.createTextNode(s)), d.appendChild(o);
    }
  }, "n");
  return {
    addResizeListener: /* @__PURE__ */ __name(function(e, s) {
      if (c)
        e.attachEvent("onresize", s);
      else {
        if (!e.__resizeTriggers__) {
          const d = e.ownerDocument, o = m.getComputedStyle(e);
          o && o.position === "static" && (e.style.position = "relative"), n(d), e.__resizeLast__ = {}, e.__resizeListeners__ = [], (e.__resizeTriggers__ = d.createElement("div")).className = "resize-triggers";
          const p = d.createElement("div");
          p.className = "expand-trigger", p.appendChild(d.createElement("div"));
          const t = d.createElement("div");
          t.className = "contract-trigger", e.__resizeTriggers__.appendChild(p), e.__resizeTriggers__.appendChild(t), e.appendChild(e.__resizeTriggers__), r(e), e.addEventListener("scroll", a, true), f && (e.__resizeTriggers__.__animationListener__ = function(h) {
            h.animationName === _ && r(e);
          }, e.__resizeTriggers__.addEventListener(
            f,
            e.__resizeTriggers__.__animationListener__
          ));
        }
        e.__resizeListeners__.push(s);
      }
    }, "addResizeListener"),
    removeResizeListener: /* @__PURE__ */ __name(function(e, s) {
      if (c)
        e.detachEvent("onresize", s);
      else if (e.__resizeListeners__.splice(
        e.__resizeListeners__.indexOf(s),
        1
      ), !e.__resizeListeners__.length) {
        e.removeEventListener("scroll", a, true), e.__resizeTriggers__.__animationListener__ && (e.__resizeTriggers__.removeEventListener(
          f,
          e.__resizeTriggers__.__animationListener__
        ), e.__resizeTriggers__.__animationListener__ = null);
        try {
          e.__resizeTriggers__ = !e.removeChild(
            e.__resizeTriggers__
          );
        } catch {
        }
      }
    }, "removeResizeListener")
  };
}
__name(D, "D");
function B({
  box: z,
  nonce: l,
  onResize: _,
  rootElement: f
}) {
  const u = reactExports.useRef({
    onResize: _,
    parentNode: null,
    prevSize: {
      height: void 0,
      width: void 0
    }
  });
  reactExports.useLayoutEffect(() => {
    u.current.onResize = _;
  });
  const T = reactExports.useRef(() => {
    const { onResize: r, parentNode: a, prevSize: c } = u.current;
    if (a === null)
      return;
    let n, g;
    switch (z) {
      case "border-box": {
        const v = a.getBoundingClientRect();
        n = v.height, g = v.width;
        break;
      }
      case "content-box": {
        const v = a.getBoundingClientRect(), e = window.getComputedStyle(a) || {}, s = parseFloat(e.borderBottomWidth || "0"), d = parseFloat(e.borderLeftWidth || "0"), o = parseFloat(e.borderRightWidth || "0"), p = parseFloat(e.borderTopWidth || "0"), t = parseFloat(e.paddingLeft || "0"), i = parseFloat(e.paddingRight || "0"), h = parseFloat(e.paddingTop || "0"), b = parseFloat(e.paddingBottom || "0");
        n = v.height - h - b - p - s, g = v.width - t - i - d - o;
        break;
      }
      case "device-pixel-content-box": {
        n = a.offsetHeight, g = a.offsetWidth;
        break;
      }
    }
    (c.height !== n || c.width !== g) && (u.current.prevSize = { height: n, width: g }, r({
      height: n,
      width: g
    }));
  });
  reactExports.useLayoutEffect(() => {
    if (f === null)
      return;
    const r = f.parentNode;
    if (r === null || r.ownerDocument === null || r.ownerDocument.defaultView === null || !(r instanceof r.ownerDocument.defaultView.HTMLElement))
      return;
    u.current.parentNode = r;
    const a = T.current, c = r.ownerDocument.defaultView.ResizeObserver;
    if (c != null) {
      let n;
      const g = new c(() => {
        n = setTimeout(a, 0);
      });
      return g.observe(r), () => {
        n && clearTimeout(n), g.disconnect();
      };
    } else {
      const n = D(l);
      return n.addResizeListener(r, a), () => {
        n.removeResizeListener(r, a);
      };
    }
  }, [l, f]);
}
__name(B, "B");
function q({
  box: z = "content-box",
  className: l,
  "data-testid": _,
  id: f,
  nonce: u,
  onResize: T,
  style: r,
  tagName: a = "div",
  ...c
}) {
  let n, g;
  "Child" in c ? n = c.Child : "ChildComponent" in c ? n = c.ChildComponent : "renderProp" in c && (g = c.renderProp);
  const [v, e] = reactExports.useState(null), [s, d] = reactExports.useState(), [o, p] = reactExports.useState();
  B({
    box: z,
    nonce: u,
    onResize: /* @__PURE__ */ __name((i) => {
      d(i.height), p(i.width), typeof T < "u" && T(i);
    }, "onResize"),
    rootElement: v
  });
  const t = reactExports.useMemo(
    () => n ? reactExports.memo(n) : void 0,
    [n]
  );
  return reactExports.createElement(
    a,
    {
      className: l,
      "data-auto-sizer": "",
      "data-testid": _,
      id: f,
      ref: e,
      style: r
    },
    t ? reactExports.createElement(t, { height: s, width: o }) : void 0,
    g ? g({ height: s, width: o }) : void 0
  );
}
__name(q, "q");
export {
  VariableSizeList as V,
  _objectWithoutPropertiesLoose as _,
  _extends as a,
  q
};
