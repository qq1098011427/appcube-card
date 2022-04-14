var extend = window.extend || StudioWidgetWrapper.extend
StudioWidgetWrapper.extend = function noop (fn) {
  const res = fn()
  StudioWidgetWrapper.extend = extend
  return res
}
var Dzt01 = StudioWidgetWrapper.extend(function () {
  var ctx = {
    // 组件根目录
    widgetBasePath: '',
    widgetProperties: {},
    // 获取桥接器实例的方法
    getConnectorInstanceByName: null
  }

  /**
   * 统一Connector调用
   * @param connector 桥接器实例
   * @param params 所有参数（桥接器处理）
   * @returns {Promise<unknown>}
   */
  const callFlowConn = function (connector, ...params) {
    return new Promise((resolve, reject) => {
      connector.connectorParams.async = true;

      var getParams = function (params){
        return {
          boid: params[0],
          filter: params[1],
          pageView: params[2],
        }
    }
      connector.connectorParams.input = getParams(params)
      connector.getInputParams().isShare = true; //多次请求合并
      connector.process(function (response) {
        if (response) {
          resolve(response || [])
        } else reject()
      });
    })
  }

  var process = { env: {"NODE_ENV":"production"} };

  /**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */

/* eslint-disable */
var TWEEN = TWEEN || function () {
  var _tweens = [];
  return {
    getAll: function () {
      return _tweens;
    },
    removeAll: function () {
      _tweens = [];
    },
    add: function (tween) {
      _tweens.push(tween);
    },
    remove: function (tween) {
      var i = _tweens.indexOf(tween);

      if (i !== -1) {
        _tweens.splice(i, 1);
      }
    },
    update: function (time, preserve) {
      if (_tweens.length === 0) {
        return false;
      }

      var i = 0;
      time = time !== undefined ? time : TWEEN.now();

      while (i < _tweens.length) {
        if (_tweens[i].update(time) || preserve) {
          i++;
        } else {
          _tweens.splice(i, 1);
        }
      }

      return true;
    }
  };
}(); // Include a performance.now polyfill.
// In node.js, use process.hrtime.


if (typeof window === 'undefined' && typeof process !== 'undefined') {
  TWEEN.now = function () {
    var time = process.hrtime(); // Convert [seconds, nanoseconds] to milliseconds.

    return time[0] * 1000 + time[1] / 1000000;
  };
} // In a browser, use window.performance.now if it is available.
else if (typeof window !== 'undefined' && window.performance !== undefined && window.performance.now !== undefined) {
  // This must be bound, because directly assigning this function
  // leads to an invocation exception in Chrome.
  TWEEN.now = window.performance.now.bind(window.performance);
} // Use Date.now if it is available.
else if (Date.now !== undefined) {
  TWEEN.now = Date.now;
} // Otherwise, use 'new Date().getTime()'.
else {
  TWEEN.now = function () {
    return new Date().getTime();
  };
}

TWEEN.Tween = function (object) {
  var _object = object;
  var _valuesStart = {};
  var _valuesEnd = {};
  var _valuesStartRepeat = {};
  var _duration = 1000;
  var _repeat = 0;

  var _repeatDelayTime;

  var _yoyo = false;
  var _isPlaying = false;
  var _reversed = false;
  var _delayTime = 0;
  var _startTime = null;
  var _easingFunction = TWEEN.Easing.Linear.None;
  var _interpolationFunction = TWEEN.Interpolation.Linear;
  var _chainedTweens = [];
  var _onStartCallback = null;
  var _onStartCallbackFired = false;
  var _onUpdateCallback = null;
  var _onCompleteCallback = null;
  var _onStopCallback = null;

  this.to = function (properties, duration) {
    _valuesEnd = properties;

    if (duration !== undefined) {
      _duration = duration;
    }

    return this;
  };

  this.start = function (time) {
    TWEEN.add(this);
    _isPlaying = true;
    _onStartCallbackFired = false;
    _startTime = time !== undefined ? time : TWEEN.now();
    _startTime += _delayTime;

    for (var property in _valuesEnd) {
      // Check if an Array was provided as property value
      if (_valuesEnd[property] instanceof Array) {
        if (_valuesEnd[property].length === 0) {
          continue;
        } // Create a local copy of the Array with the start value at the front


        _valuesEnd[property] = [_object[property]].concat(_valuesEnd[property]);
      } // If `to()` specifies a property that doesn't exist in the source object,
      // we should not set that property in the object


      if (_object[property] === undefined) {
        continue;
      } // Save the starting value.


      _valuesStart[property] = _object[property];

      if (_valuesStart[property] instanceof Array === false) {
        _valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
      }

      _valuesStartRepeat[property] = _valuesStart[property] || 0;
    }

    return this;
  };

  this.stop = function () {
    if (!_isPlaying) {
      return this;
    }

    TWEEN.remove(this);
    _isPlaying = false;

    if (_onStopCallback !== null) {
      _onStopCallback.call(_object, _object);
    }

    this.stopChainedTweens();
    return this;
  };

  this.end = function () {
    this.update(_startTime + _duration);
    return this;
  };

  this.stopChainedTweens = function () {
    for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
      _chainedTweens[i].stop();
    }
  };

  this.delay = function (amount) {
    _delayTime = amount;
    return this;
  };

  this.repeat = function (times) {
    _repeat = times;
    return this;
  };

  this.repeatDelay = function (amount) {
    _repeatDelayTime = amount;
    return this;
  };

  this.yoyo = function (yoyo) {
    _yoyo = yoyo;
    return this;
  };

  this.easing = function (easing) {
    _easingFunction = easing;
    return this;
  };

  this.interpolation = function (interpolation) {
    _interpolationFunction = interpolation;
    return this;
  };

  this.chain = function () {
    _chainedTweens = arguments;
    return this;
  };

  this.onStart = function (callback) {
    _onStartCallback = callback;
    return this;
  };

  this.onUpdate = function (callback) {
    _onUpdateCallback = callback;
    return this;
  };

  this.onComplete = function (callback) {
    _onCompleteCallback = callback;
    return this;
  };

  this.onStop = function (callback) {
    _onStopCallback = callback;
    return this;
  };

  this.update = function (time) {
    var property;
    var elapsed;
    var value;

    if (time < _startTime) {
      return true;
    }

    if (_onStartCallbackFired === false) {
      if (_onStartCallback !== null) {
        _onStartCallback.call(_object, _object);
      }

      _onStartCallbackFired = true;
    }

    elapsed = (time - _startTime) / _duration;
    elapsed = elapsed > 1 ? 1 : elapsed;
    value = _easingFunction(elapsed);

    for (property in _valuesEnd) {
      // Don't update properties that do not exist in the source object
      if (_valuesStart[property] === undefined) {
        continue;
      }

      var start = _valuesStart[property] || 0;
      var end = _valuesEnd[property];

      if (end instanceof Array) {
        _object[property] = _interpolationFunction(end, value);
      } else {
        // Parses relative end values with start as base (e.g.: +10, -3)
        if (typeof end === 'string') {
          if (end.charAt(0) === '+' || end.charAt(0) === '-') {
            end = start + parseFloat(end);
          } else {
            end = parseFloat(end);
          }
        } // Protect against non numeric properties.


        if (typeof end === 'number') {
          _object[property] = start + (end - start) * value;
        }
      }
    }

    if (_onUpdateCallback !== null) {
      _onUpdateCallback.call(_object, value);
    }

    if (elapsed === 1) {
      if (_repeat > 0) {
        if (isFinite(_repeat)) {
          _repeat--;
        } // Reassign starting values, restart by making startTime = now


        for (property in _valuesStartRepeat) {
          if (typeof _valuesEnd[property] === 'string') {
            _valuesStartRepeat[property] = _valuesStartRepeat[property] + parseFloat(_valuesEnd[property]);
          }

          if (_yoyo) {
            var tmp = _valuesStartRepeat[property];
            _valuesStartRepeat[property] = _valuesEnd[property];
            _valuesEnd[property] = tmp;
          }

          _valuesStart[property] = _valuesStartRepeat[property];
        }

        if (_yoyo) {
          _reversed = !_reversed;
        }

        if (_repeatDelayTime !== undefined) {
          _startTime = time + _repeatDelayTime;
        } else {
          _startTime = time + _delayTime;
        }

        return true;
      } else {
        if (_onCompleteCallback !== null) {
          _onCompleteCallback.call(_object, _object);
        }

        for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
          // Make the chained tweens start exactly at the time they should,
          // even if the `update()` method was called way past the duration of the tween
          _chainedTweens[i].start(_startTime + _duration);
        }

        return false;
      }
    }

    return true;
  };
};

