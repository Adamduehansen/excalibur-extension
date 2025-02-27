/**
 * @license
 * author: Nikolay Ryabov
 * flame-chart-js v3.2.1
 * Released under the MIT license.
 */
!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t(exports)
    : 'function' == typeof define && define.amd
      ? define(['exports'], t)
      : t(((e = 'undefined' != typeof globalThis ? globalThis : e || self).flameChartJs = e.flameChartJs || {}));
})(this, function (e) {
  'use strict';
  function t() {}
  function i() {
    i.init.call(this);
  }
  function n(e) {
    return void 0 === e._maxListeners ? i.defaultMaxListeners : e._maxListeners;
  }
  function s(e, i, s, r) {
    var o, h, a, l;
    if ('function' != typeof s) throw new TypeError('"listener" argument must be a function');
    if (
      ((h = e._events)
        ? (h.newListener && (e.emit('newListener', i, s.listener ? s.listener : s), (h = e._events)), (a = h[i]))
        : ((h = e._events = new t()), (e._eventsCount = 0)),
      a)
    ) {
      if (
        ('function' == typeof a ? (a = h[i] = r ? [s, a] : [a, s]) : r ? a.unshift(s) : a.push(s),
        !a.warned && (o = n(e)) && o > 0 && a.length > o)
      ) {
        a.warned = !0;
        var c = new Error(
          'Possible EventEmitter memory leak detected. ' +
            a.length +
            ' ' +
            i +
            ' listeners added. Use emitter.setMaxListeners() to increase limit'
        );
        (c.name = 'MaxListenersExceededWarning'),
          (c.emitter = e),
          (c.type = i),
          (c.count = a.length),
          (l = c),
          'function' == typeof console.warn ? console.warn(l) : console.log(l);
      }
    } else (a = h[i] = s), ++e._eventsCount;
    return e;
  }
  function r(e, t, i) {
    var n = !1;
    function s() {
      e.removeListener(t, s), n || ((n = !0), i.apply(e, arguments));
    }
    return (s.listener = i), s;
  }
  function o(e) {
    var t = this._events;
    if (t) {
      var i = t[e];
      if ('function' == typeof i) return 1;
      if (i) return i.length;
    }
    return 0;
  }
  function h(e, t) {
    for (var i = new Array(t); t--; ) i[t] = e[t];
    return i;
  }
  (t.prototype = Object.create(null)),
    (i.usingDomains = !1),
    (i.prototype.domain = void 0),
    (i.prototype._events = void 0),
    (i.prototype._maxListeners = void 0),
    (i.defaultMaxListeners = 10),
    (i.init = function () {
      (this.domain = null),
        i.usingDomains && undefined.active,
        (this._events && this._events !== Object.getPrototypeOf(this)._events) || ((this._events = new t()), (this._eventsCount = 0)),
        (this._maxListeners = this._maxListeners || void 0);
    }),
    (i.prototype.setMaxListeners = function (e) {
      if ('number' != typeof e || e < 0 || isNaN(e)) throw new TypeError('"n" argument must be a positive number');
      return (this._maxListeners = e), this;
    }),
    (i.prototype.getMaxListeners = function () {
      return n(this);
    }),
    (i.prototype.emit = function (e) {
      var t,
        i,
        n,
        s,
        r,
        o,
        a,
        l = 'error' === e;
      if ((o = this._events)) l = l && null == o.error;
      else if (!l) return !1;
      if (((a = this.domain), l)) {
        if (((t = arguments[1]), !a)) {
          if (t instanceof Error) throw t;
          var c = new Error('Uncaught, unspecified "error" event. (' + t + ')');
          throw ((c.context = t), c);
        }
        return (
          t || (t = new Error('Uncaught, unspecified "error" event')),
          (t.domainEmitter = this),
          (t.domain = a),
          (t.domainThrown = !1),
          a.emit('error', t),
          !1
        );
      }
      if (!(i = o[e])) return !1;
      var d = 'function' == typeof i;
      switch ((n = arguments.length)) {
        case 1:
          !(function (e, t, i) {
            if (t) e.call(i);
            else for (var n = e.length, s = h(e, n), r = 0; r < n; ++r) s[r].call(i);
          })(i, d, this);
          break;
        case 2:
          !(function (e, t, i, n) {
            if (t) e.call(i, n);
            else for (var s = e.length, r = h(e, s), o = 0; o < s; ++o) r[o].call(i, n);
          })(i, d, this, arguments[1]);
          break;
        case 3:
          !(function (e, t, i, n, s) {
            if (t) e.call(i, n, s);
            else for (var r = e.length, o = h(e, r), a = 0; a < r; ++a) o[a].call(i, n, s);
          })(i, d, this, arguments[1], arguments[2]);
          break;
        case 4:
          !(function (e, t, i, n, s, r) {
            if (t) e.call(i, n, s, r);
            else for (var o = e.length, a = h(e, o), l = 0; l < o; ++l) a[l].call(i, n, s, r);
          })(i, d, this, arguments[1], arguments[2], arguments[3]);
          break;
        default:
          for (s = new Array(n - 1), r = 1; r < n; r++) s[r - 1] = arguments[r];
          !(function (e, t, i, n) {
            if (t) e.apply(i, n);
            else for (var s = e.length, r = h(e, s), o = 0; o < s; ++o) r[o].apply(i, n);
          })(i, d, this, s);
      }
      return !0;
    }),
    (i.prototype.addListener = function (e, t) {
      return s(this, e, t, !1);
    }),
    (i.prototype.on = i.prototype.addListener),
    (i.prototype.prependListener = function (e, t) {
      return s(this, e, t, !0);
    }),
    (i.prototype.once = function (e, t) {
      if ('function' != typeof t) throw new TypeError('"listener" argument must be a function');
      return this.on(e, r(this, e, t)), this;
    }),
    (i.prototype.prependOnceListener = function (e, t) {
      if ('function' != typeof t) throw new TypeError('"listener" argument must be a function');
      return this.prependListener(e, r(this, e, t)), this;
    }),
    (i.prototype.removeListener = function (e, i) {
      var n, s, r, o, h;
      if ('function' != typeof i) throw new TypeError('"listener" argument must be a function');
      if (!(s = this._events)) return this;
      if (!(n = s[e])) return this;
      if (n === i || (n.listener && n.listener === i))
        0 == --this._eventsCount
          ? (this._events = new t())
          : (delete s[e], s.removeListener && this.emit('removeListener', e, n.listener || i));
      else if ('function' != typeof n) {
        for (r = -1, o = n.length; o-- > 0; )
          if (n[o] === i || (n[o].listener && n[o].listener === i)) {
            (h = n[o].listener), (r = o);
            break;
          }
        if (r < 0) return this;
        if (1 === n.length) {
          if (((n[0] = void 0), 0 == --this._eventsCount)) return (this._events = new t()), this;
          delete s[e];
        } else
          !(function (e, t) {
            for (var i = t, n = i + 1, s = e.length; n < s; i += 1, n += 1) e[i] = e[n];
            e.pop();
          })(n, r);
        s.removeListener && this.emit('removeListener', e, h || i);
      }
      return this;
    }),
    (i.prototype.removeAllListeners = function (e) {
      var i, n;
      if (!(n = this._events)) return this;
      if (!n.removeListener)
        return (
          0 === arguments.length
            ? ((this._events = new t()), (this._eventsCount = 0))
            : n[e] && (0 == --this._eventsCount ? (this._events = new t()) : delete n[e]),
          this
        );
      if (0 === arguments.length) {
        for (var s, r = Object.keys(n), o = 0; o < r.length; ++o) 'removeListener' !== (s = r[o]) && this.removeAllListeners(s);
        return this.removeAllListeners('removeListener'), (this._events = new t()), (this._eventsCount = 0), this;
      }
      if ('function' == typeof (i = n[e])) this.removeListener(e, i);
      else if (i)
        do {
          this.removeListener(e, i[i.length - 1]);
        } while (i[0]);
      return this;
    }),
    (i.prototype.listeners = function (e) {
      var t,
        i = this._events;
      return i && (t = i[e])
        ? 'function' == typeof t
          ? [t.listener || t]
          : (function (e) {
              for (var t = new Array(e.length), i = 0; i < t.length; ++i) t[i] = e[i].listener || e[i];
              return t;
            })(t)
        : [];
    }),
    (i.listenerCount = function (e, t) {
      return 'function' == typeof e.listenerCount ? e.listenerCount(t) : o.call(e, t);
    }),
    (i.prototype.listenerCount = o),
    (i.prototype.eventNames = function () {
      return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
    });
  class a extends i {
    constructor(e) {
      super(), (this.name = e);
    }
    get fullHeight() {
      return 'number' == typeof this.height ? this.height : 0;
    }
    init(e, t) {
      (this.renderEngine = e), (this.interactionsEngine = t);
    }
  }
  const l = (e, t = {}) => Object.keys(e).reduce((i, n) => (t[n] ? (i[n] = t[n]) : (i[n] = e[n]), i), {}),
    c = (e) => 'number' == typeof e,
    d = (e) => e[e.length - 1],
    g = (e, t, i) => {
      const n = (e * Math.SQRT2) / 2;
      let s = [];
      switch (i) {
        case 'top':
          s = [
            { x: 0, y: t },
            { x: e / 2, y: 0 },
            { x: e, y: t }
          ];
          break;
        case 'bottom':
          s = [
            { x: 0, y: 0 },
            { x: e, y: 0 },
            { x: e / 2, y: t }
          ];
          break;
        case 'left':
          s = [
            { x: t, y: 0 },
            { x: t, y: e },
            { x: 0, y: e / 2 }
          ];
          break;
        case 'right':
          s = [
            { x: 0, y: 0 },
            { x: 0, y: e },
            { x: t, y: e / 2 }
          ];
          break;
        case 'top-left':
          s = [
            { x: 0, y: 0 },
            { x: n, y: 0 },
            { x: 0, y: n }
          ];
          break;
        case 'top-right':
          s = [
            { x: 0, y: 0 },
            { x: n, y: 0 },
            { x: n, y: n }
          ];
          break;
        case 'bottom-left':
          s = [
            { x: 0, y: 0 },
            { x: 0, y: n },
            { x: n, y: n }
          ];
          break;
        case 'bottom-right':
          s = [
            { x: n, y: 0 },
            { x: 0, y: n },
            { x: n, y: n }
          ];
      }
      return s;
    },
    u = (e, t, i = null, n = 0) => {
      e.forEach((e) => {
        const s = t(e, i, n);
        e.children && u(e.children, t, s || e, n + 1);
      });
    },
    f = (e) => {
      const t = [];
      let i = 0;
      return (
        u(e, (e, n, s) => {
          const r = { source: e, end: e.start + e.duration, parent: n, level: s, index: i++ };
          return t.push(r), r;
        }),
        t.sort((e, t) => e.level - t.level || e.source.start - t.source.start)
      );
    },
    m = (e) => {
      let t = !0,
        i = 0,
        n = 0;
      return (
        e.forEach(({ source: { start: e }, end: s }) => {
          t ? ((i = e), (n = s), (t = !1)) : ((i = i < e ? i : e), (n = n > s ? n : s));
        }),
        { min: i, max: n }
      );
    },
    p = (e, t, i) => (e.source.start < i && e.end > t) || (e.source.start > t && e.end < i),
    y = (e, t) => e.source.color === t.source.color && e.source.pattern === t.source.pattern && e.source.type === t.source.type;
  function v(e, t = y) {
    return e
      .reduce((e, i) => {
        const n = d(e),
          s = n && d(n);
        return s && s.level === i.level && t(s, i) ? n.push(i) : e.push([i]), e;
      }, [])
      .filter((e) => e.length)
      .map((e) => ({ nodes: e }));
  }
  const x = (e, t, i = 0, n = 0, s = 0.25, r = 1) => {
      let o = null,
        h = null,
        a = 0;
      return e
        .reduce((e, { nodes: l }) => {
          (o = null), (h = null), (a = 0);
          for (const c of l)
            p(c, i, n) &&
              ((o && !h) ||
              (o &&
                h &&
                (c.source.start - (h.source.start + h.source.duration)) * t < s &&
                c.source.duration * t < r &&
                h.source.duration * t < r)
                ? ((o[a] = c), a++)
                : ((o = [c]), (a = 1), e.push(o)),
              (h = c));
          return e;
        }, [])
        .map((e) => {
          var t;
          const i = e[0],
            n = ((e) => {
              const t = e[0],
                i = d(e);
              return i.source.start + i.source.duration - t.source.start;
            })(e),
            s = null === (t = e.find((e) => e.source.badge)) || void 0 === t ? void 0 : t.source.badge;
          return {
            start: i.source.start,
            end: i.source.start + n,
            duration: n,
            type: i.source.type,
            color: i.source.color,
            pattern: i.source.pattern,
            level: i.level,
            badge: s,
            nodes: e
          };
        });
    },
    b = (e, t, i, n, s, r) =>
      e.reduce(
        (e, o) => (
          ((e, t, i) => (e.start < i && e.end > t) || (e.start > t && e.end < i))(o, i, n) &&
            (o.duration * t <= 2.25 ? e.push(o) : e.push(...x([o], t, i, n, s, r))),
          e
        ),
        []
      );
  function E(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e;
  }
  var w = { exports: {} },
    M = {
      aliceblue: [240, 248, 255],
      antiquewhite: [250, 235, 215],
      aqua: [0, 255, 255],
      aquamarine: [127, 255, 212],
      azure: [240, 255, 255],
      beige: [245, 245, 220],
      bisque: [255, 228, 196],
      black: [0, 0, 0],
      blanchedalmond: [255, 235, 205],
      blue: [0, 0, 255],
      blueviolet: [138, 43, 226],
      brown: [165, 42, 42],
      burlywood: [222, 184, 135],
      cadetblue: [95, 158, 160],
      chartreuse: [127, 255, 0],
      chocolate: [210, 105, 30],
      coral: [255, 127, 80],
      cornflowerblue: [100, 149, 237],
      cornsilk: [255, 248, 220],
      crimson: [220, 20, 60],
      cyan: [0, 255, 255],
      darkblue: [0, 0, 139],
      darkcyan: [0, 139, 139],
      darkgoldenrod: [184, 134, 11],
      darkgray: [169, 169, 169],
      darkgreen: [0, 100, 0],
      darkgrey: [169, 169, 169],
      darkkhaki: [189, 183, 107],
      darkmagenta: [139, 0, 139],
      darkolivegreen: [85, 107, 47],
      darkorange: [255, 140, 0],
      darkorchid: [153, 50, 204],
      darkred: [139, 0, 0],
      darksalmon: [233, 150, 122],
      darkseagreen: [143, 188, 143],
      darkslateblue: [72, 61, 139],
      darkslategray: [47, 79, 79],
      darkslategrey: [47, 79, 79],
      darkturquoise: [0, 206, 209],
      darkviolet: [148, 0, 211],
      deeppink: [255, 20, 147],
      deepskyblue: [0, 191, 255],
      dimgray: [105, 105, 105],
      dimgrey: [105, 105, 105],
      dodgerblue: [30, 144, 255],
      firebrick: [178, 34, 34],
      floralwhite: [255, 250, 240],
      forestgreen: [34, 139, 34],
      fuchsia: [255, 0, 255],
      gainsboro: [220, 220, 220],
      ghostwhite: [248, 248, 255],
      gold: [255, 215, 0],
      goldenrod: [218, 165, 32],
      gray: [128, 128, 128],
      green: [0, 128, 0],
      greenyellow: [173, 255, 47],
      grey: [128, 128, 128],
      honeydew: [240, 255, 240],
      hotpink: [255, 105, 180],
      indianred: [205, 92, 92],
      indigo: [75, 0, 130],
      ivory: [255, 255, 240],
      khaki: [240, 230, 140],
      lavender: [230, 230, 250],
      lavenderblush: [255, 240, 245],
      lawngreen: [124, 252, 0],
      lemonchiffon: [255, 250, 205],
      lightblue: [173, 216, 230],
      lightcoral: [240, 128, 128],
      lightcyan: [224, 255, 255],
      lightgoldenrodyellow: [250, 250, 210],
      lightgray: [211, 211, 211],
      lightgreen: [144, 238, 144],
      lightgrey: [211, 211, 211],
      lightpink: [255, 182, 193],
      lightsalmon: [255, 160, 122],
      lightseagreen: [32, 178, 170],
      lightskyblue: [135, 206, 250],
      lightslategray: [119, 136, 153],
      lightslategrey: [119, 136, 153],
      lightsteelblue: [176, 196, 222],
      lightyellow: [255, 255, 224],
      lime: [0, 255, 0],
      limegreen: [50, 205, 50],
      linen: [250, 240, 230],
      magenta: [255, 0, 255],
      maroon: [128, 0, 0],
      mediumaquamarine: [102, 205, 170],
      mediumblue: [0, 0, 205],
      mediumorchid: [186, 85, 211],
      mediumpurple: [147, 112, 219],
      mediumseagreen: [60, 179, 113],
      mediumslateblue: [123, 104, 238],
      mediumspringgreen: [0, 250, 154],
      mediumturquoise: [72, 209, 204],
      mediumvioletred: [199, 21, 133],
      midnightblue: [25, 25, 112],
      mintcream: [245, 255, 250],
      mistyrose: [255, 228, 225],
      moccasin: [255, 228, 181],
      navajowhite: [255, 222, 173],
      navy: [0, 0, 128],
      oldlace: [253, 245, 230],
      olive: [128, 128, 0],
      olivedrab: [107, 142, 35],
      orange: [255, 165, 0],
      orangered: [255, 69, 0],
      orchid: [218, 112, 214],
      palegoldenrod: [238, 232, 170],
      palegreen: [152, 251, 152],
      paleturquoise: [175, 238, 238],
      palevioletred: [219, 112, 147],
      papayawhip: [255, 239, 213],
      peachpuff: [255, 218, 185],
      peru: [205, 133, 63],
      pink: [255, 192, 203],
      plum: [221, 160, 221],
      powderblue: [176, 224, 230],
      purple: [128, 0, 128],
      rebeccapurple: [102, 51, 153],
      red: [255, 0, 0],
      rosybrown: [188, 143, 143],
      royalblue: [65, 105, 225],
      saddlebrown: [139, 69, 19],
      salmon: [250, 128, 114],
      sandybrown: [244, 164, 96],
      seagreen: [46, 139, 87],
      seashell: [255, 245, 238],
      sienna: [160, 82, 45],
      silver: [192, 192, 192],
      skyblue: [135, 206, 235],
      slateblue: [106, 90, 205],
      slategray: [112, 128, 144],
      slategrey: [112, 128, 144],
      snow: [255, 250, 250],
      springgreen: [0, 255, 127],
      steelblue: [70, 130, 180],
      tan: [210, 180, 140],
      teal: [0, 128, 128],
      thistle: [216, 191, 216],
      tomato: [255, 99, 71],
      turquoise: [64, 224, 208],
      violet: [238, 130, 238],
      wheat: [245, 222, 179],
      white: [255, 255, 255],
      whitesmoke: [245, 245, 245],
      yellow: [255, 255, 0],
      yellowgreen: [154, 205, 50]
    },
    C = { exports: {} },
    k = function (e) {
      return (
        !(!e || 'string' == typeof e) &&
        (e instanceof Array ||
          Array.isArray(e) ||
          (e.length >= 0 &&
            (e.splice instanceof Function || (Object.getOwnPropertyDescriptor(e, e.length - 1) && 'String' !== e.constructor.name))))
      );
    },
    R = Array.prototype.concat,
    P = Array.prototype.slice,
    T = (C.exports = function (e) {
      for (var t = [], i = 0, n = e.length; i < n; i++) {
        var s = e[i];
        k(s) ? (t = R.call(t, P.call(s))) : t.push(s);
      }
      return t;
    });
  T.wrap = function (e) {
    return function () {
      return e(T(arguments));
    };
  };
  var S = C.exports,
    L = M,
    z = S,
    H = Object.hasOwnProperty,
    F = Object.create(null);
  for (var D in L) H.call(L, D) && (F[L[D]] = D);
  var A = (w.exports = { to: {}, get: {} });
  function O(e, t, i) {
    return Math.min(Math.max(t, e), i);
  }
  function G(e) {
    var t = Math.round(e).toString(16).toUpperCase();
    return t.length < 2 ? '0' + t : t;
  }
  (A.get = function (e) {
    var t, i;
    switch (e.substring(0, 3).toLowerCase()) {
      case 'hsl':
        (t = A.get.hsl(e)), (i = 'hsl');
        break;
      case 'hwb':
        (t = A.get.hwb(e)), (i = 'hwb');
        break;
      default:
        (t = A.get.rgb(e)), (i = 'rgb');
    }
    return t ? { model: i, value: t } : null;
  }),
    (A.get.rgb = function (e) {
      if (!e) return null;
      var t,
        i,
        n,
        s = [0, 0, 0, 1];
      if ((t = e.match(/^#([a-f0-9]{6})([a-f0-9]{2})?$/i))) {
        for (n = t[2], t = t[1], i = 0; i < 3; i++) {
          var r = 2 * i;
          s[i] = parseInt(t.slice(r, r + 2), 16);
        }
        n && (s[3] = parseInt(n, 16) / 255);
      } else if ((t = e.match(/^#([a-f0-9]{3,4})$/i))) {
        for (n = (t = t[1])[3], i = 0; i < 3; i++) s[i] = parseInt(t[i] + t[i], 16);
        n && (s[3] = parseInt(n + n, 16) / 255);
      } else if (
        (t = e.match(
          /^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/
        ))
      ) {
        for (i = 0; i < 3; i++) s[i] = parseInt(t[i + 1], 0);
        t[4] && (t[5] ? (s[3] = 0.01 * parseFloat(t[4])) : (s[3] = parseFloat(t[4])));
      } else {
        if (
          !(t = e.match(
            /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/
          ))
        )
          return (t = e.match(/^(\w+)$/))
            ? 'transparent' === t[1]
              ? [0, 0, 0, 0]
              : H.call(L, t[1])
                ? (((s = L[t[1]])[3] = 1), s)
                : null
            : null;
        for (i = 0; i < 3; i++) s[i] = Math.round(2.55 * parseFloat(t[i + 1]));
        t[4] && (t[5] ? (s[3] = 0.01 * parseFloat(t[4])) : (s[3] = parseFloat(t[4])));
      }
      for (i = 0; i < 3; i++) s[i] = O(s[i], 0, 255);
      return (s[3] = O(s[3], 0, 1)), s;
    }),
    (A.get.hsl = function (e) {
      if (!e) return null;
      var t = e.match(
        /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/
      );
      if (t) {
        var i = parseFloat(t[4]);
        return [
          ((parseFloat(t[1]) % 360) + 360) % 360,
          O(parseFloat(t[2]), 0, 100),
          O(parseFloat(t[3]), 0, 100),
          O(isNaN(i) ? 1 : i, 0, 1)
        ];
      }
      return null;
    }),
    (A.get.hwb = function (e) {
      if (!e) return null;
      var t = e.match(
        /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/
      );
      if (t) {
        var i = parseFloat(t[4]);
        return [
          ((parseFloat(t[1]) % 360) + 360) % 360,
          O(parseFloat(t[2]), 0, 100),
          O(parseFloat(t[3]), 0, 100),
          O(isNaN(i) ? 1 : i, 0, 1)
        ];
      }
      return null;
    }),
    (A.to.hex = function () {
      var e = z(arguments);
      return '#' + G(e[0]) + G(e[1]) + G(e[2]) + (e[3] < 1 ? G(Math.round(255 * e[3])) : '');
    }),
    (A.to.rgb = function () {
      var e = z(arguments);
      return e.length < 4 || 1 === e[3]
        ? 'rgb(' + Math.round(e[0]) + ', ' + Math.round(e[1]) + ', ' + Math.round(e[2]) + ')'
        : 'rgba(' + Math.round(e[0]) + ', ' + Math.round(e[1]) + ', ' + Math.round(e[2]) + ', ' + e[3] + ')';
    }),
    (A.to.rgb.percent = function () {
      var e = z(arguments),
        t = Math.round((e[0] / 255) * 100),
        i = Math.round((e[1] / 255) * 100),
        n = Math.round((e[2] / 255) * 100);
      return e.length < 4 || 1 === e[3]
        ? 'rgb(' + t + '%, ' + i + '%, ' + n + '%)'
        : 'rgba(' + t + '%, ' + i + '%, ' + n + '%, ' + e[3] + ')';
    }),
    (A.to.hsl = function () {
      var e = z(arguments);
      return e.length < 4 || 1 === e[3]
        ? 'hsl(' + e[0] + ', ' + e[1] + '%, ' + e[2] + '%)'
        : 'hsla(' + e[0] + ', ' + e[1] + '%, ' + e[2] + '%, ' + e[3] + ')';
    }),
    (A.to.hwb = function () {
      var e = z(arguments),
        t = '';
      return e.length >= 4 && 1 !== e[3] && (t = ', ' + e[3]), 'hwb(' + e[0] + ', ' + e[1] + '%, ' + e[2] + '%' + t + ')';
    }),
    (A.to.keyword = function (e) {
      return F[e.slice(0, 3)];
    });
  var X = w.exports,
    I = { exports: {} },
    V = M,
    U = {};
  for (var W in V) V.hasOwnProperty(W) && (U[V[W]] = W);
  var N = (I.exports = {
    rgb: { channels: 3, labels: 'rgb' },
    hsl: { channels: 3, labels: 'hsl' },
    hsv: { channels: 3, labels: 'hsv' },
    hwb: { channels: 3, labels: 'hwb' },
    cmyk: { channels: 4, labels: 'cmyk' },
    xyz: { channels: 3, labels: 'xyz' },
    lab: { channels: 3, labels: 'lab' },
    lch: { channels: 3, labels: 'lch' },
    hex: { channels: 1, labels: ['hex'] },
    keyword: { channels: 1, labels: ['keyword'] },
    ansi16: { channels: 1, labels: ['ansi16'] },
    ansi256: { channels: 1, labels: ['ansi256'] },
    hcg: { channels: 3, labels: ['h', 'c', 'g'] },
    apple: { channels: 3, labels: ['r16', 'g16', 'b16'] },
    gray: { channels: 1, labels: ['gray'] }
  });
  for (var j in N)
    if (N.hasOwnProperty(j)) {
      if (!('channels' in N[j])) throw new Error('missing channels property: ' + j);
      if (!('labels' in N[j])) throw new Error('missing channel labels property: ' + j);
      if (N[j].labels.length !== N[j].channels) throw new Error('channel and label counts mismatch: ' + j);
      var _ = N[j].channels,
        Y = N[j].labels;
      delete N[j].channels,
        delete N[j].labels,
        Object.defineProperty(N[j], 'channels', { value: _ }),
        Object.defineProperty(N[j], 'labels', { value: Y });
    }
  (N.rgb.hsl = function (e) {
    var t,
      i,
      n = e[0] / 255,
      s = e[1] / 255,
      r = e[2] / 255,
      o = Math.min(n, s, r),
      h = Math.max(n, s, r),
      a = h - o;
    return (
      h === o ? (t = 0) : n === h ? (t = (s - r) / a) : s === h ? (t = 2 + (r - n) / a) : r === h && (t = 4 + (n - s) / a),
      (t = Math.min(60 * t, 360)) < 0 && (t += 360),
      (i = (o + h) / 2),
      [t, 100 * (h === o ? 0 : i <= 0.5 ? a / (h + o) : a / (2 - h - o)), 100 * i]
    );
  }),
    (N.rgb.hsv = function (e) {
      var t,
        i,
        n,
        s,
        r,
        o = e[0] / 255,
        h = e[1] / 255,
        a = e[2] / 255,
        l = Math.max(o, h, a),
        c = l - Math.min(o, h, a),
        d = function (e) {
          return (l - e) / 6 / c + 0.5;
        };
      return (
        0 === c
          ? (s = r = 0)
          : ((r = c / l),
            (t = d(o)),
            (i = d(h)),
            (n = d(a)),
            o === l ? (s = n - i) : h === l ? (s = 1 / 3 + t - n) : a === l && (s = 2 / 3 + i - t),
            s < 0 ? (s += 1) : s > 1 && (s -= 1)),
        [360 * s, 100 * r, 100 * l]
      );
    }),
    (N.rgb.hwb = function (e) {
      var t = e[0],
        i = e[1],
        n = e[2];
      return [N.rgb.hsl(e)[0], 100 * ((1 / 255) * Math.min(t, Math.min(i, n))), 100 * (n = 1 - (1 / 255) * Math.max(t, Math.max(i, n)))];
    }),
    (N.rgb.cmyk = function (e) {
      var t,
        i = e[0] / 255,
        n = e[1] / 255,
        s = e[2] / 255;
      return [
        100 * ((1 - i - (t = Math.min(1 - i, 1 - n, 1 - s))) / (1 - t) || 0),
        100 * ((1 - n - t) / (1 - t) || 0),
        100 * ((1 - s - t) / (1 - t) || 0),
        100 * t
      ];
    }),
    (N.rgb.keyword = function (e) {
      var t = U[e];
      if (t) return t;
      var i,
        n,
        s,
        r = 1 / 0;
      for (var o in V)
        if (V.hasOwnProperty(o)) {
          var h = V[o],
            a = ((n = e), (s = h), Math.pow(n[0] - s[0], 2) + Math.pow(n[1] - s[1], 2) + Math.pow(n[2] - s[2], 2));
          a < r && ((r = a), (i = o));
        }
      return i;
    }),
    (N.keyword.rgb = function (e) {
      return V[e];
    }),
    (N.rgb.xyz = function (e) {
      var t = e[0] / 255,
        i = e[1] / 255,
        n = e[2] / 255;
      return [
        100 *
          (0.4124 * (t = t > 0.04045 ? Math.pow((t + 0.055) / 1.055, 2.4) : t / 12.92) +
            0.3576 * (i = i > 0.04045 ? Math.pow((i + 0.055) / 1.055, 2.4) : i / 12.92) +
            0.1805 * (n = n > 0.04045 ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92)),
        100 * (0.2126 * t + 0.7152 * i + 0.0722 * n),
        100 * (0.0193 * t + 0.1192 * i + 0.9505 * n)
      ];
    }),
    (N.rgb.lab = function (e) {
      var t = N.rgb.xyz(e),
        i = t[0],
        n = t[1],
        s = t[2];
      return (
        (n /= 100),
        (s /= 108.883),
        (i = (i /= 95.047) > 0.008856 ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116),
        [
          116 * (n = n > 0.008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116) - 16,
          500 * (i - n),
          200 * (n - (s = s > 0.008856 ? Math.pow(s, 1 / 3) : 7.787 * s + 16 / 116))
        ]
      );
    }),
    (N.hsl.rgb = function (e) {
      var t,
        i,
        n,
        s,
        r,
        o = e[0] / 360,
        h = e[1] / 100,
        a = e[2] / 100;
      if (0 === h) return [(r = 255 * a), r, r];
      (t = 2 * a - (i = a < 0.5 ? a * (1 + h) : a + h - a * h)), (s = [0, 0, 0]);
      for (var l = 0; l < 3; l++)
        (n = o + (1 / 3) * -(l - 1)) < 0 && n++,
          n > 1 && n--,
          (r = 6 * n < 1 ? t + 6 * (i - t) * n : 2 * n < 1 ? i : 3 * n < 2 ? t + (i - t) * (2 / 3 - n) * 6 : t),
          (s[l] = 255 * r);
      return s;
    }),
    (N.hsl.hsv = function (e) {
      var t = e[0],
        i = e[1] / 100,
        n = e[2] / 100,
        s = i,
        r = Math.max(n, 0.01);
      return (
        (i *= (n *= 2) <= 1 ? n : 2 - n),
        (s *= r <= 1 ? r : 2 - r),
        [t, 100 * (0 === n ? (2 * s) / (r + s) : (2 * i) / (n + i)), 100 * ((n + i) / 2)]
      );
    }),
    (N.hsv.rgb = function (e) {
      var t = e[0] / 60,
        i = e[1] / 100,
        n = e[2] / 100,
        s = Math.floor(t) % 6,
        r = t - Math.floor(t),
        o = 255 * n * (1 - i),
        h = 255 * n * (1 - i * r),
        a = 255 * n * (1 - i * (1 - r));
      switch (((n *= 255), s)) {
        case 0:
          return [n, a, o];
        case 1:
          return [h, n, o];
        case 2:
          return [o, n, a];
        case 3:
          return [o, h, n];
        case 4:
          return [a, o, n];
        case 5:
          return [n, o, h];
      }
    }),
    (N.hsv.hsl = function (e) {
      var t,
        i,
        n,
        s = e[0],
        r = e[1] / 100,
        o = e[2] / 100,
        h = Math.max(o, 0.01);
      return (n = (2 - r) * o), (i = r * h), [s, 100 * (i = (i /= (t = (2 - r) * h) <= 1 ? t : 2 - t) || 0), 100 * (n /= 2)];
    }),
    (N.hwb.rgb = function (e) {
      var t,
        i,
        n,
        s,
        r,
        o,
        h,
        a = e[0] / 360,
        l = e[1] / 100,
        c = e[2] / 100,
        d = l + c;
      switch (
        (d > 1 && ((l /= d), (c /= d)),
        (n = 6 * a - (t = Math.floor(6 * a))),
        0 != (1 & t) && (n = 1 - n),
        (s = l + n * ((i = 1 - c) - l)),
        t)
      ) {
        default:
        case 6:
        case 0:
          (r = i), (o = s), (h = l);
          break;
        case 1:
          (r = s), (o = i), (h = l);
          break;
        case 2:
          (r = l), (o = i), (h = s);
          break;
        case 3:
          (r = l), (o = s), (h = i);
          break;
        case 4:
          (r = s), (o = l), (h = i);
          break;
        case 5:
          (r = i), (o = l), (h = s);
      }
      return [255 * r, 255 * o, 255 * h];
    }),
    (N.cmyk.rgb = function (e) {
      var t = e[0] / 100,
        i = e[1] / 100,
        n = e[2] / 100,
        s = e[3] / 100;
      return [255 * (1 - Math.min(1, t * (1 - s) + s)), 255 * (1 - Math.min(1, i * (1 - s) + s)), 255 * (1 - Math.min(1, n * (1 - s) + s))];
    }),
    (N.xyz.rgb = function (e) {
      var t,
        i,
        n,
        s = e[0] / 100,
        r = e[1] / 100,
        o = e[2] / 100;
      return (
        (i = -0.9689 * s + 1.8758 * r + 0.0415 * o),
        (n = 0.0557 * s + -0.204 * r + 1.057 * o),
        (t = (t = 3.2406 * s + -1.5372 * r + -0.4986 * o) > 0.0031308 ? 1.055 * Math.pow(t, 1 / 2.4) - 0.055 : 12.92 * t),
        (i = i > 0.0031308 ? 1.055 * Math.pow(i, 1 / 2.4) - 0.055 : 12.92 * i),
        (n = n > 0.0031308 ? 1.055 * Math.pow(n, 1 / 2.4) - 0.055 : 12.92 * n),
        [255 * (t = Math.min(Math.max(0, t), 1)), 255 * (i = Math.min(Math.max(0, i), 1)), 255 * (n = Math.min(Math.max(0, n), 1))]
      );
    }),
    (N.xyz.lab = function (e) {
      var t = e[0],
        i = e[1],
        n = e[2];
      return (
        (i /= 100),
        (n /= 108.883),
        (t = (t /= 95.047) > 0.008856 ? Math.pow(t, 1 / 3) : 7.787 * t + 16 / 116),
        [
          116 * (i = i > 0.008856 ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116) - 16,
          500 * (t - i),
          200 * (i - (n = n > 0.008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116))
        ]
      );
    }),
    (N.lab.xyz = function (e) {
      var t,
        i,
        n,
        s = e[0];
      (t = e[1] / 500 + (i = (s + 16) / 116)), (n = i - e[2] / 200);
      var r = Math.pow(i, 3),
        o = Math.pow(t, 3),
        h = Math.pow(n, 3);
      return (
        (i = r > 0.008856 ? r : (i - 16 / 116) / 7.787),
        (t = o > 0.008856 ? o : (t - 16 / 116) / 7.787),
        (n = h > 0.008856 ? h : (n - 16 / 116) / 7.787),
        [(t *= 95.047), (i *= 100), (n *= 108.883)]
      );
    }),
    (N.lab.lch = function (e) {
      var t,
        i = e[0],
        n = e[1],
        s = e[2];
      return (t = (360 * Math.atan2(s, n)) / 2 / Math.PI) < 0 && (t += 360), [i, Math.sqrt(n * n + s * s), t];
    }),
    (N.lch.lab = function (e) {
      var t,
        i = e[0],
        n = e[1];
      return (t = (e[2] / 360) * 2 * Math.PI), [i, n * Math.cos(t), n * Math.sin(t)];
    }),
    (N.rgb.ansi16 = function (e) {
      var t = e[0],
        i = e[1],
        n = e[2],
        s = 1 in arguments ? arguments[1] : N.rgb.hsv(e)[2];
      if (0 === (s = Math.round(s / 50))) return 30;
      var r = 30 + ((Math.round(n / 255) << 2) | (Math.round(i / 255) << 1) | Math.round(t / 255));
      return 2 === s && (r += 60), r;
    }),
    (N.hsv.ansi16 = function (e) {
      return N.rgb.ansi16(N.hsv.rgb(e), e[2]);
    }),
    (N.rgb.ansi256 = function (e) {
      var t = e[0],
        i = e[1],
        n = e[2];
      return t === i && i === n
        ? t < 8
          ? 16
          : t > 248
            ? 231
            : Math.round(((t - 8) / 247) * 24) + 232
        : 16 + 36 * Math.round((t / 255) * 5) + 6 * Math.round((i / 255) * 5) + Math.round((n / 255) * 5);
    }),
    (N.ansi16.rgb = function (e) {
      var t = e % 10;
      if (0 === t || 7 === t) return e > 50 && (t += 3.5), [(t = (t / 10.5) * 255), t, t];
      var i = 0.5 * (1 + ~~(e > 50));
      return [(1 & t) * i * 255, ((t >> 1) & 1) * i * 255, ((t >> 2) & 1) * i * 255];
    }),
    (N.ansi256.rgb = function (e) {
      if (e >= 232) {
        var t = 10 * (e - 232) + 8;
        return [t, t, t];
      }
      var i;
      return (e -= 16), [(Math.floor(e / 36) / 5) * 255, (Math.floor((i = e % 36) / 6) / 5) * 255, ((i % 6) / 5) * 255];
    }),
    (N.rgb.hex = function (e) {
      var t = (((255 & Math.round(e[0])) << 16) + ((255 & Math.round(e[1])) << 8) + (255 & Math.round(e[2]))).toString(16).toUpperCase();
      return '000000'.substring(t.length) + t;
    }),
    (N.hex.rgb = function (e) {
      var t = e.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
      if (!t) return [0, 0, 0];
      var i = t[0];
      3 === t[0].length &&
        (i = i
          .split('')
          .map(function (e) {
            return e + e;
          })
          .join(''));
      var n = parseInt(i, 16);
      return [(n >> 16) & 255, (n >> 8) & 255, 255 & n];
    }),
    (N.rgb.hcg = function (e) {
      var t,
        i = e[0] / 255,
        n = e[1] / 255,
        s = e[2] / 255,
        r = Math.max(Math.max(i, n), s),
        o = Math.min(Math.min(i, n), s),
        h = r - o;
      return (
        (t = h <= 0 ? 0 : r === i ? ((n - s) / h) % 6 : r === n ? 2 + (s - i) / h : 4 + (i - n) / h + 4),
        (t /= 6),
        [360 * (t %= 1), 100 * h, 100 * (h < 1 ? o / (1 - h) : 0)]
      );
    }),
    (N.hsl.hcg = function (e) {
      var t = e[1] / 100,
        i = e[2] / 100,
        n = 1,
        s = 0;
      return (n = i < 0.5 ? 2 * t * i : 2 * t * (1 - i)) < 1 && (s = (i - 0.5 * n) / (1 - n)), [e[0], 100 * n, 100 * s];
    }),
    (N.hsv.hcg = function (e) {
      var t = e[1] / 100,
        i = e[2] / 100,
        n = t * i,
        s = 0;
      return n < 1 && (s = (i - n) / (1 - n)), [e[0], 100 * n, 100 * s];
    }),
    (N.hcg.rgb = function (e) {
      var t = e[0] / 360,
        i = e[1] / 100,
        n = e[2] / 100;
      if (0 === i) return [255 * n, 255 * n, 255 * n];
      var s,
        r = [0, 0, 0],
        o = (t % 1) * 6,
        h = o % 1,
        a = 1 - h;
      switch (Math.floor(o)) {
        case 0:
          (r[0] = 1), (r[1] = h), (r[2] = 0);
          break;
        case 1:
          (r[0] = a), (r[1] = 1), (r[2] = 0);
          break;
        case 2:
          (r[0] = 0), (r[1] = 1), (r[2] = h);
          break;
        case 3:
          (r[0] = 0), (r[1] = a), (r[2] = 1);
          break;
        case 4:
          (r[0] = h), (r[1] = 0), (r[2] = 1);
          break;
        default:
          (r[0] = 1), (r[1] = 0), (r[2] = a);
      }
      return (s = (1 - i) * n), [255 * (i * r[0] + s), 255 * (i * r[1] + s), 255 * (i * r[2] + s)];
    }),
    (N.hcg.hsv = function (e) {
      var t = e[1] / 100,
        i = t + (e[2] / 100) * (1 - t),
        n = 0;
      return i > 0 && (n = t / i), [e[0], 100 * n, 100 * i];
    }),
    (N.hcg.hsl = function (e) {
      var t = e[1] / 100,
        i = (e[2] / 100) * (1 - t) + 0.5 * t,
        n = 0;
      return i > 0 && i < 0.5 ? (n = t / (2 * i)) : i >= 0.5 && i < 1 && (n = t / (2 * (1 - i))), [e[0], 100 * n, 100 * i];
    }),
    (N.hcg.hwb = function (e) {
      var t = e[1] / 100,
        i = t + (e[2] / 100) * (1 - t);
      return [e[0], 100 * (i - t), 100 * (1 - i)];
    }),
    (N.hwb.hcg = function (e) {
      var t = e[1] / 100,
        i = 1 - e[2] / 100,
        n = i - t,
        s = 0;
      return n < 1 && (s = (i - n) / (1 - n)), [e[0], 100 * n, 100 * s];
    }),
    (N.apple.rgb = function (e) {
      return [(e[0] / 65535) * 255, (e[1] / 65535) * 255, (e[2] / 65535) * 255];
    }),
    (N.rgb.apple = function (e) {
      return [(e[0] / 255) * 65535, (e[1] / 255) * 65535, (e[2] / 255) * 65535];
    }),
    (N.gray.rgb = function (e) {
      return [(e[0] / 100) * 255, (e[0] / 100) * 255, (e[0] / 100) * 255];
    }),
    (N.gray.hsl = N.gray.hsv =
      function (e) {
        return [0, 0, e[0]];
      }),
    (N.gray.hwb = function (e) {
      return [0, 100, e[0]];
    }),
    (N.gray.cmyk = function (e) {
      return [0, 0, 0, e[0]];
    }),
    (N.gray.lab = function (e) {
      return [e[0], 0, 0];
    }),
    (N.gray.hex = function (e) {
      var t = 255 & Math.round((e[0] / 100) * 255),
        i = ((t << 16) + (t << 8) + t).toString(16).toUpperCase();
      return '000000'.substring(i.length) + i;
    }),
    (N.rgb.gray = function (e) {
      return [((e[0] + e[1] + e[2]) / 3 / 255) * 100];
    });
  var $ = I.exports,
    q = $;
  function B(e) {
    var t = (function () {
        for (var e = {}, t = Object.keys(q), i = t.length, n = 0; n < i; n++) e[t[n]] = { distance: -1, parent: null };
        return e;
      })(),
      i = [e];
    for (t[e].distance = 0; i.length; )
      for (var n = i.pop(), s = Object.keys(q[n]), r = s.length, o = 0; o < r; o++) {
        var h = s[o],
          a = t[h];
        -1 === a.distance && ((a.distance = t[n].distance + 1), (a.parent = n), i.unshift(h));
      }
    return t;
  }
  function K(e, t) {
    return function (i) {
      return t(e(i));
    };
  }
  function Z(e, t) {
    for (var i = [t[e].parent, e], n = q[t[e].parent][e], s = t[e].parent; t[s].parent; )
      i.unshift(t[s].parent), (n = K(q[t[s].parent][s], n)), (s = t[s].parent);
    return (n.conversion = i), n;
  }
  var Q = $,
    J = function (e) {
      for (var t = B(e), i = {}, n = Object.keys(t), s = n.length, r = 0; r < s; r++) {
        var o = n[r];
        null !== t[o].parent && (i[o] = Z(o, t));
      }
      return i;
    },
    ee = {};
  Object.keys(Q).forEach(function (e) {
    (ee[e] = {}),
      Object.defineProperty(ee[e], 'channels', { value: Q[e].channels }),
      Object.defineProperty(ee[e], 'labels', { value: Q[e].labels });
    var t = J(e);
    Object.keys(t).forEach(function (i) {
      var n = t[i];
      (ee[e][i] = (function (e) {
        var t = function (t) {
          if (null == t) return t;
          arguments.length > 1 && (t = Array.prototype.slice.call(arguments));
          var i = e(t);
          if ('object' == typeof i) for (var n = i.length, s = 0; s < n; s++) i[s] = Math.round(i[s]);
          return i;
        };
        return 'conversion' in e && (t.conversion = e.conversion), t;
      })(n)),
        (ee[e][i].raw = (function (e) {
          var t = function (t) {
            return null == t ? t : (arguments.length > 1 && (t = Array.prototype.slice.call(arguments)), e(t));
          };
          return 'conversion' in e && (t.conversion = e.conversion), t;
        })(n));
    });
  });
  var te = X,
    ie = ee,
    ne = [].slice,
    se = ['keyword', 'gray', 'hex'],
    re = {};
  Object.keys(ie).forEach(function (e) {
    re[ne.call(ie[e].labels).sort().join('')] = e;
  });
  var oe = {};
  function he(e, t) {
    if (!(this instanceof he)) return new he(e, t);
    if ((t && t in se && (t = null), t && !(t in ie))) throw new Error('Unknown model: ' + t);
    var i, n;
    if (null == e) (this.model = 'rgb'), (this.color = [0, 0, 0]), (this.valpha = 1);
    else if (e instanceof he) (this.model = e.model), (this.color = e.color.slice()), (this.valpha = e.valpha);
    else if ('string' == typeof e) {
      var s = te.get(e);
      if (null === s) throw new Error('Unable to parse color from string: ' + e);
      (this.model = s.model),
        (n = ie[this.model].channels),
        (this.color = s.value.slice(0, n)),
        (this.valpha = 'number' == typeof s.value[n] ? s.value[n] : 1);
    } else if (e.length) {
      (this.model = t || 'rgb'), (n = ie[this.model].channels);
      var r = ne.call(e, 0, n);
      (this.color = ce(r, n)), (this.valpha = 'number' == typeof e[n] ? e[n] : 1);
    } else if ('number' == typeof e)
      (e &= 16777215), (this.model = 'rgb'), (this.color = [(e >> 16) & 255, (e >> 8) & 255, 255 & e]), (this.valpha = 1);
    else {
      this.valpha = 1;
      var o = Object.keys(e);
      'alpha' in e && (o.splice(o.indexOf('alpha'), 1), (this.valpha = 'number' == typeof e.alpha ? e.alpha : 0));
      var h = o.sort().join('');
      if (!(h in re)) throw new Error('Unable to parse color from object: ' + JSON.stringify(e));
      this.model = re[h];
      var a = ie[this.model].labels,
        l = [];
      for (i = 0; i < a.length; i++) l.push(e[a[i]]);
      this.color = ce(l);
    }
    if (oe[this.model])
      for (n = ie[this.model].channels, i = 0; i < n; i++) {
        var c = oe[this.model][i];
        c && (this.color[i] = c(this.color[i]));
      }
    (this.valpha = Math.max(0, Math.min(1, this.valpha))), Object.freeze && Object.freeze(this);
  }
  function ae(e, t, i) {
    return (
      (e = Array.isArray(e) ? e : [e]).forEach(function (e) {
        (oe[e] || (oe[e] = []))[t] = i;
      }),
      (e = e[0]),
      function (n) {
        var s;
        return arguments.length ? (i && (n = i(n)), ((s = this[e]()).color[t] = n), s) : ((s = this[e]().color[t]), i && (s = i(s)), s);
      }
    );
  }
  function le(e) {
    return function (t) {
      return Math.max(0, Math.min(e, t));
    };
  }
  function ce(e, t) {
    for (var i = 0; i < t; i++) 'number' != typeof e[i] && (e[i] = 0);
    return e;
  }
  (he.prototype = {
    toString: function () {
      return this.string();
    },
    toJSON: function () {
      return this[this.model]();
    },
    string: function (e) {
      var t = this.model in te.to ? this : this.rgb(),
        i = 1 === (t = t.round('number' == typeof e ? e : 1)).valpha ? t.color : t.color.concat(this.valpha);
      return te.to[t.model](i);
    },
    percentString: function (e) {
      var t = this.rgb().round('number' == typeof e ? e : 1),
        i = 1 === t.valpha ? t.color : t.color.concat(this.valpha);
      return te.to.rgb.percent(i);
    },
    array: function () {
      return 1 === this.valpha ? this.color.slice() : this.color.concat(this.valpha);
    },
    object: function () {
      for (var e = {}, t = ie[this.model].channels, i = ie[this.model].labels, n = 0; n < t; n++) e[i[n]] = this.color[n];
      return 1 !== this.valpha && (e.alpha = this.valpha), e;
    },
    unitArray: function () {
      var e = this.rgb().color;
      return (e[0] /= 255), (e[1] /= 255), (e[2] /= 255), 1 !== this.valpha && e.push(this.valpha), e;
    },
    unitObject: function () {
      var e = this.rgb().object();
      return (e.r /= 255), (e.g /= 255), (e.b /= 255), 1 !== this.valpha && (e.alpha = this.valpha), e;
    },
    round: function (e) {
      return (
        (e = Math.max(e || 0, 0)),
        new he(
          this.color
            .map(
              (function (e) {
                return function (t) {
                  return (function (e, t) {
                    return Number(e.toFixed(t));
                  })(t, e);
                };
              })(e)
            )
            .concat(this.valpha),
          this.model
        )
      );
    },
    alpha: function (e) {
      return arguments.length ? new he(this.color.concat(Math.max(0, Math.min(1, e))), this.model) : this.valpha;
    },
    red: ae('rgb', 0, le(255)),
    green: ae('rgb', 1, le(255)),
    blue: ae('rgb', 2, le(255)),
    hue: ae(['hsl', 'hsv', 'hsl', 'hwb', 'hcg'], 0, function (e) {
      return ((e % 360) + 360) % 360;
    }),
    saturationl: ae('hsl', 1, le(100)),
    lightness: ae('hsl', 2, le(100)),
    saturationv: ae('hsv', 1, le(100)),
    value: ae('hsv', 2, le(100)),
    chroma: ae('hcg', 1, le(100)),
    gray: ae('hcg', 2, le(100)),
    white: ae('hwb', 1, le(100)),
    wblack: ae('hwb', 2, le(100)),
    cyan: ae('cmyk', 0, le(100)),
    magenta: ae('cmyk', 1, le(100)),
    yellow: ae('cmyk', 2, le(100)),
    black: ae('cmyk', 3, le(100)),
    x: ae('xyz', 0, le(100)),
    y: ae('xyz', 1, le(100)),
    z: ae('xyz', 2, le(100)),
    l: ae('lab', 0, le(100)),
    a: ae('lab', 1),
    b: ae('lab', 2),
    keyword: function (e) {
      return arguments.length ? new he(e) : ie[this.model].keyword(this.color);
    },
    hex: function (e) {
      return arguments.length ? new he(e) : te.to.hex(this.rgb().round().color);
    },
    rgbNumber: function () {
      var e = this.rgb().color;
      return ((255 & e[0]) << 16) | ((255 & e[1]) << 8) | (255 & e[2]);
    },
    luminosity: function () {
      for (var e = this.rgb().color, t = [], i = 0; i < e.length; i++) {
        var n = e[i] / 255;
        t[i] = n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
      }
      return 0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2];
    },
    contrast: function (e) {
      var t = this.luminosity(),
        i = e.luminosity();
      return t > i ? (t + 0.05) / (i + 0.05) : (i + 0.05) / (t + 0.05);
    },
    level: function (e) {
      var t = this.contrast(e);
      return t >= 7.1 ? 'AAA' : t >= 4.5 ? 'AA' : '';
    },
    isDark: function () {
      var e = this.rgb().color;
      return (299 * e[0] + 587 * e[1] + 114 * e[2]) / 1e3 < 128;
    },
    isLight: function () {
      return !this.isDark();
    },
    negate: function () {
      for (var e = this.rgb(), t = 0; t < 3; t++) e.color[t] = 255 - e.color[t];
      return e;
    },
    lighten: function (e) {
      var t = this.hsl();
      return (t.color[2] += t.color[2] * e), t;
    },
    darken: function (e) {
      var t = this.hsl();
      return (t.color[2] -= t.color[2] * e), t;
    },
    saturate: function (e) {
      var t = this.hsl();
      return (t.color[1] += t.color[1] * e), t;
    },
    desaturate: function (e) {
      var t = this.hsl();
      return (t.color[1] -= t.color[1] * e), t;
    },
    whiten: function (e) {
      var t = this.hwb();
      return (t.color[1] += t.color[1] * e), t;
    },
    blacken: function (e) {
      var t = this.hwb();
      return (t.color[2] += t.color[2] * e), t;
    },
    grayscale: function () {
      var e = this.rgb().color,
        t = 0.3 * e[0] + 0.59 * e[1] + 0.11 * e[2];
      return he.rgb(t, t, t);
    },
    fade: function (e) {
      return this.alpha(this.valpha - this.valpha * e);
    },
    opaquer: function (e) {
      return this.alpha(this.valpha + this.valpha * e);
    },
    rotate: function (e) {
      var t = this.hsl(),
        i = t.color[0];
      return (i = (i = (i + e) % 360) < 0 ? 360 + i : i), (t.color[0] = i), t;
    },
    mix: function (e, t) {
      if (!e || !e.rgb) throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof e);
      var i = e.rgb(),
        n = this.rgb(),
        s = void 0 === t ? 0.5 : t,
        r = 2 * s - 1,
        o = i.alpha() - n.alpha(),
        h = ((r * o == -1 ? r : (r + o) / (1 + r * o)) + 1) / 2,
        a = 1 - h;
      return he.rgb(
        h * i.red() + a * n.red(),
        h * i.green() + a * n.green(),
        h * i.blue() + a * n.blue(),
        i.alpha() * s + n.alpha() * (1 - s)
      );
    }
  }),
    Object.keys(ie).forEach(function (e) {
      if (-1 === se.indexOf(e)) {
        var t = ie[e].channels;
        (he.prototype[e] = function () {
          if (this.model === e) return new he(this);
          if (arguments.length) return new he(arguments, e);
          var i,
            n = 'number' == typeof arguments[t] ? t : this.valpha;
          return new he(((i = ie[this.model][e].raw(this.color)), Array.isArray(i) ? i : [i]).concat(n), e);
        }),
          (he[e] = function (i) {
            return 'number' == typeof i && (i = ce(ne.call(arguments), t)), new he(i, e);
          });
      }
    });
  var de = E(he);
  const ge = de.hsl(180, 30, 70);
  class ue extends a {
    constructor({ data: e, colors: t = {}, name: i = 'flameChartPlugin' }) {
      super(i),
        (this.height = 'flexible'),
        (this.flatTree = []),
        (this.positionY = 0),
        (this.colors = {}),
        (this.selectedRegion = null),
        (this.hoveredRegion = null),
        (this.lastRandomColor = ge),
        (this.metaClusterizedFlatTree = []),
        (this.actualClusterizedFlatTree = []),
        (this.initialClusterizedFlatTree = []),
        (this.lastUsedColor = null),
        (this.renderChartTimeout = -1),
        (this.data = e),
        (this.userColors = t),
        this.parseData(),
        this.reset();
    }
    init(e, t) {
      super.init(e, t),
        this.interactionsEngine.on('change-position', this.handlePositionChange.bind(this)),
        this.interactionsEngine.on('select', this.handleSelect.bind(this)),
        this.interactionsEngine.on('hover', this.handleHover.bind(this)),
        this.interactionsEngine.on('up', this.handleMouseUp.bind(this)),
        this.initData();
    }
    handlePositionChange({ deltaX: e, deltaY: t }) {
      const i = this.positionY,
        n = this.renderEngine.parent.positionX;
      this.interactionsEngine.setCursor('grabbing'),
        this.positionY + t >= 0 ? this.setPositionY(this.positionY + t) : this.setPositionY(0),
        this.renderEngine.tryToChangePosition(e),
        (n === this.renderEngine.parent.positionX && i === this.positionY) || this.renderEngine.parent.render();
    }
    handleMouseUp() {
      this.interactionsEngine.clearCursor();
    }
    setPositionY(e) {
      this.positionY = e;
    }
    reset() {
      (this.colors = {}), (this.lastRandomColor = ge), (this.positionY = 0), (this.selectedRegion = null);
    }
    calcMinMax() {
      const { flatTree: e } = this,
        { min: t, max: i } = m(e);
      (this.min = t), (this.max = i);
    }
    handleSelect(e) {
      var t, i;
      const n = this.findNodeInCluster(e);
      this.selectedRegion !== n &&
        ((this.selectedRegion = n),
        this.renderEngine.render(),
        this.emit('select', {
          node: null !== (i = null === (t = this.selectedRegion) || void 0 === t ? void 0 : t.data) && void 0 !== i ? i : null,
          type: 'flame-chart-node'
        }));
    }
    handleHover(e) {
      this.hoveredRegion = this.findNodeInCluster(e);
    }
    findNodeInCluster(e) {
      const t = this.interactionsEngine.getMouse();
      if (e && 'cluster' === e.type) {
        const i = e.data.nodes.find(({ level: e, source: { start: i, duration: n } }) => {
          const { x: s, y: r, w: o } = this.calcRect(i, n, e);
          return t.x >= s && t.x <= s + o && t.y >= r && t.y <= r + this.renderEngine.blockHeight;
        });
        if (i) return { data: i, type: 'node' };
      }
      return null;
    }
    getColor(e = '_default', t) {
      if (t) return t;
      if (this.colors[e]) return this.colors[e];
      if (this.userColors[e]) {
        const t = new de(this.userColors[e]);
        return (this.colors[e] = t.rgb().toString()), this.colors[e];
      }
      return (
        (this.lastRandomColor = this.lastRandomColor.rotate(27)), (this.colors[e] = this.lastRandomColor.rgb().toString()), this.colors[e]
      );
    }
    setData(e) {
      (this.data = e),
        this.parseData(),
        this.initData(),
        this.reset(),
        this.renderEngine.recalcMinMax(),
        this.renderEngine.resetParentView();
    }
    parseData() {
      (this.flatTree = f(this.data)), this.calcMinMax();
    }
    initData() {
      (this.metaClusterizedFlatTree = v(this.flatTree)),
        (this.initialClusterizedFlatTree = x(this.metaClusterizedFlatTree, this.renderEngine.zoom, this.min, this.max)),
        this.reclusterizeClusteredFlatTree();
    }
    reclusterizeClusteredFlatTree() {
      this.actualClusterizedFlatTree = b(
        this.initialClusterizedFlatTree,
        this.renderEngine.zoom,
        this.renderEngine.positionX,
        this.renderEngine.positionX + this.renderEngine.getRealView()
      );
    }
    calcRect(e, t, i) {
      const n = t * this.renderEngine.zoom;
      return {
        x: this.renderEngine.timeToPosition(e),
        y: i * (this.renderEngine.blockHeight + 1) - this.positionY,
        w: n <= 0.1 ? 0.1 : n >= 3 ? n - 1 : n - n / 3
      };
    }
    renderTooltip() {
      if (this.hoveredRegion) {
        if (!1 === this.renderEngine.options.tooltip) return !0;
        if ('function' == typeof this.renderEngine.options.tooltip)
          this.renderEngine.options.tooltip(this.hoveredRegion, this.renderEngine, this.interactionsEngine.getGlobalMouse());
        else {
          const {
              data: {
                source: { start: e, duration: t, name: i, children: n }
              }
            } = this.hoveredRegion,
            s = this.renderEngine.getTimeUnits(),
            r = t - (n ? n.reduce((e, { duration: t }) => e + t, 0) : 0),
            o = this.renderEngine.getAccuracy() + 2,
            h = `${i}`,
            a = `duration: ${t.toFixed(o)} ${s} ${(null == n ? void 0 : n.length) ? `(self ${r.toFixed(o)} ${s})` : ''}`,
            l = `start: ${e.toFixed(o)}`;
          this.renderEngine.renderTooltipFromData([{ text: h }, { text: a }, { text: l }], this.interactionsEngine.getGlobalMouse());
        }
        return !0;
      }
      return !1;
    }
    render() {
      const { width: e, blockHeight: t, height: i, minTextWidth: n } = this.renderEngine;
      (this.lastUsedColor = null), this.reclusterizeClusteredFlatTree();
      const s = (n) => (s) => {
          const { start: r, duration: o, level: h } = s,
            { x: a, y: l, w: c } = this.calcRect(r, o, h);
          a + c > 0 && a < e && l + t > 0 && l < i && n(s, a, l, c);
        },
        r = (e, i, n, s) => {
          this.interactionsEngine.addHitRegion('cluster', e, i, n, s, t);
        };
      if (
        (this.actualClusterizedFlatTree.forEach(
          s((e, i, s, o) => {
            const { type: h, nodes: a, color: l, pattern: c, badge: d } = e,
              g = this.interactionsEngine.getMouse();
            if (
              (g.y >= s && g.y <= s + t && r(e, i, s, o),
              o >= 0.25 && (this.renderEngine.addRect({ color: this.getColor(h, l), pattern: c, x: i, y: s, w: o }, 0), d))
            ) {
              const e = `node-badge-${d}`,
                t = (2 * this.renderEngine.styles.badgeSize) / Math.SQRT2;
              this.renderEngine.createCachedDefaultPattern({
                name: e,
                type: 'triangles',
                config: { color: d, width: t, align: 'top', direction: 'top-left' }
              }),
                this.renderEngine.addRect({ pattern: e, color: 'transparent', x: i, y: s, w: Math.min(t, o) }, 1);
            }
            o >= n && 1 === a.length && this.renderEngine.addText({ text: a[0].source.name, x: i, y: s, w: o }, 2);
          })
        ),
        this.selectedRegion && 'node' === this.selectedRegion.type)
      ) {
        const {
            source: { start: e, duration: t },
            level: i
          } = this.selectedRegion.data,
          { x: n, y: s, w: r } = this.calcRect(e, t, i);
        this.renderEngine.addStroke({ color: 'green', x: n, y: s, w: r, h: this.renderEngine.blockHeight }, 2);
      }
      clearTimeout(this.renderChartTimeout),
        (this.renderChartTimeout = window.setTimeout(() => {
          this.interactionsEngine.clearHitRegions(), this.actualClusterizedFlatTree.forEach(s(r));
        }, 16));
    }
  }
  const fe = { font: '10px sans-serif', fontColor: 'black' };
  class me extends a {
    constructor(e = {}) {
      super('timeGridPlugin'), (this.styles = fe), (this.height = 0), this.setSettings(e);
    }
    setSettings({ styles: e }) {
      (this.styles = l(fe, e)), this.renderEngine && this.overrideEngineSettings();
    }
    overrideEngineSettings() {
      this.renderEngine.setSettingsOverrides({ styles: this.styles }), (this.height = Math.round(this.renderEngine.charHeight + 10));
    }
    init(e, t) {
      super.init(e, t), this.overrideEngineSettings();
    }
    render() {
      return (
        this.renderEngine.parent.timeGrid.renderTimes(this.renderEngine),
        this.renderEngine.parent.timeGrid.renderLines(0, this.renderEngine.height, this.renderEngine),
        !0
      );
    }
  }
  class pe extends a {
    constructor({ data: e, name: t = 'marksPlugin' }) {
      super(t), (this.hoveredRegion = null), (this.selectedRegion = null), (this.marks = this.prepareMarks(e)), this.calcMinMax();
    }
    calcMinMax() {
      const { marks: e } = this;
      e.length &&
        ((this.min = e.reduce((e, { timestamp: t }) => (t < e ? t : e), e[0].timestamp)),
        (this.max = e.reduce((e, { timestamp: t }) => (t > e ? t : e), e[0].timestamp)));
    }
    init(e, t) {
      super.init(e, t),
        this.interactionsEngine.on('hover', this.handleHover.bind(this)),
        this.interactionsEngine.on('select', this.handleSelect.bind(this));
    }
    handleHover(e) {
      this.hoveredRegion = e;
    }
    handleSelect(e) {
      var t;
      this.selectedRegion !== e &&
        ((this.selectedRegion = e),
        this.emit('select', { node: null !== (t = null == e ? void 0 : e.data) && void 0 !== t ? t : null, type: 'mark' }),
        this.renderEngine.render());
    }
    get height() {
      return this.renderEngine.blockHeight + 2;
    }
    prepareMarks(e) {
      return e
        .map(({ color: e, ...t }) => ({ ...t, color: new de(e).alpha(0.7).rgb().toString() }))
        .sort((e, t) => e.timestamp - t.timestamp);
    }
    setMarks(e) {
      (this.marks = this.prepareMarks(e)), this.calcMinMax(), this.renderEngine.recalcMinMax(), this.renderEngine.resetParentView();
    }
    calcMarksBlockPosition(e, t) {
      return e > 0 && t > e ? t : e;
    }
    render() {
      this.marks.reduce((e, t) => {
        const { timestamp: i, color: n, shortName: s } = t,
          { width: r } = this.renderEngine.ctx.measureText(s),
          o = r + 2 * this.renderEngine.blockPaddingLeftRight,
          h = this.renderEngine.timeToPosition(i),
          a = this.calcMarksBlockPosition(h, e);
        return (
          this.renderEngine.addRect({ color: n, x: a, y: 1, w: o }),
          this.renderEngine.addText({ text: s, x: a, y: 1, w: o }),
          this.interactionsEngine.addHitRegion('timestamp', t, a, 1, o, this.renderEngine.blockHeight),
          a + o
        );
      }, 0);
    }
    postRender() {
      this.marks.forEach((e) => {
        const { timestamp: t, color: i } = e,
          n = this.renderEngine.timeToPosition(t);
        this.renderEngine.parent.setCtxValue('strokeStyle', i),
          this.renderEngine.parent.setCtxValue('lineWidth', 1),
          this.renderEngine.parent.callCtx('setLineDash', [8, 7]),
          this.renderEngine.parent.ctx.beginPath(),
          this.renderEngine.parent.ctx.moveTo(n, this.renderEngine.position),
          this.renderEngine.parent.ctx.lineTo(n, this.renderEngine.parent.height),
          this.renderEngine.parent.ctx.stroke();
      });
    }
    renderTooltip() {
      if (this.hoveredRegion && 'timestamp' === this.hoveredRegion.type) {
        if (!1 === this.renderEngine.options.tooltip) return !0;
        if ('function' == typeof this.renderEngine.options.tooltip)
          this.renderEngine.options.tooltip(this.hoveredRegion, this.renderEngine, this.interactionsEngine.getGlobalMouse());
        else {
          const {
              data: { fullName: e, timestamp: t }
            } = this.hoveredRegion,
            i = this.renderEngine.getAccuracy() + 2,
            n = `${e}`,
            s = `${t.toFixed(i)} ${this.renderEngine.timeUnits}`;
          this.renderEngine.renderTooltipFromData([{ text: n }, { text: s }], this.interactionsEngine.getGlobalMouse());
        }
        return !0;
      }
      return !1;
    }
  }
  const ye = { color: 'rgba(90,90,90,0.20)' };
  class ve {
    constructor(e) {
      (this.styles = ye),
        (this.timeUnits = 'ms'),
        (this.start = 0),
        (this.end = 0),
        (this.accuracy = 0),
        (this.delta = 0),
        this.setSettings(e);
    }
    setDefaultRenderEngine(e) {
      (this.renderEngine = e), (this.timeUnits = this.renderEngine.getTimeUnits());
    }
    setSettings({ styles: e }) {
      (this.styles = l(ye, e)), this.renderEngine && (this.timeUnits = this.renderEngine.getTimeUnits());
    }
    recalc() {
      const e = this.renderEngine.max - this.renderEngine.min,
        t = e / (this.renderEngine.width / 85),
        i = this.renderEngine.getRealView(),
        n = i / (e || 1);
      (this.delta = t / Math.pow(2, Math.floor(Math.log2(1 / n)))),
        (this.start = Math.floor((this.renderEngine.positionX - this.renderEngine.min) / this.delta)),
        (this.end = Math.ceil(i / this.delta) + this.start),
        (this.accuracy = this.calcNumberFix());
    }
    calcNumberFix() {
      var e;
      const t = (this.delta / 2).toString();
      if (t.includes('e')) return Number(null === (e = t.match(/\d+$/)) || void 0 === e ? void 0 : e[0]);
      const i = t.match(/(0\.0*)/);
      return i ? i[0].length - 1 : 0;
    }
    getTimelineAccuracy() {
      return this.accuracy;
    }
    forEachTime(e) {
      for (let t = this.start; t <= this.end; t++) {
        const i = t * this.delta + this.renderEngine.min;
        e(this.renderEngine.timeToPosition(Number(i.toFixed(this.accuracy))), i);
      }
    }
    renderLines(e, t, i = this.renderEngine) {
      i.setCtxValue('fillStyle', this.styles.color),
        this.forEachTime((n) => {
          i.fillRect(n, e, 1, t);
        });
    }
    renderTimes(e = this.renderEngine) {
      e.setCtxValue('fillStyle', e.styles.fontColor),
        e.setCtxFont(e.styles.font),
        this.forEachTime((t, i) => {
          e.fillText(i.toFixed(this.accuracy) + this.timeUnits, t + e.blockPaddingLeftRight, e.charHeight);
        });
    }
  }
  function xe(e, t, i, n) {
    return e.length ? e.reduce((e, { [t]: n }) => i(e, n), e[0][t]) : n;
  }
  const be = (e) =>
      e.items
        .map(({ name: t, intervals: i, timing: n, meta: s }, r) => {
          const o = ('string' == typeof i ? e.intervals[i] : i)
              .map(({ start: e, end: t, ...i }) => ({ start: 'string' == typeof e ? n[e] : e, end: 'string' == typeof t ? n[t] : t, ...i }))
              .filter(({ start: e, end: t }) => 'number' == typeof e && 'number' == typeof t),
            h = o.filter(({ type: e }) => 'block' === e),
            a = xe(h, 'start', Math.min, 0),
            l = xe(h, 'end', Math.max, 0),
            c = xe(o, 'start', Math.min, 0),
            d = xe(o, 'end', Math.max, 0);
          return { intervals: o, textBlock: { start: a, end: l }, name: t, timing: n, min: c, max: d, index: r, meta: s };
        })
        .filter(({ intervals: e }) => e.length)
        .sort((e, t) => e.min - t.min || t.max - e.max),
    Ee = (e, t, i, n) => n - (e - t) * i,
    we = { fillColor: 'rgba(0, 0, 0, 0.1)', lineWidth: 1, lineDash: [], lineColor: 'rgba(0, 0, 0, 0.5)', type: 'smooth' },
    Me = (e) => {
      const t = [],
        i = e.map((e) => {
          var t;
          return {
            group: e.units && !e.group ? e.units : 'default',
            ...e,
            style: {
              lineWidth: 1,
              fillColor: 'rgba(0, 0, 0, 0.15)',
              lineColor: 'rgba(0, 0, 0, 0.20)',
              lineDash: [],
              type: 'smooth',
              ...(null !== (t = e.style) && void 0 !== t ? t : {})
            }
          };
        }),
        n = i.reduce(
          (e, { points: i, group: n, min: s, max: r }, o) => (
            e[n] || (e[n] = { min: null != s ? s : i[0][1], max: null != r ? r : i[0][1] }),
            (t[o] = { start: i[0][0], end: d(i)[0] }),
            i.forEach(([i, h]) => {
              void 0 === s && (e[n].min = Math.min(e[n].min, h)),
                void 0 === r && (e[n].max = Math.max(e[n].max, h)),
                (t[o].start = Math.min(t[o].start, i)),
                (t[o].end = Math.max(t[o].end, i));
            }),
            e
          ),
          {}
        );
      return {
        summary: n,
        total: { min: Math.min(...t.map(({ start: e }) => e)), max: Math.max(...t.map(({ end: e }) => e)) },
        timeseries: i,
        timeboxes: t
      };
    },
    Ce = (e, t, i) => {
      var n, s;
      return t.dynamicMinMax
        ? e.reduce((e, [, t]) => ((e.min = Math.min(e.min, t)), (e.max = Math.max(e.max, t)), e), {
            min: null !== (n = t.min) && void 0 !== n ? n : 1 / 0,
            max: null !== (s = t.max) && void 0 !== s ? s : -1 / 0
          })
        : t.group
          ? i[t.group]
          : { min: -1 / 0, max: 1 / 0 };
    },
    ke = (e, { timeseries: t }) => {
      const i = t.reduce((t, { points: i, units: n, name: s, group: r }) => {
        const o = Pe(i, e),
          h = r !== n && 'default' !== r ? r : 'default';
        let a = '';
        return o && (s && (a += s + ': '), (a += o[1].toFixed(2)), n && (a += n)), t[h] || (t[h] = []), t[h].push(a), t;
      }, {});
      return Object.entries(i).reduce(
        (e, [t, i]) => (
          'default' !== t && e.push({ text: t, color: 'black' }),
          i.forEach((t) => {
            e.push({ text: t });
          }),
          e
        ),
        []
      );
    },
    Re = ({ engine: e, points: t, style: i, min: n, max: s }) => {
      const r = { ...we, ...(null != i ? i : {}) };
      e.setCtxValue('strokeStyle', r.lineColor),
        e.setCtxValue('fillStyle', r.fillColor),
        e.setCtxValue('lineWidth', r.lineWidth),
        e.callCtx('setLineDash', r.lineDash),
        e.ctx.beginPath();
      const o = (e.height - e.charHeight - 4) / (s - n);
      if (t.length > 1) {
        const i = t.map(([t, i]) => [e.timeToPosition(t), Ee(i, n, o, e.height)]);
        if ((e.ctx.moveTo(i[0][0], e.height), e.ctx.lineTo(i[0][0], i[0][1]), 'smooth' !== r.type && r.type)) {
          if ('line' === r.type) for (let t = 1; t < i.length; t++) e.ctx.lineTo(i[t][0], i[t][1]);
          else if ('bar' === r.type) {
            for (let t = 0; t < i.length; t++) {
              const n = i[t],
                s = i[t - 1] || n,
                r = i[t + 1],
                o = (n[0] - s[0]) / 2,
                h = r ? (r[0] - n[0]) / 2 : o;
              e.ctx.lineTo(s[0] + o, n[1]),
                e.ctx.lineTo(n[0] + h, n[1]),
                r ? e.ctx.lineTo(n[0] + h, r[1]) : e.ctx.lineTo(n[0] + h, e.height);
            }
            e.ctx.lineTo(d(i)[0], e.height);
          }
        } else {
          for (let t = 1; t < i.length - 2; t++) {
            const n = (i[t][0] + i[t + 1][0]) / 2,
              s = (i[t][1] + i[t + 1][1]) / 2;
            e.ctx.quadraticCurveTo(i[t][0], i[t][1], n, s);
          }
          const t = i[i.length - 2],
            n = d(i);
          e.ctx.quadraticCurveTo(t[0], t[1], n[0], n[1]), e.ctx.quadraticCurveTo(n[0], n[1], n[0], e.height);
        }
      }
      e.ctx.closePath(), e.ctx.stroke(), e.ctx.fill();
    },
    Pe = (e, t, i = !0) => {
      if (e[0][0] >= t) return i ? e[0] : null;
      if (d(e)[0] <= t) return i ? d(e) : null;
      if (e.length <= 1) return e[0];
      let n = 0,
        s = e.length - 1;
      for (; n <= s; ) {
        const i = Math.ceil((s + n) / 2);
        if (t >= e[i - 1][0] && t <= e[i][0]) {
          return e[Math.abs(t - e[i - 1][0]) < Math.abs(t - e[i][0]) ? i - 1 : i];
        }
        e[i][0] < t ? (n = i + 1) : (s = i - 1);
      }
      return null;
    },
    Te = {
      font: '9px sans-serif',
      fontColor: 'black',
      overlayColor: 'rgba(112, 112, 112, 0.5)',
      graphStrokeColor: 'rgba(0, 0, 0, 0.10)',
      graphFillColor: 'rgba(0, 0, 0, 0.15)',
      flameChartGraphType: 'smooth',
      waterfallStrokeOpacity: 0.4,
      waterfallFillOpacity: 0.35,
      waterfallGraphType: 'smooth',
      bottomLineColor: 'rgba(0, 0, 0, 0.25)',
      knobColor: 'rgb(131, 131, 131)',
      knobStrokeColor: 'white',
      knobSize: 6,
      height: 60,
      backgroundColor: 'white'
    };
  class Se extends a {
    constructor({ waterfall: e, flameChartNodes: t, timeseries: i, settings: n, name: s = 'timeframeSelectorPlugin' }) {
      super(s),
        (this.styles = Te),
        (this.height = 0),
        (this.leftKnobMoving = !1),
        (this.rightKnobMoving = !1),
        (this.selectingActive = !1),
        (this.startSelectingPosition = 0),
        (this.actualClusters = []),
        (this.clusters = []),
        (this.flameChartMaxLevel = 0),
        (this.flameChartDots = []),
        (this.waterfallDots = []),
        (this.waterfallMaxLevel = 0),
        (this.actualClusterizedFlatTree = []),
        (this.hoveredRegion = null),
        (this.flameChartNodes = t),
        (this.waterfall = e),
        (this.timeseries = i),
        (this.shouldRender = !0),
        this.setSettings(n);
    }
    init(e, t) {
      super.init(e, t),
        this.interactionsEngine.on('down', this.handleMouseDown.bind(this)),
        this.interactionsEngine.on('up', this.handleMouseUp.bind(this)),
        this.interactionsEngine.on('move', this.handleMouseMove.bind(this)),
        this.interactionsEngine.on('hover', this.handleHover.bind(this)),
        this.setSettings();
    }
    handleHover(e) {
      this.hoveredRegion = e;
    }
    handleMouseDown(e, t) {
      e &&
        ('timeframeKnob' === e.type
          ? ('left' === e.data ? (this.leftKnobMoving = !0) : (this.rightKnobMoving = !0), this.interactionsEngine.setCursor('ew-resize'))
          : 'timeframeArea' === e.type && ((this.selectingActive = !0), (this.startSelectingPosition = t.x)));
    }
    handleMouseUp(e, t, i) {
      let n = !1;
      if (
        (this.timeout && (n = !0),
        clearTimeout(this.timeout),
        (this.timeout = window.setTimeout(() => (this.timeout = void 0), 300)),
        (this.leftKnobMoving = !1),
        (this.rightKnobMoving = !1),
        this.interactionsEngine.clearCursor(),
        this.selectingActive && !i && this.applyChanges(),
        (this.selectingActive = !1),
        i && !n)
      ) {
        const e = this.getRightKnobPosition(),
          i = this.getLeftKnobPosition();
        t.x > e || (t.x > i && t.x < e && t.x - i > e - t.x) ? this.setRightKnobPosition(t.x) : this.setLeftKnobPosition(t.x),
          this.applyChanges();
      }
      n &&
        (this.renderEngine.parent.setZoom(this.renderEngine.getInitialZoom()),
        this.renderEngine.parent.setPositionX(this.renderEngine.min),
        this.renderEngine.parent.render());
    }
    handleMouseMove(e, t) {
      this.leftKnobMoving && (this.setLeftKnobPosition(t.x), this.applyChanges()),
        this.rightKnobMoving && (this.setRightKnobPosition(t.x), this.applyChanges()),
        this.selectingActive &&
          (this.startSelectingPosition >= t.x
            ? (this.setLeftKnobPosition(t.x), this.setRightKnobPosition(this.startSelectingPosition))
            : (this.setRightKnobPosition(t.x), this.setLeftKnobPosition(this.startSelectingPosition)),
          this.renderEngine.render());
    }
    postInit() {
      (this.offscreenRenderEngine = this.renderEngine.makeChild()),
        this.offscreenRenderEngine.setSettingsOverrides({ styles: this.styles }),
        (this.timeGrid = new ve({ styles: this.renderEngine.parent.timeGrid.styles })),
        this.timeGrid.setDefaultRenderEngine(this.offscreenRenderEngine),
        this.offscreenRenderEngine.on('resize', () => {
          this.offscreenRenderEngine.setZoom(this.renderEngine.getInitialZoom()), this.offscreenRender();
        }),
        this.offscreenRenderEngine.on('min-max-change', () => (this.shouldRender = !0)),
        this.setData({ flameChartNodes: this.flameChartNodes, waterfall: this.waterfall, timeseries: this.timeseries });
    }
    setLeftKnobPosition(e) {
      if (e < this.getRightKnobPosition() - 1) {
        const t = this.renderEngine.getRealView(),
          i = this.renderEngine.setPositionX(this.offscreenRenderEngine.pixelToTime(e) + this.renderEngine.min),
          n = this.renderEngine.width / (t - i);
        this.renderEngine.setZoom(n);
      }
    }
    setRightKnobPosition(e) {
      if (e > this.getLeftKnobPosition() + 1) {
        const t = this.renderEngine.getRealView(),
          i = this.renderEngine.positionX + t - (this.offscreenRenderEngine.pixelToTime(e) + this.renderEngine.min),
          n = this.renderEngine.width / (t - i);
        this.renderEngine.setZoom(n);
      }
    }
    getLeftKnobPosition() {
      return (this.renderEngine.positionX - this.renderEngine.min) * this.renderEngine.getInitialZoom();
    }
    getRightKnobPosition() {
      return (this.renderEngine.positionX - this.renderEngine.min + this.renderEngine.getRealView()) * this.renderEngine.getInitialZoom();
    }
    applyChanges() {
      this.renderEngine.parent.setPositionX(this.renderEngine.positionX),
        this.renderEngine.parent.setZoom(this.renderEngine.zoom),
        this.renderEngine.parent.render();
    }
    setSettings({ styles: e } = { styles: this.styles }) {
      (this.styles = l(Te, e)),
        (this.height = this.styles.height),
        this.offscreenRenderEngine &&
          (this.offscreenRenderEngine.setSettingsOverrides({ styles: this.styles }),
          this.timeGrid.setSettings({ styles: this.renderEngine.parent.timeGrid.styles })),
        (this.shouldRender = !0);
    }
    makeFlameChartDots() {
      if (this.flameChartNodes) {
        const e = [],
          t = f(this.flameChartNodes),
          { min: i, max: n } = m(t);
        (this.min = i),
          (this.max = n),
          (this.clusters = v(t, () => !0)),
          (this.actualClusters = x(this.clusters, this.renderEngine.zoom, this.min, this.max, 2, 1 / 0)),
          (this.actualClusterizedFlatTree = b(this.actualClusters, this.renderEngine.zoom, this.min, this.max, 2, 1 / 0).sort(
            (e, t) => e.start - t.start
          )),
          this.actualClusterizedFlatTree.forEach(({ start: t, end: i }) => {
            e.push({ time: t, type: 'start' }, { time: i, type: 'end' });
          }),
          e.sort((e, t) => e.time - t.time);
        const { dots: s, maxLevel: r } = this.makeRenderDots(e);
        (this.flameChartDots = s), (this.flameChartMaxLevel = r);
      }
    }
    makeRenderDots(e) {
      const t = [];
      let i = 0,
        n = 0;
      return (
        e.forEach(({ type: e, time: s }) => {
          ('start' !== e && 'end' !== e) || t.push([s, i]), 'start' === e ? i++ : i--, (n = Math.max(n, i)), t.push([s, i]);
        }),
        { dots: t, maxLevel: n }
      );
    }
    makeWaterfallDots() {
      if (this.waterfall) {
        const e = be(this.waterfall),
          t = Object.entries(
            e.reduce(
              (e, { intervals: t }) => (
                t.forEach((t) => {
                  const { timeframeChart: i } = t;
                  if (i) {
                    const n = 'string' == typeof i ? i : t.color;
                    e[n] || (e[n] = []), e[n].push(t);
                  }
                }),
                e
              ),
              {}
            )
          ),
          i = t.map(([e, t]) => {
            const i = [];
            return (
              t.forEach(({ start: e, end: t }) => {
                i.push({ type: 'start', time: e }), i.push({ type: 'end', time: t });
              }),
              i.sort((e, t) => e.time - t.time),
              { color: e, points: i }
            );
          });
        let n = 0;
        (this.waterfallDots = i.map(({ color: e, points: t }) => {
          const { dots: i, maxLevel: s } = this.makeRenderDots(t);
          return (n = Math.max(n, s)), { color: e, dots: i };
        })),
          (this.waterfallMaxLevel = n);
      }
    }
    prepareTimeseries() {
      var e;
      (null === (e = this.timeseries) || void 0 === e ? void 0 : e.length)
        ? (this.preparedTimeseries = Me(this.timeseries))
        : (this.preparedTimeseries = void 0);
    }
    setData({ flameChartNodes: e, waterfall: t, timeseries: i }) {
      (this.flameChartNodes = e),
        (this.waterfall = t),
        (this.timeseries = i),
        this.makeFlameChartDots(),
        this.makeWaterfallDots(),
        this.prepareTimeseries(),
        this.offscreenRender();
    }
    setTimeseries(e) {
      (this.timeseries = e), this.prepareTimeseries(), this.offscreenRender();
    }
    setFlameChartNodes(e) {
      (this.flameChartNodes = e), this.makeFlameChartDots(), this.offscreenRender();
    }
    setWaterfall(e) {
      (this.waterfall = e), this.makeWaterfallDots(), this.offscreenRender();
    }
    offscreenRender() {
      const e = this.offscreenRenderEngine.getInitialZoom();
      if (
        (this.offscreenRenderEngine.setZoom(e),
        this.offscreenRenderEngine.setPositionX(this.offscreenRenderEngine.min),
        this.offscreenRenderEngine.clear(),
        this.timeGrid.recalc(),
        this.timeGrid.renderLines(0, this.offscreenRenderEngine.height),
        this.timeGrid.renderTimes(),
        Re({
          engine: this.offscreenRenderEngine,
          points: this.flameChartDots,
          min: 0,
          max: this.flameChartMaxLevel,
          style: { lineColor: this.styles.graphStrokeColor, fillColor: this.styles.graphFillColor, type: this.styles.flameChartGraphType }
        }),
        this.waterfallDots.forEach(({ color: e, dots: t }) => {
          const i = new de(e);
          Re({
            engine: this.offscreenRenderEngine,
            points: t,
            min: 0,
            max: this.waterfallMaxLevel,
            style: {
              lineColor: i.alpha(this.styles.waterfallStrokeOpacity).rgb().toString(),
              fillColor: i.alpha(this.styles.waterfallFillOpacity).rgb().toString(),
              type: this.styles.waterfallGraphType
            }
          });
        }),
        this.preparedTimeseries)
      ) {
        const { summary: e, timeseries: t } = this.preparedTimeseries;
        t.forEach((t) => {
          const i = Ce(t.points, t, e);
          Re({ engine: this.offscreenRenderEngine, points: t.points, min: i.min, max: i.max, style: t.style });
        });
      }
      this.offscreenRenderEngine.setCtxValue('fillStyle', this.styles.bottomLineColor),
        this.offscreenRenderEngine.ctx.fillRect(0, this.height - 1, this.offscreenRenderEngine.width, 1);
    }
    renderTimeframe() {
      const e = this.renderEngine.positionX - this.renderEngine.min,
        t = e * this.renderEngine.getInitialZoom(),
        i = (e + this.renderEngine.getRealView()) * this.renderEngine.getInitialZoom(),
        n = t - this.styles.knobSize / 2,
        s = i - this.styles.knobSize / 2,
        r = this.renderEngine.height / 3;
      this.renderEngine.setCtxValue('fillStyle', this.styles.overlayColor),
        this.renderEngine.fillRect(0, 0, t, this.renderEngine.height),
        this.renderEngine.fillRect(i, 0, this.renderEngine.width - i, this.renderEngine.height),
        this.renderEngine.setCtxValue('fillStyle', this.styles.overlayColor),
        this.renderEngine.fillRect(t - 1, 0, 1, this.renderEngine.height),
        this.renderEngine.fillRect(i + 1, 0, 1, this.renderEngine.height),
        this.renderEngine.setCtxValue('fillStyle', this.styles.knobColor),
        this.renderEngine.fillRect(n, 0, this.styles.knobSize, r),
        this.renderEngine.fillRect(s, 0, this.styles.knobSize, r),
        this.renderEngine.renderStroke(this.styles.knobStrokeColor, n, 0, this.styles.knobSize, r),
        this.renderEngine.renderStroke(this.styles.knobStrokeColor, s, 0, this.styles.knobSize, r),
        this.interactionsEngine.addHitRegion('timeframeKnob', 'left', n, 0, this.styles.knobSize, r, 'ew-resize'),
        this.interactionsEngine.addHitRegion('timeframeKnob', 'right', s, 0, this.styles.knobSize, r, 'ew-resize'),
        this.interactionsEngine.addHitRegion('timeframeArea', null, 0, 0, this.renderEngine.width, this.renderEngine.height, 'text');
    }
    renderTooltip() {
      if (this.hoveredRegion) {
        const e = this.interactionsEngine.getMouse().x / this.renderEngine.getInitialZoom() + this.renderEngine.min,
          t = `${e.toFixed(this.renderEngine.getAccuracy() + 2)} ${this.renderEngine.timeUnits}`,
          i = this.preparedTimeseries ? ke(e, this.preparedTimeseries) : [];
        return this.renderEngine.renderTooltipFromData([{ text: t }, ...i], this.interactionsEngine.getGlobalMouse()), !0;
      }
      return !1;
    }
    render() {
      return (
        this.shouldRender && ((this.shouldRender = !1), this.offscreenRender()),
        this.renderEngine.copy(this.offscreenRenderEngine),
        this.renderTimeframe(),
        this.interactionsEngine.addHitRegion('timeframe', null, 0, 0, this.renderEngine.width, this.height),
        !0
      );
    }
  }
  const Le = { height: 56 };
  class ze extends a {
    constructor({ name: e = 'timeseriesPlugin', data: t, settings: i }) {
      super(e), (this.height = 56), (this.hoveredRegion = null), this.setSettings(i), this.setData(t);
    }
    init(e, t) {
      super.init(e, t),
        this.interactionsEngine.on('change-position', this.handlePositionChange.bind(this)),
        this.interactionsEngine.on('hover', this.handleHover.bind(this)),
        this.interactionsEngine.on('up', this.handleMouseUp.bind(this));
    }
    handlePositionChange(e) {
      const t = this.renderEngine.parent.positionX;
      this.interactionsEngine.setCursor('grabbing'),
        this.renderEngine.tryToChangePosition(e.deltaX),
        t !== this.renderEngine.parent.positionX && this.renderEngine.parent.render();
    }
    handleMouseUp() {
      this.interactionsEngine.clearCursor();
    }
    setSettings({ styles: e } = { styles: this.styles }) {
      (this.styles = l(Le, e)), (this.height = this.styles.height);
    }
    setData(e) {
      const t = Me(e);
      (this.data = t),
        (this.min = t.total.min),
        (this.max = t.total.max),
        this.renderEngine && (this.renderEngine.recalcMinMax(), this.renderEngine.resetParentView());
    }
    handleHover(e) {
      this.hoveredRegion = e;
    }
    renderTooltip() {
      if (this.hoveredRegion) {
        const e = this.interactionsEngine.getMouse().x,
          t = this.renderEngine.pixelToTime(e) + this.renderEngine.positionX,
          i = `${t.toFixed(this.renderEngine.getAccuracy() + 2)} ${this.renderEngine.timeUnits}`,
          n = ke(t, this.data);
        return this.renderEngine.renderTooltipFromData([{ text: i }, ...n], this.interactionsEngine.getGlobalMouse()), !0;
      }
      return !1;
    }
    render() {
      if (0 === this.data.timeseries.length) return;
      const e = this.renderEngine.positionX,
        t = this.renderEngine.positionX + this.renderEngine.getRealView();
      this.data.timeseries.forEach((i, n) => {
        if (this.data.timeboxes[n].end < e || this.data.timeboxes[n].start > t) return;
        const s = e <= this.data.timeboxes[n].start ? 0 : Math.max(i.points.findIndex(([t]) => t >= e) - 2, 0),
          r = t >= this.data.timeboxes[n].end ? i.points.length : i.points.findIndex(([e]) => e >= t) + 2,
          o = i.points.slice(s, r),
          h = Ce(o, i, this.data.summary);
        Re({ engine: this.renderEngine, points: o, min: h.min, max: h.max, style: i.style });
      }),
        this.interactionsEngine.addHitRegion('timeseries', null, 0, 0, this.renderEngine.width, this.height);
    }
  }
  const He = { defaultHeight: 68, lineWidth: 1, lineHeight: 'inherit' };
  class Fe extends a {
    constructor({ data: e, name: t = 'waterfallPlugin', settings: i }) {
      super(t),
        (this.styles = He),
        (this.height = He.defaultHeight),
        (this.data = []),
        (this.positionY = 0),
        (this.hoveredRegion = null),
        (this.selectedRegion = null),
        (this.initialData = []),
        this.setData(e),
        this.setSettings(i);
    }
    init(e, t) {
      super.init(e, t),
        this.interactionsEngine.on('change-position', this.handlePositionChange.bind(this)),
        this.interactionsEngine.on('hover', this.handleHover.bind(this)),
        this.interactionsEngine.on('select', this.handleSelect.bind(this)),
        this.interactionsEngine.on('up', this.handleMouseUp.bind(this));
    }
    handlePositionChange({ deltaX: e, deltaY: t }) {
      const i = this.positionY,
        n = this.renderEngine.parent.positionX;
      this.interactionsEngine.setCursor('grabbing'),
        this.positionY + t >= 0 ? this.setPositionY(this.positionY + t) : this.setPositionY(0),
        this.renderEngine.tryToChangePosition(e),
        (n === this.renderEngine.parent.positionX && i === this.positionY) || this.renderEngine.parent.render();
    }
    handleMouseUp() {
      this.interactionsEngine.clearCursor();
    }
    handleHover(e) {
      this.hoveredRegion = e;
    }
    handleSelect(e) {
      var t;
      if (this.selectedRegion !== e) {
        this.selectedRegion = e;
        const i = null !== (t = null == e ? void 0 : e.data) && void 0 !== t ? t : null;
        this.emit('select', { node: null !== i ? this.initialData[i] : null, type: 'waterfall-node' }), this.renderEngine.render();
      }
    }
    setPositionY(e) {
      this.positionY = e;
    }
    setSettings({ styles: e }) {
      (this.styles = l(He, e)), (this.height = this.styles.defaultHeight), (this.positionY = 0);
    }
    setData(e) {
      (this.positionY = 0),
        (this.initialData = e.items),
        (this.data = be(e)),
        e.items.length &&
          ((this.min = this.data.reduce((e, { min: t }) => Math.min(e, t), this.data[0].min)),
          (this.max = this.data.reduce((e, { max: t }) => Math.max(e, t), this.data[0].max))),
        this.renderEngine && (this.renderEngine.recalcMinMax(), this.renderEngine.resetParentView());
    }
    calcRect(e, t, i) {
      const n = t * this.renderEngine.zoom;
      return { x: this.renderEngine.timeToPosition(e), w: i ? (n <= 0.1 ? 0.1 : n >= 3 ? n - 1 : n - n / 3) : n };
    }
    renderTooltip() {
      if (this.hoveredRegion) {
        if (!1 === this.renderEngine.options.tooltip) return !0;
        if ('function' == typeof this.renderEngine.options.tooltip) {
          const { data: e } = this.hoveredRegion,
            t = { ...this.hoveredRegion };
          (t.data = this.data.find(({ index: t }) => e === t)),
            this.renderEngine.options.tooltip(t, this.renderEngine, this.interactionsEngine.getGlobalMouse());
        } else {
          const { data: e } = this.hoveredRegion,
            t = this.data.find(({ index: t }) => e === t);
          if (t) {
            const { name: e, intervals: i, timing: n, meta: s = [] } = t,
              r = this.renderEngine.getTimeUnits(),
              o = this.renderEngine.getAccuracy() + 2,
              h = { text: `${e}` },
              a = { text: 'intervals', color: this.renderEngine.styles.tooltipHeaderFontColor },
              l = i.map(({ name: e, start: t, end: i }) => ({ text: `${e}: ${(i - t).toFixed(o)} ${r}` })),
              c = { text: 'timing', color: this.renderEngine.styles.tooltipHeaderFontColor },
              d = Object.entries(n)
                .filter(([, e]) => 'number' == typeof e)
                .map(([e, t]) => ({ text: `${e}: ${t.toFixed(o)} ${r}` })),
              g = { text: 'meta', color: this.renderEngine.styles.tooltipHeaderFontColor },
              u = s ? s.map(({ name: e, value: t, color: i }) => ({ text: `${e}: ${t}`, color: i })) : [];
            this.renderEngine.renderTooltipFromData(
              [h, a, ...l, c, ...d, ...(u.length ? [g, ...u] : [])],
              this.interactionsEngine.getGlobalMouse()
            );
          }
        }
        return !0;
      }
      return !1;
    }
    render() {
      const e = this.renderEngine.positionX + this.renderEngine.getRealView(),
        t = this.renderEngine.positionX,
        i = this.renderEngine.blockHeight + 1,
        n = [];
      this.data
        .filter(({ min: i, max: n }) => !((e < i && e < n) || (t > n && e > i)))
        .map((e) => {
          for (; n.length && e.min - d(n).max > 0; ) n.pop();
          const t = n.length,
            i = { ...e, level: t };
          return n.push(e), i;
        })
        .forEach(({ name: e, intervals: t, textBlock: n, level: s, index: r }) => {
          const o = s * i - this.positionY;
          if (o + i >= 0 && o - i <= this.renderEngine.height) {
            const s = this.renderEngine.timeToPosition(n.start),
              h = this.renderEngine.timeToPosition(n.end);
            this.renderEngine.addText({ text: e, x: s, y: o, w: h - s });
            const { x: a, w: l } = t.reduce(
              (e, { color: n, pattern: s, start: r, end: h, type: a }, l) => {
                const { x: c, w: d } = this.calcRect(r, h - r, l === t.length - 1);
                if ('block' === a) this.renderEngine.addRect({ color: n, pattern: s, x: c, y: o, w: d });
                else if ('line' === a) {
                  const e = Math.min(this.styles.lineWidth, d);
                  if (
                    (this.renderEngine.addRect({
                      color: n,
                      pattern: s,
                      x: 0 === l ? c + e : c,
                      y: o + (i - this.styles.lineWidth) / 2,
                      w: l === t.length - 1 ? d - e : d,
                      h: this.styles.lineWidth
                    }),
                    0 === l || l === t.length - 1)
                  ) {
                    const t = 'inherit' === this.styles.lineHeight ? i / 2 : this.styles.lineHeight;
                    this.renderEngine.addRect({ color: n, pattern: s, x: 0 === l ? c : c + d - e, y: o + (i - t) / 2, w: e, h: t });
                  }
                }
                return { x: null === e.x ? c : e.x, w: d + e.w };
              },
              { x: null, w: 0 }
            );
            if (this.selectedRegion && 'waterfall-node' === this.selectedRegion.type) {
              this.selectedRegion.data === r &&
                this.renderEngine.addStroke({ color: 'green', x: null != a ? a : 0, y: o, w: l, h: this.renderEngine.blockHeight });
            }
            this.interactionsEngine.addHitRegion('waterfall-node', r, null != a ? a : 0, o, l, this.renderEngine.blockHeight);
          }
        }, 0);
    }
  }
  const De = {
    height: 16,
    color: 'rgb(202,202,202, 0.25)',
    strokeColor: 'rgb(138,138,138, 0.50)',
    dotsColor: 'rgb(97,97,97)',
    fontColor: 'black',
    font: '10px sans-serif',
    triangleWidth: 10,
    triangleHeight: 7,
    triangleColor: 'black',
    leftPadding: 10
  };
  class Ae extends a {
    constructor(e, t) {
      super('togglePlugin'),
        (this.styles = De),
        (this.height = 0),
        (this.resizeActive = !1),
        (this.resizeStartHeight = 0),
        (this.resizeStartPosition = 0),
        this.setSettings(t),
        (this.title = e);
    }
    setSettings({ styles: e } = {}) {
      (this.styles = l(De, e)), (this.height = this.styles.height + 1);
    }
    init(e, t) {
      super.init(e, t);
      this.getNextEngine().setFlexible(),
        this.interactionsEngine.on('click', (e) => {
          if (e && 'toggle' === e.type && e.data === this.renderEngine.id) {
            const e = this.getNextEngine();
            e.collapsed ? e.expand() : e.collapse(), this.renderEngine.parent.recalcChildrenLayout(), this.renderEngine.parent.render();
          }
        }),
        this.interactionsEngine.on('down', (e) => {
          if (e && 'knob-resize' === e.type && e.data === this.renderEngine.id) {
            const e = this.getPrevEngine();
            this.interactionsEngine.setCursor('row-resize'),
              (this.resizeActive = !0),
              (this.resizeStartHeight = e.height),
              (this.resizeStartPosition = this.interactionsEngine.getGlobalMouse().y);
          }
        }),
        this.interactionsEngine.parent.on('move', () => {
          if (this.resizeActive) {
            const e = this.getPrevEngine(),
              t = this.interactionsEngine.getGlobalMouse();
            if (e.flexible) {
              const i = this.resizeStartHeight - (this.resizeStartPosition - t.y);
              i <= 0 ? (e.collapse(), e.resize({ height: 0 })) : (e.collapsed && e.expand(), e.resize({ height: i })),
                this.renderEngine.parent.render();
            }
          }
        }),
        this.interactionsEngine.parent.on('up', () => {
          this.interactionsEngine.clearCursor(), (this.resizeActive = !1);
        });
    }
    getPrevEngine() {
      var e;
      const t = (null !== (e = this.renderEngine.id) && void 0 !== e ? e : 0) - 1;
      return this.renderEngine.parent.children[t];
    }
    getNextEngine() {
      var e;
      const t = (null !== (e = this.renderEngine.id) && void 0 !== e ? e : 0) + 1;
      return this.renderEngine.parent.children[t];
    }
    render() {
      const e = this.getNextEngine(),
        t = this.getPrevEngine(),
        i = this.styles.leftPadding + this.styles.triangleWidth,
        n = this.renderEngine.width / 2,
        s = this.styles.height / 2;
      this.renderEngine.setCtxFont(this.styles.font),
        this.renderEngine.setCtxValue('fillStyle', this.styles.color),
        this.renderEngine.setCtxValue('strokeStyle', this.styles.strokeColor),
        this.renderEngine.fillRect(0, 0, this.renderEngine.width, this.styles.height),
        this.renderEngine.setCtxValue('fillStyle', this.styles.fontColor),
        this.renderEngine.addText({ text: this.title, x: i, y: 0, w: this.renderEngine.width }),
        e.collapsed
          ? this.renderEngine.renderTriangle({
              color: this.styles.triangleColor,
              x: this.styles.leftPadding + this.styles.triangleHeight / 2,
              y: (this.styles.height - this.styles.triangleWidth) / 2,
              width: this.styles.triangleWidth,
              height: this.styles.triangleHeight,
              direction: 'right'
            })
          : this.renderEngine.renderTriangle({
              color: this.styles.triangleColor,
              x: this.styles.leftPadding,
              y: (this.styles.height - this.styles.triangleHeight) / 2,
              width: this.styles.triangleWidth,
              height: this.styles.triangleHeight,
              direction: 'bottom'
            });
      const { width: r } = this.renderEngine.ctx.measureText(this.title),
        o = r + i;
      this.interactionsEngine.addHitRegion('toggle', this.renderEngine.id, 0, 0, o, this.styles.height, 'pointer'),
        t.flexible &&
          (this.renderEngine.renderCircle(this.styles.dotsColor, n, s, 1.5),
          this.renderEngine.renderCircle(this.styles.dotsColor, n - 10, s, 1.5),
          this.renderEngine.renderCircle(this.styles.dotsColor, n + 10, s, 1.5),
          this.interactionsEngine.addHitRegion(
            'knob-resize',
            this.renderEngine.id,
            o,
            0,
            this.renderEngine.width - o,
            this.styles.height,
            'row-resize'
          ));
    }
  }
  const Oe = () => {
      const e = document.createElement('canvas');
      return { ctx: e.getContext('2d'), canvas: e };
    },
    Ge =
      ({ color: e = 'black', background: t = 'rgb(255,255,255, 0)', lineWidth: i = 6, spacing: n = 4, angle: s = 45, dash: r } = {}) =>
      (o) => {
        const { ctx: h, canvas: a } = Oe();
        h.setTransform(4, 0, 0, 4, 0, 0), (a.height = 4 * o.blockHeight);
        const l = 4 * i,
          c = 4 * n + l,
          d = (s * Math.PI) / 180,
          g = (d > (3 * Math.PI) / 2 && d < 2 * Math.PI) || (d > Math.PI / 2 && d < Math.PI),
          u = d === Math.PI || d === 2 * Math.PI,
          f = d === Math.PI / 2 || d === (3 * Math.PI) / 2,
          m = u || f ? (u ? l : l + c / 2) : Math.abs(Math.ceil(c / Math.cos(Math.PI / 2 - d)));
        (a.width = m),
          (h.fillStyle = t),
          h.fillRect(0, 0, a.width, a.height),
          (h.strokeStyle = e),
          (h.lineWidth = l),
          (h.lineCap = 'square');
        let p = 0;
        if ((h.beginPath(), r && h.setLineDash(r.map((e) => 4 * e)), u))
          for (p = l / 2; p <= a.height; ) h.moveTo(0, p), h.lineTo(m, p), (p += c);
        else if (f) h.moveTo(m / 2, 0), h.lineTo(m / 2, a.height);
        else {
          const e = Math.abs(c / Math.cos(d)),
            t = Math.abs(Math.ceil(Math.sin(d) * l));
          if (g) for (p = a.height; p >= 0 - l; ) h.moveTo(0, p + t), (p -= e), h.lineTo(m, p + t);
          else for (; p <= a.height + l; ) h.moveTo(0, p - t), (p += e), h.lineTo(m, p - t);
        }
        h.stroke();
        return { pattern: o.ctx.createPattern(a, 'repeat'), width: m, scale: 4 };
      },
    Xe =
      ({
        color: e = 'black',
        background: t = 'rgb(255,255,255, 0)',
        size: i = 2,
        rows: n,
        align: s = 'center',
        spacing: r = 2,
        verticalSpicing: o = r,
        horizontalSpicing: h = r
      } = {}) =>
      (r) => {
        const { ctx: a, canvas: l } = Oe(),
          c = 4 * i,
          d = c / 2,
          g = 4 * o,
          u = 4 * (i + (4 * h) / 4),
          f = 4 * r.blockHeight,
          m = n || Math.floor(f / (c + g));
        a.setTransform(4, 0, 0, 4, 0, 0),
          (l.height = f),
          (l.width = u),
          (a.fillStyle = t),
          a.fillRect(0, 0, l.width, l.height),
          (a.fillStyle = e);
        const p = f - ((c + g) * m - g),
          y = 'center' === s ? p / 2 : 'top' === s ? 0 : p;
        for (let e = 0; e < m; e++) a.arc(u / 2, y + (c + g) * e + d, d, 0, 2 * Math.PI), a.fill();
        return { pattern: r.ctx.createPattern(l, 'repeat'), width: u, scale: 4 };
      },
    Ie =
      ({ colors: e }) =>
      (t) => {
        const { ctx: i, canvas: n } = Oe(),
          s = 4 * t.blockHeight;
        i.setTransform(4, 0, 0, 4, 0, 0), (n.height = s), (n.width = 4);
        const r = i.createLinearGradient(0, 0, 4, s);
        for (const { offset: t, color: i } of e) r.addColorStop(t, i);
        (i.fillStyle = r), i.fillRect(0, 0, 4, s);
        return { pattern: t.ctx.createPattern(n, 'repeat'), width: 4, scale: 4 };
      },
    Ve =
      ({
        color: e = 'black',
        background: t = 'rgb(255,255,255, 0)',
        width: i = 16,
        height: n = i / 2,
        align: s = 'center',
        direction: r = 'right',
        spacing: o = i
      }) =>
      (h) => {
        const { ctx: a, canvas: l } = Oe(),
          c = g(4 * i, 4 * n, r),
          d = Math.max(...c.map(({ x: e }) => e)),
          u = Math.max(...c.map(({ y: e }) => e)),
          f = d + 4 * o,
          m = 4 * h.blockHeight,
          p = 'center' === s ? (m - u) / 2 : 'top' === s ? 0 : m - u;
        a.setTransform(4, 0, 0, 4, 0, 0),
          (l.height = m),
          (l.width = f),
          (a.fillStyle = t),
          a.fillRect(0, 0, l.width, l.height),
          (a.fillStyle = e),
          a.beginPath(),
          a.moveTo(c[0].x, c[0].y + p),
          c.slice(1).forEach(({ x: e, y: t }) => a.lineTo(e, t + p)),
          a.closePath(),
          a.fill();
        return { pattern: h.ctx.createPattern(l, 'repeat'), width: f, scale: 4 };
      },
    Ue = { stripes: Ge, dots: Xe, gradient: Ie, triangles: Ve };
  const We = {
      stripes: Ge,
      dots: Xe,
      gradient: Ie,
      triangles: Ve,
      combined: (e) => (t) => {
        const { ctx: i, canvas: n } = Oe(),
          s = e.map((e) => ('creator' in e ? e.creator(t) : Ue[e.type](e.config)(t))),
          r = 4 * t.blockHeight,
          o = (function (e, t = 1 / 0) {
            const i = Math.max(...e);
            if (e.every((e) => i % e == 0)) return i;
            let n = 1;
            for (; n < t; ) {
              let t = !0;
              for (let i = 0; i < e.length; i++)
                if (n % e[i] != 0) {
                  t = !1;
                  break;
                }
              if (t) return n;
              n++;
            }
            return t;
          })(
            s.map(({ width: e = 1, scale: t = 1 }) => e * (4 / t)),
            4 * t.width
          ),
          h = Math.max(...s.map((e) => e.scale || 1));
        i.setTransform(h, 0, 0, h, 0, 0),
          (n.height = r),
          (n.width = o),
          s.forEach(({ scale: e = 1, pattern: t }) => {
            (i.fillStyle = t), t.setTransform(new DOMMatrixReadOnly().scale(4 / e, 4 / e)), i.fillRect(0, 0, o, r);
          });
        return { pattern: t.ctx.createPattern(n, 'repeat'), width: o, scale: 4 };
      }
    },
    Ne = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890_-+()[]{}\\/|\'";:.,?~';
  const je = { tooltip: void 0, timeUnits: 'ms' },
    _e = {
      blockHeight: 16,
      blockPaddingLeftRight: 4,
      backgroundColor: 'white',
      font: '10px sans-serif',
      fontColor: 'black',
      badgeSize: 8,
      tooltipHeaderFontColor: 'black',
      tooltipBodyFontColor: '#688f45',
      tooltipBackgroundColor: 'white',
      tooltipShadowColor: 'black',
      tooltipShadowBlur: 6,
      tooltipShadowOffsetX: 0,
      tooltipShadowOffsetY: 0,
      headerHeight: 14,
      headerColor: 'rgba(112, 112, 112, 0.25)',
      headerStrokeColor: 'rgba(112, 112, 112, 0.5)',
      headerTitleLeftPadding: 16
    };
  class Ye extends i {
    constructor(e, t) {
      super(),
        (this.options = je),
        (this.timeUnits = 'ms'),
        (this.styles = _e),
        (this.blockPaddingLeftRight = 0),
        (this.blockHeight = 0),
        (this.blockPaddingTopBottom = 0),
        (this.charHeight = 0),
        (this.placeholderWidth = 0),
        (this.avgCharWidth = 0),
        (this.minTextWidth = 0),
        (this.queue = {}),
        (this.zoom = 0),
        (this.positionX = 0),
        (this.min = 0),
        (this.max = 0),
        (this.patterns = {}),
        (this.ctxCachedSettings = {}),
        (this.ctxCachedCalls = {}),
        (this.setCtxValue = (e, t) => {
          this.ctxCachedSettings[e] !== t && ((this.ctx[e] = t), (this.ctxCachedSettings[e] = t));
        }),
        (this.callCtx = (e, t) => {
          (this.ctxCachedCalls[e] && this.ctxCachedCalls[e] === t) || (this.ctx[e](t), (this.ctxCachedCalls[e] = t));
        }),
        (this.width = e.width),
        (this.height = e.height),
        (this.isSafari = (() => {
          const e = navigator.userAgent.toLowerCase();
          return !!e.includes('safari') && !e.includes('chrome');
        })()),
        (this.canvas = e),
        (this.ctx = e.getContext('2d', { alpha: !1 })),
        (this.pixelRatio = (function (e) {
          const t = e;
          return (
            (window.devicePixelRatio || 1) /
            (t.webkitBackingStorePixelRatio ||
              t.mozBackingStorePixelRatio ||
              t.msBackingStorePixelRatio ||
              t.oBackingStorePixelRatio ||
              t.backingStorePixelRatio ||
              1)
          );
        })(this.ctx)),
        this.setSettings(t),
        this.applyCanvasSize(),
        this.reset();
    }
    setSettings({ options: e, styles: t, patterns: i }) {
      if (((this.options = l(je, e)), (this.styles = l(_e, t)), i)) {
        const e = i.filter((e) => 'creator' in e);
        i.filter((e) => !('creator' in e)).forEach((e) => this.createDefaultPattern(e)), e.forEach((e) => this.createBlockPattern(e));
      }
      (this.timeUnits = this.options.timeUnits), (this.blockHeight = this.styles.blockHeight), (this.ctx.font = this.styles.font);
      const { actualBoundingBoxAscent: n, actualBoundingBoxDescent: s, width: r } = this.ctx.measureText(Ne),
        { width: o } = this.ctx.measureText('…'),
        h = n + s;
      (this.blockPaddingLeftRight = this.styles.blockPaddingLeftRight),
        (this.blockPaddingTopBottom = Math.ceil((this.blockHeight - h) / 2)),
        (this.charHeight = h + 1),
        (this.placeholderWidth = o),
        (this.avgCharWidth = r / 82),
        (this.minTextWidth = this.avgCharWidth + this.placeholderWidth);
    }
    reset() {
      (this.queue = {}), (this.ctxCachedCalls = {}), (this.ctxCachedSettings = {});
    }
    setCtxShadow(e) {
      var t, i;
      this.setCtxValue('shadowBlur', e.blur),
        this.setCtxValue('shadowColor', e.color),
        this.setCtxValue('shadowOffsetY', null !== (t = e.offsetY) && void 0 !== t ? t : 0),
        this.setCtxValue('shadowOffsetX', null !== (i = e.offsetX) && void 0 !== i ? i : 0);
    }
    setCtxFont(e) {
      e && this.ctx.font !== e && (this.ctx.font = e);
    }
    fillRect(e, t, i, n) {
      this.ctx.fillRect(e, t, i, n);
    }
    fillText(e, t, i) {
      this.ctx.fillText(e, t, i);
    }
    renderBlock(e, t, i, n) {
      this.ctx.fillRect(e, t, i, null != n ? n : this.blockHeight);
    }
    renderStroke(e, t, i, n, s) {
      this.setCtxValue('strokeStyle', e), this.ctx.setLineDash([]), this.ctx.strokeRect(t, i, n, s);
    }
    clear(e = this.width, t = this.height, i = 0, n = 0) {
      this.setCtxValue('fillStyle', this.styles.backgroundColor),
        this.ctx.clearRect(i, n, e, t - 1),
        this.ctx.fillRect(i, n, e, t),
        (this.ctxCachedCalls = {}),
        (this.ctxCachedSettings = {}),
        this.emit('clear');
    }
    timeToPosition(e) {
      return e * this.zoom - this.positionX * this.zoom;
    }
    pixelToTime(e) {
      return e / this.zoom;
    }
    setZoom(e) {
      this.zoom = e;
    }
    setPositionX(e) {
      const t = this.positionX;
      return (this.positionX = e), e - t;
    }
    getQueue(e = 0) {
      return this.queue[e] || (this.queue[e] = { text: [], stroke: [], rect: {} }), this.queue[e];
    }
    addRect(e, t = 0) {
      const i = this.getQueue(t);
      (e.pattern = e.pattern || 'none'),
        i.rect[e.pattern] || (i.rect[e.pattern] = {}),
        i.rect[e.pattern][e.color] || (i.rect[e.pattern][e.color] = []),
        i.rect[e.pattern][e.color].push(e);
    }
    addText({ text: e, x: t, y: i, w: n }, s = 0) {
      if (e) {
        const r = n - (2 * this.blockPaddingLeftRight - (t < 0 ? t : 0));
        if (r > 0) {
          this.getQueue(s).text.push({ text: e, x: t, y: i, w: n, textMaxWidth: r });
        }
      }
    }
    addStroke(e, t = 0) {
      this.getQueue(t).stroke.push(e);
    }
    resolveQueue() {
      Object.keys(this.queue)
        .map((e) => parseInt(e))
        .sort()
        .forEach((e) => {
          const { rect: t, text: i, stroke: n } = this.queue[e];
          this.renderRects(t), this.renderTexts(i), this.renderStrokes(n);
        }),
        (this.queue = {});
    }
    renderRects(e) {
      Object.entries(e).forEach(([e, t]) => {
        var i;
        let n,
          s = new DOMMatrixReadOnly(),
          r = 1;
        'none' !== e &&
          this.patterns[e] &&
          ((r = null !== (i = this.patterns[e].scale) && void 0 !== i ? i : r),
          (n = this.patterns[e].pattern),
          1 !== r && (s = s.scale(1 / r, 1 / r)),
          (this.ctx.fillStyle = n),
          (this.ctxCachedSettings.fillStyle = e)),
          Object.entries(t).forEach(([e, t]) => {
            n || this.setCtxValue('fillStyle', e),
              t.forEach((e) => {
                n && n.setTransform(s.translate(e.x * r, e.y * r)), this.renderBlock(e.x, e.y, e.w, e.h);
              });
          });
      });
    }
    renderTexts(e) {
      this.setCtxValue('fillStyle', this.styles.fontColor),
        e.forEach(({ text: e, x: t, y: i, textMaxWidth: n }) => {
          const { width: s } = this.ctx.measureText(e);
          if (s > n) {
            const t = s / e.length,
              i = (Math.floor((n - this.placeholderWidth) / t) - 1) / 2;
            e = i > 0 ? e.slice(0, Math.ceil(i)) + '…' + e.slice(e.length - Math.floor(i), e.length) : '';
          }
          e && this.ctx.fillText(e, (t < 0 ? 0 : t) + this.blockPaddingLeftRight, i + this.blockHeight - this.blockPaddingTopBottom);
        });
    }
    renderStrokes(e) {
      e.forEach(({ color: e, x: t, y: i, w: n, h: s }) => {
        this.renderStroke(e, t, i, n, s);
      });
    }
    setMinMax(e, t) {
      const i = e !== this.min || t !== this.max;
      (this.min = e), (this.max = t), i && this.emit('min-max-change', e, t);
    }
    getTimeUnits() {
      return this.timeUnits;
    }
    tryToChangePosition(e) {
      const t = this.getRealView();
      this.positionX + e + t <= this.max && this.positionX + e >= this.min
        ? this.setPositionX(this.positionX + e)
        : this.positionX + e <= this.min
          ? this.setPositionX(this.min)
          : this.positionX + e + t >= this.max && this.setPositionX(this.max - t);
    }
    getInitialZoom() {
      return this.max - this.min > 0 ? this.width / (this.max - this.min) : 1;
    }
    getRealView() {
      return this.width / this.zoom;
    }
    resetView() {
      this.setZoom(this.getInitialZoom()), this.setPositionX(this.min);
    }
    resize(e, t) {
      const i = Math.max(0, e || 0),
        n = Math.max(0, t || 0),
        s = 'number' == typeof e && this.width !== i,
        r = 'number' == typeof t && this.height !== n;
      return (
        !(!s && !r) &&
        ((this.width = s ? i : this.width),
        (this.height = r ? n : this.height),
        this.applyCanvasSize(),
        this.emit('resize', { width: this.width, height: this.height }),
        r)
      );
    }
    applyCanvasSize() {
      (this.canvas.style.backgroundColor = 'white'),
        (this.canvas.style.overflow = 'hidden'),
        (this.canvas.style.width = this.width + 'px'),
        (this.canvas.style.height = this.height + 'px'),
        (this.canvas.width = this.width * this.pixelRatio),
        (this.canvas.height = this.height * this.pixelRatio),
        this.ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0),
        (this.ctx.font = this.styles.font);
    }
    copy(e) {
      const t = this.isSafari ? 1 : e.pixelRatio;
      e.canvas.height &&
        this.ctx.drawImage(e.canvas, 0, 0, e.canvas.width * t, e.canvas.height * t, 0, e.position || 0, e.width * t, e.height * t);
    }
    createDefaultPattern({ name: e, type: t, config: i }) {
      const n = We[t];
      n && this.createBlockPattern({ name: e, creator: n(i) });
    }
    createCachedDefaultPattern(e) {
      this.patterns[e.name] || this.createDefaultPattern(e);
    }
    createBlockPattern({ name: e, creator: t }) {
      this.patterns[e] = t(this);
    }
    renderTooltipFromData(e, t) {
      const i = t.x + 10,
        n = t.y + 10,
        s =
          e
            .map(({ text: e }) => e)
            .map((e) => this.ctx.measureText(e))
            .reduce((e, { width: t }) => Math.max(e, t), 0) +
          2 * this.blockPaddingLeftRight;
      this.setCtxShadow({
        color: this.styles.tooltipShadowColor,
        blur: this.styles.tooltipShadowBlur,
        offsetX: this.styles.tooltipShadowOffsetX,
        offsetY: this.styles.tooltipShadowOffsetY
      }),
        this.setCtxValue('fillStyle', this.styles.tooltipBackgroundColor),
        this.ctx.fillRect(i, n, s + 2 * this.blockPaddingLeftRight, (this.charHeight + 2) * e.length + 2 * this.blockPaddingLeftRight),
        this.setCtxShadow({ color: 'transparent', blur: 0 }),
        e.forEach(({ text: e, color: t }, s) => {
          t
            ? this.setCtxValue('fillStyle', t)
            : s
              ? this.setCtxValue('fillStyle', this.styles.tooltipBodyFontColor)
              : this.setCtxValue('fillStyle', this.styles.tooltipHeaderFontColor),
            this.ctx.fillText(
              e,
              i + this.blockPaddingLeftRight,
              n + this.blockHeight - this.blockPaddingTopBottom + (this.charHeight + 2) * s
            );
        });
    }
    renderShape(e, t, i, n) {
      this.setCtxValue('fillStyle', e),
        this.ctx.beginPath(),
        this.ctx.moveTo(t[0].x + i, t[0].y + n),
        t.slice(1).forEach(({ x: e, y: t }) => this.ctx.lineTo(e + i, t + n)),
        this.ctx.closePath(),
        this.ctx.fill();
    }
    renderTriangle({ color: e, x: t, y: i, width: n, height: s, direction: r }) {
      this.renderShape(e, g(n, s, r), t, i);
    }
    renderCircle(e, t, i, n) {
      this.ctx.beginPath(), this.ctx.arc(t, i, n, 0, 2 * Math.PI, !1), this.setCtxValue('fillStyle', e), this.ctx.fill();
    }
  }
  class $e extends Ye {
    constructor({ width: e, height: t, parent: i, id: n }) {
      const s = document.createElement('canvas');
      (s.width = e),
        (s.height = t),
        super(s, { options: i.options, styles: i.styles }),
        (this.flexible = !1),
        (this.collapsed = !1),
        (this.position = 0),
        (this.savedHeight = null),
        (this.width = e),
        (this.height = t),
        (this.parent = i),
        (this.id = n),
        (this.children = []),
        this.applyCanvasSize();
    }
    makeChild() {
      const e = new $e({ width: this.width, height: this.height, parent: this.parent, id: void 0 });
      return this.children.push(e), e.setMinMax(this.min, this.max), e.resetView(), e;
    }
    setFlexible() {
      this.flexible = !0;
    }
    collapse() {
      (this.collapsed = !0), (this.savedHeight = this.height), this.clear();
    }
    expand() {
      (this.collapsed = !1), this.savedHeight && this.resize({ height: this.savedHeight });
    }
    setSettingsOverrides(e) {
      this.setSettings({ styles: l(this.styles, e.styles), options: l(this.options, e.options) }),
        this.children.forEach((t) => t.setSettingsOverrides(e));
    }
    resize({ width: e, height: t, position: i }, n) {
      const s = super.resize(e, t);
      (null != t ? t : 0) <= 0 && (this.collapsed = !0),
        !n && s && this.parent.recalcChildrenLayout(),
        'number' == typeof i && (this.position = i),
        this.children.forEach((n) => n.resize({ width: e, height: t, position: i }));
    }
    setMinMax(e, t) {
      super.setMinMax(e, t), this.children.forEach((i) => i.setMinMax(e, t));
    }
    setSettings(e) {
      super.setSettings(e), this.children && this.children.forEach((t) => t.setSettings(e));
    }
    tryToChangePosition(e) {
      this.parent.tryToChangePosition(e);
    }
    recalcMinMax() {
      this.parent.calcMinMax();
    }
    getTimeUnits() {
      return this.parent.getTimeUnits();
    }
    getAccuracy() {
      return this.parent.timeGrid.accuracy;
    }
    renderTimeGrid() {
      this.parent.timeGrid.renderLines(0, this.height, this);
    }
    renderTimeGridTimes() {
      this.parent.timeGrid.renderTimes(this);
    }
    standardRender() {
      this.resolveQueue(), this.renderTimeGrid();
    }
    renderTooltipFromData(e, t) {
      this.parent.renderTooltipFromData(e, t);
    }
    resetParentView() {
      this.parent.resetView(), this.parent.render();
    }
    render() {
      this.parent.partialRender(this.id);
    }
  }
  class qe extends Ye {
    constructor({ canvas: e, settings: t, timeGrid: i, plugins: n }) {
      super(e, t),
        (this.freeSpace = 0),
        (this.lastPartialAnimationFrame = null),
        (this.lastGlobalAnimationFrame = null),
        (this.plugins = n),
        (this.children = []),
        (this.requestedRenders = []),
        (this.timeGrid = i),
        this.timeGrid.setDefaultRenderEngine(this);
    }
    makeInstance() {
      const e = new $e({ width: this.width, height: 0, id: this.children.length, parent: this });
      return e.setMinMax(this.min, this.max), e.resetView(), this.children.push(e), e;
    }
    calcMinMax() {
      const e = this.plugins.map(({ min: e }) => e).filter(c),
        t = e.length ? e.reduce((e, t) => Math.min(e, t)) : 0,
        i = this.plugins.map(({ max: e }) => e).filter(c),
        n = i.length ? i.reduce((e, t) => Math.max(e, t)) : 0;
      this.setMinMax(t, n);
    }
    calcTimeGrid() {
      this.timeGrid.recalc();
    }
    setMinMax(e, t) {
      super.setMinMax(e, t), this.children.forEach((i) => i.setMinMax(e, t));
    }
    setSettings(e) {
      super.setSettings(e), this.children && (this.children.forEach((t) => t.setSettings(e)), this.recalcChildrenLayout());
    }
    resize(e, t) {
      const i = this.width;
      return (
        super.resize(e, t),
        this.recalcChildrenLayout(),
        this.getInitialZoom() > this.zoom
          ? this.resetView()
          : this.positionX > this.min && this.tryToChangePosition(-this.pixelToTime((e - i) / 2)),
        !0
      );
    }
    recalcChildrenLayout() {
      const e = this.getChildrenLayout();
      e.freeSpace > 0 ? this.expandGrowingChildrenLayout(e) : e.freeSpace < 0 && this.truncateChildrenLayout(e),
        (this.freeSpace = e.freeSpace),
        this.children.forEach((t, i) => {
          t.resize(e.placements[i], !0);
        });
    }
    getChildrenLayout() {
      return this.children.reduce(
        (e, t, i) => {
          var n;
          const s = this.plugins[i],
            r = s.fullHeight;
          let o = 'static',
            h = 0;
          if (
            (t.flexible && 'number' == typeof s.height ? (o = 'flexibleStatic') : 'flexible' === s.height && (o = 'flexibleGrowing'),
            t.collapsed)
          )
            h = 0;
          else
            switch (o) {
              case 'static':
                h = r;
                break;
              case 'flexibleGrowing':
                h = t.height || 0;
                break;
              case 'flexibleStatic':
                h = null !== (n = t.height || r) && void 0 !== n ? n : 0;
            }
          return (
            e.placements.push({ width: this.width, position: e.position, height: h, type: o }), (e.position += h), (e.freeSpace -= h), e
          );
        },
        { position: 0, placements: [], freeSpace: this.height }
      );
    }
    expandGrowingChildrenLayout(e) {
      const { placements: t, freeSpace: i } = e,
        n = t[t.length - 1],
        s = t.map(({ type: e, height: t }, i) => 'flexibleGrowing' === e && !this.children[i].collapsed && 0 === t),
        r = s.filter(Boolean).length;
      if (r) {
        const n = Math.max(0, Math.floor(i / r));
        s.forEach((i, s) => {
          if (i) {
            (t[s].height += n), (e.freeSpace -= n);
            for (let e = s + 1; e < t.length; e++) t[e].position += n;
          }
        });
      }
      return (
        'flexibleGrowing' !== n.type ||
          this.children[this.children.length - 1].collapsed ||
          ((n.height = Math.max(0, this.height - n.position)), (e.freeSpace = 0)),
        e
      );
    }
    truncateChildrenLayout(e) {
      const { placements: t, freeSpace: i } = e;
      let n = Math.abs(i);
      for (; n > 0; ) {
        const i = t.findLastIndex(({ height: e, type: t }) => e > 0 && 'static' !== t);
        if (-1 !== i) {
          const s = t[i],
            r = Math.max(0, s.height - n),
            o = s.height - r;
          (s.height = r),
            (n -= o),
            (e.freeSpace += o),
            t.forEach((e, t) => {
              t > i && (e.position -= o);
            });
        }
      }
      return e;
    }
    getAccuracy() {
      return this.timeGrid.accuracy;
    }
    setZoom(e) {
      return (this.getAccuracy() < 6 || e <= this.zoom) && (super.setZoom(e), this.children.forEach((t) => t.setZoom(e)), !0);
    }
    setPositionX(e) {
      const t = super.setPositionX(e);
      return this.children.forEach((t) => t.setPositionX(e)), t;
    }
    renderPlugin(e) {
      var t;
      const i = this.plugins[e],
        n = this.children[e];
      if ((null == n || n.clear(), !n.collapsed)) {
        (null === (t = null == i ? void 0 : i.render) || void 0 === t ? void 0 : t.call(i)) || n.standardRender();
      }
    }
    partialRender(e) {
      'number' == typeof e && this.requestedRenders.push(e),
        this.lastPartialAnimationFrame ||
          (this.lastPartialAnimationFrame = requestAnimationFrame(() => {
            this.requestedRenders.forEach((e) => this.renderPlugin(e)),
              this.shallowRender(),
              (this.requestedRenders = []),
              (this.lastPartialAnimationFrame = null);
          }));
    }
    shallowRender() {
      this.clear(),
        this.timeGrid.renderLines(this.height - this.freeSpace, this.freeSpace),
        this.children.forEach((e) => {
          e.collapsed || this.copy(e);
        });
      let e = !1;
      this.plugins.forEach((e) => {
        e.postRender && e.postRender();
      }),
        this.plugins.forEach((t) => {
          t.renderTooltip && (e = e || Boolean(t.renderTooltip()));
        }),
        e || 'function' != typeof this.options.tooltip || this.options.tooltip(null, this, null);
    }
    render(e) {
      'number' == typeof this.lastPartialAnimationFrame && cancelAnimationFrame(this.lastPartialAnimationFrame),
        (this.requestedRenders = []),
        (this.lastPartialAnimationFrame = null),
        this.lastGlobalAnimationFrame ||
          (this.lastGlobalAnimationFrame = requestAnimationFrame(() => {
            null == e || e(),
              this.timeGrid.recalc(),
              this.children.forEach((e, t) => this.renderPlugin(t)),
              this.shallowRender(),
              (this.lastGlobalAnimationFrame = null);
          }));
    }
  }
  const Be = ['down', 'up', 'move', 'click', 'select'];
  class Ke extends i {
    static getId() {
      return Ke.count++;
    }
    constructor(e, t) {
      super(),
        (this.id = Ke.getId()),
        (this.parent = e),
        (this.renderEngine = t),
        t.on('clear', () => this.clearHitRegions()),
        Be.forEach((t) =>
          e.on(t, (e, i, n) => {
            (e && e.id !== this.id) || this.resend(t, e, i, n);
          })
        ),
        ['hover'].forEach((t) =>
          e.on(t, (e, i) => {
            (e && e.id !== this.id) || this.emit(t, e, i);
          })
        ),
        e.on('change-position', (e, t, i, n) => {
          n === this && this.emit('change-position', e, t, i);
        }),
        (this.hitRegions = []);
    }
    resend(e, ...t) {
      this.renderEngine.position <= this.parent.mouse.y &&
        this.renderEngine.height + this.renderEngine.position >= this.parent.mouse.y &&
        this.emit(e, ...t);
    }
    getMouse() {
      const { x: e, y: t } = this.parent.mouse;
      return { x: e, y: t - this.renderEngine.position };
    }
    getGlobalMouse() {
      return this.parent.mouse;
    }
    clearHitRegions() {
      this.hitRegions = [];
    }
    addHitRegion(e, t, i, n, s, r, o) {
      this.hitRegions.push({ type: e, data: t, x: i, y: n, w: s, h: r, cursor: o, id: this.id });
    }
    setCursor(e) {
      this.parent.setCursor(e);
    }
    clearCursor() {
      this.parent.clearCursor();
    }
  }
  Ke.count = 0;
  class Ze extends i {
    constructor(e, t) {
      super(),
        (this.selectedRegion = null),
        (this.hoveredRegion = null),
        (this.moveActive = !1),
        (this.currentCursor = null),
        (this.renderEngine = t),
        (this.canvas = e),
        (this.hitRegions = []),
        (this.instances = []),
        (this.mouse = { x: 0, y: 0 }),
        (this.handleMouseWheel = this.handleMouseWheel.bind(this)),
        (this.handleMouseDown = this.handleMouseDown.bind(this)),
        (this.handleMouseUp = this.handleMouseUp.bind(this)),
        (this.handleMouseMove = this.handleMouseMove.bind(this)),
        this.initListeners(),
        this.reset();
    }
    makeInstance(e) {
      const t = new Ke(this, e);
      return this.instances.push(t), t;
    }
    reset() {
      (this.selectedRegion = null), (this.hoveredRegion = null), (this.hitRegions = []);
    }
    destroy() {
      this.removeListeners();
    }
    initListeners() {
      this.canvas &&
        (this.canvas.addEventListener('wheel', this.handleMouseWheel),
        this.canvas.addEventListener('mousedown', this.handleMouseDown),
        this.canvas.addEventListener('mouseup', this.handleMouseUp),
        this.canvas.addEventListener('mouseleave', this.handleMouseUp),
        this.canvas.addEventListener('mousemove', this.handleMouseMove));
    }
    removeListeners() {
      this.canvas &&
        (this.canvas.removeEventListener('wheel', this.handleMouseWheel),
        this.canvas.removeEventListener('mousedown', this.handleMouseDown),
        this.canvas.removeEventListener('mouseup', this.handleMouseUp),
        this.canvas.removeEventListener('mouseleave', this.handleMouseUp),
        this.canvas.removeEventListener('mousemove', this.handleMouseMove));
    }
    handleMouseWheel(e) {
      const { deltaY: t, deltaX: i } = e;
      e.preventDefault();
      const n = this.renderEngine.getRealView(),
        s = this.renderEngine.getInitialZoom(),
        r = this.renderEngine.positionX,
        o = this.renderEngine.zoom,
        h = i / this.renderEngine.zoom;
      let a = (t / 1e3) * this.renderEngine.zoom;
      if ((this.renderEngine.tryToChangePosition(h), (a = this.renderEngine.zoom - a >= s ? a : this.renderEngine.zoom - s), 0 !== a)) {
        if (this.renderEngine.setZoom(this.renderEngine.zoom - a)) {
          const e = this.mouse.x / this.renderEngine.width,
            t = (n - this.renderEngine.width / this.renderEngine.zoom) * e;
          this.renderEngine.tryToChangePosition(t);
        }
      }
      this.checkRegionHover(), (r === this.renderEngine.positionX && o === this.renderEngine.zoom) || this.renderEngine.render();
    }
    handleMouseDown() {
      (this.moveActive = !0),
        (this.mouseDownPosition = { x: this.mouse.x, y: this.mouse.y }),
        (this.mouseDownHoveredInstance = this.hoveredInstance),
        this.emit('down', this.hoveredRegion, this.mouse);
    }
    handleMouseUp() {
      this.moveActive = !1;
      const e = this.mouseDownPosition && this.mouseDownPosition.x === this.mouse.x && this.mouseDownPosition.y === this.mouse.y;
      e && this.handleRegionHit(),
        this.emit('up', this.hoveredRegion, this.mouse, e),
        e && this.emit('click', this.hoveredRegion, this.mouse);
    }
    handleMouseMove(e) {
      if (this.moveActive) {
        const t = this.mouse.y - e.offsetY,
          i = (this.mouse.x - e.offsetX) / this.renderEngine.zoom;
        (t || i) &&
          this.emit('change-position', { deltaX: i, deltaY: t }, this.mouseDownPosition, this.mouse, this.mouseDownHoveredInstance);
      }
      (this.mouse.x = e.offsetX), (this.mouse.y = e.offsetY), this.checkRegionHover(), this.emit('move', this.hoveredRegion, this.mouse);
    }
    handleRegionHit() {
      const e = this.getHoveredRegion();
      this.emit('select', e, this.mouse);
    }
    checkRegionHover() {
      const e = this.getHoveredRegion();
      e && this.hoveredRegion && e.id !== this.hoveredRegion.id && this.emit('hover', null, this.mouse),
        e
          ? (!this.currentCursor && e.cursor
              ? (this.renderEngine.canvas.style.cursor = e.cursor)
              : this.currentCursor || this.clearCursor(),
            (this.hoveredRegion = e),
            this.emit('hover', e, this.mouse),
            this.renderEngine.partialRender())
          : this.hoveredRegion &&
            !e &&
            (this.currentCursor || this.clearCursor(),
            (this.hoveredRegion = null),
            this.emit('hover', null, this.mouse),
            this.renderEngine.partialRender());
    }
    getHoveredRegion() {
      const e = this.hitRegions.find(
        ({ x: e, y: t, w: i, h: n }) => this.mouse.x >= e && this.mouse.x <= e + i && this.mouse.y >= t && this.mouse.y <= t + n
      );
      if (e) return e;
      const t = this.instances.find(({ renderEngine: e }) => e.position <= this.mouse.y && e.height + e.position >= this.mouse.y);
      if (((this.hoveredInstance = t), t)) {
        const e = t.renderEngine.position;
        return t.hitRegions.find(
          ({ x: t, y: i, w: n, h: s }) => this.mouse.x >= t && this.mouse.x <= t + n && this.mouse.y >= i + e && this.mouse.y <= i + s + e
        );
      }
      return null;
    }
    clearHitRegions() {
      this.hitRegions = [];
    }
    addHitRegion(e, t, i, n, s, r, o) {
      this.hitRegions.push({ type: e, data: t, x: i, y: n, w: s, h: r, cursor: o });
    }
    setCursor(e) {
      (this.renderEngine.canvas.style.cursor = e), (this.currentCursor = e);
    }
    clearCursor() {
      const e = this.getHoveredRegion();
      (this.currentCursor = null),
        (null == e ? void 0 : e.cursor) ? (this.renderEngine.canvas.style.cursor = e.cursor) : (this.renderEngine.canvas.style.cursor = '');
    }
  }
  class Qe extends i {
    constructor({ canvas: e, plugins: t, settings: i }) {
      var n;
      super();
      const s = null !== (n = null == i ? void 0 : i.styles) && void 0 !== n ? n : {};
      (this.timeGrid = new ve({ styles: null == s ? void 0 : s.timeGrid })),
        (this.renderEngine = new qe({
          canvas: e,
          settings: { styles: null == s ? void 0 : s.main, options: null == i ? void 0 : i.options },
          plugins: t,
          timeGrid: this.timeGrid
        })),
        (this.interactionsEngine = new Ze(e, this.renderEngine)),
        (this.plugins = t);
      const r = Array(this.plugins.length)
        .fill(null)
        .map(() => {
          const e = this.renderEngine.makeInstance();
          return { renderEngine: e, interactionsEngine: this.interactionsEngine.makeInstance(e) };
        });
      this.plugins.forEach((e, t) => {
        e.init(r[t].renderEngine, r[t].interactionsEngine);
      }),
        this.renderEngine.calcMinMax(),
        this.renderEngine.resetView(),
        this.renderEngine.recalcChildrenLayout(),
        this.renderEngine.calcTimeGrid(),
        this.plugins.forEach((e) => {
          var t;
          return null === (t = e.postInit) || void 0 === t ? void 0 : t.call(e);
        }),
        this.renderEngine.render();
    }
    render() {
      this.renderEngine.render();
    }
    resize(e, t) {
      this.renderEngine.render(() => this.renderEngine.resize(e, t));
    }
    execOnPlugins(e, ...t) {
      let i = 0;
      for (; i < this.plugins.length; ) this.plugins[i][e] && this.plugins[i][e](...t), i++;
    }
    setSettings(e) {
      var t, i;
      this.timeGrid.setSettings({ styles: null === (t = e.styles) || void 0 === t ? void 0 : t.timeGrid }),
        this.renderEngine.setSettings({
          options: e.options,
          styles: null === (i = e.styles) || void 0 === i ? void 0 : i.main,
          patterns: e.patterns
        }),
        this.plugins.forEach((t) => {
          var i, n;
          return null === (i = t.setSettings) || void 0 === i
            ? void 0
            : i.call(t, { styles: null === (n = e.styles) || void 0 === n ? void 0 : n[t.name] });
        }),
        this.renderEngine.render();
    }
    setZoom(e, t) {
      const i = this.renderEngine.width / (t - e);
      this.renderEngine.setPositionX(e), this.renderEngine.setZoom(i), this.renderEngine.render();
    }
  }
  const Je = {};
  (e.EVENT_NAMES = Be),
    (e.FlameChart = class extends Qe {
      constructor({
        canvas: e,
        data: t,
        marks: i,
        waterfall: n,
        timeframeTimeseries: s,
        timeseries: r,
        colors: o,
        settings: h = Je,
        plugins: a = []
      }) {
        var l;
        const c = [],
          { headers: { waterfall: d = 'waterfall', flameChart: g = 'flame chart' } = {} } = h,
          u = null !== (l = null == h ? void 0 : h.styles) && void 0 !== l ? l : {},
          f = new me({ styles: null == u ? void 0 : u.timeGridPlugin });
        let m, p, y, v, x;
        c.push(f),
          r && ((x = new ze({ data: r, settings: { styles: null == u ? void 0 : u.timeseriesPlugin } })), c.push(x)),
          i && ((m = new pe({ data: i })), m.on('select', (e) => this.emit('select', e)), c.push(m)),
          n &&
            ((p = new Fe({ data: n, settings: { styles: null == u ? void 0 : u.waterfallPlugin } })),
            p.on('select', (e) => this.emit('select', e)),
            t && c.push(new Ae(d, { styles: null == u ? void 0 : u.togglePlugin })),
            c.push(p)),
          t &&
            ((v = new ue({ data: t, colors: o })),
            v.on('select', (e) => this.emit('select', e)),
            n && c.push(new Ae(g, { styles: null == u ? void 0 : u.togglePlugin })),
            c.push(v)),
          (t || n || s) &&
            ((y = new Se({
              flameChartNodes: t,
              waterfall: n,
              timeseries: s,
              settings: { styles: null == u ? void 0 : u.timeframeSelectorPlugin }
            })),
            c.unshift(y)),
          super({ canvas: e, settings: h, plugins: [...c, ...a] }),
          v &&
            y &&
            ((this.setNodes = (e) => {
              v && v.setData(e), y && y.setFlameChartNodes(e);
            }),
            (this.setFlameChartPosition = ({ x: e, y: t }) => {
              'number' == typeof e && this.renderEngine.setPositionX(e),
                'number' == typeof t && v && v.setPositionY(t),
                this.renderEngine.render();
            })),
          m &&
            (this.setMarks = (e) => {
              m && m.setMarks(e);
            }),
          p &&
            (this.setWaterfall = (e) => {
              p && p.setData(e), y && y.setWaterfall(e);
            }),
          x &&
            (this.setTimeseries = (e) => {
              x && x.setData(e);
            }),
          y &&
            (this.setTimeframeTimeseries = (e) => {
              null == y || y.setTimeseries(e);
            });
      }
    }),
    (e.FlameChartContainer = Qe),
    (e.FlameChartPlugin = ue),
    (e.MarksPlugin = pe),
    (e.TimeGridPlugin = me),
    (e.TimeframeSelectorPlugin = Se),
    (e.TimeseriesPlugin = ze),
    (e.TogglePlugin = Ae),
    (e.UIPlugin = a),
    (e.WaterfallPlugin = Fe),
    (e.defaultPatterns = We);
});
