/**
 * @fileOverview
 * @author Ramon Wijnands - rayman747@hotmail.com
 */

import { decode } from 'fast-png';

// Base64 → Uint8Array conversion function
function base64ToUint8Array(base64) {
  var binary = atob(base64);
  var len = binary.length;
  var bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * @callback decompressPngCallback
 * @param data - The uncompressed data.
 */
/**
 * If a message was compressed as a PNG image (a compression hack since
 * gzipping over WebSockets * is not supported yet), this function decodes
 * the "image" as a Base64 string.
 *
 * @private
 * @param data - An object containing the PNG data.
 * @param {decompressPngCallback} callback - Function with the following params:
 */
export default function decompressPng(data, callback) {
  var buffer = base64ToUint8Array(data);
  var imageData = decode(buffer);
  // Constructs the JSON.
  var jsonData = '';
  for (var i = 0; i < imageData.data.length; i += 4) {
    // RGB
    jsonData += String.fromCharCode(
      imageData[i],
      imageData[i + 1],
      imageData[i + 2]
    );
  }
  callback(JSON.parse(jsonData));
}