TWEEN.Easing = {
  Linear: {
    None: function (k) {
      return k;
    }
  },
  Quadratic: {
    In: function (k) {
      return k * k;
    },
    Out: function (k) {
      return k * (2 - k);
    },
    InOut: function (k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k;
      }

      return -0.5 * (--k * (k - 2) - 1);
    }
  },
  Cubic: {
    In: function (k) {
      return k * k * k;
    },
    Out: function (k) {
      return --k * k * k + 1;
    },
    InOut: function (k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k;
      }

      return 0.5 * ((k -= 2) * k * k + 2);
    }
  },
  Quartic: {
    In: function (k) {
      return k * k * k * k;
    },
    Out: function (k) {
      return 1 - --k * k * k * k;
    },
    InOut: function (k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k * k;
      }

      return -0.5 * ((k -= 2) * k * k * k - 2);
    }
  },
  Quintic: {
    In: function (k) {
      return k * k * k * k * k;
    },
    Out: function (k) {
      return --k * k * k * k * k + 1;
    },
    InOut: function (k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k * k * k;
      }

      return 0.5 * ((k -= 2) * k * k * k * k + 2);
    }
  },
  Sinusoidal: {
    In: function (k) {
      return 1 - Math.cos(k * Math.PI / 2);
    },
    Out: function (k) {
      return Math.sin(k * Math.PI / 2);
    },
    InOut: function (k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    }
  },
  Exponential: {
    In: function (k) {
      return k === 0 ? 0 : Math.pow(1024, k - 1);
    },
    Out: function (k) {
      return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
    },
    InOut: function (k) {
      if (k === 0) {
        return 0;
      }

      if (k === 1) {
        return 1;
      }

      if ((k *= 2) < 1) {
        return 0.5 * Math.pow(1024, k - 1);
      }

      return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
    }
  },
  Circular: {
    In: function (k) {
      return 1 - Math.sqrt(1 - k * k);
    },
    Out: function (k) {
      return Math.sqrt(1 - --k * k);
    },
    InOut: function (k) {
      if ((k *= 2) < 1) {
        return -0.5 * (Math.sqrt(1 - k * k) - 1);
      }

      return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    }
  },
  Elastic: {
    In: function (k) {
      if (k === 0) {
        return 0;
      }

      if (k === 1) {
        return 1;
      }

      return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
    },
    Out: function (k) {
      if (k === 0) {
        return 0;
      }

      if (k === 1) {
        return 1;
      }

      return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
    },
    InOut: function (k) {
      if (k === 0) {
        return 0;
      }

      if (k === 1) {
        return 1;
      }

      k *= 2;

      if (k < 1) {
        return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
      }

      return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;
    }
  },
  Back: {
    In: function (k) {
      var s = 1.70158;
      return k * k * ((s + 1) * k - s);
    },
    Out: function (k) {
      var s = 1.70158;
      return --k * k * ((s + 1) * k + s) + 1;
    },
    InOut: function (k) {
      var s = 1.70158 * 1.525;

      if ((k *= 2) < 1) {
        return 0.5 * (k * k * ((s + 1) * k - s));
      }

      return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
    }
  },
  Bounce: {
    In: function (k) {
      return 1 - TWEEN.Easing.Bounce.Out(1 - k);
    },
    Out: function (k) {
      if (k < 1 / 2.75) {
        return 7.5625 * k * k;
      } else if (k < 2 / 2.75) {
        return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
      } else if (k < 2.5 / 2.75) {
        return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
      } else {
        return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
      }
    },
    InOut: function (k) {
      if (k < 0.5) {
        return TWEEN.Easing.Bounce.In(k * 2) * 0.5;
      }

      return TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
    }
  }
};
TWEEN.Interpolation = {
  Linear: function (v, k) {
    var m = v.length - 1;
    var f = m * k;
    var i = Math.floor(f);
    var fn = TWEEN.Interpolation.Utils.Linear;

    if (k < 0) {
      return fn(v[0], v[1], f);
    }

    if (k > 1) {
      return fn(v[m], v[m - 1], m - f);
    }

    return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
  },
  Bezier: function (v, k) {
    var b = 0;
    var n = v.length - 1;
    var pw = Math.pow;
    var bn = TWEEN.Interpolation.Utils.Bernstein;

    for (var i = 0; i <= n; i++) {
      b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
    }

    return b;
  },
  CatmullRom: function (v, k) {
    var m = v.length - 1;
    var f = m * k;
    var i = Math.floor(f);
    var fn = TWEEN.Interpolation.Utils.CatmullRom;

    if (v[0] === v[m]) {
      if (k < 0) {
        i = Math.floor(f = m * (1 + k));
      }

      return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
    } else {
      if (k < 0) {
        return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
      }

      if (k > 1) {
        return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
      }

      return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
    }
  },
  Utils: {
    Linear: function (p0, p1, t) {
      return (p1 - p0) * t + p0;
    },
    Bernstein: function (n, i) {
      var fc = TWEEN.Interpolation.Utils.Factorial;
      return fc(n) / fc(i) / fc(n - i);
    },
    Factorial: function () {
      var a = [1];
      return function (n) {
        var s = 1;

        if (a[n]) {
          return a[n];
        }

        for (var i = n; i > 1; i--) {
          s *= i;
        }

        a[n] = s;
        return s;
      };
    }(),
    CatmullRom: function (p0, p1, p2, p3, t) {
      var v0 = (p2 - p0) * 0.5;
      var v1 = (p3 - p1) * 0.5;
      var t2 = t * t;
      var t3 = t * t2;
      return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
    }
  }
}; // UMD (Universal Module Definition)

