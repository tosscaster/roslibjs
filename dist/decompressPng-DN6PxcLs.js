var we = Object.defineProperty;
var be = (i, e, t) => e in i ? we(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var T = (i, e, t) => be(i, typeof e != "symbol" ? e + "" : e, t);
function _t(i, e = "utf8") {
  return new TextDecoder(e).decode(i);
}
const ge = new TextEncoder();
function xe(i) {
  return ge.encode(i);
}
const pe = 1024 * 8, ke = (() => {
  const i = new Uint8Array(4), e = new Uint32Array(i.buffer);
  return !((e[0] = 1) & i[0]);
})(), q = {
  int8: globalThis.Int8Array,
  uint8: globalThis.Uint8Array,
  int16: globalThis.Int16Array,
  uint16: globalThis.Uint16Array,
  int32: globalThis.Int32Array,
  uint32: globalThis.Uint32Array,
  uint64: globalThis.BigUint64Array,
  int64: globalThis.BigInt64Array,
  float32: globalThis.Float32Array,
  float64: globalThis.Float64Array
};
class dt {
  /**
   * Create a new IOBuffer.
   * @param data - The data to construct the IOBuffer with.
   * If data is a number, it will be the new buffer's length<br>
   * If data is `undefined`, the buffer will be initialized with a default length of 8Kb<br>
   * If data is an ArrayBuffer, SharedArrayBuffer, an ArrayBufferView (Typed Array), an IOBuffer instance,
   * or a Node.js Buffer, a view will be created over the underlying ArrayBuffer.
   * @param options - An object for the options.
   * @returns A new IOBuffer instance.
   */
  constructor(e = pe, t = {}) {
    /**
     * Reference to the internal ArrayBuffer object.
     */
    T(this, "buffer");
    /**
     * Byte length of the internal ArrayBuffer.
     */
    T(this, "byteLength");
    /**
     * Byte offset of the internal ArrayBuffer.
     */
    T(this, "byteOffset");
    /**
     * Byte length of the internal ArrayBuffer.
     */
    T(this, "length");
    /**
     * The current offset of the buffer's pointer.
     */
    T(this, "offset");
    T(this, "lastWrittenByte");
    T(this, "littleEndian");
    T(this, "_data");
    T(this, "_mark");
    T(this, "_marks");
    let s = !1;
    typeof e == "number" ? e = new ArrayBuffer(e) : (s = !0, this.lastWrittenByte = e.byteLength);
    const a = t.offset ? t.offset >>> 0 : 0, n = e.byteLength - a;
    let h = a;
    (ArrayBuffer.isView(e) || e instanceof dt) && (e.byteLength !== e.buffer.byteLength && (h = e.byteOffset + a), e = e.buffer), s ? this.lastWrittenByte = n : this.lastWrittenByte = 0, this.buffer = e, this.length = n, this.byteLength = n, this.byteOffset = h, this.offset = 0, this.littleEndian = !0, this._data = new DataView(this.buffer, h, n), this._mark = 0, this._marks = [];
  }
  /**
   * Checks if the memory allocated to the buffer is sufficient to store more
   * bytes after the offset.
   * @param byteLength - The needed memory in bytes.
   * @returns `true` if there is sufficient space and `false` otherwise.
   */
  available(e = 1) {
    return this.offset + e <= this.length;
  }
  /**
   * Check if little-endian mode is used for reading and writing multi-byte
   * values.
   * @returns `true` if little-endian mode is used, `false` otherwise.
   */
  isLittleEndian() {
    return this.littleEndian;
  }
  /**
   * Set little-endian mode for reading and writing multi-byte values.
   * @returns This.
   */
  setLittleEndian() {
    return this.littleEndian = !0, this;
  }
  /**
   * Check if big-endian mode is used for reading and writing multi-byte values.
   * @returns `true` if big-endian mode is used, `false` otherwise.
   */
  isBigEndian() {
    return !this.littleEndian;
  }
  /**
   * Switches to big-endian mode for reading and writing multi-byte values.
   * @returns This.
   */
  setBigEndian() {
    return this.littleEndian = !1, this;
  }
  /**
   * Move the pointer n bytes forward.
   * @param n - Number of bytes to skip.
   * @returns This.
   */
  skip(e = 1) {
    return this.offset += e, this;
  }
  /**
   * Move the pointer n bytes backward.
   * @param n - Number of bytes to move back.
   * @returns This.
   */
  back(e = 1) {
    return this.offset -= e, this;
  }
  /**
   * Move the pointer to the given offset.
   * @param offset - The offset to move to.
   * @returns This.
   */
  seek(e) {
    return this.offset = e, this;
  }
  /**
   * Store the current pointer offset.
   * @see {@link IOBuffer#reset}
   * @returns This.
   */
  mark() {
    return this._mark = this.offset, this;
  }
  /**
   * Move the pointer back to the last pointer offset set by mark.
   * @see {@link IOBuffer#mark}
   * @returns This.
   */
  reset() {
    return this.offset = this._mark, this;
  }
  /**
   * Push the current pointer offset to the mark stack.
   * @see {@link IOBuffer#popMark}
   * @returns This.
   */
  pushMark() {
    return this._marks.push(this.offset), this;
  }
  /**
   * Pop the last pointer offset from the mark stack, and set the current
   * pointer offset to the popped value.
   * @see {@link IOBuffer#pushMark}
   * @returns This.
   */
  popMark() {
    const e = this._marks.pop();
    if (e === void 0)
      throw new Error("Mark stack empty");
    return this.seek(e), this;
  }
  /**
   * Move the pointer offset back to 0.
   * @returns This.
   */
  rewind() {
    return this.offset = 0, this;
  }
  /**
   * Make sure the buffer has sufficient memory to write a given byteLength at
   * the current pointer offset.
   * If the buffer's memory is insufficient, this method will create a new
   * buffer (a copy) with a length that is twice (byteLength + current offset).
   * @param byteLength - The needed memory in bytes.
   * @returns This.
   */
  ensureAvailable(e = 1) {
    if (!this.available(e)) {
      const s = (this.offset + e) * 2, a = new Uint8Array(s);
      a.set(new Uint8Array(this.buffer)), this.buffer = a.buffer, this.length = s, this.byteLength = s, this._data = new DataView(this.buffer);
    }
    return this;
  }
  /**
   * Read a byte and return false if the byte's value is 0, or true otherwise.
   * Moves pointer forward by one byte.
   * @returns The read boolean.
   */
  readBoolean() {
    return this.readUint8() !== 0;
  }
  /**
   * Read a signed 8-bit integer and move pointer forward by 1 byte.
   * @returns The read byte.
   */
  readInt8() {
    return this._data.getInt8(this.offset++);
  }
  /**
   * Read an unsigned 8-bit integer and move pointer forward by 1 byte.
   * @returns The read byte.
   */
  readUint8() {
    return this._data.getUint8(this.offset++);
  }
  /**
   * Alias for {@link IOBuffer#readUint8}.
   * @returns The read byte.
   */
  readByte() {
    return this.readUint8();
  }
  /**
   * Read `n` bytes and move pointer forward by `n` bytes.
   * @param n - Number of bytes to read.
   * @returns The read bytes.
   */
  readBytes(e = 1) {
    return this.readArray(e, "uint8");
  }
  /**
   * Creates an array of corresponding to the type `type` and size `size`.
   * For example type `uint8` will create a `Uint8Array`.
   * @param size - size of the resulting array
   * @param type - number type of elements to read
   * @returns The read array.
   */
  readArray(e, t) {
    const s = q[t].BYTES_PER_ELEMENT * e, a = this.byteOffset + this.offset, n = this.buffer.slice(a, a + s);
    if (this.littleEndian === ke && t !== "uint8" && t !== "int8") {
      const f = new Uint8Array(this.buffer.slice(a, a + s));
      f.reverse();
      const g = new q[t](f.buffer);
      return this.offset += s, g.reverse(), g;
    }
    const h = new q[t](n);
    return this.offset += s, h;
  }
  /**
   * Read a 16-bit signed integer and move pointer forward by 2 bytes.
   * @returns The read value.
   */
  readInt16() {
    const e = this._data.getInt16(this.offset, this.littleEndian);
    return this.offset += 2, e;
  }
  /**
   * Read a 16-bit unsigned integer and move pointer forward by 2 bytes.
   * @returns The read value.
   */
  readUint16() {
    const e = this._data.getUint16(this.offset, this.littleEndian);
    return this.offset += 2, e;
  }
  /**
   * Read a 32-bit signed integer and move pointer forward by 4 bytes.
   * @returns The read value.
   */
  readInt32() {
    const e = this._data.getInt32(this.offset, this.littleEndian);
    return this.offset += 4, e;
  }
  /**
   * Read a 32-bit unsigned integer and move pointer forward by 4 bytes.
   * @returns The read value.
   */
  readUint32() {
    const e = this._data.getUint32(this.offset, this.littleEndian);
    return this.offset += 4, e;
  }
  /**
   * Read a 32-bit floating number and move pointer forward by 4 bytes.
   * @returns The read value.
   */
  readFloat32() {
    const e = this._data.getFloat32(this.offset, this.littleEndian);
    return this.offset += 4, e;
  }
  /**
   * Read a 64-bit floating number and move pointer forward by 8 bytes.
   * @returns The read value.
   */
  readFloat64() {
    const e = this._data.getFloat64(this.offset, this.littleEndian);
    return this.offset += 8, e;
  }
  /**
   * Read a 64-bit signed integer number and move pointer forward by 8 bytes.
   * @returns The read value.
   */
  readBigInt64() {
    const e = this._data.getBigInt64(this.offset, this.littleEndian);
    return this.offset += 8, e;
  }
  /**
   * Read a 64-bit unsigned integer number and move pointer forward by 8 bytes.
   * @returns The read value.
   */
  readBigUint64() {
    const e = this._data.getBigUint64(this.offset, this.littleEndian);
    return this.offset += 8, e;
  }
  /**
   * Read a 1-byte ASCII character and move pointer forward by 1 byte.
   * @returns The read character.
   */
  readChar() {
    return String.fromCharCode(this.readInt8());
  }
  /**
   * Read `n` 1-byte ASCII characters and move pointer forward by `n` bytes.
   * @param n - Number of characters to read.
   * @returns The read characters.
   */
  readChars(e = 1) {
    let t = "";
    for (let s = 0; s < e; s++)
      t += this.readChar();
    return t;
  }
  /**
   * Read the next `n` bytes, return a UTF-8 decoded string and move pointer
   * forward by `n` bytes.
   * @param n - Number of bytes to read.
   * @returns The decoded string.
   */
  readUtf8(e = 1) {
    return _t(this.readBytes(e));
  }
  /**
   * Read the next `n` bytes, return a string decoded with `encoding` and move pointer
   * forward by `n` bytes.
   * If no encoding is passed, the function is equivalent to @see {@link IOBuffer#readUtf8}
   * @param n - Number of bytes to read.
   * @param encoding - The encoding to use. Default is 'utf8'.
   * @returns The decoded string.
   */
  decodeText(e = 1, t = "utf8") {
    return _t(this.readBytes(e), t);
  }
  /**
   * Write 0xff if the passed value is truthy, 0x00 otherwise and move pointer
   * forward by 1 byte.
   * @param value - The value to write.
   * @returns This.
   */
  writeBoolean(e) {
    return this.writeUint8(e ? 255 : 0), this;
  }
  /**
   * Write `value` as an 8-bit signed integer and move pointer forward by 1 byte.
   * @param value - The value to write.
   * @returns This.
   */
  writeInt8(e) {
    return this.ensureAvailable(1), this._data.setInt8(this.offset++, e), this._updateLastWrittenByte(), this;
  }
  /**
   * Write `value` as an 8-bit unsigned integer and move pointer forward by 1
   * byte.
   * @param value - The value to write.
   * @returns This.
   */
  writeUint8(e) {
    return this.ensureAvailable(1), this._data.setUint8(this.offset++, e), this._updateLastWrittenByte(), this;
  }
  /**
   * An alias for {@link IOBuffer#writeUint8}.
   * @param value - The value to write.
   * @returns This.
   */
  writeByte(e) {
    return this.writeUint8(e);
  }
  /**
   * Write all elements of `bytes` as uint8 values and move pointer forward by
   * `bytes.length` bytes.
   * @param bytes - The array of bytes to write.
   * @returns This.
   */
  writeBytes(e) {
    this.ensureAvailable(e.length);
    for (let t = 0; t < e.length; t++)
      this._data.setUint8(this.offset++, e[t]);
    return this._updateLastWrittenByte(), this;
  }
  /**
   * Write `value` as a 16-bit signed integer and move pointer forward by 2
   * bytes.
   * @param value - The value to write.
   * @returns This.
   */
  writeInt16(e) {
    return this.ensureAvailable(2), this._data.setInt16(this.offset, e, this.littleEndian), this.offset += 2, this._updateLastWrittenByte(), this;
  }
  /**
   * Write `value` as a 16-bit unsigned integer and move pointer forward by 2
   * bytes.
   * @param value - The value to write.
   * @returns This.
   */
  writeUint16(e) {
    return this.ensureAvailable(2), this._data.setUint16(this.offset, e, this.littleEndian), this.offset += 2, this._updateLastWrittenByte(), this;
  }
  /**
   * Write `value` as a 32-bit signed integer and move pointer forward by 4
   * bytes.
   * @param value - The value to write.
   * @returns This.
   */
  writeInt32(e) {
    return this.ensureAvailable(4), this._data.setInt32(this.offset, e, this.littleEndian), this.offset += 4, this._updateLastWrittenByte(), this;
  }
  /**
   * Write `value` as a 32-bit unsigned integer and move pointer forward by 4
   * bytes.
   * @param value - The value to write.
   * @returns This.
   */
  writeUint32(e) {
    return this.ensureAvailable(4), this._data.setUint32(this.offset, e, this.littleEndian), this.offset += 4, this._updateLastWrittenByte(), this;
  }
  /**
   * Write `value` as a 32-bit floating number and move pointer forward by 4
   * bytes.
   * @param value - The value to write.
   * @returns This.
   */
  writeFloat32(e) {
    return this.ensureAvailable(4), this._data.setFloat32(this.offset, e, this.littleEndian), this.offset += 4, this._updateLastWrittenByte(), this;
  }
  /**
   * Write `value` as a 64-bit floating number and move pointer forward by 8
   * bytes.
   * @param value - The value to write.
   * @returns This.
   */
  writeFloat64(e) {
    return this.ensureAvailable(8), this._data.setFloat64(this.offset, e, this.littleEndian), this.offset += 8, this._updateLastWrittenByte(), this;
  }
  /**
   * Write `value` as a 64-bit signed bigint and move pointer forward by 8
   * bytes.
   * @param value - The value to write.
   * @returns This.
   */
  writeBigInt64(e) {
    return this.ensureAvailable(8), this._data.setBigInt64(this.offset, e, this.littleEndian), this.offset += 8, this._updateLastWrittenByte(), this;
  }
  /**
   * Write `value` as a 64-bit unsigned bigint and move pointer forward by 8
   * bytes.
   * @param value - The value to write.
   * @returns This.
   */
  writeBigUint64(e) {
    return this.ensureAvailable(8), this._data.setBigUint64(this.offset, e, this.littleEndian), this.offset += 8, this._updateLastWrittenByte(), this;
  }
  /**
   * Write the charCode of `str`'s first character as an 8-bit unsigned integer
   * and move pointer forward by 1 byte.
   * @param str - The character to write.
   * @returns This.
   */
  writeChar(e) {
    return this.writeUint8(e.charCodeAt(0));
  }
  /**
   * Write the charCodes of all `str`'s characters as 8-bit unsigned integers
   * and move pointer forward by `str.length` bytes.
   * @param str - The characters to write.
   * @returns This.
   */
  writeChars(e) {
    for (let t = 0; t < e.length; t++)
      this.writeUint8(e.charCodeAt(t));
    return this;
  }
  /**
   * UTF-8 encode and write `str` to the current pointer offset and move pointer
   * forward according to the encoded length.
   * @param str - The string to write.
   * @returns This.
   */
  writeUtf8(e) {
    return this.writeBytes(xe(e));
  }
  /**
   * Export a Uint8Array view of the internal buffer.
   * The view starts at the byte offset and its length
   * is calculated to stop at the last written byte or the original length.
   * @returns A new Uint8Array view.
   */
  toArray() {
    return new Uint8Array(this.buffer, this.byteOffset, this.lastWrittenByte);
  }
  /**
   *  Get the total number of bytes written so far, regardless of the current offset.
   * @returns - Total number of bytes.
   */
  getWrittenByteLength() {
    return this.lastWrittenByte - this.byteOffset;
  }
  /**
   * Update the last written byte offset
   * @private
   */
  _updateLastWrittenByte() {
    this.offset > this.lastWrittenByte && (this.lastWrittenByte = this.offset);
  }
}
function Z(i) {
  let e = i.length;
  for (; --e >= 0; )
    i[e] = 0;
}
const Ee = 3, ye = 258, jt = 29, Ae = 256, ve = Ae + 1 + jt, Vt = 30, Ue = 512, me = new Array((ve + 2) * 2);
Z(me);
const Te = new Array(Vt * 2);
Z(Te);
const Re = new Array(Ue);
Z(Re);
const Ce = new Array(ye - Ee + 1);
Z(Ce);
const Ne = new Array(jt);
Z(Ne);
const Ie = new Array(Vt);
Z(Ie);
const De = (i, e, t, s) => {
  let a = i & 65535 | 0, n = i >>> 16 & 65535 | 0, h = 0;
  for (; t !== 0; ) {
    h = t > 2e3 ? 2e3 : t, t -= h;
    do
      a = a + e[s++] | 0, n = n + a | 0;
    while (--h);
    a %= 65521, n %= 65521;
  }
  return a | n << 16 | 0;
};
var lt = De;
const Oe = () => {
  let i, e = [];
  for (var t = 0; t < 256; t++) {
    i = t;
    for (var s = 0; s < 8; s++)
      i = i & 1 ? 3988292384 ^ i >>> 1 : i >>> 1;
    e[t] = i;
  }
  return e;
}, Se = new Uint32Array(Oe()), Be = (i, e, t, s) => {
  const a = Se, n = s + t;
  i ^= -1;
  for (let h = s; h < n; h++)
    i = i >>> 8 ^ a[(i ^ e[h]) & 255];
  return i ^ -1;
};
var D = Be, ht = {
  2: "need dictionary",
  /* Z_NEED_DICT       2  */
  1: "stream end",
  /* Z_STREAM_END      1  */
  0: "",
  /* Z_OK              0  */
  "-1": "file error",
  /* Z_ERRNO         (-1) */
  "-2": "stream error",
  /* Z_STREAM_ERROR  (-2) */
  "-3": "data error",
  /* Z_DATA_ERROR    (-3) */
  "-4": "insufficient memory",
  /* Z_MEM_ERROR     (-4) */
  "-5": "buffer error",
  /* Z_BUF_ERROR     (-5) */
  "-6": "incompatible version"
  /* Z_VERSION_ERROR (-6) */
}, Jt = {
  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH: 0,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_TREES: 6,
  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  Z_MEM_ERROR: -4,
  Z_BUF_ERROR: -5,
  /* The deflate compression method */
  Z_DEFLATED: 8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};
const Le = (i, e) => Object.prototype.hasOwnProperty.call(i, e);
var Me = function(i) {
  const e = Array.prototype.slice.call(arguments, 1);
  for (; e.length; ) {
    const t = e.shift();
    if (t) {
      if (typeof t != "object")
        throw new TypeError(t + "must be non-object");
      for (const s in t)
        Le(t, s) && (i[s] = t[s]);
    }
  }
  return i;
}, $e = (i) => {
  let e = 0;
  for (let s = 0, a = i.length; s < a; s++)
    e += i[s].length;
  const t = new Uint8Array(e);
  for (let s = 0, a = 0, n = i.length; s < n; s++) {
    let h = i[s];
    t.set(h, a), a += h.length;
  }
  return t;
}, Qt = {
  assign: Me,
  flattenChunks: $e
};
let qt = !0;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  qt = !1;
}
const H = new Uint8Array(256);
for (let i = 0; i < 256; i++)
  H[i] = i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1;
