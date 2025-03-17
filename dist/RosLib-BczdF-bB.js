var ir = Object.defineProperty;
var nr = (h, u, r) => u in h ? ir(h, u, { enumerable: !0, configurable: !0, writable: !0, value: r }) : h[u] = r;
var j = (h, u, r) => nr(h, typeof u != "symbol" ? u + "" : u, r);
import { EventEmitter as xe } from "eventemitter3";
function sr(h) {
  return h && h.__esModule && Object.prototype.hasOwnProperty.call(h, "default") ? h.default : h;
}
function Fr(h) {
  if (h.__esModule) return h;
  var u = h.default;
  if (typeof u == "function") {
    var r = function i() {
      return this instanceof i ? Reflect.construct(u, arguments, this.constructor) : u.apply(this, arguments);
    };
    r.prototype = u.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(h).forEach(function(i) {
    var a = Object.getOwnPropertyDescriptor(h, i);
    Object.defineProperty(r, i, a.get ? a : {
      enumerable: !0,
      get: function() {
        return h[i];
      }
    });
  }), r;
}
var ht = { exports: {} }, ar = ht.exports, wt;
function or() {
  return wt || (wt = 1, function(h) {
    (function(u, r) {
      var i = Math.pow(2, -24), a = Math.pow(2, 32), s = Math.pow(2, 53);
      function c(N) {
        var T = new ArrayBuffer(256), m = new DataView(T), M, E = 0;
        function I(C) {
          for (var P = T.byteLength, _ = E + C; P < _; )
            P *= 2;
          if (P !== T.byteLength) {
            var R = m;
            T = new ArrayBuffer(P), m = new DataView(T);
            for (var l = E + 3 >> 2, d = 0; d < l; ++d)
              m.setUint32(d * 4, R.getUint32(d * 4));
          }
          return M = C, m;
        }
        function O() {
          E += M;
        }
        function J(C) {
          O(I(8).setFloat64(E, C));
        }
        function w(C) {
          O(I(1).setUint8(E, C));
        }
        function G(C) {
          for (var P = I(C.length), _ = 0; _ < C.length; ++_)
            P.setUint8(E + _, C[_]);
          O();
        }
        function V(C) {
          O(I(2).setUint16(E, C));
        }
        function K(C) {
          O(I(4).setUint32(E, C));
        }
        function ee(C) {
          var P = C % a, _ = (C - P) / a, R = I(8);
          R.setUint32(E, _), R.setUint32(E + 4, P), O();
        }
        function p(C, P) {
          P < 24 ? w(C << 5 | P) : P < 256 ? (w(C << 5 | 24), w(P)) : P < 65536 ? (w(C << 5 | 25), V(P)) : P < 4294967296 ? (w(C << 5 | 26), K(P)) : (w(C << 5 | 27), ee(P));
        }
        function S(C) {
          var P;
          if (C === !1)
            return w(244);
          if (C === !0)
            return w(245);
          if (C === null)
            return w(246);
          if (C === r)
            return w(247);
          switch (typeof C) {
            case "number":
              if (Math.floor(C) === C) {
                if (0 <= C && C <= s)
                  return p(0, C);
                if (-s <= C && C < 0)
                  return p(1, -(C + 1));
              }
              return w(251), J(C);
            case "string":
              var _ = [];
              for (P = 0; P < C.length; ++P) {
                var R = C.charCodeAt(P);
                R < 128 ? _.push(R) : R < 2048 ? (_.push(192 | R >> 6), _.push(128 | R & 63)) : R < 55296 ? (_.push(224 | R >> 12), _.push(128 | R >> 6 & 63), _.push(128 | R & 63)) : (R = (R & 1023) << 10, R |= C.charCodeAt(++P) & 1023, R += 65536, _.push(240 | R >> 18), _.push(128 | R >> 12 & 63), _.push(128 | R >> 6 & 63), _.push(128 | R & 63));
              }
              return p(3, _.length), G(_);
            default:
              var l;
              if (Array.isArray(C))
                for (l = C.length, p(4, l), P = 0; P < l; ++P)
                  S(C[P]);
              else if (C instanceof Uint8Array)
                p(2, C.length), G(C);
              else {
                var d = Object.keys(C);
                for (l = d.length, p(5, l), P = 0; P < l; ++P) {
                  var A = d[P];
                  S(A), S(C[A]);
                }
              }
          }
        }
        if (S(N), "slice" in T)
          return T.slice(0, E);
        for (var L = new ArrayBuffer(E), H = new DataView(L), W = 0; W < E; ++W)
          H.setUint8(W, m.getUint8(W));
        return L;
      }
      function f(N, T, m) {
        var M = new DataView(N), E = 0;
        typeof T != "function" && (T = function(_) {
          return _;
        }), typeof m != "function" && (m = function() {
          return r;
        });
        function I(_, R) {
          return E += R, _;
        }
        function O(_) {
          return I(new Uint8Array(N, E, _), _);
        }
        function J() {
          var _ = new ArrayBuffer(4), R = new DataView(_), l = K(), d = l & 32768, A = l & 31744, y = l & 1023;
          if (A === 31744)
            A = 261120;
          else if (A !== 0)
            A += 114688;
          else if (y !== 0)
            return y * i;
          return R.setUint32(0, d << 16 | A << 13 | y << 13), R.getFloat32(0);
        }
        function w() {
          return I(M.getFloat32(E), 4);
        }
        function G() {
          return I(M.getFloat64(E), 8);
        }
        function V() {
          return I(M.getUint8(E), 1);
        }
        function K() {
          return I(M.getUint16(E), 2);
        }
        function ee() {
          return I(M.getUint32(E), 4);
        }
        function p() {
          return ee() * a + ee();
        }
        function S() {
          return M.getUint8(E) !== 255 ? !1 : (E += 1, !0);
        }
        function L(_) {
          if (_ < 24)
            return _;
          if (_ === 24)
            return V();
          if (_ === 25)
            return K();
          if (_ === 26)
            return ee();
          if (_ === 27)
            return p();
          if (_ === 31)
            return -1;
          throw "Invalid length encoding";
        }
        function H(_) {
          var R = V();
          if (R === 255)
            return -1;
          var l = L(R & 31);
          if (l < 0 || R >> 5 !== _)
            throw "Invalid indefinite length element";
          return l;
        }
        function W(_, R) {
          for (var l = 0; l < R; ++l) {
            var d = V();
            d & 128 && (d < 224 ? (d = (d & 31) << 6 | V() & 63, R -= 1) : d < 240 ? (d = (d & 15) << 12 | (V() & 63) << 6 | V() & 63, R -= 2) : (d = (d & 15) << 18 | (V() & 63) << 12 | (V() & 63) << 6 | V() & 63, R -= 3)), d < 65536 ? _.push(d) : (d -= 65536, _.push(55296 | d >> 10), _.push(56320 | d & 1023));
          }
        }
        function C() {
          var _ = V(), R = _ >> 5, l = _ & 31, d, A;
          if (R === 7)
            switch (l) {
              case 25:
                return J();
              case 26:
                return w();
              case 27:
                return G();
            }
          if (A = L(l), A < 0 && (R < 2 || 6 < R))
            throw "Invalid length";
          switch (R) {
            case 0:
              return A;
            case 1:
              return -1 - A;
            case 2:
              if (A < 0) {
                for (var y = [], q = 0; (A = H(R)) >= 0; )
                  q += A, y.push(O(A));
                var v = new Uint8Array(q), z = 0;
                for (d = 0; d < y.length; ++d)
                  v.set(y[d], z), z += y[d].length;
                return v;
              }
              return O(A);
            case 3:
              var Q = [];
              if (A < 0)
                for (; (A = H(R)) >= 0; )
                  W(Q, A);
              else
                W(Q, A);
              return String.fromCharCode.apply(null, Q);
            case 4:
              var F;
              if (A < 0)
                for (F = []; !S(); )
                  F.push(C());
              else
                for (F = new Array(A), d = 0; d < A; ++d)
                  F[d] = C();
              return F;
            case 5:
              var b = {};
              for (d = 0; d < A || A < 0 && !S(); ++d) {
                var B = C();
                b[B] = C();
              }
              return b;
            case 6:
              return T(C(), A);
            case 7:
              switch (A) {
                case 20:
                  return !1;
                case 21:
                  return !0;
                case 22:
                  return null;
                case 23:
                  return r;
                default:
                  return m(A);
              }
          }
        }
        var P = C();
        if (E !== N.byteLength)
          throw "Remaining bytes";
        return P;
      }
      var g = { encode: c, decode: f };
      h.exports ? h.exports = g : u.CBOR || (u.CBOR = g);
    })(ar);
  }(ht)), ht.exports;
}
var cr = or();
const lr = /* @__PURE__ */ sr(cr);
var Pt = Math.pow(2, 32), Nt = !1;
function qt() {
  Nt || (Nt = !0, console.warn(
    "CBOR 64-bit integer array values may lose precision. No further warnings."
  ));
}
function hr(h) {
  qt();
  for (var u = h.byteLength, r = h.byteOffset, i = u / 8, a = h.buffer.slice(r, r + u), s = new Uint32Array(a), c = new Array(i), f = 0; f < i; f++) {
    var g = f * 2, N = s[g], T = s[g + 1];
    c[f] = N + Pt * T;
  }
  return c;
}
function fr(h) {
  qt();
  for (var u = h.byteLength, r = h.byteOffset, i = u / 8, a = h.buffer.slice(r, r + u), s = new Uint32Array(a), c = new Int32Array(a), f = new Array(i), g = 0; g < i; g++) {
    var N = g * 2, T = s[N], m = c[N + 1];
    f[g] = T + Pt * m;
  }
  return f;
}
function pr(h, u) {
  var r = h.byteLength, i = h.byteOffset, a = h.buffer.slice(i, i + r);
  return new u(a);
}
var _t = {
  64: Uint8Array,
  69: Uint16Array,
  70: Uint32Array,
  72: Int8Array,
  77: Int16Array,
  78: Int32Array,
  85: Float32Array,
  86: Float64Array
}, St = {
  71: hr,
  79: fr
};
function mr(h, u) {
  if (u in _t) {
    var r = _t[u];
    return pr(h, r);
  }
  return u in St ? St[u](h) : h;
}
var At = null;
typeof bson < "u" && (At = bson().BSON);
function Dt(h) {
  var u = null;
  h.transportOptions.decoder && (u = h.transportOptions.decoder);
  function r(s) {
    s.op === "publish" ? h.emit(s.topic, s.msg) : s.op === "service_response" ? h.emit(s.id, s) : s.op === "call_service" ? h.emit(s.service, s) : s.op === "send_action_goal" ? h.emit(s.action, s) : s.op === "cancel_action_goal" || s.op === "action_feedback" || s.op === "action_result" ? h.emit(s.id, s) : s.op === "status" && (s.id ? h.emit("status:" + s.id, s) : h.emit("status", s));
  }
  function i(s, c) {
    s.op === "png" ? typeof window > "u" ? import("./decompressPng-CSQbvwxb.js").then(({ default: f }) => f(s.data, c)) : import("./decompressPng-DN6PxcLs.js").then(({ default: f }) => f(s.data, c)) : c(s);
  }
  function a(s, c) {
    if (!At)
      throw "Cannot process BSON encoded message without BSON header.";
    var f = new FileReader();
    f.onload = function() {
      var g = new Uint8Array(this.result), N = At.deserialize(g);
      c(N);
    }, f.readAsArrayBuffer(s);
  }
  return {
    /**
     * Emit a 'connection' event on WebSocket connection.
     *
     * @param {function} event - The argument to emit with the event.
     * @memberof SocketAdapter
     */
    onopen: function(c) {
      h.isConnected = !0, h.emit("connection", c);
    },
    /**
     * Emit a 'close' event on WebSocket disconnection.
     *
     * @param {function} event - The argument to emit with the event.
     * @memberof SocketAdapter
     */
    onclose: function(c) {
      h.isConnected = !1, h.emit("close", c);
    },
    /**
     * Emit an 'error' event whenever there was an error.
     *
     * @param {function} event - The argument to emit with the event.
     * @memberof SocketAdapter
     */
    onerror: function(c) {
      h.emit("error", c);
    },
    /**
     * Parse message responses from rosbridge and send to the appropriate
     * topic, service, or param.
     *
     * @param {Object} data - The raw JSON message from rosbridge.
     * @memberof SocketAdapter
     */
    onmessage: function(c) {
      if (u)
        u(c.data, function(N) {
          r(N);
        });
      else if (typeof Blob < "u" && c.data instanceof Blob)
        a(c.data, function(N) {
          i(N, r);
        });
      else if (c.data instanceof ArrayBuffer) {
        var f = lr.decode(c.data, mr);
        r(f);
      } else {
        var g = JSON.parse(typeof c == "string" ? c : c.data);
        i(g, r);
      }
    }
  };
}
class pe extends xe {
  /**
   * @param {Object} options
   * @param {Ros} options.ros - The ROSLIB.Ros connection handle.
   * @param {string} options.name - The topic name, like '/cmd_vel'.
   * @param {string} options.messageType - The message type, like 'std_msgs/String'.
   * @param {string} [options.compression=none] - The type of compression to use, like 'png', 'cbor', or 'cbor-raw'.
   * @param {number} [options.throttle_rate=0] - The rate (in ms in between messages) at which to throttle the topics.
   * @param {number} [options.queue_size=100] - The queue created at bridge side for re-publishing webtopics.
   * @param {boolean} [options.latch=false] - Latch the topic when publishing.
   * @param {number} [options.queue_length=0] - The queue length at bridge side used when subscribing.
   * @param {boolean} [options.reconnect_on_close=true] - The flag to enable resubscription and readvertisement on close event.
   */
  constructor(r) {
    super();
    /** @type {boolean | undefined} */
    j(this, "waitForReconnect");
    /** @type {(() => void) | undefined} */
    j(this, "reconnectFunc");
    j(this, "isAdvertised", !1);
    j(this, "_messageCallback", (r) => {
      this.emit("message", r);
    });
    this.ros = r.ros, this.name = r.name, this.messageType = r.messageType, this.compression = r.compression || "none", this.throttle_rate = r.throttle_rate || 0, this.latch = r.latch || !1, this.queue_size = r.queue_size || 100, this.queue_length = r.queue_length || 0, this.reconnect_on_close = r.reconnect_on_close !== void 0 ? r.reconnect_on_close : !0, this.compression && this.compression !== "png" && this.compression !== "cbor" && this.compression !== "cbor-raw" && this.compression !== "none" && (this.emit(
      "warning",
      this.compression + " compression is not supported. No compression will be used."
    ), this.compression = "none"), this.throttle_rate < 0 && (this.emit("warning", this.throttle_rate + " is not allowed. Set to 0"), this.throttle_rate = 0), this.reconnect_on_close ? this.callForSubscribeAndAdvertise = (i) => {
      this.ros.callOnConnection(i), this.waitForReconnect = !1, this.reconnectFunc = () => {
        this.waitForReconnect || (this.waitForReconnect = !0, this.ros.callOnConnection(i), this.ros.once("connection", () => {
          this.waitForReconnect = !1;
        }));
      }, this.ros.on("close", this.reconnectFunc);
    } : this.callForSubscribeAndAdvertise = this.ros.callOnConnection;
  }
  /**
   * @callback subscribeCallback
   * @param {T} message - The published message.
   */
  /**
   * Every time a message is published for the given topic, the callback
   * will be called with the message object.
   *
   * @param {subscribeCallback} callback - Function with the following params:
   */
  subscribe(r) {
    typeof r == "function" && this.on("message", r), !this.subscribeId && (this.ros.on(this.name, this._messageCallback), this.subscribeId = "subscribe:" + this.name + ":" + (++this.ros.idCounter).toString(), this.callForSubscribeAndAdvertise({
      op: "subscribe",
      id: this.subscribeId,
      type: this.messageType,
      topic: this.name,
      compression: this.compression,
      throttle_rate: this.throttle_rate,
      queue_length: this.queue_length
    }));
  }
  /**
   * Unregister as a subscriber for the topic. Unsubscribing will stop
   * and remove all subscribe callbacks. To remove a callback, you must
   * explicitly pass the callback function in.
   *
   * @param {import('eventemitter3').EventEmitter.ListenerFn} [callback] - The callback to unregister, if
   *     provided and other listeners are registered the topic won't
   *     unsubscribe, just stop emitting to the passed listener.
   */
  unsubscribe(r) {
    r && (this.off("message", r), this.listeners("message").length) || this.subscribeId && (this.ros.off(this.name, this._messageCallback), this.reconnect_on_close && this.ros.off("close", this.reconnectFunc), this.emit("unsubscribe"), this.ros.callOnConnection({
      op: "unsubscribe",
      id: this.subscribeId,
      topic: this.name
    }), this.subscribeId = null);
  }
  /**
   * Register as a publisher for the topic.
   */
  advertise() {
    this.isAdvertised || (this.advertiseId = "advertise:" + this.name + ":" + (++this.ros.idCounter).toString(), this.callForSubscribeAndAdvertise({
      op: "advertise",
      id: this.advertiseId,
      type: this.messageType,
      topic: this.name,
      latch: this.latch,
      queue_size: this.queue_size
    }), this.isAdvertised = !0, this.reconnect_on_close || this.ros.on("close", () => {
      this.isAdvertised = !1;
    }));
  }
  /**
   * Unregister as a publisher for the topic.
   */
  unadvertise() {
    this.isAdvertised && (this.reconnect_on_close && this.ros.off("close", this.reconnectFunc), this.emit("unadvertise"), this.ros.callOnConnection({
      op: "unadvertise",
      id: this.advertiseId,
      topic: this.name
    }), this.isAdvertised = !1);
  }
  /**
   * Publish the message.
   *
   * @param {T} message - The message to publish.
   */
  publish(r) {
    this.isAdvertised || this.advertise(), this.ros.idCounter++;
    var i = {
      op: "publish",
      id: "publish:" + this.name + ":" + this.ros.idCounter,
      topic: this.name,
      msg: r,
      latch: this.latch
    };
    this.ros.callOnConnection(i);
  }
}
class ae extends xe {
  /**
   * @param {Object} options
   * @param {Ros} options.ros - The ROSLIB.Ros connection handle.
   * @param {string} options.name - The service name, like '/add_two_ints'.
   * @param {string} options.serviceType - The service type, like 'rospy_tutorials/AddTwoInts'.
   */
  constructor(r) {
    super();
    /**
       * Stores a reference to the most recent service callback advertised so it can be removed from the EventEmitter during un-advertisement
       * @private
       * @type {((rosbridgeRequest) => any) | null}
       */
    j(this, "_serviceCallback", null);
    j(this, "isAdvertised", !1);
    this.ros = r.ros, this.name = r.name, this.serviceType = r.serviceType;
  }
  /**
   * @callback callServiceCallback
   *  @param {TResponse} response - The response from the service request.
   */
  /**
   * @callback callServiceFailedCallback
   * @param {string} error - The error message reported by ROS.
   */
  /**
   * Call the service. Returns the service response in the
   * callback. Does nothing if this service is currently advertised.
   *
   * @param {TRequest} request - The service request to send.
   * @param {callServiceCallback} [callback] - Function with the following params:
   * @param {callServiceFailedCallback} [failedCallback] - The callback function when the service call failed with params:
   * @param {number} [timeout] - Optional timeout, in seconds, for the service call. A non-positive value means no timeout.
   *                             If not provided, the rosbridge server will use its default value.
  */
  callService(r, i, a, s) {
    if (!this.isAdvertised) {
      var c = "call_service:" + this.name + ":" + (++this.ros.idCounter).toString();
      (i || a) && this.ros.once(c, function(g) {
        g.result !== void 0 && g.result === !1 ? typeof a == "function" && a(g.values) : typeof i == "function" && i(g.values);
      });
      var f = {
        op: "call_service",
        id: c,
        service: this.name,
        type: this.serviceType,
        args: r,
        timeout: s
      };
      this.ros.callOnConnection(f);
    }
  }
  /**
   * @callback advertiseCallback
   * @param {TRequest} request - The service request.
   * @param {Partial<TResponse>} response - An empty dictionary. Take care not to overwrite this. Instead, only modify the values within.
   * @returns {boolean} true if the service has finished successfully, i.e., without any fatal errors.
   */
  /**
   * Advertise the service. This turns the Service object from a client
   * into a server. The callback will be called with every request
   * that's made on this service.
   *
   * @param {advertiseCallback} callback - This works similarly to the callback for a C++ service and should take the following params
   */
  advertise(r) {
    if (this.isAdvertised)
      throw new Error("Cannot advertise the same Service twice!");
    this._serviceCallback = (i) => {
      var a = {}, s = r(i.args, a), c = {
        op: "service_response",
        service: this.name,
        values: a,
        result: s
      };
      i.id && (c.id = i.id), this.ros.callOnConnection(c);
    }, this.ros.on(this.name, this._serviceCallback), this.ros.callOnConnection({
      op: "advertise_service",
      type: this.serviceType,
      service: this.name
    }), this.isAdvertised = !0;
  }
  unadvertise() {
    if (!this.isAdvertised)
      throw new Error(`Tried to un-advertise service ${this.name}, but it was not advertised!`);
    this.ros.callOnConnection({
      op: "unadvertise_service",
      service: this.name
    }), this._serviceCallback && this.ros.off(this.name, this._serviceCallback), this.isAdvertised = !1;
  }
  /**
   * An alternate form of Service advertisement that supports a modern Promise-based interface for use with async/await.
   * @param {(request: TRequest) => Promise<TResponse>} callback An asynchronous callback processing the request and returning a response.
   */
  advertiseAsync(r) {
    if (this.isAdvertised)
      throw new Error("Cannot advertise the same Service twice!");
    this._serviceCallback = async (i) => {
      let a = {
        op: "service_response",
        service: this.name,
        result: !1
      };
      try {
        a.values = await r(i.args), a.result = !0;
      } finally {
        i.id && (a.id = i.id), this.ros.callOnConnection(a);
      }
    }, this.ros.on(this.name, this._serviceCallback), this.ros.callOnConnection({
      op: "advertise_service",
      type: this.serviceType,
      service: this.name
    }), this.isAdvertised = !0;
  }
}
class kt {
  /**
   * @param {Object} options
   * @param {Ros} options.ros - The ROSLIB.Ros connection handle.
   * @param {string} options.name - The param name, like max_vel_x.
   */
  constructor(u) {
    this.ros = u.ros, this.name = u.name;
  }
  /**
   * @callback getCallback
   * @param {Object} value - The value of the param from ROS.
   */
  /**
   * @callback getFailedCallback
   * @param {string} error - The error message reported by ROS.
   */
  /**
   * Fetch the value of the param.
   *
   * @param {getCallback} callback - The callback function.
   * @param {getFailedCallback} [failedCallback] - The callback function when the service call failed.
   */
  get(u, r) {
    var i = new ae({
      ros: this.ros,
      name: "rosapi/get_param",
      serviceType: "rosapi/GetParam"
    }), a = { name: this.name };
    i.callService(
      a,
      function(s) {
        var c = JSON.parse(s.value);
        u(c);
      },
      r
    );
  }
  /**
   * @callback setParamCallback
   * @param {Object} response - The response from the service request.
   */
  /**
   * @callback setParamFailedCallback
   * @param {string} error - The error message reported by ROS.
   */
  /**
   * Set the value of the param in ROS.
   *
   * @param {Object} value - The value to set param to.
   * @param {setParamCallback} [callback] - The callback function.
   * @param {setParamFailedCallback} [failedCallback] - The callback function when the service call failed.
   */
  set(u, r, i) {
    var a = new ae({
      ros: this.ros,
      name: "rosapi/set_param",
      serviceType: "rosapi/SetParam"
    }), s = {
      name: this.name,
      value: JSON.stringify(u)
    };
    a.callService(s, r, i);
  }
  /**
   * Delete this parameter on the ROS server.
   *
   * @param {setParamCallback} callback - The callback function.
   * @param {setParamFailedCallback} [failedCallback] - The callback function when the service call failed.
   */
  delete(u, r) {
    var i = new ae({
      ros: this.ros,
      name: "rosapi/delete_param",
      serviceType: "rosapi/DeleteParam"
    }), a = {
      name: this.name
    };
    i.callService(a, u, r);
  }
}
class gt extends xe {
  /**
   * @param {Object} options
   * @param {Ros} options.ros - The ROSLIB.Ros connection handle.
   * @param {string} options.serverName - The action server name, like '/fibonacci'.
   * @param {string} options.actionName - The action message name, like 'actionlib_tutorials/FibonacciAction'.
   * @param {number} [options.timeout] - The timeout length when connecting to the action server.
   * @param {boolean} [options.omitFeedback] - The flag to indicate whether to omit the feedback channel or not.
   * @param {boolean} [options.omitStatus] - The flag to indicate whether to omit the status channel or not.
   * @param {boolean} [options.omitResult] - The flag to indicate whether to omit the result channel or not.
   */
  constructor(r) {
    super();
    j(this, "goals", {});
    /** flag to check if a status has been received */
    j(this, "receivedStatus", !1);
    this.ros = r.ros, this.serverName = r.serverName, this.actionName = r.actionName, this.timeout = r.timeout, this.omitFeedback = r.omitFeedback, this.omitStatus = r.omitStatus, this.omitResult = r.omitResult, this.feedbackListener = new pe({
      ros: this.ros,
      name: this.serverName + "/feedback",
      messageType: this.actionName + "Feedback"
    }), this.statusListener = new pe({
      ros: this.ros,
      name: this.serverName + "/status",
      messageType: "actionlib_msgs/GoalStatusArray"
    }), this.resultListener = new pe({
      ros: this.ros,
      name: this.serverName + "/result",
      messageType: this.actionName + "Result"
    }), this.goalTopic = new pe({
      ros: this.ros,
      name: this.serverName + "/goal",
      messageType: this.actionName + "Goal"
    }), this.cancelTopic = new pe({
      ros: this.ros,
      name: this.serverName + "/cancel",
      messageType: "actionlib_msgs/GoalID"
    }), this.goalTopic.advertise(), this.cancelTopic.advertise(), this.omitStatus || this.statusListener.subscribe((i) => {
      this.receivedStatus = !0, i.status_list.forEach((a) => {
        var s = this.goals[a.goal_id.id];
        s && s.emit("status", a);
      });
    }), this.omitFeedback || this.feedbackListener.subscribe((i) => {
      var a = this.goals[i.status.goal_id.id];
      a && (a.emit("status", i.status), a.emit("feedback", i.feedback));
    }), this.omitResult || this.resultListener.subscribe((i) => {
      var a = this.goals[i.status.goal_id.id];
      a && (a.emit("status", i.status), a.emit("result", i.result));
    }), this.timeout && setTimeout(() => {
      this.receivedStatus || this.emit("timeout");
    }, this.timeout);
  }
  /**
   * Cancel all goals associated with this ActionClient.
   */
  cancel() {
    var r = {};
    this.cancelTopic.publish(r);
  }
  /**
   * Unsubscribe and unadvertise all topics associated with this ActionClient.
   */
  dispose() {
    this.goalTopic.unadvertise(), this.cancelTopic.unadvertise(), this.omitStatus || this.statusListener.unsubscribe(), this.omitFeedback || this.feedbackListener.unsubscribe(), this.omitResult || this.resultListener.unsubscribe();
  }
}
class Gt extends xe {
  /**
   * @param {Object} options
   * @param {ActionClient} options.actionClient - The ROSLIB.ActionClient to use with this goal.
   * @param {Object} options.goalMessage - The JSON object containing the goal for the action server.
   */
  constructor(r) {
    super();
    j(this, "isFinished", !1);
    j(this, "status");
    j(this, "result");
    j(this, "feedback");
    // Create a random ID
    j(this, "goalID", "goal_" + Math.random() + "_" + (/* @__PURE__ */ new Date()).getTime());
    this.actionClient = r.actionClient, this.goalMessage = {
      goal_id: {
        stamp: {
          secs: 0,
          nsecs: 0
        },
        id: this.goalID
      },
      goal: r.goalMessage
    }, this.on("status", (i) => {
      this.status = i;
    }), this.on("result", (i) => {
      this.isFinished = !0, this.result = i;
    }), this.on("feedback", (i) => {
      this.feedback = i;
    }), this.actionClient.goals[this.goalID] = this;
  }
  /**
   * Send the goal to the action server.
   *
   * @param {number} [timeout] - A timeout length for the goal's result.
   */
  send(r) {
    this.actionClient.goalTopic.publish(this.goalMessage), r && setTimeout(() => {
      this.isFinished || this.emit("timeout");
    }, r);
  }
  /**
   * Cancel the current goal.
   */
  cancel() {
    var r = {
      id: this.goalID
    };
    this.actionClient.cancelTopic.publish(r);
  }
}
class Fe {
  /**
   * @param {Object} [options]
   * @param {number|null} [options.x=0] - The x value.
   * @param {number|null} [options.y=0] - The y value.
   * @param {number|null} [options.z=0] - The z value.
   * @param {number|null} [options.w=1] - The w value.
   */
  constructor(u) {
    u = u || {}, this.x = u.x || 0, this.y = u.y || 0, this.z = u.z || 0, this.w = typeof u.w == "number" ? u.w : 1;
  }
  /**
   * Perform a conjugation on this quaternion.
   */
  conjugate() {
    this.x *= -1, this.y *= -1, this.z *= -1;
  }
  /**
   * Return the norm of this quaternion.
   */
  norm() {
    return Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
  }
  /**
   * Perform a normalization on this quaternion.
   */
  normalize() {
    var u = Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
    u === 0 ? (this.x = 0, this.y = 0, this.z = 0, this.w = 1) : (u = 1 / u, this.x = this.x * u, this.y = this.y * u, this.z = this.z * u, this.w = this.w * u);
  }
  /**
   * Convert this quaternion into its inverse.
   */
  invert() {
    this.conjugate(), this.normalize();
  }
  /**
   * Set the values of this quaternion to the product of itself and the given quaternion.
   *
   * @param {Quaternion} q - The quaternion to multiply with.
   */
  multiply(u) {
    var r = this.x * u.w + this.y * u.z - this.z * u.y + this.w * u.x, i = -this.x * u.z + this.y * u.w + this.z * u.x + this.w * u.y, a = this.x * u.y - this.y * u.x + this.z * u.w + this.w * u.z, s = -this.x * u.x - this.y * u.y - this.z * u.z + this.w * u.w;
    this.x = r, this.y = i, this.z = a, this.w = s;
  }
  /**
   * Clone a copy of this quaternion.
   *
   * @returns {Quaternion} The cloned quaternion.
   */
  clone() {
    return new Fe(this);
  }
}
class Ne {
  /**
   * @param {Object} [options]
   * @param {number} [options.x=0] - The x value.
   * @param {number} [options.y=0] - The y value.
   * @param {number} [options.z=0] - The z value.
   */
  constructor(u) {
    u = u || {}, this.x = u.x || 0, this.y = u.y || 0, this.z = u.z || 0;
  }
  /**
   * Set the values of this vector to the sum of itself and the given vector.
   *
   * @param {Vector3} v - The vector to add with.
   */
  add(u) {
    this.x += u.x, this.y += u.y, this.z += u.z;
  }
  /**
   * Set the values of this vector to the difference of itself and the given vector.
   *
   * @param {Vector3} v - The vector to subtract with.
   */
  subtract(u) {
    this.x -= u.x, this.y -= u.y, this.z -= u.z;
  }
  /**
   * Multiply the given Quaternion with this vector.
   *
   * @param {Quaternion} q - The quaternion to multiply with.
   */
  multiplyQuaternion(u) {
    var r = u.w * this.x + u.y * this.z - u.z * this.y, i = u.w * this.y + u.z * this.x - u.x * this.z, a = u.w * this.z + u.x * this.y - u.y * this.x, s = -u.x * this.x - u.y * this.y - u.z * this.z;
    this.x = r * u.w + s * -u.x + i * -u.z - a * -u.y, this.y = i * u.w + s * -u.y + a * -u.x - r * -u.z, this.z = a * u.w + s * -u.z + r * -u.y - i * -u.x;
  }
  /**
   * Clone a copy of this vector.
   *
   * @returns {Vector3} The cloned vector.
   */
  clone() {
    return new Ne(this);
  }
}
class lt {
  /**
   * @param {Object} options
   * @param {Vector3} options.translation - The ROSLIB.Vector3 describing the translation.
   * @param {Quaternion} options.rotation - The ROSLIB.Quaternion describing the rotation.
   */
  constructor(u) {
    this.translation = new Ne(u.translation), this.rotation = new Fe(u.rotation);
  }
  /**
   * Clone a copy of this transform.
   *
   * @returns {Transform} The cloned transform.
   */
  clone() {
    return new lt(this);
  }
}
class Vt extends xe {
  /**
   * @param {Object} options
   * @param {Ros} options.ros - The ROSLIB.Ros connection handle.
   * @param {string} [options.fixedFrame=base_link] - The fixed frame.
   * @param {number} [options.angularThres=2.0] - The angular threshold for the TF republisher.
   * @param {number} [options.transThres=0.01] - The translation threshold for the TF republisher.
   * @param {number} [options.rate=10.0] - The rate for the TF republisher.
   * @param {number} [options.updateDelay=50] - The time (in ms) to wait after a new subscription
   *     to update the TF republisher's list of TFs.
   * @param {number} [options.topicTimeout=2.0] - The timeout parameter for the TF republisher.
   * @param {string} [options.serverName="/tf2_web_republisher"] - The name of the tf2_web_republisher server.
   * @param {string} [options.repubServiceName="/republish_tfs"] - The name of the republish_tfs service (non groovy compatibility mode only).
   */
  constructor(r) {
    super();
    /** @type {Goal|false} */
    j(this, "currentGoal", !1);
    /** @type {Topic|false} */
    j(this, "currentTopic", !1);
    j(this, "frameInfos", {});
    j(this, "republisherUpdateRequested", !1);
    /** @type {((tf: any) => any) | undefined} */
    j(this, "_subscribeCB");
    j(this, "_isDisposed", !1);
    this.ros = r.ros, this.fixedFrame = r.fixedFrame || "base_link", this.angularThres = r.angularThres || 2, this.transThres = r.transThres || 0.01, this.rate = r.rate || 10, this.updateDelay = r.updateDelay || 50;
    var i = r.topicTimeout || 2, a = Math.floor(i), s = Math.floor((i - a) * 1e9);
    this.topicTimeout = {
      secs: a,
      nsecs: s
    }, this.serverName = r.serverName || "/tf2_web_republisher", this.repubServiceName = r.repubServiceName || "/republish_tfs", this.actionClient = new gt({
      ros: r.ros,
      serverName: this.serverName,
      actionName: "tf2_web_republisher/TFSubscriptionAction",
      omitStatus: !0,
      omitResult: !0
    }), this.serviceClient = new ae({
      ros: r.ros,
      name: this.repubServiceName,
      serviceType: "tf2_web_republisher/RepublishTFs"
    });
  }
  /**
   * Process the incoming TF message and send them out using the callback
   * functions.
   *
   * @param {Object} tf - The TF message from the server.
   */
  processTFArray(r) {
    r.transforms.forEach((i) => {
      var a = i.child_frame_id;
      a[0] === "/" && (a = a.substring(1));
      var s = this.frameInfos[a];
      s && (s.transform = new lt({
        translation: i.transform.translation,
        rotation: i.transform.rotation
      }), s.cbs.forEach((c) => {
        c(s.transform);
      }));
    }, this);
  }
  /**
   * Create and send a new goal (or service request) to the tf2_web_republisher
   * based on the current list of TFs.
   */
  updateGoal() {
    var r = {
      source_frames: Object.keys(this.frameInfos),
      target_frame: this.fixedFrame,
      angular_thres: this.angularThres,
      trans_thres: this.transThres,
      rate: this.rate
    };
    this.ros.groovyCompatibility ? (this.currentGoal && this.currentGoal.cancel(), this.currentGoal = new Gt({
      actionClient: this.actionClient,
      goalMessage: r
    }), this.currentGoal.on("feedback", this.processTFArray.bind(this)), this.currentGoal.send()) : (r.timeout = this.topicTimeout, this.serviceClient.callService(r, this.processResponse.bind(this))), this.republisherUpdateRequested = !1;
  }
  /**
   * Process the service response and subscribe to the tf republisher
   * topic.
   *
   * @param {Object} response - The service response containing the topic name.
   */
  processResponse(r) {
    this._isDisposed || (this.currentTopic && this.currentTopic.unsubscribe(this._subscribeCB), this.currentTopic = new pe({
      ros: this.ros,
      name: r.topic_name,
      messageType: "tf2_web_republisher/TFArray"
    }), this._subscribeCB = this.processTFArray.bind(this), this.currentTopic.subscribe(this._subscribeCB));
  }
  /**
   * @callback subscribeCallback
   * @param {Transform} callback.transform - The transform data.
   */
  /**
   * Subscribe to the given TF frame.
   *
   * @param {string} frameID - The TF frame to subscribe to.
   * @param {subscribeCallback} callback - Function with the following params:
   */
  subscribe(r, i) {
    r[0] === "/" && (r = r.substring(1)), this.frameInfos[r] ? this.frameInfos[r].transform && i(this.frameInfos[r].transform) : (this.frameInfos[r] = {
      cbs: []
    }, this.republisherUpdateRequested || (setTimeout(this.updateGoal.bind(this), this.updateDelay), this.republisherUpdateRequested = !0)), this.frameInfos[r].cbs.push(i);
  }
  /**
   * Unsubscribe from the given TF frame.
   *
   * @param {string} frameID - The TF frame to unsubscribe from.
   * @param {function} callback - The callback function to remove.
   */
  unsubscribe(r, i) {
    r[0] === "/" && (r = r.substring(1));
    for (var a = this.frameInfos[r], s = a && a.cbs || [], c = s.length; c--; )
      s[c] === i && s.splice(c, 1);
    (!i || s.length === 0) && delete this.frameInfos[r];
  }
  /**
   * Unsubscribe and unadvertise all topics associated with this TFClient.
   */
  dispose() {
    this._isDisposed = !0, this.actionClient.dispose(), this.currentTopic && this.currentTopic.unsubscribe(this._subscribeCB);
  }
}
class Ht extends xe {
  // the one this'll be preempting
  /**
   * @param {Object} options
   * @param {Ros} options.ros - The ROSLIB.Ros connection handle.
   * @param {string} options.serverName - The action server name, like '/fibonacci'.
   * @param {string} options.actionName - The action message name, like 'actionlib_tutorials/FibonacciAction'.
   */
  constructor(r) {
    super();
    // needed for handling preemption prompted by a new goal being received
    /** @type {{goal_id: {id: any, stamp: any}, goal: any} | null} */
    j(this, "currentGoal", null);
    // currently tracked goal
    /** @type {{goal_id: {id: any, stamp: any}, goal: any} | null} */
    j(this, "nextGoal", null);
    this.ros = r.ros, this.serverName = r.serverName, this.actionName = r.actionName, this.feedbackPublisher = new pe({
      ros: this.ros,
      name: this.serverName + "/feedback",
      messageType: this.actionName + "Feedback"
    }), this.feedbackPublisher.advertise();
    var i = new pe({
      ros: this.ros,
      name: this.serverName + "/status",
      messageType: "actionlib_msgs/GoalStatusArray"
    });
    i.advertise(), this.resultPublisher = new pe({
      ros: this.ros,
      name: this.serverName + "/result",
      messageType: this.actionName + "Result"
    }), this.resultPublisher.advertise();
    var a = new pe({
      ros: this.ros,
      name: this.serverName + "/goal",
      messageType: this.actionName + "Goal"
    }), s = new pe({
      ros: this.ros,
      name: this.serverName + "/cancel",
      messageType: "actionlib_msgs/GoalID"
    });
    this.statusMessage = {
      header: {
        stamp: { secs: 0, nsecs: 100 },
        frame_id: ""
      },
      /** @type {{goal_id: any, status: number}[]} */
      status_list: []
    }, a.subscribe((f) => {
      this.currentGoal ? (this.nextGoal = f, this.emit("cancel")) : (this.statusMessage.status_list = [{ goal_id: f.goal_id, status: 1 }], this.currentGoal = f, this.emit("goal", f.goal));
    });
    var c = function(f, g) {
      return f.secs > g.secs ? !1 : f.secs < g.secs ? !0 : f.nsecs < g.nsecs;
    };
    s.subscribe((f) => {
      f.stamp.secs === 0 && f.stamp.secs === 0 && f.id === "" ? (this.nextGoal = null, this.currentGoal && this.emit("cancel")) : (this.currentGoal && f.id === this.currentGoal.goal_id.id ? this.emit("cancel") : this.nextGoal && f.id === this.nextGoal.goal_id.id && (this.nextGoal = null), this.nextGoal && c(this.nextGoal.goal_id.stamp, f.stamp) && (this.nextGoal = null), this.currentGoal && c(this.currentGoal.goal_id.stamp, f.stamp) && this.emit("cancel"));
    }), setInterval(() => {
      var f = /* @__PURE__ */ new Date(), g = Math.floor(f.getTime() / 1e3), N = Math.round(
        1e9 * (f.getTime() / 1e3 - g)
      );
      this.statusMessage.header.stamp.secs = g, this.statusMessage.header.stamp.nsecs = N, i.publish(this.statusMessage);
    }, 500);
  }
  /**
   * Set action state to succeeded and return to client.
   *
   * @param {Object} result - The result to return to the client.
   */
  setSucceeded(r) {
    if (this.currentGoal !== null) {
      var i = {
        status: { goal_id: this.currentGoal.goal_id, status: 3 },
        result: r
      };
      this.resultPublisher.publish(i), this.statusMessage.status_list = [], this.nextGoal ? (this.currentGoal = this.nextGoal, this.nextGoal = null, this.emit("goal", this.currentGoal.goal)) : this.currentGoal = null;
    }
  }
  /**
   * Set action state to aborted and return to client.
   *
   * @param {Object} result - The result to return to the client.
   */
  setAborted(r) {
    if (this.currentGoal !== null) {
      var i = {
        status: { goal_id: this.currentGoal.goal_id, status: 4 },
        result: r
      };
      this.resultPublisher.publish(i), this.statusMessage.status_list = [], this.nextGoal ? (this.currentGoal = this.nextGoal, this.nextGoal = null, this.emit("goal", this.currentGoal.goal)) : this.currentGoal = null;
    }
  }
  /**
   * Send a feedback message.
   *
   * @param {Object} feedback - The feedback to send to the client.
   */
  sendFeedback(r) {
    if (this.currentGoal !== null) {
      var i = {
        status: { goal_id: this.currentGoal.goal_id, status: 1 },
        feedback: r
      };
      this.feedbackPublisher.publish(i);
    }
  }
  /**
   * Handle case where client requests preemption.
   */
  setPreempted() {
    if (this.currentGoal !== null) {
      this.statusMessage.status_list = [];
      var r = {
        status: { goal_id: this.currentGoal.goal_id, status: 2 }
      };
      this.resultPublisher.publish(r), this.nextGoal ? (this.currentGoal = this.nextGoal, this.nextGoal = null, this.emit("goal", this.currentGoal.goal)) : this.currentGoal = null;
    }
  }
}
function dr() {
  return typeof process < "u" && process.versions !== null;
}
class Er extends xe {
  /**
   * @param {Object} [options]
   * @param {string} [options.url] - The WebSocket URL for rosbridge. Can be specified later with `connect`.
   * @param {boolean} [options.groovyCompatibility=true] - Don't use interfaces that changed after the last groovy release or rosbridge_suite and related tools.
   * @param {'websocket'|RTCPeerConnection} [options.transportLibrary='websocket'] - 'websocket', or an RTCPeerConnection instance controlling how the connection is created in `connect`.
   * @param {Object} [options.transportOptions={}] - The options to use when creating a connection. Currently only used if `transportLibrary` is RTCPeerConnection.
   */
  constructor(r) {
    super();
    /** @type {WebSocket | import("ws").WebSocket | null} */
    j(this, "socket", null);
    j(this, "idCounter", 0);
    j(this, "isConnected", !1);
    j(this, "groovyCompatibility", !0);
    r = r || {}, this.transportLibrary = r.transportLibrary || "websocket", this.transportOptions = r.transportOptions || {}, this.groovyCompatibility = r.groovyCompatibility ?? !0, r.url && this.connect(r.url);
  }
  /**
   * Connect to the specified WebSocket.
   *
   * @param {string} url - WebSocket URL or RTCDataChannel label for rosbridge.
   */
  connect(r) {
    if (this.transportLibrary.constructor.name === "RTCPeerConnection")
      this.socket = Object.assign(
        // @ts-expect-error -- this is kinda wild. `this.transportLibrary` can either be a string or an RTCDataChannel. This needs fixing.
        this.transportLibrary.createDataChannel(r, this.transportOptions),
        Dt(this)
      );
    else if (this.transportLibrary === "websocket")
      if (typeof window < "u" || !dr()) {
        if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
          const i = new WebSocket(r);
          i.binaryType = "arraybuffer", this.socket = Object.assign(i, Dt(this));
        }
      } else
        import("ws").then((i) => {
          if (!this.socket || this.socket.readyState === i.WebSocket.CLOSED) {
            const a = new i.WebSocket(r);
            a.binaryType = "arraybuffer", this.socket = Object.assign(a, Dt(this));
          }
        });
    else
      throw "Unknown transportLibrary: " + this.transportLibrary.toString();
  }
  /**
   * Disconnect from the WebSocket server.
   */
  close() {
    this.socket && this.socket.close();
  }
  /**
   * Send an authorization request to the server.
   *
   * @param {string} mac - MAC (hash) string given by the trusted source.
   * @param {string} client - IP of the client.
   * @param {string} dest - IP of the destination.
   * @param {string} rand - Random string given by the trusted source.
   * @param {Object} t - Time of the authorization request.
   * @param {string} level - User level as a string given by the client.
   * @param {Object} end - End time of the client's session.
   */
  authenticate(r, i, a, s, c, f, g) {
    var N = {
      op: "auth",
      mac: r,
      client: i,
      dest: a,
      rand: s,
      t: c,
      level: f,
      end: g
    };
    this.callOnConnection(N);
  }
  /**
   * Send an encoded message over the WebSocket.
   *
   * @param {Object} messageEncoded - The encoded message to be sent.
   */
  sendEncodedMessage(r) {
    this.isConnected ? this.socket !== null && this.socket.send(r) : this.once("connection", () => {
      this.socket !== null && this.socket.send(r);
    });
  }
  /**
   * Send the message over the WebSocket, but queue the message up if not yet
   * connected.
   *
   * @param {Object} message - The message to be sent.
   */
  callOnConnection(r) {
    this.transportOptions.encoder ? this.transportOptions.encoder(r, this.sendEncodedMessage) : this.sendEncodedMessage(JSON.stringify(r));
  }
  /**
   * Send a set_level request to the server.
   *
   * @param {string} level - Status level (none, error, warning, info).
   * @param {number} [id] - Operation ID to change status level on.
   */
  setStatusLevel(r, i) {
    var a = {
      op: "set_level",
      level: r,
      id: i
    };
    this.callOnConnection(a);
  }
  /**
   * @callback getActionServersCallback
   * @param {string[]} actionservers - Array of action server names.
   */
  /**
   * @callback getActionServersFailedCallback
   * @param {string} error - The error message reported by ROS.
   */
  /**
   * Retrieve a list of action servers in ROS as an array of string.
   *
   * @param {getActionServersCallback} callback - Function with the following params:
   * @param {getActionServersFailedCallback} [failedCallback] - The callback function when the service call failed with params:
   */
  getActionServers(r, i) {
    var a = new ae({
      ros: this,
      name: "rosapi/action_servers",
      serviceType: "rosapi/GetActionServers"
    }), s = {};
    typeof i == "function" ? a.callService(
      s,
      function(c) {
        r(c.action_servers);
      },
      function(c) {
        i(c);
      }
    ) : a.callService(s, function(c) {
      r(c.action_servers);
    });
  }
  /**
   * @callback getTopicsCallback
   * @param {Object} result - The result object with the following params:
   * @param {string[]} result.topics - Array of topic names.
   * @param {string[]} result.types - Array of message type names.
   */
  /**
   * @callback getTopicsFailedCallback
   * @param {string} error - The error message reported by ROS.
   */
  /**
   * Retrieve a list of topics in ROS as an array.
   *
   * @param {getTopicsCallback} callback - Function with the following params:
   * @param {getTopicsFailedCallback} [failedCallback] - The callback function when the service call failed with params:
   */
  getTopics(r, i) {
    var a = new ae({
      ros: this,
      name: "rosapi/topics",
      serviceType: "rosapi/Topics"
    }), s = {};
    typeof i == "function" ? a.callService(
      s,
      function(c) {
        r(c);
      },
      function(c) {
        i(c);
      }
    ) : a.callService(s, function(c) {
      r(c);
    });
  }
  /**
   * @callback getTopicsForTypeCallback
   * @param {string[]} topics - Array of topic names.
   */
  /**
   * @callback getTopicsForTypeFailedCallback
   * @param {string} error - The error message reported by ROS.
   */
  /**
   * Retrieve a list of topics in ROS as an array of a specific type.
   *
   * @param {string} topicType - The topic type to find.
   * @param {getTopicsForTypeCallback} callback - Function with the following params:
   * @param {getTopicsForTypeFailedCallback} [failedCallback] - The callback function when the service call failed with params:
   */
  getTopicsForType(r, i, a) {
    var s = new ae({
      ros: this,
      name: "rosapi/topics_for_type",
      serviceType: "rosapi/TopicsForType"
    }), c = {
      type: r
    };
    typeof a == "function" ? s.callService(
      c,
      function(f) {
        i(f.topics);
      },
      function(f) {
        a(f);
      }
    ) : s.callService(c, function(f) {
      i(f.topics);
    });
  }
  /**
   * @callback getServicesCallback
   * @param {string[]} services - Array of service names.
   */
  /**
   * @callback getServicesFailedCallback
   * @param {string} error - The error message reported by ROS.
   */
  /**
   * Retrieve a list of active service names in ROS.
   *
   * @param {getServicesCallback} callback - Function with the following params:
   * @param {getServicesFailedCallback} [failedCallback] - The callback function when the service call failed with params:
   */
  getServices(r, i) {
    var a = new ae({
      ros: this,
      name: "rosapi/services",
      serviceType: "rosapi/Services"
    }), s = {};
    typeof i == "function" ? a.callService(
      s,
      function(c) {
        r(c.services);
      },
      function(c) {
        i(c);
      }
    ) : a.callService(s, function(c) {
      r(c.services);
    });
  }
  /**
   * @callback getServicesForTypeCallback
   * @param {string[]} topics - Array of service names.
   */
  /**
   * @callback getServicesForTypeFailedCallback
   * @param {string} error - The error message reported by ROS.
   */
  /**
   * Retrieve a list of services in ROS as an array as specific type.
   *
   * @param {string} serviceType - The service type to find.
   * @param {getServicesForTypeCallback} callback - Function with the following params:
   * @param {getServicesForTypeFailedCallback} [failedCallback] - The callback function when the service call failed with params:
   */
  getServicesForType(r, i, a) {
    var s = new ae({
      ros: this,
      name: "rosapi/services_for_type",
      serviceType: "rosapi/ServicesForType"
    }), c = {
      type: r
    };
    typeof a == "function" ? s.callService(
      c,
      function(f) {
        i(f.services);
      },
      function(f) {
        a(f);
      }
    ) : s.callService(c, function(f) {
      i(f.services);
    });
  }
  /**
   * @callback getServiceRequestDetailsCallback
   * @param {Object} result - The result object with the following params:
   * @param {string[]} result.typedefs - An array containing the details of the service request.
   */
  /**
   * @callback getServiceRequestDetailsFailedCallback
   * @param {string} error - The error message reported by ROS.
   */
  /**
   * Retrieve the details of a ROS service request.
   *
   * @param {string} type - The type of the service.
   * @param {getServiceRequestDetailsCallback} callback - Function with the following params:
   * @param {getServiceRequestDetailsFailedCallback} [failedCallback] - The callback function when the service call failed with params:
   */
  getServiceRequestDetails(r, i, a) {
    var s = new ae({
      ros: this,
      name: "rosapi/service_request_details",
      serviceType: "rosapi/ServiceRequestDetails"
    }), c = {
      type: r
    };
    typeof a == "function" ? s.callService(
      c,
      function(f) {
        i(f);
      },
      function(f) {
        a(f);
      }
    ) : s.callService(c, function(f) {
      i(f);
    });
  }
  /**
   * @callback getServiceResponseDetailsCallback
   * @param {{typedefs: string[]}} result - The result object with the following params:
   */
  /**
   * @callback getServiceResponseDetailsFailedCallback
   * @param {string} error - The error message reported by ROS.
   */
  /**
   * Retrieve the details of a ROS service response.
   *
   * @param {string} type - The type of the service.
   * @param {getServiceResponseDetailsCallback} callback - Function with the following params:
   * @param {getServiceResponseDetailsFailedCallback} [failedCallback] - The callback function when the service call failed with params:
   */
  getServiceResponseDetails(r, i, a) {
    var s = new ae({
      ros: this,
      name: "rosapi/service_response_details",
      serviceType: "rosapi/ServiceResponseDetails"
    }), c = {
      type: r
    };
    typeof a == "function" ? s.callService(
      c,
      function(f) {
        i(f);
      },
      function(f) {
        a(f);
      }
    ) : s.callService(c, function(f) {
      i(f);
    });
  }
  /**
   * @callback getNodesCallback
   * @param {string[]} nodes - Array of node names.
   */
  /**
   * @callback getNodesFailedCallback
   * @param {string} error - The error message reported by ROS.
   */
  /**
   * Retrieve a list of active node names in ROS.
   *
   * @param {getNodesCallback} callback - Function with the following params:
   * @param {getNodesFailedCallback} [failedCallback] - The callback function when the service call failed with params:
   */
  getNodes(r, i) {
    var a = new ae({
      ros: this,
      name: "rosapi/nodes",
      serviceType: "rosapi/Nodes"
    }), s = {};
    typeof i == "function" ? a.callService(
      s,
      function(c) {
        r(c.nodes);
      },
      function(c) {
        i(c);
      }
    ) : a.callService(s, function(c) {
      r(c.nodes);
    });
  }
  /**
   * @callback getNodeDetailsCallback
   * @param {string[]} subscriptions - Array of subscribed topic names.
   * @param {string[]} publications - Array of published topic names.
   * @param {string[]} services - Array of service names hosted.
   */
  /**
   * @callback getNodeDetailsFailedCallback
   * @param {string} error - The error message reported by ROS.
   */
  /**
   * @callback getNodeDetailsLegacyCallback
   * @param {Object} result - The result object with the following params:
   * @param {string[]} result.subscribing - Array of subscribed topic names.
   * @param {string[]} result.publishing - Array of published topic names.
   * @param {string[]} result.services - Array of service names hosted.
   */
  /**
   * Retrieve a list of subscribed topics, publishing topics and services of a specific node.
   * <br>
   * These are the parameters if failedCallback is <strong>defined</strong>.
   *
   * @param {string} node - Name of the node.
   * @param {getNodeDetailsCallback} callback - Function with the following params:
   * @param {getNodeDetailsFailedCallback} [failedCallback] - The callback function when the service call failed with params:
   *
   * @also
   *
   * Retrieve a list of subscribed topics, publishing topics and services of a specific node.
   * <br>
   * These are the parameters if failedCallback is <strong>undefined</strong>.
   *
   * @param {string} node - Name of the node.
   * @param {getNodeDetailsLegacyCallback} callback - Function with the following params:
   * @param {getNodeDetailsFailedCallback} [failedCallback] - The callback function when the service call failed with params:
   */
  getNodeDetails(r, i, a) {
    var s = new ae({
      ros: this,
      name: "rosapi/node_details",
      serviceType: "rosapi/NodeDetails"
    }), c = {
      node: r
    };
    typeof a == "function" ? s.callService(
      c,
      function(f) {
        i(f.subscribing, f.publishing, f.services);
      },
      function(f) {
        a(f);
      }
    ) : s.callService(c, function(f) {
      i(f);
    });
  }
  /**
   * @callback getParamsCallback
   * @param {string[]} params - Array of param names.
   */
  /**
   * @callback getParamsFailedCallback
   * @param {string} error - The error message reported by ROS.
   */
  /**
   * Retrieve a list of parameter names from the ROS Parameter Server.
   *
   * @param {getParamsCallback} callback - Function with the following params:
   * @param {getParamsFailedCallback} [failedCallback] - The callback function when the service call failed with params:
   */
  getParams(r, i) {
    var a = new ae({
      ros: this,
      name: "rosapi/get_param_names",
      serviceType: "rosapi/GetParamNames"
    }), s = {};
    typeof i == "function" ? a.callService(
      s,
      function(c) {
        r(c.names);
      },
      function(c) {
        i(c);
      }
    ) : a.callService(s, function(c) {
      r(c.names);
    });
  }
  /**
   * @callback getTopicTypeCallback
   * @param {string} type - The type of the topic.
   */
  /**
   * @callback getTopicTypeFailedCallback
   * @param {string} error - The error message reported by ROS.
   */
  /**
   * Retrieve the type of a ROS topic.
   *
   * @param {string} topic - Name of the topic.
   * @param {getTopicTypeCallback} callback - Function with the following params:
   * @param {getTopicTypeFailedCallback} [failedCallback] - The callback function when the service call failed with params:
   */
  getTopicType(r, i, a) {
    var s = new ae({
      ros: this,
      name: "rosapi/topic_type",
      serviceType: "rosapi/TopicType"
    }), c = {
      topic: r
    };
    typeof a == "function" ? s.callService(
      c,
      function(f) {
        i(f.type);
      },
      function(f) {
        a(f);
      }
    ) : s.callService(c, function(f) {
      i(f.type);
    });
  }
  /**
   * @callback getServiceTypeCallback
   * @param {string} type - The type of the service.
   */
  /**
   * @callback getServiceTypeFailedCallback
   * @param {string} error - The error message reported by ROS.
   */
  /**
   * Retrieve the type of a ROS service.
   *
   * @param {string} service - Name of the service.
   * @param {getServiceTypeCallback} callback - Function with the following params:
   * @param {getServiceTypeFailedCallback} [failedCallback] - The callback function when the service call failed with params:
   */
  getServiceType(r, i, a) {
    var s = new ae({
      ros: this,
      name: "rosapi/service_type",
      serviceType: "rosapi/ServiceType"
    }), c = {
      service: r
    };
    typeof a == "function" ? s.callService(
      c,
      function(f) {
        i(f.type);
      },
      function(f) {
        a(f);
      }
    ) : s.callService(c, function(f) {
      i(f.type);
    });
  }
  /**
   * @callback getMessageDetailsCallback
   * @param {string} details - An array of the message details.
   */
  /**
   * @callback getMessageDetailsFailedCallback
   * @param {string} error - The error message reported by ROS.
   */
  /**
   * Retrieve the details of a ROS message.
   *
   * @param {string} message - The name of the message type.
   * @param {getMessageDetailsCallback} callback - Function with the following params:
   * @param {getMessageDetailsFailedCallback} [failedCallback] - The callback function when the service call failed with params:
   */
  getMessageDetails(r, i, a) {
    var s = new ae({
      ros: this,
      name: "rosapi/message_details",
      serviceType: "rosapi/MessageDetails"
    }), c = {
      type: r
    };
    typeof a == "function" ? s.callService(
      c,
      function(f) {
        i(f.typedefs);
      },
      function(f) {
        a(f);
      }
    ) : s.callService(c, function(f) {
      i(f.typedefs);
    });
  }
  /**
   * Decode a typedef array into a dictionary like `rosmsg show foo/bar`.
   *
   * @param {Object[]} defs - Array of type_def dictionary.
   */
  decodeTypeDefs(r) {
    var i = (a, s) => {
      for (var c = {}, f = 0; f < a.fieldnames.length; f++) {
        var g = a.fieldarraylen[f], N = a.fieldnames[f], T = a.fieldtypes[f];
        if (T.indexOf("/") === -1)
          g === -1 ? c[N] = T : c[N] = [T];
        else {
          for (var m = !1, M = 0; M < s.length; M++)
            if (s[M].type.toString() === T.toString()) {
              m = s[M];
              break;
            }
          if (m) {
            var E = i(m, s);
            g === -1 ? c[N] = E : c[N] = [E];
          } else
            this.emit(
              "error",
              "Cannot find " + T + " in decodeTypeDefs"
            );
        }
      }
      return c;
    };
    return i(r[0], r);
  }
  /**
   * @callback getTopicsAndRawTypesCallback
   * @param {Object} result - The result object with the following params:
   * @param {string[]} result.topics - Array of topic names.
   * @param {string[]} result.types - Array of message type names.
   * @param {string[]} result.typedefs_full_text - Array of full definitions of message types, similar to `gendeps --cat`.
   */
  /**
   * @callback getTopicsAndRawTypesFailedCallback
   * @param {string} error - The error message reported by ROS.
   */
  /**
   * Retrieve a list of topics and their associated type definitions.
   *
   * @param {getTopicsAndRawTypesCallback} callback - Function with the following params:
   * @param {getTopicsAndRawTypesFailedCallback} [failedCallback] - The callback function when the service call failed with params:
   */
  getTopicsAndRawTypes(r, i) {
    var a = new ae({
      ros: this,
      name: "rosapi/topics_and_raw_types",
      serviceType: "rosapi/TopicsAndRawTypes"
    }), s = {};
    typeof i == "function" ? a.callService(
      s,
      function(c) {
        r(c);
      },
      function(c) {
        i(c);
      }
    ) : a.callService(s, function(c) {
      r(c);
    });
  }
  Topic(r) {
    return new pe({ ros: this, ...r });
  }
  Param(r) {
    return new kt({ ros: this, ...r });
  }
  Service(r) {
    return new ae({ ros: this, ...r });
  }
  TFClient(r) {
    return new Vt({ ros: this, ...r });
  }
  ActionClient(r) {
    return new gt({ ros: this, ...r });
  }
  SimpleActionServer(r) {
    return new Ht({ ros: this, ...r });
  }
}
var ft = /* @__PURE__ */ ((h) => (h[h.STATUS_UNKNOWN = 0] = "STATUS_UNKNOWN", h[h.STATUS_ACCEPTED = 1] = "STATUS_ACCEPTED", h[h.STATUS_EXECUTING = 2] = "STATUS_EXECUTING", h[h.STATUS_CANCELING = 3] = "STATUS_CANCELING", h[h.STATUS_SUCCEEDED = 4] = "STATUS_SUCCEEDED", h[h.STATUS_CANCELED = 5] = "STATUS_CANCELED", h[h.STATUS_ABORTED = 6] = "STATUS_ABORTED", h))(ft || {});
class zt extends xe {
  /**
   * @param {Object} options
   * @param {Ros} options.ros - The ROSLIB.Ros connection handle.
   * @param {string} options.name - The action name, like '/fibonacci'.
   * @param {string} options.actionType - The action type, like 'action_tutorials_interfaces/Fibonacci'.
   */
  constructor(r) {
    super();
    j(this, "isAdvertised", !1);
    /**
     * @callback advertiseActionCallback
     * @param {TGoal} goal - The action goal.
     * @param {string} id - The ID of the action goal to execute.
     */
    /**
     * @private
     * @type {advertiseActionCallback | null}
     */
    j(this, "_actionCallback", null);
    /**
     * @callback advertiseCancelCallback
     * @param {string} id - The ID of the action goal to cancel.
     */
    /**
     * @private
     * @type {advertiseCancelCallback | null}
     */
    j(this, "_cancelCallback", null);
    this.ros = r.ros, this.name = r.name, this.actionType = r.actionType;
  }
  /**
   * @callback sendGoalResultCallback
   * @param {TResult} result - The result from the action.
   */
  /**
   * @callback sendGoalFeedbackCallback
   * @param {TFeedback} feedback - The feedback from the action.
   */
  /**
   * @callback sendGoalFailedCallback
   * @param {string} error - The error message reported by ROS.
   */
  /**
   * Sends an action goal. Returns the feedback in the feedback callback while the action is running
   * and the result in the result callback when the action is completed.
   * Does nothing if this action is currently advertised.
   *
   * @param {TGoal} goal - The action goal to send.
   * @param {sendGoalResultCallback} resultCallback - The callback function when the action is completed.
   * @param {sendGoalFeedbackCallback} [feedbackCallback] - The callback function when the action pulishes feedback.
   * @param {sendGoalFailedCallback} [failedCallback] - The callback function when the action failed.
   */
  sendGoal(r, i, a, s) {
    if (!this.isAdvertised) {
      var c = "send_action_goal:" + this.name + ":" + ++this.ros.idCounter;
      (i || s) && this.ros.on(c, function(g) {
        g.result !== void 0 && g.result === !1 ? typeof s == "function" && s(g.values) : g.op === "action_feedback" && typeof a == "function" ? a(g.values) : g.op === "action_result" && typeof i == "function" && i(g.values);
      });
      var f = {
        op: "send_action_goal",
        id: c,
        action: this.name,
        action_type: this.actionType,
        args: r,
        feedback: !0
      };
      return this.ros.callOnConnection(f), c;
    }
  }
  /**
   * Cancels an action goal.
   *
   * @param {string} id - The ID of the action goal to cancel.
   */
  cancelGoal(r) {
    var i = {
      op: "cancel_action_goal",
      id: r,
      action: this.name
    };
    this.ros.callOnConnection(i);
  }
  /**
   * Advertise the action. This turns the Action object from a client
   * into a server. The callback will be called with every goal sent to this action.
   *
   * @param {advertiseActionCallback} actionCallback - This works similarly to the callback for a C++ action.
   * @param {advertiseCancelCallback} cancelCallback - A callback function to execute when the action is canceled.
   */
  advertise(r, i) {
    this.isAdvertised || typeof r != "function" || (this._actionCallback = r, this._cancelCallback = i, this.ros.on(this.name, this._executeAction.bind(this)), this.ros.callOnConnection({
      op: "advertise_action",
      type: this.actionType,
      action: this.name
    }), this.isAdvertised = !0);
  }
  /**
   * Unadvertise a previously advertised action.
   */
  unadvertise() {
    this.isAdvertised && (this.ros.callOnConnection({
      op: "unadvertise_action",
      action: this.name
    }), this.isAdvertised = !1);
  }
  /**
   * Helper function that executes an action by calling the provided
   * action callback with the auto-generated ID as a user-accessible input.
   * Should not be called manually.
   *
   * @param {Object} rosbridgeRequest - The rosbridge request containing the action goal to send and its ID.
   * @param {string} rosbridgeRequest.id - The ID of the action goal.
   * @param {TGoal} rosbridgeRequest.args - The arguments of the action goal.
   */
  _executeAction(r) {
    var i = r.id;
    typeof i == "string" && this.ros.on(i, (a) => {
      a.op === "cancel_action_goal" && typeof this._cancelCallback == "function" && this._cancelCallback(i);
    }), typeof this._actionCallback == "function" && this._actionCallback(r.args, i);
  }
  /**
   * Helper function to send action feedback inside an action handler.
   *
   * @param {string} id - The action goal ID.
   * @param {TFeedback} feedback - The feedback to send.
   */
  sendFeedback(r, i) {
    var a = {
      op: "action_feedback",
      id: r,
      action: this.name,
      values: i
    };
    this.ros.callOnConnection(a);
  }
  /**
   * Helper function to set an action as succeeded.
   *
   * @param {string} id - The action goal ID.
   * @param {TResult} result - The result to set.
   */
  setSucceeded(r, i) {
    var a = {
      op: "action_result",
      id: r,
      action: this.name,
      values: i,
      status: ft.STATUS_SUCCEEDED,
      result: !0
    };
    this.ros.callOnConnection(a);
  }
  /**
   * Helper function to set an action as canceled.
   *
   * @param {string} id - The action goal ID.
   * @param {TResult} result - The result to set.
   */
  setCanceled(r, i) {
    var a = {
      op: "action_result",
      id: r,
      action: this.name,
      values: i,
      status: ft.STATUS_CANCELED,
      result: !0
    };
    this.ros.callOnConnection(a);
  }
  /**
   * Helper function to set an action as failed.
   *
   * @param {string} id - The action goal ID.
   */
  setFailed(r) {
    var i = {
      op: "action_result",
      id: r,
      action: this.name,
      status: ft.STATUS_ABORTED,
      result: !1
    };
    this.ros.callOnConnection(i);
  }
}
const Dr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Action: zt,
  Param: kt,
  Ros: Er,
  Service: ae,
  Topic: pe
}, Symbol.toStringTag, { value: "Module" }));
class vr extends xe {
  /**
   * @param {Object} options
   * @param {Ros} options.ros - The ROSLIB.Ros connection handle.
   * @param {string} options.serverName - The action server name, like '/fibonacci'.
   * @param {string} options.actionName - The action message name, like 'actionlib_tutorials/FibonacciAction'.
   */
  constructor(u) {
    super(), this.ros = u.ros, this.serverName = u.serverName, this.actionName = u.actionName;
    var r = new pe({
      ros: this.ros,
      name: this.serverName + "/goal",
      messageType: this.actionName + "Goal"
    }), i = new pe({
      ros: this.ros,
      name: this.serverName + "/feedback",
      messageType: this.actionName + "Feedback"
    }), a = new pe({
      ros: this.ros,
      name: this.serverName + "/status",
      messageType: "actionlib_msgs/GoalStatusArray"
    }), s = new pe({
      ros: this.ros,
      name: this.serverName + "/result",
      messageType: this.actionName + "Result"
    });
    r.subscribe((c) => {
      this.emit("goal", c);
    }), a.subscribe((c) => {
      c.status_list.forEach((f) => {
        this.emit("status", f);
      });
    }), i.subscribe((c) => {
      this.emit("status", c.status), this.emit("feedback", c.feedback);
    }), s.subscribe((c) => {
      this.emit("status", c.status), this.emit("result", c.result);
    });
  }
}
const Ar = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ActionClient: gt,
  ActionListener: vr,
  Goal: Gt,
  SimpleActionServer: Ht
}, Symbol.toStringTag, { value: "Module" }));
class Xe {
  /**
   * @param {Object} [options]
   * @param {Vector3} [options.position] - The ROSLIB.Vector3 describing the position.
   * @param {Quaternion} [options.orientation] - The ROSLIB.Quaternion describing the orientation.
   */
  constructor(u) {
    u = u || {}, u = u || {}, this.position = new Ne(u.position), this.orientation = new Fe(u.orientation);
  }
  /**
   * Apply a transform against this pose.
   *
   * @param {Transform} tf - The transform to be applied.
   */
  applyTransform(u) {
    this.position.multiplyQuaternion(u.rotation), this.position.add(u.translation);
    var r = u.rotation.clone();
    r.multiply(this.orientation), this.orientation = r;
  }
  /**
   * Clone a copy of this pose.
   *
   * @returns {Pose} The cloned pose.
   */
  clone() {
    return new Xe(this);
  }
  /**
   * Multiply this pose with another pose without altering this pose.
   *
   * @returns {Pose} The result of the multiplication.
   */
  multiply(u) {
    var r = u.clone();
    return r.applyTransform({
      rotation: this.orientation,
      translation: this.position
    }), r;
  }
  /**
   * Compute the inverse of this pose.
   *
   * @returns {Pose} The inverse of the pose.
   */
  getInverse() {
    var u = this.clone();
    return u.orientation.invert(), u.position.multiplyQuaternion(u.orientation), u.position.x *= -1, u.position.y *= -1, u.position.z *= -1, u;
  }
}
const gr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Pose: Xe,
  Quaternion: Fe,
  Transform: lt,
  Vector3: Ne
}, Symbol.toStringTag, { value: "Module" }));
class Tr extends xe {
  /**
   * @param {Object} options
   * @param {Ros} options.ros - The ROSLIB.Ros connection handle.
   * @param {string} [options.fixedFrame=base_link] - The fixed frame.
   * @param {number} [options.angularThres=2.0] - The angular threshold for the TF republisher.
   * @param {number} [options.transThres=0.01] - The translation threshold for the TF republisher.
   * @param {number} [options.rate=10.0] - The rate for the TF republisher.
   * @param {number} [options.updateDelay=50] - The time (in ms) to wait after a new subscription
   *     to update the TF republisher's list of TFs.
   * @param {number} [options.topicTimeout=2.0] - The timeout parameter for the TF republisher.
   * @param {string} [options.serverName="/tf2_web_republisher"] - The name of the tf2_web_republisher server.
   * @param {string} [options.repubServiceName="/republish_tfs"] - The name of the republish_tfs service (non groovy compatibility mode only).
   */
  constructor(u) {
    super(), this.ros = u.ros, this.fixedFrame = u.fixedFrame || "base_link", this.angularThres = u.angularThres || 2, this.transThres = u.transThres || 0.01, this.rate = u.rate || 10, this.updateDelay = u.updateDelay || 50;
    const r = u.topicTimeout || 2, i = Math.floor(r), a = Math.floor((r - i) * 1e9);
    this.topicTimeout = {
      secs: i,
      nsecs: a
    }, this.serverName = u.serverName || "/tf2_web_republisher", this.goal_id = "", this.frameInfos = {}, this.republisherUpdateRequested = !1, this._subscribeCB = void 0, this._isDisposed = !1, this.actionClient = new zt({
      ros: u.ros,
      name: this.serverName,
      actionType: "tf2_web_republisher_msgs/TFSubscription"
    });
  }
  /**
   * Process the incoming TF message and send them out using the callback
   * functions.
   *
   * @param {Object} tf - The TF message from the server.
   */
  processTFArray(u) {
    let r = this;
    u.transforms.forEach(function(i) {
      let a = i.child_frame_id;
      a[0] === "/" && (a = a.substring(1));
      const s = r.frameInfos[a];
      s && (s.transform = new lt({
        translation: i.transform.translation,
        rotation: i.transform.rotation
      }), s.cbs.forEach(function(c) {
        c(s.transform);
      }));
    }, this);
  }
  /**
   * Create and send a new goal (or service request) to the tf2_web_republisher
   * based on the current list of TFs.
   */
  updateGoal() {
    const u = {
      source_frames: Object.keys(this.frameInfos),
      target_frame: this.fixedFrame,
      angular_thres: this.angularThres,
      trans_thres: this.transThres,
      rate: this.rate
    };
    this.goal_id !== "" && this.actionClient.cancelGoal(this.goal_id), this.currentGoal = u;
    const r = this.actionClient.sendGoal(
      u,
      (i) => {
      },
      (i) => {
        this.processTFArray(i);
      }
    );
    typeof r == "string" && (this.goal_id = r), this.republisherUpdateRequested = !1;
  }
  /**
   * @callback subscribeCallback
   * @param {Transform} callback.transform - The transform data.
   */
  /**
   * Subscribe to the given TF frame.
   *
   * @param {string} frameID - The TF frame to subscribe to.
   * @param {subscribeCallback} callback - Function with the following params:
   */
  subscribe(u, r) {
    u[0] === "/" && (u = u.substring(1)), this.frameInfos[u] ? this.frameInfos[u].transform && r(this.frameInfos[u].transform) : (this.frameInfos[u] = {
      cbs: []
    }, this.republisherUpdateRequested || (setTimeout(this.updateGoal.bind(this), this.updateDelay), this.republisherUpdateRequested = !0)), this.frameInfos[u].cbs.push(r);
  }
  /**
   * Unsubscribe from the given TF frame.
   *
   * @param {string} frameID - The TF frame to unsubscribe from.
   * @param {function} callback - The callback function to remove.
   */
  unsubscribe(u, r) {
    u[0] === "/" && (u = u.substring(1));
    const i = this.frameInfos[u];
    for (var a = i && i.cbs || [], s = a.length; s--; )
      a[s] === r && a.splice(s, 1);
    (!r || a.length === 0) && delete this.frameInfos[u];
  }
  /**
   * Unsubscribe and unadvertise all topics associated with this TFClient.
   */
  dispose() {
    this._isDisposed = !0;
  }
}
const Cr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ROS2TFClient: Tr,
  TFClient: Vt
}, Symbol.toStringTag, { value: "Module" })), Yt = 0, jt = 1, Xt = 2, Qt = 3;
class Wt {
  /**
   * @param {Object} options
   * @param {Element} options.xml - The XML element to parse.
   */
  constructor(u) {
    /** @type {Vector3 | null} */
    j(this, "dimension");
    var i;
    this.type = jt;
    var r = (i = u.xml.getAttribute("size")) == null ? void 0 : i.split(" ");
    r ? this.dimension = new Ne({
      x: parseFloat(r[0]),
      y: parseFloat(r[1]),
      z: parseFloat(r[2])
    }) : this.dimension = null;
  }
}
class Jt {
  /**
   * @param {Object} options
   * @param {Element} options.xml - The XML element to parse.
   */
  constructor(u) {
    var i;
    var r = (i = u.xml.getAttribute("rgba")) == null ? void 0 : i.split(" ");
    r && (this.r = parseFloat(r[0]), this.g = parseFloat(r[1]), this.b = parseFloat(r[2]), this.a = parseFloat(r[3]));
  }
}
class Zt {
  /**
   * @param {Object} options
   * @param {Element} options.xml - The XML element to parse.
   */
  constructor(u) {
    this.type = Xt, this.length = parseFloat(u.xml.getAttribute("length")), this.radius = parseFloat(u.xml.getAttribute("radius"));
  }
}
class Tt {
  /**
   * @param {Object} options
   * @param {Element} options.xml - The XML element to parse.
   */
  constructor(u) {
    /** @type {string | null} */
    j(this, "textureFilename", null);
    /** @type {UrdfColor | null} */
    j(this, "color", null);
    this.name = u.xml.getAttribute("name");
    var r = u.xml.getElementsByTagName("texture");
    r.length > 0 && (this.textureFilename = r[0].getAttribute("filename"));
    var i = u.xml.getElementsByTagName("color");
    i.length > 0 && (this.color = new Jt({
      xml: i[0]
    }));
  }
  isLink() {
    return this.color === null && this.textureFilename === null;
  }
  assign(u) {
    return Object.assign(this, u);
  }
}
class $t {
  /**
   * @param {Object} options
   * @param {Element} options.xml - The XML element to parse.
   */
  constructor(u) {
    /** @type {Vector3 | null} */
    j(this, "scale", null);
    this.type = Qt, this.filename = u.xml.getAttribute("filename");
    var r = u.xml.getAttribute("scale");
    if (r) {
      var i = r.split(" ");
      this.scale = new Ne({
        x: parseFloat(i[0]),
        y: parseFloat(i[1]),
        z: parseFloat(i[2])
      });
    }
  }
}
class Kt {
  /**
   * @param {Object} options
   * @param {Element} options.xml - The XML element to parse.
   */
  constructor(u) {
    this.type = Yt, this.radius = parseFloat(u.xml.getAttribute("radius") || "NaN");
  }
}
class er {
  /**
   * @param {Object} options
   * @param {Element} options.xml - The XML element to parse.
   */
  constructor(u) {
    /** @type {Pose | null} */
    j(this, "origin", null);
    /** @type {UrdfMesh | UrdfSphere | UrdfBox | UrdfCylinder | null} */
    j(this, "geometry", null);
    /** @type {UrdfMaterial | null} */
    j(this, "material", null);
    var r = u.xml;
    this.name = u.xml.getAttribute("name");
    var i = r.getElementsByTagName("origin");
    if (i.length === 0)
      this.origin = new Xe();
    else {
      var a = i[0].getAttribute("xyz"), s = new Ne();
      if (a) {
        var c = a.split(" ");
        s = new Ne({
          x: parseFloat(c[0]),
          y: parseFloat(c[1]),
          z: parseFloat(c[2])
        });
      }
      var f = i[0].getAttribute("rpy"), g = new Fe();
      if (f) {
        var N = f.split(" "), T = parseFloat(N[0]), m = parseFloat(N[1]), M = parseFloat(N[2]), E = T / 2, I = m / 2, O = M / 2, J = Math.sin(E) * Math.cos(I) * Math.cos(O) - Math.cos(E) * Math.sin(I) * Math.sin(O), w = Math.cos(E) * Math.sin(I) * Math.cos(O) + Math.sin(E) * Math.cos(I) * Math.sin(O), G = Math.cos(E) * Math.cos(I) * Math.sin(O) - Math.sin(E) * Math.sin(I) * Math.cos(O), V = Math.cos(E) * Math.cos(I) * Math.cos(O) + Math.sin(E) * Math.sin(I) * Math.sin(O);
        g = new Fe({
          x: J,
          y: w,
          z: G,
          w: V
        }), g.normalize();
      }
      this.origin = new Xe({
        position: s,
        orientation: g
      });
    }
    var K = r.getElementsByTagName("geometry");
    if (K.length > 0) {
      for (var ee = K[0], p = null, S = 0; S < ee.childNodes.length; S++) {
        var L = ee.childNodes[S];
        if (L.nodeType === 1) {
          p = L;
          break;
        }
      }
      if (p) {
        var H = p.nodeName;
        H === "sphere" ? this.geometry = new Kt({
          xml: p
        }) : H === "box" ? this.geometry = new Wt({
          xml: p
        }) : H === "cylinder" ? this.geometry = new Zt({
          xml: p
        }) : H === "mesh" ? this.geometry = new $t({
          xml: p
        }) : console.warn("Unknown geometry type " + H);
      }
    }
    var W = r.getElementsByTagName("material");
    W.length > 0 && (this.material = new Tt({
      xml: W[0]
    }));
  }
}
class tr {
  /**
   * @param {Object} options
   * @param {Element} options.xml - The XML element to parse.
   */
  constructor(u) {
    this.name = u.xml.getAttribute("name"), this.visuals = [];
    for (var r = u.xml.getElementsByTagName("visual"), i = 0; i < r.length; i++)
      this.visuals.push(
        new er({
          xml: r[i]
        })
      );
  }
}
class br {
  /**
   * @param {Object} options
   * @param {Element} options.xml - The XML element to parse.
   */
  constructor(u) {
    this.name = u.xml.getAttribute("name"), this.type = u.xml.getAttribute("type");
    var r = u.xml.getElementsByTagName("parent");
    r.length > 0 && (this.parent = r[0].getAttribute("link"));
    var i = u.xml.getElementsByTagName("child");
    i.length > 0 && (this.child = i[0].getAttribute("link"));
    var a = u.xml.getElementsByTagName("limit");
    a.length > 0 && (this.minval = parseFloat(a[0].getAttribute("lower") || "NaN"), this.maxval = parseFloat(a[0].getAttribute("upper") || "NaN"));
    var s = u.xml.getElementsByTagName("origin");
    if (s.length === 0)
      this.origin = new Xe();
    else {
      var c = s[0].getAttribute("xyz"), f = new Ne();
      if (c) {
        var g = c.split(" ");
        f = new Ne({
          x: parseFloat(g[0]),
          y: parseFloat(g[1]),
          z: parseFloat(g[2])
        });
      }
      var N = s[0].getAttribute("rpy"), T = new Fe();
      if (N) {
        var m = N.split(" "), M = parseFloat(m[0]), E = parseFloat(m[1]), I = parseFloat(m[2]), O = M / 2, J = E / 2, w = I / 2, G = Math.sin(O) * Math.cos(J) * Math.cos(w) - Math.cos(O) * Math.sin(J) * Math.sin(w), V = Math.cos(O) * Math.sin(J) * Math.cos(w) + Math.sin(O) * Math.cos(J) * Math.sin(w), K = Math.cos(O) * Math.cos(J) * Math.sin(w) - Math.sin(O) * Math.sin(J) * Math.cos(w), ee = Math.cos(O) * Math.cos(J) * Math.cos(w) + Math.sin(O) * Math.sin(J) * Math.sin(w);
        T = new Fe({
          x: G,
          y: V,
          z: K,
          w: ee
        }), T.normalize();
      }
      this.origin = new Xe({
        position: f,
        orientation: T
      });
    }
  }
}
var $ = {}, le = {}, xt;
function ut() {
  if (xt) return le;
  xt = 1;
  function h(w, G, V) {
    if (V === void 0 && (V = Array.prototype), w && typeof V.find == "function")
      return V.find.call(w, G);
    for (var K = 0; K < w.length; K++)
      if (r(w, K)) {
        var ee = w[K];
        if (G.call(void 0, ee, K, w))
          return ee;
      }
  }
  function u(w, G) {
    return G === void 0 && (G = Object), G && typeof G.getOwnPropertyDescriptors == "function" && (w = G.create(null, G.getOwnPropertyDescriptors(w))), G && typeof G.freeze == "function" ? G.freeze(w) : w;
  }
  function r(w, G) {
    return Object.prototype.hasOwnProperty.call(w, G);
  }
  function i(w, G) {
    if (w === null || typeof w != "object")
      throw new TypeError("target is not an object");
    for (var V in G)
      r(G, V) && (w[V] = G[V]);
    return w;
  }
  var a = u({
    allowfullscreen: !0,
    async: !0,
    autofocus: !0,
    autoplay: !0,
    checked: !0,
    controls: !0,
    default: !0,
    defer: !0,
    disabled: !0,
    formnovalidate: !0,
    hidden: !0,
    ismap: !0,
    itemscope: !0,
    loop: !0,
    multiple: !0,
    muted: !0,
    nomodule: !0,
    novalidate: !0,
    open: !0,
    playsinline: !0,
    readonly: !0,
    required: !0,
    reversed: !0,
    selected: !0
  });
  function s(w) {
    return r(a, w.toLowerCase());
  }
  var c = u({
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
  });
  function f(w) {
    return r(c, w.toLowerCase());
  }
  var g = u({
    script: !1,
    style: !1,
    textarea: !0,
    title: !0
  });
  function N(w) {
    var G = w.toLowerCase();
    return r(g, G) && !g[G];
  }
  function T(w) {
    var G = w.toLowerCase();
    return r(g, G) && g[G];
  }
  function m(w) {
    return w === E.HTML;
  }
  function M(w) {
    return m(w) || w === E.XML_XHTML_APPLICATION;
  }
  var E = u({
    /**
     * `text/html`, the only mime type that triggers treating an XML document as HTML.
     *
     * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
     * @see https://en.wikipedia.org/wiki/HTML Wikipedia
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
     * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring
     *      WHATWG HTML Spec
     */
    HTML: "text/html",
    /**
     * `application/xml`, the standard mime type for XML documents.
     *
     * @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType
     *      registration
     * @see https://tools.ietf.org/html/rfc7303#section-9.1 RFC 7303
     * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
     */
    XML_APPLICATION: "application/xml",
    /**
     * `text/html`, an alias for `application/xml`.
     *
     * @see https://tools.ietf.org/html/rfc7303#section-9.2 RFC 7303
     * @see https://www.iana.org/assignments/media-types/text/xml IANA MimeType registration
     * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
     */
    XML_TEXT: "text/xml",
    /**
     * `application/xhtml+xml`, indicates an XML document that has the default HTML namespace,
     * but is parsed as an XML document.
     *
     * @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType
     *      registration
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument WHATWG DOM Spec
     * @see https://en.wikipedia.org/wiki/XHTML Wikipedia
     */
    XML_XHTML_APPLICATION: "application/xhtml+xml",
    /**
     * `image/svg+xml`,
     *
     * @see https://www.iana.org/assignments/media-types/image/svg+xml IANA MimeType registration
     * @see https://www.w3.org/TR/SVG11/ W3C SVG 1.1
     * @see https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Wikipedia
     */
    XML_SVG_IMAGE: "image/svg+xml"
  }), I = Object.keys(E).map(function(w) {
    return E[w];
  });
  function O(w) {
    return I.indexOf(w) > -1;
  }
  var J = u({
    /**
     * The XHTML namespace.
     *
     * @see http://www.w3.org/1999/xhtml
     */
    HTML: "http://www.w3.org/1999/xhtml",
    /**
     * The SVG namespace.
     *
     * @see http://www.w3.org/2000/svg
     */
    SVG: "http://www.w3.org/2000/svg",
    /**
     * The `xml:` namespace.
     *
     * @see http://www.w3.org/XML/1998/namespace
     */
    XML: "http://www.w3.org/XML/1998/namespace",
    /**
     * The `xmlns:` namespace.
     *
     * @see https://www.w3.org/2000/xmlns/
     */
    XMLNS: "http://www.w3.org/2000/xmlns/"
  });
  return le.assign = i, le.find = h, le.freeze = u, le.HTML_BOOLEAN_ATTRIBUTES = a, le.HTML_RAW_TEXT_ELEMENTS = g, le.HTML_VOID_ELEMENTS = c, le.hasDefaultHTMLNamespace = M, le.hasOwn = r, le.isHTMLBooleanAttribute = s, le.isHTMLRawTextElement = N, le.isHTMLEscapableRawTextElement = T, le.isHTMLMimeType = m, le.isHTMLVoidElement = f, le.isValidMimeType = O, le.MIME_TYPE = E, le.NAMESPACE = J, le;
}
var rt = {}, Ot;
function pt() {
  if (Ot) return rt;
  Ot = 1;
  var h = ut();
  function u(E, I) {
    E.prototype = Object.create(Error.prototype, {
      constructor: { value: E },
      name: { value: E.name, enumerable: !0, writable: I }
    });
  }
  var r = h.freeze({
    /**
     * the default value as defined by the spec
     */
    Error: "Error",
    /**
     * @deprecated
     * Use RangeError instead.
     */
    IndexSizeError: "IndexSizeError",
    /**
     * @deprecated
     * Just to match the related static code, not part of the spec.
     */
    DomstringSizeError: "DomstringSizeError",
    HierarchyRequestError: "HierarchyRequestError",
    WrongDocumentError: "WrongDocumentError",
    InvalidCharacterError: "InvalidCharacterError",
    /**
     * @deprecated
     * Just to match the related static code, not part of the spec.
     */
    NoDataAllowedError: "NoDataAllowedError",
    NoModificationAllowedError: "NoModificationAllowedError",
    NotFoundError: "NotFoundError",
    NotSupportedError: "NotSupportedError",
    InUseAttributeError: "InUseAttributeError",
    InvalidStateError: "InvalidStateError",
    SyntaxError: "SyntaxError",
    InvalidModificationError: "InvalidModificationError",
    NamespaceError: "NamespaceError",
    /**
     * @deprecated
     * Use TypeError for invalid arguments,
     * "NotSupportedError" DOMException for unsupported operations,
     * and "NotAllowedError" DOMException for denied requests instead.
     */
    InvalidAccessError: "InvalidAccessError",
    /**
     * @deprecated
     * Just to match the related static code, not part of the spec.
     */
    ValidationError: "ValidationError",
    /**
     * @deprecated
     * Use TypeError instead.
     */
    TypeMismatchError: "TypeMismatchError",
    SecurityError: "SecurityError",
    NetworkError: "NetworkError",
    AbortError: "AbortError",
    /**
     * @deprecated
     * Just to match the related static code, not part of the spec.
     */
    URLMismatchError: "URLMismatchError",
    QuotaExceededError: "QuotaExceededError",
    TimeoutError: "TimeoutError",
    InvalidNodeTypeError: "InvalidNodeTypeError",
    DataCloneError: "DataCloneError",
    EncodingError: "EncodingError",
    NotReadableError: "NotReadableError",
    UnknownError: "UnknownError",
    ConstraintError: "ConstraintError",
    DataError: "DataError",
    TransactionInactiveError: "TransactionInactiveError",
    ReadOnlyError: "ReadOnlyError",
    VersionError: "VersionError",
    OperationError: "OperationError",
    NotAllowedError: "NotAllowedError",
    OptOutError: "OptOutError"
  }), i = Object.keys(r);
  function a(E) {
    return typeof E == "number" && E >= 1 && E <= 25;
  }
  function s(E) {
    return typeof E == "string" && E.substring(E.length - r.Error.length) === r.Error;
  }
  function c(E, I) {
    a(E) ? (this.name = i[E], this.message = I || "") : (this.message = E, this.name = s(I) ? I : r.Error), Error.captureStackTrace && Error.captureStackTrace(this, c);
  }
  u(c, !0), Object.defineProperties(c.prototype, {
    code: {
      enumerable: !0,
      get: function() {
        var E = i.indexOf(this.name);
        return a(E) ? E : 0;
      }
    }
  });
  for (var f = {
    INDEX_SIZE_ERR: 1,
    DOMSTRING_SIZE_ERR: 2,
    HIERARCHY_REQUEST_ERR: 3,
    WRONG_DOCUMENT_ERR: 4,
    INVALID_CHARACTER_ERR: 5,
    NO_DATA_ALLOWED_ERR: 6,
    NO_MODIFICATION_ALLOWED_ERR: 7,
    NOT_FOUND_ERR: 8,
    NOT_SUPPORTED_ERR: 9,
    INUSE_ATTRIBUTE_ERR: 10,
    INVALID_STATE_ERR: 11,
    SYNTAX_ERR: 12,
    INVALID_MODIFICATION_ERR: 13,
    NAMESPACE_ERR: 14,
    INVALID_ACCESS_ERR: 15,
    VALIDATION_ERR: 16,
    TYPE_MISMATCH_ERR: 17,
    SECURITY_ERR: 18,
    NETWORK_ERR: 19,
    ABORT_ERR: 20,
    URL_MISMATCH_ERR: 21,
    QUOTA_EXCEEDED_ERR: 22,
    TIMEOUT_ERR: 23,
    INVALID_NODE_TYPE_ERR: 24,
    DATA_CLONE_ERR: 25
  }, g = Object.entries(f), N = 0; N < g.length; N++) {
    var T = g[N][0], m = g[N][1];
    c[T] = m;
  }
  function M(E, I, O) {
    this.message = E, this.locator = I, this.cause = O, Error.captureStackTrace && Error.captureStackTrace(this, M);
  }
  return u(M), rt.DOMException = c, rt.DOMExceptionName = r, rt.ParseError = M, rt.ExceptionCode = f, rt;
}
var se = {}, X = {}, Mt;
function rr() {
  if (Mt) return X;
  Mt = 1;
  function h(ie) {
    try {
      typeof ie != "function" && (ie = RegExp);
      var he = new ie("𝌆", "u").exec("𝌆");
      return !!he && he[0].length === 2;
    } catch {
    }
    return !1;
  }
  var u = h();
  function r(ie) {
    if (ie.source[0] !== "[")
      throw new Error(ie + " can not be used with chars");
    return ie.source.slice(1, ie.source.lastIndexOf("]"));
  }
  function i(ie, he) {
    if (ie.source[0] !== "[")
      throw new Error("/" + ie.source + "/ can not be used with chars_without");
    if (!he || typeof he != "string")
      throw new Error(JSON.stringify(he) + " is not a valid search");
    if (ie.source.indexOf(he) === -1)
      throw new Error('"' + he + '" is not is /' + ie.source + "/");
    if (he === "-" && ie.source.indexOf(he) !== 1)
      throw new Error('"' + he + '" is not at the first postion of /' + ie.source + "/");
    return new RegExp(ie.source.replace(he, ""), u ? "u" : "");
  }
  function a(ie) {
    var he = this;
    return new RegExp(
      Array.prototype.slice.call(arguments).map(function(Pe) {
        var at = typeof Pe == "string";
        if (at && he === void 0 && Pe === "|")
          throw new Error("use regg instead of reg to wrap expressions with `|`!");
        return at ? Pe : Pe.source;
      }).join(""),
      u ? "mu" : "m"
    );
  }
  function s(ie) {
    if (arguments.length === 0)
      throw new Error("no parameters provided");
    return a.apply(s, ["(?:"].concat(Array.prototype.slice.call(arguments), [")"]));
  }
  var c = "�", f = /[-\x09\x0A\x0D\x20-\x2C\x2E-\uD7FF\uE000-\uFFFD]/;
  u && (f = a("[", r(f), "\\u{10000}-\\u{10FFFF}", "]"));
  var g = /[\x20\x09\x0D\x0A]/, N = r(g), T = a(g, "+"), m = a(g, "*"), M = /[:_a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
  u && (M = a("[", r(M), "\\u{10000}-\\u{10FFFF}", "]"));
  var E = r(M), I = a("[", E, r(/[-.0-9\xB7]/), r(/[\u0300-\u036F\u203F-\u2040]/), "]"), O = a(M, I, "*"), J = a(I, "+"), w = a("&", O, ";"), G = s(/&#[0-9]+;|&#x[0-9a-fA-F]+;/), V = s(w, "|", G), K = a("%", O, ";"), ee = s(
    a('"', s(/[^%&"]/, "|", K, "|", V), "*", '"'),
    "|",
    a("'", s(/[^%&']/, "|", K, "|", V), "*", "'")
  ), p = s('"', s(/[^<&"]/, "|", V), "*", '"', "|", "'", s(/[^<&']/, "|", V), "*", "'"), S = i(M, ":"), L = i(I, ":"), H = a(S, L, "*"), W = a(H, s(":", H), "?"), C = a("^", W, "$"), P = a("(", W, ")"), _ = s(/"[^"]*"|'[^']*'/), R = a(/^<\?/, "(", O, ")", s(T, "(", f, "*?)"), "?", /\?>/), l = /[\x20\x0D\x0Aa-zA-Z0-9-'()+,./:=?;!*#@$_%]/, d = s('"', l, '*"', "|", "'", i(l, "'"), "*'"), A = "<!--", y = "-->", q = a(A, s(i(f, "-"), "|", a("-", i(f, "-"))), "*", y), v = "#PCDATA", z = s(
    a(/\(/, m, v, s(m, /\|/, m, W), "*", m, /\)\*/),
    "|",
    a(/\(/, m, v, m, /\)/)
  ), Q = /[?*+]?/, F = a(
    /\([^>]+\)/,
    Q
    /*regg(choice, '|', seq), _children_quantity*/
  ), b = s("EMPTY", "|", "ANY", "|", z, "|", F), B = "<!ELEMENT", k = a(B, T, s(W, "|", K), T, s(b, "|", K), m, ">"), re = a("NOTATION", T, /\(/, m, O, s(m, /\|/, m, O), "*", m, /\)/), ne = a(/\(/, m, J, s(m, /\|/, m, J), "*", m, /\)/), Te = s(re, "|", ne), Ee = s(/CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS/, "|", Te), oe = s(/#REQUIRED|#IMPLIED/, "|", s(s("#FIXED", T), "?", p)), U = s(T, O, T, Ee, T, oe), Be = "<!ATTLIST", _e = a(Be, T, O, U, "*", m, ">"), me = "SYSTEM", Ce = "PUBLIC", be = s(s(me, T, _), "|", s(Ce, T, d, T, _)), Oe = a(
    "^",
    s(
      s(me, T, "(?<SystemLiteralOnly>", _, ")"),
      "|",
      s(Ce, T, "(?<PubidLiteral>", d, ")", T, "(?<SystemLiteral>", _, ")")
    )
  ), Qe = s(T, "NDATA", T, O), qe = s(ee, "|", s(be, Qe, "?")), Ie = "<!ENTITY", De = a(Ie, T, O, T, qe, m, ">"), te = s(ee, "|", be), Le = a(Ie, T, "%", T, O, T, te, m, ">"), ce = s(De, "|", Le), ke = a(Ce, T, d), it = a("<!NOTATION", T, O, T, s(be, "|", ke), m, ">"), Me = a(m, "=", m), Ue = /1[.]\d+/, Y = a(T, "version", Me, s("'", Ue, "'", "|", '"', Ue, '"')), ue = /[A-Za-z][-A-Za-z0-9._]*/, ve = s(T, "encoding", Me, s('"', ue, '"', "|", "'", ue, "'")), Ae = s(T, "standalone", Me, s("'", s("yes", "|", "no"), "'", "|", '"', s("yes", "|", "no"), '"')), We = a(/^<\?xml/, Y, ve, "?", Ae, "?", m, /\?>/), Je = "<!DOCTYPE", Ze = "<![CDATA[", $e = "]]>", nt = /<!\[CDATA\[/, st = /\]\]>/, Ke = a(f, "*?", st), Ge = a(nt, Ke);
  return X.chars = r, X.chars_without = i, X.detectUnicodeSupport = h, X.reg = a, X.regg = s, X.AttlistDecl = _e, X.CDATA_START = Ze, X.CDATA_END = $e, X.CDSect = Ge, X.Char = f, X.Comment = q, X.COMMENT_START = A, X.COMMENT_END = y, X.DOCTYPE_DECL_START = Je, X.elementdecl = k, X.EntityDecl = ce, X.EntityValue = ee, X.ExternalID = be, X.ExternalID_match = Oe, X.Name = O, X.NotationDecl = it, X.Reference = V, X.PEReference = K, X.PI = R, X.PUBLIC = Ce, X.PubidLiteral = d, X.QName = W, X.QName_exact = C, X.QName_group = P, X.S = T, X.SChar_s = N, X.S_OPT = m, X.SYSTEM = me, X.SystemLiteral = _, X.UNICODE_REPLACEMENT_CHARACTER = c, X.UNICODE_SUPPORT = u, X.XMLDecl = We, X;
}
var Rt;
function ur() {
  if (Rt) return se;
  Rt = 1;
  var h = ut(), u = h.find, r = h.hasDefaultHTMLNamespace, i = h.hasOwn, a = h.isHTMLMimeType, s = h.isHTMLRawTextElement, c = h.isHTMLVoidElement, f = h.MIME_TYPE, g = h.NAMESPACE, N = Symbol(), T = pt(), m = T.DOMException, M = rr();
  function E(e) {
    if (e !== N)
      throw new TypeError("Illegal constructor");
  }
  function I(e) {
    return e !== "";
  }
  function O(e) {
    return e ? e.split(/[\t\n\f\r ]+/).filter(I) : [];
  }
  function J(e, t) {
    return i(e, t) || (e[t] = !0), e;
  }
  function w(e) {
    if (!e) return [];
    var t = O(e);
    return Object.keys(t.reduce(J, {}));
  }
  function G(e) {
    return function(t) {
      return e && e.indexOf(t) !== -1;
    };
  }
  function V(e) {
    if (!M.QName_exact.test(e))
      throw new m(m.INVALID_CHARACTER_ERR, 'invalid character in qualified name "' + e + '"');
  }
  function K(e, t) {
    V(t), e = e || null;
    var n = null, o = t;
    if (t.indexOf(":") >= 0) {
      var D = t.split(":");
      n = D[0], o = D[1];
    }
    if (n !== null && e === null)
      throw new m(m.NAMESPACE_ERR, "prefix is non-null and namespace is null");
    if (n === "xml" && e !== h.NAMESPACE.XML)
      throw new m(m.NAMESPACE_ERR, 'prefix is "xml" and namespace is not the XML namespace');
    if ((n === "xmlns" || t === "xmlns") && e !== h.NAMESPACE.XMLNS)
      throw new m(
        m.NAMESPACE_ERR,
        'either qualifiedName or prefix is "xmlns" and namespace is not the XMLNS namespace'
      );
    if (e === h.NAMESPACE.XMLNS && n !== "xmlns" && t !== "xmlns")
      throw new m(
        m.NAMESPACE_ERR,
        'namespace is the XMLNS namespace and neither qualifiedName nor prefix is "xmlns"'
      );
    return [e, n, o];
  }
  function ee(e, t) {
    for (var n in e)
      i(e, n) && (t[n] = e[n]);
  }
  function p(e, t) {
    var n = e.prototype;
    if (!(n instanceof t)) {
      let o = function() {
      };
      o.prototype = t.prototype, o = new o(), ee(n, o), e.prototype = n = o;
    }
    n.constructor != e && (typeof e != "function" && console.error("unknown Class:" + e), n.constructor = e);
  }
  var S = {}, L = S.ELEMENT_NODE = 1, H = S.ATTRIBUTE_NODE = 2, W = S.TEXT_NODE = 3, C = S.CDATA_SECTION_NODE = 4, P = S.ENTITY_REFERENCE_NODE = 5, _ = S.ENTITY_NODE = 6, R = S.PROCESSING_INSTRUCTION_NODE = 7, l = S.COMMENT_NODE = 8, d = S.DOCUMENT_NODE = 9, A = S.DOCUMENT_TYPE_NODE = 10, y = S.DOCUMENT_FRAGMENT_NODE = 11, q = S.NOTATION_NODE = 12, v = h.freeze({
    DOCUMENT_POSITION_DISCONNECTED: 1,
    DOCUMENT_POSITION_PRECEDING: 2,
    DOCUMENT_POSITION_FOLLOWING: 4,
    DOCUMENT_POSITION_CONTAINS: 8,
    DOCUMENT_POSITION_CONTAINED_BY: 16,
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32
  });
  function z(e) {
    for (var t = []; e.parentNode || e.ownerElement; )
      e = e.parentNode || e.ownerElement, t.unshift(e);
    return t;
  }
  function Q(e, t) {
    if (t.length < e.length) return Q(t, e);
    var n = null;
    for (var o in e) {
      if (e[o] !== t[o]) return n;
      n = e[o];
    }
    return n;
  }
  function F(e) {
    return e.guid || (e.guid = Math.random()), e.guid;
  }
  function b() {
  }
  b.prototype = {
    /**
     * The number of nodes in the list. The range of valid child node indices is 0 to length-1
     * inclusive.
     *
     * @type {number}
     */
    length: 0,
    /**
     * Returns the item at `index`. If index is greater than or equal to the number of nodes in
     * the list, this returns null.
     *
     * @param index
     * Unsigned long Index into the collection.
     * @returns {Node | null}
     * The node at position `index` in the NodeList,
     * or null if that is not a valid index.
     */
    item: function(e) {
      return e >= 0 && e < this.length ? this[e] : null;
    },
    /**
     * Returns a string representation of the NodeList.
     *
     * @param {unknown} nodeFilter
     * __A filter function? Not implemented according to the spec?__.
     * @returns {string}
     * A string representation of the NodeList.
     */
    toString: function(e) {
      for (var t = [], n = 0; n < this.length; n++)
        et(this[n], t, e);
      return t.join("");
    },
    /**
     * Filters the NodeList based on a predicate.
     *
     * @param {function(Node): boolean} predicate
     * - A predicate function to filter the NodeList.
     * @returns {Node[]}
     * An array of nodes that satisfy the predicate.
     * @private
     */
    filter: function(e) {
      return Array.prototype.filter.call(this, e);
    },
    /**
     * Returns the first index at which a given node can be found in the NodeList, or -1 if it is
     * not present.
     *
     * @param {Node} item
     * - The Node item to locate in the NodeList.
     * @returns {number}
     * The first index of the node in the NodeList; -1 if not found.
     * @private
     */
    indexOf: function(e) {
      return Array.prototype.indexOf.call(this, e);
    }
  }, b.prototype[Symbol.iterator] = function() {
    var e = this, t = 0;
    return {
      next: function() {
        return t < e.length ? {
          value: e[t++],
          done: !1
        } : {
          done: !0
        };
      },
      return: function() {
        return {
          done: !0
        };
      }
    };
  };
  function B(e, t) {
    this._node = e, this._refresh = t, k(this);
  }
  function k(e) {
    var t = e._node._inc || e._node.ownerDocument._inc;
    if (e._inc !== t) {
      var n = e._refresh(e._node);
      if (bt(e, "length", n.length), !e.$$length || n.length < e.$$length)
        for (var o = n.length; o in e; o++)
          i(e, o) && delete e[o];
      ee(n, e), e._inc = t;
    }
  }
  B.prototype.item = function(e) {
    return k(this), this[e] || null;
  }, p(B, b);
  function re() {
  }
  function ne(e, t) {
    for (var n = 0; n < e.length; ) {
      if (e[n] === t)
        return n;
      n++;
    }
  }
  function Te(e, t, n, o) {
    if (o ? t[ne(t, o)] = n : (t[t.length] = n, t.length++), e) {
      n.ownerElement = e;
      var D = e.ownerDocument;
      D && (o && be(D, e, o), Ce(D, e, n));
    }
  }
  function Ee(e, t, n) {
    var o = ne(t, n);
    if (o >= 0) {
      for (var D = t.length - 1; o <= D; )
        t[o] = t[++o];
      if (t.length = D, e) {
        var x = e.ownerDocument;
        x && be(x, e, n), n.ownerElement = null;
      }
    }
  }
  re.prototype = {
    length: 0,
    item: b.prototype.item,
    /**
     * Get an attribute by name. Note: Name is in lower case in case of HTML namespace and
     * document.
     *
     * @param {string} localName
     * The local name of the attribute.
     * @returns {Attr | null}
     * The attribute with the given local name, or null if no such attribute exists.
     * @see https://dom.spec.whatwg.org/#concept-element-attributes-get-by-name
     */
    getNamedItem: function(e) {
      this._ownerElement && this._ownerElement._isInHTMLDocumentAndNamespace() && (e = e.toLowerCase());
      for (var t = 0; t < this.length; ) {
        var n = this[t];
        if (n.nodeName === e)
          return n;
        t++;
      }
      return null;
    },
    /**
     * Set an attribute.
     *
     * @param {Attr} attr
     * The attribute to set.
     * @returns {Attr | null}
     * The old attribute with the same local name and namespace URI as the new one, or null if no
     * such attribute exists.
     * @throws {DOMException}
     * With code:
     * - {@link INUSE_ATTRIBUTE_ERR} - If the attribute is already an attribute of another
     * element.
     * @see https://dom.spec.whatwg.org/#concept-element-attributes-set
     */
    setNamedItem: function(e) {
      var t = e.ownerElement;
      if (t && t !== this._ownerElement)
        throw new m(m.INUSE_ATTRIBUTE_ERR);
      var n = this.getNamedItemNS(e.namespaceURI, e.localName);
      return n === e ? e : (Te(this._ownerElement, this, e, n), n);
    },
    /**
     * Set an attribute, replacing an existing attribute with the same local name and namespace
     * URI if one exists.
     *
     * @param {Attr} attr
     * The attribute to set.
     * @returns {Attr | null}
     * The old attribute with the same local name and namespace URI as the new one, or null if no
     * such attribute exists.
     * @throws {DOMException}
     * Throws a DOMException with the name "InUseAttributeError" if the attribute is already an
     * attribute of another element.
     * @see https://dom.spec.whatwg.org/#concept-element-attributes-set
     */
    setNamedItemNS: function(e) {
      return this.setNamedItem(e);
    },
    /**
     * Removes an attribute specified by the local name.
     *
     * @param {string} localName
     * The local name of the attribute to be removed.
     * @returns {Attr}
     * The attribute node that was removed.
     * @throws {DOMException}
     * With code:
     * - {@link DOMException.NOT_FOUND_ERR} if no attribute with the given name is found.
     * @see https://dom.spec.whatwg.org/#dom-namednodemap-removenameditem
     * @see https://dom.spec.whatwg.org/#concept-element-attributes-remove-by-name
     */
    removeNamedItem: function(e) {
      var t = this.getNamedItem(e);
      if (!t)
        throw new m(m.NOT_FOUND_ERR, e);
      return Ee(this._ownerElement, this, t), t;
    },
    /**
     * Removes an attribute specified by the namespace and local name.
     *
     * @param {string | null} namespaceURI
     * The namespace URI of the attribute to be removed.
     * @param {string} localName
     * The local name of the attribute to be removed.
     * @returns {Attr}
     * The attribute node that was removed.
     * @throws {DOMException}
     * With code:
     * - {@link DOMException.NOT_FOUND_ERR} if no attribute with the given namespace URI and local
     * name is found.
     * @see https://dom.spec.whatwg.org/#dom-namednodemap-removenameditemns
     * @see https://dom.spec.whatwg.org/#concept-element-attributes-remove-by-namespace
     */
    removeNamedItemNS: function(e, t) {
      var n = this.getNamedItemNS(e, t);
      if (!n)
        throw new m(m.NOT_FOUND_ERR, e ? e + " : " + t : t);
      return Ee(this._ownerElement, this, n), n;
    },
    /**
     * Get an attribute by namespace and local name.
     *
     * @param {string | null} namespaceURI
     * The namespace URI of the attribute.
     * @param {string} localName
     * The local name of the attribute.
     * @returns {Attr | null}
     * The attribute with the given namespace URI and local name, or null if no such attribute
     * exists.
     * @see https://dom.spec.whatwg.org/#concept-element-attributes-get-by-namespace
     */
    getNamedItemNS: function(e, t) {
      e || (e = null);
      for (var n = 0; n < this.length; ) {
        var o = this[n];
        if (o.localName === t && o.namespaceURI === e)
          return o;
        n++;
      }
      return null;
    }
  }, re.prototype[Symbol.iterator] = function() {
    var e = this, t = 0;
    return {
      next: function() {
        return t < e.length ? {
          value: e[t++],
          done: !1
        } : {
          done: !0
        };
      },
      return: function() {
        return {
          done: !0
        };
      }
    };
  };
  function oe() {
  }
  oe.prototype = {
    /**
     * Test if the DOM implementation implements a specific feature and version, as specified in
     * {@link https://www.w3.org/TR/DOM-Level-3-Core/core.html#DOMFeatures DOM Features}.
     *
     * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given
     * feature is supported. The different implementations fairly diverged in what kind of
     * features were reported. The latest version of the spec settled to force this method to
     * always return true, where the functionality was accurate and in use.
     *
     * @deprecated
     * It is deprecated and modern browsers return true in all cases.
     * @function DOMImplementation#hasFeature
     * @param {string} feature
     * The name of the feature to test.
     * @param {string} [version]
     * This is the version number of the feature to test.
     * @returns {boolean}
     * Always returns true.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
     * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
     * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-5CED94D7 DOM Level 3 Core
     */
    hasFeature: function(e, t) {
      return !0;
    },
    /**
     * Creates a DOM Document object of the specified type with its document element. Note that
     * based on the {@link DocumentType}
     * given to create the document, the implementation may instantiate specialized
     * {@link Document} objects that support additional features than the "Core", such as "HTML"
     * {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#DOM2HTML DOM Level 2 HTML}.
     * On the other hand, setting the {@link DocumentType} after the document was created makes
     * this very unlikely to happen. Alternatively, specialized {@link Document} creation methods,
     * such as createHTMLDocument
     * {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#DOM2HTML DOM Level 2 HTML},
     * can be used to obtain specific types of {@link Document} objects.
     *
     * __It behaves slightly different from the description in the living standard__:
     * - There is no interface/class `XMLDocument`, it returns a `Document`
     * instance (with it's `type` set to `'xml'`).
     * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
     *
     * @function DOMImplementation.createDocument
     * @param {string | null} namespaceURI
     * The
     * {@link https://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-namespaceURI namespace URI}
     * of the document element to create or null.
     * @param {string | null} qualifiedName
     * The
     * {@link https://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-qualifiedname qualified name}
     * of the document element to be created or null.
     * @param {DocumentType | null} [doctype=null]
     * The type of document to be created or null. When doctype is not null, its
     * {@link Node#ownerDocument} attribute is set to the document being created. Default is
     * `null`
     * @returns {Document}
     * A new {@link Document} object with its document element. If the NamespaceURI,
     * qualifiedName, and doctype are null, the returned {@link Document} is empty with no
     * document element.
     * @throws {DOMException}
     * With code:
     *
     * - `INVALID_CHARACTER_ERR`: Raised if the specified qualified name is not an XML name
     * according to {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#XML XML 1.0}.
     * - `NAMESPACE_ERR`: Raised if the qualifiedName is malformed, if the qualifiedName has a
     * prefix and the namespaceURI is null, or if the qualifiedName is null and the namespaceURI
     * is different from null, or if the qualifiedName has a prefix that is "xml" and the
     * namespaceURI is different from "{@link http://www.w3.org/XML/1998/namespace}"
     * {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#Namespaces XML Namespaces},
     * or if the DOM implementation does not support the "XML" feature but a non-null namespace
     * URI was provided, since namespaces were defined by XML.
     * - `WRONG_DOCUMENT_ERR`: Raised if doctype has already been used with a different document
     * or was created from a different implementation.
     * - `NOT_SUPPORTED_ERR`: May be raised if the implementation does not support the feature
     * "XML" and the language exposed through the Document does not support XML Namespaces (such
     * as {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#HTML40 HTML 4.01}).
     * @since DOM Level 2.
     * @see {@link #createHTMLDocument}
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument DOM Living Standard
     * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Level-2-Core-DOM-createDocument DOM
     *      Level 3 Core
     * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM
     *      Level 2 Core (initial)
     */
    createDocument: function(e, t, n) {
      var o = f.XML_APPLICATION;
      e === g.HTML ? o = f.XML_XHTML_APPLICATION : e === g.SVG && (o = f.XML_SVG_IMAGE);
      var D = new me(N, { contentType: o });
      if (D.implementation = this, D.childNodes = new b(), D.doctype = n || null, n && D.appendChild(n), t) {
        var x = D.createElementNS(e, t);
        D.appendChild(x);
      }
      return D;
    },
    /**
     * Creates an empty DocumentType node. Entity declarations and notations are not made
     * available. Entity reference expansions and default attribute additions do not occur.
     *
     * **This behavior is slightly different from the in the specs**:
     * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
     * - `publicId` and `systemId` contain the raw data including any possible quotes,
     *   so they can always be serialized back to the original value
     * - `internalSubset` contains the raw string between `[` and `]` if present,
     *   but is not parsed or validated in any form.
     *
     * @function DOMImplementation#createDocumentType
     * @param {string} qualifiedName
     * The {@link https://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-qualifiedname qualified
     * name} of the document type to be created.
     * @param {string} [publicId]
     * The external subset public identifier.
     * @param {string} [systemId]
     * The external subset system identifier.
     * @param {string} [internalSubset]
     * the internal subset or an empty string if it is not present
     * @returns {DocumentType}
     * A new {@link DocumentType} node with {@link Node#ownerDocument} set to null.
     * @throws {DOMException}
     * With code:
     *
     * - `INVALID_CHARACTER_ERR`: Raised if the specified qualified name is not an XML name
     * according to {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#XML XML 1.0}.
     * - `NAMESPACE_ERR`: Raised if the qualifiedName is malformed.
     * - `NOT_SUPPORTED_ERR`: May be raised if the implementation does not support the feature
     * "XML" and the language exposed through the Document does not support XML Namespaces (such
     * as {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#HTML40 HTML 4.01}).
     * @since DOM Level 2.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType
     *      MDN
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living
     *      Standard
     * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Level-3-Core-DOM-createDocType DOM
     *      Level 3 Core
     * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM
     *      Level 2 Core
     * @see https://github.com/xmldom/xmldom/blob/master/CHANGELOG.md#050
     * @see https://www.w3.org/TR/DOM-Level-2-Core/#core-ID-Core-DocType-internalSubset
     * @prettierignore
     */
    createDocumentType: function(e, t, n, o) {
      V(e);
      var D = new $e(N);
      return D.name = e, D.nodeName = e, D.publicId = t || "", D.systemId = n || "", D.internalSubset = o || "", D;
    },
    /**
     * Returns an HTML document, that might already have a basic DOM structure.
     *
     * __It behaves slightly different from the description in the living standard__:
     * - If the first argument is `false` no initial nodes are added (steps 3-7 in the specs are
     * omitted)
     * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
     *
     * @param {string | false} [title]
     * A string containing the title to give the new HTML document.
     * @returns {Document}
     * The HTML document.
     * @since WHATWG Living Standard.
     * @see {@link #createDocument}
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-createhtmldocument
     * @see https://dom.spec.whatwg.org/#html-document
     */
    createHTMLDocument: function(e) {
      var t = new me(N, { contentType: f.HTML });
      if (t.implementation = this, t.childNodes = new b(), e !== !1) {
        t.doctype = this.createDocumentType("html"), t.doctype.ownerDocument = t, t.appendChild(t.doctype);
        var n = t.createElement("html");
        t.appendChild(n);
        var o = t.createElement("head");
        if (n.appendChild(o), typeof e == "string") {
          var D = t.createElement("title");
          D.appendChild(t.createTextNode(e)), o.appendChild(D);
        }
        n.appendChild(t.createElement("body"));
      }
      return t;
    }
  };
  function U(e) {
    E(e);
  }
  U.prototype = {
    /**
     * The first child of this node.
     *
     * @type {Node | null}
     */
    firstChild: null,
    /**
     * The last child of this node.
     *
     * @type {Node | null}
     */
    lastChild: null,
    /**
     * The previous sibling of this node.
     *
     * @type {Node | null}
     */
    previousSibling: null,
    /**
     * The next sibling of this node.
     *
     * @type {Node | null}
     */
    nextSibling: null,
    /**
     * The attributes of this node.
     *
     * @type {NamedNodeMap | null}
     */
    attributes: null,
    /**
     * The parent node of this node.
     *
     * @type {Node | null}
     */
    parentNode: null,
    /**
     * The child nodes of this node.
     *
     * @type {NodeList | null}
     */
    childNodes: null,
    /**
     * The document object associated with this node.
     *
     * @type {Document | null}
     */
    ownerDocument: null,
    /**
     * The value of this node.
     *
     * @type {string | null}
     */
    nodeValue: null,
    /**
     * The namespace URI of this node.
     *
     * @type {string | null}
     */
    namespaceURI: null,
    /**
     * The prefix of the namespace for this node.
     *
     * @type {string | null}
     */
    prefix: null,
    /**
     * The local part of the qualified name of this node.
     *
     * @type {string | null}
     */
    localName: null,
    /**
     * Inserts a node before a reference node as a child of this node.
     *
     * @param {Node} newChild
     * The new child node to be inserted.
     * @param {Node | null} refChild
     * The reference node before which newChild will be inserted.
     * @returns {Node}
     * The new child node successfully inserted.
     * @throws {DOMException}
     * Throws a DOMException if inserting the node would result in a DOM tree that is not
     * well-formed, or if `child` is provided but is not a child of `parent`.
     * See {@link _insertBefore} for more details.
     * @since Modified in DOM L2
     */
    insertBefore: function(e, t) {
      return Y(this, e, t);
    },
    /**
     * Replaces an old child node with a new child node within this node.
     *
     * @param {Node} newChild
     * The new node that is to replace the old node.
     * If it already exists in the DOM, it is removed from its original position.
     * @param {Node} oldChild
     * The existing child node to be replaced.
     * @returns {Node}
     * Returns the replaced child node.
     * @throws {DOMException}
     * Throws a DOMException if replacing the node would result in a DOM tree that is not
     * well-formed, or if `oldChild` is not a child of `this`.
     * This can also occur if the pre-replacement validity assertion fails.
     * See {@link _insertBefore}, {@link Node.removeChild}, and
     * {@link assertPreReplacementValidityInDocument} for more details.
     * @see https://dom.spec.whatwg.org/#concept-node-replace
     */
    replaceChild: function(e, t) {
      Y(this, e, t, Ue), t && this.removeChild(t);
    },
    /**
     * Removes an existing child node from this node.
     *
     * @param {Node} oldChild
     * The child node to be removed.
     * @returns {Node}
     * Returns the removed child node.
     * @throws {DOMException}
     * Throws a DOMException if `oldChild` is not a child of `this`.
     * See {@link _removeChild} for more details.
     */
    removeChild: function(e) {
      return Qe(this, e);
    },
    /**
     * Appends a child node to this node.
     *
     * @param {Node} newChild
     * The child node to be appended to this node.
     * If it already exists in the DOM, it is removed from its original position.
     * @returns {Node}
     * Returns the appended child node.
     * @throws {DOMException}
     * Throws a DOMException if appending the node would result in a DOM tree that is not
     * well-formed, or if `newChild` is not a valid Node.
     * See {@link insertBefore} for more details.
     */
    appendChild: function(e) {
      return this.insertBefore(e, null);
    },
    /**
     * Determines whether this node has any child nodes.
     *
     * @returns {boolean}
     * Returns true if this node has any child nodes, and false otherwise.
     */
    hasChildNodes: function() {
      return this.firstChild != null;
    },
    /**
     * Creates a copy of the calling node.
     *
     * @param {boolean} deep
     * If true, the contents of the node are recursively copied.
     * If false, only the node itself (and its attributes, if it is an element) are copied.
     * @returns {Node}
     * Returns the newly created copy of the node.
     * @throws {DOMException}
     * May throw a DOMException if operations within {@link Element#setAttributeNode} or
     * {@link Node#appendChild} (which are potentially invoked in this method) do not meet their
     * specific constraints.
     * @see {@link cloneNode}
     */
    cloneNode: function(e) {
      return dt(this.ownerDocument || this, this, e);
    },
    /**
     * Puts the specified node and all of its subtree into a "normalized" form. In a normalized
     * subtree, no text nodes in the subtree are empty and there are no adjacent text nodes.
     *
     * Specifically, this method merges any adjacent text nodes (i.e., nodes for which `nodeType`
     * is `TEXT_NODE`) into a single node with the combined data. It also removes any empty text
     * nodes.
     *
     * This method operates recursively, so it also normalizes any and all descendent nodes within
     * the subtree.
     *
     * @throws {DOMException}
     * May throw a DOMException if operations within removeChild or appendData (which are
     * potentially invoked in this method) do not meet their specific constraints.
     * @since Modified in DOM Level 2
     * @see {@link Node.removeChild}
     * @see {@link CharacterData.appendData}
     */
    normalize: function() {
      for (var e = this.firstChild; e; ) {
        var t = e.nextSibling;
        t && t.nodeType == W && e.nodeType == W ? (this.removeChild(t), e.appendData(t.data)) : (e.normalize(), e = t);
      }
    },
    /**
     * Checks whether the DOM implementation implements a specific feature and its version.
     *
     * @deprecated
     * Since `DOMImplementation.hasFeature` is deprecated and always returns true.
     * @param {string} feature
     * The package name of the feature to test. This is the same name that can be passed to the
     * method `hasFeature` on `DOMImplementation`.
     * @param {string} version
     * This is the version number of the package name to test.
     * @returns {boolean}
     * Returns true in all cases in the current implementation.
     * @since Introduced in DOM Level 2
     * @see {@link DOMImplementation.hasFeature}
     */
    isSupported: function(e, t) {
      return this.ownerDocument.implementation.hasFeature(e, t);
    },
    /**
     * Determines if the node has any attributes.
     *
     * @returns {boolean}
     * Returns true if the node has any attributes, and false otherwise.
     * @since Introduced in DOM Level 2
     */
    hasAttributes: function() {
      return this.attributes.length > 0;
    },
    /**
     * Look up the prefix associated to the given namespace URI, starting from this node.
     * **The default namespace declarations are ignored by this method.**
     * See Namespace Prefix Lookup for details on the algorithm used by this method.
     *
     * **This behavior is different from the in the specs**:
     * - no node type specific handling
     * - uses the internal attribute _nsMap for resolving namespaces that is updated when changing attributes
     *
     * @param {string | null} namespaceURI
     * The namespace URI for which to find the associated prefix.
     * @returns {string | null}
     * The associated prefix, if found; otherwise, null.
     * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
     * @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
     * @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
     * @see https://github.com/xmldom/xmldom/issues/322
     * @prettierignore
     */
    lookupPrefix: function(e) {
      for (var t = this; t; ) {
        var n = t._nsMap;
        if (n) {
          for (var o in n)
            if (i(n, o) && n[o] === e)
              return o;
        }
        t = t.nodeType == H ? t.ownerDocument : t.parentNode;
      }
      return null;
    },
    /**
     * This function is used to look up the namespace URI associated with the given prefix,
     * starting from this node.
     *
     * **This behavior is different from the in the specs**:
     * - no node type specific handling
     * - uses the internal attribute _nsMap for resolving namespaces that is updated when changing attributes
     *
     * @param {string | null} prefix
     * The prefix for which to find the associated namespace URI.
     * @returns {string | null}
     * The associated namespace URI, if found; otherwise, null.
     * @since DOM Level 3
     * @see https://dom.spec.whatwg.org/#dom-node-lookupnamespaceuri
     * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespaceURI
     * @prettierignore
     */
    lookupNamespaceURI: function(e) {
      for (var t = this; t; ) {
        var n = t._nsMap;
        if (n && i(n, e))
          return n[e];
        t = t.nodeType == H ? t.ownerDocument : t.parentNode;
      }
      return null;
    },
    /**
     * Determines whether the given namespace URI is the default namespace.
     *
     * The function works by looking up the prefix associated with the given namespace URI. If no
     * prefix is found (i.e., the namespace URI is not registered in the namespace map of this
     * node or any of its ancestors), it returns `true`, implying the namespace URI is considered
     * the default.
     *
     * **This behavior is different from the in the specs**:
     * - no node type specific handling
     * - uses the internal attribute _nsMap for resolving namespaces that is updated when changing attributes
     *
     * @param {string | null} namespaceURI
     * The namespace URI to be checked.
     * @returns {boolean}
     * Returns true if the given namespace URI is the default namespace, false otherwise.
     * @since DOM Level 3
     * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-isDefaultNamespace
     * @see https://dom.spec.whatwg.org/#dom-node-isdefaultnamespace
     * @prettierignore
     */
    isDefaultNamespace: function(e) {
      var t = this.lookupPrefix(e);
      return t == null;
    },
    /**
     * Compares the reference node with a node with regard to their position in the document and
     * according to the document order.
     *
     * @param {Node} other
     * The node to compare the reference node to.
     * @returns {number}
     * Returns how the node is positioned relatively to the reference node according to the
     * bitmask. 0 if reference node and given node are the same.
     * @since DOM Level 3
     * @see https://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/core.html#Node3-compare
     * @see https://dom.spec.whatwg.org/#dom-node-comparedocumentposition
     */
    compareDocumentPosition: function(e) {
      if (this === e) return 0;
      var t = e, n = this, o = null, D = null;
      if (t instanceof ve && (o = t, t = o.ownerElement), n instanceof ve && (D = n, n = D.ownerElement, o && t && n === t))
        for (var x = 0, Z; Z = n.attributes[x]; x++) {
          if (Z === o)
            return v.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + v.DOCUMENT_POSITION_PRECEDING;
          if (Z === D)
            return v.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + v.DOCUMENT_POSITION_FOLLOWING;
        }
      if (!t || !n || n.ownerDocument !== t.ownerDocument)
        return v.DOCUMENT_POSITION_DISCONNECTED + v.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + (F(n.ownerDocument) > F(t.ownerDocument) ? v.DOCUMENT_POSITION_FOLLOWING : v.DOCUMENT_POSITION_PRECEDING);
      var fe = z(t), ge = z(n);
      if (!o && ge.indexOf(t) >= 0 || D && t === n)
        return v.DOCUMENT_POSITION_CONTAINS + v.DOCUMENT_POSITION_PRECEDING;
      if (!D && fe.indexOf(n) >= 0 || o && t === n)
        return v.DOCUMENT_POSITION_CONTAINED_BY + v.DOCUMENT_POSITION_FOLLOWING;
      var ye = Q(ge, fe);
      for (var we in ye.childNodes) {
        var Re = ye.childNodes[we];
        if (Re === n) return v.DOCUMENT_POSITION_FOLLOWING;
        if (Re === t) return v.DOCUMENT_POSITION_PRECEDING;
        if (ge.indexOf(Re) >= 0) return v.DOCUMENT_POSITION_FOLLOWING;
        if (fe.indexOf(Re) >= 0) return v.DOCUMENT_POSITION_PRECEDING;
      }
      return 0;
    }
  };
  function Be(e) {
    return e == "<" && "&lt;" || e == ">" && "&gt;" || e == "&" && "&amp;" || e == '"' && "&quot;" || "&#" + e.charCodeAt() + ";";
  }
  ee(S, U), ee(S, U.prototype), ee(v, U), ee(v, U.prototype);
  function _e(e, t) {
    if (t(e))
      return !0;
    if (e = e.firstChild)
      do
        if (_e(e, t))
          return !0;
      while (e = e.nextSibling);
  }
  function me(e, t) {
    E(e);
    var n = t || {};
    this.ownerDocument = this, this.contentType = n.contentType || f.XML_APPLICATION, this.type = a(this.contentType) ? "html" : "xml";
  }
  function Ce(e, t, n) {
    e && e._inc++;
    var o = n.namespaceURI;
    o === g.XMLNS && (t._nsMap[n.prefix ? n.localName : ""] = n.value);
  }
  function be(e, t, n, o) {
    e && e._inc++;
    var D = n.namespaceURI;
    D === g.XMLNS && delete t._nsMap[n.prefix ? n.localName : ""];
  }
  function Oe(e, t, n) {
    if (e && e._inc) {
      e._inc++;
      var o = t.childNodes;
      {
        for (var D = t.firstChild, x = 0; D; )
          o[x++] = D, D = D.nextSibling;
        o.length = x, delete o[o.length];
      }
    }
  }
  function Qe(e, t) {
    if (e !== t.parentNode)
      throw new m(m.NOT_FOUND_ERR, "child's parent is not parent");
    var n = t.previousSibling, o = t.nextSibling;
    return n ? n.nextSibling = o : e.firstChild = o, o ? o.previousSibling = n : e.lastChild = n, Oe(e.ownerDocument, e), t.parentNode = null, t.previousSibling = null, t.nextSibling = null, t;
  }
  function qe(e) {
    return e && (e.nodeType === U.DOCUMENT_NODE || e.nodeType === U.DOCUMENT_FRAGMENT_NODE || e.nodeType === U.ELEMENT_NODE);
  }
  function Ie(e) {
    return e && (te(e) || e instanceof Ae || De(e) || e.nodeType === U.DOCUMENT_FRAGMENT_NODE || e.nodeType === U.COMMENT_NODE || e.nodeType === U.PROCESSING_INSTRUCTION_NODE);
  }
  function De(e) {
    return e && e.nodeType === U.DOCUMENT_TYPE_NODE;
  }
  function te(e) {
    return e && e.nodeType === U.ELEMENT_NODE;
  }
  function Le(e) {
    return e && e.nodeType === U.TEXT_NODE;
  }
  function ce(e, t) {
    var n = e.childNodes || [];
    if (u(n, te) || De(t))
      return !1;
    var o = u(n, De);
    return !(t && o && n.indexOf(o) > n.indexOf(t));
  }
  function ke(e, t) {
    var n = e.childNodes || [];
    function o(x) {
      return te(x) && x !== t;
    }
    if (u(n, o))
      return !1;
    var D = u(n, De);
    return !(t && D && n.indexOf(D) > n.indexOf(t));
  }
  function it(e, t, n) {
    if (!qe(e))
      throw new m(m.HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + e.nodeType);
    if (n && n.parentNode !== e)
      throw new m(m.NOT_FOUND_ERR, "child not in parent");
    if (
      // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
      !Ie(t) || // 5. If either `node` is a Text node and `parent` is a document,
      // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
      // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
      // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
      De(t) && e.nodeType !== U.DOCUMENT_NODE
    )
      throw new m(
        m.HIERARCHY_REQUEST_ERR,
        "Unexpected node type " + t.nodeType + " for parent node type " + e.nodeType
      );
  }
  function Me(e, t, n) {
    var o = e.childNodes || [], D = t.childNodes || [];
    if (t.nodeType === U.DOCUMENT_FRAGMENT_NODE) {
      var x = D.filter(te);
      if (x.length > 1 || u(D, Le))
        throw new m(m.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
      if (x.length === 1 && !ce(e, n))
        throw new m(m.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
    }
    if (te(t) && !ce(e, n))
      throw new m(m.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
    if (De(t)) {
      if (u(o, De))
        throw new m(m.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
      var Z = u(o, te);
      if (n && o.indexOf(Z) < o.indexOf(n))
        throw new m(m.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
      if (!n && Z)
        throw new m(m.HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
    }
  }
  function Ue(e, t, n) {
    var o = e.childNodes || [], D = t.childNodes || [];
    if (t.nodeType === U.DOCUMENT_FRAGMENT_NODE) {
      var x = D.filter(te);
      if (x.length > 1 || u(D, Le))
        throw new m(m.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
      if (x.length === 1 && !ke(e, n))
        throw new m(m.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
    }
    if (te(t) && !ke(e, n))
      throw new m(m.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
    if (De(t)) {
      if (u(o, function(ge) {
        return De(ge) && ge !== n;
      }))
        throw new m(m.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
      var Z = u(o, te);
      if (n && o.indexOf(Z) < o.indexOf(n))
        throw new m(m.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
    }
  }
  function Y(e, t, n, o) {
    it(e, t, n), e.nodeType === U.DOCUMENT_NODE && (o || Me)(e, t, n);
    var D = t.parentNode;
    if (D && D.removeChild(t), t.nodeType === y) {
      var x = t.firstChild;
      if (x == null)
        return t;
      var Z = t.lastChild;
    } else
      x = Z = t;
    var fe = n ? n.previousSibling : e.lastChild;
    x.previousSibling = fe, Z.nextSibling = n, fe ? fe.nextSibling = x : e.firstChild = x, n == null ? e.lastChild = Z : n.previousSibling = Z;
    do
      x.parentNode = e;
    while (x !== Z && (x = x.nextSibling));
    return Oe(e.ownerDocument || e, e), t.nodeType == y && (t.firstChild = t.lastChild = null), t;
  }
  me.prototype = {
    /**
     * The implementation that created this document.
     *
     * @type DOMImplementation
     * @readonly
     */
    implementation: null,
    nodeName: "#document",
    nodeType: d,
    /**
     * The DocumentType node of the document.
     *
     * @type DocumentType
     * @readonly
     */
    doctype: null,
    documentElement: null,
    _inc: 1,
    insertBefore: function(e, t) {
      if (e.nodeType == y) {
        for (var n = e.firstChild; n; ) {
          var o = n.nextSibling;
          this.insertBefore(n, t), n = o;
        }
        return e;
      }
      return Y(this, e, t), e.ownerDocument = this, this.documentElement === null && e.nodeType === L && (this.documentElement = e), e;
    },
    removeChild: function(e) {
      var t = Qe(this, e);
      return t === this.documentElement && (this.documentElement = null), t;
    },
    replaceChild: function(e, t) {
      Y(this, e, t, Ue), e.ownerDocument = this, t && this.removeChild(t), te(e) && (this.documentElement = e);
    },
    // Introduced in DOM Level 2:
    importNode: function(e, t) {
      return Ct(this, e, t);
    },
    // Introduced in DOM Level 2:
    getElementById: function(e) {
      var t = null;
      return _e(this.documentElement, function(n) {
        if (n.nodeType == L && n.getAttribute("id") == e)
          return t = n, !0;
      }), t;
    },
    /**
     * The `getElementsByClassName` method of `Document` interface returns an array-like object of
     * all child elements which have **all** of the given class name(s).
     *
     * Returns an empty list if `classeNames` is an empty string or only contains HTML white space
     * characters.
     *
     * Warning: This is a live LiveNodeList.
     * Changes in the DOM will reflect in the array as the changes occur.
     * If an element selected by this array no longer qualifies for the selector,
     * it will automatically be removed. Be aware of this for iteration purposes.
     *
     * @param {string} classNames
     * Is a string representing the class name(s) to match; multiple class names are separated by
     * (ASCII-)whitespace.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
     * @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
     */
    getElementsByClassName: function(e) {
      var t = w(e);
      return new B(this, function(n) {
        var o = [];
        return t.length > 0 && _e(n.documentElement, function(D) {
          if (D !== n && D.nodeType === L) {
            var x = D.getAttribute("class");
            if (x) {
              var Z = e === x;
              if (!Z) {
                var fe = w(x);
                Z = t.every(G(fe));
              }
              Z && o.push(D);
            }
          }
        }), o;
      });
    },
    /**
     * Creates a new `Element` that is owned by this `Document`.
     * In HTML Documents `localName` is the lower cased `tagName`,
     * otherwise no transformation is being applied.
     * When `contentType` implies the HTML namespace, it will be set as `namespaceURI`.
     *
     * __This implementation differs from the specification:__ - The provided name is not checked
     * against the `Name` production,
     * so no related error will be thrown.
     * - There is no interface `HTMLElement`, it is always an `Element`.
     * - There is no support for a second argument to indicate using custom elements.
     *
     * @param {string} tagName
     * @returns {Element}
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
     * @see https://dom.spec.whatwg.org/#dom-document-createelement
     * @see https://dom.spec.whatwg.org/#concept-create-element
     */
    createElement: function(e) {
      var t = new ue(N);
      t.ownerDocument = this, this.type === "html" && (e = e.toLowerCase()), r(this.contentType) && (t.namespaceURI = g.HTML), t.nodeName = e, t.tagName = e, t.localName = e, t.childNodes = new b();
      var n = t.attributes = new re();
      return n._ownerElement = t, t;
    },
    createDocumentFragment: function() {
      var e = new Ge(N);
      return e.ownerDocument = this, e.childNodes = new b(), e;
    },
    createTextNode: function(e) {
      var t = new We(N);
      return t.ownerDocument = this, t.appendData(e), t;
    },
    createComment: function(e) {
      var t = new Je(N);
      return t.ownerDocument = this, t.appendData(e), t;
    },
    createCDATASection: function(e) {
      var t = new Ze(N);
      return t.ownerDocument = this, t.appendData(e), t;
    },
    createProcessingInstruction: function(e, t) {
      var n = new ie(N);
      return n.ownerDocument = this, n.nodeName = n.target = e, n.nodeValue = n.data = t, n;
    },
    /**
     * Creates an `Attr` node that is owned by this document.
     * In HTML Documents `localName` is the lower cased `name`,
     * otherwise no transformation is being applied.
     *
     * __This implementation differs from the specification:__ - The provided name is not checked
     * against the `Name` production,
     * so no related error will be thrown.
     *
     * @param {string} name
     * @returns {Attr}
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createAttribute
     * @see https://dom.spec.whatwg.org/#dom-document-createattribute
     */
    createAttribute: function(e) {
      if (!M.QName_exact.test(e))
        throw new m(m.INVALID_CHARACTER_ERR, 'invalid character in name "' + e + '"');
      return this.type === "html" && (e = e.toLowerCase()), this._createAttribute(e);
    },
    _createAttribute: function(e) {
      var t = new ve(N);
      return t.ownerDocument = this, t.name = e, t.nodeName = e, t.localName = e, t.specified = !0, t;
    },
    createEntityReference: function(e) {
      var t = new Ke(N);
      return t.ownerDocument = this, t.nodeName = e, t;
    },
    // Introduced in DOM Level 2:
    createElementNS: function(e, t) {
      var n = K(e, t), o = new ue(N), D = o.attributes = new re();
      return o.childNodes = new b(), o.ownerDocument = this, o.nodeName = t, o.tagName = t, o.namespaceURI = n[0], o.prefix = n[1], o.localName = n[2], D._ownerElement = o, o;
    },
    // Introduced in DOM Level 2:
    createAttributeNS: function(e, t) {
      var n = K(e, t), o = new ve(N);
      return o.ownerDocument = this, o.nodeName = t, o.name = t, o.specified = !0, o.namespaceURI = n[0], o.prefix = n[1], o.localName = n[2], o;
    }
  }, p(me, U);
  function ue(e) {
    E(e), this._nsMap = /* @__PURE__ */ Object.create(null);
  }
  ue.prototype = {
    nodeType: L,
    getQualifiedName: function() {
      return this.prefix ? this.prefix + ":" + this.localName : this.localName;
    },
    _isInHTMLDocumentAndNamespace: function() {
      return this.ownerDocument.type === "html" && this.namespaceURI === g.HTML;
    },
    hasAttribute: function(e) {
      return !!this.getAttributeNode(e);
    },
    /**
     * Returns element’s first attribute whose qualified name is `name`, and `null`
     * if there is no such attribute.
     *
     * @param {string} name
     * @returns {string | null}
     */
    getAttribute: function(e) {
      var t = this.getAttributeNode(e);
      return t ? t.value : null;
    },
    getAttributeNode: function(e) {
      return this._isInHTMLDocumentAndNamespace() && (e = e.toLowerCase()), this.attributes.getNamedItem(e);
    },
    /**
     * Sets the value of element’s first attribute whose qualified name is qualifiedName to value.
     *
     * @param {string} name
     * @param {string} value
     */
    setAttribute: function(e, t) {
      this._isInHTMLDocumentAndNamespace() && (e = e.toLowerCase());
      var n = this.getAttributeNode(e);
      n ? n.value = n.nodeValue = "" + t : (n = this.ownerDocument._createAttribute(e), n.value = n.nodeValue = "" + t, this.setAttributeNode(n));
    },
    removeAttribute: function(e) {
      var t = this.getAttributeNode(e);
      t && this.removeAttributeNode(t);
    },
    setAttributeNode: function(e) {
      return this.attributes.setNamedItem(e);
    },
    setAttributeNodeNS: function(e) {
      return this.attributes.setNamedItemNS(e);
    },
    removeAttributeNode: function(e) {
      return this.attributes.removeNamedItem(e.nodeName);
    },
    //get real attribute name,and remove it by removeAttributeNode
    removeAttributeNS: function(e, t) {
      var n = this.getAttributeNodeNS(e, t);
      n && this.removeAttributeNode(n);
    },
    hasAttributeNS: function(e, t) {
      return this.getAttributeNodeNS(e, t) != null;
    },
    /**
     * Returns element’s attribute whose namespace is `namespaceURI` and local name is
     * `localName`,
     * or `null` if there is no such attribute.
     *
     * @param {string} namespaceURI
     * @param {string} localName
     * @returns {string | null}
     */
    getAttributeNS: function(e, t) {
      var n = this.getAttributeNodeNS(e, t);
      return n ? n.value : null;
    },
    /**
     * Sets the value of element’s attribute whose namespace is `namespaceURI` and local name is
     * `localName` to value.
     *
     * @param {string} namespaceURI
     * @param {string} qualifiedName
     * @param {string} value
     * @see https://dom.spec.whatwg.org/#dom-element-setattributens
     */
    setAttributeNS: function(e, t, n) {
      var o = K(e, t), D = o[2], x = this.getAttributeNodeNS(e, D);
      x ? x.value = x.nodeValue = "" + n : (x = this.ownerDocument.createAttributeNS(e, t), x.value = x.nodeValue = "" + n, this.setAttributeNode(x));
    },
    getAttributeNodeNS: function(e, t) {
      return this.attributes.getNamedItemNS(e, t);
    },
    /**
     * Returns a LiveNodeList of elements with the given qualifiedName.
     * Searching for all descendants can be done by passing `*` as `qualifiedName`.
     *
     * All descendants of the specified element are searched, but not the element itself.
     * The returned list is live, which means it updates itself with the DOM tree automatically.
     * Therefore, there is no need to call `Element.getElementsByTagName()`
     * with the same element and arguments repeatedly if the DOM changes in between calls.
     *
     * When called on an HTML element in an HTML document,
     * `getElementsByTagName` lower-cases the argument before searching for it.
     * This is undesirable when trying to match camel-cased SVG elements (such as
     * `<linearGradient>`) in an HTML document.
     * Instead, use `Element.getElementsByTagNameNS()`,
     * which preserves the capitalization of the tag name.
     *
     * `Element.getElementsByTagName` is similar to `Document.getElementsByTagName()`,
     * except that it only searches for elements that are descendants of the specified element.
     *
     * @param {string} qualifiedName
     * @returns {LiveNodeList}
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName
     * @see https://dom.spec.whatwg.org/#concept-getelementsbytagname
     */
    getElementsByTagName: function(e) {
      var t = (this.nodeType === d ? this : this.ownerDocument).type === "html", n = e.toLowerCase();
      return new B(this, function(o) {
        var D = [];
        return _e(o, function(x) {
          if (!(x === o || x.nodeType !== L))
            if (e === "*")
              D.push(x);
            else {
              var Z = x.getQualifiedName(), fe = t && x.namespaceURI === g.HTML ? n : e;
              Z === fe && D.push(x);
            }
        }), D;
      });
    },
    getElementsByTagNameNS: function(e, t) {
      return new B(this, function(n) {
        var o = [];
        return _e(n, function(D) {
          D !== n && D.nodeType === L && (e === "*" || D.namespaceURI === e) && (t === "*" || D.localName == t) && o.push(D);
        }), o;
      });
    }
  }, me.prototype.getElementsByTagName = ue.prototype.getElementsByTagName, me.prototype.getElementsByTagNameNS = ue.prototype.getElementsByTagNameNS, p(ue, U);
  function ve(e) {
    E(e), this.namespaceURI = null, this.prefix = null, this.ownerElement = null;
  }
  ve.prototype.nodeType = H, p(ve, U);
  function Ae(e) {
    E(e);
  }
  Ae.prototype = {
    data: "",
    substringData: function(e, t) {
      return this.data.substring(e, e + t);
    },
    appendData: function(e) {
      e = this.data + e, this.nodeValue = this.data = e, this.length = e.length;
    },
    insertData: function(e, t) {
      this.replaceData(e, 0, t);
    },
    deleteData: function(e, t) {
      this.replaceData(e, t, "");
    },
    replaceData: function(e, t, n) {
      var o = this.data.substring(0, e), D = this.data.substring(e + t);
      n = o + n + D, this.nodeValue = this.data = n, this.length = n.length;
    }
  }, p(Ae, U);
  function We(e) {
    E(e);
  }
  We.prototype = {
    nodeName: "#text",
    nodeType: W,
    splitText: function(e) {
      var t = this.data, n = t.substring(e);
      t = t.substring(0, e), this.data = this.nodeValue = t, this.length = t.length;
      var o = this.ownerDocument.createTextNode(n);
      return this.parentNode && this.parentNode.insertBefore(o, this.nextSibling), o;
    }
  }, p(We, Ae);
  function Je(e) {
    E(e);
  }
  Je.prototype = {
    nodeName: "#comment",
    nodeType: l
  }, p(Je, Ae);
  function Ze(e) {
    E(e);
  }
  Ze.prototype = {
    nodeName: "#cdata-section",
    nodeType: C
  }, p(Ze, Ae);
  function $e(e) {
    E(e);
  }
  $e.prototype.nodeType = A, p($e, U);
  function nt(e) {
    E(e);
  }
  nt.prototype.nodeType = q, p(nt, U);
  function st(e) {
    E(e);
  }
  st.prototype.nodeType = _, p(st, U);
  function Ke(e) {
    E(e);
  }
  Ke.prototype.nodeType = P, p(Ke, U);
  function Ge(e) {
    E(e);
  }
  Ge.prototype.nodeName = "#document-fragment", Ge.prototype.nodeType = y, p(Ge, U);
  function ie(e) {
    E(e);
  }
  ie.prototype.nodeType = R, p(ie, U);
  function he() {
  }
  he.prototype.serializeToString = function(e, t) {
    return Pe.call(e, t);
  }, U.prototype.toString = Pe;
  function Pe(e) {
    var t = [], n = this.nodeType === d && this.documentElement || this, o = n.prefix, D = n.namespaceURI;
    if (D && o == null) {
      var o = n.lookupPrefix(D);
      if (o == null)
        var x = [
          { namespace: D, prefix: null }
          //{namespace:uri,prefix:''}
        ];
    }
    return et(this, t, e, x), t.join("");
  }
  function at(e, t, n) {
    var o = e.prefix || "", D = e.namespaceURI;
    if (!D || o === "xml" && D === g.XML || D === g.XMLNS)
      return !1;
    for (var x = n.length; x--; ) {
      var Z = n[x];
      if (Z.prefix === o)
        return Z.namespace !== D;
    }
    return !0;
  }
  function mt(e, t, n) {
    e.push(" ", t, '="', n.replace(/[<>&"\t\n\r]/g, Be), '"');
  }
  function et(e, t, n, o) {
    o || (o = []);
    var D = e.nodeType === d ? e : e.ownerDocument, x = D.type === "html";
    if (n)
      if (e = n(e), e) {
        if (typeof e == "string") {
          t.push(e);
          return;
        }
      } else
        return;
    switch (e.nodeType) {
      case L:
        var Z = e.attributes, fe = Z.length, de = e.firstChild, ge = e.tagName, ye = ge;
        if (!x && !e.prefix && e.namespaceURI) {
          for (var we, Re = 0; Re < Z.length; Re++)
            if (Z.item(Re).name === "xmlns") {
              we = Z.item(Re).value;
              break;
            }
          if (!we)
            for (var Ve = o.length - 1; Ve >= 0; Ve--) {
              var He = o[Ve];
              if (He.prefix === "" && He.namespace === e.namespaceURI) {
                we = He.namespace;
                break;
              }
            }
          if (we !== e.namespaceURI)
            for (var Ve = o.length - 1; Ve >= 0; Ve--) {
              var He = o[Ve];
              if (He.namespace === e.namespaceURI) {
                He.prefix && (ye = He.prefix + ":" + ge);
                break;
              }
            }
        }
        t.push("<", ye);
        for (var ze = 0; ze < fe; ze++) {
          var Se = Z.item(ze);
          Se.prefix == "xmlns" ? o.push({
            prefix: Se.localName,
            namespace: Se.value
          }) : Se.nodeName == "xmlns" && o.push({ prefix: "", namespace: Se.value });
        }
        for (var ze = 0; ze < fe; ze++) {
          var Se = Z.item(ze);
          if (at(Se, x, o)) {
            var Ye = Se.prefix || "", ot = Se.namespaceURI;
            mt(t, Ye ? "xmlns:" + Ye : "xmlns", ot), o.push({ prefix: Ye, namespace: ot });
          }
          et(Se, t, n, o);
        }
        if (ge === ye && at(e, x, o)) {
          var Ye = e.prefix || "", ot = e.namespaceURI;
          mt(t, Ye ? "xmlns:" + Ye : "xmlns", ot), o.push({ prefix: Ye, namespace: ot });
        }
        var Et = !de;
        if (Et && (x || e.namespaceURI === g.HTML) && (Et = c(ge)), Et)
          t.push("/>");
        else {
          if (t.push(">"), x && s(ge))
            for (; de; )
              de.data ? t.push(de.data) : et(de, t, n, o.slice()), de = de.nextSibling;
          else
            for (; de; )
              et(de, t, n, o.slice()), de = de.nextSibling;
          t.push("</", ye, ">");
        }
        return;
      case d:
      case y:
        for (var de = e.firstChild; de; )
          et(de, t, n, o.slice()), de = de.nextSibling;
        return;
      case H:
        return mt(t, e.name, e.value);
      case W:
        return t.push(e.data.replace(/[<&>]/g, Be));
      case C:
        return t.push(M.CDATA_START, e.data, M.CDATA_END);
      case l:
        return t.push(M.COMMENT_START, e.data, M.COMMENT_END);
      case A:
        var yt = e.publicId, tt = e.systemId;
        t.push(M.DOCTYPE_DECL_START, " ", e.name), yt ? (t.push(" ", M.PUBLIC, " ", yt), tt && tt !== "." && t.push(" ", tt)) : tt && tt !== "." && t.push(" ", M.SYSTEM, " ", tt), e.internalSubset && t.push(" [", e.internalSubset, "]"), t.push(">");
        return;
      case R:
        return t.push("<?", e.target, " ", e.data, "?>");
      case P:
        return t.push("&", e.nodeName, ";");
      //case ENTITY_NODE:
      //case NOTATION_NODE:
      default:
        t.push("??", e.nodeName);
    }
  }
  function Ct(e, t, n) {
    var o;
    switch (t.nodeType) {
      case L:
        o = t.cloneNode(!1), o.ownerDocument = e;
      //var attrs = node2.attributes;
      //var len = attrs.length;
      //for(var i=0;i<len;i++){
      //node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
      //}
      case y:
        break;
      case H:
        n = !0;
        break;
    }
    if (o || (o = t.cloneNode(!1)), o.ownerDocument = e, o.parentNode = null, n)
      for (var D = t.firstChild; D; )
        o.appendChild(Ct(e, D, n)), D = D.nextSibling;
    return o;
  }
  function dt(e, t, n) {
    var o = new t.constructor(N);
    for (var D in t)
      if (i(t, D)) {
        var x = t[D];
        typeof x != "object" && x != o[D] && (o[D] = x);
      }
    switch (t.childNodes && (o.childNodes = new b()), o.ownerDocument = e, o.nodeType) {
      case L:
        var Z = t.attributes, fe = o.attributes = new re(), ge = Z.length;
        fe._ownerElement = o;
        for (var ye = 0; ye < ge; ye++)
          o.setAttributeNode(dt(e, Z.item(ye), !0));
        break;
      case H:
        n = !0;
    }
    if (n)
      for (var we = t.firstChild; we; )
        o.appendChild(dt(e, we, n)), we = we.nextSibling;
    return o;
  }
  function bt(e, t, n) {
    e[t] = n;
  }
  try {
    if (Object.defineProperty) {
      let e = function(t) {
        switch (t.nodeType) {
          case L:
          case y:
            var n = [];
            for (t = t.firstChild; t; )
              t.nodeType !== 7 && t.nodeType !== 8 && n.push(e(t)), t = t.nextSibling;
            return n.join("");
          default:
            return t.nodeValue;
        }
      };
      Object.defineProperty(B.prototype, "length", {
        get: function() {
          return k(this), this.$$length;
        }
      }), Object.defineProperty(U.prototype, "textContent", {
        get: function() {
          return e(this);
        },
        set: function(t) {
          switch (this.nodeType) {
            case L:
            case y:
              for (; this.firstChild; )
                this.removeChild(this.firstChild);
              (t || String(t)) && this.appendChild(this.ownerDocument.createTextNode(t));
              break;
            default:
              this.data = t, this.value = t, this.nodeValue = t;
          }
        }
      }), bt = function(t, n, o) {
        t["$$" + n] = o;
      };
    }
  } catch {
  }
  return se._updateLiveList = k, se.Attr = ve, se.CDATASection = Ze, se.CharacterData = Ae, se.Comment = Je, se.Document = me, se.DocumentFragment = Ge, se.DocumentType = $e, se.DOMImplementation = oe, se.Element = ue, se.Entity = st, se.EntityReference = Ke, se.LiveNodeList = B, se.NamedNodeMap = re, se.Node = U, se.NodeList = b, se.Notation = nt, se.Text = We, se.XMLSerializer = he, se.ProcessingInstruction = ie, se;
}
var je = {}, vt = {}, Ft;
function yr() {
  return Ft || (Ft = 1, function(h) {
    var u = ut().freeze;
    h.XML_ENTITIES = u({
      amp: "&",
      apos: "'",
      gt: ">",
      lt: "<",
      quot: '"'
    }), h.HTML_ENTITIES = u({
      Aacute: "Á",
      aacute: "á",
      Abreve: "Ă",
      abreve: "ă",
      ac: "∾",
      acd: "∿",
      acE: "∾̳",
      Acirc: "Â",
      acirc: "â",
      acute: "´",
      Acy: "А",
      acy: "а",
      AElig: "Æ",
      aelig: "æ",
      af: "⁡",
      Afr: "𝔄",
      afr: "𝔞",
      Agrave: "À",
      agrave: "à",
      alefsym: "ℵ",
      aleph: "ℵ",
      Alpha: "Α",
      alpha: "α",
      Amacr: "Ā",
      amacr: "ā",
      amalg: "⨿",
      AMP: "&",
      amp: "&",
      And: "⩓",
      and: "∧",
      andand: "⩕",
      andd: "⩜",
      andslope: "⩘",
      andv: "⩚",
      ang: "∠",
      ange: "⦤",
      angle: "∠",
      angmsd: "∡",
      angmsdaa: "⦨",
      angmsdab: "⦩",
      angmsdac: "⦪",
      angmsdad: "⦫",
      angmsdae: "⦬",
      angmsdaf: "⦭",
      angmsdag: "⦮",
      angmsdah: "⦯",
      angrt: "∟",
      angrtvb: "⊾",
      angrtvbd: "⦝",
      angsph: "∢",
      angst: "Å",
      angzarr: "⍼",
      Aogon: "Ą",
      aogon: "ą",
      Aopf: "𝔸",
      aopf: "𝕒",
      ap: "≈",
      apacir: "⩯",
      apE: "⩰",
      ape: "≊",
      apid: "≋",
      apos: "'",
      ApplyFunction: "⁡",
      approx: "≈",
      approxeq: "≊",
      Aring: "Å",
      aring: "å",
      Ascr: "𝒜",
      ascr: "𝒶",
      Assign: "≔",
      ast: "*",
      asymp: "≈",
      asympeq: "≍",
      Atilde: "Ã",
      atilde: "ã",
      Auml: "Ä",
      auml: "ä",
      awconint: "∳",
      awint: "⨑",
      backcong: "≌",
      backepsilon: "϶",
      backprime: "‵",
      backsim: "∽",
      backsimeq: "⋍",
      Backslash: "∖",
      Barv: "⫧",
      barvee: "⊽",
      Barwed: "⌆",
      barwed: "⌅",
      barwedge: "⌅",
      bbrk: "⎵",
      bbrktbrk: "⎶",
      bcong: "≌",
      Bcy: "Б",
      bcy: "б",
      bdquo: "„",
      becaus: "∵",
      Because: "∵",
      because: "∵",
      bemptyv: "⦰",
      bepsi: "϶",
      bernou: "ℬ",
      Bernoullis: "ℬ",
      Beta: "Β",
      beta: "β",
      beth: "ℶ",
      between: "≬",
      Bfr: "𝔅",
      bfr: "𝔟",
      bigcap: "⋂",
      bigcirc: "◯",
      bigcup: "⋃",
      bigodot: "⨀",
      bigoplus: "⨁",
      bigotimes: "⨂",
      bigsqcup: "⨆",
      bigstar: "★",
      bigtriangledown: "▽",
      bigtriangleup: "△",
      biguplus: "⨄",
      bigvee: "⋁",
      bigwedge: "⋀",
      bkarow: "⤍",
      blacklozenge: "⧫",
      blacksquare: "▪",
      blacktriangle: "▴",
      blacktriangledown: "▾",
      blacktriangleleft: "◂",
      blacktriangleright: "▸",
      blank: "␣",
      blk12: "▒",
      blk14: "░",
      blk34: "▓",
      block: "█",
      bne: "=⃥",
      bnequiv: "≡⃥",
      bNot: "⫭",
      bnot: "⌐",
      Bopf: "𝔹",
      bopf: "𝕓",
      bot: "⊥",
      bottom: "⊥",
      bowtie: "⋈",
      boxbox: "⧉",
      boxDL: "╗",
      boxDl: "╖",
      boxdL: "╕",
      boxdl: "┐",
      boxDR: "╔",
      boxDr: "╓",
      boxdR: "╒",
      boxdr: "┌",
      boxH: "═",
      boxh: "─",
      boxHD: "╦",
      boxHd: "╤",
      boxhD: "╥",
      boxhd: "┬",
      boxHU: "╩",
      boxHu: "╧",
      boxhU: "╨",
      boxhu: "┴",
      boxminus: "⊟",
      boxplus: "⊞",
      boxtimes: "⊠",
      boxUL: "╝",
      boxUl: "╜",
      boxuL: "╛",
      boxul: "┘",
      boxUR: "╚",
      boxUr: "╙",
      boxuR: "╘",
      boxur: "└",
      boxV: "║",
      boxv: "│",
      boxVH: "╬",
      boxVh: "╫",
      boxvH: "╪",
      boxvh: "┼",
      boxVL: "╣",
      boxVl: "╢",
      boxvL: "╡",
      boxvl: "┤",
      boxVR: "╠",
      boxVr: "╟",
      boxvR: "╞",
      boxvr: "├",
      bprime: "‵",
      Breve: "˘",
      breve: "˘",
      brvbar: "¦",
      Bscr: "ℬ",
      bscr: "𝒷",
      bsemi: "⁏",
      bsim: "∽",
      bsime: "⋍",
      bsol: "\\",
      bsolb: "⧅",
      bsolhsub: "⟈",
      bull: "•",
      bullet: "•",
      bump: "≎",
      bumpE: "⪮",
      bumpe: "≏",
      Bumpeq: "≎",
      bumpeq: "≏",
      Cacute: "Ć",
      cacute: "ć",
      Cap: "⋒",
      cap: "∩",
      capand: "⩄",
      capbrcup: "⩉",
      capcap: "⩋",
      capcup: "⩇",
      capdot: "⩀",
      CapitalDifferentialD: "ⅅ",
      caps: "∩︀",
      caret: "⁁",
      caron: "ˇ",
      Cayleys: "ℭ",
      ccaps: "⩍",
      Ccaron: "Č",
      ccaron: "č",
      Ccedil: "Ç",
      ccedil: "ç",
      Ccirc: "Ĉ",
      ccirc: "ĉ",
      Cconint: "∰",
      ccups: "⩌",
      ccupssm: "⩐",
      Cdot: "Ċ",
      cdot: "ċ",
      cedil: "¸",
      Cedilla: "¸",
      cemptyv: "⦲",
      cent: "¢",
      CenterDot: "·",
      centerdot: "·",
      Cfr: "ℭ",
      cfr: "𝔠",
      CHcy: "Ч",
      chcy: "ч",
      check: "✓",
      checkmark: "✓",
      Chi: "Χ",
      chi: "χ",
      cir: "○",
      circ: "ˆ",
      circeq: "≗",
      circlearrowleft: "↺",
      circlearrowright: "↻",
      circledast: "⊛",
      circledcirc: "⊚",
      circleddash: "⊝",
      CircleDot: "⊙",
      circledR: "®",
      circledS: "Ⓢ",
      CircleMinus: "⊖",
      CirclePlus: "⊕",
      CircleTimes: "⊗",
      cirE: "⧃",
      cire: "≗",
      cirfnint: "⨐",
      cirmid: "⫯",
      cirscir: "⧂",
      ClockwiseContourIntegral: "∲",
      CloseCurlyDoubleQuote: "”",
      CloseCurlyQuote: "’",
      clubs: "♣",
      clubsuit: "♣",
      Colon: "∷",
      colon: ":",
      Colone: "⩴",
      colone: "≔",
      coloneq: "≔",
      comma: ",",
      commat: "@",
      comp: "∁",
      compfn: "∘",
      complement: "∁",
      complexes: "ℂ",
      cong: "≅",
      congdot: "⩭",
      Congruent: "≡",
      Conint: "∯",
      conint: "∮",
      ContourIntegral: "∮",
      Copf: "ℂ",
      copf: "𝕔",
      coprod: "∐",
      Coproduct: "∐",
      COPY: "©",
      copy: "©",
      copysr: "℗",
      CounterClockwiseContourIntegral: "∳",
      crarr: "↵",
      Cross: "⨯",
      cross: "✗",
      Cscr: "𝒞",
      cscr: "𝒸",
      csub: "⫏",
      csube: "⫑",
      csup: "⫐",
      csupe: "⫒",
      ctdot: "⋯",
      cudarrl: "⤸",
      cudarrr: "⤵",
      cuepr: "⋞",
      cuesc: "⋟",
      cularr: "↶",
      cularrp: "⤽",
      Cup: "⋓",
      cup: "∪",
      cupbrcap: "⩈",
      CupCap: "≍",
      cupcap: "⩆",
      cupcup: "⩊",
      cupdot: "⊍",
      cupor: "⩅",
      cups: "∪︀",
      curarr: "↷",
      curarrm: "⤼",
      curlyeqprec: "⋞",
      curlyeqsucc: "⋟",
      curlyvee: "⋎",
      curlywedge: "⋏",
      curren: "¤",
      curvearrowleft: "↶",
      curvearrowright: "↷",
      cuvee: "⋎",
      cuwed: "⋏",
      cwconint: "∲",
      cwint: "∱",
      cylcty: "⌭",
      Dagger: "‡",
      dagger: "†",
      daleth: "ℸ",
      Darr: "↡",
      dArr: "⇓",
      darr: "↓",
      dash: "‐",
      Dashv: "⫤",
      dashv: "⊣",
      dbkarow: "⤏",
      dblac: "˝",
      Dcaron: "Ď",
      dcaron: "ď",
      Dcy: "Д",
      dcy: "д",
      DD: "ⅅ",
      dd: "ⅆ",
      ddagger: "‡",
      ddarr: "⇊",
      DDotrahd: "⤑",
      ddotseq: "⩷",
      deg: "°",
      Del: "∇",
      Delta: "Δ",
      delta: "δ",
      demptyv: "⦱",
      dfisht: "⥿",
      Dfr: "𝔇",
      dfr: "𝔡",
      dHar: "⥥",
      dharl: "⇃",
      dharr: "⇂",
      DiacriticalAcute: "´",
      DiacriticalDot: "˙",
      DiacriticalDoubleAcute: "˝",
      DiacriticalGrave: "`",
      DiacriticalTilde: "˜",
      diam: "⋄",
      Diamond: "⋄",
      diamond: "⋄",
      diamondsuit: "♦",
      diams: "♦",
      die: "¨",
      DifferentialD: "ⅆ",
      digamma: "ϝ",
      disin: "⋲",
      div: "÷",
      divide: "÷",
      divideontimes: "⋇",
      divonx: "⋇",
      DJcy: "Ђ",
      djcy: "ђ",
      dlcorn: "⌞",
      dlcrop: "⌍",
      dollar: "$",
      Dopf: "𝔻",
      dopf: "𝕕",
      Dot: "¨",
      dot: "˙",
      DotDot: "⃜",
      doteq: "≐",
      doteqdot: "≑",
      DotEqual: "≐",
      dotminus: "∸",
      dotplus: "∔",
      dotsquare: "⊡",
      doublebarwedge: "⌆",
      DoubleContourIntegral: "∯",
      DoubleDot: "¨",
      DoubleDownArrow: "⇓",
      DoubleLeftArrow: "⇐",
      DoubleLeftRightArrow: "⇔",
      DoubleLeftTee: "⫤",
      DoubleLongLeftArrow: "⟸",
      DoubleLongLeftRightArrow: "⟺",
      DoubleLongRightArrow: "⟹",
      DoubleRightArrow: "⇒",
      DoubleRightTee: "⊨",
      DoubleUpArrow: "⇑",
      DoubleUpDownArrow: "⇕",
      DoubleVerticalBar: "∥",
      DownArrow: "↓",
      Downarrow: "⇓",
      downarrow: "↓",
      DownArrowBar: "⤓",
      DownArrowUpArrow: "⇵",
      DownBreve: "̑",
      downdownarrows: "⇊",
      downharpoonleft: "⇃",
      downharpoonright: "⇂",
      DownLeftRightVector: "⥐",
      DownLeftTeeVector: "⥞",
      DownLeftVector: "↽",
      DownLeftVectorBar: "⥖",
      DownRightTeeVector: "⥟",
      DownRightVector: "⇁",
      DownRightVectorBar: "⥗",
      DownTee: "⊤",
      DownTeeArrow: "↧",
      drbkarow: "⤐",
      drcorn: "⌟",
      drcrop: "⌌",
      Dscr: "𝒟",
      dscr: "𝒹",
      DScy: "Ѕ",
      dscy: "ѕ",
      dsol: "⧶",
      Dstrok: "Đ",
      dstrok: "đ",
      dtdot: "⋱",
      dtri: "▿",
      dtrif: "▾",
      duarr: "⇵",
      duhar: "⥯",
      dwangle: "⦦",
      DZcy: "Џ",
      dzcy: "џ",
      dzigrarr: "⟿",
      Eacute: "É",
      eacute: "é",
      easter: "⩮",
      Ecaron: "Ě",
      ecaron: "ě",
      ecir: "≖",
      Ecirc: "Ê",
      ecirc: "ê",
      ecolon: "≕",
      Ecy: "Э",
      ecy: "э",
      eDDot: "⩷",
      Edot: "Ė",
      eDot: "≑",
      edot: "ė",
      ee: "ⅇ",
      efDot: "≒",
      Efr: "𝔈",
      efr: "𝔢",
      eg: "⪚",
      Egrave: "È",
      egrave: "è",
      egs: "⪖",
      egsdot: "⪘",
      el: "⪙",
      Element: "∈",
      elinters: "⏧",
      ell: "ℓ",
      els: "⪕",
      elsdot: "⪗",
      Emacr: "Ē",
      emacr: "ē",
      empty: "∅",
      emptyset: "∅",
      EmptySmallSquare: "◻",
      emptyv: "∅",
      EmptyVerySmallSquare: "▫",
      emsp: " ",
      emsp13: " ",
      emsp14: " ",
      ENG: "Ŋ",
      eng: "ŋ",
      ensp: " ",
      Eogon: "Ę",
      eogon: "ę",
      Eopf: "𝔼",
      eopf: "𝕖",
      epar: "⋕",
      eparsl: "⧣",
      eplus: "⩱",
      epsi: "ε",
      Epsilon: "Ε",
      epsilon: "ε",
      epsiv: "ϵ",
      eqcirc: "≖",
      eqcolon: "≕",
      eqsim: "≂",
      eqslantgtr: "⪖",
      eqslantless: "⪕",
      Equal: "⩵",
      equals: "=",
      EqualTilde: "≂",
      equest: "≟",
      Equilibrium: "⇌",
      equiv: "≡",
      equivDD: "⩸",
      eqvparsl: "⧥",
      erarr: "⥱",
      erDot: "≓",
      Escr: "ℰ",
      escr: "ℯ",
      esdot: "≐",
      Esim: "⩳",
      esim: "≂",
      Eta: "Η",
      eta: "η",
      ETH: "Ð",
      eth: "ð",
      Euml: "Ë",
      euml: "ë",
      euro: "€",
      excl: "!",
      exist: "∃",
      Exists: "∃",
      expectation: "ℰ",
      ExponentialE: "ⅇ",
      exponentiale: "ⅇ",
      fallingdotseq: "≒",
      Fcy: "Ф",
      fcy: "ф",
      female: "♀",
      ffilig: "ﬃ",
      fflig: "ﬀ",
      ffllig: "ﬄ",
      Ffr: "𝔉",
      ffr: "𝔣",
      filig: "ﬁ",
      FilledSmallSquare: "◼",
      FilledVerySmallSquare: "▪",
      fjlig: "fj",
      flat: "♭",
      fllig: "ﬂ",
      fltns: "▱",
      fnof: "ƒ",
      Fopf: "𝔽",
      fopf: "𝕗",
      ForAll: "∀",
      forall: "∀",
      fork: "⋔",
      forkv: "⫙",
      Fouriertrf: "ℱ",
      fpartint: "⨍",
      frac12: "½",
      frac13: "⅓",
      frac14: "¼",
      frac15: "⅕",
      frac16: "⅙",
      frac18: "⅛",
      frac23: "⅔",
      frac25: "⅖",
      frac34: "¾",
      frac35: "⅗",
      frac38: "⅜",
      frac45: "⅘",
      frac56: "⅚",
      frac58: "⅝",
      frac78: "⅞",
      frasl: "⁄",
      frown: "⌢",
      Fscr: "ℱ",
      fscr: "𝒻",
      gacute: "ǵ",
      Gamma: "Γ",
      gamma: "γ",
      Gammad: "Ϝ",
      gammad: "ϝ",
      gap: "⪆",
      Gbreve: "Ğ",
      gbreve: "ğ",
      Gcedil: "Ģ",
      Gcirc: "Ĝ",
      gcirc: "ĝ",
      Gcy: "Г",
      gcy: "г",
      Gdot: "Ġ",
      gdot: "ġ",
      gE: "≧",
      ge: "≥",
      gEl: "⪌",
      gel: "⋛",
      geq: "≥",
      geqq: "≧",
      geqslant: "⩾",
      ges: "⩾",
      gescc: "⪩",
      gesdot: "⪀",
      gesdoto: "⪂",
      gesdotol: "⪄",
      gesl: "⋛︀",
      gesles: "⪔",
      Gfr: "𝔊",
      gfr: "𝔤",
      Gg: "⋙",
      gg: "≫",
      ggg: "⋙",
      gimel: "ℷ",
      GJcy: "Ѓ",
      gjcy: "ѓ",
      gl: "≷",
      gla: "⪥",
      glE: "⪒",
      glj: "⪤",
      gnap: "⪊",
      gnapprox: "⪊",
      gnE: "≩",
      gne: "⪈",
      gneq: "⪈",
      gneqq: "≩",
      gnsim: "⋧",
      Gopf: "𝔾",
      gopf: "𝕘",
      grave: "`",
      GreaterEqual: "≥",
      GreaterEqualLess: "⋛",
      GreaterFullEqual: "≧",
      GreaterGreater: "⪢",
      GreaterLess: "≷",
      GreaterSlantEqual: "⩾",
      GreaterTilde: "≳",
      Gscr: "𝒢",
      gscr: "ℊ",
      gsim: "≳",
      gsime: "⪎",
      gsiml: "⪐",
      Gt: "≫",
      GT: ">",
      gt: ">",
      gtcc: "⪧",
      gtcir: "⩺",
      gtdot: "⋗",
      gtlPar: "⦕",
      gtquest: "⩼",
      gtrapprox: "⪆",
      gtrarr: "⥸",
      gtrdot: "⋗",
      gtreqless: "⋛",
      gtreqqless: "⪌",
      gtrless: "≷",
      gtrsim: "≳",
      gvertneqq: "≩︀",
      gvnE: "≩︀",
      Hacek: "ˇ",
      hairsp: " ",
      half: "½",
      hamilt: "ℋ",
      HARDcy: "Ъ",
      hardcy: "ъ",
      hArr: "⇔",
      harr: "↔",
      harrcir: "⥈",
      harrw: "↭",
      Hat: "^",
      hbar: "ℏ",
      Hcirc: "Ĥ",
      hcirc: "ĥ",
      hearts: "♥",
      heartsuit: "♥",
      hellip: "…",
      hercon: "⊹",
      Hfr: "ℌ",
      hfr: "𝔥",
      HilbertSpace: "ℋ",
      hksearow: "⤥",
      hkswarow: "⤦",
      hoarr: "⇿",
      homtht: "∻",
      hookleftarrow: "↩",
      hookrightarrow: "↪",
      Hopf: "ℍ",
      hopf: "𝕙",
      horbar: "―",
      HorizontalLine: "─",
      Hscr: "ℋ",
      hscr: "𝒽",
      hslash: "ℏ",
      Hstrok: "Ħ",
      hstrok: "ħ",
      HumpDownHump: "≎",
      HumpEqual: "≏",
      hybull: "⁃",
      hyphen: "‐",
      Iacute: "Í",
      iacute: "í",
      ic: "⁣",
      Icirc: "Î",
      icirc: "î",
      Icy: "И",
      icy: "и",
      Idot: "İ",
      IEcy: "Е",
      iecy: "е",
      iexcl: "¡",
      iff: "⇔",
      Ifr: "ℑ",
      ifr: "𝔦",
      Igrave: "Ì",
      igrave: "ì",
      ii: "ⅈ",
      iiiint: "⨌",
      iiint: "∭",
      iinfin: "⧜",
      iiota: "℩",
      IJlig: "Ĳ",
      ijlig: "ĳ",
      Im: "ℑ",
      Imacr: "Ī",
      imacr: "ī",
      image: "ℑ",
      ImaginaryI: "ⅈ",
      imagline: "ℐ",
      imagpart: "ℑ",
      imath: "ı",
      imof: "⊷",
      imped: "Ƶ",
      Implies: "⇒",
      in: "∈",
      incare: "℅",
      infin: "∞",
      infintie: "⧝",
      inodot: "ı",
      Int: "∬",
      int: "∫",
      intcal: "⊺",
      integers: "ℤ",
      Integral: "∫",
      intercal: "⊺",
      Intersection: "⋂",
      intlarhk: "⨗",
      intprod: "⨼",
      InvisibleComma: "⁣",
      InvisibleTimes: "⁢",
      IOcy: "Ё",
      iocy: "ё",
      Iogon: "Į",
      iogon: "į",
      Iopf: "𝕀",
      iopf: "𝕚",
      Iota: "Ι",
      iota: "ι",
      iprod: "⨼",
      iquest: "¿",
      Iscr: "ℐ",
      iscr: "𝒾",
      isin: "∈",
      isindot: "⋵",
      isinE: "⋹",
      isins: "⋴",
      isinsv: "⋳",
      isinv: "∈",
      it: "⁢",
      Itilde: "Ĩ",
      itilde: "ĩ",
      Iukcy: "І",
      iukcy: "і",
      Iuml: "Ï",
      iuml: "ï",
      Jcirc: "Ĵ",
      jcirc: "ĵ",
      Jcy: "Й",
      jcy: "й",
      Jfr: "𝔍",
      jfr: "𝔧",
      jmath: "ȷ",
      Jopf: "𝕁",
      jopf: "𝕛",
      Jscr: "𝒥",
      jscr: "𝒿",
      Jsercy: "Ј",
      jsercy: "ј",
      Jukcy: "Є",
      jukcy: "є",
      Kappa: "Κ",
      kappa: "κ",
      kappav: "ϰ",
      Kcedil: "Ķ",
      kcedil: "ķ",
      Kcy: "К",
      kcy: "к",
      Kfr: "𝔎",
      kfr: "𝔨",
      kgreen: "ĸ",
      KHcy: "Х",
      khcy: "х",
      KJcy: "Ќ",
      kjcy: "ќ",
      Kopf: "𝕂",
      kopf: "𝕜",
      Kscr: "𝒦",
      kscr: "𝓀",
      lAarr: "⇚",
      Lacute: "Ĺ",
      lacute: "ĺ",
      laemptyv: "⦴",
      lagran: "ℒ",
      Lambda: "Λ",
      lambda: "λ",
      Lang: "⟪",
      lang: "⟨",
      langd: "⦑",
      langle: "⟨",
      lap: "⪅",
      Laplacetrf: "ℒ",
      laquo: "«",
      Larr: "↞",
      lArr: "⇐",
      larr: "←",
      larrb: "⇤",
      larrbfs: "⤟",
      larrfs: "⤝",
      larrhk: "↩",
      larrlp: "↫",
      larrpl: "⤹",
      larrsim: "⥳",
      larrtl: "↢",
      lat: "⪫",
      lAtail: "⤛",
      latail: "⤙",
      late: "⪭",
      lates: "⪭︀",
      lBarr: "⤎",
      lbarr: "⤌",
      lbbrk: "❲",
      lbrace: "{",
      lbrack: "[",
      lbrke: "⦋",
      lbrksld: "⦏",
      lbrkslu: "⦍",
      Lcaron: "Ľ",
      lcaron: "ľ",
      Lcedil: "Ļ",
      lcedil: "ļ",
      lceil: "⌈",
      lcub: "{",
      Lcy: "Л",
      lcy: "л",
      ldca: "⤶",
      ldquo: "“",
      ldquor: "„",
      ldrdhar: "⥧",
      ldrushar: "⥋",
      ldsh: "↲",
      lE: "≦",
      le: "≤",
      LeftAngleBracket: "⟨",
      LeftArrow: "←",
      Leftarrow: "⇐",
      leftarrow: "←",
      LeftArrowBar: "⇤",
      LeftArrowRightArrow: "⇆",
      leftarrowtail: "↢",
      LeftCeiling: "⌈",
      LeftDoubleBracket: "⟦",
      LeftDownTeeVector: "⥡",
      LeftDownVector: "⇃",
      LeftDownVectorBar: "⥙",
      LeftFloor: "⌊",
      leftharpoondown: "↽",
      leftharpoonup: "↼",
      leftleftarrows: "⇇",
      LeftRightArrow: "↔",
      Leftrightarrow: "⇔",
      leftrightarrow: "↔",
      leftrightarrows: "⇆",
      leftrightharpoons: "⇋",
      leftrightsquigarrow: "↭",
      LeftRightVector: "⥎",
      LeftTee: "⊣",
      LeftTeeArrow: "↤",
      LeftTeeVector: "⥚",
      leftthreetimes: "⋋",
      LeftTriangle: "⊲",
      LeftTriangleBar: "⧏",
      LeftTriangleEqual: "⊴",
      LeftUpDownVector: "⥑",
      LeftUpTeeVector: "⥠",
      LeftUpVector: "↿",
      LeftUpVectorBar: "⥘",
      LeftVector: "↼",
      LeftVectorBar: "⥒",
      lEg: "⪋",
      leg: "⋚",
      leq: "≤",
      leqq: "≦",
      leqslant: "⩽",
      les: "⩽",
      lescc: "⪨",
      lesdot: "⩿",
      lesdoto: "⪁",
      lesdotor: "⪃",
      lesg: "⋚︀",
      lesges: "⪓",
      lessapprox: "⪅",
      lessdot: "⋖",
      lesseqgtr: "⋚",
      lesseqqgtr: "⪋",
      LessEqualGreater: "⋚",
      LessFullEqual: "≦",
      LessGreater: "≶",
      lessgtr: "≶",
      LessLess: "⪡",
      lesssim: "≲",
      LessSlantEqual: "⩽",
      LessTilde: "≲",
      lfisht: "⥼",
      lfloor: "⌊",
      Lfr: "𝔏",
      lfr: "𝔩",
      lg: "≶",
      lgE: "⪑",
      lHar: "⥢",
      lhard: "↽",
      lharu: "↼",
      lharul: "⥪",
      lhblk: "▄",
      LJcy: "Љ",
      ljcy: "љ",
      Ll: "⋘",
      ll: "≪",
      llarr: "⇇",
      llcorner: "⌞",
      Lleftarrow: "⇚",
      llhard: "⥫",
      lltri: "◺",
      Lmidot: "Ŀ",
      lmidot: "ŀ",
      lmoust: "⎰",
      lmoustache: "⎰",
      lnap: "⪉",
      lnapprox: "⪉",
      lnE: "≨",
      lne: "⪇",
      lneq: "⪇",
      lneqq: "≨",
      lnsim: "⋦",
      loang: "⟬",
      loarr: "⇽",
      lobrk: "⟦",
      LongLeftArrow: "⟵",
      Longleftarrow: "⟸",
      longleftarrow: "⟵",
      LongLeftRightArrow: "⟷",
      Longleftrightarrow: "⟺",
      longleftrightarrow: "⟷",
      longmapsto: "⟼",
      LongRightArrow: "⟶",
      Longrightarrow: "⟹",
      longrightarrow: "⟶",
      looparrowleft: "↫",
      looparrowright: "↬",
      lopar: "⦅",
      Lopf: "𝕃",
      lopf: "𝕝",
      loplus: "⨭",
      lotimes: "⨴",
      lowast: "∗",
      lowbar: "_",
      LowerLeftArrow: "↙",
      LowerRightArrow: "↘",
      loz: "◊",
      lozenge: "◊",
      lozf: "⧫",
      lpar: "(",
      lparlt: "⦓",
      lrarr: "⇆",
      lrcorner: "⌟",
      lrhar: "⇋",
      lrhard: "⥭",
      lrm: "‎",
      lrtri: "⊿",
      lsaquo: "‹",
      Lscr: "ℒ",
      lscr: "𝓁",
      Lsh: "↰",
      lsh: "↰",
      lsim: "≲",
      lsime: "⪍",
      lsimg: "⪏",
      lsqb: "[",
      lsquo: "‘",
      lsquor: "‚",
      Lstrok: "Ł",
      lstrok: "ł",
      Lt: "≪",
      LT: "<",
      lt: "<",
      ltcc: "⪦",
      ltcir: "⩹",
      ltdot: "⋖",
      lthree: "⋋",
      ltimes: "⋉",
      ltlarr: "⥶",
      ltquest: "⩻",
      ltri: "◃",
      ltrie: "⊴",
      ltrif: "◂",
      ltrPar: "⦖",
      lurdshar: "⥊",
      luruhar: "⥦",
      lvertneqq: "≨︀",
      lvnE: "≨︀",
      macr: "¯",
      male: "♂",
      malt: "✠",
      maltese: "✠",
      Map: "⤅",
      map: "↦",
      mapsto: "↦",
      mapstodown: "↧",
      mapstoleft: "↤",
      mapstoup: "↥",
      marker: "▮",
      mcomma: "⨩",
      Mcy: "М",
      mcy: "м",
      mdash: "—",
      mDDot: "∺",
      measuredangle: "∡",
      MediumSpace: " ",
      Mellintrf: "ℳ",
      Mfr: "𝔐",
      mfr: "𝔪",
      mho: "℧",
      micro: "µ",
      mid: "∣",
      midast: "*",
      midcir: "⫰",
      middot: "·",
      minus: "−",
      minusb: "⊟",
      minusd: "∸",
      minusdu: "⨪",
      MinusPlus: "∓",
      mlcp: "⫛",
      mldr: "…",
      mnplus: "∓",
      models: "⊧",
      Mopf: "𝕄",
      mopf: "𝕞",
      mp: "∓",
      Mscr: "ℳ",
      mscr: "𝓂",
      mstpos: "∾",
      Mu: "Μ",
      mu: "μ",
      multimap: "⊸",
      mumap: "⊸",
      nabla: "∇",
      Nacute: "Ń",
      nacute: "ń",
      nang: "∠⃒",
      nap: "≉",
      napE: "⩰̸",
      napid: "≋̸",
      napos: "ŉ",
      napprox: "≉",
      natur: "♮",
      natural: "♮",
      naturals: "ℕ",
      nbsp: " ",
      nbump: "≎̸",
      nbumpe: "≏̸",
      ncap: "⩃",
      Ncaron: "Ň",
      ncaron: "ň",
      Ncedil: "Ņ",
      ncedil: "ņ",
      ncong: "≇",
      ncongdot: "⩭̸",
      ncup: "⩂",
      Ncy: "Н",
      ncy: "н",
      ndash: "–",
      ne: "≠",
      nearhk: "⤤",
      neArr: "⇗",
      nearr: "↗",
      nearrow: "↗",
      nedot: "≐̸",
      NegativeMediumSpace: "​",
      NegativeThickSpace: "​",
      NegativeThinSpace: "​",
      NegativeVeryThinSpace: "​",
      nequiv: "≢",
      nesear: "⤨",
      nesim: "≂̸",
      NestedGreaterGreater: "≫",
      NestedLessLess: "≪",
      NewLine: `
`,
      nexist: "∄",
      nexists: "∄",
      Nfr: "𝔑",
      nfr: "𝔫",
      ngE: "≧̸",
      nge: "≱",
      ngeq: "≱",
      ngeqq: "≧̸",
      ngeqslant: "⩾̸",
      nges: "⩾̸",
      nGg: "⋙̸",
      ngsim: "≵",
      nGt: "≫⃒",
      ngt: "≯",
      ngtr: "≯",
      nGtv: "≫̸",
      nhArr: "⇎",
      nharr: "↮",
      nhpar: "⫲",
      ni: "∋",
      nis: "⋼",
      nisd: "⋺",
      niv: "∋",
      NJcy: "Њ",
      njcy: "њ",
      nlArr: "⇍",
      nlarr: "↚",
      nldr: "‥",
      nlE: "≦̸",
      nle: "≰",
      nLeftarrow: "⇍",
      nleftarrow: "↚",
      nLeftrightarrow: "⇎",
      nleftrightarrow: "↮",
      nleq: "≰",
      nleqq: "≦̸",
      nleqslant: "⩽̸",
      nles: "⩽̸",
      nless: "≮",
      nLl: "⋘̸",
      nlsim: "≴",
      nLt: "≪⃒",
      nlt: "≮",
      nltri: "⋪",
      nltrie: "⋬",
      nLtv: "≪̸",
      nmid: "∤",
      NoBreak: "⁠",
      NonBreakingSpace: " ",
      Nopf: "ℕ",
      nopf: "𝕟",
      Not: "⫬",
      not: "¬",
      NotCongruent: "≢",
      NotCupCap: "≭",
      NotDoubleVerticalBar: "∦",
      NotElement: "∉",
      NotEqual: "≠",
      NotEqualTilde: "≂̸",
      NotExists: "∄",
      NotGreater: "≯",
      NotGreaterEqual: "≱",
      NotGreaterFullEqual: "≧̸",
      NotGreaterGreater: "≫̸",
      NotGreaterLess: "≹",
      NotGreaterSlantEqual: "⩾̸",
      NotGreaterTilde: "≵",
      NotHumpDownHump: "≎̸",
      NotHumpEqual: "≏̸",
      notin: "∉",
      notindot: "⋵̸",
      notinE: "⋹̸",
      notinva: "∉",
      notinvb: "⋷",
      notinvc: "⋶",
      NotLeftTriangle: "⋪",
      NotLeftTriangleBar: "⧏̸",
      NotLeftTriangleEqual: "⋬",
      NotLess: "≮",
      NotLessEqual: "≰",
      NotLessGreater: "≸",
      NotLessLess: "≪̸",
      NotLessSlantEqual: "⩽̸",
      NotLessTilde: "≴",
      NotNestedGreaterGreater: "⪢̸",
      NotNestedLessLess: "⪡̸",
      notni: "∌",
      notniva: "∌",
      notnivb: "⋾",
      notnivc: "⋽",
      NotPrecedes: "⊀",
      NotPrecedesEqual: "⪯̸",
      NotPrecedesSlantEqual: "⋠",
      NotReverseElement: "∌",
      NotRightTriangle: "⋫",
      NotRightTriangleBar: "⧐̸",
      NotRightTriangleEqual: "⋭",
      NotSquareSubset: "⊏̸",
      NotSquareSubsetEqual: "⋢",
      NotSquareSuperset: "⊐̸",
      NotSquareSupersetEqual: "⋣",
      NotSubset: "⊂⃒",
      NotSubsetEqual: "⊈",
      NotSucceeds: "⊁",
      NotSucceedsEqual: "⪰̸",
      NotSucceedsSlantEqual: "⋡",
      NotSucceedsTilde: "≿̸",
      NotSuperset: "⊃⃒",
      NotSupersetEqual: "⊉",
      NotTilde: "≁",
      NotTildeEqual: "≄",
      NotTildeFullEqual: "≇",
      NotTildeTilde: "≉",
      NotVerticalBar: "∤",
      npar: "∦",
      nparallel: "∦",
      nparsl: "⫽⃥",
      npart: "∂̸",
      npolint: "⨔",
      npr: "⊀",
      nprcue: "⋠",
      npre: "⪯̸",
      nprec: "⊀",
      npreceq: "⪯̸",
      nrArr: "⇏",
      nrarr: "↛",
      nrarrc: "⤳̸",
      nrarrw: "↝̸",
      nRightarrow: "⇏",
      nrightarrow: "↛",
      nrtri: "⋫",
      nrtrie: "⋭",
      nsc: "⊁",
      nsccue: "⋡",
      nsce: "⪰̸",
      Nscr: "𝒩",
      nscr: "𝓃",
      nshortmid: "∤",
      nshortparallel: "∦",
      nsim: "≁",
      nsime: "≄",
      nsimeq: "≄",
      nsmid: "∤",
      nspar: "∦",
      nsqsube: "⋢",
      nsqsupe: "⋣",
      nsub: "⊄",
      nsubE: "⫅̸",
      nsube: "⊈",
      nsubset: "⊂⃒",
      nsubseteq: "⊈",
      nsubseteqq: "⫅̸",
      nsucc: "⊁",
      nsucceq: "⪰̸",
      nsup: "⊅",
      nsupE: "⫆̸",
      nsupe: "⊉",
      nsupset: "⊃⃒",
      nsupseteq: "⊉",
      nsupseteqq: "⫆̸",
      ntgl: "≹",
      Ntilde: "Ñ",
      ntilde: "ñ",
      ntlg: "≸",
      ntriangleleft: "⋪",
      ntrianglelefteq: "⋬",
      ntriangleright: "⋫",
      ntrianglerighteq: "⋭",
      Nu: "Ν",
      nu: "ν",
      num: "#",
      numero: "№",
      numsp: " ",
      nvap: "≍⃒",
      nVDash: "⊯",
      nVdash: "⊮",
      nvDash: "⊭",
      nvdash: "⊬",
      nvge: "≥⃒",
      nvgt: ">⃒",
      nvHarr: "⤄",
      nvinfin: "⧞",
      nvlArr: "⤂",
      nvle: "≤⃒",
      nvlt: "<⃒",
      nvltrie: "⊴⃒",
      nvrArr: "⤃",
      nvrtrie: "⊵⃒",
      nvsim: "∼⃒",
      nwarhk: "⤣",
      nwArr: "⇖",
      nwarr: "↖",
      nwarrow: "↖",
      nwnear: "⤧",
      Oacute: "Ó",
      oacute: "ó",
      oast: "⊛",
      ocir: "⊚",
      Ocirc: "Ô",
      ocirc: "ô",
      Ocy: "О",
      ocy: "о",
      odash: "⊝",
      Odblac: "Ő",
      odblac: "ő",
      odiv: "⨸",
      odot: "⊙",
      odsold: "⦼",
      OElig: "Œ",
      oelig: "œ",
      ofcir: "⦿",
      Ofr: "𝔒",
      ofr: "𝔬",
      ogon: "˛",
      Ograve: "Ò",
      ograve: "ò",
      ogt: "⧁",
      ohbar: "⦵",
      ohm: "Ω",
      oint: "∮",
      olarr: "↺",
      olcir: "⦾",
      olcross: "⦻",
      oline: "‾",
      olt: "⧀",
      Omacr: "Ō",
      omacr: "ō",
      Omega: "Ω",
      omega: "ω",
      Omicron: "Ο",
      omicron: "ο",
      omid: "⦶",
      ominus: "⊖",
      Oopf: "𝕆",
      oopf: "𝕠",
      opar: "⦷",
      OpenCurlyDoubleQuote: "“",
      OpenCurlyQuote: "‘",
      operp: "⦹",
      oplus: "⊕",
      Or: "⩔",
      or: "∨",
      orarr: "↻",
      ord: "⩝",
      order: "ℴ",
      orderof: "ℴ",
      ordf: "ª",
      ordm: "º",
      origof: "⊶",
      oror: "⩖",
      orslope: "⩗",
      orv: "⩛",
      oS: "Ⓢ",
      Oscr: "𝒪",
      oscr: "ℴ",
      Oslash: "Ø",
      oslash: "ø",
      osol: "⊘",
      Otilde: "Õ",
      otilde: "õ",
      Otimes: "⨷",
      otimes: "⊗",
      otimesas: "⨶",
      Ouml: "Ö",
      ouml: "ö",
      ovbar: "⌽",
      OverBar: "‾",
      OverBrace: "⏞",
      OverBracket: "⎴",
      OverParenthesis: "⏜",
      par: "∥",
      para: "¶",
      parallel: "∥",
      parsim: "⫳",
      parsl: "⫽",
      part: "∂",
      PartialD: "∂",
      Pcy: "П",
      pcy: "п",
      percnt: "%",
      period: ".",
      permil: "‰",
      perp: "⊥",
      pertenk: "‱",
      Pfr: "𝔓",
      pfr: "𝔭",
      Phi: "Φ",
      phi: "φ",
      phiv: "ϕ",
      phmmat: "ℳ",
      phone: "☎",
      Pi: "Π",
      pi: "π",
      pitchfork: "⋔",
      piv: "ϖ",
      planck: "ℏ",
      planckh: "ℎ",
      plankv: "ℏ",
      plus: "+",
      plusacir: "⨣",
      plusb: "⊞",
      pluscir: "⨢",
      plusdo: "∔",
      plusdu: "⨥",
      pluse: "⩲",
      PlusMinus: "±",
      plusmn: "±",
      plussim: "⨦",
      plustwo: "⨧",
      pm: "±",
      Poincareplane: "ℌ",
      pointint: "⨕",
      Popf: "ℙ",
      popf: "𝕡",
      pound: "£",
      Pr: "⪻",
      pr: "≺",
      prap: "⪷",
      prcue: "≼",
      prE: "⪳",
      pre: "⪯",
      prec: "≺",
      precapprox: "⪷",
      preccurlyeq: "≼",
      Precedes: "≺",
      PrecedesEqual: "⪯",
      PrecedesSlantEqual: "≼",
      PrecedesTilde: "≾",
      preceq: "⪯",
      precnapprox: "⪹",
      precneqq: "⪵",
      precnsim: "⋨",
      precsim: "≾",
      Prime: "″",
      prime: "′",
      primes: "ℙ",
      prnap: "⪹",
      prnE: "⪵",
      prnsim: "⋨",
      prod: "∏",
      Product: "∏",
      profalar: "⌮",
      profline: "⌒",
      profsurf: "⌓",
      prop: "∝",
      Proportion: "∷",
      Proportional: "∝",
      propto: "∝",
      prsim: "≾",
      prurel: "⊰",
      Pscr: "𝒫",
      pscr: "𝓅",
      Psi: "Ψ",
      psi: "ψ",
      puncsp: " ",
      Qfr: "𝔔",
      qfr: "𝔮",
      qint: "⨌",
      Qopf: "ℚ",
      qopf: "𝕢",
      qprime: "⁗",
      Qscr: "𝒬",
      qscr: "𝓆",
      quaternions: "ℍ",
      quatint: "⨖",
      quest: "?",
      questeq: "≟",
      QUOT: '"',
      quot: '"',
      rAarr: "⇛",
      race: "∽̱",
      Racute: "Ŕ",
      racute: "ŕ",
      radic: "√",
      raemptyv: "⦳",
      Rang: "⟫",
      rang: "⟩",
      rangd: "⦒",
      range: "⦥",
      rangle: "⟩",
      raquo: "»",
      Rarr: "↠",
      rArr: "⇒",
      rarr: "→",
      rarrap: "⥵",
      rarrb: "⇥",
      rarrbfs: "⤠",
      rarrc: "⤳",
      rarrfs: "⤞",
      rarrhk: "↪",
      rarrlp: "↬",
      rarrpl: "⥅",
      rarrsim: "⥴",
      Rarrtl: "⤖",
      rarrtl: "↣",
      rarrw: "↝",
      rAtail: "⤜",
      ratail: "⤚",
      ratio: "∶",
      rationals: "ℚ",
      RBarr: "⤐",
      rBarr: "⤏",
      rbarr: "⤍",
      rbbrk: "❳",
      rbrace: "}",
      rbrack: "]",
      rbrke: "⦌",
      rbrksld: "⦎",
      rbrkslu: "⦐",
      Rcaron: "Ř",
      rcaron: "ř",
      Rcedil: "Ŗ",
      rcedil: "ŗ",
      rceil: "⌉",
      rcub: "}",
      Rcy: "Р",
      rcy: "р",
      rdca: "⤷",
      rdldhar: "⥩",
      rdquo: "”",
      rdquor: "”",
      rdsh: "↳",
      Re: "ℜ",
      real: "ℜ",
      realine: "ℛ",
      realpart: "ℜ",
      reals: "ℝ",
      rect: "▭",
      REG: "®",
      reg: "®",
      ReverseElement: "∋",
      ReverseEquilibrium: "⇋",
      ReverseUpEquilibrium: "⥯",
      rfisht: "⥽",
      rfloor: "⌋",
      Rfr: "ℜ",
      rfr: "𝔯",
      rHar: "⥤",
      rhard: "⇁",
      rharu: "⇀",
      rharul: "⥬",
      Rho: "Ρ",
      rho: "ρ",
      rhov: "ϱ",
      RightAngleBracket: "⟩",
      RightArrow: "→",
      Rightarrow: "⇒",
      rightarrow: "→",
      RightArrowBar: "⇥",
      RightArrowLeftArrow: "⇄",
      rightarrowtail: "↣",
      RightCeiling: "⌉",
      RightDoubleBracket: "⟧",
      RightDownTeeVector: "⥝",
      RightDownVector: "⇂",
      RightDownVectorBar: "⥕",
      RightFloor: "⌋",
      rightharpoondown: "⇁",
      rightharpoonup: "⇀",
      rightleftarrows: "⇄",
      rightleftharpoons: "⇌",
      rightrightarrows: "⇉",
      rightsquigarrow: "↝",
      RightTee: "⊢",
      RightTeeArrow: "↦",
      RightTeeVector: "⥛",
      rightthreetimes: "⋌",
      RightTriangle: "⊳",
      RightTriangleBar: "⧐",
      RightTriangleEqual: "⊵",
      RightUpDownVector: "⥏",
      RightUpTeeVector: "⥜",
      RightUpVector: "↾",
      RightUpVectorBar: "⥔",
      RightVector: "⇀",
      RightVectorBar: "⥓",
      ring: "˚",
      risingdotseq: "≓",
      rlarr: "⇄",
      rlhar: "⇌",
      rlm: "‏",
      rmoust: "⎱",
      rmoustache: "⎱",
      rnmid: "⫮",
      roang: "⟭",
      roarr: "⇾",
      robrk: "⟧",
      ropar: "⦆",
      Ropf: "ℝ",
      ropf: "𝕣",
      roplus: "⨮",
      rotimes: "⨵",
      RoundImplies: "⥰",
      rpar: ")",
      rpargt: "⦔",
      rppolint: "⨒",
      rrarr: "⇉",
      Rrightarrow: "⇛",
      rsaquo: "›",
      Rscr: "ℛ",
      rscr: "𝓇",
      Rsh: "↱",
      rsh: "↱",
      rsqb: "]",
      rsquo: "’",
      rsquor: "’",
      rthree: "⋌",
      rtimes: "⋊",
      rtri: "▹",
      rtrie: "⊵",
      rtrif: "▸",
      rtriltri: "⧎",
      RuleDelayed: "⧴",
      ruluhar: "⥨",
      rx: "℞",
      Sacute: "Ś",
      sacute: "ś",
      sbquo: "‚",
      Sc: "⪼",
      sc: "≻",
      scap: "⪸",
      Scaron: "Š",
      scaron: "š",
      sccue: "≽",
      scE: "⪴",
      sce: "⪰",
      Scedil: "Ş",
      scedil: "ş",
      Scirc: "Ŝ",
      scirc: "ŝ",
      scnap: "⪺",
      scnE: "⪶",
      scnsim: "⋩",
      scpolint: "⨓",
      scsim: "≿",
      Scy: "С",
      scy: "с",
      sdot: "⋅",
      sdotb: "⊡",
      sdote: "⩦",
      searhk: "⤥",
      seArr: "⇘",
      searr: "↘",
      searrow: "↘",
      sect: "§",
      semi: ";",
      seswar: "⤩",
      setminus: "∖",
      setmn: "∖",
      sext: "✶",
      Sfr: "𝔖",
      sfr: "𝔰",
      sfrown: "⌢",
      sharp: "♯",
      SHCHcy: "Щ",
      shchcy: "щ",
      SHcy: "Ш",
      shcy: "ш",
      ShortDownArrow: "↓",
      ShortLeftArrow: "←",
      shortmid: "∣",
      shortparallel: "∥",
      ShortRightArrow: "→",
      ShortUpArrow: "↑",
      shy: "­",
      Sigma: "Σ",
      sigma: "σ",
      sigmaf: "ς",
      sigmav: "ς",
      sim: "∼",
      simdot: "⩪",
      sime: "≃",
      simeq: "≃",
      simg: "⪞",
      simgE: "⪠",
      siml: "⪝",
      simlE: "⪟",
      simne: "≆",
      simplus: "⨤",
      simrarr: "⥲",
      slarr: "←",
      SmallCircle: "∘",
      smallsetminus: "∖",
      smashp: "⨳",
      smeparsl: "⧤",
      smid: "∣",
      smile: "⌣",
      smt: "⪪",
      smte: "⪬",
      smtes: "⪬︀",
      SOFTcy: "Ь",
      softcy: "ь",
      sol: "/",
      solb: "⧄",
      solbar: "⌿",
      Sopf: "𝕊",
      sopf: "𝕤",
      spades: "♠",
      spadesuit: "♠",
      spar: "∥",
      sqcap: "⊓",
      sqcaps: "⊓︀",
      sqcup: "⊔",
      sqcups: "⊔︀",
      Sqrt: "√",
      sqsub: "⊏",
      sqsube: "⊑",
      sqsubset: "⊏",
      sqsubseteq: "⊑",
      sqsup: "⊐",
      sqsupe: "⊒",
      sqsupset: "⊐",
      sqsupseteq: "⊒",
      squ: "□",
      Square: "□",
      square: "□",
      SquareIntersection: "⊓",
      SquareSubset: "⊏",
      SquareSubsetEqual: "⊑",
      SquareSuperset: "⊐",
      SquareSupersetEqual: "⊒",
      SquareUnion: "⊔",
      squarf: "▪",
      squf: "▪",
      srarr: "→",
      Sscr: "𝒮",
      sscr: "𝓈",
      ssetmn: "∖",
      ssmile: "⌣",
      sstarf: "⋆",
      Star: "⋆",
      star: "☆",
      starf: "★",
      straightepsilon: "ϵ",
      straightphi: "ϕ",
      strns: "¯",
      Sub: "⋐",
      sub: "⊂",
      subdot: "⪽",
      subE: "⫅",
      sube: "⊆",
      subedot: "⫃",
      submult: "⫁",
      subnE: "⫋",
      subne: "⊊",
      subplus: "⪿",
      subrarr: "⥹",
      Subset: "⋐",
      subset: "⊂",
      subseteq: "⊆",
      subseteqq: "⫅",
      SubsetEqual: "⊆",
      subsetneq: "⊊",
      subsetneqq: "⫋",
      subsim: "⫇",
      subsub: "⫕",
      subsup: "⫓",
      succ: "≻",
      succapprox: "⪸",
      succcurlyeq: "≽",
      Succeeds: "≻",
      SucceedsEqual: "⪰",
      SucceedsSlantEqual: "≽",
      SucceedsTilde: "≿",
      succeq: "⪰",
      succnapprox: "⪺",
      succneqq: "⪶",
      succnsim: "⋩",
      succsim: "≿",
      SuchThat: "∋",
      Sum: "∑",
      sum: "∑",
      sung: "♪",
      Sup: "⋑",
      sup: "⊃",
      sup1: "¹",
      sup2: "²",
      sup3: "³",
      supdot: "⪾",
      supdsub: "⫘",
      supE: "⫆",
      supe: "⊇",
      supedot: "⫄",
      Superset: "⊃",
      SupersetEqual: "⊇",
      suphsol: "⟉",
      suphsub: "⫗",
      suplarr: "⥻",
      supmult: "⫂",
      supnE: "⫌",
      supne: "⊋",
      supplus: "⫀",
      Supset: "⋑",
      supset: "⊃",
      supseteq: "⊇",
      supseteqq: "⫆",
      supsetneq: "⊋",
      supsetneqq: "⫌",
      supsim: "⫈",
      supsub: "⫔",
      supsup: "⫖",
      swarhk: "⤦",
      swArr: "⇙",
      swarr: "↙",
      swarrow: "↙",
      swnwar: "⤪",
      szlig: "ß",
      Tab: "	",
      target: "⌖",
      Tau: "Τ",
      tau: "τ",
      tbrk: "⎴",
      Tcaron: "Ť",
      tcaron: "ť",
      Tcedil: "Ţ",
      tcedil: "ţ",
      Tcy: "Т",
      tcy: "т",
      tdot: "⃛",
      telrec: "⌕",
      Tfr: "𝔗",
      tfr: "𝔱",
      there4: "∴",
      Therefore: "∴",
      therefore: "∴",
      Theta: "Θ",
      theta: "θ",
      thetasym: "ϑ",
      thetav: "ϑ",
      thickapprox: "≈",
      thicksim: "∼",
      ThickSpace: "  ",
      thinsp: " ",
      ThinSpace: " ",
      thkap: "≈",
      thksim: "∼",
      THORN: "Þ",
      thorn: "þ",
      Tilde: "∼",
      tilde: "˜",
      TildeEqual: "≃",
      TildeFullEqual: "≅",
      TildeTilde: "≈",
      times: "×",
      timesb: "⊠",
      timesbar: "⨱",
      timesd: "⨰",
      tint: "∭",
      toea: "⤨",
      top: "⊤",
      topbot: "⌶",
      topcir: "⫱",
      Topf: "𝕋",
      topf: "𝕥",
      topfork: "⫚",
      tosa: "⤩",
      tprime: "‴",
      TRADE: "™",
      trade: "™",
      triangle: "▵",
      triangledown: "▿",
      triangleleft: "◃",
      trianglelefteq: "⊴",
      triangleq: "≜",
      triangleright: "▹",
      trianglerighteq: "⊵",
      tridot: "◬",
      trie: "≜",
      triminus: "⨺",
      TripleDot: "⃛",
      triplus: "⨹",
      trisb: "⧍",
      tritime: "⨻",
      trpezium: "⏢",
      Tscr: "𝒯",
      tscr: "𝓉",
      TScy: "Ц",
      tscy: "ц",
      TSHcy: "Ћ",
      tshcy: "ћ",
      Tstrok: "Ŧ",
      tstrok: "ŧ",
      twixt: "≬",
      twoheadleftarrow: "↞",
      twoheadrightarrow: "↠",
      Uacute: "Ú",
      uacute: "ú",
      Uarr: "↟",
      uArr: "⇑",
      uarr: "↑",
      Uarrocir: "⥉",
      Ubrcy: "Ў",
      ubrcy: "ў",
      Ubreve: "Ŭ",
      ubreve: "ŭ",
      Ucirc: "Û",
      ucirc: "û",
      Ucy: "У",
      ucy: "у",
      udarr: "⇅",
      Udblac: "Ű",
      udblac: "ű",
      udhar: "⥮",
      ufisht: "⥾",
      Ufr: "𝔘",
      ufr: "𝔲",
      Ugrave: "Ù",
      ugrave: "ù",
      uHar: "⥣",
      uharl: "↿",
      uharr: "↾",
      uhblk: "▀",
      ulcorn: "⌜",
      ulcorner: "⌜",
      ulcrop: "⌏",
      ultri: "◸",
      Umacr: "Ū",
      umacr: "ū",
      uml: "¨",
      UnderBar: "_",
      UnderBrace: "⏟",
      UnderBracket: "⎵",
      UnderParenthesis: "⏝",
      Union: "⋃",
      UnionPlus: "⊎",
      Uogon: "Ų",
      uogon: "ų",
      Uopf: "𝕌",
      uopf: "𝕦",
      UpArrow: "↑",
      Uparrow: "⇑",
      uparrow: "↑",
      UpArrowBar: "⤒",
      UpArrowDownArrow: "⇅",
      UpDownArrow: "↕",
      Updownarrow: "⇕",
      updownarrow: "↕",
      UpEquilibrium: "⥮",
      upharpoonleft: "↿",
      upharpoonright: "↾",
      uplus: "⊎",
      UpperLeftArrow: "↖",
      UpperRightArrow: "↗",
      Upsi: "ϒ",
      upsi: "υ",
      upsih: "ϒ",
      Upsilon: "Υ",
      upsilon: "υ",
      UpTee: "⊥",
      UpTeeArrow: "↥",
      upuparrows: "⇈",
      urcorn: "⌝",
      urcorner: "⌝",
      urcrop: "⌎",
      Uring: "Ů",
      uring: "ů",
      urtri: "◹",
      Uscr: "𝒰",
      uscr: "𝓊",
      utdot: "⋰",
      Utilde: "Ũ",
      utilde: "ũ",
      utri: "▵",
      utrif: "▴",
      uuarr: "⇈",
      Uuml: "Ü",
      uuml: "ü",
      uwangle: "⦧",
      vangrt: "⦜",
      varepsilon: "ϵ",
      varkappa: "ϰ",
      varnothing: "∅",
      varphi: "ϕ",
      varpi: "ϖ",
      varpropto: "∝",
      vArr: "⇕",
      varr: "↕",
      varrho: "ϱ",
      varsigma: "ς",
      varsubsetneq: "⊊︀",
      varsubsetneqq: "⫋︀",
      varsupsetneq: "⊋︀",
      varsupsetneqq: "⫌︀",
      vartheta: "ϑ",
      vartriangleleft: "⊲",
      vartriangleright: "⊳",
      Vbar: "⫫",
      vBar: "⫨",
      vBarv: "⫩",
      Vcy: "В",
      vcy: "в",
      VDash: "⊫",
      Vdash: "⊩",
      vDash: "⊨",
      vdash: "⊢",
      Vdashl: "⫦",
      Vee: "⋁",
      vee: "∨",
      veebar: "⊻",
      veeeq: "≚",
      vellip: "⋮",
      Verbar: "‖",
      verbar: "|",
      Vert: "‖",
      vert: "|",
      VerticalBar: "∣",
      VerticalLine: "|",
      VerticalSeparator: "❘",
      VerticalTilde: "≀",
      VeryThinSpace: " ",
      Vfr: "𝔙",
      vfr: "𝔳",
      vltri: "⊲",
      vnsub: "⊂⃒",
      vnsup: "⊃⃒",
      Vopf: "𝕍",
      vopf: "𝕧",
      vprop: "∝",
      vrtri: "⊳",
      Vscr: "𝒱",
      vscr: "𝓋",
      vsubnE: "⫋︀",
      vsubne: "⊊︀",
      vsupnE: "⫌︀",
      vsupne: "⊋︀",
      Vvdash: "⊪",
      vzigzag: "⦚",
      Wcirc: "Ŵ",
      wcirc: "ŵ",
      wedbar: "⩟",
      Wedge: "⋀",
      wedge: "∧",
      wedgeq: "≙",
      weierp: "℘",
      Wfr: "𝔚",
      wfr: "𝔴",
      Wopf: "𝕎",
      wopf: "𝕨",
      wp: "℘",
      wr: "≀",
      wreath: "≀",
      Wscr: "𝒲",
      wscr: "𝓌",
      xcap: "⋂",
      xcirc: "◯",
      xcup: "⋃",
      xdtri: "▽",
      Xfr: "𝔛",
      xfr: "𝔵",
      xhArr: "⟺",
      xharr: "⟷",
      Xi: "Ξ",
      xi: "ξ",
      xlArr: "⟸",
      xlarr: "⟵",
      xmap: "⟼",
      xnis: "⋻",
      xodot: "⨀",
      Xopf: "𝕏",
      xopf: "𝕩",
      xoplus: "⨁",
      xotime: "⨂",
      xrArr: "⟹",
      xrarr: "⟶",
      Xscr: "𝒳",
      xscr: "𝓍",
      xsqcup: "⨆",
      xuplus: "⨄",
      xutri: "△",
      xvee: "⋁",
      xwedge: "⋀",
      Yacute: "Ý",
      yacute: "ý",
      YAcy: "Я",
      yacy: "я",
      Ycirc: "Ŷ",
      ycirc: "ŷ",
      Ycy: "Ы",
      ycy: "ы",
      yen: "¥",
      Yfr: "𝔜",
      yfr: "𝔶",
      YIcy: "Ї",
      yicy: "ї",
      Yopf: "𝕐",
      yopf: "𝕪",
      Yscr: "𝒴",
      yscr: "𝓎",
      YUcy: "Ю",
      yucy: "ю",
      Yuml: "Ÿ",
      yuml: "ÿ",
      Zacute: "Ź",
      zacute: "ź",
      Zcaron: "Ž",
      zcaron: "ž",
      Zcy: "З",
      zcy: "з",
      Zdot: "Ż",
      zdot: "ż",
      zeetrf: "ℨ",
      ZeroWidthSpace: "​",
      Zeta: "Ζ",
      zeta: "ζ",
      Zfr: "ℨ",
      zfr: "𝔷",
      ZHcy: "Ж",
      zhcy: "ж",
      zigrarr: "⇝",
      Zopf: "ℤ",
      zopf: "𝕫",
      Zscr: "𝒵",
      zscr: "𝓏",
      zwj: "‍",
      zwnj: "‌"
    }), h.entityMap = h.HTML_ENTITIES;
  }(vt)), vt;
}
var ct = {}, Bt;
function wr() {
  if (Bt) return ct;
  Bt = 1;
  var h = ut(), u = rr(), r = pt(), i = h.isHTMLEscapableRawTextElement, a = h.isHTMLMimeType, s = h.isHTMLRawTextElement, c = h.hasOwn, f = h.NAMESPACE, g = r.ParseError, N = r.DOMException, T = 0, m = 1, M = 2, E = 3, I = 4, O = 5, J = 6, w = 7;
  function G() {
  }
  G.prototype = {
    parse: function(l, d, A) {
      var y = this.domBuilder;
      y.startDocument(), H(d, d = /* @__PURE__ */ Object.create(null)), K(l, d, A, y, this.errorHandler), y.endDocument();
    }
  };
  var V = /&#?\w+;?/g;
  function K(l, d, A, y, q) {
    var v = a(y.mimeType);
    if (l.indexOf(u.UNICODE_REPLACEMENT_CHARACTER) >= 0)
      return q.fatalError("Unicode replacement character detected, source encoding issues?");
    function z(Y) {
      if (Y > 65535) {
        Y -= 65536;
        var ue = 55296 + (Y >> 10), ve = 56320 + (Y & 1023);
        return String.fromCharCode(ue, ve);
      } else
        return String.fromCharCode(Y);
    }
    function Q(Y) {
      var ue = Y[Y.length - 1] === ";" ? Y : Y + ";";
      if (!v && ue !== Y)
        return q.error("EntityRef: expecting ;"), Y;
      var ve = u.Reference.exec(ue);
      if (!ve || ve[0].length !== ue.length)
        return q.error("entity not matching Reference production: " + Y), Y;
      var Ae = ue.slice(1, -1);
      return c(A, Ae) ? A[Ae] : Ae.charAt(0) === "#" ? z(parseInt(Ae.substr(1).replace("x", "0x"))) : (q.error("entity not found:" + Y), Y);
    }
    function F(Y) {
      if (Y > oe) {
        var ue = l.substring(oe, Y).replace(V, Q);
        ne && b(oe), y.characters(ue, 0, Y - oe), oe = Y;
      }
    }
    function b(Y, ue) {
      for (; Y >= k && (ue = re.exec(l)); )
        B = ue.index, k = B + ue[0].length, ne.lineNumber++;
      ne.columnNumber = Y - B + 1;
    }
    for (var B = 0, k = 0, re = /.*(?:\r\n?|\n)|.*$/g, ne = y.locator, Te = [{ currentNSMap: d }], Ee = [], oe = 0; ; ) {
      try {
        var U = l.indexOf("<", oe);
        if (U < 0) {
          if (!v && Ee.length > 0)
            return q.fatalError("unclosed xml tag(s): " + Ee.join(", "));
          if (!l.substring(oe).match(/^\s*$/)) {
            var Be = y.doc, _e = Be.createTextNode(l.substr(oe));
            if (Be.documentElement)
              return q.error("Extra content at the end of the document");
            Be.appendChild(_e), y.currentElement = _e;
          }
          return;
        }
        if (U > oe) {
          var me = l.substring(oe, U);
          !v && Ee.length === 0 && (me = me.replace(new RegExp(u.S_OPT.source, "g"), ""), me && q.error("Unexpected content outside root element: '" + me + "'")), F(U);
        }
        switch (l.charAt(U + 1)) {
          case "/":
            var ce = l.indexOf(">", U + 2), Ce = l.substring(U + 2, ce > 0 ? ce : void 0);
            if (!Ce)
              return q.fatalError("end tag name missing");
            var be = ce > 0 && u.reg("^", u.QName_group, u.S_OPT, "$").exec(Ce);
            if (!be)
              return q.fatalError('end tag name contains invalid characters: "' + Ce + '"');
            if (!y.currentElement && !y.doc.documentElement)
              return;
            var Oe = Ee[Ee.length - 1] || y.currentElement.tagName || y.doc.documentElement.tagName || "";
            if (Oe !== be[1]) {
              var Qe = be[1].toLowerCase();
              if (!v || Oe.toLowerCase() !== Qe)
                return q.fatalError('Opening and ending tag mismatch: "' + Oe + '" != "' + Ce + '"');
            }
            var qe = Te.pop();
            Ee.pop();
            var Ie = qe.localNSMap;
            if (y.endElement(qe.uri, qe.localName, Oe), Ie)
              for (var De in Ie)
                c(Ie, De) && y.endPrefixMapping(De);
            ce++;
            break;
          // end element
          case "?":
            ne && b(U), ce = _(l, U, y, q);
            break;
          case "!":
            ne && b(U), ce = P(l, U, y, q, v);
            break;
          default:
            ne && b(U);
            var te = new R(), Le = Te[Te.length - 1].currentNSMap, ce = p(l, U, te, Le, Q, q, v), ke = te.length;
            if (te.closed || (v && h.isHTMLVoidElement(te.tagName) ? te.closed = !0 : Ee.push(te.tagName)), ne && ke) {
              for (var it = ee(ne, {}), Me = 0; Me < ke; Me++) {
                var Ue = te[Me];
                b(Ue.offset), Ue.locator = ee(ne, {});
              }
              y.locator = it, S(te, y, Le) && Te.push(te), y.locator = ne;
            } else
              S(te, y, Le) && Te.push(te);
            v && !te.closed ? ce = L(l, ce, te.tagName, Q, y) : ce++;
        }
      } catch (Y) {
        if (Y instanceof g)
          throw Y;
        if (Y instanceof N)
          throw new g(Y.name + ": " + Y.message, y.locator, Y);
        q.error("element parse error: " + Y), ce = -1;
      }
      ce > oe ? oe = ce : F(Math.max(U, oe) + 1);
    }
  }
  function ee(l, d) {
    return d.lineNumber = l.lineNumber, d.columnNumber = l.columnNumber, d;
  }
  function p(l, d, A, y, q, v, z) {
    function Q(ne, Te, Ee) {
      if (c(A.attributeNames, ne))
        return v.fatalError("Attribute " + ne + " redefined");
      if (!z && Te.indexOf("<") >= 0)
        return v.fatalError("Unescaped '<' not allowed in attributes values");
      A.addValue(
        ne,
        // @see https://www.w3.org/TR/xml/#AVNormalize
        // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
        // - recursive replacement of (DTD) entity references
        // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
        Te.replace(/[\t\n\r]/g, " ").replace(V, q),
        Ee
      );
    }
    for (var F, b, B = ++d, k = T; ; ) {
      var re = l.charAt(B);
      switch (re) {
        case "=":
          if (k === m)
            F = l.slice(d, B), k = E;
          else if (k === M)
            k = E;
          else
            throw new Error("attribute equal must after attrName");
          break;
        case "'":
        case '"':
          if (k === E || k === m)
            if (k === m && (v.warning('attribute value must after "="'), F = l.slice(d, B)), d = B + 1, B = l.indexOf(re, d), B > 0)
              b = l.slice(d, B), Q(F, b, d - 1), k = O;
            else
              throw new Error("attribute value no end '" + re + "' match");
          else if (k == I)
            b = l.slice(d, B), Q(F, b, d), v.warning('attribute "' + F + '" missed start quot(' + re + ")!!"), d = B + 1, k = O;
          else
            throw new Error('attribute value must after "="');
          break;
        case "/":
          switch (k) {
            case T:
              A.setTagName(l.slice(d, B));
            case O:
            case J:
            case w:
              k = w, A.closed = !0;
            case I:
            case m:
              break;
            case M:
              A.closed = !0;
              break;
            //case S_EQ:
            default:
              throw new Error("attribute invalid close char('/')");
          }
          break;
        case "":
          return v.error("unexpected end of input"), k == T && A.setTagName(l.slice(d, B)), B;
        case ">":
          switch (k) {
            case T:
              A.setTagName(l.slice(d, B));
            case O:
            case J:
            case w:
              break;
            //normal
            case I:
            //Compatible state
            case m:
              b = l.slice(d, B), b.slice(-1) === "/" && (A.closed = !0, b = b.slice(0, -1));
            case M:
              k === M && (b = F), k == I ? (v.warning('attribute "' + b + '" missed quot(")!'), Q(F, b, d)) : (z || v.warning('attribute "' + b + '" missed value!! "' + b + '" instead!!'), Q(b, b, d));
              break;
            case E:
              if (!z)
                return v.fatalError(`AttValue: ' or " expected`);
          }
          return B;
        /*xml space '\x20' | #x9 | #xD | #xA; */
        case "":
          re = " ";
        default:
          if (re <= " ")
            switch (k) {
              case T:
                A.setTagName(l.slice(d, B)), k = J;
                break;
              case m:
                F = l.slice(d, B), k = M;
                break;
              case I:
                var b = l.slice(d, B);
                v.warning('attribute "' + b + '" missed quot(")!!'), Q(F, b, d);
              case O:
                k = J;
                break;
            }
          else
            switch (k) {
              //case S_TAG:void();break;
              //case S_ATTR:void();break;
              //case S_ATTR_NOQUOT_VALUE:void();break;
              case M:
                z || v.warning('attribute "' + F + '" missed value!! "' + F + '" instead2!!'), Q(F, F, d), d = B, k = m;
                break;
              case O:
                v.warning('attribute space is required"' + F + '"!!');
              case J:
                k = m, d = B;
                break;
              case E:
                k = I, d = B;
                break;
              case w:
                throw new Error("elements closed character '/' and '>' must be connected to");
            }
      }
      B++;
    }
  }
  function S(l, d, A) {
    for (var y = l.tagName, q = null, k = l.length; k--; ) {
      var v = l[k], z = v.qName, Q = v.value, re = z.indexOf(":");
      if (re > 0)
        var F = v.prefix = z.slice(0, re), b = z.slice(re + 1), B = F === "xmlns" && b;
      else
        b = z, F = null, B = z === "xmlns" && "";
      v.localName = b, B !== !1 && (q == null && (q = /* @__PURE__ */ Object.create(null), H(A, A = /* @__PURE__ */ Object.create(null))), A[B] = q[B] = Q, v.uri = f.XMLNS, d.startPrefixMapping(B, Q));
    }
    for (var k = l.length; k--; )
      v = l[k], v.prefix && (v.prefix === "xml" && (v.uri = f.XML), v.prefix !== "xmlns" && (v.uri = A[v.prefix]));
    var re = y.indexOf(":");
    re > 0 ? (F = l.prefix = y.slice(0, re), b = l.localName = y.slice(re + 1)) : (F = null, b = l.localName = y);
    var ne = l.uri = A[F || ""];
    if (d.startElement(ne, b, y, l), l.closed) {
      if (d.endElement(ne, b, y), q)
        for (F in q)
          c(q, F) && d.endPrefixMapping(F);
    } else
      return l.currentNSMap = A, l.localNSMap = q, !0;
  }
  function L(l, d, A, y, q) {
    var v = i(A);
    if (v || s(A)) {
      var z = l.indexOf("</" + A + ">", d), Q = l.substring(d + 1, z);
      return v && (Q = Q.replace(V, y)), q.characters(Q, 0, Q.length), z;
    }
    return d + 1;
  }
  function H(l, d) {
    for (var A in l)
      c(l, A) && (d[A] = l[A]);
  }
  function W(l, d) {
    var A = d;
    function y(b) {
      return b = b || 0, l.charAt(A + b);
    }
    function q(b) {
      b = b || 1, A += b;
    }
    function v() {
      for (var b = 0; A < l.length; ) {
        var B = y();
        if (B !== " " && B !== `
` && B !== "	" && B !== "\r")
          return b;
        b++, q();
      }
      return -1;
    }
    function z() {
      return l.substring(A);
    }
    function Q(b) {
      return l.substring(A, A + b.length) === b;
    }
    function F(b) {
      var B = u.reg("^", b), k = B.exec(z());
      return k ? (q(k[0].length), k[0]) : null;
    }
    return {
      char: y,
      getIndex: function() {
        return A;
      },
      getMatch: F,
      getSource: function() {
        return l;
      },
      skip: q,
      skipBlanks: v,
      substringFromIndex: z,
      substringStartsWith: Q
    };
  }
  function C(l, d) {
    function A(Q, F) {
      var b = u.PI.exec(Q.substringFromIndex());
      return b ? b[1].toLowerCase() === "xml" ? F.fatalError(
        "xml declaration is only allowed at the start of the document, but found at position " + Q.getIndex()
      ) : (Q.skip(b[0].length), b[0]) : F.fatalError("processing instruction is not well-formed at position " + Q.getIndex());
    }
    var y = l.getSource();
    if (l.char() === "[") {
      l.skip(1);
      for (var q = l.getIndex(); l.getIndex() < y.length; ) {
        if (l.skipBlanks(), l.char() === "]") {
          var v = y.substring(q, l.getIndex());
          return l.skip(1), v;
        }
        var z = null;
        if (l.char() === "<" && l.char(1) === "!")
          switch (l.char(2)) {
            case "E":
              l.char(3) === "L" ? z = l.getMatch(u.elementdecl) : l.char(3) === "N" && (z = l.getMatch(u.EntityDecl));
              break;
            case "A":
              z = l.getMatch(u.AttlistDecl);
              break;
            case "N":
              z = l.getMatch(u.NotationDecl);
              break;
            case "-":
              z = l.getMatch(u.Comment);
              break;
          }
        else if (l.char() === "<" && l.char(1) === "?")
          z = A(l, d);
        else if (l.char() === "%")
          z = l.getMatch(u.PEReference);
        else
          return d.fatalError("Error detected in Markup declaration");
        if (!z)
          return d.fatalError("Error in internal subset at position " + l.getIndex());
      }
      return d.fatalError("doctype internal subset is not well-formed, missing ]");
    }
  }
  function P(l, d, A, y, q) {
    var v = W(l, d);
    switch (v.char(2)) {
      case "-":
        var z = v.getMatch(u.Comment);
        return z ? (A.comment(z, u.COMMENT_START.length, z.length - u.COMMENT_START.length - u.COMMENT_END.length), v.getIndex()) : y.fatalError("comment is not well-formed at position " + v.getIndex());
      case "[":
        var Q = v.getMatch(u.CDSect);
        return Q ? !q && !A.currentElement ? y.fatalError("CDATA outside of element") : (A.startCDATA(), A.characters(Q, u.CDATA_START.length, Q.length - u.CDATA_START.length - u.CDATA_END.length), A.endCDATA(), v.getIndex()) : y.fatalError("Invalid CDATA starting at position " + d);
      case "D": {
        if (A.doc && A.doc.documentElement)
          return y.fatalError("Doctype not allowed inside or after documentElement at position " + v.getIndex());
        if (!v.substringStartsWith(u.DOCTYPE_DECL_START))
          return y.fatalError("Expected " + u.DOCTYPE_DECL_START + " at position " + v.getIndex());
        if (v.skip(u.DOCTYPE_DECL_START.length), v.skipBlanks() < 1)
          return y.fatalError("Expected whitespace after " + u.DOCTYPE_DECL_START + " at position " + v.getIndex());
        var F = {
          name: void 0,
          publicId: void 0,
          systemId: void 0,
          internalSubset: void 0
        };
        if (F.name = v.getMatch(u.Name), !F.name)
          return y.fatalError("doctype name missing or contains unexpected characters at position " + v.getIndex());
        if (v.skipBlanks(), v.substringStartsWith(u.PUBLIC) || v.substringStartsWith(u.SYSTEM)) {
          var b = u.ExternalID_match.exec(v.substringFromIndex());
          if (!b)
            return y.fatalError("doctype external id is not well-formed at position " + v.getIndex());
          b.groups.SystemLiteralOnly !== void 0 ? F.systemId = b.groups.SystemLiteralOnly : (F.systemId = b.groups.SystemLiteral, F.publicId = b.groups.PubidLiteral), v.skip(b[0].length);
        }
        return v.skipBlanks(), F.internalSubset = C(v, y), v.skipBlanks(), v.char() !== ">" ? y.fatalError("doctype not terminated with > at position " + v.getIndex()) : (v.skip(1), A.startDTD(F.name, F.publicId, F.systemId, F.internalSubset), A.endDTD(), v.getIndex());
      }
      default:
        return y.fatalError('Not well-formed XML starting with "<!" at position ' + d);
    }
  }
  function _(l, d, A, y) {
    var q = l.substring(d).match(u.PI);
    if (!q)
      return y.fatalError("Invalid processing instruction starting at position " + d);
    if (q[1].toLowerCase() === "xml") {
      if (d > 0)
        return y.fatalError(
          "processing instruction at position " + d + " is an xml declaration which is only at the start of the document"
        );
      if (!u.XMLDecl.test(l.substring(d)))
        return y.fatalError("xml declaration is not well-formed");
    }
    return A.processingInstruction(q[1], q[2]), d + q[0].length;
  }
  function R() {
    this.attributeNames = /* @__PURE__ */ Object.create(null);
  }
  return R.prototype = {
    setTagName: function(l) {
      if (!u.QName_exact.test(l))
        throw new Error("invalid tagName:" + l);
      this.tagName = l;
    },
    addValue: function(l, d, A) {
      if (!u.QName_exact.test(l))
        throw new Error("invalid attribute:" + l);
      this.attributeNames[l] = this.length, this[this.length++] = { qName: l, value: d, offset: A };
    },
    length: 0,
    getLocalName: function(l) {
      return this[l].localName;
    },
    getLocator: function(l) {
      return this[l].locator;
    },
    getQName: function(l) {
      return this[l].qName;
    },
    getURI: function(l) {
      return this[l].uri;
    },
    getValue: function(l) {
      return this[l].value;
    }
    //	,getIndex:function(uri, localName)){
    //		if(localName){
    //
    //		}else{
    //			var qName = uri
    //		}
    //	},
    //	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
    //	getType:function(uri,localName){}
    //	getType:function(i){},
  }, ct.XMLReader = G, ct.parseUtils = W, ct.parseDoctypeCommentOrCData = P, ct;
}
var It;
function Nr() {
  if (It) return je;
  It = 1;
  var h = ut(), u = ur(), r = pt(), i = yr(), a = wr(), s = u.DOMImplementation, c = h.hasDefaultHTMLNamespace, f = h.isHTMLMimeType, g = h.isValidMimeType, N = h.MIME_TYPE, T = h.NAMESPACE, m = r.ParseError, M = a.XMLReader;
  function E(p) {
    return p.replace(/\r[\n\u0085]/g, `
`).replace(/[\r\u0085\u2028]/g, `
`);
  }
  function I(p) {
    if (p = p || { locator: !0 }, this.assign = p.assign || h.assign, this.domHandler = p.domHandler || O, this.onError = p.onError || p.errorHandler, p.errorHandler && typeof p.errorHandler != "function")
      throw new TypeError("errorHandler object is no longer supported, switch to onError!");
    p.errorHandler && p.errorHandler("warning", "The `errorHandler` option has been deprecated, use `onError` instead!", this), this.normalizeLineEndings = p.normalizeLineEndings || E, this.locator = !!p.locator, this.xmlns = this.assign(/* @__PURE__ */ Object.create(null), p.xmlns);
  }
  I.prototype.parseFromString = function(p, S) {
    if (!g(S))
      throw new TypeError('DOMParser.parseFromString: the provided mimeType "' + S + '" is not valid.');
    var L = this.assign(/* @__PURE__ */ Object.create(null), this.xmlns), H = i.XML_ENTITIES, W = L[""] || null;
    c(S) ? (H = i.HTML_ENTITIES, W = T.HTML) : S === N.XML_SVG_IMAGE && (W = T.SVG), L[""] = W, L.xml = L.xml || T.XML;
    var C = new this.domHandler({
      mimeType: S,
      defaultNamespace: W,
      onError: this.onError
    }), P = this.locator ? {} : void 0;
    this.locator && C.setDocumentLocator(P);
    var _ = new M();
    _.errorHandler = C, _.domBuilder = C;
    var R = !h.isHTMLMimeType(S);
    return R && typeof p != "string" && _.errorHandler.fatalError("source is not a string"), _.parse(this.normalizeLineEndings(String(p)), L, H), C.doc.documentElement || _.errorHandler.fatalError("missing root element"), C.doc;
  };
  function O(p) {
    var S = p || {};
    this.mimeType = S.mimeType || N.XML_APPLICATION, this.defaultNamespace = S.defaultNamespace || null, this.cdata = !1, this.currentElement = void 0, this.doc = void 0, this.locator = void 0, this.onError = S.onError;
  }
  function J(p, S) {
    S.lineNumber = p.lineNumber, S.columnNumber = p.columnNumber;
  }
  O.prototype = {
    /**
     * Either creates an XML or an HTML document and stores it under `this.doc`.
     * If it is an XML document, `this.defaultNamespace` is used to create it,
     * and it will not contain any `childNodes`.
     * If it is an HTML document, it will be created without any `childNodes`.
     *
     * @see http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
     */
    startDocument: function() {
      var p = new s();
      this.doc = f(this.mimeType) ? p.createHTMLDocument(!1) : p.createDocument(this.defaultNamespace, "");
    },
    startElement: function(p, S, L, H) {
      var W = this.doc, C = W.createElementNS(p, L || S), P = H.length;
      V(this, C), this.currentElement = C, this.locator && J(this.locator, C);
      for (var _ = 0; _ < P; _++) {
        var p = H.getURI(_), R = H.getValue(_), L = H.getQName(_), l = W.createAttributeNS(p, L);
        this.locator && J(H.getLocator(_), l), l.value = l.nodeValue = R, C.setAttributeNode(l);
      }
    },
    endElement: function(p, S, L) {
      this.currentElement = this.currentElement.parentNode;
    },
    startPrefixMapping: function(p, S) {
    },
    endPrefixMapping: function(p) {
    },
    processingInstruction: function(p, S) {
      var L = this.doc.createProcessingInstruction(p, S);
      this.locator && J(this.locator, L), V(this, L);
    },
    ignorableWhitespace: function(p, S, L) {
    },
    characters: function(p, S, L) {
      if (p = G.apply(this, arguments), p) {
        if (this.cdata)
          var H = this.doc.createCDATASection(p);
        else
          var H = this.doc.createTextNode(p);
        this.currentElement ? this.currentElement.appendChild(H) : /^\s*$/.test(p) && this.doc.appendChild(H), this.locator && J(this.locator, H);
      }
    },
    skippedEntity: function(p) {
    },
    endDocument: function() {
      this.doc.normalize();
    },
    /**
     * Stores the locator to be able to set the `columnNumber` and `lineNumber`
     * on the created DOM nodes.
     *
     * @param {Locator} locator
     */
    setDocumentLocator: function(p) {
      p && (p.lineNumber = 0), this.locator = p;
    },
    //LexicalHandler
    comment: function(p, S, L) {
      p = G.apply(this, arguments);
      var H = this.doc.createComment(p);
      this.locator && J(this.locator, H), V(this, H);
    },
    startCDATA: function() {
      this.cdata = !0;
    },
    endCDATA: function() {
      this.cdata = !1;
    },
    startDTD: function(p, S, L, H) {
      var W = this.doc.implementation;
      if (W && W.createDocumentType) {
        var C = W.createDocumentType(p, S, L, H);
        this.locator && J(this.locator, C), V(this, C), this.doc.doctype = C;
      }
    },
    reportError: function(p, S) {
      if (typeof this.onError == "function")
        try {
          this.onError(p, S, this);
        } catch (L) {
          throw new m("Reporting " + p + ' "' + S + '" caused ' + L, this.locator);
        }
      else
        console.error("[xmldom " + p + "]	" + S, w(this.locator));
    },
    /**
     * @see http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
     */
    warning: function(p) {
      this.reportError("warning", p);
    },
    error: function(p) {
      this.reportError("error", p);
    },
    /**
     * This function reports a fatal error and throws a ParseError.
     *
     * @param {string} message
     * - The message to be used for reporting and throwing the error.
     * @returns {never}
     * This function always throws an error and never returns a value.
     * @throws {ParseError}
     * Always throws a ParseError with the provided message.
     */
    fatalError: function(p) {
      throw this.reportError("fatalError", p), new m(p, this.locator);
    }
  };
  function w(p) {
    if (p)
      return `
@#[line:` + p.lineNumber + ",col:" + p.columnNumber + "]";
  }
  function G(p, S, L) {
    return typeof p == "string" ? p.substr(S, L) : p.length >= S + L || S ? new java.lang.String(p, S, L) + "" : p;
  }
  "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(
    /\w+/g,
    function(p) {
      O.prototype[p] = function() {
        return null;
      };
    }
  );
  function V(p, S) {
    p.currentElement ? p.currentElement.appendChild(S) : p.doc.appendChild(S);
  }
  function K(p) {
    if (p === "error") throw "onErrorStopParsing";
  }
  function ee() {
    throw "onWarningStopParsing";
  }
  return je.__DOMHandler = O, je.DOMParser = I, je.normalizeLineEndings = E, je.onErrorStopParsing = K, je.onWarningStopParsing = ee, je;
}
var Lt;
function _r() {
  if (Lt) return $;
  Lt = 1;
  var h = ut();
  $.assign = h.assign, $.hasDefaultHTMLNamespace = h.hasDefaultHTMLNamespace, $.isHTMLMimeType = h.isHTMLMimeType, $.isValidMimeType = h.isValidMimeType, $.MIME_TYPE = h.MIME_TYPE, $.NAMESPACE = h.NAMESPACE;
  var u = pt();
  $.ParseError = u.ParseError, $.DOMException = u.DOMException, $.ExceptionCode = u.ExceptionCode;
  var r = ur();
  $.DOMImplementation = r.DOMImplementation, $.XMLSerializer = r.XMLSerializer, $.Attr = r.Attr, $.CDATASection = r.CDATASection, $.CharacterData = r.CharacterData, $.Comment = r.Comment, $.Document = r.Document, $.DocumentFragment = r.DocumentFragment, $.DocumentType = r.DocumentType, $.Element = r.Element, $.EntityReference = r.EntityReference, $.Entity = r.Entity, $.NamedNodeMap = r.NamedNodeMap, $.Node = r.Node, $.NodeList = r.NodeList, $.Notation = r.Notation, $.ProcessingInstruction = r.ProcessingInstruction, $.Text = r.Text;
  var i = Nr();
  return $.DOMParser = i.DOMParser, $.onErrorStopParsing = i.onErrorStopParsing, $.onWarningStopParsing = i.onWarningStopParsing, $;
}
var Ut = _r();
class Sr {
  /**
   * @param {Object} options
   * @param {Element | null} [options.xml] - The XML element to parse.
   * @param {string} [options.string] - The XML element to parse as a string.
   */
  constructor(u) {
    j(this, "materials", {});
    j(this, "links", {});
    j(this, "joints", {});
    var r = u.xml, i = u.string;
    if (i) {
      var a = new Ut.DOMParser();
      r = a.parseFromString(i, Ut.MIME_TYPE.XML_TEXT).documentElement;
    }
    if (!r)
      throw new Error("No URDF document parsed!");
    var s = r;
    this.name = s.getAttribute("name");
    for (var c = s.childNodes, f = 0; f < c.length; f++) {
      var g = c[f];
      if (g.tagName === "material") {
        var N = new Tt({
          xml: g
        });
        this.materials[N.name] !== void 0 ? this.materials[N.name].isLink() ? this.materials[N.name].assign(N) : console.warn("Material " + N.name + "is not unique.") : this.materials[N.name] = N;
      } else if (g.tagName === "link") {
        var T = new tr({
          xml: g
        });
        if (this.links[T.name] !== void 0)
          console.warn("Link " + T.name + " is not unique.");
        else {
          for (var m = 0; m < T.visuals.length; m++) {
            var M = T.visuals[m].material;
            M !== null && M.name && (this.materials[M.name] !== void 0 ? T.visuals[m].material = this.materials[M.name] : this.materials[M.name] = M);
          }
          this.links[T.name] = T;
        }
      } else if (g.tagName === "joint") {
        var E = new br({
          xml: g
        });
        this.joints[E.name] = E;
      }
    }
  }
}
const xr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  URDF_BOX: jt,
  URDF_CYLINDER: Xt,
  URDF_MESH: Qt,
  URDF_SPHERE: Yt,
  UrdfBox: Wt,
  UrdfColor: Jt,
  UrdfCylinder: Zt,
  UrdfLink: tr,
  UrdfMaterial: Tt,
  UrdfMesh: $t,
  UrdfModel: Sr,
  UrdfSphere: Kt,
  UrdfVisual: er
}, Symbol.toStringTag, { value: "Module" })), Or = "1.4.1";
globalThis.ROSLIB = {
  REVISION: Or,
  ...Dr,
  ...Ar,
  ...gr,
  ...Cr,
  ...xr
};
export {
  zt as A,
  Gt as G,
  kt as P,
  Fe as Q,
  Or as R,
  ae as S,
  pe as T,
  Wt as U,
  Ne as V,
  sr as a,
  Er as b,
  gt as c,
  vr as d,
  Ht as e,
  Xe as f,
  Fr as g,
  lt as h,
  Vt as i,
  Tr as j,
  Jt as k,
  Zt as l,
  tr as m,
  Tt as n,
  $t as o,
  Sr as p,
  Kt as q,
  er as r,
  Yt as s,
  jt as t,
  Xt as u,
  Qt as v
};