(function (root) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], function () {
      return TWEEN;
    });
  } else if (typeof module !== 'undefined' && typeof exports === 'object') {
    // Node.js
    module.exports = TWEEN;
  } else if (root !== undefined) {
    // Global variable
    root.TWEEN = TWEEN;
  }
})(this);//
//
//
//
//
//
window.TWEEN = TWEEN;

var __vue_render__AnimatedInteger = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {}, [_c('span', [_vm._v(_vm._s(_vm.tweeningValue))])]);
};

var __vue_staticRenderFns__AnimatedInteger = [];
var AnimatedInteger = {
  __scopeId: 'data-v-0d8d53aa',
  render: __vue_render__AnimatedInteger,
  staticRenderFns: __vue_staticRenderFns__AnimatedInteger,
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data: function () {
    return {
      tweeningValue: 188
    };
  },
  watch: {
    value: function (newValue, oldValue) {
      this.tween(oldValue, newValue);
    }
  },
  mounted: function () {
    this.tween(0, this.value);
  },
  methods: {
    tween: function (startValue, endValue) {
      var vm = this;

      function animate() {
        if (window.TWEEN.update()) {
          requestAnimationFrame(animate);
        }
      }

      new window.TWEEN.Tween({
        tweeningValue: startValue
      }).to({
        tweeningValue: endValue
      }, 1000).onUpdate(function () {
        vm.tweeningValue = this.tweeningValue.toFixed(0);
      }).start();
      animate();
    }
  }
}; // 组件注册