H[254] = H[254] = 1;
var Ze = (i) => {
  if (typeof TextEncoder == "function" && TextEncoder.prototype.encode)
    return new TextEncoder().encode(i);
  let e, t, s, a, n, h = i.length, f = 0;
  for (a = 0; a < h; a++)
    t = i.charCodeAt(a), (t & 64512) === 55296 && a + 1 < h && (s = i.charCodeAt(a + 1), (s & 64512) === 56320 && (t = 65536 + (t - 55296 << 10) + (s - 56320), a++)), f += t < 128 ? 1 : t < 2048 ? 2 : t < 65536 ? 3 : 4;
  for (e = new Uint8Array(f), n = 0, a = 0; n < f; a++)
    t = i.charCodeAt(a), (t & 64512) === 55296 && a + 1 < h && (s = i.charCodeAt(a + 1), (s & 64512) === 56320 && (t = 65536 + (t - 55296 << 10) + (s - 56320), a++)), t < 128 ? e[n++] = t : t < 2048 ? (e[n++] = 192 | t >>> 6, e[n++] = 128 | t & 63) : t < 65536 ? (e[n++] = 224 | t >>> 12, e[n++] = 128 | t >>> 6 & 63, e[n++] = 128 | t & 63) : (e[n++] = 240 | t >>> 18, e[n++] = 128 | t >>> 12 & 63, e[n++] = 128 | t >>> 6 & 63, e[n++] = 128 | t & 63);
  return e;
};
const We = (i, e) => {
  if (e < 65534 && i.subarray && qt)
    return String.fromCharCode.apply(null, i.length === e ? i : i.subarray(0, e));
  let t = "";
  for (let s = 0; s < e; s++)
    t += String.fromCharCode(i[s]);
  return t;
};
var He = (i, e) => {
  const t = e || i.length;
  if (typeof TextDecoder == "function" && TextDecoder.prototype.decode)
    return new TextDecoder().decode(i.subarray(0, e));
  let s, a;
  const n = new Array(t * 2);
  for (a = 0, s = 0; s < t; ) {
    let h = i[s++];
    if (h < 128) {
      n[a++] = h;
      continue;
    }
    let f = H[h];
    if (f > 4) {
      n[a++] = 65533, s += f - 1;
      continue;
    }
    for (h &= f === 2 ? 31 : f === 3 ? 15 : 7; f > 1 && s < t; )
      h = h << 6 | i[s++] & 63, f--;
    if (f > 1) {
      n[a++] = 65533;
      continue;
    }
    h < 65536 ? n[a++] = h : (h -= 65536, n[a++] = 55296 | h >> 10 & 1023, n[a++] = 56320 | h & 1023);
  }
  return We(n, a);
}, Fe = (i, e) => {
  e = e || i.length, e > i.length && (e = i.length);
  let t = e - 1;
  for (; t >= 0 && (i[t] & 192) === 128; )
    t--;
  return t < 0 || t === 0 ? e : t + H[i[t]] > e ? t : e;
}, ct = {
  string2buf: Ze,
  buf2string: He,
  utf8border: Fe
};
function Ke() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
var ze = Ke;
const P = 16209, Ge = 16191;
var Pe = function(e, t) {
  let s, a, n, h, f, g, r, o, A, d, l, _, R, k, b, v, x, c, y, C, u, U, E, w;
  const p = e.state;
  s = e.next_in, E = e.input, a = s + (e.avail_in - 5), n = e.next_out, w = e.output, h = n - (t - e.avail_out), f = n + (e.avail_out - 257), g = p.dmax, r = p.wsize, o = p.whave, A = p.wnext, d = p.window, l = p.hold, _ = p.bits, R = p.lencode, k = p.distcode, b = (1 << p.lenbits) - 1, v = (1 << p.distbits) - 1;
  t:
    do {
      _ < 15 && (l += E[s++] << _, _ += 8, l += E[s++] << _, _ += 8), x = R[l & b];
      e:
        for (; ; ) {
          if (c = x >>> 24, l >>>= c, _ -= c, c = x >>> 16 & 255, c === 0)
            w[n++] = x & 65535;
          else if (c & 16) {
            y = x & 65535, c &= 15, c && (_ < c && (l += E[s++] << _, _ += 8), y += l & (1 << c) - 1, l >>>= c, _ -= c), _ < 15 && (l += E[s++] << _, _ += 8, l += E[s++] << _, _ += 8), x = k[l & v];
            i:
              for (; ; ) {
                if (c = x >>> 24, l >>>= c, _ -= c, c = x >>> 16 & 255, c & 16) {
                  if (C = x & 65535, c &= 15, _ < c && (l += E[s++] << _, _ += 8, _ < c && (l += E[s++] << _, _ += 8)), C += l & (1 << c) - 1, C > g) {
                    e.msg = "invalid distance too far back", p.mode = P;
                    break t;
                  }
                  if (l >>>= c, _ -= c, c = n - h, C > c) {
                    if (c = C - c, c > o && p.sane) {
                      e.msg = "invalid distance too far back", p.mode = P;
                      break t;
                    }
                    if (u = 0, U = d, A === 0) {
                      if (u += r - c, c < y) {
                        y -= c;
                        do
                          w[n++] = d[u++];
                        while (--c);
                        u = n - C, U = w;
                      }
                    } else if (A < c) {
                      if (u += r + A - c, c -= A, c < y) {
                        y -= c;
                        do
                          w[n++] = d[u++];
                        while (--c);
                        if (u = 0, A < y) {
                          c = A, y -= c;
                          do
                            w[n++] = d[u++];
                          while (--c);
                          u = n - C, U = w;
                        }
                      }
                    } else if (u += A - c, c < y) {
                      y -= c;
                      do
                        w[n++] = d[u++];
                      while (--c);
                      u = n - C, U = w;
                    }
                    for (; y > 2; )
                      w[n++] = U[u++], w[n++] = U[u++], w[n++] = U[u++], y -= 3;
                    y && (w[n++] = U[u++], y > 1 && (w[n++] = U[u++]));
                  } else {
                    u = n - C;
                    do
                      w[n++] = w[u++], w[n++] = w[u++], w[n++] = w[u++], y -= 3;
                    while (y > 2);
                    y && (w[n++] = w[u++], y > 1 && (w[n++] = w[u++]));
                  }
                } else if ((c & 64) === 0) {
                  x = k[(x & 65535) + (l & (1 << c) - 1)];
                  continue i;
                } else {
                  e.msg = "invalid distance code", p.mode = P;
                  break t;
                }
                break;
              }
          } else if ((c & 64) === 0) {
            x = R[(x & 65535) + (l & (1 << c) - 1)];
            continue e;
          } else if (c & 32) {
            p.mode = Ge;
            break t;
          } else {
            e.msg = "invalid literal/length code", p.mode = P;
            break t;
          }
          break;
        }
    } while (s < a && n < f);
  y = _ >> 3, s -= y, _ -= y << 3, l &= (1 << _) - 1, e.next_in = s, e.next_out = n, e.avail_in = s < a ? 5 + (a - s) : 5 - (s - a), e.avail_out = n < f ? 257 + (f - n) : 257 - (n - f), p.hold = l, p.bits = _;
};
const $ = 15, wt = 852, bt = 592, gt = 0, tt = 1, xt = 2, Ye = new Uint16Array([
  /* Length codes 257..285 base */
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  13,
  15,
  17,
  19,
  23,
  27,
  31,
  35,
  43,
  51,
  59,
  67,
  83,
  99,
  115,
  131,
  163,
  195,
  227,
  258,
  0,
  0
]), Xe = new Uint8Array([
  /* Length codes 257..285 extra */
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  17,
  17,
  17,
  17,
  18,
  18,
  18,
  18,
  19,
  19,
  19,
  19,
  20,
  20,
  20,
  20,
  21,
  21,
  21,
  21,
  16,
  72,
  78
]), je = new Uint16Array([
  /* Distance codes 0..29 base */
  1,
  2,
  3,
  4,
  5,
  7,
  9,
  13,
  17,
  25,
  33,
  49,
  65,
  97,
  129,
  193,
  257,
  385,
  513,
  769,
  1025,
  1537,
  2049,
  3073,
  4097,
  6145,
  8193,
  12289,
  16385,
  24577,
  0,
  0
]), Ve = new Uint8Array([
  /* Distance codes 0..29 extra */
  16,
  16,
  16,
  16,
  17,
  17,
  18,
  18,
  19,
  19,
  20,
  20,
  21,
  21,
  22,
  22,
  23,
  23,
  24,
  24,
  25,
  25,
  26,
  26,
  27,
  27,
  28,
  28,
  29,
  29,
  64,
  64
]), Je = (i, e, t, s, a, n, h, f) => {
  const g = f.bits;
  let r = 0, o = 0, A = 0, d = 0, l = 0, _ = 0, R = 0, k = 0, b = 0, v = 0, x, c, y, C, u, U = null, E;
  const w = new Uint16Array($ + 1), p = new Uint16Array($ + 1);
  let B = null, ut, z, G;
  for (r = 0; r <= $; r++)
    w[r] = 0;
  for (o = 0; o < s; o++)
    w[e[t + o]]++;
  for (l = g, d = $; d >= 1 && w[d] === 0; d--)
    ;
  if (l > d && (l = d), d === 0)
    return a[n++] = 1 << 24 | 64 << 16 | 0, a[n++] = 1 << 24 | 64 << 16 | 0, f.bits = 1, 0;
  for (A = 1; A < d && w[A] === 0; A++)
    ;
  for (l < A && (l = A), k = 1, r = 1; r <= $; r++)
    if (k <<= 1, k -= w[r], k < 0)
      return -1;
  if (k > 0 && (i === gt || d !== 1))
    return -1;
  for (p[1] = 0, r = 1; r < $; r++)
    p[r + 1] = p[r] + w[r];
  for (o = 0; o < s; o++)
    e[t + o] !== 0 && (h[p[e[t + o]]++] = o);
  if (i === gt ? (U = B = h, E = 20) : i === tt ? (U = Ye, B = Xe, E = 257) : (U = je, B = Ve, E = 0), v = 0, o = 0, r = A, u = n, _ = l, R = 0, y = -1, b = 1 << l, C = b - 1, i === tt && b > wt || i === xt && b > bt)
    return 1;
  for (; ; ) {
    ut = r - R, h[o] + 1 < E ? (z = 0, G = h[o]) : h[o] >= E ? (z = B[h[o] - E], G = U[h[o] - E]) : (z = 96, G = 0), x = 1 << r - R, c = 1 << _, A = c;
    do
      c -= x, a[u + (v >> R) + c] = ut << 24 | z << 16 | G | 0;
    while (c !== 0);
    for (x = 1 << r - 1; v & x; )
      x >>= 1;
    if (x !== 0 ? (v &= x - 1, v += x) : v = 0, o++, --w[r] === 0) {
      if (r === d)
        break;
      r = e[t + h[o]];
    }
    if (r > l && (v & C) !== y) {
      for (R === 0 && (R = l), u += A, _ = r - R, k = 1 << _; _ + R < d && (k -= w[_ + R], !(k <= 0)); )
        _++, k <<= 1;
      if (b += 1 << _, i === tt && b > wt || i === xt && b > bt)
        return 1;
      y = v & C, a[y] = l << 24 | _ << 16 | u - n | 0;
    }
  }
  return v !== 0 && (a[u + v] = r - R << 24 | 64 << 16 | 0), f.bits = l, 0;
};
var W = Je;
const Qe = 0, te = 1, ee = 2, {
  Z_FINISH: pt,
  Z_BLOCK: qe,
  Z_TREES: Y,
  Z_OK: L,
  Z_STREAM_END: ti,
  Z_NEED_DICT: ei,
  Z_STREAM_ERROR: I,
  Z_DATA_ERROR: ie,
  Z_MEM_ERROR: ne,
  Z_BUF_ERROR: ii,
  Z_DEFLATED: kt
} = Jt, Q = 16180, Et = 16181, yt = 16182, At = 16183, vt = 16184, Ut = 16185, mt = 16186, Tt = 16187, Rt = 16188, Ct = 16189, J = 16190, O = 16191, et = 16192, Nt = 16193, it = 16194, It = 16195, Dt = 16196, Ot = 16197, St = 16198, X = 16199, j = 16200, Bt = 16201, Lt = 16202, Mt = 16203, $t = 16204, Zt = 16205, nt = 16206, Wt = 16207, Ht = 16208, m = 16209, se = 16210, ae = 16211, ni = 852, si = 592, ai = 15, ri = ai, Ft = (i) => (i >>> 24 & 255) + (i >>> 8 & 65280) + ((i & 65280) << 8) + ((i & 255) << 24);
function oi() {
  this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
const M = (i) => {
  if (!i)
    return 1;
  const e = i.state;
  return !e || e.strm !== i || e.mode < Q || e.mode > ae ? 1 : 0;
}, re = (i) => {
  if (M(i))
    return I;
  const e = i.state;
  return i.total_in = i.total_out = e.total = 0, i.msg = "", e.wrap && (i.adler = e.wrap & 1), e.mode = Q, e.last = 0, e.havedict = 0, e.flags = -1, e.dmax = 32768, e.head = null, e.hold = 0, e.bits = 0, e.lencode = e.lendyn = new Int32Array(ni), e.distcode = e.distdyn = new Int32Array(si), e.sane = 1, e.back = -1, L;
}, oe = (i) => {
  if (M(i))
    return I;
  const e = i.state;
  return e.wsize = 0, e.whave = 0, e.wnext = 0, re(i);
}, fe = (i, e) => {
  let t;
  if (M(i))
    return I;
  const s = i.state;
  return e < 0 ? (t = 0, e = -e) : (t = (e >> 4) + 5, e < 48 && (e &= 15)), e && (e < 8 || e > 15) ? I : (s.window !== null && s.wbits !== e && (s.window = null), s.wrap = t, s.wbits = e, oe(i));
}, le = (i, e) => {
  if (!i)
    return I;
  const t = new oi();
  i.state = t, t.strm = i, t.window = null, t.mode = Q;
  const s = fe(i, e);
  return s !== L && (i.state = null), s;
}, fi = (i) => le(i, ri);
let Kt = !0, st, at;
const li = (i) => {
  if (Kt) {
    st = new Int32Array(512), at = new Int32Array(32);
    let e = 0;
    for (; e < 144; )
      i.lens[e++] = 8;
    for (; e < 256; )
      i.lens[e++] = 9;
    for (; e < 280; )
      i.lens[e++] = 7;
    for (; e < 288; )
      i.lens[e++] = 8;
    for (W(te, i.lens, 0, 288, st, 0, i.work, { bits: 9 }), e = 0; e < 32; )
      i.lens[e++] = 5;
    W(ee, i.lens, 0, 32, at, 0, i.work, { bits: 5 }), Kt = !1;
  }
  i.lencode = st, i.lenbits = 9, i.distcode = at, i.distbits = 5;
}, he = (i, e, t, s) => {
  let a;
  const n = i.state;
  return n.window === null && (n.wsize = 1 << n.wbits, n.wnext = 0, n.whave = 0, n.window = new Uint8Array(n.wsize)), s >= n.wsize ? (n.window.set(e.subarray(t - n.wsize, t), 0), n.wnext = 0, n.whave = n.wsize) : (a = n.wsize - n.wnext, a > s && (a = s), n.window.set(e.subarray(t - s, t - s + a), n.wnext), s -= a, s ? (n.window.set(e.subarray(t - s, t), 0), n.wnext = s, n.whave = n.wsize) : (n.wnext += a, n.wnext === n.wsize && (n.wnext = 0), n.whave < n.wsize && (n.whave += a))), 0;
}, hi = (i, e) => {
  let t, s, a, n, h, f, g, r, o, A, d, l, _, R, k = 0, b, v, x, c, y, C, u, U;
  const E = new Uint8Array(4);
  let w, p;
  const B = (
    /* permutation of code lengths */
    new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  );
  if (M(i) || !i.output || !i.input && i.avail_in !== 0)
    return I;
  t = i.state, t.mode === O && (t.mode = et), h = i.next_out, a = i.output, g = i.avail_out, n = i.next_in, s = i.input, f = i.avail_in, r = t.hold, o = t.bits, A = f, d = g, U = L;
  t:
    for (; ; )
      switch (t.mode) {
        case Q:
          if (t.wrap === 0) {
            t.mode = et;
            break;
          }
          for (; o < 16; ) {
            if (f === 0)
              break t;
            f--, r += s[n++] << o, o += 8;
          }
          if (t.wrap & 2 && r === 35615) {
            t.wbits === 0 && (t.wbits = 15), t.check = 0, E[0] = r & 255, E[1] = r >>> 8 & 255, t.check = D(t.check, E, 2, 0), r = 0, o = 0, t.mode = Et;
            break;
          }
          if (t.head && (t.head.done = !1), !(t.wrap & 1) || /* check if zlib header allowed */
          (((r & 255) << 8) + (r >> 8)) % 31) {
            i.msg = "incorrect header check", t.mode = m;
            break;
          }
          if ((r & 15) !== kt) {
            i.msg = "unknown compression method", t.mode = m;
            break;
          }
          if (r >>>= 4, o -= 4, u = (r & 15) + 8, t.wbits === 0 && (t.wbits = u), u > 15 || u > t.wbits) {
            i.msg = "invalid window size", t.mode = m;
            break;
          }
          t.dmax = 1 << t.wbits, t.flags = 0, i.adler = t.check = 1, t.mode = r & 512 ? Ct : O, r = 0, o = 0;
          break;
        case Et:
          for (; o < 16; ) {
            if (f === 0)
              break t;
            f--, r += s[n++] << o, o += 8;
          }
          if (t.flags = r, (t.flags & 255) !== kt) {
            i.msg = "unknown compression method", t.mode = m;
            break;
          }
          if (t.flags & 57344) {
            i.msg = "unknown header flags set", t.mode = m;
            break;
          }
          t.head && (t.head.text = r >> 8 & 1), t.flags & 512 && t.wrap & 4 && (E[0] = r & 255, E[1] = r >>> 8 & 255, t.check = D(t.check, E, 2, 0)), r = 0, o = 0, t.mode = yt;
        /* falls through */
        case yt:
          for (; o < 32; ) {
            if (f === 0)
              break t;
            f--, r += s[n++] << o, o += 8;
          }
          t.head && (t.head.time = r), t.flags & 512 && t.wrap & 4 && (E[0] = r & 255, E[1] = r >>> 8 & 255, E[2] = r >>> 16 & 255, E[3] = r >>> 24 & 255, t.check = D(t.check, E, 4, 0)), r = 0, o = 0, t.mode = At;
        /* falls through */
        case At:
          for (; o < 16; ) {
            if (f === 0)
              break t;
            f--, r += s[n++] << o, o += 8;
          }
          t.head && (t.head.xflags = r & 255, t.head.os = r >> 8), t.flags & 512 && t.wrap & 4 && (E[0] = r & 255, E[1] = r >>> 8 & 255, t.check = D(t.check, E, 2, 0)), r = 0, o = 0, t.mode = vt;
        /* falls through */
        case vt:
          if (t.flags & 1024) {
            for (; o < 16; ) {
              if (f === 0)
                break t;
              f--, r += s[n++] << o, o += 8;
            }
            t.length = r, t.head && (t.head.extra_len = r), t.flags & 512 && t.wrap & 4 && (E[0] = r & 255, E[1] = r >>> 8 & 255, t.check = D(t.check, E, 2, 0)), r = 0, o = 0;
          } else t.head && (t.head.extra = null);
          t.mode = Ut;
        /* falls through */
        case Ut:
          if (t.flags & 1024 && (l = t.length, l > f && (l = f), l && (t.head && (u = t.head.extra_len - t.length, t.head.extra || (t.head.extra = new Uint8Array(t.head.extra_len)), t.head.extra.set(
            s.subarray(
              n,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              n + l
            ),
            /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
            u
          )), t.flags & 512 && t.wrap & 4 && (t.check = D(t.check, s, l, n)), f -= l, n += l, t.length -= l), t.length))
            break t;
          t.length = 0, t.mode = mt;
        /* falls through */
        case mt:
          if (t.flags & 2048) {
            if (f === 0)
              break t;
            l = 0;
            do
              u = s[n + l++], t.head && u && t.length < 65536 && (t.head.name += String.fromCharCode(u));
            while (u && l < f);
            if (t.flags & 512 && t.wrap & 4 && (t.check = D(t.check, s, l, n)), f -= l, n += l, u)
              break t;
          } else t.head && (t.head.name = null);
          t.length = 0, t.mode = Tt;
        /* falls through */
        case Tt:
          if (t.flags & 4096) {
            if (f === 0)
              break t;
            l = 0;
            do
              u = s[n + l++], t.head && u && t.length < 65536 && (t.head.comment += String.fromCharCode(u));
            while (u && l < f);
            if (t.flags & 512 && t.wrap & 4 && (t.check = D(t.check, s, l, n)), f -= l, n += l, u)
              break t;
          } else t.head && (t.head.comment = null);
          t.mode = Rt;
        /* falls through */
        case Rt:
          if (t.flags & 512) {
            for (; o < 16; ) {
              if (f === 0)
                break t;
              f--, r += s[n++] << o, o += 8;
            }
            if (t.wrap & 4 && r !== (t.check & 65535)) {
              i.msg = "header crc mismatch", t.mode = m;
              break;
            }
            r = 0, o = 0;
          }
          t.head && (t.head.hcrc = t.flags >> 9 & 1, t.head.done = !0), i.adler = t.check = 0, t.mode = O;
          break;
        case Ct:
          for (; o < 32; ) {
            if (f === 0)
              break t;
            f--, r += s[n++] << o, o += 8;
          }
          i.adler = t.check = Ft(r), r = 0, o = 0, t.mode = J;
        /* falls through */
        case J:
          if (t.havedict === 0)
            return i.next_out = h, i.avail_out = g, i.next_in = n, i.avail_in = f, t.hold = r, t.bits = o, ei;
          i.adler = t.check = 1, t.mode = O;
        /* falls through */
        case O:
          if (e === qe || e === Y)
            break t;
        /* falls through */
        case et:
          if (t.last) {
            r >>>= o & 7, o -= o & 7, t.mode = nt;
            break;
          }
          for (; o < 3; ) {
            if (f === 0)
              break t;
            f--, r += s[n++] << o, o += 8;
          }
          switch (t.last = r & 1, r >>>= 1, o -= 1, r & 3) {
            case 0:
              t.mode = Nt;
              break;
            case 1:
              if (li(t), t.mode = X, e === Y) {
                r >>>= 2, o -= 2;
                break t;
              }
              break;
            case 2:
              t.mode = Dt;
              break;
            case 3:
              i.msg = "invalid block type", t.mode = m;
          }
          r >>>= 2, o -= 2;
          break;
        case Nt:
          for (r >>>= o & 7, o -= o & 7; o < 32; ) {
            if (f === 0)
              break t;
            f--, r += s[n++] << o, o += 8;
          }
          if ((r & 65535) !== (r >>> 16 ^ 65535)) {
            i.msg = "invalid stored block lengths", t.mode = m;
            break;
          }
          if (t.length = r & 65535, r = 0, o = 0, t.mode = it, e === Y)
            break t;
        /* falls through */
        case it:
          t.mode = It;
        /* falls through */
        case It:
          if (l = t.length, l) {
            if (l > f && (l = f), l > g && (l = g), l === 0)
              break t;
            a.set(s.subarray(n, n + l), h), f -= l, n += l, g -= l, h += l, t.length -= l;
            break;
          }
          t.mode = O;
          break;
        case Dt:
          for (; o < 14; ) {
            if (f === 0)
              break t;
            f--, r += s[n++] << o, o += 8;
          }
          if (t.nlen = (r & 31) + 257, r >>>= 5, o -= 5, t.ndist = (r & 31) + 1, r >>>= 5, o -= 5, t.ncode = (r & 15) + 4, r >>>= 4, o -= 4, t.nlen > 286 || t.ndist > 30) {
            i.msg = "too many length or distance symbols", t.mode = m;
            break;
          }
          t.have = 0, t.mode = Ot;
        /* falls through */
        case Ot:
          for (; t.have < t.ncode; ) {
            for (; o < 3; ) {
              if (f === 0)
                break t;
              f--, r += s[n++] << o, o += 8;
            }
            t.lens[B[t.have++]] = r & 7, r >>>= 3, o -= 3;
          }
          for (; t.have < 19; )
            t.lens[B[t.have++]] = 0;
          if (t.lencode = t.lendyn, t.lenbits = 7, w = { bits: t.lenbits }, U = W(Qe, t.lens, 0, 19, t.lencode, 0, t.work, w), t.lenbits = w.bits, U) {
            i.msg = "invalid code lengths set", t.mode = m;
            break;
          }
          t.have = 0, t.mode = St;
        /* falls through */
        case St:
          for (; t.have < t.nlen + t.ndist; ) {
            for (; k = t.lencode[r & (1 << t.lenbits) - 1], b = k >>> 24, v = k >>> 16 & 255, x = k & 65535, !(b <= o); ) {
              if (f === 0)
                break t;
              f--, r += s[n++] << o, o += 8;
            }
            if (x < 16)
              r >>>= b, o -= b, t.lens[t.have++] = x;
            else {
              if (x === 16) {
                for (p = b + 2; o < p; ) {
                  if (f === 0)
                    break t;
                  f--, r += s[n++] << o, o += 8;
                }
                if (r >>>= b, o -= b, t.have === 0) {
                  i.msg = "invalid bit length repeat", t.mode = m;
                  break;
                }
                u = t.lens[t.have - 1], l = 3 + (r & 3), r >>>= 2, o -= 2;
              } else if (x === 17) {
                for (p = b + 3; o < p; ) {
                  if (f === 0)
                    break t;
                  f--, r += s[n++] << o, o += 8;
                }
                r >>>= b, o -= b, u = 0, l = 3 + (r & 7), r >>>= 3, o -= 3;
              } else {
                for (p = b + 7; o < p; ) {
                  if (f === 0)
                    break t;
                  f--, r += s[n++] << o, o += 8;
                }
                r >>>= b, o -= b, u = 0, l = 11 + (r & 127), r >>>= 7, o -= 7;
              }
              if (t.have + l > t.nlen + t.ndist) {
                i.msg = "invalid bit length repeat", t.mode = m;
                break;
              }
              for (; l--; )
                t.lens[t.have++] = u;
            }
          }
          if (t.mode === m)
            break;
          if (t.lens[256] === 0) {
            i.msg = "invalid code -- missing end-of-block", t.mode = m;
            break;
          }
          if (t.lenbits = 9, w = { bits: t.lenbits }, U = W(te, t.lens, 0, t.nlen, t.lencode, 0, t.work, w), t.lenbits = w.bits, U) {
            i.msg = "invalid literal/lengths set", t.mode = m;
            break;
          }
          if (t.distbits = 6, t.distcode = t.distdyn, w = { bits: t.distbits }, U = W(ee, t.lens, t.nlen, t.ndist, t.distcode, 0, t.work, w), t.distbits = w.bits, U) {
            i.msg = "invalid distances set", t.mode = m;
            break;
          }
          if (t.mode = X, e === Y)
            break t;
        /* falls through */
        case X:
          t.mode = j;
        /* falls through */
        case j:
          if (f >= 6 && g >= 258) {
            i.next_out = h, i.avail_out = g, i.next_in = n, i.avail_in = f, t.hold = r, t.bits = o, Pe(i, d), h = i.next_out, a = i.output, g = i.avail_out, n = i.next_in, s = i.input, f = i.avail_in, r = t.hold, o = t.bits, t.mode === O && (t.back = -1);
            break;
          }
          for (t.back = 0; k = t.lencode[r & (1 << t.lenbits) - 1], b = k >>> 24, v = k >>> 16 & 255, x = k & 65535, !(b <= o); ) {
            if (f === 0)
              break t;
            f--, r += s[n++] << o, o += 8;
          }
          if (v && (v & 240) === 0) {
            for (c = b, y = v, C = x; k = t.lencode[C + ((r & (1 << c + y) - 1) >> c)], b = k >>> 24, v = k >>> 16 & 255, x = k & 65535, !(c + b <= o); ) {
              if (f === 0)
                break t;
              f--, r += s[n++] << o, o += 8;
            }
            r >>>= c, o -= c, t.back += c;
          }
          if (r >>>= b, o -= b, t.back += b, t.length = x, v === 0) {
            t.mode = Zt;
            break;
          }
          if (v & 32) {
            t.back = -1, t.mode = O;
            break;
          }
          if (v & 64) {
            i.msg = "invalid literal/length code", t.mode = m;
            break;
          }
          t.extra = v & 15, t.mode = Bt;
        /* falls through */
        case Bt:
          if (t.extra) {
            for (p = t.extra; o < p; ) {
              if (f === 0)
                break t;
              f--, r += s[n++] << o, o += 8;
            }
            t.length += r & (1 << t.extra) - 1, r >>>= t.extra, o -= t.extra, t.back += t.extra;
          }
          t.was = t.length, t.mode = Lt;
        /* falls through */
        case Lt:
          for (; k = t.distcode[r & (1 << t.distbits) - 1], b = k >>> 24, v = k >>> 16 & 255, x = k & 65535, !(b <= o); ) {
            if (f === 0)
              break t;
            f--, r += s[n++] << o, o += 8;
          }
          if ((v & 240) === 0) {
            for (c = b, y = v, C = x; k = t.distcode[C + ((r & (1 << c + y) - 1) >> c)], b = k >>> 24, v = k >>> 16 & 255, x = k & 65535, !(c + b <= o); ) {
              if (f === 0)
                break t;
              f--, r += s[n++] << o, o += 8;
            }
            r >>>= c, o -= c, t.back += c;
          }
          if (r >>>= b, o -= b, t.back += b, v & 64) {
            i.msg = "invalid distance code", t.mode = m;
            break;
          }
          t.offset = x, t.extra = v & 15, t.mode = Mt;
        /* falls through */
        case Mt:
          if (t.extra) {
            for (p = t.extra; o < p; ) {
              if (f === 0)
                break t;
              f--, r += s[n++] << o, o += 8;
            }
            t.offset += r & (1 << t.extra) - 1, r >>>= t.extra, o -= t.extra, t.back += t.extra;
          }
          if (t.offset > t.dmax) {
            i.msg = "invalid distance too far back", t.mode = m;
            break;
          }
          t.mode = $t;
        /* falls through */
        case $t:
          if (g === 0)
            break t;
          if (l = d - g, t.offset > l) {
            if (l = t.offset - l, l > t.whave && t.sane) {
              i.msg = "invalid distance too far back", t.mode = m;
              break;
            }
            l > t.wnext ? (l -= t.wnext, _ = t.wsize - l) : _ = t.wnext - l, l > t.length && (l = t.length), R = t.window;
          } else
            R = a, _ = h - t.offset, l = t.length;
          l > g && (l = g), g -= l, t.length -= l;
          do
            a[h++] = R[_++];
          while (--l);
          t.length === 0 && (t.mode = j);
          break;
        case Zt:
          if (g === 0)
            break t;
          a[h++] = t.length, g--, t.mode = j;
          break;
        case nt:
          if (t.wrap) {
            for (; o < 32; ) {
              if (f === 0)
                break t;
              f--, r |= s[n++] << o, o += 8;
            }
            if (d -= g, i.total_out += d, t.total += d, t.wrap & 4 && d && (i.adler = t.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
            t.flags ? D(t.check, a, d, h - d) : lt(t.check, a, d, h - d)), d = g, t.wrap & 4 && (t.flags ? r : Ft(r)) !== t.check) {
              i.msg = "incorrect data check", t.mode = m;
              break;
            }
            r = 0, o = 0;
          }
          t.mode = Wt;
        /* falls through */
        case Wt:
          if (t.wrap && t.flags) {
            for (; o < 32; ) {
              if (f === 0)
                break t;
              f--, r += s[n++] << o, o += 8;
            }
            if (t.wrap & 4 && r !== (t.total & 4294967295)) {
              i.msg = "incorrect length check", t.mode = m;
              break;
            }
            r = 0, o = 0;
          }
          t.mode = Ht;
        /* falls through */
        case Ht:
          U = ti;
          break t;
        case m:
          U = ie;
          break t;
        case se:
          return ne;
        case ae:
        /* falls through */
        default:
          return I;
      }
  return i.next_out = h, i.avail_out = g, i.next_in = n, i.avail_in = f, t.hold = r, t.bits = o, (t.wsize || d !== i.avail_out && t.mode < m && (t.mode < nt || e !== pt)) && he(i, i.output, i.next_out, d - i.avail_out), A -= i.avail_in, d -= i.avail_out, i.total_in += A, i.total_out += d, t.total += d, t.wrap & 4 && d && (i.adler = t.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
  t.flags ? D(t.check, a, d, i.next_out - d) : lt(t.check, a, d, i.next_out - d)), i.data_type = t.bits + (t.last ? 64 : 0) + (t.mode === O ? 128 : 0) + (t.mode === X || t.mode === it ? 256 : 0), (A === 0 && d === 0 || e === pt) && U === L && (U = ii), U;
}, ci = (i) => {
  if (M(i))
    return I;
  let e = i.state;
  return e.window && (e.window = null), i.state = null, L;
}, di = (i, e) => {
  if (M(i))
    return I;
  const t = i.state;
  return (t.wrap & 2) === 0 ? I : (t.head = e, e.done = !1, L);
}, ui = (i, e) => {
  const t = e.length;
  let s, a, n;
  return M(i) || (s = i.state, s.wrap !== 0 && s.mode !== J) ? I : s.mode === J && (a = 1, a = lt(a, e, t, 0), a !== s.check) ? ie : (n = he(i, e, t, t), n ? (s.mode = se, ne) : (s.havedict = 1, L));
};
var _i = oe, wi = fe, bi = re, gi = fi, xi = le, pi = hi, ki = ci, Ei = di, yi = ui, Ai = "pako inflate (from Nodeca project)", S = {
  inflateReset: _i,
  inflateReset2: wi,
  inflateResetKeep: bi,
  inflateInit: gi,
  inflateInit2: xi,
  inflate: pi,
  inflateEnd: ki,
  inflateGetHeader: Ei,
  inflateSetDictionary: yi,
  inflateInfo: Ai
};
function vi() {
  this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
}
var Ui = vi;
const ce = Object.prototype.toString, {
  Z_NO_FLUSH: mi,
  Z_FINISH: Ti,
  Z_OK: F,
  Z_STREAM_END: rt,
  Z_NEED_DICT: ot,
  Z_STREAM_ERROR: Ri,
  Z_DATA_ERROR: zt,
  Z_MEM_ERROR: Ci
} = Jt;
function K(i) {
  this.options = Qt.assign({
    chunkSize: 1024 * 64,
    windowBits: 15,
    to: ""
  }, i || {});
  const e = this.options;
  e.raw && e.windowBits >= 0 && e.windowBits < 16 && (e.windowBits = -e.windowBits, e.windowBits === 0 && (e.windowBits = -15)), e.windowBits >= 0 && e.windowBits < 16 && !(i && i.windowBits) && (e.windowBits += 32), e.windowBits > 15 && e.windowBits < 48 && (e.windowBits & 15) === 0 && (e.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new ze(), this.strm.avail_out = 0;
  let t = S.inflateInit2(
    this.strm,
    e.windowBits
  );
  if (t !== F)
    throw new Error(ht[t]);
  if (this.header = new Ui(), S.inflateGetHeader(this.strm, this.header), e.dictionary && (typeof e.dictionary == "string" ? e.dictionary = ct.string2buf(e.dictionary) : ce.call(e.dictionary) === "[object ArrayBuffer]" && (e.dictionary = new Uint8Array(e.dictionary)), e.raw && (t = S.inflateSetDictionary(this.strm, e.dictionary), t !== F)))
    throw new Error(ht[t]);
}
K.prototype.push = function(i, e) {
  const t = this.strm, s = this.options.chunkSize, a = this.options.dictionary;
  let n, h, f;
  if (this.ended) return !1;
  for (e === ~~e ? h = e : h = e === !0 ? Ti : mi, ce.call(i) === "[object ArrayBuffer]" ? t.input = new Uint8Array(i) : t.input = i, t.next_in = 0, t.avail_in = t.input.length; ; ) {
    for (t.avail_out === 0 && (t.output = new Uint8Array(s), t.next_out = 0, t.avail_out = s), n = S.inflate(t, h), n === ot && a && (n = S.inflateSetDictionary(t, a), n === F ? n = S.inflate(t, h) : n === zt && (n = ot)); t.avail_in > 0 && n === rt && t.state.wrap > 0 && i[t.next_in] !== 0; )
      S.inflateReset(t), n = S.inflate(t, h);
    switch (n) {
      case Ri:
      case zt:
      case ot:
      case Ci:
        return this.onEnd(n), this.ended = !0, !1;
    }
    if (f = t.avail_out, t.next_out && (t.avail_out === 0 || n === rt))
      if (this.options.to === "string") {
        let g = ct.utf8border(t.output, t.next_out), r = t.next_out - g, o = ct.buf2string(t.output, g);
        t.next_out = r, t.avail_out = s - r, r && t.output.set(t.output.subarray(g, g + r), 0), this.onData(o);
      } else
        this.onData(t.output.length === t.next_out ? t.output : t.output.subarray(0, t.next_out));
    if (!(n === F && f === 0)) {
      if (n === rt)
        return n = S.inflateEnd(this.strm), this.onEnd(n), this.ended = !0, !0;
      if (t.avail_in === 0) break;
    }
  }
  return !0;
};
K.prototype.onData = function(i) {
  this.chunks.push(i);
};
K.prototype.onEnd = function(i) {
  i === F && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = Qt.flattenChunks(this.chunks)), this.chunks = [], this.err = i, this.msg = this.strm.msg;
};
function Ni(i, e) {
  const t = new K(e);
  if (t.push(i), t.err) throw t.msg || ht[t.err];
  return t.result;
}
var Ii = K, Di = Ni, Oi = {
  Inflate: Ii,
  inflate: Di
};
const { Inflate: Si, inflate: Bi } = Oi;
var Li = Si, Mi = Bi;
const de = [];
for (let i = 0; i < 256; i++) {
  let e = i;
  for (let t = 0; t < 8; t++)
    e & 1 ? e = 3988292384 ^ e >>> 1 : e = e >>> 1;
  de[i] = e;
}
const Gt = 4294967295;
function $i(i, e, t) {
  let s = i;
  for (let a = 0; a < t; a++)
    s = de[(s ^ e[a]) & 255] ^ s >>> 8;
  return s;
}
function Zi(i, e) {
  return ($i(Gt, i, e) ^ Gt) >>> 0;
}
function Wi(i, e, t) {
  const s = i.readUint32(), a = Zi(new Uint8Array(i.buffer, i.byteOffset + i.offset - e - 4, e), e);
  if (a !== s)
    throw new Error(`CRC mismatch for chunk ${t}. Expected ${s}, found ${a}`);
}
function Hi(i, e, t) {
  for (let s = 0; s < t; s++)
    e[s] = i[s];
}
function Fi(i, e, t, s) {
  let a = 0;
  for (; a < s; a++)
    e[a] = i[a];
  for (; a < t; a++)
    e[a] = i[a] + e[a - s] & 255;
}
function Ki(i, e, t, s) {
  let a = 0;
  if (t.length === 0)
    for (; a < s; a++)
      e[a] = i[a];
  else
    for (; a < s; a++)
      e[a] = i[a] + t[a] & 255;
}
function zi(i, e, t, s, a) {
  let n = 0;
  if (t.length === 0) {
    for (; n < a; n++)
      e[n] = i[n];
    for (; n < s; n++)
      e[n] = i[n] + (e[n - a] >> 1) & 255;
  } else {
    for (; n < a; n++)
      e[n] = i[n] + (t[n] >> 1) & 255;
    for (; n < s; n++)
      e[n] = i[n] + (e[n - a] + t[n] >> 1) & 255;
  }
}
function Gi(i, e, t, s, a) {
  let n = 0;
  if (t.length === 0) {
    for (; n < a; n++)
      e[n] = i[n];
    for (; n < s; n++)
      e[n] = i[n] + e[n - a] & 255;
  } else {
    for (; n < a; n++)
      e[n] = i[n] + t[n] & 255;
    for (; n < s; n++)
      e[n] = i[n] + Pi(e[n - a], t[n], t[n - a]) & 255;
  }
}
function Pi(i, e, t) {
  const s = i + e - t, a = Math.abs(s - i), n = Math.abs(s - e), h = Math.abs(s - t);
  return a <= n && a <= h ? i : n <= h ? e : t;
}
const Yi = new Uint16Array([255]), Xi = new Uint8Array(Yi.buffer), ji = Xi[0] === 255, Vi = new Uint8Array(0);
function Ji(i) {
  const { data: e, width: t, height: s, channels: a, depth: n } = i, h = a * n / 8, f = t * h, g = new Uint8Array(s * f);
  let r = Vi, o = 0, A, d;
  for (let l = 0; l < s; l++) {
    switch (A = e.subarray(o + 1, o + 1 + f), d = g.subarray(l * f, (l + 1) * f), e[o]) {
      case 0:
        Hi(A, d, f);
        break;
      case 1:
        Fi(A, d, f, h);
        break;
      case 2:
        Ki(A, d, r, f);
        break;
      case 3:
        zi(A, d, r, f, h);
        break;
      case 4:
        Gi(A, d, r, f, h);
        break;
      default:
        throw new Error(`Unsupported filter: ${e[o]}`);
    }
    r = d, o += f + 1;
  }
  if (n === 16) {
    const l = new Uint16Array(g.buffer);
    if (ji)
      for (let _ = 0; _ < l.length; _++)
        l[_] = Qi(l[_]);
    return l;
  } else
    return g;
}
function Qi(i) {
  return (i & 255) << 8 | i >> 8 & 255;
}
const V = Uint8Array.of(137, 80, 78, 71, 13, 10, 26, 10);
function qi(i) {
  if (!tn(i.readBytes(V.length)))
    throw new Error("wrong PNG signature");
}
function tn(i) {
  if (i.length < V.length)
    return !1;
  for (let e = 0; e < V.length; e++)
    if (i[e] !== V[e])
      return !1;
  return !0;
}
const en = "tEXt", nn = 0, ue = new TextDecoder("latin1");
function sn(i) {
  if (rn(i), i.length === 0 || i.length > 79)
    throw new Error("keyword length must be between 1 and 79");
}
const an = /^[\u0000-\u00FF]*$/;
function rn(i) {
  if (!an.test(i))
    throw new Error("invalid latin1 text");
}
function on(i, e, t) {
  const s = _e(e);
  i[s] = fn(e, t - s.length - 1);
}
function _e(i) {
  for (i.mark(); i.readByte() !== nn; )
    ;
  const e = i.offset;
  i.reset();
  const t = ue.decode(i.readBytes(e - i.offset - 1));
  return i.skip(1), sn(t), t;
}
function fn(i, e) {
  return ue.decode(i.readBytes(e));
}
const N = {
  UNKNOWN: -1,
  GREYSCALE: 0,
  TRUECOLOUR: 2,
  INDEXED_COLOUR: 3,
  GREYSCALE_ALPHA: 4,
  TRUECOLOUR_ALPHA: 6
}, ft = {
  UNKNOWN: -1,
  DEFLATE: 0
}, Pt = {
  UNKNOWN: -1,
  ADAPTIVE: 0
}, Yt = {
  UNKNOWN: -1,
  NO_INTERLACE: 0
};
class ln extends dt {
  constructor(t, s = {}) {
    super(t);
    T(this, "_checkCrc");
    T(this, "_inflator");
    T(this, "_png");
    T(this, "_end");
    T(this, "_hasPalette");
    T(this, "_palette");
    T(this, "_hasTransparency");
    T(this, "_transparency");
    T(this, "_compressionMethod");
    T(this, "_filterMethod");
    T(this, "_interlaceMethod");
    T(this, "_colorType");
    const { checkCrc: a = !1 } = s;
    this._checkCrc = a, this._inflator = new Li(), this._png = {
      width: -1,
      height: -1,
      channels: -1,
      data: new Uint8Array(0),
      depth: 1,
      text: {}
    }, this._end = !1, this._hasPalette = !1, this._palette = [], this._hasTransparency = !1, this._transparency = new Uint16Array(0), this._compressionMethod = ft.UNKNOWN, this._filterMethod = Pt.UNKNOWN, this._interlaceMethod = Yt.UNKNOWN, this._colorType = N.UNKNOWN, this.setBigEndian();
  }
  decode() {
    for (qi(this); !this._end; )
      this.decodeChunk();
    return this.decodeImage(), this._png;
  }
  // https://www.w3.org/TR/PNG/#5Chunk-layout
  decodeChunk() {
    const t = this.readUint32(), s = this.readChars(4), a = this.offset;
    switch (s) {
      // 11.2 Critical chunks
      case "IHDR":
        this.decodeIHDR();
        break;
      case "PLTE":
        this.decodePLTE(t);
        break;
      case "IDAT":
        this.decodeIDAT(t);
        break;
      case "IEND":
        this._end = !0;
        break;
      // 11.3 Ancillary chunks
      case "tRNS":
        this.decodetRNS(t);
        break;
      case "iCCP":
        this.decodeiCCP(t);
        break;
      case en:
        on(this._png.text, this, t);
        break;
      case "pHYs":
        this.decodepHYs();
        break;
      default:
        this.skip(t);
        break;
    }
    if (this.offset - a !== t)
      throw new Error(`Length mismatch while decoding chunk ${s}`);
    this._checkCrc ? Wi(this, t + 4, s) : this.skip(4);
  }
  // https://www.w3.org/TR/PNG/#11IHDR
  decodeIHDR() {
    const t = this._png;
    t.width = this.readUint32(), t.height = this.readUint32(), t.depth = hn(this.readUint8());
    const s = this.readUint8();
    this._colorType = s;
    let a;
    switch (s) {
      case N.GREYSCALE:
        a = 1;
        break;
      case N.TRUECOLOUR:
        a = 3;
        break;
      case N.INDEXED_COLOUR:
        a = 1;
        break;
      case N.GREYSCALE_ALPHA:
        a = 2;
        break;
      case N.TRUECOLOUR_ALPHA:
        a = 4;
        break;
      // Kept for exhaustiveness.
      // eslint-disable-next-line unicorn/no-useless-switch-case
      case N.UNKNOWN:
      default:
        throw new Error(`Unknown color type: ${s}`);
    }
    if (this._png.channels = a, this._compressionMethod = this.readUint8(), this._compressionMethod !== ft.DEFLATE)
      throw new Error(`Unsupported compression method: ${this._compressionMethod}`);
    this._filterMethod = this.readUint8(), this._interlaceMethod = this.readUint8();
  }
  // https://www.w3.org/TR/PNG/#11PLTE
  decodePLTE(t) {
    if (t % 3 !== 0)
      throw new RangeError(`PLTE field length must be a multiple of 3. Got ${t}`);
    const s = t / 3;
    this._hasPalette = !0;
    const a = [];
    this._palette = a;
    for (let n = 0; n < s; n++)
      a.push([this.readUint8(), this.readUint8(), this.readUint8()]);
  }
  // https://www.w3.org/TR/PNG/#11IDAT
  decodeIDAT(t) {
    this._inflator.push(new Uint8Array(this.buffer, this.offset + this.byteOffset, t)), this.skip(t);
  }
  // https://www.w3.org/TR/PNG/#11tRNS
  decodetRNS(t) {
    switch (this._colorType) {
      case N.GREYSCALE:
      case N.TRUECOLOUR: {
        if (t % 2 !== 0)
          throw new RangeError(`tRNS chunk length must be a multiple of 2. Got ${t}`);
        if (t / 2 > this._png.width * this._png.height)
          throw new Error(`tRNS chunk contains more alpha values than there are pixels (${t / 2} vs ${this._png.width * this._png.height})`);
        this._hasTransparency = !0, this._transparency = new Uint16Array(t / 2);
        for (let s = 0; s < t / 2; s++)
          this._transparency[s] = this.readUint16();
        break;
      }
      case N.INDEXED_COLOUR: {
        if (t > this._palette.length)
          throw new Error(`tRNS chunk contains more alpha values than there are palette colors (${t} vs ${this._palette.length})`);
        let s = 0;
        for (; s < t; s++) {
          const a = this.readByte();
          this._palette[s].push(a);
        }
        for (; s < this._palette.length; s++)
          this._palette[s].push(255);
        break;
      }
      // Kept for exhaustiveness.
      /* eslint-disable unicorn/no-useless-switch-case */
      case N.UNKNOWN:
      case N.GREYSCALE_ALPHA:
      case N.TRUECOLOUR_ALPHA:
      default:
        throw new Error(`tRNS chunk is not supported for color type ${this._colorType}`);
    }
  }
  // https://www.w3.org/TR/PNG/#11iCCP
  decodeiCCP(t) {
    const s = _e(this), a = this.readUint8();
    if (a !== ft.DEFLATE)
      throw new Error(`Unsupported iCCP compression method: ${a}`);
    const n = this.readBytes(t - s.length - 2);
    this._png.iccEmbeddedProfile = {
      name: s,
      profile: Mi(n)
    };
  }
  // https://www.w3.org/TR/PNG/#11pHYs
  decodepHYs() {
    const t = this.readUint32(), s = this.readUint32(), a = this.readByte();
    this._png.resolution = { x: t, y: s, unit: a };
  }
  decodeImage() {
    if (this._inflator.err)
      throw new Error(`Error while decompressing the data: ${this._inflator.err}`);
    const t = this._inflator.result;
    if (this._filterMethod !== Pt.ADAPTIVE)
      throw new Error(`Filter method ${this._filterMethod} not supported`);
    if (this._interlaceMethod === Yt.NO_INTERLACE)
      this._png.data = Ji({
        data: t,
        width: this._png.width,
        height: this._png.height,
        channels: this._png.channels,
        depth: this._png.depth
      });
    else
      throw new Error(`Interlace method ${this._interlaceMethod} not supported`);
    this._hasPalette && (this._png.palette = this._palette), this._hasTransparency && (this._png.transparency = this._transparency);
  }
}
function hn(i) {
  if (i !== 1 && i !== 2 && i !== 4 && i !== 8 && i !== 16)
    throw new Error(`invalid bit depth: ${i}`);
  return i;
}
var Xt;
(function(i) {
  i[i.UNKNOWN = 0] = "UNKNOWN", i[i.METRE = 1] = "METRE";
})(Xt || (Xt = {}));
function cn(i, e) {
  return new ln(i, e).decode();
}
function dn(i) {
  var e = atob(i), t = e.length, s = new Uint8Array(t);
  for (let a = 0; a < t; a++)
    s[a] = e.charCodeAt(a);
  return s;
}
function _n(i, e) {
  for (var t = dn(i), s = cn(t), a = "", n = 0; n < s.data.length; n += 4)
    a += String.fromCharCode(
      s[n],
      s[n + 1],
      s[n + 2]
    );
  e(JSON.parse(a));
}
export {
  _n as default
};