Vue.component('animated-integer', AnimatedInteger);//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* eslint-disable */
var __vue_render__CartPanel = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "card dzt-01"
  }, [_c('div', {
    staticClass: "card-item"
  }, [_c('div', {
    staticClass: "card-item-title"
  }, [_c('div', {
    staticClass: "text",
    on: {
      "click": function ($event) {
        return _vm.openApp();
      }
    }
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('div', {
    staticStyle: {
      "position": "absolute",
      "left": "5px",
      "display": "flex",
      "top": "8px"
    }
  }, _vm._l(_vm.tagList, function (tag, index) {
    return _c('div', {
      key: index,
      staticStyle: {
        "margin-right": "4px"
      }
    }, [_c('img', {
      attrs: {
        "src": tag.iconUrl,
        "alt": ""
      }
    })]);
  }), 0), _vm._v(" "), _c('div', {
    staticStyle: {
      "font-size": "20px",
      "height": "20px",
      "position": "absolute",
      "top": "0px",
      "right": "10px",
      "color": "#FFFFFF"
    },
    on: {
      "click": function (e) {
        return _vm.handleOpts(e);
      }
    }
  }, [_vm._v("\n        . . .\n      ")])]), _vm._v(" "), _c('div', {
    staticClass: "card-item-content",
    on: {
      "click": function ($event) {
        return _vm.openDialog();
      }
    }
  }, [_vm._t("default")], 2)])]);
};

var __vue_staticRenderFns__CartPanel = [];
var CartPanel = {
  __scopeId: 'data-v-7a8dcd31',
  render: __vue_render__CartPanel,
  staticRenderFns: __vue_staticRenderFns__CartPanel,
  name: "card-panel",
  props: {
    title: {
      type: [String, Number],
      default: "标题"
    }
  },
  components: {},

  async mounted() {
    const sublist = await xm.getStorage({
      key: "shenzhen-ioc-sublist"
    });
    console.log("sublist: ", sublist);

    if (sublist) {
      console.log("%c [appcube 环境执行取缓存操作]", "color: green;", sublist); // const sublistArr = JSON.parse(sublist["shenzhen-ioc-sublist"]);

      const sublistArr = JSON.parse(sublist);
      const currentWidgetId = this.$parent.getCurrentWidgetId();
      console.log('currentWidgetId: ', currentWidgetId);
      const currentListItem = sublistArr.filter(s => s.cardId).find(x => x.cardId === currentWidgetId);
      const cardFrontTagList = currentListItem.config && currentListItem.config.cardFrontTagList || [];
      console.log('cardFrontTagList: ', cardFrontTagList);

      if (cardFrontTagList) {
        this.tagList = cardFrontTagList.filter(x => x.name && this.belowTime(x.showLabelStartTime, x.showLabelEndTime)) || [];
      }

      console.log(this.tagList, 'this.tagList');
    } else {
      console.log("%c [不在 appcube 环境]", "color: red;");
    }
  },

  data() {
    return {
      newShow: false,
      tagList: []
    };
  },

  methods: {
    belowTime(s, e) {
      let is = false;
      const now = new Date().getTime();
      const start = new Date(s).getTime();
      const end = new Date(e).getTime();

      if (now >= start && now <= end) {
        is = true;
      }

      return is;
    },

    openDialog() {
      window.xm.native("openModal", {
        url: "http://www.baidu.com",
        width: 1000,
        height: 800,
        showMask: true
      });
    },

    openApp() {
      window.xm.openApp({
        appid: 28261855,
        showheaderbar: true
      });
    },

    handleOpts(e) {
      // 订阅
      window.xmcard.tvSubUnsub({
        widgetThis: this.$parent.getWidgetThis(),
        // todo
        label: this.title,
        widgetType: this.$parent.getCurrentWidgetId(),
        // id: 90782941,
        appName: '党政通测试01',
        tenantId: '0000000000gujuJSLgo5',
        // https://172.26.98.170:32744/studio/index.html#/admin/上拿的
        domain: 'https://172.26.98.170:32744'
      }, e.target.getBoundingClientRect()); // 本质就是传入这个对象 { width, height, left, top }，用来定位操作面板的位置

      document.querySelectorAll('.tv-panel__item')[0].style.display = 'none'; // document.querySelectorAll('.tv-panel__item')[1].addEventListener('click', () => {
      //   document.querySelector('.tv-panel').style.display = 'none'
      // })
    }

  }
}; // 组件注册

Vue.component('cart-panel', CartPanel);

  return extend.call(StudioWidgetWrapper,
  {
      /*
       * Triggered when initializing a widget and will have the code that invokes rendering of the widget
       * setParentContainer(JQueryParentContainerDOM) - binds event to this container
       * setItemContainer(JQueryItemContainerDOM) - binds studio item events for respective item containers
       * bindEvents() - binds the studio event to this widget
       */
      init: function()
      {
          var thisObj = this;
          thisObj._super.apply(thisObj, arguments);
          thisObj.render();
          if ((typeof(Studio) != "undefined") && Studio)
          {

          }
      },

      /*
       * Triggered from init method and is used to render the widget
       */
      render: function()
      {
          var thisObj = this;
          var widgetProperties = ctx.widgetProperties = thisObj.getProperties();
          var elem = thisObj.getContainer();
          var items = thisObj.getItems();
          var connectorProperties = thisObj.getConnectorProperties();

          /*
           * API to get base path of your uploaded widget API file
           */
          var widgetBasePath = ctx.widgetBasePath = thisObj.getWidgetBasePath();
          ctx.getConnectorInstanceByName = function (boid) {
            return thisObj.getConnectorInstanceByName(boid)
          }
          if (elem)
          {
              var containerDiv = $(".scfClientRenderedContainer", elem);
              if (containerDiv.length)
              {
                  $(containerDiv).empty();
              }
              else
              {
                  containerDiv = document.createElement('div');
                  containerDiv.className = "scfClientRenderedContainer";
                  $(elem).append(containerDiv);
              }

        //       var vm = new Vue({
        // 	el: $("#widgetVueTemplate",elem)[0],
        // 	data:{
        // 		name: "Bingo Studio"
        // 	}
        // });
            const p1 = 'data:image/png;base64,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';
const p2 = 'data:image/png;base64,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';
const p3 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhklEQVRIS+2Tz0sCURDHZ3ZN0YNZ0CGMQDDKH2DisyQ85KFLQUSI/0mXTtatS3+ISQTdukREIqiZBppsEGF0qCBBhXR5O7H+Yj0tBEKHndvMd97MvM+8hzBhwwnXB6OBLmED0T9CdE1kspdq+5y4rd2AdCzma2nHkyTJ8t3qxkUUcXbakna5XD9aPZ/P20iwxUGE7kuNzhMJX1fVR0vOFatnABTvHSK4Z0HPGiLyYZFcsXIFAFsD/yYc9G4OtWSShO296h0SRHoxxMvwqmd31CCbzdpFi72hbcgVZJGQp6AmZUvSgqjIde3EskJLGyHfsxrL5Sp+MMGjVkcuzjG2/NW7QSqVEl1ufx0Q5gdJHbNgXgwE3B+qn8lkrFNWxzsAOPoTQrPTEpzR6EpTdcvl15kOb78BgK0v4yfwtpMxJo8QFUpShCvyKQJYEeCIBb0XY4wfnmJE/IQIBUHAQ7bqUZGNLF+s7ADCMRHIikIH6yHf7dgOdN/bHxOMn6wLzkBkINIloJvwCzPAfxmdft0KAAAAAElFTkSuQmCC';
const p4 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAACTUlEQVQ4T62UT2jTYBjGnzdro675ujkRPDgVvG3+OQxtAx50ingqoiCCgqDILk3V4WEeBoMdtoNUSIogouBFvDiGXoaIeBCTWoroVHZRcIqn4Z8mndisfSWtqVnXjh2aY773+eV7n/fJS2jzQ614A5Pfu8KKfBwVPkBEvV4dM3+BRC9cpzSdH+n51Uy7Ajhwi8NyyRkBcJUBhRjvQPhYFTN2MmEXAQ6A6yVZmcwPkRsELwPunvi5MRLpeESEGIMzzKF0NtX5NSiI6YtbiZaGCZRkRrZYLCdmr3X/8GvqQO9m4T/OMyL0MXDS0sTz1eyNG/ZBAh4y44O7Thn0b1oHqoY9CmCUgaNBWFx3jgB8iojkCvFMNike+B/6B30CYNzUxLj3vgr0BiBHwvMMvmNp0eH/gkKCQFNgug/iEAOnAVyyNGEEatIEulAqutu8QVWB8YxzDsx3mTu2Bz1TdXsaYMlMRRNenarbT1mCZCXFoA+seVr+DKLzVlK5VwPq9m0C9pspsTfo276M3V9Zcu385Z75HWO8fssm5y2AnKWJM8E6VbffMPDKSomLVaBqODMAL5qaONFsEGqaNyBUfMzE/QQ+ZGrRuWVAw54CqNPUlGNrA+r2DZZwtuyWY7kr3Z8aP6o2Alu17AtVw34JYNbUxFDTDhpbbjWUuvE3nT2l8u+F19rmb43ApkNpFRtP3Df2Xu7q6V0AKGemxOFGYNworIxNbTDNg107K0wwSXNeLILAlsGuhrvdv54Hbety8Ftp6/oK+tO2BbvaylrL2V8jKFkkqwzsqgAAAABJRU5ErkJggg==';
thisObj.vm = new Vue({
  el: $(".dzt-01", elem)[0],
  name: 'dzt-01',
  components: {
    CartPanel,
    AnimatedInteger
  },

  data() {
    return {
      widgetBasePath,
      widgetProperties,
      areaOptions: {},
      areaList: [],
      current: {},
      barOptions: {},
      p1: p1,
      p2: p2,
      p3: p3,
      p4: p4,
      num1: 199
    };
  },

  methods: {
    getCurrentWidgetId() {
      // eslint-disable-next-line no-undef
      return thisObj.widget.widgetType;
    },

    getWidgetThis() {
      // eslint-disable-next-line no-undef
      return thisObj;
    }

  },

  mounted() {
    console.log('12/8 11-42');
    let i = 0;
    setInterval(() => {
      window.xm.fetch('https://www.baidu.com', {}).then(res => {
        i += 1;
        this.num1 = res.status + Math.random() * 999 + i;
      });
    }, 30000);
  }

});
          }

          /*
           * API to bind global events to the item DOM :
           *  thisObj.sksBindItemEvent();
           *
           * API to bind item events to the item DOM :
           *  thisObj.sksBindItemEvent(JQueryItemContainerSelector, ItemIdx);
           * JQueryItemContainerSelector - A JQuery selector that returns an array of DOMs that represents the individual item inside the item container, to which the hotspot needs to be bound.
           * ItemIdx (Optional) - To bind the item events to a specific item.
           */
          thisObj.sksBindItemEvent();

          /*
           * API to refresh the previously bound events when a resize or orientation change occurs.
           *  thisObj.sksRefreshEvents(ItemIdx);
           * ItemIdx (Optional) - To refresh events for a specific item. Default value is 0.
           */
          $(window).resize(function()
          {
              thisObj.sksRefreshEvents();
          });
      }
  });
});
