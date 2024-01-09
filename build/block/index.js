/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/block/edit.js":
/*!***************************!*\
  !*** ./src/block/edit.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var webdav_web__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! webdav/web */ "./node_modules/webdav/dist/web/index.js");
/* harmony import */ var react_folder_tree__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-folder-tree */ "./node_modules/react-folder-tree/dist/react-folder-tree.bundle.js");
/* harmony import */ var react_folder_tree__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_folder_tree__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_folder_tree_dist_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-folder-tree/dist/style.css */ "./node_modules/react-folder-tree/dist/style.css");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./editor.scss */ "./src/block/editor.scss");
/* harmony import */ var _extract_webdav_credentials__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./extract-webdav-credentials */ "./src/block/extract-webdav-credentials.js");
/* harmony import */ var _propfind_to_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./propfind-to-json */ "./src/block/propfind-to-json.js");










function Edit({
  attributes,
  setAttributes
}) {
  const [treeData, setTreeData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)({
    name: "root",
    checked: 0.5,
    isOpen: true,
    children: []
  });
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    fetchProxyDirectoryContents(attributes.folderLink);
  }, [attributes.folderLink]);
  const fetchProxyDirectoryContents = async folderLink => {
    const webDavData = (0,_extract_webdav_credentials__WEBPACK_IMPORTED_MODULE_8__["default"])(folderLink);
    if (!webDavData) return;
    const url = folderLink.replace(webDavData.credentials.username, '');
    const proxyUrl = `/wp-content/plugins/nextcloud-block-plugin/proxy.php?url=${encodeURIComponent(url)}&auth=Basic ` + btoa(webDavData.credentials.username + ':' + webDavData.credentials.password);
    const rootPath = '/';
    const auth = 'Basic ' + window.btoa(webDavData.credentials.username + ':' + webDavData.credentials.password);
    const client = (0,webdav_web__WEBPACK_IMPORTED_MODULE_4__.createClient)(proxyUrl, {
      headers: {
        "authorization": auth
      }
    });
    try {
      // Pfad zur proxy.php in Ihrem Plugin-Verzeichnis
      const xml = await fetch(proxyUrl, {
        method: 'PROPFIND',
        headers: {
          'Authorization': auth,
          'Content-Type': 'text/xml',
          'DEPTH': 10
        },
        body: `<?xml version="1.0"?>
          <d:propfind  xmlns:d="DAV:" xmlns:oc="http://owncloud.org/ns" xmlns:nc="http://nextcloud.org/ns">
            <d:prop>
              <d:resourcetype />
              <d:getlastmodified />
              <d:getetag />
              <oc:id />
              <oc:fileid />
              <oc:permissions />
              <oc:size />
              <oc:owner-display-name />
              <oc:owner-id />
            </d:prop>
          </d:propfind>`
      }).then(response => response.text());
      (0,_propfind_to_json__WEBPACK_IMPORTED_MODULE_9__["default"])(xml).then(treeData => setTreeData(treeData), attributes);
    } catch (error) {
      console.error('Fehler beim Laden des Verzeichnisinhalts über Proxy', error);
      // ToDo: Fehlerbehandlung
    }
  };
  const handleTreeChange = newTreeData => {
    //setTreeData(newTreeData);
  };

  //const onTreeStateChange = (state, event) => console.log(state, event);
  console.log(treeData);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)()
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)((react_folder_tree__WEBPACK_IMPORTED_MODULE_5___default()), {
    data: treeData
    //onChange={ onTreeStateChange }
    ,
    showCheckbox: false,
    readOnly: true
  }));
}
;

/***/ }),

/***/ "./src/block/extract-webdav-credentials.js":
/*!*************************************************!*\
  !*** ./src/block/extract-webdav-credentials.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ extractWebDavCredentials)
/* harmony export */ });
function extractWebDavCredentials(url) {
  try {
    const sharedLink = new URL(url);
    const pathSegments = sharedLink.pathname.split('/');
    const shareToken = pathSegments[pathSegments.length - 1];
    return {
      webDavUrl: `${sharedLink.origin}/public.php/webdav/`,
      credentials: {
        username: shareToken,
        password: '' // Falls ein Passwort erforderlich ist, muss es separat behandelt werden
      }
    };
  } catch (error) {
    console.error('Fehler bei der Verarbeitung der URL', error);
    return null;
  }
}

/***/ }),

/***/ "./src/block/index.js":
/*!****************************!*\
  !*** ./src/block/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/block/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/block/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/block/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/block/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */




/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./src/block/propfind-to-json.js":
/*!***************************************!*\
  !*** ./src/block/propfind-to-json.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseWebdavPropfindResponse)
/* harmony export */ });
/* harmony import */ var xml2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xml2js */ "./node_modules/xml2js/lib/xml2js.js");
/* harmony import */ var xml2js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(xml2js__WEBPACK_IMPORTED_MODULE_0__);

function buildTree(flattree) {
  const data = flattree.children;
  const rootNode = {
    name: "root",
    children: []
  };
  const pathMap = {
    "/": rootNode
  };
  data.forEach(item => {
    const pathParts = item.name.split('/').filter(Boolean);
    let currentPath = "";
    let currentLevel = rootNode;
    pathParts.forEach((part, index) => {
      currentPath += "/" + part;
      if (!pathMap[currentPath]) {
        pathMap[currentPath] = {
          name: part,
          type: index === pathParts.length - 1 ? item._type : 'directory',
          url: item.url,
          size: item.size,
          date: item.date
        };
        if (item._type === 'directory') {
          pathMap[currentPath].children = [];
        }
        currentLevel.children.push(pathMap[currentPath]);
      }
      currentLevel = pathMap[currentPath];
    });
  });
  return rootNode;
}

//const treeData = buildTree(data.children);

async function parseWebdavPropfindResponse(xml) {
  const parser = new (xml2js__WEBPACK_IMPORTED_MODULE_0___default().Parser)();
  const result = await parser.parseStringPromise(xml);
  const root = {
    name: 'root',
    children: []
  };
  const paths = {};
  for (const response of result["d:multistatus"]["d:response"]) {
    const href = response["d:href"][0].replace('/public.php/webdav/', '/');
    const filename = decodeURIComponent(href.substring(0, href.lastIndexOf('/')));
    const propstat = response["d:propstat"][0];
    const status = propstat["d:status"][0];
    if (status === 'HTTP/1.1 200 OK') {
      const prop = propstat["d:prop"][0];
      const resourcetype = prop["d:resourcetype"];
      const collection = resourcetype[0]['d:collection'];
      const getlastmodified = prop["d:getlastmodified"][0];
      const getetag = prop["d:getetag"][0];
      const size = prop["d:getcontentlength"] ? prop["d:getcontentlength"][0] : 0;
      const child = {
        name: decodeURIComponent(href),
        filename: filename,
        _type: collection ? 'directory' : 'file',
        url: href,
        date: getlastmodified,
        size: size
      };
      root.children.push(child);
    }
  }
  console.log(root);
  return buildTree(root);
}

/***/ }),

/***/ "./src/block/save.js":
/*!***************************!*\
  !*** ./src/block/save.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
function save() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    ..._wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save()
  }, 'Nextcloud Block Plugin – hello from the saved content!');
}

/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
    : null

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    var proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  Object.setPrototypeOf(buf, Buffer.prototype)
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayView(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof SharedArrayBuffer !== 'undefined' &&
      (isInstance(value, SharedArrayBuffer) ||
      (value && isInstance(value.buffer, SharedArrayBuffer)))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayView (arrayView) {
  if (isInstance(arrayView, Uint8Array)) {
    var copy = new Uint8Array(arrayView)
    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
  }
  return fromArrayLike(arrayView)
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype)

  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      if (pos + buf.length > buffer.length) {
        Buffer.from(buf).copy(buffer, pos)
      } else {
        Uint8Array.prototype.set.call(
          buffer,
          buf,
          pos
        )
      }
    } else if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    } else {
      buf.copy(buffer, pos)
    }
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
      case 'latin1':
      case 'binary':
        return asciiWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF)
      ? 4
      : (firstByte > 0xDF)
          ? 3
          : (firstByte > 0xBF)
              ? 2
              : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]]
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
  for (var i = 0; i < bytes.length - 1; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype)

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUintLE =
Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUintBE =
Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUint8 =
Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUint16LE =
Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUint16BE =
Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUint32LE =
Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUint32BE =
Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUintLE =
Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUintBE =
Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUint8 =
Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUint16LE =
Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUint16BE =
Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUint32LE =
Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUint32BE =
Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  } else if (typeof val === 'boolean') {
    val = Number(val)
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
var hexSliceLookupTable = (function () {
  var alphabet = '0123456789abcdef'
  var table = new Array(256)
  for (var i = 0; i < 16; ++i) {
    var i16 = i * 16
    for (var j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()


/***/ }),

/***/ "./node_modules/emitter-component/index.js":
/*!*************************************************!*\
  !*** ./node_modules/emitter-component/index.js ***!
  \*************************************************/
/***/ ((module) => {


/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/react-folder-tree/dist/style.css":
/*!*******************************************************!*\
  !*** ./node_modules/react-folder-tree/dist/style.css ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/block/editor.scss":
/*!*******************************!*\
  !*** ./src/block/editor.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/block/style.scss":
/*!******************************!*\
  !*** ./src/block/style.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/react-folder-tree/dist/react-folder-tree.bundle.js":
/*!*************************************************************************!*\
  !*** ./node_modules/react-folder-tree/dist/react-folder-tree.bundle.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

!function(e,t){ true?module.exports=t(__webpack_require__(/*! react */ "react")):0}(self,(function(e){return(()=>{var t={703:(e,t,n)=>{"use strict";var r=n(414);function o(){}function a(){}a.resetWarningCache=o,e.exports=function(){function e(e,t,n,o,a,c){if(c!==r){var i=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw i.name="Invariant Violation",i}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:a,resetWarningCache:o};return n.PropTypes=n,n}},697:(e,t,n)=>{e.exports=n(703)()},414:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},880:(e,t,n)=>{var r;self,e.exports=(r=n(297),(()=>{"use strict";var e={297:e=>{e.exports=r}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r](a,a.exports,n),a.exports}n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};return(()=>{n.r(o),n.d(o,{default:()=>H,findAllTargetPathByProp:()=>S,findTargetNode:()=>f,findTargetPathByProp:()=>k,testData:()=>P});var e=n(297);function t(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function r(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?t(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):t(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e){return function(e){if(Array.isArray(e))return u(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||l(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=l(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,c=!0,i=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return c=e.done,e},e:function(e){i=!0,a=e},f:function(){try{c||null==n.return||n.return()}finally{if(i)throw a}}}}function l(e,t){if(e){if("string"==typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?u(e,t):void 0}}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var s=function(e){return JSON.parse(JSON.stringify(e))},f=function(e,t){var n,r=e,o=i(t);try{for(o.s();!(n=o.n()).done;){var a=n.value,c=r.children;if(a>=c.length||a<0)throw new Error("finding node failed: invalid path!!");r=c[a]}}catch(e){o.e(e)}finally{o.f()}return r},d=function e(t){var n=t.children,r=t._id;return n?Math.max.apply(Math,[r].concat(c(n.map(e)))):r},p=function(e){var t=0;return function e(n){n._id=t,t+=1;var r=n.children;if(r){var o,a=i(r);try{for(a.s();!(o=a.n()).done;)e(o.value)}catch(e){a.e(e)}finally{a.f()}}return n}(s(e))},h=function e(t,n){t.checked=n;var o=t.children;if(o){var a,c=i(o);try{for(c.s();!(a=c.n()).done;)e(a.value,n)}catch(e){c.e(e)}finally{c.f()}}return r({},t)},v=h,y=function e(t){if(0!==t.length){var n=t.pop();n.checked=function(e){var t=e.children;if(!(null!=t&&t.length)>0)return e.checked;var n,r=0,o=i(t);try{for(o.s();!(n=o.n()).done;)r+=n.value.checked}catch(e){o.e(e)}finally{o.f()}var a=.5;return r===t.length?a=1:0===r&&(a=0),a}(n),e(t)}},m=function(e,t,n){var o,a=e,c=[a],l=i(t);try{for(l.s();!(o=l.n()).done;){var u=o.value;a=a.children[u],c.push(a)}}catch(e){l.e(e)}finally{l.f()}return h(a,n),c.pop(),y(c),r({},e)},b=function(e,t,n){return f(e,t).name=n,r({},e)},g=function(e,t){var n=e;if(0===t.length)return n.children=[],n.checked=0,n;var o,a=[n],c=t.pop(),l=i(t);try{for(l.s();!(o=l.n()).done;){var u=o.value;n=n.children[u],a.push(n)}}catch(e){l.e(e)}finally{l.f()}return n.children.splice(c,1),y(a),r({},e)},O=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=d(e)+1,a=f(e,t),c=a.children;if(!c)throw new Error("can't add node to a file!!");return n?c.push({_id:o,name:"new folder",checked:Math.floor(a.checked),children:[]}):c.unshift({_id:o,name:"new file",checked:Math.floor(a.checked)}),r({},e)},w=function(e,t,n){var o=f(e,t);if(!o.children)throw new Error("only parent node (folder) can be opened!!");return o.isOpen=n,r({},e)},C=function e(t,n){var o=r({},t),a=o.children;return a&&(o.isOpen=n,o.children=a.map((function(t){return e(t,n)}))),o},j=function e(t){var n=t.children,r=t.isOpen;if(n&&void 0===r)return!1;if(!n&&void 0!==r)return!1;if(n){var o,a=i(n);try{for(a.s();!(o=a.n()).done;)if(!e(o.value))return!1}catch(e){a.e(e)}finally{a.f()}}return!0},E=function(e,t){for(var n=arguments.length,r=new Array(n>2?n-2:0),o=2;o<n;o++)r[o-2]=arguments[o];return{type:e,path:t,params:r}},S=function(e,t,n){var r=[];return function e(o,a){o[t]===n&&r.push(s(a));var i=o.children;i&&i.forEach((function(t,n){return e(t,[].concat(c(a),[n]))}))}(e,[]),r},k=function(e,t,n){var r=S(e,t,n);return r.length>0?r[0]:null},P={name:"All Cryptos",children:[{name:"Bitcoin"},{name:"Etherium"},{name:"Polkadot"},{name:"POW",children:[{name:"Bitcoin"},{name:"Litecoin"},{name:"Bitcoin Cash"}]},{name:"Public Chains",children:[{name:"Ripple"},{name:"Chainlink"},{name:"POW",children:[{name:"Bitcoin"},{name:"Litecoin"},{name:"Bitcoin Cash"}]},{name:"POS",children:[{name:"Etherium"},{name:"EOS"},{name:"Crosschain",children:[{name:"Polkadot"},{name:"Cosmos"}]}]}]}]};function I(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function N(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function x(e){return function(e){if(Array.isArray(e))return D(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||T(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function A(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=e&&("undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]);if(null!=n){var r,o,a=[],c=!0,i=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);c=!0);}catch(e){i=!0,o=e}finally{try{c||null==n.return||n.return()}finally{if(i)throw o}}return a}}(e,t)||T(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function T(e,t){if(e){if("string"==typeof e)return D(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?D(e,t):void 0}}function D(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}const H=function(t){var n=t.data,r=t.onChange,o=t.options,a=void 0===o?{}:o,c=t.customReducers,i=void 0===c?{}:c,l=A((0,e.useState)(null),2),u=l[0],s=l[1],f=A((0,e.useState)({type:"initialization",path:null,params:[]}),2),d=f[0],h=f[1],y=a.initCheckedStatus,S=a.initOpenStatus;(0,e.useEffect)((function(){var e=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"unchecked",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"open",r=p(e);switch(t){case"unchecked":r=v(r,0);break;case"checked":r=v(r,1)}switch(n){case"open":r=C(r,!0);break;case"closed":r=C(r,!1);break;default:j(r)||(console.log("custom open status is invalid! Fell back to all opened."),r=C(r,!0))}return r}(n,y,S);s(e)}),[n,y,S]),(0,e.useEffect)((function(){"function"==typeof r&&u&&d&&r(u,d)}),[u,d]);var k=function(e,t){return function(n){for(var r=arguments.length,o=new Array(r>1?r-1:0),a=1;a<r;a++)o[a-1]=arguments[a];var c=E.apply(void 0,[t,x(n)].concat(o)),i=e.apply(void 0,[u,x(n)].concat(o));h(c),s(i)}},P=Object.fromEntries(Object.entries(i).map((function(e){var t=A(e,2),n=t[0],r=t[1];return[n,k(r,n)]}))),T=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?I(Object(n),!0).forEach((function(t){N(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):I(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({setTreeState:function(e){var t=E("setTreeState",null,e);h(t),s(e)},checkNode:k(m,"checkNode"),renameNode:k(b,"renameNode"),deleteNode:k(g,"deleteNode"),addNode:k(O,"addNode"),toggleOpen:k(w,"toggleOpen")},P);return{treeState:u,reducers:T}}})(),o})())},297:t=>{"use strict";t.exports=e}},n={};function r(e){var o=n[e];if(void 0!==o)return o.exports;var a=n[e]={exports:{}};return t[e](a,a.exports,r),a.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};return(()=>{"use strict";r.r(o),r.d(o,{default:()=>W,findAllTargetPathByProp:()=>c.findAllTargetPathByProp,findTargetNode:()=>c.findTargetNode,findTargetPathByProp:()=>c.findTargetPathByProp,testData:()=>c.testData});var e=r(297),t=r.n(e),n=r(697),a=r.n(n),c=r(880),i=r.n(c),l={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},u=t().createContext&&t().createContext(l),s=function(){return(s=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function f(e){return e&&e.map((function(e,n){return t().createElement(e.tag,s({key:n},e.attr),f(e.child))}))}function d(e){return function(n){return t().createElement(p,s({attr:s({},e.attr)},n),f(e.child))}}function p(e){var n=function(n){var r,o=e.attr,a=e.size,c=e.title,i=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n}(e,["attr","size","title"]),l=a||n.size||"1em";return n.className&&(r=n.className),e.className&&(r=(r?r+" ":"")+e.className),t().createElement("svg",s({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},n.attr,o,i,{className:r,style:s(s({color:e.color||n.color},n.style),e.style),height:l,width:l,xmlns:"http://www.w3.org/2000/svg"}),c&&t().createElement("title",null,c),e.children)};return void 0!==u?t().createElement(u.Consumer,null,(function(e){return n(e)})):n(l)}function h(e){return d({tag:"svg",attr:{viewBox:"0 0 1024 1024"},child:[{tag:"path",attr:{d:"M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"}}]})(e)}function v(e){return d({tag:"svg",attr:{viewBox:"0 0 1024 1024"},child:[{tag:"path",attr:{d:"M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z"}}]})(e)}function y(e){return d({tag:"svg",attr:{viewBox:"0 0 1024 1024"},child:[{tag:"path",attr:{d:"M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"}}]})(e)}function m(e){return d({tag:"svg",attr:{viewBox:"0 0 1024 1024"},child:[{tag:"path",attr:{d:"M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"}}]})(e)}function b(e){return d({tag:"svg",attr:{viewBox:"0 0 1024 1024"},child:[{tag:"path",attr:{d:"M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"}}]})(e)}function g(e){return d({tag:"svg",attr:{viewBox:"0 0 1024 1024"},child:[{tag:"path",attr:{d:"M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"}}]})(e)}function O(e){return d({tag:"svg",attr:{viewBox:"0 0 1024 1024"},child:[{tag:"path",attr:{d:"M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494zM544 472c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v108H372c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h108v108c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V644h108c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H544V472z"}}]})(e)}function w(e){return d({tag:"svg",attr:{viewBox:"0 0 1024 1024"},child:[{tag:"path",attr:{d:"M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494z"}}]})(e)}function C(e){return d({tag:"svg",attr:{viewBox:"0 0 1024 1024"},child:[{tag:"path",attr:{d:"M484 443.1V528h-84.5c-4.1 0-7.5 3.1-7.5 7v42c0 3.8 3.4 7 7.5 7H484v84.9c0 3.9 3.2 7.1 7 7.1h42c3.9 0 7-3.2 7-7.1V584h84.5c4.1 0 7.5-3.2 7.5-7v-42c0-3.9-3.4-7-7.5-7H540v-84.9c0-3.9-3.1-7.1-7-7.1h-42c-3.8 0-7 3.2-7 7.1zm396-144.7H521L403.7 186.2a8.15 8.15 0 0 0-5.5-2.2H144c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V330.4c0-17.7-14.3-32-32-32zM840 768H184V256h188.5l119.6 114.4H840V768z"}}]})(e)}function j(e){return d({tag:"svg",attr:{viewBox:"0 0 1024 1024"},child:[{tag:"path",attr:{d:"M928 444H820V330.4c0-17.7-14.3-32-32-32H473L355.7 186.2a8.15 8.15 0 0 0-5.5-2.2H96c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h698c13 0 24.8-7.9 29.7-20l134-332c1.5-3.8 2.3-7.9 2.3-12 0-17.7-14.3-32-32-32zM136 256h188.5l119.6 114.4H748V444H238c-13 0-24.8 7.9-29.7 20L136 643.2V256zm635.3 512H159l103.3-256h612.4L771.3 768z"}}]})(e)}function E(e){return d({tag:"svg",attr:{viewBox:"0 0 1024 1024"},child:[{tag:"path",attr:{d:"M880 298.4H521L403.7 186.2a8.15 8.15 0 0 0-5.5-2.2H144c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V330.4c0-17.7-14.3-32-32-32zM840 768H184V256h188.5l119.6 114.4H840V768z"}}]})(e)}var S=function(n){var r=n.status,o=n.onChange,a=1===r,c=.5===r,i=(0,e.useRef)(null);return(0,e.useLayoutEffect)((function(){var e=null==i?void 0:i.current;e&&(e.indeterminate=c)})),t().createElement("div",{className:"CheckBox"},t().createElement("input",{className:"checkboxDOM",type:"checkbox",checked:a,onChange:o,ref:i}))};S.propTypes={status:a().number.isRequired,onChange:a().func.isRequired};const k=S,P=(0,e.createContext)(null);var I=function(e){return"iconContainer ".concat(e)},N=function(e){return"icon ".concat(e)},x=function(e){return function(n){var r=n.className,o=n.onClick;return t().createElement(e,{className:r,onClick:o})}};function A(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var T=function(n){var r,o,a=n.isEditing,c=n.setIsEditing,i=n.onNameChange,l=n.OKIcon,u=n.CancelIcon,s=n.nodeData,f=s.name,d=(r=(0,e.useState)(f),o=2,function(e){if(Array.isArray(e))return e}(r)||function(e,t){var n=e&&("undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]);if(null!=n){var r,o,a=[],c=!0,i=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);c=!0);}catch(e){i=!0,o=e}finally{try{c||null==n.return||n.return()}finally{if(i)throw o}}return a}}(r,o)||function(e,t){if(e){if("string"==typeof e)return A(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?A(e,t):void 0}}(r,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),p=d[0],h=d[1],v=t().createElement("span",{className:"editingName"},t().createElement("input",{type:"text",value:p,onChange:function(e){return h(e.target.value)}}),t().createElement("span",{className:I("editableNameToolbar")},t().createElement(l,{className:N("OKIcon"),onClick:function(){i(p),c(!1)},nodeData:s}),t().createElement(u,{className:N("CancelIcon"),onClick:function(){h(f),c(!1)},nodeData:s}))),y=t().createElement("span",{className:"displayName"},f);return t().createElement("span",{className:"EditableName"},a?v:y)};T.propTypes={isEditing:a().bool.isRequired,setIsEditing:a().func.isRequired,onNameChange:a().func.isRequired,OKIcon:a().func.isRequired,CancelIcon:a().func.isRequired,nodeData:a().object.isRequired};const D=T;var H=["path","name","checked","isOpen","children"];function M(){return(M=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function z(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=e&&("undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]);if(null!=n){var r,o,a=[],c=!0,i=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);c=!0);}catch(e){i=!0,o=e}finally{try{c||null==n.return||n.return()}finally{if(i)throw o}}return a}}(e,t)||B(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function B(e,t){if(e){if("string"==typeof e)return L(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?L(e,t):void 0}}function L(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function R(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function F(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var _=function n(r){var o=r.path,a=r.name,c=r.checked,i=r.isOpen,l=r.children,u=function(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}(r,H),s=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?R(Object(n),!0).forEach((function(t){F(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):R(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({path:o,name:a,checked:c,isOpen:i},u),f=(0,e.useContext)(P),d=f.handleCheck,p=f.handleRename,S=f.handleDelete,A=f.handleAddNode,T=f.handleToggleOpen,_=f.iconComponents,V=f.indentPixels,q=f.onNameClick,U=f.showCheckbox,W=f.readOnly,K=!!l,$={marginLeft:o.length*V},J=z((0,e.useState)(!1),2),Y=J[0],G=J[1],Q=z((0,e.useState)(!1),2),X=Q[0],Z=Q[1],ee=_.FileIcon,te=void 0===ee?x(w):ee,ne=_.FolderIcon,re=void 0===ne?x(E):ne,oe=_.FolderOpenIcon,ae=void 0===oe?x(j):oe,ce=_.EditIcon,ie=void 0===ce?x(g):ce,le=_.DeleteIcon,ue=void 0===le?x(b):le,se=_.CancelIcon,fe=void 0===se?x(m):se,de=_.AddFileIcon,pe=void 0===de?x(O):de,he=_.AddFolderIcon,ve=void 0===he?x(C):he,ye=_.CaretRightIcon,me=void 0===ye?x(v):ye,be=_.CaretDownIcon,ge=void 0===be?x(h):be,Oe=_.OKIcon,we=void 0===Oe?x(y):Oe,Ce=te,je="FileIcon";K&&(Ce=i?ae:re,je=i?"FolderOpenIcon":"FolderIcon");var Ee=function(){return!X&&!W&&G(!0)},Se=t().createElement("span",{className:I("TreeNodeToolBar")},t().createElement(ie,{className:N("EditIcon"),onClick:function(){Z(!0),G(!1)},nodeData:s}),t().createElement(ue,{className:N("DeleteIcon"),onClick:function(){return S(o)},nodeData:s}),K&&t().createElement(t().Fragment,null,t().createElement(pe,{className:N("AddFileIcon"),onClick:function(){return A(o,!1)},nodeData:s}),t().createElement(ve,{className:N("AddFolderIcon"),onClick:function(){return A(o,!0)},nodeData:s})),t().createElement(fe,{className:N("CancelIcon"),onClick:function(){return G(!1)},nodeData:s})),ke=t().createElement("span",{className:I("caretContainer")},i?t().createElement(ge,{className:N("CaretDownIcon"),onClick:function(){return T(o,!1)},nodeData:s}):t().createElement(me,{className:N("CaretRightIcon"),onClick:function(){return T(o,!0)},nodeData:s}));return t().createElement(t().Fragment,null,t().createElement("div",{className:"TreeNode",style:$},U&&t().createElement(k,{status:c,onChange:function(e){if(!W){var t=+e.target.checked;d(o,t)}}}),K&&ke,t().createElement("span",{className:I("typeIconContainer")},t().createElement(Ce,{className:N(je),onClick:Ee,nodeData:s})),t().createElement("span",{className:I("editableNameContainer"),onClick:function(){var e=Ee;q&&"function"==typeof q?!X&&q({defaultOnClick:e,nodeData:s}):e()}},t().createElement(D,{isEditing:X,setIsEditing:Z,onNameChange:function(e){return p(o,e)},OKIcon:we,CancelIcon:fe,nodeData:s})),Y&&Se),K&&i&&l.map((function(e,r){return t().createElement(n,M({key:e._id,path:[].concat((a=o,function(e){if(Array.isArray(e))return L(e)}(a)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(a)||B(a)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),[r])},e));var a})))};_.propTypes={path:a().array.isRequired,name:a().string.isRequired,checked:a().number.isRequired,isOpen:a().bool,children:a().array};const V=_;function q(){return(q=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var U=function(e){var n=e.data,r=e.onChange,o=void 0===r?console.log:r,a=e.initCheckedStatus,c=void 0===a?"unchecked":a,l=e.initOpenStatus,u=void 0===l?"open":l,s=e.iconComponents,f=void 0===s?{}:s,d=e.showCheckbox,p=void 0===d||d,h=e.indentPixels,v=void 0===h?30:h,y=e.onNameClick,m=void 0===y?null:y,b=e.readOnly,g=void 0!==b&&b,O={initCheckedStatus:c,initOpenStatus:u},w=i()({data:n,options:O,onChange:o}),C=w.treeState,j=w.reducers,E=j.checkNode,S=j.renameNode,k=j.deleteNode,I=j.addNode,N=j.toggleOpen;if(!C)return null;var x={handleCheck:E,handleRename:S,handleDelete:k,handleAddNode:I,handleToggleOpen:N,onNameClick:m,iconComponents:f,indentPixels:v,showCheckbox:p,readOnly:g};return t().createElement("div",{className:"FolderTree"},t().createElement(P.Provider,{value:x},t().createElement(V,q({key:C._id,path:[]},C))))};U.propTypes={data:a().object.isRequired,onChange:a().func,initCheckedStatus:a().string,initOpenStatus:a().string,iconComponents:a().shape({FileIcon:a().func,FolderIcon:a().func,FolderOpenIcon:a().func,EditIcon:a().func,DeleteIcon:a().func,CancelIcon:a().func,AddFileIcon:a().func,AddFolderIcon:a().func,CaretRightIcon:a().func,CaretDownIcon:a().func}),indentPixels:a().number,onNameClick:a().func,showCheckbox:a().bool,readOnly:a().bool};const W=U})(),o})()}));

/***/ }),

/***/ "./node_modules/safe-buffer/index.js":
/*!*******************************************!*\
  !*** ./node_modules/safe-buffer/index.js ***!
  \*******************************************/
/***/ ((module, exports, __webpack_require__) => {

/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.prototype = Object.create(Buffer.prototype)

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),

/***/ "./node_modules/sax/lib/sax.js":
/*!*************************************!*\
  !*** ./node_modules/sax/lib/sax.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

;(function (sax) { // wrapper for non-node envs
  sax.parser = function (strict, opt) { return new SAXParser(strict, opt) }
  sax.SAXParser = SAXParser
  sax.SAXStream = SAXStream
  sax.createStream = createStream

  // When we pass the MAX_BUFFER_LENGTH position, start checking for buffer overruns.
  // When we check, schedule the next check for MAX_BUFFER_LENGTH - (max(buffer lengths)),
  // since that's the earliest that a buffer overrun could occur.  This way, checks are
  // as rare as required, but as often as necessary to ensure never crossing this bound.
  // Furthermore, buffers are only tested at most once per write(), so passing a very
  // large string into write() might have undesirable effects, but this is manageable by
  // the caller, so it is assumed to be safe.  Thus, a call to write() may, in the extreme
  // edge case, result in creating at most one complete copy of the string passed in.
  // Set to Infinity to have unlimited buffers.
  sax.MAX_BUFFER_LENGTH = 64 * 1024

  var buffers = [
    'comment', 'sgmlDecl', 'textNode', 'tagName', 'doctype',
    'procInstName', 'procInstBody', 'entity', 'attribName',
    'attribValue', 'cdata', 'script'
  ]

  sax.EVENTS = [
    'text',
    'processinginstruction',
    'sgmldeclaration',
    'doctype',
    'comment',
    'opentagstart',
    'attribute',
    'opentag',
    'closetag',
    'opencdata',
    'cdata',
    'closecdata',
    'error',
    'end',
    'ready',
    'script',
    'opennamespace',
    'closenamespace'
  ]

  function SAXParser (strict, opt) {
    if (!(this instanceof SAXParser)) {
      return new SAXParser(strict, opt)
    }

    var parser = this
    clearBuffers(parser)
    parser.q = parser.c = ''
    parser.bufferCheckPosition = sax.MAX_BUFFER_LENGTH
    parser.opt = opt || {}
    parser.opt.lowercase = parser.opt.lowercase || parser.opt.lowercasetags
    parser.looseCase = parser.opt.lowercase ? 'toLowerCase' : 'toUpperCase'
    parser.tags = []
    parser.closed = parser.closedRoot = parser.sawRoot = false
    parser.tag = parser.error = null
    parser.strict = !!strict
    parser.noscript = !!(strict || parser.opt.noscript)
    parser.state = S.BEGIN
    parser.strictEntities = parser.opt.strictEntities
    parser.ENTITIES = parser.strictEntities ? Object.create(sax.XML_ENTITIES) : Object.create(sax.ENTITIES)
    parser.attribList = []

    // namespaces form a prototype chain.
    // it always points at the current tag,
    // which protos to its parent tag.
    if (parser.opt.xmlns) {
      parser.ns = Object.create(rootNS)
    }

    // mostly just for error reporting
    parser.trackPosition = parser.opt.position !== false
    if (parser.trackPosition) {
      parser.position = parser.line = parser.column = 0
    }
    emit(parser, 'onready')
  }

  if (!Object.create) {
    Object.create = function (o) {
      function F () {}
      F.prototype = o
      var newf = new F()
      return newf
    }
  }

  if (!Object.keys) {
    Object.keys = function (o) {
      var a = []
      for (var i in o) if (o.hasOwnProperty(i)) a.push(i)
      return a
    }
  }

  function checkBufferLength (parser) {
    var maxAllowed = Math.max(sax.MAX_BUFFER_LENGTH, 10)
    var maxActual = 0
    for (var i = 0, l = buffers.length; i < l; i++) {
      var len = parser[buffers[i]].length
      if (len > maxAllowed) {
        // Text/cdata nodes can get big, and since they're buffered,
        // we can get here under normal conditions.
        // Avoid issues by emitting the text node now,
        // so at least it won't get any bigger.
        switch (buffers[i]) {
          case 'textNode':
            closeText(parser)
            break

          case 'cdata':
            emitNode(parser, 'oncdata', parser.cdata)
            parser.cdata = ''
            break

          case 'script':
            emitNode(parser, 'onscript', parser.script)
            parser.script = ''
            break

          default:
            error(parser, 'Max buffer length exceeded: ' + buffers[i])
        }
      }
      maxActual = Math.max(maxActual, len)
    }
    // schedule the next check for the earliest possible buffer overrun.
    var m = sax.MAX_BUFFER_LENGTH - maxActual
    parser.bufferCheckPosition = m + parser.position
  }

  function clearBuffers (parser) {
    for (var i = 0, l = buffers.length; i < l; i++) {
      parser[buffers[i]] = ''
    }
  }

  function flushBuffers (parser) {
    closeText(parser)
    if (parser.cdata !== '') {
      emitNode(parser, 'oncdata', parser.cdata)
      parser.cdata = ''
    }
    if (parser.script !== '') {
      emitNode(parser, 'onscript', parser.script)
      parser.script = ''
    }
  }

  SAXParser.prototype = {
    end: function () { end(this) },
    write: write,
    resume: function () { this.error = null; return this },
    close: function () { return this.write(null) },
    flush: function () { flushBuffers(this) }
  }

  var Stream
  try {
    Stream = (__webpack_require__(/*! stream */ "./node_modules/stream/index.js").Stream)
  } catch (ex) {
    Stream = function () {}
  }
  if (!Stream) Stream = function () {}

  var streamWraps = sax.EVENTS.filter(function (ev) {
    return ev !== 'error' && ev !== 'end'
  })

  function createStream (strict, opt) {
    return new SAXStream(strict, opt)
  }

  function SAXStream (strict, opt) {
    if (!(this instanceof SAXStream)) {
      return new SAXStream(strict, opt)
    }

    Stream.apply(this)

    this._parser = new SAXParser(strict, opt)
    this.writable = true
    this.readable = true

    var me = this

    this._parser.onend = function () {
      me.emit('end')
    }

    this._parser.onerror = function (er) {
      me.emit('error', er)

      // if didn't throw, then means error was handled.
      // go ahead and clear error, so we can write again.
      me._parser.error = null
    }

    this._decoder = null

    streamWraps.forEach(function (ev) {
      Object.defineProperty(me, 'on' + ev, {
        get: function () {
          return me._parser['on' + ev]
        },
        set: function (h) {
          if (!h) {
            me.removeAllListeners(ev)
            me._parser['on' + ev] = h
            return h
          }
          me.on(ev, h)
        },
        enumerable: true,
        configurable: false
      })
    })
  }

  SAXStream.prototype = Object.create(Stream.prototype, {
    constructor: {
      value: SAXStream
    }
  })

  SAXStream.prototype.write = function (data) {
    if (typeof Buffer === 'function' &&
      typeof Buffer.isBuffer === 'function' &&
      Buffer.isBuffer(data)) {
      if (!this._decoder) {
        var SD = (__webpack_require__(/*! string_decoder */ "./node_modules/string_decoder/lib/string_decoder.js").StringDecoder)
        this._decoder = new SD('utf8')
      }
      data = this._decoder.write(data)
    }

    this._parser.write(data.toString())
    this.emit('data', data)
    return true
  }

  SAXStream.prototype.end = function (chunk) {
    if (chunk && chunk.length) {
      this.write(chunk)
    }
    this._parser.end()
    return true
  }

  SAXStream.prototype.on = function (ev, handler) {
    var me = this
    if (!me._parser['on' + ev] && streamWraps.indexOf(ev) !== -1) {
      me._parser['on' + ev] = function () {
        var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments)
        args.splice(0, 0, ev)
        me.emit.apply(me, args)
      }
    }

    return Stream.prototype.on.call(me, ev, handler)
  }

  // this really needs to be replaced with character classes.
  // XML allows all manner of ridiculous numbers and digits.
  var CDATA = '[CDATA['
  var DOCTYPE = 'DOCTYPE'
  var XML_NAMESPACE = 'http://www.w3.org/XML/1998/namespace'
  var XMLNS_NAMESPACE = 'http://www.w3.org/2000/xmlns/'
  var rootNS = { xml: XML_NAMESPACE, xmlns: XMLNS_NAMESPACE }

  // http://www.w3.org/TR/REC-xml/#NT-NameStartChar
  // This implementation works on strings, a single character at a time
  // as such, it cannot ever support astral-plane characters (10000-EFFFF)
  // without a significant breaking change to either this  parser, or the
  // JavaScript language.  Implementation of an emoji-capable xml parser
  // is left as an exercise for the reader.
  var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/

  var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/

  var entityStart = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/
  var entityBody = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/

  function isWhitespace (c) {
    return c === ' ' || c === '\n' || c === '\r' || c === '\t'
  }

  function isQuote (c) {
    return c === '"' || c === '\''
  }

  function isAttribEnd (c) {
    return c === '>' || isWhitespace(c)
  }

  function isMatch (regex, c) {
    return regex.test(c)
  }

  function notMatch (regex, c) {
    return !isMatch(regex, c)
  }

  var S = 0
  sax.STATE = {
    BEGIN: S++, // leading byte order mark or whitespace
    BEGIN_WHITESPACE: S++, // leading whitespace
    TEXT: S++, // general stuff
    TEXT_ENTITY: S++, // &amp and such.
    OPEN_WAKA: S++, // <
    SGML_DECL: S++, // <!BLARG
    SGML_DECL_QUOTED: S++, // <!BLARG foo "bar
    DOCTYPE: S++, // <!DOCTYPE
    DOCTYPE_QUOTED: S++, // <!DOCTYPE "//blah
    DOCTYPE_DTD: S++, // <!DOCTYPE "//blah" [ ...
    DOCTYPE_DTD_QUOTED: S++, // <!DOCTYPE "//blah" [ "foo
    COMMENT_STARTING: S++, // <!-
    COMMENT: S++, // <!--
    COMMENT_ENDING: S++, // <!-- blah -
    COMMENT_ENDED: S++, // <!-- blah --
    CDATA: S++, // <![CDATA[ something
    CDATA_ENDING: S++, // ]
    CDATA_ENDING_2: S++, // ]]
    PROC_INST: S++, // <?hi
    PROC_INST_BODY: S++, // <?hi there
    PROC_INST_ENDING: S++, // <?hi "there" ?
    OPEN_TAG: S++, // <strong
    OPEN_TAG_SLASH: S++, // <strong /
    ATTRIB: S++, // <a
    ATTRIB_NAME: S++, // <a foo
    ATTRIB_NAME_SAW_WHITE: S++, // <a foo _
    ATTRIB_VALUE: S++, // <a foo=
    ATTRIB_VALUE_QUOTED: S++, // <a foo="bar
    ATTRIB_VALUE_CLOSED: S++, // <a foo="bar"
    ATTRIB_VALUE_UNQUOTED: S++, // <a foo=bar
    ATTRIB_VALUE_ENTITY_Q: S++, // <foo bar="&quot;"
    ATTRIB_VALUE_ENTITY_U: S++, // <foo bar=&quot
    CLOSE_TAG: S++, // </a
    CLOSE_TAG_SAW_WHITE: S++, // </a   >
    SCRIPT: S++, // <script> ...
    SCRIPT_ENDING: S++ // <script> ... <
  }

  sax.XML_ENTITIES = {
    'amp': '&',
    'gt': '>',
    'lt': '<',
    'quot': '"',
    'apos': "'"
  }

  sax.ENTITIES = {
    'amp': '&',
    'gt': '>',
    'lt': '<',
    'quot': '"',
    'apos': "'",
    'AElig': 198,
    'Aacute': 193,
    'Acirc': 194,
    'Agrave': 192,
    'Aring': 197,
    'Atilde': 195,
    'Auml': 196,
    'Ccedil': 199,
    'ETH': 208,
    'Eacute': 201,
    'Ecirc': 202,
    'Egrave': 200,
    'Euml': 203,
    'Iacute': 205,
    'Icirc': 206,
    'Igrave': 204,
    'Iuml': 207,
    'Ntilde': 209,
    'Oacute': 211,
    'Ocirc': 212,
    'Ograve': 210,
    'Oslash': 216,
    'Otilde': 213,
    'Ouml': 214,
    'THORN': 222,
    'Uacute': 218,
    'Ucirc': 219,
    'Ugrave': 217,
    'Uuml': 220,
    'Yacute': 221,
    'aacute': 225,
    'acirc': 226,
    'aelig': 230,
    'agrave': 224,
    'aring': 229,
    'atilde': 227,
    'auml': 228,
    'ccedil': 231,
    'eacute': 233,
    'ecirc': 234,
    'egrave': 232,
    'eth': 240,
    'euml': 235,
    'iacute': 237,
    'icirc': 238,
    'igrave': 236,
    'iuml': 239,
    'ntilde': 241,
    'oacute': 243,
    'ocirc': 244,
    'ograve': 242,
    'oslash': 248,
    'otilde': 245,
    'ouml': 246,
    'szlig': 223,
    'thorn': 254,
    'uacute': 250,
    'ucirc': 251,
    'ugrave': 249,
    'uuml': 252,
    'yacute': 253,
    'yuml': 255,
    'copy': 169,
    'reg': 174,
    'nbsp': 160,
    'iexcl': 161,
    'cent': 162,
    'pound': 163,
    'curren': 164,
    'yen': 165,
    'brvbar': 166,
    'sect': 167,
    'uml': 168,
    'ordf': 170,
    'laquo': 171,
    'not': 172,
    'shy': 173,
    'macr': 175,
    'deg': 176,
    'plusmn': 177,
    'sup1': 185,
    'sup2': 178,
    'sup3': 179,
    'acute': 180,
    'micro': 181,
    'para': 182,
    'middot': 183,
    'cedil': 184,
    'ordm': 186,
    'raquo': 187,
    'frac14': 188,
    'frac12': 189,
    'frac34': 190,
    'iquest': 191,
    'times': 215,
    'divide': 247,
    'OElig': 338,
    'oelig': 339,
    'Scaron': 352,
    'scaron': 353,
    'Yuml': 376,
    'fnof': 402,
    'circ': 710,
    'tilde': 732,
    'Alpha': 913,
    'Beta': 914,
    'Gamma': 915,
    'Delta': 916,
    'Epsilon': 917,
    'Zeta': 918,
    'Eta': 919,
    'Theta': 920,
    'Iota': 921,
    'Kappa': 922,
    'Lambda': 923,
    'Mu': 924,
    'Nu': 925,
    'Xi': 926,
    'Omicron': 927,
    'Pi': 928,
    'Rho': 929,
    'Sigma': 931,
    'Tau': 932,
    'Upsilon': 933,
    'Phi': 934,
    'Chi': 935,
    'Psi': 936,
    'Omega': 937,
    'alpha': 945,
    'beta': 946,
    'gamma': 947,
    'delta': 948,
    'epsilon': 949,
    'zeta': 950,
    'eta': 951,
    'theta': 952,
    'iota': 953,
    'kappa': 954,
    'lambda': 955,
    'mu': 956,
    'nu': 957,
    'xi': 958,
    'omicron': 959,
    'pi': 960,
    'rho': 961,
    'sigmaf': 962,
    'sigma': 963,
    'tau': 964,
    'upsilon': 965,
    'phi': 966,
    'chi': 967,
    'psi': 968,
    'omega': 969,
    'thetasym': 977,
    'upsih': 978,
    'piv': 982,
    'ensp': 8194,
    'emsp': 8195,
    'thinsp': 8201,
    'zwnj': 8204,
    'zwj': 8205,
    'lrm': 8206,
    'rlm': 8207,
    'ndash': 8211,
    'mdash': 8212,
    'lsquo': 8216,
    'rsquo': 8217,
    'sbquo': 8218,
    'ldquo': 8220,
    'rdquo': 8221,
    'bdquo': 8222,
    'dagger': 8224,
    'Dagger': 8225,
    'bull': 8226,
    'hellip': 8230,
    'permil': 8240,
    'prime': 8242,
    'Prime': 8243,
    'lsaquo': 8249,
    'rsaquo': 8250,
    'oline': 8254,
    'frasl': 8260,
    'euro': 8364,
    'image': 8465,
    'weierp': 8472,
    'real': 8476,
    'trade': 8482,
    'alefsym': 8501,
    'larr': 8592,
    'uarr': 8593,
    'rarr': 8594,
    'darr': 8595,
    'harr': 8596,
    'crarr': 8629,
    'lArr': 8656,
    'uArr': 8657,
    'rArr': 8658,
    'dArr': 8659,
    'hArr': 8660,
    'forall': 8704,
    'part': 8706,
    'exist': 8707,
    'empty': 8709,
    'nabla': 8711,
    'isin': 8712,
    'notin': 8713,
    'ni': 8715,
    'prod': 8719,
    'sum': 8721,
    'minus': 8722,
    'lowast': 8727,
    'radic': 8730,
    'prop': 8733,
    'infin': 8734,
    'ang': 8736,
    'and': 8743,
    'or': 8744,
    'cap': 8745,
    'cup': 8746,
    'int': 8747,
    'there4': 8756,
    'sim': 8764,
    'cong': 8773,
    'asymp': 8776,
    'ne': 8800,
    'equiv': 8801,
    'le': 8804,
    'ge': 8805,
    'sub': 8834,
    'sup': 8835,
    'nsub': 8836,
    'sube': 8838,
    'supe': 8839,
    'oplus': 8853,
    'otimes': 8855,
    'perp': 8869,
    'sdot': 8901,
    'lceil': 8968,
    'rceil': 8969,
    'lfloor': 8970,
    'rfloor': 8971,
    'lang': 9001,
    'rang': 9002,
    'loz': 9674,
    'spades': 9824,
    'clubs': 9827,
    'hearts': 9829,
    'diams': 9830
  }

  Object.keys(sax.ENTITIES).forEach(function (key) {
    var e = sax.ENTITIES[key]
    var s = typeof e === 'number' ? String.fromCharCode(e) : e
    sax.ENTITIES[key] = s
  })

  for (var s in sax.STATE) {
    sax.STATE[sax.STATE[s]] = s
  }

  // shorthand
  S = sax.STATE

  function emit (parser, event, data) {
    parser[event] && parser[event](data)
  }

  function emitNode (parser, nodeType, data) {
    if (parser.textNode) closeText(parser)
    emit(parser, nodeType, data)
  }

  function closeText (parser) {
    parser.textNode = textopts(parser.opt, parser.textNode)
    if (parser.textNode) emit(parser, 'ontext', parser.textNode)
    parser.textNode = ''
  }

  function textopts (opt, text) {
    if (opt.trim) text = text.trim()
    if (opt.normalize) text = text.replace(/\s+/g, ' ')
    return text
  }

  function error (parser, er) {
    closeText(parser)
    if (parser.trackPosition) {
      er += '\nLine: ' + parser.line +
        '\nColumn: ' + parser.column +
        '\nChar: ' + parser.c
    }
    er = new Error(er)
    parser.error = er
    emit(parser, 'onerror', er)
    return parser
  }

  function end (parser) {
    if (parser.sawRoot && !parser.closedRoot) strictFail(parser, 'Unclosed root tag')
    if ((parser.state !== S.BEGIN) &&
      (parser.state !== S.BEGIN_WHITESPACE) &&
      (parser.state !== S.TEXT)) {
      error(parser, 'Unexpected end')
    }
    closeText(parser)
    parser.c = ''
    parser.closed = true
    emit(parser, 'onend')
    SAXParser.call(parser, parser.strict, parser.opt)
    return parser
  }

  function strictFail (parser, message) {
    if (typeof parser !== 'object' || !(parser instanceof SAXParser)) {
      throw new Error('bad call to strictFail')
    }
    if (parser.strict) {
      error(parser, message)
    }
  }

  function newTag (parser) {
    if (!parser.strict) parser.tagName = parser.tagName[parser.looseCase]()
    var parent = parser.tags[parser.tags.length - 1] || parser
    var tag = parser.tag = { name: parser.tagName, attributes: {} }

    // will be overridden if tag contails an xmlns="foo" or xmlns:foo="bar"
    if (parser.opt.xmlns) {
      tag.ns = parent.ns
    }
    parser.attribList.length = 0
    emitNode(parser, 'onopentagstart', tag)
  }

  function qname (name, attribute) {
    var i = name.indexOf(':')
    var qualName = i < 0 ? [ '', name ] : name.split(':')
    var prefix = qualName[0]
    var local = qualName[1]

    // <x "xmlns"="http://foo">
    if (attribute && name === 'xmlns') {
      prefix = 'xmlns'
      local = ''
    }

    return { prefix: prefix, local: local }
  }

  function attrib (parser) {
    if (!parser.strict) {
      parser.attribName = parser.attribName[parser.looseCase]()
    }

    if (parser.attribList.indexOf(parser.attribName) !== -1 ||
      parser.tag.attributes.hasOwnProperty(parser.attribName)) {
      parser.attribName = parser.attribValue = ''
      return
    }

    if (parser.opt.xmlns) {
      var qn = qname(parser.attribName, true)
      var prefix = qn.prefix
      var local = qn.local

      if (prefix === 'xmlns') {
        // namespace binding attribute. push the binding into scope
        if (local === 'xml' && parser.attribValue !== XML_NAMESPACE) {
          strictFail(parser,
            'xml: prefix must be bound to ' + XML_NAMESPACE + '\n' +
            'Actual: ' + parser.attribValue)
        } else if (local === 'xmlns' && parser.attribValue !== XMLNS_NAMESPACE) {
          strictFail(parser,
            'xmlns: prefix must be bound to ' + XMLNS_NAMESPACE + '\n' +
            'Actual: ' + parser.attribValue)
        } else {
          var tag = parser.tag
          var parent = parser.tags[parser.tags.length - 1] || parser
          if (tag.ns === parent.ns) {
            tag.ns = Object.create(parent.ns)
          }
          tag.ns[local] = parser.attribValue
        }
      }

      // defer onattribute events until all attributes have been seen
      // so any new bindings can take effect. preserve attribute order
      // so deferred events can be emitted in document order
      parser.attribList.push([parser.attribName, parser.attribValue])
    } else {
      // in non-xmlns mode, we can emit the event right away
      parser.tag.attributes[parser.attribName] = parser.attribValue
      emitNode(parser, 'onattribute', {
        name: parser.attribName,
        value: parser.attribValue
      })
    }

    parser.attribName = parser.attribValue = ''
  }

  function openTag (parser, selfClosing) {
    if (parser.opt.xmlns) {
      // emit namespace binding events
      var tag = parser.tag

      // add namespace info to tag
      var qn = qname(parser.tagName)
      tag.prefix = qn.prefix
      tag.local = qn.local
      tag.uri = tag.ns[qn.prefix] || ''

      if (tag.prefix && !tag.uri) {
        strictFail(parser, 'Unbound namespace prefix: ' +
          JSON.stringify(parser.tagName))
        tag.uri = qn.prefix
      }

      var parent = parser.tags[parser.tags.length - 1] || parser
      if (tag.ns && parent.ns !== tag.ns) {
        Object.keys(tag.ns).forEach(function (p) {
          emitNode(parser, 'onopennamespace', {
            prefix: p,
            uri: tag.ns[p]
          })
        })
      }

      // handle deferred onattribute events
      // Note: do not apply default ns to attributes:
      //   http://www.w3.org/TR/REC-xml-names/#defaulting
      for (var i = 0, l = parser.attribList.length; i < l; i++) {
        var nv = parser.attribList[i]
        var name = nv[0]
        var value = nv[1]
        var qualName = qname(name, true)
        var prefix = qualName.prefix
        var local = qualName.local
        var uri = prefix === '' ? '' : (tag.ns[prefix] || '')
        var a = {
          name: name,
          value: value,
          prefix: prefix,
          local: local,
          uri: uri
        }

        // if there's any attributes with an undefined namespace,
        // then fail on them now.
        if (prefix && prefix !== 'xmlns' && !uri) {
          strictFail(parser, 'Unbound namespace prefix: ' +
            JSON.stringify(prefix))
          a.uri = prefix
        }
        parser.tag.attributes[name] = a
        emitNode(parser, 'onattribute', a)
      }
      parser.attribList.length = 0
    }

    parser.tag.isSelfClosing = !!selfClosing

    // process the tag
    parser.sawRoot = true
    parser.tags.push(parser.tag)
    emitNode(parser, 'onopentag', parser.tag)
    if (!selfClosing) {
      // special case for <script> in non-strict mode.
      if (!parser.noscript && parser.tagName.toLowerCase() === 'script') {
        parser.state = S.SCRIPT
      } else {
        parser.state = S.TEXT
      }
      parser.tag = null
      parser.tagName = ''
    }
    parser.attribName = parser.attribValue = ''
    parser.attribList.length = 0
  }

  function closeTag (parser) {
    if (!parser.tagName) {
      strictFail(parser, 'Weird empty close tag.')
      parser.textNode += '</>'
      parser.state = S.TEXT
      return
    }

    if (parser.script) {
      if (parser.tagName !== 'script') {
        parser.script += '</' + parser.tagName + '>'
        parser.tagName = ''
        parser.state = S.SCRIPT
        return
      }
      emitNode(parser, 'onscript', parser.script)
      parser.script = ''
    }

    // first make sure that the closing tag actually exists.
    // <a><b></c></b></a> will close everything, otherwise.
    var t = parser.tags.length
    var tagName = parser.tagName
    if (!parser.strict) {
      tagName = tagName[parser.looseCase]()
    }
    var closeTo = tagName
    while (t--) {
      var close = parser.tags[t]
      if (close.name !== closeTo) {
        // fail the first time in strict mode
        strictFail(parser, 'Unexpected close tag')
      } else {
        break
      }
    }

    // didn't find it.  we already failed for strict, so just abort.
    if (t < 0) {
      strictFail(parser, 'Unmatched closing tag: ' + parser.tagName)
      parser.textNode += '</' + parser.tagName + '>'
      parser.state = S.TEXT
      return
    }
    parser.tagName = tagName
    var s = parser.tags.length
    while (s-- > t) {
      var tag = parser.tag = parser.tags.pop()
      parser.tagName = parser.tag.name
      emitNode(parser, 'onclosetag', parser.tagName)

      var x = {}
      for (var i in tag.ns) {
        x[i] = tag.ns[i]
      }

      var parent = parser.tags[parser.tags.length - 1] || parser
      if (parser.opt.xmlns && tag.ns !== parent.ns) {
        // remove namespace bindings introduced by tag
        Object.keys(tag.ns).forEach(function (p) {
          var n = tag.ns[p]
          emitNode(parser, 'onclosenamespace', { prefix: p, uri: n })
        })
      }
    }
    if (t === 0) parser.closedRoot = true
    parser.tagName = parser.attribValue = parser.attribName = ''
    parser.attribList.length = 0
    parser.state = S.TEXT
  }

  function parseEntity (parser) {
    var entity = parser.entity
    var entityLC = entity.toLowerCase()
    var num
    var numStr = ''

    if (parser.ENTITIES[entity]) {
      return parser.ENTITIES[entity]
    }
    if (parser.ENTITIES[entityLC]) {
      return parser.ENTITIES[entityLC]
    }
    entity = entityLC
    if (entity.charAt(0) === '#') {
      if (entity.charAt(1) === 'x') {
        entity = entity.slice(2)
        num = parseInt(entity, 16)
        numStr = num.toString(16)
      } else {
        entity = entity.slice(1)
        num = parseInt(entity, 10)
        numStr = num.toString(10)
      }
    }
    entity = entity.replace(/^0+/, '')
    if (isNaN(num) || numStr.toLowerCase() !== entity) {
      strictFail(parser, 'Invalid character entity')
      return '&' + parser.entity + ';'
    }

    return String.fromCodePoint(num)
  }

  function beginWhiteSpace (parser, c) {
    if (c === '<') {
      parser.state = S.OPEN_WAKA
      parser.startTagPosition = parser.position
    } else if (!isWhitespace(c)) {
      // have to process this as a text node.
      // weird, but happens.
      strictFail(parser, 'Non-whitespace before first tag.')
      parser.textNode = c
      parser.state = S.TEXT
    }
  }

  function charAt (chunk, i) {
    var result = ''
    if (i < chunk.length) {
      result = chunk.charAt(i)
    }
    return result
  }

  function write (chunk) {
    var parser = this
    if (this.error) {
      throw this.error
    }
    if (parser.closed) {
      return error(parser,
        'Cannot write after close. Assign an onready handler.')
    }
    if (chunk === null) {
      return end(parser)
    }
    if (typeof chunk === 'object') {
      chunk = chunk.toString()
    }
    var i = 0
    var c = ''
    while (true) {
      c = charAt(chunk, i++)
      parser.c = c

      if (!c) {
        break
      }

      if (parser.trackPosition) {
        parser.position++
        if (c === '\n') {
          parser.line++
          parser.column = 0
        } else {
          parser.column++
        }
      }

      switch (parser.state) {
        case S.BEGIN:
          parser.state = S.BEGIN_WHITESPACE
          if (c === '\uFEFF') {
            continue
          }
          beginWhiteSpace(parser, c)
          continue

        case S.BEGIN_WHITESPACE:
          beginWhiteSpace(parser, c)
          continue

        case S.TEXT:
          if (parser.sawRoot && !parser.closedRoot) {
            var starti = i - 1
            while (c && c !== '<' && c !== '&') {
              c = charAt(chunk, i++)
              if (c && parser.trackPosition) {
                parser.position++
                if (c === '\n') {
                  parser.line++
                  parser.column = 0
                } else {
                  parser.column++
                }
              }
            }
            parser.textNode += chunk.substring(starti, i - 1)
          }
          if (c === '<' && !(parser.sawRoot && parser.closedRoot && !parser.strict)) {
            parser.state = S.OPEN_WAKA
            parser.startTagPosition = parser.position
          } else {
            if (!isWhitespace(c) && (!parser.sawRoot || parser.closedRoot)) {
              strictFail(parser, 'Text data outside of root node.')
            }
            if (c === '&') {
              parser.state = S.TEXT_ENTITY
            } else {
              parser.textNode += c
            }
          }
          continue

        case S.SCRIPT:
          // only non-strict
          if (c === '<') {
            parser.state = S.SCRIPT_ENDING
          } else {
            parser.script += c
          }
          continue

        case S.SCRIPT_ENDING:
          if (c === '/') {
            parser.state = S.CLOSE_TAG
          } else {
            parser.script += '<' + c
            parser.state = S.SCRIPT
          }
          continue

        case S.OPEN_WAKA:
          // either a /, ?, !, or text is coming next.
          if (c === '!') {
            parser.state = S.SGML_DECL
            parser.sgmlDecl = ''
          } else if (isWhitespace(c)) {
            // wait for it...
          } else if (isMatch(nameStart, c)) {
            parser.state = S.OPEN_TAG
            parser.tagName = c
          } else if (c === '/') {
            parser.state = S.CLOSE_TAG
            parser.tagName = ''
          } else if (c === '?') {
            parser.state = S.PROC_INST
            parser.procInstName = parser.procInstBody = ''
          } else {
            strictFail(parser, 'Unencoded <')
            // if there was some whitespace, then add that in.
            if (parser.startTagPosition + 1 < parser.position) {
              var pad = parser.position - parser.startTagPosition
              c = new Array(pad).join(' ') + c
            }
            parser.textNode += '<' + c
            parser.state = S.TEXT
          }
          continue

        case S.SGML_DECL:
          if ((parser.sgmlDecl + c).toUpperCase() === CDATA) {
            emitNode(parser, 'onopencdata')
            parser.state = S.CDATA
            parser.sgmlDecl = ''
            parser.cdata = ''
          } else if (parser.sgmlDecl + c === '--') {
            parser.state = S.COMMENT
            parser.comment = ''
            parser.sgmlDecl = ''
          } else if ((parser.sgmlDecl + c).toUpperCase() === DOCTYPE) {
            parser.state = S.DOCTYPE
            if (parser.doctype || parser.sawRoot) {
              strictFail(parser,
                'Inappropriately located doctype declaration')
            }
            parser.doctype = ''
            parser.sgmlDecl = ''
          } else if (c === '>') {
            emitNode(parser, 'onsgmldeclaration', parser.sgmlDecl)
            parser.sgmlDecl = ''
            parser.state = S.TEXT
          } else if (isQuote(c)) {
            parser.state = S.SGML_DECL_QUOTED
            parser.sgmlDecl += c
          } else {
            parser.sgmlDecl += c
          }
          continue

        case S.SGML_DECL_QUOTED:
          if (c === parser.q) {
            parser.state = S.SGML_DECL
            parser.q = ''
          }
          parser.sgmlDecl += c
          continue

        case S.DOCTYPE:
          if (c === '>') {
            parser.state = S.TEXT
            emitNode(parser, 'ondoctype', parser.doctype)
            parser.doctype = true // just remember that we saw it.
          } else {
            parser.doctype += c
            if (c === '[') {
              parser.state = S.DOCTYPE_DTD
            } else if (isQuote(c)) {
              parser.state = S.DOCTYPE_QUOTED
              parser.q = c
            }
          }
          continue

        case S.DOCTYPE_QUOTED:
          parser.doctype += c
          if (c === parser.q) {
            parser.q = ''
            parser.state = S.DOCTYPE
          }
          continue

        case S.DOCTYPE_DTD:
          parser.doctype += c
          if (c === ']') {
            parser.state = S.DOCTYPE
          } else if (isQuote(c)) {
            parser.state = S.DOCTYPE_DTD_QUOTED
            parser.q = c
          }
          continue

        case S.DOCTYPE_DTD_QUOTED:
          parser.doctype += c
          if (c === parser.q) {
            parser.state = S.DOCTYPE_DTD
            parser.q = ''
          }
          continue

        case S.COMMENT:
          if (c === '-') {
            parser.state = S.COMMENT_ENDING
          } else {
            parser.comment += c
          }
          continue

        case S.COMMENT_ENDING:
          if (c === '-') {
            parser.state = S.COMMENT_ENDED
            parser.comment = textopts(parser.opt, parser.comment)
            if (parser.comment) {
              emitNode(parser, 'oncomment', parser.comment)
            }
            parser.comment = ''
          } else {
            parser.comment += '-' + c
            parser.state = S.COMMENT
          }
          continue

        case S.COMMENT_ENDED:
          if (c !== '>') {
            strictFail(parser, 'Malformed comment')
            // allow <!-- blah -- bloo --> in non-strict mode,
            // which is a comment of " blah -- bloo "
            parser.comment += '--' + c
            parser.state = S.COMMENT
          } else {
            parser.state = S.TEXT
          }
          continue

        case S.CDATA:
          if (c === ']') {
            parser.state = S.CDATA_ENDING
          } else {
            parser.cdata += c
          }
          continue

        case S.CDATA_ENDING:
          if (c === ']') {
            parser.state = S.CDATA_ENDING_2
          } else {
            parser.cdata += ']' + c
            parser.state = S.CDATA
          }
          continue

        case S.CDATA_ENDING_2:
          if (c === '>') {
            if (parser.cdata) {
              emitNode(parser, 'oncdata', parser.cdata)
            }
            emitNode(parser, 'onclosecdata')
            parser.cdata = ''
            parser.state = S.TEXT
          } else if (c === ']') {
            parser.cdata += ']'
          } else {
            parser.cdata += ']]' + c
            parser.state = S.CDATA
          }
          continue

        case S.PROC_INST:
          if (c === '?') {
            parser.state = S.PROC_INST_ENDING
          } else if (isWhitespace(c)) {
            parser.state = S.PROC_INST_BODY
          } else {
            parser.procInstName += c
          }
          continue

        case S.PROC_INST_BODY:
          if (!parser.procInstBody && isWhitespace(c)) {
            continue
          } else if (c === '?') {
            parser.state = S.PROC_INST_ENDING
          } else {
            parser.procInstBody += c
          }
          continue

        case S.PROC_INST_ENDING:
          if (c === '>') {
            emitNode(parser, 'onprocessinginstruction', {
              name: parser.procInstName,
              body: parser.procInstBody
            })
            parser.procInstName = parser.procInstBody = ''
            parser.state = S.TEXT
          } else {
            parser.procInstBody += '?' + c
            parser.state = S.PROC_INST_BODY
          }
          continue

        case S.OPEN_TAG:
          if (isMatch(nameBody, c)) {
            parser.tagName += c
          } else {
            newTag(parser)
            if (c === '>') {
              openTag(parser)
            } else if (c === '/') {
              parser.state = S.OPEN_TAG_SLASH
            } else {
              if (!isWhitespace(c)) {
                strictFail(parser, 'Invalid character in tag name')
              }
              parser.state = S.ATTRIB
            }
          }
          continue

        case S.OPEN_TAG_SLASH:
          if (c === '>') {
            openTag(parser, true)
            closeTag(parser)
          } else {
            strictFail(parser, 'Forward-slash in opening tag not followed by >')
            parser.state = S.ATTRIB
          }
          continue

        case S.ATTRIB:
          // haven't read the attribute name yet.
          if (isWhitespace(c)) {
            continue
          } else if (c === '>') {
            openTag(parser)
          } else if (c === '/') {
            parser.state = S.OPEN_TAG_SLASH
          } else if (isMatch(nameStart, c)) {
            parser.attribName = c
            parser.attribValue = ''
            parser.state = S.ATTRIB_NAME
          } else {
            strictFail(parser, 'Invalid attribute name')
          }
          continue

        case S.ATTRIB_NAME:
          if (c === '=') {
            parser.state = S.ATTRIB_VALUE
          } else if (c === '>') {
            strictFail(parser, 'Attribute without value')
            parser.attribValue = parser.attribName
            attrib(parser)
            openTag(parser)
          } else if (isWhitespace(c)) {
            parser.state = S.ATTRIB_NAME_SAW_WHITE
          } else if (isMatch(nameBody, c)) {
            parser.attribName += c
          } else {
            strictFail(parser, 'Invalid attribute name')
          }
          continue

        case S.ATTRIB_NAME_SAW_WHITE:
          if (c === '=') {
            parser.state = S.ATTRIB_VALUE
          } else if (isWhitespace(c)) {
            continue
          } else {
            strictFail(parser, 'Attribute without value')
            parser.tag.attributes[parser.attribName] = ''
            parser.attribValue = ''
            emitNode(parser, 'onattribute', {
              name: parser.attribName,
              value: ''
            })
            parser.attribName = ''
            if (c === '>') {
              openTag(parser)
            } else if (isMatch(nameStart, c)) {
              parser.attribName = c
              parser.state = S.ATTRIB_NAME
            } else {
              strictFail(parser, 'Invalid attribute name')
              parser.state = S.ATTRIB
            }
          }
          continue

        case S.ATTRIB_VALUE:
          if (isWhitespace(c)) {
            continue
          } else if (isQuote(c)) {
            parser.q = c
            parser.state = S.ATTRIB_VALUE_QUOTED
          } else {
            strictFail(parser, 'Unquoted attribute value')
            parser.state = S.ATTRIB_VALUE_UNQUOTED
            parser.attribValue = c
          }
          continue

        case S.ATTRIB_VALUE_QUOTED:
          if (c !== parser.q) {
            if (c === '&') {
              parser.state = S.ATTRIB_VALUE_ENTITY_Q
            } else {
              parser.attribValue += c
            }
            continue
          }
          attrib(parser)
          parser.q = ''
          parser.state = S.ATTRIB_VALUE_CLOSED
          continue

        case S.ATTRIB_VALUE_CLOSED:
          if (isWhitespace(c)) {
            parser.state = S.ATTRIB
          } else if (c === '>') {
            openTag(parser)
          } else if (c === '/') {
            parser.state = S.OPEN_TAG_SLASH
          } else if (isMatch(nameStart, c)) {
            strictFail(parser, 'No whitespace between attributes')
            parser.attribName = c
            parser.attribValue = ''
            parser.state = S.ATTRIB_NAME
          } else {
            strictFail(parser, 'Invalid attribute name')
          }
          continue

        case S.ATTRIB_VALUE_UNQUOTED:
          if (!isAttribEnd(c)) {
            if (c === '&') {
              parser.state = S.ATTRIB_VALUE_ENTITY_U
            } else {
              parser.attribValue += c
            }
            continue
          }
          attrib(parser)
          if (c === '>') {
            openTag(parser)
          } else {
            parser.state = S.ATTRIB
          }
          continue

        case S.CLOSE_TAG:
          if (!parser.tagName) {
            if (isWhitespace(c)) {
              continue
            } else if (notMatch(nameStart, c)) {
              if (parser.script) {
                parser.script += '</' + c
                parser.state = S.SCRIPT
              } else {
                strictFail(parser, 'Invalid tagname in closing tag.')
              }
            } else {
              parser.tagName = c
            }
          } else if (c === '>') {
            closeTag(parser)
          } else if (isMatch(nameBody, c)) {
            parser.tagName += c
          } else if (parser.script) {
            parser.script += '</' + parser.tagName
            parser.tagName = ''
            parser.state = S.SCRIPT
          } else {
            if (!isWhitespace(c)) {
              strictFail(parser, 'Invalid tagname in closing tag')
            }
            parser.state = S.CLOSE_TAG_SAW_WHITE
          }
          continue

        case S.CLOSE_TAG_SAW_WHITE:
          if (isWhitespace(c)) {
            continue
          }
          if (c === '>') {
            closeTag(parser)
          } else {
            strictFail(parser, 'Invalid characters in closing tag')
          }
          continue

        case S.TEXT_ENTITY:
        case S.ATTRIB_VALUE_ENTITY_Q:
        case S.ATTRIB_VALUE_ENTITY_U:
          var returnState
          var buffer
          switch (parser.state) {
            case S.TEXT_ENTITY:
              returnState = S.TEXT
              buffer = 'textNode'
              break

            case S.ATTRIB_VALUE_ENTITY_Q:
              returnState = S.ATTRIB_VALUE_QUOTED
              buffer = 'attribValue'
              break

            case S.ATTRIB_VALUE_ENTITY_U:
              returnState = S.ATTRIB_VALUE_UNQUOTED
              buffer = 'attribValue'
              break
          }

          if (c === ';') {
            if (parser.opt.unparsedEntities) {
              var parsedEntity = parseEntity(parser)
              parser.entity = ''
              parser.state = returnState
              parser.write(parsedEntity)
            } else {
              parser[buffer] += parseEntity(parser)
              parser.entity = ''
              parser.state = returnState
            }
          } else if (isMatch(parser.entity.length ? entityBody : entityStart, c)) {
            parser.entity += c
          } else {
            strictFail(parser, 'Invalid character in entity name')
            parser[buffer] += '&' + parser.entity + c
            parser.entity = ''
            parser.state = returnState
          }

          continue

        default: /* istanbul ignore next */ {
          throw new Error(parser, 'Unknown state: ' + parser.state)
        }
      }
    } // while

    if (parser.position >= parser.bufferCheckPosition) {
      checkBufferLength(parser)
    }
    return parser
  }

  /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
  /* istanbul ignore next */
  if (!String.fromCodePoint) {
    (function () {
      var stringFromCharCode = String.fromCharCode
      var floor = Math.floor
      var fromCodePoint = function () {
        var MAX_SIZE = 0x4000
        var codeUnits = []
        var highSurrogate
        var lowSurrogate
        var index = -1
        var length = arguments.length
        if (!length) {
          return ''
        }
        var result = ''
        while (++index < length) {
          var codePoint = Number(arguments[index])
          if (
            !isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
            codePoint < 0 || // not a valid Unicode code point
            codePoint > 0x10FFFF || // not a valid Unicode code point
            floor(codePoint) !== codePoint // not an integer
          ) {
            throw RangeError('Invalid code point: ' + codePoint)
          }
          if (codePoint <= 0xFFFF) { // BMP code point
            codeUnits.push(codePoint)
          } else { // Astral code point; split in surrogate halves
            // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
            codePoint -= 0x10000
            highSurrogate = (codePoint >> 10) + 0xD800
            lowSurrogate = (codePoint % 0x400) + 0xDC00
            codeUnits.push(highSurrogate, lowSurrogate)
          }
          if (index + 1 === length || codeUnits.length > MAX_SIZE) {
            result += stringFromCharCode.apply(null, codeUnits)
            codeUnits.length = 0
          }
        }
        return result
      }
      /* istanbul ignore next */
      if (Object.defineProperty) {
        Object.defineProperty(String, 'fromCodePoint', {
          value: fromCodePoint,
          configurable: true,
          writable: true
        })
      } else {
        String.fromCodePoint = fromCodePoint
      }
    }())
  }
})( false ? 0 : exports)


/***/ }),

/***/ "./node_modules/stream/index.js":
/*!**************************************!*\
  !*** ./node_modules/stream/index.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var Emitter = __webpack_require__(/*! emitter */ "./node_modules/emitter-component/index.js");

function Stream() {
  Emitter.call(this);
}
Stream.prototype = new Emitter();
module.exports = Stream;
// Backwards-compat with node 0.4.x
Stream.Stream = Stream;

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (!this.hasListeners('error')) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.off('data', ondata);
    dest.off('drain', ondrain);

    source.off('end', onend);
    source.off('close', onclose);

    source.off('error', onerror);
    dest.off('error', onerror);

    source.off('end', cleanup);
    source.off('close', cleanup);

    dest.off('end', cleanup);
    dest.off('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('end', cleanup);
  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
}


/***/ }),

/***/ "./node_modules/string_decoder/lib/string_decoder.js":
/*!***********************************************************!*\
  !*** ./node_modules/string_decoder/lib/string_decoder.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



/*<replacement>*/

var Buffer = (__webpack_require__(/*! safe-buffer */ "./node_modules/safe-buffer/index.js").Buffer);
/*</replacement>*/

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}

/***/ }),

/***/ "./node_modules/timers/index.js":
/*!**************************************!*\
  !*** ./node_modules/timers/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


exports.every = function(str) {
  return new Every(str);
};

/*
  Time map
*/

var time = {
  millisecond: 1,
  second: 1000,
  minute: 60000,
  hour: 3600000,
  day: 86400000
};

for (var key in time) {
  if (key === 'millisecond') {
    time.ms = time[key];
  } else {
    time[key.charAt(0)] = time[key];
  }
  time[key + 's'] = time[key];
}


/*
  Every constructor
*/

function Every(str) {
  this.count = 0;
  var m = parse(str);
  if (m) {
    this.time = Number(m[0]) * time[m[1]];
    this.type = m[1];
  }
}

Every.prototype.do = function(cb) {
  if (this.time) {
    this.interval = setInterval(callback, this.time);
  }

  var that = this;
  function callback() {
    that.count++;
    cb.call(that);
  }
  return this;
};

Every.prototype.stop = function() {
  if (this.interval) {
    clearInterval(this.interval);
    delete this.interval;
  }
  return this;
};


/*
  Convert string to milliseconds

    ms, millisecond(s)?
    s, second(s)?
    m, minute(s)?
    h, hour(s)?
    d, day(s)?
*/
var reg = /^\s*(\d+(?:\.\d+)?)\s*([a-z]+)\s*$/;

function parse(str) {
  var m = str.match(reg);
  if (m && time[m[2]]) {
    return m.slice(1);
  }
  return null;
}


/***/ }),

/***/ "./node_modules/xml2js/lib/bom.js":
/*!****************************************!*\
  !*** ./node_modules/xml2js/lib/bom.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports) {

// Generated by CoffeeScript 1.12.7
(function() {
  "use strict";
  exports.stripBOM = function(str) {
    if (str[0] === '\uFEFF') {
      return str.substring(1);
    } else {
      return str;
    }
  };

}).call(this);


/***/ }),

/***/ "./node_modules/xml2js/lib/builder.js":
/*!********************************************!*\
  !*** ./node_modules/xml2js/lib/builder.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  "use strict";
  var builder, defaults, escapeCDATA, requiresCDATA, wrapCDATA,
    hasProp = {}.hasOwnProperty;

  builder = __webpack_require__(/*! xmlbuilder */ "./node_modules/xmlbuilder/lib/index.js");

  defaults = (__webpack_require__(/*! ./defaults */ "./node_modules/xml2js/lib/defaults.js").defaults);

  requiresCDATA = function(entry) {
    return typeof entry === "string" && (entry.indexOf('&') >= 0 || entry.indexOf('>') >= 0 || entry.indexOf('<') >= 0);
  };

  wrapCDATA = function(entry) {
    return "<![CDATA[" + (escapeCDATA(entry)) + "]]>";
  };

  escapeCDATA = function(entry) {
    return entry.replace(']]>', ']]]]><![CDATA[>');
  };

  exports.Builder = (function() {
    function Builder(opts) {
      var key, ref, value;
      this.options = {};
      ref = defaults["0.2"];
      for (key in ref) {
        if (!hasProp.call(ref, key)) continue;
        value = ref[key];
        this.options[key] = value;
      }
      for (key in opts) {
        if (!hasProp.call(opts, key)) continue;
        value = opts[key];
        this.options[key] = value;
      }
    }

    Builder.prototype.buildObject = function(rootObj) {
      var attrkey, charkey, render, rootElement, rootName;
      attrkey = this.options.attrkey;
      charkey = this.options.charkey;
      if ((Object.keys(rootObj).length === 1) && (this.options.rootName === defaults['0.2'].rootName)) {
        rootName = Object.keys(rootObj)[0];
        rootObj = rootObj[rootName];
      } else {
        rootName = this.options.rootName;
      }
      render = (function(_this) {
        return function(element, obj) {
          var attr, child, entry, index, key, value;
          if (typeof obj !== 'object') {
            if (_this.options.cdata && requiresCDATA(obj)) {
              element.raw(wrapCDATA(obj));
            } else {
              element.txt(obj);
            }
          } else if (Array.isArray(obj)) {
            for (index in obj) {
              if (!hasProp.call(obj, index)) continue;
              child = obj[index];
              for (key in child) {
                entry = child[key];
                element = render(element.ele(key), entry).up();
              }
            }
          } else {
            for (key in obj) {
              if (!hasProp.call(obj, key)) continue;
              child = obj[key];
              if (key === attrkey) {
                if (typeof child === "object") {
                  for (attr in child) {
                    value = child[attr];
                    element = element.att(attr, value);
                  }
                }
              } else if (key === charkey) {
                if (_this.options.cdata && requiresCDATA(child)) {
                  element = element.raw(wrapCDATA(child));
                } else {
                  element = element.txt(child);
                }
              } else if (Array.isArray(child)) {
                for (index in child) {
                  if (!hasProp.call(child, index)) continue;
                  entry = child[index];
                  if (typeof entry === 'string') {
                    if (_this.options.cdata && requiresCDATA(entry)) {
                      element = element.ele(key).raw(wrapCDATA(entry)).up();
                    } else {
                      element = element.ele(key, entry).up();
                    }
                  } else {
                    element = render(element.ele(key), entry).up();
                  }
                }
              } else if (typeof child === "object") {
                element = render(element.ele(key), child).up();
              } else {
                if (typeof child === 'string' && _this.options.cdata && requiresCDATA(child)) {
                  element = element.ele(key).raw(wrapCDATA(child)).up();
                } else {
                  if (child == null) {
                    child = '';
                  }
                  element = element.ele(key, child.toString()).up();
                }
              }
            }
          }
          return element;
        };
      })(this);
      rootElement = builder.create(rootName, this.options.xmldec, this.options.doctype, {
        headless: this.options.headless,
        allowSurrogateChars: this.options.allowSurrogateChars
      });
      return render(rootElement, rootObj).end(this.options.renderOpts);
    };

    return Builder;

  })();

}).call(this);


/***/ }),

/***/ "./node_modules/xml2js/lib/defaults.js":
/*!*********************************************!*\
  !*** ./node_modules/xml2js/lib/defaults.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports) {

// Generated by CoffeeScript 1.12.7
(function() {
  exports.defaults = {
    "0.1": {
      explicitCharkey: false,
      trim: true,
      normalize: true,
      normalizeTags: false,
      attrkey: "@",
      charkey: "#",
      explicitArray: false,
      ignoreAttrs: false,
      mergeAttrs: false,
      explicitRoot: false,
      validator: null,
      xmlns: false,
      explicitChildren: false,
      childkey: '@@',
      charsAsChildren: false,
      includeWhiteChars: false,
      async: false,
      strict: true,
      attrNameProcessors: null,
      attrValueProcessors: null,
      tagNameProcessors: null,
      valueProcessors: null,
      emptyTag: ''
    },
    "0.2": {
      explicitCharkey: false,
      trim: false,
      normalize: false,
      normalizeTags: false,
      attrkey: "$",
      charkey: "_",
      explicitArray: true,
      ignoreAttrs: false,
      mergeAttrs: false,
      explicitRoot: true,
      validator: null,
      xmlns: false,
      explicitChildren: false,
      preserveChildrenOrder: false,
      childkey: '$$',
      charsAsChildren: false,
      includeWhiteChars: false,
      async: false,
      strict: true,
      attrNameProcessors: null,
      attrValueProcessors: null,
      tagNameProcessors: null,
      valueProcessors: null,
      rootName: 'root',
      xmldec: {
        'version': '1.0',
        'encoding': 'UTF-8',
        'standalone': true
      },
      doctype: null,
      renderOpts: {
        'pretty': true,
        'indent': '  ',
        'newline': '\n'
      },
      headless: false,
      chunkSize: 10000,
      emptyTag: '',
      cdata: false
    }
  };

}).call(this);


/***/ }),

/***/ "./node_modules/xml2js/lib/parser.js":
/*!*******************************************!*\
  !*** ./node_modules/xml2js/lib/parser.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  "use strict";
  var bom, defaults, defineProperty, events, isEmpty, processItem, processors, sax, setImmediate,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  sax = __webpack_require__(/*! sax */ "./node_modules/sax/lib/sax.js");

  events = __webpack_require__(/*! events */ "./node_modules/events/events.js");

  bom = __webpack_require__(/*! ./bom */ "./node_modules/xml2js/lib/bom.js");

  processors = __webpack_require__(/*! ./processors */ "./node_modules/xml2js/lib/processors.js");

  setImmediate = (__webpack_require__(/*! timers */ "./node_modules/timers/index.js").setImmediate);

  defaults = (__webpack_require__(/*! ./defaults */ "./node_modules/xml2js/lib/defaults.js").defaults);

  isEmpty = function(thing) {
    return typeof thing === "object" && (thing != null) && Object.keys(thing).length === 0;
  };

  processItem = function(processors, item, key) {
    var i, len, process;
    for (i = 0, len = processors.length; i < len; i++) {
      process = processors[i];
      item = process(item, key);
    }
    return item;
  };

  defineProperty = function(obj, key, value) {
    var descriptor;
    descriptor = Object.create(null);
    descriptor.value = value;
    descriptor.writable = true;
    descriptor.enumerable = true;
    descriptor.configurable = true;
    return Object.defineProperty(obj, key, descriptor);
  };

  exports.Parser = (function(superClass) {
    extend(Parser, superClass);

    function Parser(opts) {
      this.parseStringPromise = bind(this.parseStringPromise, this);
      this.parseString = bind(this.parseString, this);
      this.reset = bind(this.reset, this);
      this.assignOrPush = bind(this.assignOrPush, this);
      this.processAsync = bind(this.processAsync, this);
      var key, ref, value;
      if (!(this instanceof exports.Parser)) {
        return new exports.Parser(opts);
      }
      this.options = {};
      ref = defaults["0.2"];
      for (key in ref) {
        if (!hasProp.call(ref, key)) continue;
        value = ref[key];
        this.options[key] = value;
      }
      for (key in opts) {
        if (!hasProp.call(opts, key)) continue;
        value = opts[key];
        this.options[key] = value;
      }
      if (this.options.xmlns) {
        this.options.xmlnskey = this.options.attrkey + "ns";
      }
      if (this.options.normalizeTags) {
        if (!this.options.tagNameProcessors) {
          this.options.tagNameProcessors = [];
        }
        this.options.tagNameProcessors.unshift(processors.normalize);
      }
      this.reset();
    }

    Parser.prototype.processAsync = function() {
      var chunk, err;
      try {
        if (this.remaining.length <= this.options.chunkSize) {
          chunk = this.remaining;
          this.remaining = '';
          this.saxParser = this.saxParser.write(chunk);
          return this.saxParser.close();
        } else {
          chunk = this.remaining.substr(0, this.options.chunkSize);
          this.remaining = this.remaining.substr(this.options.chunkSize, this.remaining.length);
          this.saxParser = this.saxParser.write(chunk);
          return setImmediate(this.processAsync);
        }
      } catch (error1) {
        err = error1;
        if (!this.saxParser.errThrown) {
          this.saxParser.errThrown = true;
          return this.emit(err);
        }
      }
    };

    Parser.prototype.assignOrPush = function(obj, key, newValue) {
      if (!(key in obj)) {
        if (!this.options.explicitArray) {
          return defineProperty(obj, key, newValue);
        } else {
          return defineProperty(obj, key, [newValue]);
        }
      } else {
        if (!(obj[key] instanceof Array)) {
          defineProperty(obj, key, [obj[key]]);
        }
        return obj[key].push(newValue);
      }
    };

    Parser.prototype.reset = function() {
      var attrkey, charkey, ontext, stack;
      this.removeAllListeners();
      this.saxParser = sax.parser(this.options.strict, {
        trim: false,
        normalize: false,
        xmlns: this.options.xmlns
      });
      this.saxParser.errThrown = false;
      this.saxParser.onerror = (function(_this) {
        return function(error) {
          _this.saxParser.resume();
          if (!_this.saxParser.errThrown) {
            _this.saxParser.errThrown = true;
            return _this.emit("error", error);
          }
        };
      })(this);
      this.saxParser.onend = (function(_this) {
        return function() {
          if (!_this.saxParser.ended) {
            _this.saxParser.ended = true;
            return _this.emit("end", _this.resultObject);
          }
        };
      })(this);
      this.saxParser.ended = false;
      this.EXPLICIT_CHARKEY = this.options.explicitCharkey;
      this.resultObject = null;
      stack = [];
      attrkey = this.options.attrkey;
      charkey = this.options.charkey;
      this.saxParser.onopentag = (function(_this) {
        return function(node) {
          var key, newValue, obj, processedKey, ref;
          obj = {};
          obj[charkey] = "";
          if (!_this.options.ignoreAttrs) {
            ref = node.attributes;
            for (key in ref) {
              if (!hasProp.call(ref, key)) continue;
              if (!(attrkey in obj) && !_this.options.mergeAttrs) {
                obj[attrkey] = {};
              }
              newValue = _this.options.attrValueProcessors ? processItem(_this.options.attrValueProcessors, node.attributes[key], key) : node.attributes[key];
              processedKey = _this.options.attrNameProcessors ? processItem(_this.options.attrNameProcessors, key) : key;
              if (_this.options.mergeAttrs) {
                _this.assignOrPush(obj, processedKey, newValue);
              } else {
                defineProperty(obj[attrkey], processedKey, newValue);
              }
            }
          }
          obj["#name"] = _this.options.tagNameProcessors ? processItem(_this.options.tagNameProcessors, node.name) : node.name;
          if (_this.options.xmlns) {
            obj[_this.options.xmlnskey] = {
              uri: node.uri,
              local: node.local
            };
          }
          return stack.push(obj);
        };
      })(this);
      this.saxParser.onclosetag = (function(_this) {
        return function() {
          var cdata, emptyStr, key, node, nodeName, obj, objClone, old, s, xpath;
          obj = stack.pop();
          nodeName = obj["#name"];
          if (!_this.options.explicitChildren || !_this.options.preserveChildrenOrder) {
            delete obj["#name"];
          }
          if (obj.cdata === true) {
            cdata = obj.cdata;
            delete obj.cdata;
          }
          s = stack[stack.length - 1];
          if (obj[charkey].match(/^\s*$/) && !cdata) {
            emptyStr = obj[charkey];
            delete obj[charkey];
          } else {
            if (_this.options.trim) {
              obj[charkey] = obj[charkey].trim();
            }
            if (_this.options.normalize) {
              obj[charkey] = obj[charkey].replace(/\s{2,}/g, " ").trim();
            }
            obj[charkey] = _this.options.valueProcessors ? processItem(_this.options.valueProcessors, obj[charkey], nodeName) : obj[charkey];
            if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) {
              obj = obj[charkey];
            }
          }
          if (isEmpty(obj)) {
            if (typeof _this.options.emptyTag === 'function') {
              obj = _this.options.emptyTag();
            } else {
              obj = _this.options.emptyTag !== '' ? _this.options.emptyTag : emptyStr;
            }
          }
          if (_this.options.validator != null) {
            xpath = "/" + ((function() {
              var i, len, results;
              results = [];
              for (i = 0, len = stack.length; i < len; i++) {
                node = stack[i];
                results.push(node["#name"]);
              }
              return results;
            })()).concat(nodeName).join("/");
            (function() {
              var err;
              try {
                return obj = _this.options.validator(xpath, s && s[nodeName], obj);
              } catch (error1) {
                err = error1;
                return _this.emit("error", err);
              }
            })();
          }
          if (_this.options.explicitChildren && !_this.options.mergeAttrs && typeof obj === 'object') {
            if (!_this.options.preserveChildrenOrder) {
              node = {};
              if (_this.options.attrkey in obj) {
                node[_this.options.attrkey] = obj[_this.options.attrkey];
                delete obj[_this.options.attrkey];
              }
              if (!_this.options.charsAsChildren && _this.options.charkey in obj) {
                node[_this.options.charkey] = obj[_this.options.charkey];
                delete obj[_this.options.charkey];
              }
              if (Object.getOwnPropertyNames(obj).length > 0) {
                node[_this.options.childkey] = obj;
              }
              obj = node;
            } else if (s) {
              s[_this.options.childkey] = s[_this.options.childkey] || [];
              objClone = {};
              for (key in obj) {
                if (!hasProp.call(obj, key)) continue;
                defineProperty(objClone, key, obj[key]);
              }
              s[_this.options.childkey].push(objClone);
              delete obj["#name"];
              if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) {
                obj = obj[charkey];
              }
            }
          }
          if (stack.length > 0) {
            return _this.assignOrPush(s, nodeName, obj);
          } else {
            if (_this.options.explicitRoot) {
              old = obj;
              obj = {};
              defineProperty(obj, nodeName, old);
            }
            _this.resultObject = obj;
            _this.saxParser.ended = true;
            return _this.emit("end", _this.resultObject);
          }
        };
      })(this);
      ontext = (function(_this) {
        return function(text) {
          var charChild, s;
          s = stack[stack.length - 1];
          if (s) {
            s[charkey] += text;
            if (_this.options.explicitChildren && _this.options.preserveChildrenOrder && _this.options.charsAsChildren && (_this.options.includeWhiteChars || text.replace(/\\n/g, '').trim() !== '')) {
              s[_this.options.childkey] = s[_this.options.childkey] || [];
              charChild = {
                '#name': '__text__'
              };
              charChild[charkey] = text;
              if (_this.options.normalize) {
                charChild[charkey] = charChild[charkey].replace(/\s{2,}/g, " ").trim();
              }
              s[_this.options.childkey].push(charChild);
            }
            return s;
          }
        };
      })(this);
      this.saxParser.ontext = ontext;
      return this.saxParser.oncdata = (function(_this) {
        return function(text) {
          var s;
          s = ontext(text);
          if (s) {
            return s.cdata = true;
          }
        };
      })(this);
    };

    Parser.prototype.parseString = function(str, cb) {
      var err;
      if ((cb != null) && typeof cb === "function") {
        this.on("end", function(result) {
          this.reset();
          return cb(null, result);
        });
        this.on("error", function(err) {
          this.reset();
          return cb(err);
        });
      }
      try {
        str = str.toString();
        if (str.trim() === '') {
          this.emit("end", null);
          return true;
        }
        str = bom.stripBOM(str);
        if (this.options.async) {
          this.remaining = str;
          setImmediate(this.processAsync);
          return this.saxParser;
        }
        return this.saxParser.write(str).close();
      } catch (error1) {
        err = error1;
        if (!(this.saxParser.errThrown || this.saxParser.ended)) {
          this.emit('error', err);
          return this.saxParser.errThrown = true;
        } else if (this.saxParser.ended) {
          throw err;
        }
      }
    };

    Parser.prototype.parseStringPromise = function(str) {
      return new Promise((function(_this) {
        return function(resolve, reject) {
          return _this.parseString(str, function(err, value) {
            if (err) {
              return reject(err);
            } else {
              return resolve(value);
            }
          });
        };
      })(this));
    };

    return Parser;

  })(events);

  exports.parseString = function(str, a, b) {
    var cb, options, parser;
    if (b != null) {
      if (typeof b === 'function') {
        cb = b;
      }
      if (typeof a === 'object') {
        options = a;
      }
    } else {
      if (typeof a === 'function') {
        cb = a;
      }
      options = {};
    }
    parser = new exports.Parser(options);
    return parser.parseString(str, cb);
  };

  exports.parseStringPromise = function(str, a) {
    var options, parser;
    if (typeof a === 'object') {
      options = a;
    }
    parser = new exports.Parser(options);
    return parser.parseStringPromise(str);
  };

}).call(this);


/***/ }),

/***/ "./node_modules/xml2js/lib/processors.js":
/*!***********************************************!*\
  !*** ./node_modules/xml2js/lib/processors.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports) {

// Generated by CoffeeScript 1.12.7
(function() {
  "use strict";
  var prefixMatch;

  prefixMatch = new RegExp(/(?!xmlns)^.*:/);

  exports.normalize = function(str) {
    return str.toLowerCase();
  };

  exports.firstCharLowerCase = function(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
  };

  exports.stripPrefix = function(str) {
    return str.replace(prefixMatch, '');
  };

  exports.parseNumbers = function(str) {
    if (!isNaN(str)) {
      str = str % 1 === 0 ? parseInt(str, 10) : parseFloat(str);
    }
    return str;
  };

  exports.parseBooleans = function(str) {
    if (/^(?:true|false)$/i.test(str)) {
      str = str.toLowerCase() === 'true';
    }
    return str;
  };

}).call(this);


/***/ }),

/***/ "./node_modules/xml2js/lib/xml2js.js":
/*!*******************************************!*\
  !*** ./node_modules/xml2js/lib/xml2js.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  "use strict";
  var builder, defaults, parser, processors,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  defaults = __webpack_require__(/*! ./defaults */ "./node_modules/xml2js/lib/defaults.js");

  builder = __webpack_require__(/*! ./builder */ "./node_modules/xml2js/lib/builder.js");

  parser = __webpack_require__(/*! ./parser */ "./node_modules/xml2js/lib/parser.js");

  processors = __webpack_require__(/*! ./processors */ "./node_modules/xml2js/lib/processors.js");

  exports.defaults = defaults.defaults;

  exports.processors = processors;

  exports.ValidationError = (function(superClass) {
    extend(ValidationError, superClass);

    function ValidationError(message) {
      this.message = message;
    }

    return ValidationError;

  })(Error);

  exports.Builder = builder.Builder;

  exports.Parser = parser.Parser;

  exports.parseString = parser.parseString;

  exports.parseStringPromise = parser.parseStringPromise;

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/DocumentPosition.js":
/*!*********************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/DocumentPosition.js ***!
  \*********************************************************/
/***/ (function(module) {

// Generated by CoffeeScript 1.12.7
(function() {
  module.exports = {
    Disconnected: 1,
    Preceding: 2,
    Following: 4,
    Contains: 8,
    ContainedBy: 16,
    ImplementationSpecific: 32
  };

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/NodeType.js":
/*!*************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/NodeType.js ***!
  \*************************************************/
/***/ (function(module) {

// Generated by CoffeeScript 1.12.7
(function() {
  module.exports = {
    Element: 1,
    Attribute: 2,
    Text: 3,
    CData: 4,
    EntityReference: 5,
    EntityDeclaration: 6,
    ProcessingInstruction: 7,
    Comment: 8,
    Document: 9,
    DocType: 10,
    DocumentFragment: 11,
    NotationDeclaration: 12,
    Declaration: 201,
    Raw: 202,
    AttributeDeclaration: 203,
    ElementDeclaration: 204,
    Dummy: 205
  };

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/Utility.js":
/*!************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/Utility.js ***!
  \************************************************/
/***/ (function(module) {

// Generated by CoffeeScript 1.12.7
(function() {
  var assign, getValue, isArray, isEmpty, isFunction, isObject, isPlainObject,
    slice = [].slice,
    hasProp = {}.hasOwnProperty;

  assign = function() {
    var i, key, len, source, sources, target;
    target = arguments[0], sources = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    if (isFunction(Object.assign)) {
      Object.assign.apply(null, arguments);
    } else {
      for (i = 0, len = sources.length; i < len; i++) {
        source = sources[i];
        if (source != null) {
          for (key in source) {
            if (!hasProp.call(source, key)) continue;
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };

  isFunction = function(val) {
    return !!val && Object.prototype.toString.call(val) === '[object Function]';
  };

  isObject = function(val) {
    var ref;
    return !!val && ((ref = typeof val) === 'function' || ref === 'object');
  };

  isArray = function(val) {
    if (isFunction(Array.isArray)) {
      return Array.isArray(val);
    } else {
      return Object.prototype.toString.call(val) === '[object Array]';
    }
  };

  isEmpty = function(val) {
    var key;
    if (isArray(val)) {
      return !val.length;
    } else {
      for (key in val) {
        if (!hasProp.call(val, key)) continue;
        return false;
      }
      return true;
    }
  };

  isPlainObject = function(val) {
    var ctor, proto;
    return isObject(val) && (proto = Object.getPrototypeOf(val)) && (ctor = proto.constructor) && (typeof ctor === 'function') && (ctor instanceof ctor) && (Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object));
  };

  getValue = function(obj) {
    if (isFunction(obj.valueOf)) {
      return obj.valueOf();
    } else {
      return obj;
    }
  };

  module.exports.assign = assign;

  module.exports.isFunction = isFunction;

  module.exports.isObject = isObject;

  module.exports.isArray = isArray;

  module.exports.isEmpty = isEmpty;

  module.exports.isPlainObject = isPlainObject;

  module.exports.getValue = getValue;

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/WriterState.js":
/*!****************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/WriterState.js ***!
  \****************************************************/
/***/ (function(module) {

// Generated by CoffeeScript 1.12.7
(function() {
  module.exports = {
    None: 0,
    OpenTag: 1,
    InsideTag: 2,
    CloseTag: 3
  };

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLAttribute.js":
/*!*****************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLAttribute.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, XMLAttribute, XMLNode;

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  XMLNode = __webpack_require__(/*! ./XMLNode */ "./node_modules/xmlbuilder/lib/XMLNode.js");

  module.exports = XMLAttribute = (function() {
    function XMLAttribute(parent, name, value) {
      this.parent = parent;
      if (this.parent) {
        this.options = this.parent.options;
        this.stringify = this.parent.stringify;
      }
      if (name == null) {
        throw new Error("Missing attribute name. " + this.debugInfo(name));
      }
      this.name = this.stringify.name(name);
      this.value = this.stringify.attValue(value);
      this.type = NodeType.Attribute;
      this.isId = false;
      this.schemaTypeInfo = null;
    }

    Object.defineProperty(XMLAttribute.prototype, 'nodeType', {
      get: function() {
        return this.type;
      }
    });

    Object.defineProperty(XMLAttribute.prototype, 'ownerElement', {
      get: function() {
        return this.parent;
      }
    });

    Object.defineProperty(XMLAttribute.prototype, 'textContent', {
      get: function() {
        return this.value;
      },
      set: function(value) {
        return this.value = value || '';
      }
    });

    Object.defineProperty(XMLAttribute.prototype, 'namespaceURI', {
      get: function() {
        return '';
      }
    });

    Object.defineProperty(XMLAttribute.prototype, 'prefix', {
      get: function() {
        return '';
      }
    });

    Object.defineProperty(XMLAttribute.prototype, 'localName', {
      get: function() {
        return this.name;
      }
    });

    Object.defineProperty(XMLAttribute.prototype, 'specified', {
      get: function() {
        return true;
      }
    });

    XMLAttribute.prototype.clone = function() {
      return Object.create(this);
    };

    XMLAttribute.prototype.toString = function(options) {
      return this.options.writer.attribute(this, this.options.writer.filterOptions(options));
    };

    XMLAttribute.prototype.debugInfo = function(name) {
      name = name || this.name;
      if (name == null) {
        return "parent: <" + this.parent.name + ">";
      } else {
        return "attribute: {" + name + "}, parent: <" + this.parent.name + ">";
      }
    };

    XMLAttribute.prototype.isEqualNode = function(node) {
      if (node.namespaceURI !== this.namespaceURI) {
        return false;
      }
      if (node.prefix !== this.prefix) {
        return false;
      }
      if (node.localName !== this.localName) {
        return false;
      }
      if (node.value !== this.value) {
        return false;
      }
      return true;
    };

    return XMLAttribute;

  })();

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLCData.js":
/*!*************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLCData.js ***!
  \*************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, XMLCData, XMLCharacterData,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  XMLCharacterData = __webpack_require__(/*! ./XMLCharacterData */ "./node_modules/xmlbuilder/lib/XMLCharacterData.js");

  module.exports = XMLCData = (function(superClass) {
    extend(XMLCData, superClass);

    function XMLCData(parent, text) {
      XMLCData.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing CDATA text. " + this.debugInfo());
      }
      this.name = "#cdata-section";
      this.type = NodeType.CData;
      this.value = this.stringify.cdata(text);
    }

    XMLCData.prototype.clone = function() {
      return Object.create(this);
    };

    XMLCData.prototype.toString = function(options) {
      return this.options.writer.cdata(this, this.options.writer.filterOptions(options));
    };

    return XMLCData;

  })(XMLCharacterData);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLCharacterData.js":
/*!*********************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLCharacterData.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLCharacterData, XMLNode,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "./node_modules/xmlbuilder/lib/XMLNode.js");

  module.exports = XMLCharacterData = (function(superClass) {
    extend(XMLCharacterData, superClass);

    function XMLCharacterData(parent) {
      XMLCharacterData.__super__.constructor.call(this, parent);
      this.value = '';
    }

    Object.defineProperty(XMLCharacterData.prototype, 'data', {
      get: function() {
        return this.value;
      },
      set: function(value) {
        return this.value = value || '';
      }
    });

    Object.defineProperty(XMLCharacterData.prototype, 'length', {
      get: function() {
        return this.value.length;
      }
    });

    Object.defineProperty(XMLCharacterData.prototype, 'textContent', {
      get: function() {
        return this.value;
      },
      set: function(value) {
        return this.value = value || '';
      }
    });

    XMLCharacterData.prototype.clone = function() {
      return Object.create(this);
    };

    XMLCharacterData.prototype.substringData = function(offset, count) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLCharacterData.prototype.appendData = function(arg) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLCharacterData.prototype.insertData = function(offset, arg) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLCharacterData.prototype.deleteData = function(offset, count) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLCharacterData.prototype.replaceData = function(offset, count, arg) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLCharacterData.prototype.isEqualNode = function(node) {
      if (!XMLCharacterData.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
        return false;
      }
      if (node.data !== this.data) {
        return false;
      }
      return true;
    };

    return XMLCharacterData;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLComment.js":
/*!***************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLComment.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, XMLCharacterData, XMLComment,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  XMLCharacterData = __webpack_require__(/*! ./XMLCharacterData */ "./node_modules/xmlbuilder/lib/XMLCharacterData.js");

  module.exports = XMLComment = (function(superClass) {
    extend(XMLComment, superClass);

    function XMLComment(parent, text) {
      XMLComment.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing comment text. " + this.debugInfo());
      }
      this.name = "#comment";
      this.type = NodeType.Comment;
      this.value = this.stringify.comment(text);
    }

    XMLComment.prototype.clone = function() {
      return Object.create(this);
    };

    XMLComment.prototype.toString = function(options) {
      return this.options.writer.comment(this, this.options.writer.filterOptions(options));
    };

    return XMLComment;

  })(XMLCharacterData);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLDOMConfiguration.js":
/*!************************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLDOMConfiguration.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLDOMConfiguration, XMLDOMErrorHandler, XMLDOMStringList;

  XMLDOMErrorHandler = __webpack_require__(/*! ./XMLDOMErrorHandler */ "./node_modules/xmlbuilder/lib/XMLDOMErrorHandler.js");

  XMLDOMStringList = __webpack_require__(/*! ./XMLDOMStringList */ "./node_modules/xmlbuilder/lib/XMLDOMStringList.js");

  module.exports = XMLDOMConfiguration = (function() {
    function XMLDOMConfiguration() {
      var clonedSelf;
      this.defaultParams = {
        "canonical-form": false,
        "cdata-sections": false,
        "comments": false,
        "datatype-normalization": false,
        "element-content-whitespace": true,
        "entities": true,
        "error-handler": new XMLDOMErrorHandler(),
        "infoset": true,
        "validate-if-schema": false,
        "namespaces": true,
        "namespace-declarations": true,
        "normalize-characters": false,
        "schema-location": '',
        "schema-type": '',
        "split-cdata-sections": true,
        "validate": false,
        "well-formed": true
      };
      this.params = clonedSelf = Object.create(this.defaultParams);
    }

    Object.defineProperty(XMLDOMConfiguration.prototype, 'parameterNames', {
      get: function() {
        return new XMLDOMStringList(Object.keys(this.defaultParams));
      }
    });

    XMLDOMConfiguration.prototype.getParameter = function(name) {
      if (this.params.hasOwnProperty(name)) {
        return this.params[name];
      } else {
        return null;
      }
    };

    XMLDOMConfiguration.prototype.canSetParameter = function(name, value) {
      return true;
    };

    XMLDOMConfiguration.prototype.setParameter = function(name, value) {
      if (value != null) {
        return this.params[name] = value;
      } else {
        return delete this.params[name];
      }
    };

    return XMLDOMConfiguration;

  })();

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLDOMErrorHandler.js":
/*!***********************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLDOMErrorHandler.js ***!
  \***********************************************************/
/***/ (function(module) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLDOMErrorHandler;

  module.exports = XMLDOMErrorHandler = (function() {
    function XMLDOMErrorHandler() {}

    XMLDOMErrorHandler.prototype.handleError = function(error) {
      throw new Error(error);
    };

    return XMLDOMErrorHandler;

  })();

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLDOMImplementation.js":
/*!*************************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLDOMImplementation.js ***!
  \*************************************************************/
/***/ (function(module) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLDOMImplementation;

  module.exports = XMLDOMImplementation = (function() {
    function XMLDOMImplementation() {}

    XMLDOMImplementation.prototype.hasFeature = function(feature, version) {
      return true;
    };

    XMLDOMImplementation.prototype.createDocumentType = function(qualifiedName, publicId, systemId) {
      throw new Error("This DOM method is not implemented.");
    };

    XMLDOMImplementation.prototype.createDocument = function(namespaceURI, qualifiedName, doctype) {
      throw new Error("This DOM method is not implemented.");
    };

    XMLDOMImplementation.prototype.createHTMLDocument = function(title) {
      throw new Error("This DOM method is not implemented.");
    };

    XMLDOMImplementation.prototype.getFeature = function(feature, version) {
      throw new Error("This DOM method is not implemented.");
    };

    return XMLDOMImplementation;

  })();

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLDOMStringList.js":
/*!*********************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLDOMStringList.js ***!
  \*********************************************************/
/***/ (function(module) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLDOMStringList;

  module.exports = XMLDOMStringList = (function() {
    function XMLDOMStringList(arr) {
      this.arr = arr || [];
    }

    Object.defineProperty(XMLDOMStringList.prototype, 'length', {
      get: function() {
        return this.arr.length;
      }
    });

    XMLDOMStringList.prototype.item = function(index) {
      return this.arr[index] || null;
    };

    XMLDOMStringList.prototype.contains = function(str) {
      return this.arr.indexOf(str) !== -1;
    };

    return XMLDOMStringList;

  })();

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLDTDAttList.js":
/*!******************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLDTDAttList.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, XMLDTDAttList, XMLNode,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "./node_modules/xmlbuilder/lib/XMLNode.js");

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  module.exports = XMLDTDAttList = (function(superClass) {
    extend(XMLDTDAttList, superClass);

    function XMLDTDAttList(parent, elementName, attributeName, attributeType, defaultValueType, defaultValue) {
      XMLDTDAttList.__super__.constructor.call(this, parent);
      if (elementName == null) {
        throw new Error("Missing DTD element name. " + this.debugInfo());
      }
      if (attributeName == null) {
        throw new Error("Missing DTD attribute name. " + this.debugInfo(elementName));
      }
      if (!attributeType) {
        throw new Error("Missing DTD attribute type. " + this.debugInfo(elementName));
      }
      if (!defaultValueType) {
        throw new Error("Missing DTD attribute default. " + this.debugInfo(elementName));
      }
      if (defaultValueType.indexOf('#') !== 0) {
        defaultValueType = '#' + defaultValueType;
      }
      if (!defaultValueType.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/)) {
        throw new Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT. " + this.debugInfo(elementName));
      }
      if (defaultValue && !defaultValueType.match(/^(#FIXED|#DEFAULT)$/)) {
        throw new Error("Default value only applies to #FIXED or #DEFAULT. " + this.debugInfo(elementName));
      }
      this.elementName = this.stringify.name(elementName);
      this.type = NodeType.AttributeDeclaration;
      this.attributeName = this.stringify.name(attributeName);
      this.attributeType = this.stringify.dtdAttType(attributeType);
      if (defaultValue) {
        this.defaultValue = this.stringify.dtdAttDefault(defaultValue);
      }
      this.defaultValueType = defaultValueType;
    }

    XMLDTDAttList.prototype.toString = function(options) {
      return this.options.writer.dtdAttList(this, this.options.writer.filterOptions(options));
    };

    return XMLDTDAttList;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLDTDElement.js":
/*!******************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLDTDElement.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, XMLDTDElement, XMLNode,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "./node_modules/xmlbuilder/lib/XMLNode.js");

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  module.exports = XMLDTDElement = (function(superClass) {
    extend(XMLDTDElement, superClass);

    function XMLDTDElement(parent, name, value) {
      XMLDTDElement.__super__.constructor.call(this, parent);
      if (name == null) {
        throw new Error("Missing DTD element name. " + this.debugInfo());
      }
      if (!value) {
        value = '(#PCDATA)';
      }
      if (Array.isArray(value)) {
        value = '(' + value.join(',') + ')';
      }
      this.name = this.stringify.name(name);
      this.type = NodeType.ElementDeclaration;
      this.value = this.stringify.dtdElementValue(value);
    }

    XMLDTDElement.prototype.toString = function(options) {
      return this.options.writer.dtdElement(this, this.options.writer.filterOptions(options));
    };

    return XMLDTDElement;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLDTDEntity.js":
/*!*****************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLDTDEntity.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, XMLDTDEntity, XMLNode, isObject,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  isObject = (__webpack_require__(/*! ./Utility */ "./node_modules/xmlbuilder/lib/Utility.js").isObject);

  XMLNode = __webpack_require__(/*! ./XMLNode */ "./node_modules/xmlbuilder/lib/XMLNode.js");

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  module.exports = XMLDTDEntity = (function(superClass) {
    extend(XMLDTDEntity, superClass);

    function XMLDTDEntity(parent, pe, name, value) {
      XMLDTDEntity.__super__.constructor.call(this, parent);
      if (name == null) {
        throw new Error("Missing DTD entity name. " + this.debugInfo(name));
      }
      if (value == null) {
        throw new Error("Missing DTD entity value. " + this.debugInfo(name));
      }
      this.pe = !!pe;
      this.name = this.stringify.name(name);
      this.type = NodeType.EntityDeclaration;
      if (!isObject(value)) {
        this.value = this.stringify.dtdEntityValue(value);
        this.internal = true;
      } else {
        if (!value.pubID && !value.sysID) {
          throw new Error("Public and/or system identifiers are required for an external entity. " + this.debugInfo(name));
        }
        if (value.pubID && !value.sysID) {
          throw new Error("System identifier is required for a public external entity. " + this.debugInfo(name));
        }
        this.internal = false;
        if (value.pubID != null) {
          this.pubID = this.stringify.dtdPubID(value.pubID);
        }
        if (value.sysID != null) {
          this.sysID = this.stringify.dtdSysID(value.sysID);
        }
        if (value.nData != null) {
          this.nData = this.stringify.dtdNData(value.nData);
        }
        if (this.pe && this.nData) {
          throw new Error("Notation declaration is not allowed in a parameter entity. " + this.debugInfo(name));
        }
      }
    }

    Object.defineProperty(XMLDTDEntity.prototype, 'publicId', {
      get: function() {
        return this.pubID;
      }
    });

    Object.defineProperty(XMLDTDEntity.prototype, 'systemId', {
      get: function() {
        return this.sysID;
      }
    });

    Object.defineProperty(XMLDTDEntity.prototype, 'notationName', {
      get: function() {
        return this.nData || null;
      }
    });

    Object.defineProperty(XMLDTDEntity.prototype, 'inputEncoding', {
      get: function() {
        return null;
      }
    });

    Object.defineProperty(XMLDTDEntity.prototype, 'xmlEncoding', {
      get: function() {
        return null;
      }
    });

    Object.defineProperty(XMLDTDEntity.prototype, 'xmlVersion', {
      get: function() {
        return null;
      }
    });

    XMLDTDEntity.prototype.toString = function(options) {
      return this.options.writer.dtdEntity(this, this.options.writer.filterOptions(options));
    };

    return XMLDTDEntity;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLDTDNotation.js":
/*!*******************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLDTDNotation.js ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, XMLDTDNotation, XMLNode,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "./node_modules/xmlbuilder/lib/XMLNode.js");

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  module.exports = XMLDTDNotation = (function(superClass) {
    extend(XMLDTDNotation, superClass);

    function XMLDTDNotation(parent, name, value) {
      XMLDTDNotation.__super__.constructor.call(this, parent);
      if (name == null) {
        throw new Error("Missing DTD notation name. " + this.debugInfo(name));
      }
      if (!value.pubID && !value.sysID) {
        throw new Error("Public or system identifiers are required for an external entity. " + this.debugInfo(name));
      }
      this.name = this.stringify.name(name);
      this.type = NodeType.NotationDeclaration;
      if (value.pubID != null) {
        this.pubID = this.stringify.dtdPubID(value.pubID);
      }
      if (value.sysID != null) {
        this.sysID = this.stringify.dtdSysID(value.sysID);
      }
    }

    Object.defineProperty(XMLDTDNotation.prototype, 'publicId', {
      get: function() {
        return this.pubID;
      }
    });

    Object.defineProperty(XMLDTDNotation.prototype, 'systemId', {
      get: function() {
        return this.sysID;
      }
    });

    XMLDTDNotation.prototype.toString = function(options) {
      return this.options.writer.dtdNotation(this, this.options.writer.filterOptions(options));
    };

    return XMLDTDNotation;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLDeclaration.js":
/*!*******************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLDeclaration.js ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, XMLDeclaration, XMLNode, isObject,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  isObject = (__webpack_require__(/*! ./Utility */ "./node_modules/xmlbuilder/lib/Utility.js").isObject);

  XMLNode = __webpack_require__(/*! ./XMLNode */ "./node_modules/xmlbuilder/lib/XMLNode.js");

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  module.exports = XMLDeclaration = (function(superClass) {
    extend(XMLDeclaration, superClass);

    function XMLDeclaration(parent, version, encoding, standalone) {
      var ref;
      XMLDeclaration.__super__.constructor.call(this, parent);
      if (isObject(version)) {
        ref = version, version = ref.version, encoding = ref.encoding, standalone = ref.standalone;
      }
      if (!version) {
        version = '1.0';
      }
      this.type = NodeType.Declaration;
      this.version = this.stringify.xmlVersion(version);
      if (encoding != null) {
        this.encoding = this.stringify.xmlEncoding(encoding);
      }
      if (standalone != null) {
        this.standalone = this.stringify.xmlStandalone(standalone);
      }
    }

    XMLDeclaration.prototype.toString = function(options) {
      return this.options.writer.declaration(this, this.options.writer.filterOptions(options));
    };

    return XMLDeclaration;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLDocType.js":
/*!***************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLDocType.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDocType, XMLNamedNodeMap, XMLNode, isObject,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  isObject = (__webpack_require__(/*! ./Utility */ "./node_modules/xmlbuilder/lib/Utility.js").isObject);

  XMLNode = __webpack_require__(/*! ./XMLNode */ "./node_modules/xmlbuilder/lib/XMLNode.js");

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  XMLDTDAttList = __webpack_require__(/*! ./XMLDTDAttList */ "./node_modules/xmlbuilder/lib/XMLDTDAttList.js");

  XMLDTDEntity = __webpack_require__(/*! ./XMLDTDEntity */ "./node_modules/xmlbuilder/lib/XMLDTDEntity.js");

  XMLDTDElement = __webpack_require__(/*! ./XMLDTDElement */ "./node_modules/xmlbuilder/lib/XMLDTDElement.js");

  XMLDTDNotation = __webpack_require__(/*! ./XMLDTDNotation */ "./node_modules/xmlbuilder/lib/XMLDTDNotation.js");

  XMLNamedNodeMap = __webpack_require__(/*! ./XMLNamedNodeMap */ "./node_modules/xmlbuilder/lib/XMLNamedNodeMap.js");

  module.exports = XMLDocType = (function(superClass) {
    extend(XMLDocType, superClass);

    function XMLDocType(parent, pubID, sysID) {
      var child, i, len, ref, ref1, ref2;
      XMLDocType.__super__.constructor.call(this, parent);
      this.type = NodeType.DocType;
      if (parent.children) {
        ref = parent.children;
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          if (child.type === NodeType.Element) {
            this.name = child.name;
            break;
          }
        }
      }
      this.documentObject = parent;
      if (isObject(pubID)) {
        ref1 = pubID, pubID = ref1.pubID, sysID = ref1.sysID;
      }
      if (sysID == null) {
        ref2 = [pubID, sysID], sysID = ref2[0], pubID = ref2[1];
      }
      if (pubID != null) {
        this.pubID = this.stringify.dtdPubID(pubID);
      }
      if (sysID != null) {
        this.sysID = this.stringify.dtdSysID(sysID);
      }
    }

    Object.defineProperty(XMLDocType.prototype, 'entities', {
      get: function() {
        var child, i, len, nodes, ref;
        nodes = {};
        ref = this.children;
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          if ((child.type === NodeType.EntityDeclaration) && !child.pe) {
            nodes[child.name] = child;
          }
        }
        return new XMLNamedNodeMap(nodes);
      }
    });

    Object.defineProperty(XMLDocType.prototype, 'notations', {
      get: function() {
        var child, i, len, nodes, ref;
        nodes = {};
        ref = this.children;
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          if (child.type === NodeType.NotationDeclaration) {
            nodes[child.name] = child;
          }
        }
        return new XMLNamedNodeMap(nodes);
      }
    });

    Object.defineProperty(XMLDocType.prototype, 'publicId', {
      get: function() {
        return this.pubID;
      }
    });

    Object.defineProperty(XMLDocType.prototype, 'systemId', {
      get: function() {
        return this.sysID;
      }
    });

    Object.defineProperty(XMLDocType.prototype, 'internalSubset', {
      get: function() {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      }
    });

    XMLDocType.prototype.element = function(name, value) {
      var child;
      child = new XMLDTDElement(this, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
      var child;
      child = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.entity = function(name, value) {
      var child;
      child = new XMLDTDEntity(this, false, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.pEntity = function(name, value) {
      var child;
      child = new XMLDTDEntity(this, true, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.notation = function(name, value) {
      var child;
      child = new XMLDTDNotation(this, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.toString = function(options) {
      return this.options.writer.docType(this, this.options.writer.filterOptions(options));
    };

    XMLDocType.prototype.ele = function(name, value) {
      return this.element(name, value);
    };

    XMLDocType.prototype.att = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
      return this.attList(elementName, attributeName, attributeType, defaultValueType, defaultValue);
    };

    XMLDocType.prototype.ent = function(name, value) {
      return this.entity(name, value);
    };

    XMLDocType.prototype.pent = function(name, value) {
      return this.pEntity(name, value);
    };

    XMLDocType.prototype.not = function(name, value) {
      return this.notation(name, value);
    };

    XMLDocType.prototype.up = function() {
      return this.root() || this.documentObject;
    };

    XMLDocType.prototype.isEqualNode = function(node) {
      if (!XMLDocType.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
        return false;
      }
      if (node.name !== this.name) {
        return false;
      }
      if (node.publicId !== this.publicId) {
        return false;
      }
      if (node.systemId !== this.systemId) {
        return false;
      }
      return true;
    };

    return XMLDocType;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLDocument.js":
/*!****************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLDocument.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, XMLDOMConfiguration, XMLDOMImplementation, XMLDocument, XMLNode, XMLStringWriter, XMLStringifier, isPlainObject,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  isPlainObject = (__webpack_require__(/*! ./Utility */ "./node_modules/xmlbuilder/lib/Utility.js").isPlainObject);

  XMLDOMImplementation = __webpack_require__(/*! ./XMLDOMImplementation */ "./node_modules/xmlbuilder/lib/XMLDOMImplementation.js");

  XMLDOMConfiguration = __webpack_require__(/*! ./XMLDOMConfiguration */ "./node_modules/xmlbuilder/lib/XMLDOMConfiguration.js");

  XMLNode = __webpack_require__(/*! ./XMLNode */ "./node_modules/xmlbuilder/lib/XMLNode.js");

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  XMLStringifier = __webpack_require__(/*! ./XMLStringifier */ "./node_modules/xmlbuilder/lib/XMLStringifier.js");

  XMLStringWriter = __webpack_require__(/*! ./XMLStringWriter */ "./node_modules/xmlbuilder/lib/XMLStringWriter.js");

  module.exports = XMLDocument = (function(superClass) {
    extend(XMLDocument, superClass);

    function XMLDocument(options) {
      XMLDocument.__super__.constructor.call(this, null);
      this.name = "#document";
      this.type = NodeType.Document;
      this.documentURI = null;
      this.domConfig = new XMLDOMConfiguration();
      options || (options = {});
      if (!options.writer) {
        options.writer = new XMLStringWriter();
      }
      this.options = options;
      this.stringify = new XMLStringifier(options);
    }

    Object.defineProperty(XMLDocument.prototype, 'implementation', {
      value: new XMLDOMImplementation()
    });

    Object.defineProperty(XMLDocument.prototype, 'doctype', {
      get: function() {
        var child, i, len, ref;
        ref = this.children;
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          if (child.type === NodeType.DocType) {
            return child;
          }
        }
        return null;
      }
    });

    Object.defineProperty(XMLDocument.prototype, 'documentElement', {
      get: function() {
        return this.rootObject || null;
      }
    });

    Object.defineProperty(XMLDocument.prototype, 'inputEncoding', {
      get: function() {
        return null;
      }
    });

    Object.defineProperty(XMLDocument.prototype, 'strictErrorChecking', {
      get: function() {
        return false;
      }
    });

    Object.defineProperty(XMLDocument.prototype, 'xmlEncoding', {
      get: function() {
        if (this.children.length !== 0 && this.children[0].type === NodeType.Declaration) {
          return this.children[0].encoding;
        } else {
          return null;
        }
      }
    });

    Object.defineProperty(XMLDocument.prototype, 'xmlStandalone', {
      get: function() {
        if (this.children.length !== 0 && this.children[0].type === NodeType.Declaration) {
          return this.children[0].standalone === 'yes';
        } else {
          return false;
        }
      }
    });

    Object.defineProperty(XMLDocument.prototype, 'xmlVersion', {
      get: function() {
        if (this.children.length !== 0 && this.children[0].type === NodeType.Declaration) {
          return this.children[0].version;
        } else {
          return "1.0";
        }
      }
    });

    Object.defineProperty(XMLDocument.prototype, 'URL', {
      get: function() {
        return this.documentURI;
      }
    });

    Object.defineProperty(XMLDocument.prototype, 'origin', {
      get: function() {
        return null;
      }
    });

    Object.defineProperty(XMLDocument.prototype, 'compatMode', {
      get: function() {
        return null;
      }
    });

    Object.defineProperty(XMLDocument.prototype, 'characterSet', {
      get: function() {
        return null;
      }
    });

    Object.defineProperty(XMLDocument.prototype, 'contentType', {
      get: function() {
        return null;
      }
    });

    XMLDocument.prototype.end = function(writer) {
      var writerOptions;
      writerOptions = {};
      if (!writer) {
        writer = this.options.writer;
      } else if (isPlainObject(writer)) {
        writerOptions = writer;
        writer = this.options.writer;
      }
      return writer.document(this, writer.filterOptions(writerOptions));
    };

    XMLDocument.prototype.toString = function(options) {
      return this.options.writer.document(this, this.options.writer.filterOptions(options));
    };

    XMLDocument.prototype.createElement = function(tagName) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.createDocumentFragment = function() {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.createTextNode = function(data) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.createComment = function(data) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.createCDATASection = function(data) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.createProcessingInstruction = function(target, data) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.createAttribute = function(name) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.createEntityReference = function(name) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.getElementsByTagName = function(tagname) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.importNode = function(importedNode, deep) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.createElementNS = function(namespaceURI, qualifiedName) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.createAttributeNS = function(namespaceURI, qualifiedName) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.getElementById = function(elementId) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.adoptNode = function(source) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.normalizeDocument = function() {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.renameNode = function(node, namespaceURI, qualifiedName) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.getElementsByClassName = function(classNames) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.createEvent = function(eventInterface) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.createRange = function() {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.createNodeIterator = function(root, whatToShow, filter) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.createTreeWalker = function(root, whatToShow, filter) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    return XMLDocument;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLDocumentCB.js":
/*!******************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLDocumentCB.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, WriterState, XMLAttribute, XMLCData, XMLComment, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDeclaration, XMLDocType, XMLDocument, XMLDocumentCB, XMLElement, XMLProcessingInstruction, XMLRaw, XMLStringWriter, XMLStringifier, XMLText, getValue, isFunction, isObject, isPlainObject, ref,
    hasProp = {}.hasOwnProperty;

  ref = __webpack_require__(/*! ./Utility */ "./node_modules/xmlbuilder/lib/Utility.js"), isObject = ref.isObject, isFunction = ref.isFunction, isPlainObject = ref.isPlainObject, getValue = ref.getValue;

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  XMLDocument = __webpack_require__(/*! ./XMLDocument */ "./node_modules/xmlbuilder/lib/XMLDocument.js");

  XMLElement = __webpack_require__(/*! ./XMLElement */ "./node_modules/xmlbuilder/lib/XMLElement.js");

  XMLCData = __webpack_require__(/*! ./XMLCData */ "./node_modules/xmlbuilder/lib/XMLCData.js");

  XMLComment = __webpack_require__(/*! ./XMLComment */ "./node_modules/xmlbuilder/lib/XMLComment.js");

  XMLRaw = __webpack_require__(/*! ./XMLRaw */ "./node_modules/xmlbuilder/lib/XMLRaw.js");

  XMLText = __webpack_require__(/*! ./XMLText */ "./node_modules/xmlbuilder/lib/XMLText.js");

  XMLProcessingInstruction = __webpack_require__(/*! ./XMLProcessingInstruction */ "./node_modules/xmlbuilder/lib/XMLProcessingInstruction.js");

  XMLDeclaration = __webpack_require__(/*! ./XMLDeclaration */ "./node_modules/xmlbuilder/lib/XMLDeclaration.js");

  XMLDocType = __webpack_require__(/*! ./XMLDocType */ "./node_modules/xmlbuilder/lib/XMLDocType.js");

  XMLDTDAttList = __webpack_require__(/*! ./XMLDTDAttList */ "./node_modules/xmlbuilder/lib/XMLDTDAttList.js");

  XMLDTDEntity = __webpack_require__(/*! ./XMLDTDEntity */ "./node_modules/xmlbuilder/lib/XMLDTDEntity.js");

  XMLDTDElement = __webpack_require__(/*! ./XMLDTDElement */ "./node_modules/xmlbuilder/lib/XMLDTDElement.js");

  XMLDTDNotation = __webpack_require__(/*! ./XMLDTDNotation */ "./node_modules/xmlbuilder/lib/XMLDTDNotation.js");

  XMLAttribute = __webpack_require__(/*! ./XMLAttribute */ "./node_modules/xmlbuilder/lib/XMLAttribute.js");

  XMLStringifier = __webpack_require__(/*! ./XMLStringifier */ "./node_modules/xmlbuilder/lib/XMLStringifier.js");

  XMLStringWriter = __webpack_require__(/*! ./XMLStringWriter */ "./node_modules/xmlbuilder/lib/XMLStringWriter.js");

  WriterState = __webpack_require__(/*! ./WriterState */ "./node_modules/xmlbuilder/lib/WriterState.js");

  module.exports = XMLDocumentCB = (function() {
    function XMLDocumentCB(options, onData, onEnd) {
      var writerOptions;
      this.name = "?xml";
      this.type = NodeType.Document;
      options || (options = {});
      writerOptions = {};
      if (!options.writer) {
        options.writer = new XMLStringWriter();
      } else if (isPlainObject(options.writer)) {
        writerOptions = options.writer;
        options.writer = new XMLStringWriter();
      }
      this.options = options;
      this.writer = options.writer;
      this.writerOptions = this.writer.filterOptions(writerOptions);
      this.stringify = new XMLStringifier(options);
      this.onDataCallback = onData || function() {};
      this.onEndCallback = onEnd || function() {};
      this.currentNode = null;
      this.currentLevel = -1;
      this.openTags = {};
      this.documentStarted = false;
      this.documentCompleted = false;
      this.root = null;
    }

    XMLDocumentCB.prototype.createChildNode = function(node) {
      var att, attName, attributes, child, i, len, ref1, ref2;
      switch (node.type) {
        case NodeType.CData:
          this.cdata(node.value);
          break;
        case NodeType.Comment:
          this.comment(node.value);
          break;
        case NodeType.Element:
          attributes = {};
          ref1 = node.attribs;
          for (attName in ref1) {
            if (!hasProp.call(ref1, attName)) continue;
            att = ref1[attName];
            attributes[attName] = att.value;
          }
          this.node(node.name, attributes);
          break;
        case NodeType.Dummy:
          this.dummy();
          break;
        case NodeType.Raw:
          this.raw(node.value);
          break;
        case NodeType.Text:
          this.text(node.value);
          break;
        case NodeType.ProcessingInstruction:
          this.instruction(node.target, node.value);
          break;
        default:
          throw new Error("This XML node type is not supported in a JS object: " + node.constructor.name);
      }
      ref2 = node.children;
      for (i = 0, len = ref2.length; i < len; i++) {
        child = ref2[i];
        this.createChildNode(child);
        if (child.type === NodeType.Element) {
          this.up();
        }
      }
      return this;
    };

    XMLDocumentCB.prototype.dummy = function() {
      return this;
    };

    XMLDocumentCB.prototype.node = function(name, attributes, text) {
      var ref1;
      if (name == null) {
        throw new Error("Missing node name.");
      }
      if (this.root && this.currentLevel === -1) {
        throw new Error("Document can only have one root node. " + this.debugInfo(name));
      }
      this.openCurrent();
      name = getValue(name);
      if (attributes == null) {
        attributes = {};
      }
      attributes = getValue(attributes);
      if (!isObject(attributes)) {
        ref1 = [attributes, text], text = ref1[0], attributes = ref1[1];
      }
      this.currentNode = new XMLElement(this, name, attributes);
      this.currentNode.children = false;
      this.currentLevel++;
      this.openTags[this.currentLevel] = this.currentNode;
      if (text != null) {
        this.text(text);
      }
      return this;
    };

    XMLDocumentCB.prototype.element = function(name, attributes, text) {
      var child, i, len, oldValidationFlag, ref1, root;
      if (this.currentNode && this.currentNode.type === NodeType.DocType) {
        this.dtdElement.apply(this, arguments);
      } else {
        if (Array.isArray(name) || isObject(name) || isFunction(name)) {
          oldValidationFlag = this.options.noValidation;
          this.options.noValidation = true;
          root = new XMLDocument(this.options).element('TEMP_ROOT');
          root.element(name);
          this.options.noValidation = oldValidationFlag;
          ref1 = root.children;
          for (i = 0, len = ref1.length; i < len; i++) {
            child = ref1[i];
            this.createChildNode(child);
            if (child.type === NodeType.Element) {
              this.up();
            }
          }
        } else {
          this.node(name, attributes, text);
        }
      }
      return this;
    };

    XMLDocumentCB.prototype.attribute = function(name, value) {
      var attName, attValue;
      if (!this.currentNode || this.currentNode.children) {
        throw new Error("att() can only be used immediately after an ele() call in callback mode. " + this.debugInfo(name));
      }
      if (name != null) {
        name = getValue(name);
      }
      if (isObject(name)) {
        for (attName in name) {
          if (!hasProp.call(name, attName)) continue;
          attValue = name[attName];
          this.attribute(attName, attValue);
        }
      } else {
        if (isFunction(value)) {
          value = value.apply();
        }
        if (this.options.keepNullAttributes && (value == null)) {
          this.currentNode.attribs[name] = new XMLAttribute(this, name, "");
        } else if (value != null) {
          this.currentNode.attribs[name] = new XMLAttribute(this, name, value);
        }
      }
      return this;
    };

    XMLDocumentCB.prototype.text = function(value) {
      var node;
      this.openCurrent();
      node = new XMLText(this, value);
      this.onData(this.writer.text(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
      return this;
    };

    XMLDocumentCB.prototype.cdata = function(value) {
      var node;
      this.openCurrent();
      node = new XMLCData(this, value);
      this.onData(this.writer.cdata(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
      return this;
    };

    XMLDocumentCB.prototype.comment = function(value) {
      var node;
      this.openCurrent();
      node = new XMLComment(this, value);
      this.onData(this.writer.comment(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
      return this;
    };

    XMLDocumentCB.prototype.raw = function(value) {
      var node;
      this.openCurrent();
      node = new XMLRaw(this, value);
      this.onData(this.writer.raw(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
      return this;
    };

    XMLDocumentCB.prototype.instruction = function(target, value) {
      var i, insTarget, insValue, len, node;
      this.openCurrent();
      if (target != null) {
        target = getValue(target);
      }
      if (value != null) {
        value = getValue(value);
      }
      if (Array.isArray(target)) {
        for (i = 0, len = target.length; i < len; i++) {
          insTarget = target[i];
          this.instruction(insTarget);
        }
      } else if (isObject(target)) {
        for (insTarget in target) {
          if (!hasProp.call(target, insTarget)) continue;
          insValue = target[insTarget];
          this.instruction(insTarget, insValue);
        }
      } else {
        if (isFunction(value)) {
          value = value.apply();
        }
        node = new XMLProcessingInstruction(this, target, value);
        this.onData(this.writer.processingInstruction(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
      }
      return this;
    };

    XMLDocumentCB.prototype.declaration = function(version, encoding, standalone) {
      var node;
      this.openCurrent();
      if (this.documentStarted) {
        throw new Error("declaration() must be the first node.");
      }
      node = new XMLDeclaration(this, version, encoding, standalone);
      this.onData(this.writer.declaration(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
      return this;
    };

    XMLDocumentCB.prototype.doctype = function(root, pubID, sysID) {
      this.openCurrent();
      if (root == null) {
        throw new Error("Missing root node name.");
      }
      if (this.root) {
        throw new Error("dtd() must come before the root node.");
      }
      this.currentNode = new XMLDocType(this, pubID, sysID);
      this.currentNode.rootNodeName = root;
      this.currentNode.children = false;
      this.currentLevel++;
      this.openTags[this.currentLevel] = this.currentNode;
      return this;
    };

    XMLDocumentCB.prototype.dtdElement = function(name, value) {
      var node;
      this.openCurrent();
      node = new XMLDTDElement(this, name, value);
      this.onData(this.writer.dtdElement(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
      return this;
    };

    XMLDocumentCB.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
      var node;
      this.openCurrent();
      node = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
      this.onData(this.writer.dtdAttList(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
      return this;
    };

    XMLDocumentCB.prototype.entity = function(name, value) {
      var node;
      this.openCurrent();
      node = new XMLDTDEntity(this, false, name, value);
      this.onData(this.writer.dtdEntity(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
      return this;
    };

    XMLDocumentCB.prototype.pEntity = function(name, value) {
      var node;
      this.openCurrent();
      node = new XMLDTDEntity(this, true, name, value);
      this.onData(this.writer.dtdEntity(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
      return this;
    };

    XMLDocumentCB.prototype.notation = function(name, value) {
      var node;
      this.openCurrent();
      node = new XMLDTDNotation(this, name, value);
      this.onData(this.writer.dtdNotation(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
      return this;
    };

    XMLDocumentCB.prototype.up = function() {
      if (this.currentLevel < 0) {
        throw new Error("The document node has no parent.");
      }
      if (this.currentNode) {
        if (this.currentNode.children) {
          this.closeNode(this.currentNode);
        } else {
          this.openNode(this.currentNode);
        }
        this.currentNode = null;
      } else {
        this.closeNode(this.openTags[this.currentLevel]);
      }
      delete this.openTags[this.currentLevel];
      this.currentLevel--;
      return this;
    };

    XMLDocumentCB.prototype.end = function() {
      while (this.currentLevel >= 0) {
        this.up();
      }
      return this.onEnd();
    };

    XMLDocumentCB.prototype.openCurrent = function() {
      if (this.currentNode) {
        this.currentNode.children = true;
        return this.openNode(this.currentNode);
      }
    };

    XMLDocumentCB.prototype.openNode = function(node) {
      var att, chunk, name, ref1;
      if (!node.isOpen) {
        if (!this.root && this.currentLevel === 0 && node.type === NodeType.Element) {
          this.root = node;
        }
        chunk = '';
        if (node.type === NodeType.Element) {
          this.writerOptions.state = WriterState.OpenTag;
          chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + '<' + node.name;
          ref1 = node.attribs;
          for (name in ref1) {
            if (!hasProp.call(ref1, name)) continue;
            att = ref1[name];
            chunk += this.writer.attribute(att, this.writerOptions, this.currentLevel);
          }
          chunk += (node.children ? '>' : '/>') + this.writer.endline(node, this.writerOptions, this.currentLevel);
          this.writerOptions.state = WriterState.InsideTag;
        } else {
          this.writerOptions.state = WriterState.OpenTag;
          chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + '<!DOCTYPE ' + node.rootNodeName;
          if (node.pubID && node.sysID) {
            chunk += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
          } else if (node.sysID) {
            chunk += ' SYSTEM "' + node.sysID + '"';
          }
          if (node.children) {
            chunk += ' [';
            this.writerOptions.state = WriterState.InsideTag;
          } else {
            this.writerOptions.state = WriterState.CloseTag;
            chunk += '>';
          }
          chunk += this.writer.endline(node, this.writerOptions, this.currentLevel);
        }
        this.onData(chunk, this.currentLevel);
        return node.isOpen = true;
      }
    };

    XMLDocumentCB.prototype.closeNode = function(node) {
      var chunk;
      if (!node.isClosed) {
        chunk = '';
        this.writerOptions.state = WriterState.CloseTag;
        if (node.type === NodeType.Element) {
          chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + '</' + node.name + '>' + this.writer.endline(node, this.writerOptions, this.currentLevel);
        } else {
          chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + ']>' + this.writer.endline(node, this.writerOptions, this.currentLevel);
        }
        this.writerOptions.state = WriterState.None;
        this.onData(chunk, this.currentLevel);
        return node.isClosed = true;
      }
    };

    XMLDocumentCB.prototype.onData = function(chunk, level) {
      this.documentStarted = true;
      return this.onDataCallback(chunk, level + 1);
    };

    XMLDocumentCB.prototype.onEnd = function() {
      this.documentCompleted = true;
      return this.onEndCallback();
    };

    XMLDocumentCB.prototype.debugInfo = function(name) {
      if (name == null) {
        return "";
      } else {
        return "node: <" + name + ">";
      }
    };

    XMLDocumentCB.prototype.ele = function() {
      return this.element.apply(this, arguments);
    };

    XMLDocumentCB.prototype.nod = function(name, attributes, text) {
      return this.node(name, attributes, text);
    };

    XMLDocumentCB.prototype.txt = function(value) {
      return this.text(value);
    };

    XMLDocumentCB.prototype.dat = function(value) {
      return this.cdata(value);
    };

    XMLDocumentCB.prototype.com = function(value) {
      return this.comment(value);
    };

    XMLDocumentCB.prototype.ins = function(target, value) {
      return this.instruction(target, value);
    };

    XMLDocumentCB.prototype.dec = function(version, encoding, standalone) {
      return this.declaration(version, encoding, standalone);
    };

    XMLDocumentCB.prototype.dtd = function(root, pubID, sysID) {
      return this.doctype(root, pubID, sysID);
    };

    XMLDocumentCB.prototype.e = function(name, attributes, text) {
      return this.element(name, attributes, text);
    };

    XMLDocumentCB.prototype.n = function(name, attributes, text) {
      return this.node(name, attributes, text);
    };

    XMLDocumentCB.prototype.t = function(value) {
      return this.text(value);
    };

    XMLDocumentCB.prototype.d = function(value) {
      return this.cdata(value);
    };

    XMLDocumentCB.prototype.c = function(value) {
      return this.comment(value);
    };

    XMLDocumentCB.prototype.r = function(value) {
      return this.raw(value);
    };

    XMLDocumentCB.prototype.i = function(target, value) {
      return this.instruction(target, value);
    };

    XMLDocumentCB.prototype.att = function() {
      if (this.currentNode && this.currentNode.type === NodeType.DocType) {
        return this.attList.apply(this, arguments);
      } else {
        return this.attribute.apply(this, arguments);
      }
    };

    XMLDocumentCB.prototype.a = function() {
      if (this.currentNode && this.currentNode.type === NodeType.DocType) {
        return this.attList.apply(this, arguments);
      } else {
        return this.attribute.apply(this, arguments);
      }
    };

    XMLDocumentCB.prototype.ent = function(name, value) {
      return this.entity(name, value);
    };

    XMLDocumentCB.prototype.pent = function(name, value) {
      return this.pEntity(name, value);
    };

    XMLDocumentCB.prototype.not = function(name, value) {
      return this.notation(name, value);
    };

    return XMLDocumentCB;

  })();

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLDummy.js":
/*!*************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLDummy.js ***!
  \*************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, XMLDummy, XMLNode,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "./node_modules/xmlbuilder/lib/XMLNode.js");

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  module.exports = XMLDummy = (function(superClass) {
    extend(XMLDummy, superClass);

    function XMLDummy(parent) {
      XMLDummy.__super__.constructor.call(this, parent);
      this.type = NodeType.Dummy;
    }

    XMLDummy.prototype.clone = function() {
      return Object.create(this);
    };

    XMLDummy.prototype.toString = function(options) {
      return '';
    };

    return XMLDummy;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLElement.js":
/*!***************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLElement.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, XMLAttribute, XMLElement, XMLNamedNodeMap, XMLNode, getValue, isFunction, isObject, ref,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ref = __webpack_require__(/*! ./Utility */ "./node_modules/xmlbuilder/lib/Utility.js"), isObject = ref.isObject, isFunction = ref.isFunction, getValue = ref.getValue;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "./node_modules/xmlbuilder/lib/XMLNode.js");

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  XMLAttribute = __webpack_require__(/*! ./XMLAttribute */ "./node_modules/xmlbuilder/lib/XMLAttribute.js");

  XMLNamedNodeMap = __webpack_require__(/*! ./XMLNamedNodeMap */ "./node_modules/xmlbuilder/lib/XMLNamedNodeMap.js");

  module.exports = XMLElement = (function(superClass) {
    extend(XMLElement, superClass);

    function XMLElement(parent, name, attributes) {
      var child, j, len, ref1;
      XMLElement.__super__.constructor.call(this, parent);
      if (name == null) {
        throw new Error("Missing element name. " + this.debugInfo());
      }
      this.name = this.stringify.name(name);
      this.type = NodeType.Element;
      this.attribs = {};
      this.schemaTypeInfo = null;
      if (attributes != null) {
        this.attribute(attributes);
      }
      if (parent.type === NodeType.Document) {
        this.isRoot = true;
        this.documentObject = parent;
        parent.rootObject = this;
        if (parent.children) {
          ref1 = parent.children;
          for (j = 0, len = ref1.length; j < len; j++) {
            child = ref1[j];
            if (child.type === NodeType.DocType) {
              child.name = this.name;
              break;
            }
          }
        }
      }
    }

    Object.defineProperty(XMLElement.prototype, 'tagName', {
      get: function() {
        return this.name;
      }
    });

    Object.defineProperty(XMLElement.prototype, 'namespaceURI', {
      get: function() {
        return '';
      }
    });

    Object.defineProperty(XMLElement.prototype, 'prefix', {
      get: function() {
        return '';
      }
    });

    Object.defineProperty(XMLElement.prototype, 'localName', {
      get: function() {
        return this.name;
      }
    });

    Object.defineProperty(XMLElement.prototype, 'id', {
      get: function() {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      }
    });

    Object.defineProperty(XMLElement.prototype, 'className', {
      get: function() {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      }
    });

    Object.defineProperty(XMLElement.prototype, 'classList', {
      get: function() {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      }
    });

    Object.defineProperty(XMLElement.prototype, 'attributes', {
      get: function() {
        if (!this.attributeMap || !this.attributeMap.nodes) {
          this.attributeMap = new XMLNamedNodeMap(this.attribs);
        }
        return this.attributeMap;
      }
    });

    XMLElement.prototype.clone = function() {
      var att, attName, clonedSelf, ref1;
      clonedSelf = Object.create(this);
      if (clonedSelf.isRoot) {
        clonedSelf.documentObject = null;
      }
      clonedSelf.attribs = {};
      ref1 = this.attribs;
      for (attName in ref1) {
        if (!hasProp.call(ref1, attName)) continue;
        att = ref1[attName];
        clonedSelf.attribs[attName] = att.clone();
      }
      clonedSelf.children = [];
      this.children.forEach(function(child) {
        var clonedChild;
        clonedChild = child.clone();
        clonedChild.parent = clonedSelf;
        return clonedSelf.children.push(clonedChild);
      });
      return clonedSelf;
    };

    XMLElement.prototype.attribute = function(name, value) {
      var attName, attValue;
      if (name != null) {
        name = getValue(name);
      }
      if (isObject(name)) {
        for (attName in name) {
          if (!hasProp.call(name, attName)) continue;
          attValue = name[attName];
          this.attribute(attName, attValue);
        }
      } else {
        if (isFunction(value)) {
          value = value.apply();
        }
        if (this.options.keepNullAttributes && (value == null)) {
          this.attribs[name] = new XMLAttribute(this, name, "");
        } else if (value != null) {
          this.attribs[name] = new XMLAttribute(this, name, value);
        }
      }
      return this;
    };

    XMLElement.prototype.removeAttribute = function(name) {
      var attName, j, len;
      if (name == null) {
        throw new Error("Missing attribute name. " + this.debugInfo());
      }
      name = getValue(name);
      if (Array.isArray(name)) {
        for (j = 0, len = name.length; j < len; j++) {
          attName = name[j];
          delete this.attribs[attName];
        }
      } else {
        delete this.attribs[name];
      }
      return this;
    };

    XMLElement.prototype.toString = function(options) {
      return this.options.writer.element(this, this.options.writer.filterOptions(options));
    };

    XMLElement.prototype.att = function(name, value) {
      return this.attribute(name, value);
    };

    XMLElement.prototype.a = function(name, value) {
      return this.attribute(name, value);
    };

    XMLElement.prototype.getAttribute = function(name) {
      if (this.attribs.hasOwnProperty(name)) {
        return this.attribs[name].value;
      } else {
        return null;
      }
    };

    XMLElement.prototype.setAttribute = function(name, value) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.getAttributeNode = function(name) {
      if (this.attribs.hasOwnProperty(name)) {
        return this.attribs[name];
      } else {
        return null;
      }
    };

    XMLElement.prototype.setAttributeNode = function(newAttr) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.removeAttributeNode = function(oldAttr) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.getElementsByTagName = function(name) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.getAttributeNS = function(namespaceURI, localName) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.setAttributeNS = function(namespaceURI, qualifiedName, value) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.removeAttributeNS = function(namespaceURI, localName) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.getAttributeNodeNS = function(namespaceURI, localName) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.setAttributeNodeNS = function(newAttr) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.hasAttribute = function(name) {
      return this.attribs.hasOwnProperty(name);
    };

    XMLElement.prototype.hasAttributeNS = function(namespaceURI, localName) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.setIdAttribute = function(name, isId) {
      if (this.attribs.hasOwnProperty(name)) {
        return this.attribs[name].isId;
      } else {
        return isId;
      }
    };

    XMLElement.prototype.setIdAttributeNS = function(namespaceURI, localName, isId) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.setIdAttributeNode = function(idAttr, isId) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.getElementsByTagName = function(tagname) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.getElementsByClassName = function(classNames) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.isEqualNode = function(node) {
      var i, j, ref1;
      if (!XMLElement.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
        return false;
      }
      if (node.namespaceURI !== this.namespaceURI) {
        return false;
      }
      if (node.prefix !== this.prefix) {
        return false;
      }
      if (node.localName !== this.localName) {
        return false;
      }
      if (node.attribs.length !== this.attribs.length) {
        return false;
      }
      for (i = j = 0, ref1 = this.attribs.length - 1; 0 <= ref1 ? j <= ref1 : j >= ref1; i = 0 <= ref1 ? ++j : --j) {
        if (!this.attribs[i].isEqualNode(node.attribs[i])) {
          return false;
        }
      }
      return true;
    };

    return XMLElement;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLNamedNodeMap.js":
/*!********************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLNamedNodeMap.js ***!
  \********************************************************/
/***/ (function(module) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLNamedNodeMap;

  module.exports = XMLNamedNodeMap = (function() {
    function XMLNamedNodeMap(nodes) {
      this.nodes = nodes;
    }

    Object.defineProperty(XMLNamedNodeMap.prototype, 'length', {
      get: function() {
        return Object.keys(this.nodes).length || 0;
      }
    });

    XMLNamedNodeMap.prototype.clone = function() {
      return this.nodes = null;
    };

    XMLNamedNodeMap.prototype.getNamedItem = function(name) {
      return this.nodes[name];
    };

    XMLNamedNodeMap.prototype.setNamedItem = function(node) {
      var oldNode;
      oldNode = this.nodes[node.nodeName];
      this.nodes[node.nodeName] = node;
      return oldNode || null;
    };

    XMLNamedNodeMap.prototype.removeNamedItem = function(name) {
      var oldNode;
      oldNode = this.nodes[name];
      delete this.nodes[name];
      return oldNode || null;
    };

    XMLNamedNodeMap.prototype.item = function(index) {
      return this.nodes[Object.keys(this.nodes)[index]] || null;
    };

    XMLNamedNodeMap.prototype.getNamedItemNS = function(namespaceURI, localName) {
      throw new Error("This DOM method is not implemented.");
    };

    XMLNamedNodeMap.prototype.setNamedItemNS = function(node) {
      throw new Error("This DOM method is not implemented.");
    };

    XMLNamedNodeMap.prototype.removeNamedItemNS = function(namespaceURI, localName) {
      throw new Error("This DOM method is not implemented.");
    };

    return XMLNamedNodeMap;

  })();

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLNode.js":
/*!************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLNode.js ***!
  \************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var DocumentPosition, NodeType, XMLCData, XMLComment, XMLDeclaration, XMLDocType, XMLDummy, XMLElement, XMLNamedNodeMap, XMLNode, XMLNodeList, XMLProcessingInstruction, XMLRaw, XMLText, getValue, isEmpty, isFunction, isObject, ref1,
    hasProp = {}.hasOwnProperty;

  ref1 = __webpack_require__(/*! ./Utility */ "./node_modules/xmlbuilder/lib/Utility.js"), isObject = ref1.isObject, isFunction = ref1.isFunction, isEmpty = ref1.isEmpty, getValue = ref1.getValue;

  XMLElement = null;

  XMLCData = null;

  XMLComment = null;

  XMLDeclaration = null;

  XMLDocType = null;

  XMLRaw = null;

  XMLText = null;

  XMLProcessingInstruction = null;

  XMLDummy = null;

  NodeType = null;

  XMLNodeList = null;

  XMLNamedNodeMap = null;

  DocumentPosition = null;

  module.exports = XMLNode = (function() {
    function XMLNode(parent1) {
      this.parent = parent1;
      if (this.parent) {
        this.options = this.parent.options;
        this.stringify = this.parent.stringify;
      }
      this.value = null;
      this.children = [];
      this.baseURI = null;
      if (!XMLElement) {
        XMLElement = __webpack_require__(/*! ./XMLElement */ "./node_modules/xmlbuilder/lib/XMLElement.js");
        XMLCData = __webpack_require__(/*! ./XMLCData */ "./node_modules/xmlbuilder/lib/XMLCData.js");
        XMLComment = __webpack_require__(/*! ./XMLComment */ "./node_modules/xmlbuilder/lib/XMLComment.js");
        XMLDeclaration = __webpack_require__(/*! ./XMLDeclaration */ "./node_modules/xmlbuilder/lib/XMLDeclaration.js");
        XMLDocType = __webpack_require__(/*! ./XMLDocType */ "./node_modules/xmlbuilder/lib/XMLDocType.js");
        XMLRaw = __webpack_require__(/*! ./XMLRaw */ "./node_modules/xmlbuilder/lib/XMLRaw.js");
        XMLText = __webpack_require__(/*! ./XMLText */ "./node_modules/xmlbuilder/lib/XMLText.js");
        XMLProcessingInstruction = __webpack_require__(/*! ./XMLProcessingInstruction */ "./node_modules/xmlbuilder/lib/XMLProcessingInstruction.js");
        XMLDummy = __webpack_require__(/*! ./XMLDummy */ "./node_modules/xmlbuilder/lib/XMLDummy.js");
        NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");
        XMLNodeList = __webpack_require__(/*! ./XMLNodeList */ "./node_modules/xmlbuilder/lib/XMLNodeList.js");
        XMLNamedNodeMap = __webpack_require__(/*! ./XMLNamedNodeMap */ "./node_modules/xmlbuilder/lib/XMLNamedNodeMap.js");
        DocumentPosition = __webpack_require__(/*! ./DocumentPosition */ "./node_modules/xmlbuilder/lib/DocumentPosition.js");
      }
    }

    Object.defineProperty(XMLNode.prototype, 'nodeName', {
      get: function() {
        return this.name;
      }
    });

    Object.defineProperty(XMLNode.prototype, 'nodeType', {
      get: function() {
        return this.type;
      }
    });

    Object.defineProperty(XMLNode.prototype, 'nodeValue', {
      get: function() {
        return this.value;
      }
    });

    Object.defineProperty(XMLNode.prototype, 'parentNode', {
      get: function() {
        return this.parent;
      }
    });

    Object.defineProperty(XMLNode.prototype, 'childNodes', {
      get: function() {
        if (!this.childNodeList || !this.childNodeList.nodes) {
          this.childNodeList = new XMLNodeList(this.children);
        }
        return this.childNodeList;
      }
    });

    Object.defineProperty(XMLNode.prototype, 'firstChild', {
      get: function() {
        return this.children[0] || null;
      }
    });

    Object.defineProperty(XMLNode.prototype, 'lastChild', {
      get: function() {
        return this.children[this.children.length - 1] || null;
      }
    });

    Object.defineProperty(XMLNode.prototype, 'previousSibling', {
      get: function() {
        var i;
        i = this.parent.children.indexOf(this);
        return this.parent.children[i - 1] || null;
      }
    });

    Object.defineProperty(XMLNode.prototype, 'nextSibling', {
      get: function() {
        var i;
        i = this.parent.children.indexOf(this);
        return this.parent.children[i + 1] || null;
      }
    });

    Object.defineProperty(XMLNode.prototype, 'ownerDocument', {
      get: function() {
        return this.document() || null;
      }
    });

    Object.defineProperty(XMLNode.prototype, 'textContent', {
      get: function() {
        var child, j, len, ref2, str;
        if (this.nodeType === NodeType.Element || this.nodeType === NodeType.DocumentFragment) {
          str = '';
          ref2 = this.children;
          for (j = 0, len = ref2.length; j < len; j++) {
            child = ref2[j];
            if (child.textContent) {
              str += child.textContent;
            }
          }
          return str;
        } else {
          return null;
        }
      },
      set: function(value) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      }
    });

    XMLNode.prototype.setParent = function(parent) {
      var child, j, len, ref2, results;
      this.parent = parent;
      if (parent) {
        this.options = parent.options;
        this.stringify = parent.stringify;
      }
      ref2 = this.children;
      results = [];
      for (j = 0, len = ref2.length; j < len; j++) {
        child = ref2[j];
        results.push(child.setParent(this));
      }
      return results;
    };

    XMLNode.prototype.element = function(name, attributes, text) {
      var childNode, item, j, k, key, lastChild, len, len1, ref2, ref3, val;
      lastChild = null;
      if (attributes === null && (text == null)) {
        ref2 = [{}, null], attributes = ref2[0], text = ref2[1];
      }
      if (attributes == null) {
        attributes = {};
      }
      attributes = getValue(attributes);
      if (!isObject(attributes)) {
        ref3 = [attributes, text], text = ref3[0], attributes = ref3[1];
      }
      if (name != null) {
        name = getValue(name);
      }
      if (Array.isArray(name)) {
        for (j = 0, len = name.length; j < len; j++) {
          item = name[j];
          lastChild = this.element(item);
        }
      } else if (isFunction(name)) {
        lastChild = this.element(name.apply());
      } else if (isObject(name)) {
        for (key in name) {
          if (!hasProp.call(name, key)) continue;
          val = name[key];
          if (isFunction(val)) {
            val = val.apply();
          }
          if (!this.options.ignoreDecorators && this.stringify.convertAttKey && key.indexOf(this.stringify.convertAttKey) === 0) {
            lastChild = this.attribute(key.substr(this.stringify.convertAttKey.length), val);
          } else if (!this.options.separateArrayItems && Array.isArray(val) && isEmpty(val)) {
            lastChild = this.dummy();
          } else if (isObject(val) && isEmpty(val)) {
            lastChild = this.element(key);
          } else if (!this.options.keepNullNodes && (val == null)) {
            lastChild = this.dummy();
          } else if (!this.options.separateArrayItems && Array.isArray(val)) {
            for (k = 0, len1 = val.length; k < len1; k++) {
              item = val[k];
              childNode = {};
              childNode[key] = item;
              lastChild = this.element(childNode);
            }
          } else if (isObject(val)) {
            if (!this.options.ignoreDecorators && this.stringify.convertTextKey && key.indexOf(this.stringify.convertTextKey) === 0) {
              lastChild = this.element(val);
            } else {
              lastChild = this.element(key);
              lastChild.element(val);
            }
          } else {
            lastChild = this.element(key, val);
          }
        }
      } else if (!this.options.keepNullNodes && text === null) {
        lastChild = this.dummy();
      } else {
        if (!this.options.ignoreDecorators && this.stringify.convertTextKey && name.indexOf(this.stringify.convertTextKey) === 0) {
          lastChild = this.text(text);
        } else if (!this.options.ignoreDecorators && this.stringify.convertCDataKey && name.indexOf(this.stringify.convertCDataKey) === 0) {
          lastChild = this.cdata(text);
        } else if (!this.options.ignoreDecorators && this.stringify.convertCommentKey && name.indexOf(this.stringify.convertCommentKey) === 0) {
          lastChild = this.comment(text);
        } else if (!this.options.ignoreDecorators && this.stringify.convertRawKey && name.indexOf(this.stringify.convertRawKey) === 0) {
          lastChild = this.raw(text);
        } else if (!this.options.ignoreDecorators && this.stringify.convertPIKey && name.indexOf(this.stringify.convertPIKey) === 0) {
          lastChild = this.instruction(name.substr(this.stringify.convertPIKey.length), text);
        } else {
          lastChild = this.node(name, attributes, text);
        }
      }
      if (lastChild == null) {
        throw new Error("Could not create any elements with: " + name + ". " + this.debugInfo());
      }
      return lastChild;
    };

    XMLNode.prototype.insertBefore = function(name, attributes, text) {
      var child, i, newChild, refChild, removed;
      if (name != null ? name.type : void 0) {
        newChild = name;
        refChild = attributes;
        newChild.setParent(this);
        if (refChild) {
          i = children.indexOf(refChild);
          removed = children.splice(i);
          children.push(newChild);
          Array.prototype.push.apply(children, removed);
        } else {
          children.push(newChild);
        }
        return newChild;
      } else {
        if (this.isRoot) {
          throw new Error("Cannot insert elements at root level. " + this.debugInfo(name));
        }
        i = this.parent.children.indexOf(this);
        removed = this.parent.children.splice(i);
        child = this.parent.element(name, attributes, text);
        Array.prototype.push.apply(this.parent.children, removed);
        return child;
      }
    };

    XMLNode.prototype.insertAfter = function(name, attributes, text) {
      var child, i, removed;
      if (this.isRoot) {
        throw new Error("Cannot insert elements at root level. " + this.debugInfo(name));
      }
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i + 1);
      child = this.parent.element(name, attributes, text);
      Array.prototype.push.apply(this.parent.children, removed);
      return child;
    };

    XMLNode.prototype.remove = function() {
      var i, ref2;
      if (this.isRoot) {
        throw new Error("Cannot remove the root element. " + this.debugInfo());
      }
      i = this.parent.children.indexOf(this);
      [].splice.apply(this.parent.children, [i, i - i + 1].concat(ref2 = [])), ref2;
      return this.parent;
    };

    XMLNode.prototype.node = function(name, attributes, text) {
      var child, ref2;
      if (name != null) {
        name = getValue(name);
      }
      attributes || (attributes = {});
      attributes = getValue(attributes);
      if (!isObject(attributes)) {
        ref2 = [attributes, text], text = ref2[0], attributes = ref2[1];
      }
      child = new XMLElement(this, name, attributes);
      if (text != null) {
        child.text(text);
      }
      this.children.push(child);
      return child;
    };

    XMLNode.prototype.text = function(value) {
      var child;
      if (isObject(value)) {
        this.element(value);
      }
      child = new XMLText(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.cdata = function(value) {
      var child;
      child = new XMLCData(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.comment = function(value) {
      var child;
      child = new XMLComment(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.commentBefore = function(value) {
      var child, i, removed;
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i);
      child = this.parent.comment(value);
      Array.prototype.push.apply(this.parent.children, removed);
      return this;
    };

    XMLNode.prototype.commentAfter = function(value) {
      var child, i, removed;
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i + 1);
      child = this.parent.comment(value);
      Array.prototype.push.apply(this.parent.children, removed);
      return this;
    };

    XMLNode.prototype.raw = function(value) {
      var child;
      child = new XMLRaw(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.dummy = function() {
      var child;
      child = new XMLDummy(this);
      return child;
    };

    XMLNode.prototype.instruction = function(target, value) {
      var insTarget, insValue, instruction, j, len;
      if (target != null) {
        target = getValue(target);
      }
      if (value != null) {
        value = getValue(value);
      }
      if (Array.isArray(target)) {
        for (j = 0, len = target.length; j < len; j++) {
          insTarget = target[j];
          this.instruction(insTarget);
        }
      } else if (isObject(target)) {
        for (insTarget in target) {
          if (!hasProp.call(target, insTarget)) continue;
          insValue = target[insTarget];
          this.instruction(insTarget, insValue);
        }
      } else {
        if (isFunction(value)) {
          value = value.apply();
        }
        instruction = new XMLProcessingInstruction(this, target, value);
        this.children.push(instruction);
      }
      return this;
    };

    XMLNode.prototype.instructionBefore = function(target, value) {
      var child, i, removed;
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i);
      child = this.parent.instruction(target, value);
      Array.prototype.push.apply(this.parent.children, removed);
      return this;
    };

    XMLNode.prototype.instructionAfter = function(target, value) {
      var child, i, removed;
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i + 1);
      child = this.parent.instruction(target, value);
      Array.prototype.push.apply(this.parent.children, removed);
      return this;
    };

    XMLNode.prototype.declaration = function(version, encoding, standalone) {
      var doc, xmldec;
      doc = this.document();
      xmldec = new XMLDeclaration(doc, version, encoding, standalone);
      if (doc.children.length === 0) {
        doc.children.unshift(xmldec);
      } else if (doc.children[0].type === NodeType.Declaration) {
        doc.children[0] = xmldec;
      } else {
        doc.children.unshift(xmldec);
      }
      return doc.root() || doc;
    };

    XMLNode.prototype.dtd = function(pubID, sysID) {
      var child, doc, doctype, i, j, k, len, len1, ref2, ref3;
      doc = this.document();
      doctype = new XMLDocType(doc, pubID, sysID);
      ref2 = doc.children;
      for (i = j = 0, len = ref2.length; j < len; i = ++j) {
        child = ref2[i];
        if (child.type === NodeType.DocType) {
          doc.children[i] = doctype;
          return doctype;
        }
      }
      ref3 = doc.children;
      for (i = k = 0, len1 = ref3.length; k < len1; i = ++k) {
        child = ref3[i];
        if (child.isRoot) {
          doc.children.splice(i, 0, doctype);
          return doctype;
        }
      }
      doc.children.push(doctype);
      return doctype;
    };

    XMLNode.prototype.up = function() {
      if (this.isRoot) {
        throw new Error("The root node has no parent. Use doc() if you need to get the document object.");
      }
      return this.parent;
    };

    XMLNode.prototype.root = function() {
      var node;
      node = this;
      while (node) {
        if (node.type === NodeType.Document) {
          return node.rootObject;
        } else if (node.isRoot) {
          return node;
        } else {
          node = node.parent;
        }
      }
    };

    XMLNode.prototype.document = function() {
      var node;
      node = this;
      while (node) {
        if (node.type === NodeType.Document) {
          return node;
        } else {
          node = node.parent;
        }
      }
    };

    XMLNode.prototype.end = function(options) {
      return this.document().end(options);
    };

    XMLNode.prototype.prev = function() {
      var i;
      i = this.parent.children.indexOf(this);
      if (i < 1) {
        throw new Error("Already at the first node. " + this.debugInfo());
      }
      return this.parent.children[i - 1];
    };

    XMLNode.prototype.next = function() {
      var i;
      i = this.parent.children.indexOf(this);
      if (i === -1 || i === this.parent.children.length - 1) {
        throw new Error("Already at the last node. " + this.debugInfo());
      }
      return this.parent.children[i + 1];
    };

    XMLNode.prototype.importDocument = function(doc) {
      var clonedRoot;
      clonedRoot = doc.root().clone();
      clonedRoot.parent = this;
      clonedRoot.isRoot = false;
      this.children.push(clonedRoot);
      return this;
    };

    XMLNode.prototype.debugInfo = function(name) {
      var ref2, ref3;
      name = name || this.name;
      if ((name == null) && !((ref2 = this.parent) != null ? ref2.name : void 0)) {
        return "";
      } else if (name == null) {
        return "parent: <" + this.parent.name + ">";
      } else if (!((ref3 = this.parent) != null ? ref3.name : void 0)) {
        return "node: <" + name + ">";
      } else {
        return "node: <" + name + ">, parent: <" + this.parent.name + ">";
      }
    };

    XMLNode.prototype.ele = function(name, attributes, text) {
      return this.element(name, attributes, text);
    };

    XMLNode.prototype.nod = function(name, attributes, text) {
      return this.node(name, attributes, text);
    };

    XMLNode.prototype.txt = function(value) {
      return this.text(value);
    };

    XMLNode.prototype.dat = function(value) {
      return this.cdata(value);
    };

    XMLNode.prototype.com = function(value) {
      return this.comment(value);
    };

    XMLNode.prototype.ins = function(target, value) {
      return this.instruction(target, value);
    };

    XMLNode.prototype.doc = function() {
      return this.document();
    };

    XMLNode.prototype.dec = function(version, encoding, standalone) {
      return this.declaration(version, encoding, standalone);
    };

    XMLNode.prototype.e = function(name, attributes, text) {
      return this.element(name, attributes, text);
    };

    XMLNode.prototype.n = function(name, attributes, text) {
      return this.node(name, attributes, text);
    };

    XMLNode.prototype.t = function(value) {
      return this.text(value);
    };

    XMLNode.prototype.d = function(value) {
      return this.cdata(value);
    };

    XMLNode.prototype.c = function(value) {
      return this.comment(value);
    };

    XMLNode.prototype.r = function(value) {
      return this.raw(value);
    };

    XMLNode.prototype.i = function(target, value) {
      return this.instruction(target, value);
    };

    XMLNode.prototype.u = function() {
      return this.up();
    };

    XMLNode.prototype.importXMLBuilder = function(doc) {
      return this.importDocument(doc);
    };

    XMLNode.prototype.replaceChild = function(newChild, oldChild) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLNode.prototype.removeChild = function(oldChild) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLNode.prototype.appendChild = function(newChild) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLNode.prototype.hasChildNodes = function() {
      return this.children.length !== 0;
    };

    XMLNode.prototype.cloneNode = function(deep) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLNode.prototype.normalize = function() {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLNode.prototype.isSupported = function(feature, version) {
      return true;
    };

    XMLNode.prototype.hasAttributes = function() {
      return this.attribs.length !== 0;
    };

    XMLNode.prototype.compareDocumentPosition = function(other) {
      var ref, res;
      ref = this;
      if (ref === other) {
        return 0;
      } else if (this.document() !== other.document()) {
        res = DocumentPosition.Disconnected | DocumentPosition.ImplementationSpecific;
        if (Math.random() < 0.5) {
          res |= DocumentPosition.Preceding;
        } else {
          res |= DocumentPosition.Following;
        }
        return res;
      } else if (ref.isAncestor(other)) {
        return DocumentPosition.Contains | DocumentPosition.Preceding;
      } else if (ref.isDescendant(other)) {
        return DocumentPosition.Contains | DocumentPosition.Following;
      } else if (ref.isPreceding(other)) {
        return DocumentPosition.Preceding;
      } else {
        return DocumentPosition.Following;
      }
    };

    XMLNode.prototype.isSameNode = function(other) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLNode.prototype.lookupPrefix = function(namespaceURI) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLNode.prototype.isDefaultNamespace = function(namespaceURI) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLNode.prototype.lookupNamespaceURI = function(prefix) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLNode.prototype.isEqualNode = function(node) {
      var i, j, ref2;
      if (node.nodeType !== this.nodeType) {
        return false;
      }
      if (node.children.length !== this.children.length) {
        return false;
      }
      for (i = j = 0, ref2 = this.children.length - 1; 0 <= ref2 ? j <= ref2 : j >= ref2; i = 0 <= ref2 ? ++j : --j) {
        if (!this.children[i].isEqualNode(node.children[i])) {
          return false;
        }
      }
      return true;
    };

    XMLNode.prototype.getFeature = function(feature, version) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLNode.prototype.setUserData = function(key, data, handler) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLNode.prototype.getUserData = function(key) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLNode.prototype.contains = function(other) {
      if (!other) {
        return false;
      }
      return other === this || this.isDescendant(other);
    };

    XMLNode.prototype.isDescendant = function(node) {
      var child, isDescendantChild, j, len, ref2;
      ref2 = this.children;
      for (j = 0, len = ref2.length; j < len; j++) {
        child = ref2[j];
        if (node === child) {
          return true;
        }
        isDescendantChild = child.isDescendant(node);
        if (isDescendantChild) {
          return true;
        }
      }
      return false;
    };

    XMLNode.prototype.isAncestor = function(node) {
      return node.isDescendant(this);
    };

    XMLNode.prototype.isPreceding = function(node) {
      var nodePos, thisPos;
      nodePos = this.treePosition(node);
      thisPos = this.treePosition(this);
      if (nodePos === -1 || thisPos === -1) {
        return false;
      } else {
        return nodePos < thisPos;
      }
    };

    XMLNode.prototype.isFollowing = function(node) {
      var nodePos, thisPos;
      nodePos = this.treePosition(node);
      thisPos = this.treePosition(this);
      if (nodePos === -1 || thisPos === -1) {
        return false;
      } else {
        return nodePos > thisPos;
      }
    };

    XMLNode.prototype.treePosition = function(node) {
      var found, pos;
      pos = 0;
      found = false;
      this.foreachTreeNode(this.document(), function(childNode) {
        pos++;
        if (!found && childNode === node) {
          return found = true;
        }
      });
      if (found) {
        return pos;
      } else {
        return -1;
      }
    };

    XMLNode.prototype.foreachTreeNode = function(node, func) {
      var child, j, len, ref2, res;
      node || (node = this.document());
      ref2 = node.children;
      for (j = 0, len = ref2.length; j < len; j++) {
        child = ref2[j];
        if (res = func(child)) {
          return res;
        } else {
          res = this.foreachTreeNode(child, func);
          if (res) {
            return res;
          }
        }
      }
    };

    return XMLNode;

  })();

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLNodeList.js":
/*!****************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLNodeList.js ***!
  \****************************************************/
/***/ (function(module) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLNodeList;

  module.exports = XMLNodeList = (function() {
    function XMLNodeList(nodes) {
      this.nodes = nodes;
    }

    Object.defineProperty(XMLNodeList.prototype, 'length', {
      get: function() {
        return this.nodes.length || 0;
      }
    });

    XMLNodeList.prototype.clone = function() {
      return this.nodes = null;
    };

    XMLNodeList.prototype.item = function(index) {
      return this.nodes[index] || null;
    };

    return XMLNodeList;

  })();

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLProcessingInstruction.js":
/*!*****************************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLProcessingInstruction.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, XMLCharacterData, XMLProcessingInstruction,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  XMLCharacterData = __webpack_require__(/*! ./XMLCharacterData */ "./node_modules/xmlbuilder/lib/XMLCharacterData.js");

  module.exports = XMLProcessingInstruction = (function(superClass) {
    extend(XMLProcessingInstruction, superClass);

    function XMLProcessingInstruction(parent, target, value) {
      XMLProcessingInstruction.__super__.constructor.call(this, parent);
      if (target == null) {
        throw new Error("Missing instruction target. " + this.debugInfo());
      }
      this.type = NodeType.ProcessingInstruction;
      this.target = this.stringify.insTarget(target);
      this.name = this.target;
      if (value) {
        this.value = this.stringify.insValue(value);
      }
    }

    XMLProcessingInstruction.prototype.clone = function() {
      return Object.create(this);
    };

    XMLProcessingInstruction.prototype.toString = function(options) {
      return this.options.writer.processingInstruction(this, this.options.writer.filterOptions(options));
    };

    XMLProcessingInstruction.prototype.isEqualNode = function(node) {
      if (!XMLProcessingInstruction.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
        return false;
      }
      if (node.target !== this.target) {
        return false;
      }
      return true;
    };

    return XMLProcessingInstruction;

  })(XMLCharacterData);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLRaw.js":
/*!***********************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLRaw.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, XMLNode, XMLRaw,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  XMLNode = __webpack_require__(/*! ./XMLNode */ "./node_modules/xmlbuilder/lib/XMLNode.js");

  module.exports = XMLRaw = (function(superClass) {
    extend(XMLRaw, superClass);

    function XMLRaw(parent, text) {
      XMLRaw.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing raw text. " + this.debugInfo());
      }
      this.type = NodeType.Raw;
      this.value = this.stringify.raw(text);
    }

    XMLRaw.prototype.clone = function() {
      return Object.create(this);
    };

    XMLRaw.prototype.toString = function(options) {
      return this.options.writer.raw(this, this.options.writer.filterOptions(options));
    };

    return XMLRaw;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLStreamWriter.js":
/*!********************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLStreamWriter.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, WriterState, XMLStreamWriter, XMLWriterBase,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  XMLWriterBase = __webpack_require__(/*! ./XMLWriterBase */ "./node_modules/xmlbuilder/lib/XMLWriterBase.js");

  WriterState = __webpack_require__(/*! ./WriterState */ "./node_modules/xmlbuilder/lib/WriterState.js");

  module.exports = XMLStreamWriter = (function(superClass) {
    extend(XMLStreamWriter, superClass);

    function XMLStreamWriter(stream, options) {
      this.stream = stream;
      XMLStreamWriter.__super__.constructor.call(this, options);
    }

    XMLStreamWriter.prototype.endline = function(node, options, level) {
      if (node.isLastRootNode && options.state === WriterState.CloseTag) {
        return '';
      } else {
        return XMLStreamWriter.__super__.endline.call(this, node, options, level);
      }
    };

    XMLStreamWriter.prototype.document = function(doc, options) {
      var child, i, j, k, len, len1, ref, ref1, results;
      ref = doc.children;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        child = ref[i];
        child.isLastRootNode = i === doc.children.length - 1;
      }
      options = this.filterOptions(options);
      ref1 = doc.children;
      results = [];
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        child = ref1[k];
        results.push(this.writeChildNode(child, options, 0));
      }
      return results;
    };

    XMLStreamWriter.prototype.attribute = function(att, options, level) {
      return this.stream.write(XMLStreamWriter.__super__.attribute.call(this, att, options, level));
    };

    XMLStreamWriter.prototype.cdata = function(node, options, level) {
      return this.stream.write(XMLStreamWriter.__super__.cdata.call(this, node, options, level));
    };

    XMLStreamWriter.prototype.comment = function(node, options, level) {
      return this.stream.write(XMLStreamWriter.__super__.comment.call(this, node, options, level));
    };

    XMLStreamWriter.prototype.declaration = function(node, options, level) {
      return this.stream.write(XMLStreamWriter.__super__.declaration.call(this, node, options, level));
    };

    XMLStreamWriter.prototype.docType = function(node, options, level) {
      var child, j, len, ref;
      level || (level = 0);
      this.openNode(node, options, level);
      options.state = WriterState.OpenTag;
      this.stream.write(this.indent(node, options, level));
      this.stream.write('<!DOCTYPE ' + node.root().name);
      if (node.pubID && node.sysID) {
        this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
      } else if (node.sysID) {
        this.stream.write(' SYSTEM "' + node.sysID + '"');
      }
      if (node.children.length > 0) {
        this.stream.write(' [');
        this.stream.write(this.endline(node, options, level));
        options.state = WriterState.InsideTag;
        ref = node.children;
        for (j = 0, len = ref.length; j < len; j++) {
          child = ref[j];
          this.writeChildNode(child, options, level + 1);
        }
        options.state = WriterState.CloseTag;
        this.stream.write(']');
      }
      options.state = WriterState.CloseTag;
      this.stream.write(options.spaceBeforeSlash + '>');
      this.stream.write(this.endline(node, options, level));
      options.state = WriterState.None;
      return this.closeNode(node, options, level);
    };

    XMLStreamWriter.prototype.element = function(node, options, level) {
      var att, child, childNodeCount, firstChildNode, j, len, name, prettySuppressed, ref, ref1;
      level || (level = 0);
      this.openNode(node, options, level);
      options.state = WriterState.OpenTag;
      this.stream.write(this.indent(node, options, level) + '<' + node.name);
      ref = node.attribs;
      for (name in ref) {
        if (!hasProp.call(ref, name)) continue;
        att = ref[name];
        this.attribute(att, options, level);
      }
      childNodeCount = node.children.length;
      firstChildNode = childNodeCount === 0 ? null : node.children[0];
      if (childNodeCount === 0 || node.children.every(function(e) {
        return (e.type === NodeType.Text || e.type === NodeType.Raw) && e.value === '';
      })) {
        if (options.allowEmpty) {
          this.stream.write('>');
          options.state = WriterState.CloseTag;
          this.stream.write('</' + node.name + '>');
        } else {
          options.state = WriterState.CloseTag;
          this.stream.write(options.spaceBeforeSlash + '/>');
        }
      } else if (options.pretty && childNodeCount === 1 && (firstChildNode.type === NodeType.Text || firstChildNode.type === NodeType.Raw) && (firstChildNode.value != null)) {
        this.stream.write('>');
        options.state = WriterState.InsideTag;
        options.suppressPrettyCount++;
        prettySuppressed = true;
        this.writeChildNode(firstChildNode, options, level + 1);
        options.suppressPrettyCount--;
        prettySuppressed = false;
        options.state = WriterState.CloseTag;
        this.stream.write('</' + node.name + '>');
      } else {
        this.stream.write('>' + this.endline(node, options, level));
        options.state = WriterState.InsideTag;
        ref1 = node.children;
        for (j = 0, len = ref1.length; j < len; j++) {
          child = ref1[j];
          this.writeChildNode(child, options, level + 1);
        }
        options.state = WriterState.CloseTag;
        this.stream.write(this.indent(node, options, level) + '</' + node.name + '>');
      }
      this.stream.write(this.endline(node, options, level));
      options.state = WriterState.None;
      return this.closeNode(node, options, level);
    };

    XMLStreamWriter.prototype.processingInstruction = function(node, options, level) {
      return this.stream.write(XMLStreamWriter.__super__.processingInstruction.call(this, node, options, level));
    };

    XMLStreamWriter.prototype.raw = function(node, options, level) {
      return this.stream.write(XMLStreamWriter.__super__.raw.call(this, node, options, level));
    };

    XMLStreamWriter.prototype.text = function(node, options, level) {
      return this.stream.write(XMLStreamWriter.__super__.text.call(this, node, options, level));
    };

    XMLStreamWriter.prototype.dtdAttList = function(node, options, level) {
      return this.stream.write(XMLStreamWriter.__super__.dtdAttList.call(this, node, options, level));
    };

    XMLStreamWriter.prototype.dtdElement = function(node, options, level) {
      return this.stream.write(XMLStreamWriter.__super__.dtdElement.call(this, node, options, level));
    };

    XMLStreamWriter.prototype.dtdEntity = function(node, options, level) {
      return this.stream.write(XMLStreamWriter.__super__.dtdEntity.call(this, node, options, level));
    };

    XMLStreamWriter.prototype.dtdNotation = function(node, options, level) {
      return this.stream.write(XMLStreamWriter.__super__.dtdNotation.call(this, node, options, level));
    };

    return XMLStreamWriter;

  })(XMLWriterBase);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLStringWriter.js":
/*!********************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLStringWriter.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLStringWriter, XMLWriterBase,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLWriterBase = __webpack_require__(/*! ./XMLWriterBase */ "./node_modules/xmlbuilder/lib/XMLWriterBase.js");

  module.exports = XMLStringWriter = (function(superClass) {
    extend(XMLStringWriter, superClass);

    function XMLStringWriter(options) {
      XMLStringWriter.__super__.constructor.call(this, options);
    }

    XMLStringWriter.prototype.document = function(doc, options) {
      var child, i, len, r, ref;
      options = this.filterOptions(options);
      r = '';
      ref = doc.children;
      for (i = 0, len = ref.length; i < len; i++) {
        child = ref[i];
        r += this.writeChildNode(child, options, 0);
      }
      if (options.pretty && r.slice(-options.newline.length) === options.newline) {
        r = r.slice(0, -options.newline.length);
      }
      return r;
    };

    return XMLStringWriter;

  })(XMLWriterBase);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLStringifier.js":
/*!*******************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLStringifier.js ***!
  \*******************************************************/
/***/ (function(module) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLStringifier,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    hasProp = {}.hasOwnProperty;

  module.exports = XMLStringifier = (function() {
    function XMLStringifier(options) {
      this.assertLegalName = bind(this.assertLegalName, this);
      this.assertLegalChar = bind(this.assertLegalChar, this);
      var key, ref, value;
      options || (options = {});
      this.options = options;
      if (!this.options.version) {
        this.options.version = '1.0';
      }
      ref = options.stringify || {};
      for (key in ref) {
        if (!hasProp.call(ref, key)) continue;
        value = ref[key];
        this[key] = value;
      }
    }

    XMLStringifier.prototype.name = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      return this.assertLegalName('' + val || '');
    };

    XMLStringifier.prototype.text = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      return this.assertLegalChar(this.textEscape('' + val || ''));
    };

    XMLStringifier.prototype.cdata = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      val = '' + val || '';
      val = val.replace(']]>', ']]]]><![CDATA[>');
      return this.assertLegalChar(val);
    };

    XMLStringifier.prototype.comment = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      val = '' + val || '';
      if (val.match(/--/)) {
        throw new Error("Comment text cannot contain double-hypen: " + val);
      }
      return this.assertLegalChar(val);
    };

    XMLStringifier.prototype.raw = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      return '' + val || '';
    };

    XMLStringifier.prototype.attValue = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      return this.assertLegalChar(this.attEscape(val = '' + val || ''));
    };

    XMLStringifier.prototype.insTarget = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      return this.assertLegalChar('' + val || '');
    };

    XMLStringifier.prototype.insValue = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      val = '' + val || '';
      if (val.match(/\?>/)) {
        throw new Error("Invalid processing instruction value: " + val);
      }
      return this.assertLegalChar(val);
    };

    XMLStringifier.prototype.xmlVersion = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      val = '' + val || '';
      if (!val.match(/1\.[0-9]+/)) {
        throw new Error("Invalid version number: " + val);
      }
      return val;
    };

    XMLStringifier.prototype.xmlEncoding = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      val = '' + val || '';
      if (!val.match(/^[A-Za-z](?:[A-Za-z0-9._-])*$/)) {
        throw new Error("Invalid encoding: " + val);
      }
      return this.assertLegalChar(val);
    };

    XMLStringifier.prototype.xmlStandalone = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      if (val) {
        return "yes";
      } else {
        return "no";
      }
    };

    XMLStringifier.prototype.dtdPubID = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      return this.assertLegalChar('' + val || '');
    };

    XMLStringifier.prototype.dtdSysID = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      return this.assertLegalChar('' + val || '');
    };

    XMLStringifier.prototype.dtdElementValue = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      return this.assertLegalChar('' + val || '');
    };

    XMLStringifier.prototype.dtdAttType = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      return this.assertLegalChar('' + val || '');
    };

    XMLStringifier.prototype.dtdAttDefault = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      return this.assertLegalChar('' + val || '');
    };

    XMLStringifier.prototype.dtdEntityValue = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      return this.assertLegalChar('' + val || '');
    };

    XMLStringifier.prototype.dtdNData = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      return this.assertLegalChar('' + val || '');
    };

    XMLStringifier.prototype.convertAttKey = '@';

    XMLStringifier.prototype.convertPIKey = '?';

    XMLStringifier.prototype.convertTextKey = '#text';

    XMLStringifier.prototype.convertCDataKey = '#cdata';

    XMLStringifier.prototype.convertCommentKey = '#comment';

    XMLStringifier.prototype.convertRawKey = '#raw';

    XMLStringifier.prototype.assertLegalChar = function(str) {
      var regex, res;
      if (this.options.noValidation) {
        return str;
      }
      regex = '';
      if (this.options.version === '1.0') {
        regex = /[\0-\x08\x0B\f\x0E-\x1F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
        if (res = str.match(regex)) {
          throw new Error("Invalid character in string: " + str + " at index " + res.index);
        }
      } else if (this.options.version === '1.1') {
        regex = /[\0\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
        if (res = str.match(regex)) {
          throw new Error("Invalid character in string: " + str + " at index " + res.index);
        }
      }
      return str;
    };

    XMLStringifier.prototype.assertLegalName = function(str) {
      var regex;
      if (this.options.noValidation) {
        return str;
      }
      this.assertLegalChar(str);
      regex = /^([:A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])([\x2D\.0-:A-Z_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*$/;
      if (!str.match(regex)) {
        throw new Error("Invalid character in name");
      }
      return str;
    };

    XMLStringifier.prototype.textEscape = function(str) {
      var ampregex;
      if (this.options.noValidation) {
        return str;
      }
      ampregex = this.options.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
      return str.replace(ampregex, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\r/g, '&#xD;');
    };

    XMLStringifier.prototype.attEscape = function(str) {
      var ampregex;
      if (this.options.noValidation) {
        return str;
      }
      ampregex = this.options.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
      return str.replace(ampregex, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/\t/g, '&#x9;').replace(/\n/g, '&#xA;').replace(/\r/g, '&#xD;');
    };

    return XMLStringifier;

  })();

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLText.js":
/*!************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLText.js ***!
  \************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, XMLCharacterData, XMLText,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  XMLCharacterData = __webpack_require__(/*! ./XMLCharacterData */ "./node_modules/xmlbuilder/lib/XMLCharacterData.js");

  module.exports = XMLText = (function(superClass) {
    extend(XMLText, superClass);

    function XMLText(parent, text) {
      XMLText.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing element text. " + this.debugInfo());
      }
      this.name = "#text";
      this.type = NodeType.Text;
      this.value = this.stringify.text(text);
    }

    Object.defineProperty(XMLText.prototype, 'isElementContentWhitespace', {
      get: function() {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      }
    });

    Object.defineProperty(XMLText.prototype, 'wholeText', {
      get: function() {
        var next, prev, str;
        str = '';
        prev = this.previousSibling;
        while (prev) {
          str = prev.data + str;
          prev = prev.previousSibling;
        }
        str += this.data;
        next = this.nextSibling;
        while (next) {
          str = str + next.data;
          next = next.nextSibling;
        }
        return str;
      }
    });

    XMLText.prototype.clone = function() {
      return Object.create(this);
    };

    XMLText.prototype.toString = function(options) {
      return this.options.writer.text(this, this.options.writer.filterOptions(options));
    };

    XMLText.prototype.splitText = function(offset) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLText.prototype.replaceWholeText = function(content) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    return XMLText;

  })(XMLCharacterData);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLWriterBase.js":
/*!******************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLWriterBase.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, WriterState, XMLCData, XMLComment, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDeclaration, XMLDocType, XMLDummy, XMLElement, XMLProcessingInstruction, XMLRaw, XMLText, XMLWriterBase, assign,
    hasProp = {}.hasOwnProperty;

  assign = (__webpack_require__(/*! ./Utility */ "./node_modules/xmlbuilder/lib/Utility.js").assign);

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  XMLDeclaration = __webpack_require__(/*! ./XMLDeclaration */ "./node_modules/xmlbuilder/lib/XMLDeclaration.js");

  XMLDocType = __webpack_require__(/*! ./XMLDocType */ "./node_modules/xmlbuilder/lib/XMLDocType.js");

  XMLCData = __webpack_require__(/*! ./XMLCData */ "./node_modules/xmlbuilder/lib/XMLCData.js");

  XMLComment = __webpack_require__(/*! ./XMLComment */ "./node_modules/xmlbuilder/lib/XMLComment.js");

  XMLElement = __webpack_require__(/*! ./XMLElement */ "./node_modules/xmlbuilder/lib/XMLElement.js");

  XMLRaw = __webpack_require__(/*! ./XMLRaw */ "./node_modules/xmlbuilder/lib/XMLRaw.js");

  XMLText = __webpack_require__(/*! ./XMLText */ "./node_modules/xmlbuilder/lib/XMLText.js");

  XMLProcessingInstruction = __webpack_require__(/*! ./XMLProcessingInstruction */ "./node_modules/xmlbuilder/lib/XMLProcessingInstruction.js");

  XMLDummy = __webpack_require__(/*! ./XMLDummy */ "./node_modules/xmlbuilder/lib/XMLDummy.js");

  XMLDTDAttList = __webpack_require__(/*! ./XMLDTDAttList */ "./node_modules/xmlbuilder/lib/XMLDTDAttList.js");

  XMLDTDElement = __webpack_require__(/*! ./XMLDTDElement */ "./node_modules/xmlbuilder/lib/XMLDTDElement.js");

  XMLDTDEntity = __webpack_require__(/*! ./XMLDTDEntity */ "./node_modules/xmlbuilder/lib/XMLDTDEntity.js");

  XMLDTDNotation = __webpack_require__(/*! ./XMLDTDNotation */ "./node_modules/xmlbuilder/lib/XMLDTDNotation.js");

  WriterState = __webpack_require__(/*! ./WriterState */ "./node_modules/xmlbuilder/lib/WriterState.js");

  module.exports = XMLWriterBase = (function() {
    function XMLWriterBase(options) {
      var key, ref, value;
      options || (options = {});
      this.options = options;
      ref = options.writer || {};
      for (key in ref) {
        if (!hasProp.call(ref, key)) continue;
        value = ref[key];
        this["_" + key] = this[key];
        this[key] = value;
      }
    }

    XMLWriterBase.prototype.filterOptions = function(options) {
      var filteredOptions, ref, ref1, ref2, ref3, ref4, ref5, ref6;
      options || (options = {});
      options = assign({}, this.options, options);
      filteredOptions = {
        writer: this
      };
      filteredOptions.pretty = options.pretty || false;
      filteredOptions.allowEmpty = options.allowEmpty || false;
      filteredOptions.indent = (ref = options.indent) != null ? ref : '  ';
      filteredOptions.newline = (ref1 = options.newline) != null ? ref1 : '\n';
      filteredOptions.offset = (ref2 = options.offset) != null ? ref2 : 0;
      filteredOptions.dontPrettyTextNodes = (ref3 = (ref4 = options.dontPrettyTextNodes) != null ? ref4 : options.dontprettytextnodes) != null ? ref3 : 0;
      filteredOptions.spaceBeforeSlash = (ref5 = (ref6 = options.spaceBeforeSlash) != null ? ref6 : options.spacebeforeslash) != null ? ref5 : '';
      if (filteredOptions.spaceBeforeSlash === true) {
        filteredOptions.spaceBeforeSlash = ' ';
      }
      filteredOptions.suppressPrettyCount = 0;
      filteredOptions.user = {};
      filteredOptions.state = WriterState.None;
      return filteredOptions;
    };

    XMLWriterBase.prototype.indent = function(node, options, level) {
      var indentLevel;
      if (!options.pretty || options.suppressPrettyCount) {
        return '';
      } else if (options.pretty) {
        indentLevel = (level || 0) + options.offset + 1;
        if (indentLevel > 0) {
          return new Array(indentLevel).join(options.indent);
        }
      }
      return '';
    };

    XMLWriterBase.prototype.endline = function(node, options, level) {
      if (!options.pretty || options.suppressPrettyCount) {
        return '';
      } else {
        return options.newline;
      }
    };

    XMLWriterBase.prototype.attribute = function(att, options, level) {
      var r;
      this.openAttribute(att, options, level);
      r = ' ' + att.name + '="' + att.value + '"';
      this.closeAttribute(att, options, level);
      return r;
    };

    XMLWriterBase.prototype.cdata = function(node, options, level) {
      var r;
      this.openNode(node, options, level);
      options.state = WriterState.OpenTag;
      r = this.indent(node, options, level) + '<![CDATA[';
      options.state = WriterState.InsideTag;
      r += node.value;
      options.state = WriterState.CloseTag;
      r += ']]>' + this.endline(node, options, level);
      options.state = WriterState.None;
      this.closeNode(node, options, level);
      return r;
    };

    XMLWriterBase.prototype.comment = function(node, options, level) {
      var r;
      this.openNode(node, options, level);
      options.state = WriterState.OpenTag;
      r = this.indent(node, options, level) + '<!-- ';
      options.state = WriterState.InsideTag;
      r += node.value;
      options.state = WriterState.CloseTag;
      r += ' -->' + this.endline(node, options, level);
      options.state = WriterState.None;
      this.closeNode(node, options, level);
      return r;
    };

    XMLWriterBase.prototype.declaration = function(node, options, level) {
      var r;
      this.openNode(node, options, level);
      options.state = WriterState.OpenTag;
      r = this.indent(node, options, level) + '<?xml';
      options.state = WriterState.InsideTag;
      r += ' version="' + node.version + '"';
      if (node.encoding != null) {
        r += ' encoding="' + node.encoding + '"';
      }
      if (node.standalone != null) {
        r += ' standalone="' + node.standalone + '"';
      }
      options.state = WriterState.CloseTag;
      r += options.spaceBeforeSlash + '?>';
      r += this.endline(node, options, level);
      options.state = WriterState.None;
      this.closeNode(node, options, level);
      return r;
    };

    XMLWriterBase.prototype.docType = function(node, options, level) {
      var child, i, len, r, ref;
      level || (level = 0);
      this.openNode(node, options, level);
      options.state = WriterState.OpenTag;
      r = this.indent(node, options, level);
      r += '<!DOCTYPE ' + node.root().name;
      if (node.pubID && node.sysID) {
        r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
      } else if (node.sysID) {
        r += ' SYSTEM "' + node.sysID + '"';
      }
      if (node.children.length > 0) {
        r += ' [';
        r += this.endline(node, options, level);
        options.state = WriterState.InsideTag;
        ref = node.children;
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          r += this.writeChildNode(child, options, level + 1);
        }
        options.state = WriterState.CloseTag;
        r += ']';
      }
      options.state = WriterState.CloseTag;
      r += options.spaceBeforeSlash + '>';
      r += this.endline(node, options, level);
      options.state = WriterState.None;
      this.closeNode(node, options, level);
      return r;
    };

    XMLWriterBase.prototype.element = function(node, options, level) {
      var att, child, childNodeCount, firstChildNode, i, j, len, len1, name, prettySuppressed, r, ref, ref1, ref2;
      level || (level = 0);
      prettySuppressed = false;
      r = '';
      this.openNode(node, options, level);
      options.state = WriterState.OpenTag;
      r += this.indent(node, options, level) + '<' + node.name;
      ref = node.attribs;
      for (name in ref) {
        if (!hasProp.call(ref, name)) continue;
        att = ref[name];
        r += this.attribute(att, options, level);
      }
      childNodeCount = node.children.length;
      firstChildNode = childNodeCount === 0 ? null : node.children[0];
      if (childNodeCount === 0 || node.children.every(function(e) {
        return (e.type === NodeType.Text || e.type === NodeType.Raw) && e.value === '';
      })) {
        if (options.allowEmpty) {
          r += '>';
          options.state = WriterState.CloseTag;
          r += '</' + node.name + '>' + this.endline(node, options, level);
        } else {
          options.state = WriterState.CloseTag;
          r += options.spaceBeforeSlash + '/>' + this.endline(node, options, level);
        }
      } else if (options.pretty && childNodeCount === 1 && (firstChildNode.type === NodeType.Text || firstChildNode.type === NodeType.Raw) && (firstChildNode.value != null)) {
        r += '>';
        options.state = WriterState.InsideTag;
        options.suppressPrettyCount++;
        prettySuppressed = true;
        r += this.writeChildNode(firstChildNode, options, level + 1);
        options.suppressPrettyCount--;
        prettySuppressed = false;
        options.state = WriterState.CloseTag;
        r += '</' + node.name + '>' + this.endline(node, options, level);
      } else {
        if (options.dontPrettyTextNodes) {
          ref1 = node.children;
          for (i = 0, len = ref1.length; i < len; i++) {
            child = ref1[i];
            if ((child.type === NodeType.Text || child.type === NodeType.Raw) && (child.value != null)) {
              options.suppressPrettyCount++;
              prettySuppressed = true;
              break;
            }
          }
        }
        r += '>' + this.endline(node, options, level);
        options.state = WriterState.InsideTag;
        ref2 = node.children;
        for (j = 0, len1 = ref2.length; j < len1; j++) {
          child = ref2[j];
          r += this.writeChildNode(child, options, level + 1);
        }
        options.state = WriterState.CloseTag;
        r += this.indent(node, options, level) + '</' + node.name + '>';
        if (prettySuppressed) {
          options.suppressPrettyCount--;
        }
        r += this.endline(node, options, level);
        options.state = WriterState.None;
      }
      this.closeNode(node, options, level);
      return r;
    };

    XMLWriterBase.prototype.writeChildNode = function(node, options, level) {
      switch (node.type) {
        case NodeType.CData:
          return this.cdata(node, options, level);
        case NodeType.Comment:
          return this.comment(node, options, level);
        case NodeType.Element:
          return this.element(node, options, level);
        case NodeType.Raw:
          return this.raw(node, options, level);
        case NodeType.Text:
          return this.text(node, options, level);
        case NodeType.ProcessingInstruction:
          return this.processingInstruction(node, options, level);
        case NodeType.Dummy:
          return '';
        case NodeType.Declaration:
          return this.declaration(node, options, level);
        case NodeType.DocType:
          return this.docType(node, options, level);
        case NodeType.AttributeDeclaration:
          return this.dtdAttList(node, options, level);
        case NodeType.ElementDeclaration:
          return this.dtdElement(node, options, level);
        case NodeType.EntityDeclaration:
          return this.dtdEntity(node, options, level);
        case NodeType.NotationDeclaration:
          return this.dtdNotation(node, options, level);
        default:
          throw new Error("Unknown XML node type: " + node.constructor.name);
      }
    };

    XMLWriterBase.prototype.processingInstruction = function(node, options, level) {
      var r;
      this.openNode(node, options, level);
      options.state = WriterState.OpenTag;
      r = this.indent(node, options, level) + '<?';
      options.state = WriterState.InsideTag;
      r += node.target;
      if (node.value) {
        r += ' ' + node.value;
      }
      options.state = WriterState.CloseTag;
      r += options.spaceBeforeSlash + '?>';
      r += this.endline(node, options, level);
      options.state = WriterState.None;
      this.closeNode(node, options, level);
      return r;
    };

    XMLWriterBase.prototype.raw = function(node, options, level) {
      var r;
      this.openNode(node, options, level);
      options.state = WriterState.OpenTag;
      r = this.indent(node, options, level);
      options.state = WriterState.InsideTag;
      r += node.value;
      options.state = WriterState.CloseTag;
      r += this.endline(node, options, level);
      options.state = WriterState.None;
      this.closeNode(node, options, level);
      return r;
    };

    XMLWriterBase.prototype.text = function(node, options, level) {
      var r;
      this.openNode(node, options, level);
      options.state = WriterState.OpenTag;
      r = this.indent(node, options, level);
      options.state = WriterState.InsideTag;
      r += node.value;
      options.state = WriterState.CloseTag;
      r += this.endline(node, options, level);
      options.state = WriterState.None;
      this.closeNode(node, options, level);
      return r;
    };

    XMLWriterBase.prototype.dtdAttList = function(node, options, level) {
      var r;
      this.openNode(node, options, level);
      options.state = WriterState.OpenTag;
      r = this.indent(node, options, level) + '<!ATTLIST';
      options.state = WriterState.InsideTag;
      r += ' ' + node.elementName + ' ' + node.attributeName + ' ' + node.attributeType;
      if (node.defaultValueType !== '#DEFAULT') {
        r += ' ' + node.defaultValueType;
      }
      if (node.defaultValue) {
        r += ' "' + node.defaultValue + '"';
      }
      options.state = WriterState.CloseTag;
      r += options.spaceBeforeSlash + '>' + this.endline(node, options, level);
      options.state = WriterState.None;
      this.closeNode(node, options, level);
      return r;
    };

    XMLWriterBase.prototype.dtdElement = function(node, options, level) {
      var r;
      this.openNode(node, options, level);
      options.state = WriterState.OpenTag;
      r = this.indent(node, options, level) + '<!ELEMENT';
      options.state = WriterState.InsideTag;
      r += ' ' + node.name + ' ' + node.value;
      options.state = WriterState.CloseTag;
      r += options.spaceBeforeSlash + '>' + this.endline(node, options, level);
      options.state = WriterState.None;
      this.closeNode(node, options, level);
      return r;
    };

    XMLWriterBase.prototype.dtdEntity = function(node, options, level) {
      var r;
      this.openNode(node, options, level);
      options.state = WriterState.OpenTag;
      r = this.indent(node, options, level) + '<!ENTITY';
      options.state = WriterState.InsideTag;
      if (node.pe) {
        r += ' %';
      }
      r += ' ' + node.name;
      if (node.value) {
        r += ' "' + node.value + '"';
      } else {
        if (node.pubID && node.sysID) {
          r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
        } else if (node.sysID) {
          r += ' SYSTEM "' + node.sysID + '"';
        }
        if (node.nData) {
          r += ' NDATA ' + node.nData;
        }
      }
      options.state = WriterState.CloseTag;
      r += options.spaceBeforeSlash + '>' + this.endline(node, options, level);
      options.state = WriterState.None;
      this.closeNode(node, options, level);
      return r;
    };

    XMLWriterBase.prototype.dtdNotation = function(node, options, level) {
      var r;
      this.openNode(node, options, level);
      options.state = WriterState.OpenTag;
      r = this.indent(node, options, level) + '<!NOTATION';
      options.state = WriterState.InsideTag;
      r += ' ' + node.name;
      if (node.pubID && node.sysID) {
        r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
      } else if (node.pubID) {
        r += ' PUBLIC "' + node.pubID + '"';
      } else if (node.sysID) {
        r += ' SYSTEM "' + node.sysID + '"';
      }
      options.state = WriterState.CloseTag;
      r += options.spaceBeforeSlash + '>' + this.endline(node, options, level);
      options.state = WriterState.None;
      this.closeNode(node, options, level);
      return r;
    };

    XMLWriterBase.prototype.openNode = function(node, options, level) {};

    XMLWriterBase.prototype.closeNode = function(node, options, level) {};

    XMLWriterBase.prototype.openAttribute = function(att, options, level) {};

    XMLWriterBase.prototype.closeAttribute = function(att, options, level) {};

    return XMLWriterBase;

  })();

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/index.js":
/*!**********************************************!*\
  !*** ./node_modules/xmlbuilder/lib/index.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, WriterState, XMLDOMImplementation, XMLDocument, XMLDocumentCB, XMLStreamWriter, XMLStringWriter, assign, isFunction, ref;

  ref = __webpack_require__(/*! ./Utility */ "./node_modules/xmlbuilder/lib/Utility.js"), assign = ref.assign, isFunction = ref.isFunction;

  XMLDOMImplementation = __webpack_require__(/*! ./XMLDOMImplementation */ "./node_modules/xmlbuilder/lib/XMLDOMImplementation.js");

  XMLDocument = __webpack_require__(/*! ./XMLDocument */ "./node_modules/xmlbuilder/lib/XMLDocument.js");

  XMLDocumentCB = __webpack_require__(/*! ./XMLDocumentCB */ "./node_modules/xmlbuilder/lib/XMLDocumentCB.js");

  XMLStringWriter = __webpack_require__(/*! ./XMLStringWriter */ "./node_modules/xmlbuilder/lib/XMLStringWriter.js");

  XMLStreamWriter = __webpack_require__(/*! ./XMLStreamWriter */ "./node_modules/xmlbuilder/lib/XMLStreamWriter.js");

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  WriterState = __webpack_require__(/*! ./WriterState */ "./node_modules/xmlbuilder/lib/WriterState.js");

  module.exports.create = function(name, xmldec, doctype, options) {
    var doc, root;
    if (name == null) {
      throw new Error("Root element needs a name.");
    }
    options = assign({}, xmldec, doctype, options);
    doc = new XMLDocument(options);
    root = doc.element(name);
    if (!options.headless) {
      doc.declaration(options);
      if ((options.pubID != null) || (options.sysID != null)) {
        doc.dtd(options);
      }
    }
    return root;
  };

  module.exports.begin = function(options, onData, onEnd) {
    var ref1;
    if (isFunction(options)) {
      ref1 = [options, onData], onData = ref1[0], onEnd = ref1[1];
      options = {};
    }
    if (onData) {
      return new XMLDocumentCB(options, onData, onEnd);
    } else {
      return new XMLDocument(options);
    }
  };

  module.exports.stringWriter = function(options) {
    return new XMLStringWriter(options);
  };

  module.exports.streamWriter = function(stream, options) {
    return new XMLStreamWriter(stream, options);
  };

  module.exports.implementation = new XMLDOMImplementation();

  module.exports.nodeType = NodeType;

  module.exports.writerState = WriterState;

}).call(this);


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./node_modules/webdav/dist/web/index.js":
/*!***********************************************!*\
  !*** ./node_modules/webdav/dist/web/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthType: () => (/* binding */ o),
/* harmony export */   ErrorCode: () => (/* binding */ i),
/* harmony export */   Request: () => (/* binding */ a),
/* harmony export */   Response: () => (/* binding */ s),
/* harmony export */   createClient: () => (/* binding */ u),
/* harmony export */   getPatcher: () => (/* binding */ c),
/* harmony export */   parseStat: () => (/* binding */ l),
/* harmony export */   parseXML: () => (/* binding */ f),
/* harmony export */   processResponsePayload: () => (/* binding */ h),
/* harmony export */   translateDiskSpace: () => (/* binding */ p)
/* harmony export */ });
/*! For license information please see index.js.LICENSE.txt */
var t={584:t=>{function e(t,e,o){t instanceof RegExp&&(t=r(t,o)),e instanceof RegExp&&(e=r(e,o));var i=n(t,e,o);return i&&{start:i[0],end:i[1],pre:o.slice(0,i[0]),body:o.slice(i[0]+t.length,i[1]),post:o.slice(i[1]+e.length)}}function r(t,e){var r=e.match(t);return r?r[0]:null}function n(t,e,r){var n,o,i,a,s,u=r.indexOf(t),c=r.indexOf(e,u+1),l=u;if(u>=0&&c>0){for(n=[],i=r.length;l>=0&&!s;)l==u?(n.push(l),u=r.indexOf(t,l+1)):1==n.length?s=[n.pop(),c]:((o=n.pop())<i&&(i=o,a=c),c=r.indexOf(e,l+1)),l=u<c&&u>=0?u:c;n.length&&(s=[i,a])}return s}t.exports=e,e.range=n},146:function(t,e,r){var n;function o(t){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(t)}t=r.nmd(t),function(i){var a="object"==o(e)&&e,s="object"==o(t)&&t&&t.exports==a&&t,u="object"==("undefined"==typeof global?"undefined":o(global))&&global;u.global!==u&&u.window!==u||(i=u);var c=function(t){this.message=t};(c.prototype=new Error).name="InvalidCharacterError";var l=function(t){throw new c(t)},f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",h=/[\t\n\f\r ]/g,p={encode:function(t){t=String(t),/[^\0-\xFF]/.test(t)&&l("The string to be encoded contains characters outside of the Latin1 range.");for(var e,r,n,o,i=t.length%3,a="",s=-1,u=t.length-i;++s<u;)e=t.charCodeAt(s)<<16,r=t.charCodeAt(++s)<<8,n=t.charCodeAt(++s),a+=f.charAt((o=e+r+n)>>18&63)+f.charAt(o>>12&63)+f.charAt(o>>6&63)+f.charAt(63&o);return 2==i?(e=t.charCodeAt(s)<<8,r=t.charCodeAt(++s),a+=f.charAt((o=e+r)>>10)+f.charAt(o>>4&63)+f.charAt(o<<2&63)+"="):1==i&&(o=t.charCodeAt(s),a+=f.charAt(o>>2)+f.charAt(o<<4&63)+"=="),a},decode:function(t){var e=(t=String(t).replace(h,"")).length;e%4==0&&(e=(t=t.replace(/==?$/,"")).length),(e%4==1||/[^+a-zA-Z0-9/]/.test(t))&&l("Invalid character: the string to be decoded is not correctly encoded.");for(var r,n,o=0,i="",a=-1;++a<e;)n=f.indexOf(t.charAt(a)),r=o%4?64*r+n:n,o++%4&&(i+=String.fromCharCode(255&r>>(-2*o&6)));return i},version:"1.0.0"};if("object"==o(r.amdO)&&r.amdO)void 0===(n=function(){return p}.call(e,r,e,t))||(t.exports=n);else if(a&&!a.nodeType)if(s)s.exports=p;else for(var d in p)p.hasOwnProperty(d)&&(a[d]=p[d]);else i.base64=p}(this)},918:(t,e)=>{e.k=function(t){if(!t)return 0;for(var e=(t=t.toString()).length,r=t.length;r--;){var n=t.charCodeAt(r);56320<=n&&n<=57343&&r--,127<n&&n<=2047?e++:2047<n&&n<=65535&&(e+=2)}return e}},106:t=>{var e={utf8:{stringToBytes:function(t){return e.bin.stringToBytes(unescape(encodeURIComponent(t)))},bytesToString:function(t){return decodeURIComponent(escape(e.bin.bytesToString(t)))}},bin:{stringToBytes:function(t){for(var e=[],r=0;r<t.length;r++)e.push(255&t.charCodeAt(r));return e},bytesToString:function(t){for(var e=[],r=0;r<t.length;r++)e.push(String.fromCharCode(t[r]));return e.join("")}}};t.exports=e},718:t=>{var e,r;e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",r={rotl:function(t,e){return t<<e|t>>>32-e},rotr:function(t,e){return t<<32-e|t>>>e},endian:function(t){if(t.constructor==Number)return 16711935&r.rotl(t,8)|4278255360&r.rotl(t,24);for(var e=0;e<t.length;e++)t[e]=r.endian(t[e]);return t},randomBytes:function(t){for(var e=[];t>0;t--)e.push(Math.floor(256*Math.random()));return e},bytesToWords:function(t){for(var e=[],r=0,n=0;r<t.length;r++,n+=8)e[n>>>5]|=t[r]<<24-n%32;return e},wordsToBytes:function(t){for(var e=[],r=0;r<32*t.length;r+=8)e.push(t[r>>>5]>>>24-r%32&255);return e},bytesToHex:function(t){for(var e=[],r=0;r<t.length;r++)e.push((t[r]>>>4).toString(16)),e.push((15&t[r]).toString(16));return e.join("")},hexToBytes:function(t){for(var e=[],r=0;r<t.length;r+=2)e.push(parseInt(t.substr(r,2),16));return e},bytesToBase64:function(t){for(var r=[],n=0;n<t.length;n+=3)for(var o=t[n]<<16|t[n+1]<<8|t[n+2],i=0;i<4;i++)8*n+6*i<=8*t.length?r.push(e.charAt(o>>>6*(3-i)&63)):r.push("=");return r.join("")},base64ToBytes:function(t){t=t.replace(/[^A-Z0-9+\/]/gi,"");for(var r=[],n=0,o=0;n<t.length;o=++n%4)0!=o&&r.push((e.indexOf(t.charAt(n-1))&Math.pow(2,-2*o+8)-1)<<2*o|e.indexOf(t.charAt(n))>>>6-2*o);return r}},t.exports=r},5:(t,e,r)=>{var n=r(135),o=r(586),i=r(39);t.exports={XMLParser:o,XMLValidator:n,XMLBuilder:i}},410:(t,e)=>{var r=":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",n="["+r+"]["+r+"\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*",o=new RegExp("^"+n+"$");e.isExist=function(t){return void 0!==t},e.isEmptyObject=function(t){return 0===Object.keys(t).length},e.merge=function(t,e,r){if(e)for(var n=Object.keys(e),o=n.length,i=0;i<o;i++)t[n[i]]="strict"===r?[e[n[i]]]:e[n[i]]},e.getValue=function(t){return e.isExist(t)?t:""},e.isName=function(t){return!(null==o.exec(t))},e.getAllMatches=function(t,e){for(var r=[],n=e.exec(t);n;){var o=[];o.startIndex=e.lastIndex-n[0].length;for(var i=n.length,a=0;a<i;a++)o.push(n[a]);r.push(o),n=e.exec(t)}return r},e.nameRegexp=n},135:(t,e,r)=>{var n=r(410),o={allowBooleanAttributes:!1,unpairedTags:[]};function i(t){return" "===t||"\t"===t||"\n"===t||"\r"===t}function a(t,e){for(var r=e;e<t.length;e++)if("?"!=t[e]&&" "!=t[e]);else{var n=t.substr(r,e-r);if(e>5&&"xml"===n)return d("InvalidXml","XML declaration allowed only at the start of the document.",v(t,e));if("?"==t[e]&&">"==t[e+1]){e++;break}}return e}function s(t,e){if(t.length>e+5&&"-"===t[e+1]&&"-"===t[e+2]){for(e+=3;e<t.length;e++)if("-"===t[e]&&"-"===t[e+1]&&">"===t[e+2]){e+=2;break}}else if(t.length>e+8&&"D"===t[e+1]&&"O"===t[e+2]&&"C"===t[e+3]&&"T"===t[e+4]&&"Y"===t[e+5]&&"P"===t[e+6]&&"E"===t[e+7]){var r=1;for(e+=8;e<t.length;e++)if("<"===t[e])r++;else if(">"===t[e]&&0==--r)break}else if(t.length>e+9&&"["===t[e+1]&&"C"===t[e+2]&&"D"===t[e+3]&&"A"===t[e+4]&&"T"===t[e+5]&&"A"===t[e+6]&&"["===t[e+7])for(e+=8;e<t.length;e++)if("]"===t[e]&&"]"===t[e+1]&&">"===t[e+2]){e+=2;break}return e}e.validate=function(t,e){e=Object.assign({},o,e);var r,u=[],c=!1,f=!1;"\ufeff"===t[0]&&(t=t.substr(1));for(var g=0;g<t.length;g++)if("<"===t[g]&&"?"===t[g+1]){if((g=a(t,g+=2)).err)return g}else{if("<"!==t[g]){if(i(t[g]))continue;return d("InvalidChar","char '"+t[g]+"' is not expected.",v(t,g))}var y=g;if("!"===t[++g]){g=s(t,g);continue}var m=!1;"/"===t[g]&&(m=!0,g++);for(var b="";g<t.length&&">"!==t[g]&&" "!==t[g]&&"\t"!==t[g]&&"\n"!==t[g]&&"\r"!==t[g];g++)b+=t[g];if("/"===(b=b.trim())[b.length-1]&&(b=b.substring(0,b.length-1),g--),r=b,!n.isName(r))return d("InvalidTag",0===b.trim().length?"Invalid space after '<'.":"Tag '"+b+"' is an invalid name.",v(t,g));var w=l(t,g);if(!1===w)return d("InvalidAttr","Attributes for '"+b+"' have open quote.",v(t,g));var x=w.value;if(g=w.index,"/"===x[x.length-1]){var O=g-x.length,A=h(x=x.substring(0,x.length-1),e);if(!0!==A)return d(A.err.code,A.err.msg,v(t,O+A.err.line));c=!0}else if(m){if(!w.tagClosed)return d("InvalidTag","Closing tag '"+b+"' doesn't have proper closing.",v(t,g));if(x.trim().length>0)return d("InvalidTag","Closing tag '"+b+"' can't have attributes or invalid starting.",v(t,y));var j=u.pop();if(b!==j.tagName){var P=v(t,j.tagStartPos);return d("InvalidTag","Expected closing tag '"+j.tagName+"' (opened in line "+P.line+", col "+P.col+") instead of closing tag '"+b+"'.",v(t,y))}0==u.length&&(f=!0)}else{var S=h(x,e);if(!0!==S)return d(S.err.code,S.err.msg,v(t,g-x.length+S.err.line));if(!0===f)return d("InvalidXml","Multiple possible root nodes found.",v(t,g));-1!==e.unpairedTags.indexOf(b)||u.push({tagName:b,tagStartPos:y}),c=!0}for(g++;g<t.length;g++)if("<"===t[g]){if("!"===t[g+1]){g=s(t,++g);continue}if("?"!==t[g+1])break;if((g=a(t,++g)).err)return g}else if("&"===t[g]){var E=p(t,g);if(-1==E)return d("InvalidChar","char '&' is not expected.",v(t,g));g=E}else if(!0===f&&!i(t[g]))return d("InvalidXml","Extra text at the end",v(t,g));"<"===t[g]&&g--}return c?1==u.length?d("InvalidTag","Unclosed tag '"+u[0].tagName+"'.",v(t,u[0].tagStartPos)):!(u.length>0)||d("InvalidXml","Invalid '"+JSON.stringify(u.map((function(t){return t.tagName})),null,4).replace(/\r?\n/g,"")+"' found.",{line:1,col:1}):d("InvalidXml","Start tag expected.",1)};var u='"',c="'";function l(t,e){for(var r="",n="",o=!1;e<t.length;e++){if(t[e]===u||t[e]===c)""===n?n=t[e]:n!==t[e]||(n="");else if(">"===t[e]&&""===n){o=!0;break}r+=t[e]}return""===n&&{value:r,index:e,tagClosed:o}}var f=new RegExp("(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['\"])(([\\s\\S])*?)\\5)?","g");function h(t,e){for(var r=n.getAllMatches(t,f),o={},i=0;i<r.length;i++){if(0===r[i][1].length)return d("InvalidAttr","Attribute '"+r[i][2]+"' has no space in starting.",y(r[i]));if(void 0!==r[i][3]&&void 0===r[i][4])return d("InvalidAttr","Attribute '"+r[i][2]+"' is without value.",y(r[i]));if(void 0===r[i][3]&&!e.allowBooleanAttributes)return d("InvalidAttr","boolean attribute '"+r[i][2]+"' is not allowed.",y(r[i]));var a=r[i][2];if(!g(a))return d("InvalidAttr","Attribute '"+a+"' is an invalid name.",y(r[i]));if(o.hasOwnProperty(a))return d("InvalidAttr","Attribute '"+a+"' is repeated.",y(r[i]));o[a]=1}return!0}function p(t,e){if(";"===t[++e])return-1;if("#"===t[e])return function(t,e){var r=/\d/;for("x"===t[e]&&(e++,r=/[\da-fA-F]/);e<t.length;e++){if(";"===t[e])return e;if(!t[e].match(r))break}return-1}(t,++e);for(var r=0;e<t.length;e++,r++)if(!(t[e].match(/\w/)&&r<20)){if(";"===t[e])break;return-1}return e}function d(t,e,r){return{err:{code:t,msg:e,line:r.line||r,col:r.col}}}function g(t){return n.isName(t)}function v(t,e){var r=t.substring(0,e).split(/\r?\n/);return{line:r.length,col:r[r.length-1].length+1}}function y(t){return t.startIndex+t[1].length}},39:(t,e,r)=>{function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}var o=r(354),i={attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,cdataPropName:!1,format:!1,indentBy:"  ",suppressEmptyNode:!1,suppressUnpairedNode:!0,suppressBooleanAttributes:!0,tagValueProcessor:function(t,e){return e},attributeValueProcessor:function(t,e){return e},preserveOrder:!1,commentPropName:!1,unpairedTags:[],entities:[{regex:new RegExp("&","g"),val:"&amp;"},{regex:new RegExp(">","g"),val:"&gt;"},{regex:new RegExp("<","g"),val:"&lt;"},{regex:new RegExp("'","g"),val:"&apos;"},{regex:new RegExp('"',"g"),val:"&quot;"}],processEntities:!0,stopNodes:[],oneListGroup:!1};function a(t){this.options=Object.assign({},i,t),this.options.ignoreAttributes||this.options.attributesGroupName?this.isAttribute=function(){return!1}:(this.attrPrefixLen=this.options.attributeNamePrefix.length,this.isAttribute=c),this.processTextOrObjNode=s,this.options.format?(this.indentate=u,this.tagEndChar=">\n",this.newLine="\n"):(this.indentate=function(){return""},this.tagEndChar=">",this.newLine="")}function s(t,e,r){var n=this.j2x(t,r+1);return void 0!==t[this.options.textNodeName]&&1===Object.keys(t).length?this.buildTextValNode(t[this.options.textNodeName],e,n.attrStr,r):this.buildObjectNode(n.val,e,n.attrStr,r)}function u(t){return this.options.indentBy.repeat(t)}function c(t){return!(!t.startsWith(this.options.attributeNamePrefix)||t===this.options.textNodeName)&&t.substr(this.attrPrefixLen)}a.prototype.build=function(t){return this.options.preserveOrder?o(t,this.options):(Array.isArray(t)&&this.options.arrayNodeName&&this.options.arrayNodeName.length>1&&(e={},n=t,(r=this.options.arrayNodeName)in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,t=e),this.j2x(t,0).val);var e,r,n},a.prototype.j2x=function(t,e){var r="",o="";for(var i in t)if(void 0===t[i])this.isAttribute(i)&&(o+="");else if(null===t[i])this.isAttribute(i)?o+="":"?"===i[0]?o+=this.indentate(e)+"<"+i+"?"+this.tagEndChar:o+=this.indentate(e)+"<"+i+"/"+this.tagEndChar;else if(t[i]instanceof Date)o+=this.buildTextValNode(t[i],i,"",e);else if("object"!==n(t[i])){var a=this.isAttribute(i);if(a)r+=this.buildAttrPairStr(a,""+t[i]);else if(i===this.options.textNodeName){var s=this.options.tagValueProcessor(i,""+t[i]);o+=this.replaceEntitiesValue(s)}else o+=this.buildTextValNode(t[i],i,"",e)}else if(Array.isArray(t[i])){for(var u=t[i].length,c="",l=0;l<u;l++){var f=t[i][l];void 0===f||(null===f?"?"===i[0]?o+=this.indentate(e)+"<"+i+"?"+this.tagEndChar:o+=this.indentate(e)+"<"+i+"/"+this.tagEndChar:"object"===n(f)?this.options.oneListGroup?c+=this.j2x(f,e+1).val:c+=this.processTextOrObjNode(f,i,e):c+=this.buildTextValNode(f,i,"",e))}this.options.oneListGroup&&(c=this.buildObjectNode(c,i,"",e)),o+=c}else if(this.options.attributesGroupName&&i===this.options.attributesGroupName)for(var h=Object.keys(t[i]),p=h.length,d=0;d<p;d++)r+=this.buildAttrPairStr(h[d],""+t[i][h[d]]);else o+=this.processTextOrObjNode(t[i],i,e);return{attrStr:r,val:o}},a.prototype.buildAttrPairStr=function(t,e){return e=this.options.attributeValueProcessor(t,""+e),e=this.replaceEntitiesValue(e),this.options.suppressBooleanAttributes&&"true"===e?" "+t:" "+t+'="'+e+'"'},a.prototype.buildObjectNode=function(t,e,r,n){if(""===t)return"?"===e[0]?this.indentate(n)+"<"+e+r+"?"+this.tagEndChar:this.indentate(n)+"<"+e+r+this.closeTag(e)+this.tagEndChar;var o="</"+e+this.tagEndChar,i="";return"?"===e[0]&&(i="?",o=""),!r&&""!==r||-1!==t.indexOf("<")?!1!==this.options.commentPropName&&e===this.options.commentPropName&&0===i.length?this.indentate(n)+"\x3c!--".concat(t,"--\x3e")+this.newLine:this.indentate(n)+"<"+e+r+i+this.tagEndChar+t+this.indentate(n)+o:this.indentate(n)+"<"+e+r+i+">"+t+o},a.prototype.closeTag=function(t){var e="";return-1!==this.options.unpairedTags.indexOf(t)?this.options.suppressUnpairedNode||(e="/"):e=this.options.suppressEmptyNode?"/":"></".concat(t),e},a.prototype.buildTextValNode=function(t,e,r,n){if(!1!==this.options.cdataPropName&&e===this.options.cdataPropName)return this.indentate(n)+"<![CDATA[".concat(t,"]]>")+this.newLine;if(!1!==this.options.commentPropName&&e===this.options.commentPropName)return this.indentate(n)+"\x3c!--".concat(t,"--\x3e")+this.newLine;if("?"===e[0])return this.indentate(n)+"<"+e+r+"?"+this.tagEndChar;var o=this.options.tagValueProcessor(e,t);return""===(o=this.replaceEntitiesValue(o))?this.indentate(n)+"<"+e+r+this.closeTag(e)+this.tagEndChar:this.indentate(n)+"<"+e+r+">"+o+"</"+e+this.tagEndChar},a.prototype.replaceEntitiesValue=function(t){if(t&&t.length>0&&this.options.processEntities)for(var e=0;e<this.options.entities.length;e++){var r=this.options.entities[e];t=t.replace(r.regex,r.val)}return t},t.exports=a},354:t=>{function e(t,a,s,u){for(var c="",l=!1,f=0;f<t.length;f++){var h,p=t[f],d=r(p);if(h=0===s.length?d:"".concat(s,".").concat(d),d!==a.textNodeName)if(d!==a.cdataPropName)if(d!==a.commentPropName)if("?"!==d[0]){var g=u;""!==g&&(g+=a.indentBy);var v=n(p[":@"],a),y=u+"<".concat(d).concat(v),m=e(p[d],a,h,g);-1!==a.unpairedTags.indexOf(d)?a.suppressUnpairedNode?c+=y+">":c+=y+"/>":m&&0!==m.length||!a.suppressEmptyNode?m&&m.endsWith(">")?c+=y+">".concat(m).concat(u,"</").concat(d,">"):(c+=y+">",m&&""!==u&&(m.includes("/>")||m.includes("</"))?c+=u+a.indentBy+m+u:c+=m,c+="</".concat(d,">")):c+=y+"/>",l=!0}else{var b=n(p[":@"],a),w="?xml"===d?"":u,x=p[d][0][a.textNodeName];x=0!==x.length?" "+x:"",c+=w+"<".concat(d).concat(x).concat(b,"?>"),l=!0}else c+=u+"\x3c!--".concat(p[d][0][a.textNodeName],"--\x3e"),l=!0;else l&&(c+=u),c+="<![CDATA[".concat(p[d][0][a.textNodeName],"]]>"),l=!1;else{var O=p[d];o(h,a)||(O=i(O=a.tagValueProcessor(d,O),a)),l&&(c+=u),c+=O,l=!1}}return c}function r(t){for(var e=Object.keys(t),r=0;r<e.length;r++){var n=e[r];if(":@"!==n)return n}}function n(t,e){var r="";if(t&&!e.ignoreAttributes)for(var n in t){var o=e.attributeValueProcessor(n,t[n]);!0===(o=i(o,e))&&e.suppressBooleanAttributes?r+=" ".concat(n.substr(e.attributeNamePrefix.length)):r+=" ".concat(n.substr(e.attributeNamePrefix.length),'="').concat(o,'"')}return r}function o(t,e){var r=(t=t.substr(0,t.length-e.textNodeName.length-1)).substr(t.lastIndexOf(".")+1);for(var n in e.stopNodes)if(e.stopNodes[n]===t||e.stopNodes[n]==="*."+r)return!0;return!1}function i(t,e){if(t&&t.length>0&&e.processEntities)for(var r=0;r<e.entities.length;r++){var n=e.entities[r];t=t.replace(n.regex,n.val)}return t}t.exports=function(t,r){var n="";return r.format&&r.indentBy.length>0&&(n="\n"),e(t,r,"",n)}},895:(t,e,r)=>{function n(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i=[],a=!0,s=!1;try{for(r=r.call(t);!(a=(n=r.next()).done)&&(i.push(n.value),!e||i.length!==e);a=!0);}catch(t){s=!0,o=t}finally{try{a||null==r.return||r.return()}finally{if(s)throw o}}return i}}(t,e)||function(t,e){if(t){if("string"==typeof t)return o(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?o(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var i=r(410);function a(t,e){for(var r="";e<t.length&&"'"!==t[e]&&'"'!==t[e];e++)r+=t[e];if(-1!==(r=r.trim()).indexOf(" "))throw new Error("External entites are not supported");for(var n=t[e++],o="";e<t.length&&t[e]!==n;e++)o+=t[e];return[r,o,e]}function s(t,e){return"!"===t[e+1]&&"-"===t[e+2]&&"-"===t[e+3]}function u(t,e){return"!"===t[e+1]&&"E"===t[e+2]&&"N"===t[e+3]&&"T"===t[e+4]&&"I"===t[e+5]&&"T"===t[e+6]&&"Y"===t[e+7]}function c(t,e){return"!"===t[e+1]&&"E"===t[e+2]&&"L"===t[e+3]&&"E"===t[e+4]&&"M"===t[e+5]&&"E"===t[e+6]&&"N"===t[e+7]&&"T"===t[e+8]}function l(t,e){return"!"===t[e+1]&&"A"===t[e+2]&&"T"===t[e+3]&&"T"===t[e+4]&&"L"===t[e+5]&&"I"===t[e+6]&&"S"===t[e+7]&&"T"===t[e+8]}function f(t,e){return"!"===t[e+1]&&"N"===t[e+2]&&"O"===t[e+3]&&"T"===t[e+4]&&"A"===t[e+5]&&"T"===t[e+6]&&"I"===t[e+7]&&"O"===t[e+8]&&"N"===t[e+9]}function h(t){if(i.isName(t))return t;throw new Error("Invalid entity name ".concat(t))}t.exports=function(t,e){var r={};if("O"!==t[e+3]||"C"!==t[e+4]||"T"!==t[e+5]||"Y"!==t[e+6]||"P"!==t[e+7]||"E"!==t[e+8])throw new Error("Invalid Tag instead of DOCTYPE");e+=9;for(var o=1,i=!1,p=!1;e<t.length;e++)if("<"!==t[e]||p)if(">"===t[e]){if(p?"-"===t[e-1]&&"-"===t[e-2]&&(p=!1,o--):o--,0===o)break}else"["===t[e]?i=!0:t[e];else{if(i&&u(t,e)){var d=n(a(t,(e+=7)+1),3);entityName=d[0],val=d[1],e=d[2],-1===val.indexOf("&")&&(r[h(entityName)]={regx:RegExp("&".concat(entityName,";"),"g"),val})}else if(i&&c(t,e))e+=8;else if(i&&l(t,e))e+=8;else if(i&&f(t,e))e+=9;else{if(!s)throw new Error("Invalid DOCTYPE");p=!0}o++}if(0!==o)throw new Error("Unclosed DOCTYPE");return{entities:r,i:e}}},282:(t,e)=>{var r={preserveOrder:!1,attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,removeNSPrefix:!1,allowBooleanAttributes:!1,parseTagValue:!0,parseAttributeValue:!1,trimValues:!0,cdataPropName:!1,numberParseOptions:{hex:!0,leadingZeros:!0,eNotation:!0},tagValueProcessor:function(t,e){return e},attributeValueProcessor:function(t,e){return e},stopNodes:[],alwaysCreateTextNode:!1,isArray:function(){return!1},commentPropName:!1,unpairedTags:[],processEntities:!0,htmlEntities:!1,ignoreDeclaration:!1,ignorePiTags:!1,transformTagName:!1,transformAttributeName:!1,updateTag:function(t,e,r){return t}};e.buildOptions=function(t){return Object.assign({},r,t)},e.defaultOptions=r},502:(t,e,r)=>{function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function o(t){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(t)}function i(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function a(t,e,r){return e&&i(t.prototype,e),r&&i(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}var s=r(410),u=r(961),c=r(895),l=r(512),f=("<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)".replace(/NAME/g,s.nameRegexp),a((function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.options=e,this.currentNode=null,this.tagsNodeStack=[],this.docTypeEntities={},this.lastEntities={apos:{regex:/&(apos|#39|#x27);/g,val:"'"},gt:{regex:/&(gt|#62|#x3E);/g,val:">"},lt:{regex:/&(lt|#60|#x3C);/g,val:"<"},quot:{regex:/&(quot|#34|#x22);/g,val:'"'}},this.ampEntity={regex:/&(amp|#38|#x26);/g,val:"&"},this.htmlEntities={space:{regex:/&(nbsp|#160);/g,val:" "},cent:{regex:/&(cent|#162);/g,val:"¢"},pound:{regex:/&(pound|#163);/g,val:"£"},yen:{regex:/&(yen|#165);/g,val:"¥"},euro:{regex:/&(euro|#8364);/g,val:"€"},copyright:{regex:/&(copy|#169);/g,val:"©"},reg:{regex:/&(reg|#174);/g,val:"®"},inr:{regex:/&(inr|#8377);/g,val:"₹"}},this.addExternalEntities=h,this.parseXml=y,this.parseTextData=p,this.resolveNameSpace=d,this.buildAttributesMap=v,this.isItStopNode=x,this.replaceEntitiesValue=b,this.readStopNodeData=j,this.saveTextToParentTag=w,this.addChild=m})));function h(t){for(var e=Object.keys(t),r=0;r<e.length;r++){var n=e[r];this.lastEntities[n]={regex:new RegExp("&"+n+";","g"),val:t[n]}}}function p(t,e,r,n,i,a,s){if(void 0!==t&&(this.options.trimValues&&!n&&(t=t.trim()),t.length>0)){s||(t=this.replaceEntitiesValue(t));var u=this.options.tagValueProcessor(e,t,r,i,a);return null==u?t:o(u)!==o(t)||u!==t?u:this.options.trimValues||t.trim()===t?P(t,this.options.parseTagValue,this.options.numberParseOptions):t}}function d(t){if(this.options.removeNSPrefix){var e=t.split(":"),r="/"===t.charAt(0)?"/":"";if("xmlns"===e[0])return"";2===e.length&&(t=r+e[1])}return t}var g=new RegExp("([^\\s=]+)\\s*(=\\s*(['\"])([\\s\\S]*?)\\3)?","gm");function v(t,e,r){if(!this.options.ignoreAttributes&&"string"==typeof t){for(var n=s.getAllMatches(t,g),i=n.length,a={},u=0;u<i;u++){var c=this.resolveNameSpace(n[u][1]),l=n[u][4],f=this.options.attributeNamePrefix+c;if(c.length)if(this.options.transformAttributeName&&(f=this.options.transformAttributeName(f)),"__proto__"===f&&(f="#__proto__"),void 0!==l){this.options.trimValues&&(l=l.trim()),l=this.replaceEntitiesValue(l);var h=this.options.attributeValueProcessor(c,l,e);null==h?a[f]=l:o(h)!==o(l)||h!==l?a[f]=h:a[f]=P(l,this.options.parseAttributeValue,this.options.numberParseOptions)}else this.options.allowBooleanAttributes&&(a[f]=!0)}if(!Object.keys(a).length)return;if(this.options.attributesGroupName){var p={};return p[this.options.attributesGroupName]=a,p}return a}}var y=function(t){t=t.replace(/\r\n?/g,"\n");for(var e=new u("!xml"),r=e,o="",i="",a=0;a<t.length;a++)if("<"===t[a])if("/"===t[a+1]){var s=O(t,">",a,"Closing Tag is not closed."),l=t.substring(a+2,s).trim();if(this.options.removeNSPrefix){var f=l.indexOf(":");-1!==f&&(l=l.substr(f+1))}this.options.transformTagName&&(l=this.options.transformTagName(l)),r&&(o=this.saveTextToParentTag(o,r,i));var h=i.substring(i.lastIndexOf(".")+1);if(l&&-1!==this.options.unpairedTags.indexOf(l))throw new Error("Unpaired tag can not be used as closing tag: </".concat(l,">"));var p=0;h&&-1!==this.options.unpairedTags.indexOf(h)?(p=i.lastIndexOf(".",i.lastIndexOf(".")-1),this.tagsNodeStack.pop()):p=i.lastIndexOf("."),i=i.substring(0,p),r=this.tagsNodeStack.pop(),o="",a=s}else if("?"===t[a+1]){var d=A(t,a,!1,"?>");if(!d)throw new Error("Pi Tag is not closed.");if(o=this.saveTextToParentTag(o,r,i),this.options.ignoreDeclaration&&"?xml"===d.tagName||this.options.ignorePiTags);else{var g=new u(d.tagName);g.add(this.options.textNodeName,""),d.tagName!==d.tagExp&&d.attrExpPresent&&(g[":@"]=this.buildAttributesMap(d.tagExp,i,d.tagName)),this.addChild(r,g,i)}a=d.closeIndex+1}else if("!--"===t.substr(a+1,3)){var v=O(t,"--\x3e",a+4,"Comment is not closed.");if(this.options.commentPropName){var y=t.substring(a+4,v-2);o=this.saveTextToParentTag(o,r,i),r.add(this.options.commentPropName,[n({},this.options.textNodeName,y)])}a=v}else if("!D"===t.substr(a+1,2)){var m=c(t,a);this.docTypeEntities=m.entities,a=m.i}else if("!["===t.substr(a+1,2)){var b=O(t,"]]>",a,"CDATA is not closed.")-2,w=t.substring(a+9,b);if(o=this.saveTextToParentTag(o,r,i),this.options.cdataPropName)r.add(this.options.cdataPropName,[n({},this.options.textNodeName,w)]);else{var x=this.parseTextData(w,r.tagname,i,!0,!1,!0);null==x&&(x=""),r.add(this.options.textNodeName,x)}a=b+2}else{var j=A(t,a,this.options.removeNSPrefix),P=j.tagName,S=j.tagExp,E=j.attrExpPresent,N=j.closeIndex;this.options.transformTagName&&(P=this.options.transformTagName(P)),r&&o&&"!xml"!==r.tagname&&(o=this.saveTextToParentTag(o,r,i,!1));var T=r;if(T&&-1!==this.options.unpairedTags.indexOf(T.tagname)&&(r=this.tagsNodeStack.pop(),i=i.substring(0,i.lastIndexOf("."))),P!==e.tagname&&(i+=i?"."+P:P),this.isItStopNode(this.options.stopNodes,i,P)){var k="";if(S.length>0&&S.lastIndexOf("/")===S.length-1)a=j.closeIndex;else if(-1!==this.options.unpairedTags.indexOf(P))a=j.closeIndex;else{var C=this.readStopNodeData(t,P,N+1);if(!C)throw new Error("Unexpected end of ".concat(P));a=C.i,k=C.tagContent}var I=new u(P);P!==S&&E&&(I[":@"]=this.buildAttributesMap(S,i,P)),k&&(k=this.parseTextData(k,P,i,!0,E,!0,!0)),i=i.substr(0,i.lastIndexOf(".")),I.add(this.options.textNodeName,k),this.addChild(r,I,i)}else{if(S.length>0&&S.lastIndexOf("/")===S.length-1){"/"===P[P.length-1]?(P=P.substr(0,P.length-1),i=i.substr(0,i.length-1),S=P):S=S.substr(0,S.length-1),this.options.transformTagName&&(P=this.options.transformTagName(P));var _=new u(P);P!==S&&E&&(_[":@"]=this.buildAttributesMap(S,i,P)),this.addChild(r,_,i),i=i.substr(0,i.lastIndexOf("."))}else{var R=new u(P);this.tagsNodeStack.push(r),P!==S&&E&&(R[":@"]=this.buildAttributesMap(S,i,P)),this.addChild(r,R,i),r=R}o="",a=N}}else o+=t[a];return e.child};function m(t,e,r){var n=this.options.updateTag(e.tagname,r,e[":@"]);!1===n||("string"==typeof n?(e.tagname=n,t.addChild(e)):t.addChild(e))}var b=function(t){if(this.options.processEntities){for(var e in this.docTypeEntities){var r=this.docTypeEntities[e];t=t.replace(r.regx,r.val)}for(var n in this.lastEntities){var o=this.lastEntities[n];t=t.replace(o.regex,o.val)}if(this.options.htmlEntities)for(var i in this.htmlEntities){var a=this.htmlEntities[i];t=t.replace(a.regex,a.val)}t=t.replace(this.ampEntity.regex,this.ampEntity.val)}return t};function w(t,e,r,n){return t&&(void 0===n&&(n=0===Object.keys(e.child).length),void 0!==(t=this.parseTextData(t,e.tagname,r,!1,!!e[":@"]&&0!==Object.keys(e[":@"]).length,n))&&""!==t&&e.add(this.options.textNodeName,t),t=""),t}function x(t,e,r){var n="*."+r;for(var o in t){var i=t[o];if(n===i||e===i)return!0}return!1}function O(t,e,r,n){var o=t.indexOf(e,r);if(-1===o)throw new Error(n);return o+e.length-1}function A(t,e,r){var n=function(t,e){for(var r,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:">",o="",i=e;i<t.length;i++){var a=t[i];if(r)a===r&&(r="");else if('"'===a||"'"===a)r=a;else if(a===n[0]){if(!n[1])return{data:o,index:i};if(t[i+1]===n[1])return{data:o,index:i}}else"\t"===a&&(a=" ");o+=a}}(t,e+1,arguments.length>3&&void 0!==arguments[3]?arguments[3]:">");if(n){var o=n.data,i=n.index,a=o.search(/\s/),s=o,u=!0;if(-1!==a&&(s=o.substr(0,a).replace(/\s\s*$/,""),o=o.substr(a+1)),r){var c=s.indexOf(":");-1!==c&&(u=(s=s.substr(c+1))!==n.data.substr(c+1))}return{tagName:s,tagExp:o,closeIndex:i,attrExpPresent:u}}}function j(t,e,r){for(var n=r,o=1;r<t.length;r++)if("<"===t[r])if("/"===t[r+1]){var i=O(t,">",r,"".concat(e," is not closed"));if(t.substring(r+2,i).trim()===e&&0==--o)return{tagContent:t.substring(n,r),i};r=i}else if("?"===t[r+1])r=O(t,"?>",r+1,"StopNode is not closed.");else if("!--"===t.substr(r+1,3))r=O(t,"--\x3e",r+3,"StopNode is not closed.");else if("!["===t.substr(r+1,2))r=O(t,"]]>",r,"StopNode is not closed.")-2;else{var a=A(t,r,">");a&&((a&&a.tagName)===e&&"/"!==a.tagExp[a.tagExp.length-1]&&o++,r=a.closeIndex)}}function P(t,e,r){if(e&&"string"==typeof t){var n=t.trim();return"true"===n||"false"!==n&&l(t,r)}return s.isExist(t)?t:""}t.exports=f},586:(t,e,r)=>{function n(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var o=r(282).buildOptions,i=r(502),a=r(869).prettify,s=r(135),u=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.externalEntities={},this.options=o(e)}var e,r;return e=t,(r=[{key:"parse",value:function(t,e){if("string"==typeof t);else{if(!t.toString)throw new Error("XML data is accepted in String or Bytes[] form.");t=t.toString()}if(e){!0===e&&(e={});var r=s.validate(t,e);if(!0!==r)throw Error("".concat(r.err.msg,":").concat(r.err.line,":").concat(r.err.col))}var n=new i(this.options);n.addExternalEntities(this.externalEntities);var o=n.parseXml(t);return this.options.preserveOrder||void 0===o?o:a(o,this.options)}},{key:"addEntity",value:function(t,e){if(-1!==e.indexOf("&"))throw new Error("Entity value can't have '&'");if(-1!==t.indexOf("&")||-1!==t.indexOf(";"))throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");if("&"===e)throw new Error("An entity with value '&' is not permitted");this.externalEntities[t]=e}}])&&n(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();t.exports=u},869:(t,e)=>{function r(t,e,a){for(var s,u={},c=0;c<t.length;c++){var l,f=t[c],h=n(f);if(l=void 0===a?h:a+"."+h,h===e.textNodeName)void 0===s?s=f[h]:s+=""+f[h];else{if(void 0===h)continue;if(f[h]){var p=r(f[h],e,l),d=i(p,e);f[":@"]?o(p,f[":@"],l,e):1!==Object.keys(p).length||void 0===p[e.textNodeName]||e.alwaysCreateTextNode?0===Object.keys(p).length&&(e.alwaysCreateTextNode?p[e.textNodeName]="":p=""):p=p[e.textNodeName],void 0!==u[h]&&u.hasOwnProperty(h)?(Array.isArray(u[h])||(u[h]=[u[h]]),u[h].push(p)):e.isArray(h,l,d)?u[h]=[p]:u[h]=p}}}return"string"==typeof s?s.length>0&&(u[e.textNodeName]=s):void 0!==s&&(u[e.textNodeName]=s),u}function n(t){for(var e=Object.keys(t),r=0;r<e.length;r++){var n=e[r];if(":@"!==n)return n}}function o(t,e,r,n){if(e)for(var o=Object.keys(e),i=o.length,a=0;a<i;a++){var s=o[a];n.isArray(s,r+"."+s,!0,!0)?t[s]=[e[s]]:t[s]=e[s]}}function i(t,e){var r=e.textNodeName,n=Object.keys(t).length;return 0===n||!(1!==n||!t[r]&&"boolean"!=typeof t[r]&&0!==t[r])}e.prettify=function(t,e){return r(t,e)}},961:t=>{function e(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function r(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var n=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.tagname=e,this.child=[],this[":@"]={}}var n,o;return n=t,(o=[{key:"add",value:function(t,r){"__proto__"===t&&(t="#__proto__"),this.child.push(e({},t,r))}},{key:"addChild",value:function(t){var r;"__proto__"===t.tagname&&(t.tagname="#__proto__"),t[":@"]&&Object.keys(t[":@"]).length>0?this.child.push((e(r={},t.tagname,t.child),e(r,":@",t[":@"]),r)):this.child.push(e({},t.tagname,t.child))}}])&&r(n.prototype,o),Object.defineProperty(n,"prototype",{writable:!1}),t}();t.exports=n},163:t=>{function e(t){return!!t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}t.exports=function(t){return null!=t&&(e(t)||function(t){return"function"==typeof t.readFloatLE&&"function"==typeof t.slice&&e(t.slice(0,0))}(t)||!!t._isBuffer)}},243:(t,e,r)=>{var n,o,i,a,s;n=r(718),o=r(106).utf8,i=r(163),a=r(106).bin,(s=function t(e,r){e.constructor==String?e=r&&"binary"===r.encoding?a.stringToBytes(e):o.stringToBytes(e):i(e)?e=Array.prototype.slice.call(e,0):Array.isArray(e)||e.constructor===Uint8Array||(e=e.toString());for(var s=n.bytesToWords(e),u=8*e.length,c=1732584193,l=-271733879,f=-1732584194,h=271733878,p=0;p<s.length;p++)s[p]=16711935&(s[p]<<8|s[p]>>>24)|4278255360&(s[p]<<24|s[p]>>>8);s[u>>>5]|=128<<u%32,s[14+(u+64>>>9<<4)]=u;var d=t._ff,g=t._gg,v=t._hh,y=t._ii;for(p=0;p<s.length;p+=16){var m=c,b=l,w=f,x=h;c=d(c,l,f,h,s[p+0],7,-680876936),h=d(h,c,l,f,s[p+1],12,-389564586),f=d(f,h,c,l,s[p+2],17,606105819),l=d(l,f,h,c,s[p+3],22,-1044525330),c=d(c,l,f,h,s[p+4],7,-176418897),h=d(h,c,l,f,s[p+5],12,1200080426),f=d(f,h,c,l,s[p+6],17,-1473231341),l=d(l,f,h,c,s[p+7],22,-45705983),c=d(c,l,f,h,s[p+8],7,1770035416),h=d(h,c,l,f,s[p+9],12,-1958414417),f=d(f,h,c,l,s[p+10],17,-42063),l=d(l,f,h,c,s[p+11],22,-1990404162),c=d(c,l,f,h,s[p+12],7,1804603682),h=d(h,c,l,f,s[p+13],12,-40341101),f=d(f,h,c,l,s[p+14],17,-1502002290),c=g(c,l=d(l,f,h,c,s[p+15],22,1236535329),f,h,s[p+1],5,-165796510),h=g(h,c,l,f,s[p+6],9,-1069501632),f=g(f,h,c,l,s[p+11],14,643717713),l=g(l,f,h,c,s[p+0],20,-373897302),c=g(c,l,f,h,s[p+5],5,-701558691),h=g(h,c,l,f,s[p+10],9,38016083),f=g(f,h,c,l,s[p+15],14,-660478335),l=g(l,f,h,c,s[p+4],20,-405537848),c=g(c,l,f,h,s[p+9],5,568446438),h=g(h,c,l,f,s[p+14],9,-1019803690),f=g(f,h,c,l,s[p+3],14,-187363961),l=g(l,f,h,c,s[p+8],20,1163531501),c=g(c,l,f,h,s[p+13],5,-1444681467),h=g(h,c,l,f,s[p+2],9,-51403784),f=g(f,h,c,l,s[p+7],14,1735328473),c=v(c,l=g(l,f,h,c,s[p+12],20,-1926607734),f,h,s[p+5],4,-378558),h=v(h,c,l,f,s[p+8],11,-2022574463),f=v(f,h,c,l,s[p+11],16,1839030562),l=v(l,f,h,c,s[p+14],23,-35309556),c=v(c,l,f,h,s[p+1],4,-1530992060),h=v(h,c,l,f,s[p+4],11,1272893353),f=v(f,h,c,l,s[p+7],16,-155497632),l=v(l,f,h,c,s[p+10],23,-1094730640),c=v(c,l,f,h,s[p+13],4,681279174),h=v(h,c,l,f,s[p+0],11,-358537222),f=v(f,h,c,l,s[p+3],16,-722521979),l=v(l,f,h,c,s[p+6],23,76029189),c=v(c,l,f,h,s[p+9],4,-640364487),h=v(h,c,l,f,s[p+12],11,-421815835),f=v(f,h,c,l,s[p+15],16,530742520),c=y(c,l=v(l,f,h,c,s[p+2],23,-995338651),f,h,s[p+0],6,-198630844),h=y(h,c,l,f,s[p+7],10,1126891415),f=y(f,h,c,l,s[p+14],15,-1416354905),l=y(l,f,h,c,s[p+5],21,-57434055),c=y(c,l,f,h,s[p+12],6,1700485571),h=y(h,c,l,f,s[p+3],10,-1894986606),f=y(f,h,c,l,s[p+10],15,-1051523),l=y(l,f,h,c,s[p+1],21,-2054922799),c=y(c,l,f,h,s[p+8],6,1873313359),h=y(h,c,l,f,s[p+15],10,-30611744),f=y(f,h,c,l,s[p+6],15,-1560198380),l=y(l,f,h,c,s[p+13],21,1309151649),c=y(c,l,f,h,s[p+4],6,-145523070),h=y(h,c,l,f,s[p+11],10,-1120210379),f=y(f,h,c,l,s[p+2],15,718787259),l=y(l,f,h,c,s[p+9],21,-343485551),c=c+m>>>0,l=l+b>>>0,f=f+w>>>0,h=h+x>>>0}return n.endian([c,l,f,h])})._ff=function(t,e,r,n,o,i,a){var s=t+(e&r|~e&n)+(o>>>0)+a;return(s<<i|s>>>32-i)+e},s._gg=function(t,e,r,n,o,i,a){var s=t+(e&n|r&~n)+(o>>>0)+a;return(s<<i|s>>>32-i)+e},s._hh=function(t,e,r,n,o,i,a){var s=t+(e^r^n)+(o>>>0)+a;return(s<<i|s>>>32-i)+e},s._ii=function(t,e,r,n,o,i,a){var s=t+(r^(e|~n))+(o>>>0)+a;return(s<<i|s>>>32-i)+e},s._blocksize=16,s._digestsize=16,t.exports=function(t,e){if(null==t)throw new Error("Illegal argument "+t);var r=n.wordsToBytes(s(t,e));return e&&e.asBytes?r:e&&e.asString?a.bytesToString(r):n.bytesToHex(r)}},637:(t,e,r)=>{var n=r(584);t.exports=function(t){return t?("{}"===t.substr(0,2)&&(t="\\{\\}"+t.substr(2)),v(function(t){return t.split("\\\\").join(o).split("\\{").join(i).split("\\}").join(a).split("\\,").join(s).split("\\.").join(u)}(t),!0).map(l)):[]};var o="\0SLASH"+Math.random()+"\0",i="\0OPEN"+Math.random()+"\0",a="\0CLOSE"+Math.random()+"\0",s="\0COMMA"+Math.random()+"\0",u="\0PERIOD"+Math.random()+"\0";function c(t){return parseInt(t,10)==t?parseInt(t,10):t.charCodeAt(0)}function l(t){return t.split(o).join("\\").split(i).join("{").split(a).join("}").split(s).join(",").split(u).join(".")}function f(t){if(!t)return[""];var e=[],r=n("{","}",t);if(!r)return t.split(",");var o=r.pre,i=r.body,a=r.post,s=o.split(",");s[s.length-1]+="{"+i+"}";var u=f(a);return a.length&&(s[s.length-1]+=u.shift(),s.push.apply(s,u)),e.push.apply(e,s),e}function h(t){return"{"+t+"}"}function p(t){return/^-?0\d/.test(t)}function d(t,e){return t<=e}function g(t,e){return t>=e}function v(t,e){var r=[],o=n("{","}",t);if(!o)return[t];var i=o.pre,s=o.post.length?v(o.post,!1):[""];if(/\$$/.test(o.pre))for(var u=0;u<s.length;u++){var l=i+"{"+o.body+"}"+s[u];r.push(l)}else{var y,m,b=/^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(o.body),w=/^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(o.body),x=b||w,O=o.body.indexOf(",")>=0;if(!x&&!O)return o.post.match(/,.*\}/)?v(t=o.pre+"{"+o.body+a+o.post):[t];if(x)y=o.body.split(/\.\./);else if(1===(y=f(o.body)).length&&1===(y=v(y[0],!1).map(h)).length)return s.map((function(t){return o.pre+y[0]+t}));if(x){var A=c(y[0]),j=c(y[1]),P=Math.max(y[0].length,y[1].length),S=3==y.length?Math.abs(c(y[2])):1,E=d;j<A&&(S*=-1,E=g);var N=y.some(p);m=[];for(var T=A;E(T,j);T+=S){var k;if(w)"\\"===(k=String.fromCharCode(T))&&(k="");else if(k=String(T),N){var C=P-k.length;if(C>0){var I=new Array(C+1).join("0");k=T<0?"-"+I+k.slice(1):I+k}}m.push(k)}}else{m=[];for(var _=0;_<y.length;_++)m.push.apply(m,v(y[_],!1))}for(_=0;_<m.length;_++)for(u=0;u<s.length;u++)l=i+m[_]+s[u],(!e||x||l)&&r.push(l)}return r}},421:t=>{function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e(t)}function r(t){var e="function"==typeof Map?new Map:void 0;return r=function(t){if(null===t||(r=t,-1===Function.toString.call(r).indexOf("[native code]")))return t;var r;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,a)}function a(){return n(t,arguments,i(this).constructor)}return a.prototype=Object.create(t.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),o(a,t)},r(t)}function n(t,e,r){return n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}()?Reflect.construct:function(t,e,r){var n=[null];n.push.apply(n,e);var i=new(Function.bind.apply(t,n));return r&&o(i,r.prototype),i},n.apply(null,arguments)}function o(t,e){return o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},o(t,e)}function i(t){return i=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},i(t)}var a="+",s=function(t){function r(t){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,r),(n=function(t,r){return!r||"object"!==e(r)&&"function"!=typeof r?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):r}(this,i(r).call(this,t))).name="ObjectPrototypeMutationError",n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&o(t,e)}(r,t),r}(r(Error));function u(t,r){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){},o=r.split("."),i=o.length,s=function(e){var r=o[e];if(!t)return{v:void 0};if(r===a){if(Array.isArray(t))return{v:t.map((function(r,i){var a=o.slice(e+1);return a.length>0?u(r,a.join("."),n):n(t,i,o,e)}))};var i=o.slice(0,e).join(".");throw new Error("Object at wildcard (".concat(i,") is not an array"))}t=n(t,r,o,e)},c=0;c<i;c++){var l=s(c);if("object"===e(l))return l.v}return t}function c(t,e){return t.length===e+1}t.exports={set:function(t,r,n){if("object"!=e(t)||null===t)return t;if(void 0===r)return t;if("number"==typeof r)return t[r]=n,t[r];try{return u(t,r,(function(t,e,r,o){if(t===Reflect.getPrototypeOf({}))throw new s("Attempting to mutate Object.prototype");if(!t[e]){var i=Number.isInteger(Number(r[o+1])),u=r[o+1]===a;t[e]=i||u?[]:{}}return c(r,o)&&(t[e]=n),t[e]}))}catch(e){if(e instanceof s)throw e;return t}},get:function(t,r){if("object"!=e(t)||null===t)return t;if(void 0===r)return t;if("number"==typeof r)return t[r];try{return u(t,r,(function(t,e){return t[e]}))}catch(e){return t}},has:function(t,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if("object"!=e(t)||null===t)return!1;if(void 0===r)return!1;if("number"==typeof r)return r in t;try{var o=!1;return u(t,r,(function(t,e,r,i){if(!c(r,i))return t&&t[e];o=n.own?t.hasOwnProperty(e):e in t})),o}catch(t){return!1}},hasOwn:function(t,e,r){return this.has(t,e,r||{own:!0})},isIn:function(t,r,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};if("object"!=e(t)||null===t)return!1;if(void 0===r)return!1;try{var i=!1,a=!1;return u(t,r,(function(t,r,o,s){return i=i||t===n||!!t&&t[r]===n,a=c(o,s)&&"object"===e(t)&&r in t,t&&t[r]})),o.validPath?i&&a:i}catch(t){return!1}},ObjectPrototypeMutationError:s}},441:(t,e,r)=>{function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}var o=r(930),i=function(t){return"string"==typeof t};function a(t,e){for(var r=[],n=0;n<t.length;n++){var o=t[n];o&&"."!==o&&(".."===o?r.length&&".."!==r[r.length-1]?r.pop():e&&r.push(".."):r.push(o))}return r}var s=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,u={};function c(t){return s.exec(t).slice(1)}u.resolve=function(){for(var t="",e=!1,r=arguments.length-1;r>=-1&&!e;r--){var n=r>=0?arguments[r]:process.cwd();if(!i(n))throw new TypeError("Arguments to path.resolve must be strings");n&&(t=n+"/"+t,e="/"===n.charAt(0))}return(e?"/":"")+(t=a(t.split("/"),!e).join("/"))||"."},u.normalize=function(t){var e=u.isAbsolute(t),r="/"===t.substr(-1);return(t=a(t.split("/"),!e).join("/"))||e||(t="."),t&&r&&(t+="/"),(e?"/":"")+t},u.isAbsolute=function(t){return"/"===t.charAt(0)},u.join=function(){for(var t="",e=0;e<arguments.length;e++){var r=arguments[e];if(!i(r))throw new TypeError("Arguments to path.join must be strings");r&&(t+=t?"/"+r:r)}return u.normalize(t)},u.relative=function(t,e){function r(t){for(var e=0;e<t.length&&""===t[e];e++);for(var r=t.length-1;r>=0&&""===t[r];r--);return e>r?[]:t.slice(e,r+1)}t=u.resolve(t).substr(1),e=u.resolve(e).substr(1);for(var n=r(t.split("/")),o=r(e.split("/")),i=Math.min(n.length,o.length),a=i,s=0;s<i;s++)if(n[s]!==o[s]){a=s;break}var c=[];for(s=a;s<n.length;s++)c.push("..");return(c=c.concat(o.slice(a))).join("/")},u._makeLong=function(t){return t},u.dirname=function(t){var e=c(t),r=e[0],n=e[1];return r||n?(n&&(n=n.substr(0,n.length-1)),r+n):"."},u.basename=function(t,e){var r=c(t)[2];return e&&r.substr(-1*e.length)===e&&(r=r.substr(0,r.length-e.length)),r},u.extname=function(t){return c(t)[3]},u.format=function(t){if(!o.isObject(t))throw new TypeError("Parameter 'pathObject' must be an object, not "+n(t));var e=t.root||"";if(!i(e))throw new TypeError("'pathObject.root' must be a string or undefined, not "+n(t.root));return(t.dir?t.dir+u.sep:"")+(t.base||"")},u.parse=function(t){if(!i(t))throw new TypeError("Parameter 'pathString' must be a string, not "+n(t));var e=c(t);if(!e||4!==e.length)throw new TypeError("Invalid path '"+t+"'");return e[1]=e[1]||"",e[2]=e[2]||"",e[3]=e[3]||"",{root:e[0],dir:e[0]+e[1].slice(0,e[1].length-1),base:e[2],ext:e[3],name:e[2].slice(0,e[2].length-e[3].length)}},u.sep="/",u.delimiter=":",t.exports=u},361:(t,e)=>{var r=Object.prototype.hasOwnProperty;function n(t){try{return decodeURIComponent(t.replace(/\+/g," "))}catch(t){return null}}function o(t){try{return encodeURIComponent(t)}catch(t){return null}}e.stringify=function(t,e){e=e||"";var n,i,a=[];for(i in"string"!=typeof e&&(e="?"),t)if(r.call(t,i)){if((n=t[i])||null!=n&&!isNaN(n)||(n=""),i=o(i),n=o(n),null===i||null===n)continue;a.push(i+"="+n)}return a.length?e+a.join("&"):""},e.parse=function(t){for(var e,r=/([^=?#&]+)=?([^&]*)/g,o={};e=r.exec(t);){var i=n(e[1]),a=n(e[2]);null===i||null===a||i in o||(o[i]=a)}return o}},620:t=>{t.exports=function(t,e){if(e=e.split(":")[0],!(t=+t))return!1;switch(e){case"http":case"ws":return 80!==t;case"https":case"wss":return 443!==t;case"ftp":return 21!==t;case"gopher":return 70!==t;case"file":return!1}return 0!==t}},512:t=>{var e=/^[-+]?0x[a-fA-F0-9]+$/,r=/^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;!Number.parseInt&&window.parseInt&&(Number.parseInt=window.parseInt),!Number.parseFloat&&window.parseFloat&&(Number.parseFloat=window.parseFloat);var n={hex:!0,leadingZeros:!0,decimalPoint:".",eNotation:!0};t.exports=function(t){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(o=Object.assign({},n,o),!t||"string"!=typeof t)return t;var i=t.trim();if(void 0!==o.skipLike&&o.skipLike.test(i))return t;if(o.hex&&e.test(i))return Number.parseInt(i,16);var a=r.exec(i);if(a){var s=a[1],u=a[2],c=function(t){return t&&-1!==t.indexOf(".")?("."===(t=t.replace(/0+$/,""))?t="0":"."===t[0]?t="0"+t:"."===t[t.length-1]&&(t=t.substr(0,t.length-1)),t):t}(a[3]),l=a[4]||a[6];if(!o.leadingZeros&&u.length>0&&s&&"."!==i[2])return t;if(!o.leadingZeros&&u.length>0&&!s&&"."!==i[1])return t;var f=Number(i),h=""+f;return-1!==h.search(/[eE]/)||l?o.eNotation?f:t:-1!==i.indexOf(".")?"0"===h&&""===c||h===c||s&&h==="-"+c?f:t:u?c===h||s+c===h?f:t:i===h||i===s+h?f:t}return t}},95:(t,e,r)=>{function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}var o=r(620),i=r(361),a=/^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/,s=/[\n\r\t]/g,u=/^[A-Za-z][A-Za-z0-9+-.]*:\/\//,c=/:\d+$/,l=/^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i,f=/^[a-zA-Z]:/;function h(t){return(t||"").toString().replace(a,"")}var p=[["#","hash"],["?","query"],function(t,e){return v(e.protocol)?t.replace(/\\/g,"/"):t},["/","pathname"],["@","auth",1],[NaN,"host",void 0,1,1],[/:(\d*)$/,"port",void 0,1],[NaN,"hostname",void 0,1,1]],d={hash:1,query:1};function g(t){var e,r=("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{}).location||{},o={},i=n(t=t||r);if("blob:"===t.protocol)o=new m(unescape(t.pathname),{});else if("string"===i)for(e in o=new m(t,{}),d)delete o[e];else if("object"===i){for(e in t)e in d||(o[e]=t[e]);void 0===o.slashes&&(o.slashes=u.test(t.href))}return o}function v(t){return"file:"===t||"ftp:"===t||"http:"===t||"https:"===t||"ws:"===t||"wss:"===t}function y(t,e){t=(t=h(t)).replace(s,""),e=e||{};var r,n=l.exec(t),o=n[1]?n[1].toLowerCase():"",i=!!n[2],a=!!n[3],u=0;return i?a?(r=n[2]+n[3]+n[4],u=n[2].length+n[3].length):(r=n[2]+n[4],u=n[2].length):a?(r=n[3]+n[4],u=n[3].length):r=n[4],"file:"===o?u>=2&&(r=r.slice(2)):v(o)?r=n[4]:o?i&&(r=r.slice(2)):u>=2&&v(e.protocol)&&(r=n[4]),{protocol:o,slashes:i||v(o),slashesCount:u,rest:r}}function m(t,e,r){if(t=(t=h(t)).replace(s,""),!(this instanceof m))return new m(t,e,r);var a,u,c,l,d,b,w=p.slice(),x=n(e),O=this,A=0;for("object"!==x&&"string"!==x&&(r=e,e=null),r&&"function"!=typeof r&&(r=i.parse),a=!(u=y(t||"",e=g(e))).protocol&&!u.slashes,O.slashes=u.slashes||a&&e.slashes,O.protocol=u.protocol||e.protocol||"",t=u.rest,("file:"===u.protocol&&(2!==u.slashesCount||f.test(t))||!u.slashes&&(u.protocol||u.slashesCount<2||!v(O.protocol)))&&(w[3]=[/(.*)/,"pathname"]);A<w.length;A++)"function"!=typeof(l=w[A])?(c=l[0],b=l[1],c!=c?O[b]=t:"string"==typeof c?~(d="@"===c?t.lastIndexOf(c):t.indexOf(c))&&("number"==typeof l[2]?(O[b]=t.slice(0,d),t=t.slice(d+l[2])):(O[b]=t.slice(d),t=t.slice(0,d))):(d=c.exec(t))&&(O[b]=d[1],t=t.slice(0,d.index)),O[b]=O[b]||a&&l[3]&&e[b]||"",l[4]&&(O[b]=O[b].toLowerCase())):t=l(t,O);r&&(O.query=r(O.query)),a&&e.slashes&&"/"!==O.pathname.charAt(0)&&(""!==O.pathname||""!==e.pathname)&&(O.pathname=function(t,e){if(""===t)return e;for(var r=(e||"/").split("/").slice(0,-1).concat(t.split("/")),n=r.length,o=r[n-1],i=!1,a=0;n--;)"."===r[n]?r.splice(n,1):".."===r[n]?(r.splice(n,1),a++):a&&(0===n&&(i=!0),r.splice(n,1),a--);return i&&r.unshift(""),"."!==o&&".."!==o||r.push(""),r.join("/")}(O.pathname,e.pathname)),"/"!==O.pathname.charAt(0)&&v(O.protocol)&&(O.pathname="/"+O.pathname),o(O.port,O.protocol)||(O.host=O.hostname,O.port=""),O.username=O.password="",O.auth&&(~(d=O.auth.indexOf(":"))?(O.username=O.auth.slice(0,d),O.username=encodeURIComponent(decodeURIComponent(O.username)),O.password=O.auth.slice(d+1),O.password=encodeURIComponent(decodeURIComponent(O.password))):O.username=encodeURIComponent(decodeURIComponent(O.auth)),O.auth=O.password?O.username+":"+O.password:O.username),O.origin="file:"!==O.protocol&&v(O.protocol)&&O.host?O.protocol+"//"+O.host:"null",O.href=O.toString()}m.prototype={set:function(t,e,r){var n=this;switch(t){case"query":"string"==typeof e&&e.length&&(e=(r||i.parse)(e)),n[t]=e;break;case"port":n[t]=e,o(e,n.protocol)?e&&(n.host=n.hostname+":"+e):(n.host=n.hostname,n[t]="");break;case"hostname":n[t]=e,n.port&&(e+=":"+n.port),n.host=e;break;case"host":n[t]=e,c.test(e)?(e=e.split(":"),n.port=e.pop(),n.hostname=e.join(":")):(n.hostname=e,n.port="");break;case"protocol":n.protocol=e.toLowerCase(),n.slashes=!r;break;case"pathname":case"hash":if(e){var a="pathname"===t?"/":"#";n[t]=e.charAt(0)!==a?a+e:e}else n[t]=e;break;case"username":case"password":n[t]=encodeURIComponent(e);break;case"auth":var s=e.indexOf(":");~s?(n.username=e.slice(0,s),n.username=encodeURIComponent(decodeURIComponent(n.username)),n.password=e.slice(s+1),n.password=encodeURIComponent(decodeURIComponent(n.password))):n.username=encodeURIComponent(decodeURIComponent(e))}for(var u=0;u<p.length;u++){var l=p[u];l[4]&&(n[l[1]]=n[l[1]].toLowerCase())}return n.auth=n.password?n.username+":"+n.password:n.username,n.origin="file:"!==n.protocol&&v(n.protocol)&&n.host?n.protocol+"//"+n.host:"null",n.href=n.toString(),n},toString:function(t){t&&"function"==typeof t||(t=i.stringify);var e,r=this,o=r.host,a=r.protocol;a&&":"!==a.charAt(a.length-1)&&(a+=":");var s=a+(r.protocol&&r.slashes||v(r.protocol)?"//":"");return r.username?(s+=r.username,r.password&&(s+=":"+r.password),s+="@"):r.password?(s+=":"+r.password,s+="@"):"file:"!==r.protocol&&v(r.protocol)&&!o&&"/"!==r.pathname&&(s+="@"),(":"===o[o.length-1]||c.test(r.hostname)&&!r.port)&&(o+=":"),s+=o+r.pathname,(e="object"===n(r.query)?t(r.query):r.query)&&(s+="?"!==e.charAt(0)?"?"+e:e),r.hash&&(s+=r.hash),s}},m.extractProtocol=y,m.location=g,m.trimLeft=h,m.qs=i,t.exports=m},930:()=>{},227:()=>{},347:()=>{},724:()=>{}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={id:n,loaded:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.loaded=!0,i.exports}r.amdO={},r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.nmd=t=>(t.paths=[],t.children||(t.children=[]),t);var n={};(()=>{r.d(n,{Gr:()=>I,jK:()=>_,cf:()=>M,HM:()=>U,eI:()=>Pr,lD:()=>G,yY:()=>Ee,sw:()=>Pe,np:()=>ve,_M:()=>Ne});var t=r(95),e=r.n(t);function o(t){if(!i(t))throw new Error("Parameter was not an error")}function i(t){return"[object Error]"===(e=t,Object.prototype.toString.call(e))||t instanceof Error;var e}function a(t){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}function s(t){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s(t)}function u(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function c(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function l(t){var e="function"==typeof Map?new Map:void 0;return l=function(t){if(null===t||(r=t,-1===Function.toString.call(r).indexOf("[native code]")))return t;var r;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,n)}function n(){return f(t,arguments,d(this).constructor)}return n.prototype=Object.create(t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),p(n,t)},l(t)}function f(t,e,r){return f=h()?Reflect.construct.bind():function(t,e,r){var n=[null];n.push.apply(n,e);var o=new(Function.bind.apply(t,n));return r&&p(o,r.prototype),o},f.apply(null,arguments)}function h(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function p(t,e){return p=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},p(t,e)}function d(t){return d=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},d(t)}var g=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&p(t,e)}(v,t);var e,r,n,l,f,g=(l=v,f=h(),function(){var t,e=d(l);if(f){var r=d(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===s(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return c(t)}(this,t)});function v(t,e){var r;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,v);var n=function(t){var e,r="";if(0===t.length)e={};else if(i(t[0]))e={cause:t[0]},r=t.slice(1).join(" ")||"";else if(t[0]&&"object"===a(t[0]))e=Object.assign({},t[0]),r=t.slice(1).join(" ")||"";else{if("string"!=typeof t[0])throw new Error("Invalid arguments passed to Layerr");e={},r=r=t.join(" ")||""}return{options:e,shortMessage:r}}(Array.prototype.slice.call(arguments)),o=n.options,u=n.shortMessage;if(o.cause&&(u="".concat(u,": ").concat(o.cause.message)),(r=g.call(this,u)).message=u,o.name&&"string"==typeof o.name?r.name=o.name:r.name="Layerr",o.cause&&Object.defineProperty(c(r),"_cause",{value:o.cause}),Object.defineProperty(c(r),"_info",{value:{}}),o.info&&"object"===s(o.info)&&Object.assign(r._info,o.info),Error.captureStackTrace){var l=o.constructorOpt||r.constructor;Error.captureStackTrace(c(r),l)}return r}return e=v,n=[{key:"cause",value:function(t){return o(t),t._cause&&i(t._cause)?t._cause:null}},{key:"fullStack",value:function(t){o(t);var e=v.cause(t);return e?"".concat(t.stack,"\ncaused by: ").concat(v.fullStack(e)):t.stack}},{key:"info",value:function(t){o(t);var e={},r=v.cause(t);return r&&Object.assign(e,v.info(r)),t._info&&Object.assign(e,t._info),e}}],(r=[{key:"cause",value:function(){return v.cause(this)}},{key:"toString",value:function(){var t=this.name||this.constructor.name||this.constructor.prototype.name;return this.message&&(t="".concat(t,": ").concat(this.message)),t}}])&&u(e.prototype,r),n&&u(e,n),Object.defineProperty(e,"prototype",{writable:!1}),v}(l(Error));function v(t){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},v(t)}var y=r(441),m=r.n(y),b="__PATH_SEPARATOR_POSIX__",w="__PATH_SEPARATOR_WINDOWS__";function x(t){try{var e=t.replace(/\//g,b).replace(/\\\\/g,w);return encodeURIComponent(e).split(w).join("\\\\").split(b).join("/")}catch(t){throw new g(t,"Failed encoding path")}}function O(t){return t.startsWith("/")?t:"/"+t}function A(t){var e=t;return"/"!==e[0]&&(e="/"+e),/^.+\/$/.test(e)&&(e=e.substr(0,e.length-1)),e}function j(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return function(){return function(t){var e=[];if(0===t.length)return"";if("string"!=typeof t[0])throw new TypeError("Url must be a string. Received "+t[0]);if(t[0].match(/^[^/:]+:\/*$/)&&t.length>1){var r=t.shift();t[0]=r+t[0]}t[0].match(/^file:\/\/\//)?t[0]=t[0].replace(/^([^/:]+):\/*/,"$1:///"):t[0]=t[0].replace(/^([^/:]+):\/*/,"$1://");for(var n=0;n<t.length;n++){var o=t[n];if("string"!=typeof o)throw new TypeError("Url must be a string. Received "+o);""!==o&&(n>0&&(o=o.replace(/^[\/]+/,"")),o=n<t.length-1?o.replace(/[\/]+$/,""):o.replace(/[\/]+$/,"/"),e.push(o))}var i=e.join("/"),a=(i=i.replace(/\/(\?|&|#[^!])/g,"$1")).split("?");return a.shift()+(a.length>0?"?":"")+a.join("&")}("object"===v(arguments[0])?arguments[0]:[].slice.call(arguments))}(e.reduce((function(t,e,r){return(0===r||"/"!==e||"/"===e&&"/"!==t[t.length-1])&&t.push(e),t}),[]))}var P=r(243),S=r.n(P),E="abcdef0123456789";function N(t,e){var r=t.url.replace("//",""),n=-1==r.indexOf("/")?"/":r.slice(r.indexOf("/")),o=t.method?t.method.toUpperCase():"GET",i=!!/(^|,)\s*auth\s*($|,)/.test(e.qop)&&"auth",a="00000000".concat(e.nc).slice(-8),s=function(t,e,r,n,o,i,a){var s=a||S()("".concat(e,":").concat(r,":").concat(n));return t&&"md5-sess"===t.toLowerCase()?S()("".concat(s,":").concat(o,":").concat(i)):s}(e.algorithm,e.username,e.realm,e.password,e.nonce,e.cnonce,e.ha1),u=S()("".concat(o,":").concat(n)),c=i?S()("".concat(s,":").concat(e.nonce,":").concat(a,":").concat(e.cnonce,":").concat(i,":").concat(u)):S()("".concat(s,":").concat(e.nonce,":").concat(u)),l={username:e.username,realm:e.realm,nonce:e.nonce,uri:n,qop:i,response:c,nc:a,cnonce:e.cnonce,algorithm:e.algorithm,opaque:e.opaque},f=[];for(var h in l)l[h]&&("qop"===h||"nc"===h||"algorithm"===h?f.push("".concat(h,"=").concat(l[h])):f.push("".concat(h,'="').concat(l[h],'"')));return"Digest ".concat(f.join(", "))}var T=r(146),k=r.n(T);function C(t){return k().decode(t)}var I,_,R="undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:"undefined"!=typeof window?window:globalThis,L=R.fetch.bind(R),M=(R.Headers,R.Request),U=R.Response;function D(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];if(0===e.length)throw new Error("Failed creating sequence: No functions provided");return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];for(var o=r;e.length>0;)o=[e.shift().apply(this,o)];return o[0]}}function F(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function $(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}!function(t){t.Digest="digest",t.None="none",t.Password="password",t.Token="token"}(I||(I={})),function(t){t.DataTypeNoLength="data-type-no-length",t.InvalidAuthType="invalid-auth-type",t.InvalidOutputFormat="invalid-output-format",t.LinkUnsupportedAuthType="link-unsupported-auth"}(_||(_={})),r(724);var B="@@HOTPATCHER",W=function(){};function V(t){return{original:t,methods:[t],final:!1}}var z=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._configuration={registry:{},getEmptyAction:"null"},this.__type__=B}var e,r;return e=t,r=[{key:"configuration",get:function(){return this._configuration}},{key:"getEmptyAction",get:function(){return this.configuration.getEmptyAction},set:function(t){this.configuration.getEmptyAction=t}},{key:"control",value:function(t){var e=this,r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!t||t.__type__!==B)throw new Error("Failed taking control of target HotPatcher instance: Invalid type or object");return Object.keys(t.configuration.registry).forEach((function(n){e.configuration.registry.hasOwnProperty(n)?r&&(e.configuration.registry[n]=Object.assign({},t.configuration.registry[n])):e.configuration.registry[n]=Object.assign({},t.configuration.registry[n])})),t._configuration=this.configuration,this}},{key:"execute",value:function(t){for(var e=this.get(t)||W,r=arguments.length,n=new Array(r>1?r-1:0),o=1;o<r;o++)n[o-1]=arguments[o];return e.apply(void 0,n)}},{key:"get",value:function(t){var e,r=this.configuration.registry[t];if(!r)switch(this.getEmptyAction){case"null":return null;case"throw":throw new Error("Failed handling method request: No method provided for override: ".concat(t));default:throw new Error("Failed handling request which resulted in an empty method: Invalid empty-action specified: ".concat(this.getEmptyAction))}return D.apply(void 0,function(t){if(Array.isArray(t))return F(t)}(e=r.methods)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(e)||function(t,e){if(t){if("string"==typeof t)return F(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?F(t,e):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())}},{key:"isPatched",value:function(t){return!!this.configuration.registry[t]}},{key:"patch",value:function(t,e){var r=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}).chain,n=void 0!==r&&r;if(this.configuration.registry[t]&&this.configuration.registry[t].final)throw new Error("Failed patching '".concat(t,"': Method marked as being final"));if("function"!=typeof e)throw new Error("Failed patching '".concat(t,"': Provided method is not a function"));if(n)this.configuration.registry[t]?this.configuration.registry[t].methods.push(e):this.configuration.registry[t]=V(e);else if(this.isPatched(t)){var o=this.configuration.registry[t].original;this.configuration.registry[t]=Object.assign(V(e),{original:o})}else this.configuration.registry[t]=V(e);return this}},{key:"patchInline",value:function(t,e){this.isPatched(t)||this.patch(t,e);for(var r=arguments.length,n=new Array(r>2?r-2:0),o=2;o<r;o++)n[o-2]=arguments[o];return this.execute.apply(this,[t].concat(n))}},{key:"plugin",value:function(t){for(var e=this,r=arguments.length,n=new Array(r>1?r-1:0),o=1;o<r;o++)n[o-1]=arguments[o];return n.forEach((function(r){e.patch(t,r,{chain:!0})})),this}},{key:"restore",value:function(t){if(!this.isPatched(t))throw new Error("Failed restoring method: No method present for key: ".concat(t));if("function"!=typeof this.configuration.registry[t].original)throw new Error("Failed restoring method: Original method not found or of invalid type for key: ".concat(t));return this.configuration.registry[t].methods=[this.configuration.registry[t].original],this}},{key:"setFinal",value:function(t){if(!this.configuration.registry.hasOwnProperty(t))throw new Error("Failed marking '".concat(t,"' as final: No method found for key"));return this.configuration.registry[t].final=!0,this}}],r&&$(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}(),q=null;function G(){return q||(q=new z),q}function H(t){return function(t){if(Array.isArray(t))return X(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return X(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?X(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function X(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function Z(t){return Z="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Z(t)}function Y(t){return function(t){if("object"!==Z(t)||null===t||"[object Object]"!=Object.prototype.toString.call(t))return!1;if(null===Object.getPrototypeOf(t))return!0;for(var e=t;null!==Object.getPrototypeOf(e);)e=Object.getPrototypeOf(e);return Object.getPrototypeOf(t)===e}(t)?Object.assign({},t):Object.setPrototypeOf(Object.assign({},t),Object.getPrototypeOf(t))}function K(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];for(var n=null,o=[].concat(e);o.length>0;){var i=o.shift();n=n?J(n,i):Y(i)}return n}function J(t,e){var r=Y(t);return Object.keys(e).forEach((function(t){r.hasOwnProperty(t)?Array.isArray(e[t])?r[t]=Array.isArray(r[t])?[].concat(H(r[t]),H(e[t])):H(e[t]):"object"===Z(e[t])&&e[t]?r[t]="object"===Z(r[t])&&r[t]?J(r[t],e[t]):Y(e[t]):r[t]=e[t]:r[t]=e[t]})),r}function Q(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function tt(t){var e,r={},n=function(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(t){if("string"==typeof t)return Q(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Q(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,s=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){s=!0,i=t},f:function(){try{a||null==r.return||r.return()}finally{if(s)throw i}}}}(t.keys());try{for(n.s();!(e=n.n()).done;){var o=e.value;r[o]=t.get(o)}}catch(t){n.e(t)}finally{n.f()}return r}function et(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];if(0===e.length)return{};var n={};return e.reduce((function(t,e){return Object.keys(e).forEach((function(r){var o=r.toLowerCase();n.hasOwnProperty(o)?t[n[o]]=e[r]:(n[o]=r,t[r]=e[r])})),t}),{})}r(347);var rt="function"==typeof ArrayBuffer,nt=Object.prototype.toString;function ot(t){return rt&&(t instanceof ArrayBuffer||"[object ArrayBuffer]"===nt.call(t))}function it(t){return null!=t&&null!=t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}function at(t){return at="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},at(t)}function st(t,e,r){return r?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}function ut(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function ct(t){var e=G();return e.patchInline("request",(function(t){return e.patchInline("fetch",L,t.url,function(t){var e,r,n={},o={method:t.method};if(t.headers&&(n=et(n,t.headers)),void 0!==t.data){var i=(e=function(t){if("string"==typeof t)return[t,{}];if(it(t))return[t,{}];if(ot(t))return[t,{}];if(t&&"object"===at(t))return[JSON.stringify(t),{"content-type":"application/json"}];throw new Error("Unable to convert request body: Unexpected body type: ".concat(at(t)))}(t.data),r=2,function(t){if(Array.isArray(t))return t}(e)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i=[],a=!0,s=!1;try{for(r=r.call(t);!(a=(n=r.next()).done)&&(i.push(n.value),!e||i.length!==e);a=!0);}catch(t){s=!0,o=t}finally{try{a||null==r.return||r.return()}finally{if(s)throw o}}return i}}(e,r)||function(t,e){if(t){if("string"==typeof t)return ut(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?ut(t,e):void 0}}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=i[0],s=i[1];o.body=a,n=et(n,s)}return t.signal&&(o.signal=t.signal),t.withCredentials&&(o.credentials="include"),o.headers=n,o}(t))}),t)}var lt,ft=(lt=function(t){if(!t._digest)return ct(t);var e=t._digest;return delete t._digest,e.hasDigestAuth&&(t=K(t,{headers:{Authorization:N(t,e)}})),st(ct(t),(function(r){var n,o,i=!1;return n=function(t){return i?t:r},(o=function(){if(401==r.status)return e.hasDigestAuth=function(t,e){var r=t.headers&&t.headers.get("www-authenticate")||"";if("digest"!==r.split(/\s/)[0].toLowerCase())return!1;for(var n=/([a-z0-9_-]+)=(?:"([^"]+)"|([a-z0-9_-]+))/gi;;){var o=n.exec(r);if(!o)break;e[o[1]]=o[2]||o[3]}return e.nc+=1,e.cnonce=function(){for(var t="",e=0;e<32;++e)t="".concat(t).concat(E[Math.floor(16*Math.random())]);return t}(),!0}(r,e),function(){if(e.hasDigestAuth)return st(ct(t=K(t,{headers:{Authorization:N(t,e)}})),(function(t){return 401==t.status?e.hasDigestAuth=!1:e.nc++,i=!0,t}))}();e.nc++}())&&o.then?o.then(n):n(o)}))},function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];try{return Promise.resolve(lt.apply(this,t))}catch(t){return Promise.reject(t)}});function ht(t,e,r){var n=Y(t);return n.headers=et(e.headers,n.headers||{},r.headers||{}),void 0!==r.data&&(n.data=r.data),r.signal&&(n.signal=r.signal),e.httpAgent&&(n.httpAgent=e.httpAgent),e.httpsAgent&&(n.httpsAgent=e.httpsAgent),e.digest&&(n._digest=e.digest),"boolean"==typeof e.withCredentials&&(n.withCredentials=e.withCredentials),n}var pt=r(637);function dt(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i=[],a=!0,s=!1;try{for(r=r.call(t);!(a=(n=r.next()).done)&&(i.push(n.value),!e||i.length!==e);a=!0);}catch(t){s=!0,o=t}finally{try{a||null==r.return||r.return()}finally{if(s)throw o}}return i}}(t,e)||function(t,e){if(t){if("string"==typeof t)return gt(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?gt(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function gt(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var vt={"[:alnum:]":["\\p{L}\\p{Nl}\\p{Nd}",!0],"[:alpha:]":["\\p{L}\\p{Nl}",!0],"[:ascii:]":["\\x00-\\x7f",!1],"[:blank:]":["\\p{Zs}\\t",!0],"[:cntrl:]":["\\p{Cc}",!0],"[:digit:]":["\\p{Nd}",!0],"[:graph:]":["\\p{Z}\\p{C}",!0,!0],"[:lower:]":["\\p{Ll}",!0],"[:print:]":["\\p{C}",!0],"[:punct:]":["\\p{P}",!0],"[:space:]":["\\p{Z}\\t\\r\\n\\v\\f",!0],"[:upper:]":["\\p{Lu}",!0],"[:word:]":["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}",!0],"[:xdigit:]":["A-Fa-f0-9",!1]},yt=function(t){return t.replace(/[[\]\\-]/g,"\\$&")},mt=function(t){return t.join("")},bt=function(t,e){var r=e;if("["!==t.charAt(r))throw new Error("not in a brace expression");var n,o=[],i=[],a=r+1,s=!1,u=!1,c=!1,l=!1,f=r,h="";t:for(;a<t.length;){var p=t.charAt(a);if("!"!==p&&"^"!==p||a!==r+1){if("]"===p&&s&&!c){f=a+1;break}if(s=!0,"\\"!==p||c){if("["===p&&!c)for(var d=0,g=Object.entries(vt);d<g.length;d++){var v=dt(g[d],2),y=v[0],m=dt(v[1],3),b=m[0],w=m[1],x=m[2];if(t.startsWith(y,a)){if(h)return["$.",!1,t.length-r,!0];a+=y.length,x?i.push(b):o.push(b),u=u||w;continue t}}c=!1,h?(p>h?o.push(yt(h)+"-"+yt(p)):p===h&&o.push(yt(p)),h="",a++):t.startsWith("-]",a+1)?(o.push(yt(p+"-")),a+=2):t.startsWith("-",a+1)?(h=p,a+=2):(o.push(yt(p)),a++)}else c=!0,a++}else l=!0,a++}if(f<a)return["",!1,0,!1];if(!o.length&&!i.length)return["$.",!1,t.length-r,!0];if(0===i.length&&1===o.length&&/^\\?.$/.test(o[0])&&!l)return[(n=2===o[0].length?o[0].slice(-1):o[0],n.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")),!1,f-r,!1];var O="["+(l?"^":"")+mt(o)+"]",A="["+(l?"":"^")+mt(i)+"]";return[o.length&&i.length?"("+O+"|"+A+")":o.length?O:A,u,f-r,!0]};function wt(t){return function(t){if(Array.isArray(t))return Ct(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||kt(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function xt(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=kt(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,s=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){s=!0,i=t},f:function(){try{a||null==r.return||r.return()}finally{if(s)throw i}}}}function Ot(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function At(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function jt(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function Pt(t,e,r){return e&&jt(t.prototype,e),r&&jt(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function St(t,e){return St=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},St(t,e)}function Et(t){return Et=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},Et(t)}function Nt(t){return Nt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Nt(t)}function Tt(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i=[],a=!0,s=!1;try{for(r=r.call(t);!(a=(n=r.next()).done)&&(i.push(n.value),!e||i.length!==e);a=!0);}catch(t){s=!0,o=t}finally{try{a||null==r.return||r.return()}finally{if(s)throw o}}return i}}(t,e)||kt(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function kt(t,e){if(t){if("string"==typeof t)return Ct(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Ct(t,e):void 0}}function Ct(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var It=function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return le(e),!(!r.nocomment&&"#"===e.charAt(0))&&new pe(e,r).match(t)};const _t=It;var Rt=/^\*+([^+@!?\*\[\(]*)$/,Lt=function(t){return function(e){return!e.startsWith(".")&&e.endsWith(t)}},Mt=function(t){return function(e){return e.endsWith(t)}},Ut=function(t){return t=t.toLowerCase(),function(e){return!e.startsWith(".")&&e.toLowerCase().endsWith(t)}},Dt=function(t){return t=t.toLowerCase(),function(e){return e.toLowerCase().endsWith(t)}},Ft=/^\*+\.\*+$/,$t=function(t){return!t.startsWith(".")&&t.includes(".")},Bt=function(t){return"."!==t&&".."!==t&&t.includes(".")},Wt=/^\.\*+$/,Vt=function(t){return"."!==t&&".."!==t&&t.startsWith(".")},zt=/^\*+$/,qt=function(t){return 0!==t.length&&!t.startsWith(".")},Gt=function(t){return 0!==t.length&&"."!==t&&".."!==t},Ht=/^\?+([^+@!?\*\[\(]*)?$/,Xt=function(t){var e=Tt(t,2),r=e[0],n=e[1],o=void 0===n?"":n,i=Jt([r]);return o?(o=o.toLowerCase(),function(t){return i(t)&&t.toLowerCase().endsWith(o)}):i},Zt=function(t){var e=Tt(t,2),r=e[0],n=e[1],o=void 0===n?"":n,i=Qt([r]);return o?(o=o.toLowerCase(),function(t){return i(t)&&t.toLowerCase().endsWith(o)}):i},Yt=function(t){var e=Tt(t,2),r=e[0],n=e[1],o=void 0===n?"":n,i=Qt([r]);return o?function(t){return i(t)&&t.endsWith(o)}:i},Kt=function(t){var e=Tt(t,2),r=e[0],n=e[1],o=void 0===n?"":n,i=Jt([r]);return o?function(t){return i(t)&&t.endsWith(o)}:i},Jt=function(t){var e=Tt(t,1)[0].length;return function(t){return t.length===e&&!t.startsWith(".")}},Qt=function(t){var e=Tt(t,1)[0].length;return function(t){return t.length===e&&"."!==t&&".."!==t}},te="object"===("undefined"==typeof process?"undefined":Nt(process))&&process?"object"===Nt(process.env)&&process.env&&process.env.__MINIMATCH_TESTING_PLATFORM__||process.platform:"posix";It.sep="win32"===te?"\\":"/";var ee=Symbol("globstar **");It.GLOBSTAR=ee;var re={"!":{open:"(?:(?!(?:",close:"))[^/]*?)"},"?":{open:"(?:",close:")?"},"+":{open:"(?:",close:")+"},"*":{open:"(?:",close:")*"},"@":{open:"(?:",close:")"}},ne="[^/]",oe=ne+"*?",ie=function(t){return t.split("").reduce((function(t,e){return t[e]=!0,t}),{})},ae=ie("().*{}+?[]^$\\!"),se=ie("[.(");It.filter=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return function(r){return It(r,t,e)}};var ue=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.assign({},t,e)};It.defaults=function(t){if(!t||"object"!==Nt(t)||!Object.keys(t).length)return It;var e=It;return Object.assign((function(r,n){return e(r,n,ue(t,arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}))}),{Minimatch:function(r){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&St(t,e)}(a,r);var n,o,i=(n=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=Et(n);if(o){var r=Et(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===Nt(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function a(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return At(this,a),i.call(this,e,ue(t,r))}return Pt(a,null,[{key:"defaults",value:function(r){return e.defaults(ue(t,r)).Minimatch}}]),a}(e.Minimatch),unescape:function(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.unescape(r,ue(t,n))},escape:function(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.escape(r,ue(t,n))},filter:function(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.filter(r,ue(t,n))},defaults:function(r){return e.defaults(ue(t,r))},makeRe:function(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.makeRe(r,ue(t,n))},braceExpand:function(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.braceExpand(r,ue(t,n))},match:function(r,n){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return e.match(r,n,ue(t,o))},sep:e.sep,GLOBSTAR:ee})};var ce=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return le(t),e.nobrace||!/\{(?:(?!\{).)*\}/.test(t)?[t]:pt(t)};It.braceExpand=ce;var le=function(t){if("string"!=typeof t)throw new TypeError("invalid pattern");if(t.length>65536)throw new TypeError("pattern is too long")};It.makeRe=function(t){return new pe(t,arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).makeRe()},It.match=function(t,e){var r=new pe(e,arguments.length>2&&void 0!==arguments[2]?arguments[2]:{});return t=t.filter((function(t){return r.match(t)})),r.options.nonull&&!t.length&&t.push(e),t};var fe=/[?*]|[+@!]\(.*?\)|\[|\]/,he=function(t){return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")},pe=function(){function t(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};At(this,t),Ot(this,"options",void 0),Ot(this,"set",void 0),Ot(this,"pattern",void 0),Ot(this,"windowsPathsNoEscape",void 0),Ot(this,"nonegate",void 0),Ot(this,"negate",void 0),Ot(this,"comment",void 0),Ot(this,"empty",void 0),Ot(this,"preserveMultipleSlashes",void 0),Ot(this,"partial",void 0),Ot(this,"globSet",void 0),Ot(this,"globParts",void 0),Ot(this,"nocase",void 0),Ot(this,"isWindows",void 0),Ot(this,"platform",void 0),Ot(this,"windowsNoMagicRoot",void 0),Ot(this,"regexp",void 0),le(e),r=r||{},this.options=r,this.pattern=e,this.platform=r.platform||te,this.isWindows="win32"===this.platform,this.windowsPathsNoEscape=!!r.windowsPathsNoEscape||!1===r.allowWindowsEscape,this.windowsPathsNoEscape&&(this.pattern=this.pattern.replace(/\\/g,"/")),this.preserveMultipleSlashes=!!r.preserveMultipleSlashes,this.regexp=null,this.negate=!1,this.nonegate=!!r.nonegate,this.comment=!1,this.empty=!1,this.partial=!!r.partial,this.nocase=!!this.options.nocase,this.windowsNoMagicRoot=void 0!==r.windowsNoMagicRoot?r.windowsNoMagicRoot:!(!this.isWindows||!this.nocase),this.globSet=[],this.globParts=[],this.set=[],this.make()}return Pt(t,[{key:"hasMagic",value:function(){if(this.options.magicalBraces&&this.set.length>1)return!0;var t,e=xt(this.set);try{for(e.s();!(t=e.n()).done;){var r,n=xt(t.value);try{for(n.s();!(r=n.n()).done;)if("string"!=typeof r.value)return!0}catch(t){n.e(t)}finally{n.f()}}}catch(t){e.e(t)}finally{e.f()}return!1}},{key:"debug",value:function(){}},{key:"make",value:function(){var t=this,e=this.pattern,r=this.options;if(r.nocomment||"#"!==e.charAt(0))if(e){this.parseNegate(),this.globSet=wt(new Set(this.braceExpand())),r.debug&&(this.debug=function(){var t;return(t=console).error.apply(t,arguments)}),this.debug(this.pattern,this.globSet);var n=this.globSet.map((function(e){return t.slashSplit(e)}));this.globParts=this.preprocess(n),this.debug(this.pattern,this.globParts);var o=this.globParts.map((function(e,r,n){if(t.isWindows&&t.windowsNoMagicRoot){var o=!(""!==e[0]||""!==e[1]||"?"!==e[2]&&fe.test(e[2])||fe.test(e[3])),i=/^[a-z]:/i.test(e[0]);if(o)return[].concat(wt(e.slice(0,4)),wt(e.slice(4).map((function(e){return t.parse(e)}))));if(i)return[e[0]].concat(wt(e.slice(1).map((function(e){return t.parse(e)}))))}return e.map((function(e){return t.parse(e)}))}));if(this.debug(this.pattern,o),this.set=o.filter((function(t){return-1===t.indexOf(!1)})),this.isWindows)for(var i=0;i<this.set.length;i++){var a=this.set[i];""===a[0]&&""===a[1]&&"?"===this.globParts[i][2]&&"string"==typeof a[3]&&/^[a-z]:$/i.test(a[3])&&(a[2]="?")}this.debug(this.pattern,this.set)}else this.empty=!0;else this.comment=!0}},{key:"preprocess",value:function(t){if(this.options.noglobstar)for(var e=0;e<t.length;e++)for(var r=0;r<t[e].length;r++)"**"===t[e][r]&&(t[e][r]="*");var n=this.options.optimizationLevel,o=void 0===n?1:n;return o>=2?(t=this.firstPhasePreProcess(t),t=this.secondPhasePreProcess(t)):t=o>=1?this.levelOneOptimize(t):this.adjascentGlobstarOptimize(t),t}},{key:"adjascentGlobstarOptimize",value:function(t){return t.map((function(t){for(var e=-1;-1!==(e=t.indexOf("**",e+1));){for(var r=e;"**"===t[r+1];)r++;r!==e&&t.splice(e,r-e)}return t}))}},{key:"levelOneOptimize",value:function(t){return t.map((function(t){return 0===(t=t.reduce((function(t,e){var r=t[t.length-1];return"**"===e&&"**"===r?t:".."===e&&r&&".."!==r&&"."!==r&&"**"!==r?(t.pop(),t):(t.push(e),t)}),[])).length?[""]:t}))}},{key:"levelTwoFileOptimize",value:function(t){Array.isArray(t)||(t=this.slashSplit(t));var e=!1;do{if(e=!1,!this.preserveMultipleSlashes){for(var r=1;r<t.length-1;r++){var n=t[r];1===r&&""===n&&""===t[0]||"."!==n&&""!==n||(e=!0,t.splice(r,1),r--)}"."!==t[0]||2!==t.length||"."!==t[1]&&""!==t[1]||(e=!0,t.pop())}for(var o=0;-1!==(o=t.indexOf("..",o+1));){var i=t[o-1];i&&"."!==i&&".."!==i&&"**"!==i&&(e=!0,t.splice(o-1,2),o-=2)}}while(e);return 0===t.length?[""]:t}},{key:"firstPhasePreProcess",value:function(t){var e=!1;do{e=!1;var r,n=xt(t);try{for(n.s();!(r=n.n()).done;){for(var o=r.value,i=-1;-1!==(i=o.indexOf("**",i+1));){for(var a=i;"**"===o[a+1];)a++;a>i&&o.splice(i+1,a-i);var s=o[i+1],u=o[i+2],c=o[i+3];if(".."===s&&u&&"."!==u&&".."!==u&&c&&"."!==c&&".."!==c){e=!0,o.splice(i,1);var l=o.slice(0);l[i]="**",t.push(l),i--}}if(!this.preserveMultipleSlashes){for(var f=1;f<o.length-1;f++){var h=o[f];1===f&&""===h&&""===o[0]||"."!==h&&""!==h||(e=!0,o.splice(f,1),f--)}"."!==o[0]||2!==o.length||"."!==o[1]&&""!==o[1]||(e=!0,o.pop())}for(var p=0;-1!==(p=o.indexOf("..",p+1));){var d=o[p-1];if(d&&"."!==d&&".."!==d&&"**"!==d){e=!0;var g=1===p&&"**"===o[p+1]?["."]:[];o.splice.apply(o,[p-1,2].concat(g)),0===o.length&&o.push(""),p-=2}}}}catch(t){n.e(t)}finally{n.f()}}while(e);return t}},{key:"secondPhasePreProcess",value:function(t){for(var e=0;e<t.length-1;e++)for(var r=e+1;r<t.length;r++){var n=this.partsMatch(t[e],t[r],!this.preserveMultipleSlashes);n&&(t[e]=n,t[r]=[])}return t.filter((function(t){return t.length}))}},{key:"partsMatch",value:function(t,e){for(var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=0,o=0,i=[],a="";n<t.length&&o<e.length;)if(t[n]===e[o])i.push("b"===a?e[o]:t[n]),n++,o++;else if(r&&"**"===t[n]&&e[o]===t[n+1])i.push(t[n]),n++;else if(r&&"**"===e[o]&&t[n]===e[o+1])i.push(e[o]),o++;else if("*"!==t[n]||!e[o]||!this.options.dot&&e[o].startsWith(".")||"**"===e[o]){if("*"!==e[o]||!t[n]||!this.options.dot&&t[n].startsWith(".")||"**"===t[n])return!1;if("a"===a)return!1;a="b",i.push(e[o]),n++,o++}else{if("b"===a)return!1;a="a",i.push(t[n]),n++,o++}return t.length===e.length&&i}},{key:"parseNegate",value:function(){if(!this.nonegate){for(var t=this.pattern,e=!1,r=0,n=0;n<t.length&&"!"===t.charAt(n);n++)e=!e,r++;r&&(this.pattern=t.slice(r)),this.negate=e}}},{key:"matchOne",value:function(t,e){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=this.options;if(this.isWindows){var o=""===t[0]&&""===t[1]&&"?"===t[2]&&"string"==typeof t[3]&&/^[a-z]:$/i.test(t[3]),i=""===e[0]&&""===e[1]&&"?"===e[2]&&"string"==typeof e[3]&&/^[a-z]:$/i.test(e[3]);if(o&&i){var a=t[3],s=e[3];a.toLowerCase()===s.toLowerCase()&&(t[3]=s)}else if(i&&"string"==typeof t[0]){var u=e[3],c=t[0];u.toLowerCase()===c.toLowerCase()&&(e[3]=c,e=e.slice(3))}else if(o&&"string"==typeof e[0]){var l=t[3];l.toLowerCase()===e[0].toLowerCase()&&(e[0]=l,t=t.slice(3))}}var f=this.options.optimizationLevel;(void 0===f?1:f)>=2&&(t=this.levelTwoFileOptimize(t)),this.debug("matchOne",this,{file:t,pattern:e}),this.debug("matchOne",t.length,e.length);for(var h=0,p=0,d=t.length,g=e.length;h<d&&p<g;h++,p++){this.debug("matchOne loop");var v=e[p],y=t[h];if(this.debug(e,v,y),!1===v)return!1;if(v===ee){this.debug("GLOBSTAR",[e,v,y]);var m=h,b=p+1;if(b===g){for(this.debug("** at the end");h<d;h++)if("."===t[h]||".."===t[h]||!n.dot&&"."===t[h].charAt(0))return!1;return!0}for(;m<d;){var w=t[m];if(this.debug("\nglobstar while",t,m,e,b,w),this.matchOne(t.slice(m),e.slice(b),r))return this.debug("globstar found match!",m,d,w),!0;if("."===w||".."===w||!n.dot&&"."===w.charAt(0)){this.debug("dot detected!",t,m,e,b);break}this.debug("globstar swallow a segment, and continue"),m++}return!(!r||(this.debug("\n>>> no match, partial?",t,m,e,b),m!==d))}var x=void 0;if("string"==typeof v?(x=y===v,this.debug("string match",v,y,x)):(x=v.test(y),this.debug("pattern match",v,y,x)),!x)return!1}if(h===d&&p===g)return!0;if(h===d)return r;if(p===g)return h===d-1&&""===t[h];throw new Error("wtf?")}},{key:"braceExpand",value:function(){return ce(this.pattern,this.options)}},{key:"parse",value:function(t){var e=this;le(t);var r,n=this.options;if("**"===t)return ee;if(""===t)return"";var o=null;(r=t.match(zt))?o=n.dot?Gt:qt:(r=t.match(Rt))?o=(n.nocase?n.dot?Dt:Ut:n.dot?Mt:Lt)(r[1]):(r=t.match(Ht))?o=(n.nocase?n.dot?Zt:Xt:n.dot?Yt:Kt)(r):(r=t.match(Ft))?o=n.dot?Bt:$t:(r=t.match(Wt))&&(o=Vt);for(var i,a,s="",u=!1,c=!1,l=[],f=[],h=!1,p=!1,d="."===t.charAt(0),g=n.dot||d,v=function(t){return"."===t.charAt(0)?"":n.dot?"(?!(?:^|\\/)\\.{1,2}(?:$|\\/))":"(?!\\.)"},y=function(){if(h){switch(h){case"*":s+=oe,u=!0;break;case"?":s+=ne,u=!0;break;default:s+="\\"+h}e.debug("clearStateChar %j %j",h,s),h=!1}},m=0;m<t.length&&(a=t.charAt(m));m++)if(this.debug("%s\t%s %s %j",t,m,s,a),c){if("/"===a)return!1;ae[a]&&(s+="\\"),s+=a,c=!1}else switch(a){case"/":return!1;case"\\":y(),c=!0;continue;case"?":case"*":case"+":case"@":case"!":this.debug("%s\t%s %s %j <-- stateChar",t,m,s,a),this.debug("call clearStateChar %j",h),y(),h=a,n.noext&&y();continue;case"(":if(!h){s+="\\(";continue}var b={type:h,start:m-1,reStart:s.length,open:re[h].open,close:re[h].close};this.debug(this.pattern,"\t",b),l.push(b),s+=b.open,0===b.start&&"!"!==b.type&&(d=!0,s+=v(t.slice(m+1))),this.debug("plType %j %j",h,s),h=!1;continue;case")":var w=l[l.length-1];if(!w){s+="\\)";continue}l.pop(),y(),u=!0,s+=(i=w).close,"!"===i.type&&f.push(Object.assign(i,{reEnd:s.length}));continue;case"|":var x=l[l.length-1];if(!x){s+="\\|";continue}y(),s+="|",0===x.start&&"!"!==x.type&&(d=!0,s+=v(t.slice(m+1)));continue;case"[":y();var O=Tt(bt(t,m),4),A=O[0],j=O[1],P=O[2],S=O[3];P?(s+=A,p=p||j,m+=P-1,u=u||S):s+="\\[";continue;case"]":s+="\\"+a;continue;default:y(),s+=he(a)}for(i=l.pop();i;i=l.pop()){var E=void 0;E=s.slice(i.reStart+i.open.length),this.debug(this.pattern,"setting tail",s,i),E=E.replace(/((?:\\{2}){0,64})(\\?)\|/g,(function(t,e,r){return r||(r="\\"),e+e+r+"|"})),this.debug("tail=%j\n   %s",E,E,i,s);var N="*"===i.type?oe:"?"===i.type?ne:"\\"+i.type;u=!0,s=s.slice(0,i.reStart)+N+"\\("+E}y(),c&&(s+="\\\\");for(var T=se[s.charAt(0)],k=f.length-1;k>-1;k--){for(var C=f[k],I=s.slice(0,C.reStart),_=s.slice(C.reStart,C.reEnd-8),R=s.slice(C.reEnd),L=s.slice(C.reEnd-8,C.reEnd)+R,M=I.split(")").length,U=I.split("(").length-M,D=R,F=0;F<U;F++)D=D.replace(/\)[+*?]?/,"");s=I+_+(R=D)+(""===R?"(?:$|\\/)":"")+L}if(""!==s&&u&&(s="(?=.)"+s),T&&(s=(d?"":g?"(?!(?:^|\\/)\\.{1,2}(?:$|\\/))":"(?!\\.)")+s),!n.nocase||u||n.nocaseMagicOnly||(u=t.toUpperCase()!==t.toLowerCase()),!u)return s.replace(/\\(.)/g,"$1");var $=(n.nocase?"i":"")+(p?"u":"");try{var B=o?{_glob:t,_src:s,test:o}:{_glob:t,_src:s};return Object.assign(new RegExp("^"+s+"$",$),B)}catch(t){return this.debug("invalid regexp",t),new RegExp("$.")}}},{key:"makeRe",value:function(){if(this.regexp||!1===this.regexp)return this.regexp;var t=this.set;if(!t.length)return this.regexp=!1,this.regexp;var e=this.options,r=e.noglobstar?oe:e.dot?"(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?":"(?:(?!(?:\\/|^)\\.).)*?",n=e.nocase?"i":"",o=t.map((function(t){var e=t.map((function(t){return"string"==typeof t?he(t):t===ee?ee:t._src}));return e.forEach((function(t,n){var o=e[n+1],i=e[n-1];t===ee&&i!==ee&&(void 0===i?void 0!==o&&o!==ee?e[n+1]="(?:\\/|"+r+"\\/)?"+o:e[n]=r:void 0===o?e[n-1]=i+"(?:\\/|"+r+")?":o!==ee&&(e[n-1]=i+"(?:\\/|\\/"+r+"\\/)"+o,e[n+1]=ee))})),e.filter((function(t){return t!==ee})).join("/")})).join("|");o="^(?:"+o+")$",this.negate&&(o="^(?!"+o+").*$");try{this.regexp=new RegExp(o,n)}catch(t){this.regexp=!1}return this.regexp}},{key:"slashSplit",value:function(t){return this.preserveMultipleSlashes?t.split("/"):this.isWindows&&/^\/\/[^\/]+/.test(t)?[""].concat(wt(t.split(/\/+/))):t.split(/\/+/)}},{key:"match",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.partial;if(this.debug("match",t,this.pattern),this.comment)return!1;if(this.empty)return""===t;if("/"===t&&e)return!0;var r=this.options;this.isWindows&&(t=t.split("\\").join("/"));var n=this.slashSplit(t);this.debug(this.pattern,"split",n);var o=this.set;this.debug(this.pattern,"set",o);var i=n[n.length-1];if(!i)for(var a=n.length-2;!i&&a>=0;a--)i=n[a];for(var s=0;s<o.length;s++){var u=o[s],c=n;if(r.matchBase&&1===u.length&&(c=[i]),this.matchOne(c,u,e))return!!r.flipNegate||!this.negate}return!r.flipNegate&&this.negate}}],[{key:"defaults",value:function(t){return It.defaults(t).Minimatch}}]),t}();function de(t){var e=new Error("".concat(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"","Invalid response: ").concat(t.status," ").concat(t.statusText));return e.status=t.status,e.response=t,e}function ge(t,e){var r=e.status;if(401===r&&t.digest)return e;if(r>=400)throw de(e);return e}function ve(t,e){return arguments.length>2&&void 0!==arguments[2]&&arguments[2]?{data:e,headers:t.headers?tt(t.headers):{},status:t.status,statusText:t.statusText}:e}It.Minimatch=pe,It.escape=function(t){var e=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).windowsPathsNoEscape;return void 0!==e&&e?t.replace(/[?*()[\]]/g,"[$&]"):t.replace(/[?*()[\]\\]/g,"\\$&")},It.unescape=function(t){var e=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).windowsPathsNoEscape;return void 0!==e&&e?t.replace(/\[([^\/\\])\]/g,"$1"):t.replace(/((?!\\).|^)\[([^\/\\])\]/g,"$1$2").replace(/\\([^\/])/g,"$1")};var ye,me=function(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e,r){var n,o,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},a=ht({url:j(t.remoteURL,x(e)),method:"COPY",headers:{Destination:j(t.remoteURL,x(r))}},t,i);return o=function(e){ge(t,e)},(n=ft(a))&&n.then||(n=Promise.resolve(n)),o?n.then(o):n})),be=r(5),we=r(421),xe=r.n(we);function Oe(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function Ae(t){return Ae="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ae(t)}function je(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:ye.Original,n=xe().get(t,e);return"array"===r&&!1===Array.isArray(n)?[n]:"object"===r&&Array.isArray(n)?n[0]:n}function Pe(t){return new Promise((function(e){e(function(t){var e=t.multistatus;if(""===e)return{multistatus:{response:[]}};if(!e)throw new Error("Invalid response: No root multistatus found");var r={multistatus:Array.isArray(e)?e[0]:e};return xe().set(r,"multistatus.response",je(r,"multistatus.response",ye.Array)),xe().set(r,"multistatus.response",xe().get(r,"multistatus.response").map((function(t){return function(t){var e=Object.assign({},t);return e.status?xe().set(e,"status",je(e,"status",ye.Object)):(xe().set(e,"propstat",je(e,"propstat",ye.Object)),xe().set(e,"propstat.prop",je(e,"propstat.prop",ye.Object))),e}(t)}))),r}(new be.XMLParser({removeNSPrefix:!0,numberParseOptions:{hex:!0,leadingZeros:!1}}).parse(t)))}))}function Se(t,e){var r,n,o=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=t.getlastmodified,a=void 0===i?null:i,s=t.getcontentlength,u=void 0===s?"0":s,c=t.resourcetype,l=void 0===c?null:c,f=t.getcontenttype,h=void 0===f?null:f,p=t.getetag,d=void 0===p?null:p,g=l&&"object"===Ae(l)&&void 0!==l.collection?"directory":"file",v=(r=e,(n=document.createElement("textarea")).innerHTML=r,n.value),y={filename:v,basename:m().basename(v),lastmod:a,size:parseInt(u,10),type:g,etag:"string"==typeof d?d.replace(/"/g,""):null};return"file"===g&&(y.mime=h&&"string"==typeof h?h.split(";")[0]:""),o&&(y.props=t),y}function Ee(t,e){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=null;try{t.multistatus.response[0].propstat&&(n=t.multistatus.response[0])}catch(t){}if(!n)throw new Error("Failed getting item stat: bad response");var o,i,a=n.propstat,s=a.prop,u=(o=a.status.split(" ",3),i=3,function(t){if(Array.isArray(t))return t}(o)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i=[],a=!0,s=!1;try{for(r=r.call(t);!(a=(n=r.next()).done)&&(i.push(n.value),!e||i.length!==e);a=!0);}catch(t){s=!0,o=t}finally{try{a||null==r.return||r.return()}finally{if(s)throw o}}return i}}(o,i)||function(t,e){if(t){if("string"==typeof t)return Oe(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Oe(t,e):void 0}}(o,i)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=(u[0],u[1]),l=u[2],f=parseInt(c,10);if(f>=400){var h=new Error("Invalid response: ".concat(f," ").concat(l));throw h.status=f,h}return Se(s,A(e),r)}function Ne(t){switch(t.toString()){case"-3":return"unlimited";case"-2":case"-1":return"unknown";default:return parseInt(t,10)}}function Te(t,e,r){return r?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}!function(t){t.Array="array",t.Object="object",t.Original="original"}(ye||(ye={}));var ke=function(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=r.details,o=void 0!==n&&n,i=ht({url:j(t.remoteURL,x(e)),method:"PROPFIND",headers:{Accept:"text/plain,application/xml",Depth:"0"}},t,r);return Te(ft(i),(function(r){return ge(t,r),Te(r.text(),(function(t){return Te(Pe(t),(function(t){var n=Ee(t,e,o);return ve(r,n,o)}))}))}))}));function Ce(t,e,r){return r?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}function Ie(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}function _e(){}function Re(t,e){if(!e)return t&&t.then?t.then(_e):Promise.resolve()}var Le="undefined"!=typeof Symbol?Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator")):"@@iterator";function Me(t,e,r){if(!t.s){if(r instanceof Ue){if(!r.s)return void(r.o=Me.bind(null,t,e));1&e&&(e=r.s),r=r.v}if(r&&r.then)return void r.then(Me.bind(null,t,e),Me.bind(null,t,2));t.s=e,t.v=r;var n=t.o;n&&n(t)}}var Ue=function(){function t(){}return t.prototype.then=function(e,r){var n=new t,o=this.s;if(o){var i=1&o?e:r;if(i){try{Me(n,1,i(this.v))}catch(t){Me(n,2,t)}return n}return this}return this.o=function(t){try{var o=t.v;1&t.s?Me(n,1,e?e(o):o):r?Me(n,1,r(o)):Me(n,2,o)}catch(t){Me(n,2,t)}},n},t}();function De(t){return t instanceof Ue&&1&t.s}function Fe(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function $e(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?Fe(Object(r),!0).forEach((function(e){Be(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Fe(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function Be(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var We=Ie((function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=function(t){if(!t||"/"===t)return[];var e=t,r=[];do{r.push(e),e=m().dirname(e)}while(e&&"/"!==e);return r}(A(e));n.sort((function(t,e){return t.length>e.length?1:e.length>t.length?-1:0}));var o=!1;return function(t,e,r){if("function"==typeof t[Le]){var n,o,i,a=t[Le]();if(function t(s){try{for(;!((n=a.next()).done||r&&r());)if((s=e(n.value))&&s.then){if(!De(s))return void s.then(t,i||(i=Me.bind(null,o=new Ue,2)));s=s.v}o?Me(o,1,s):o=s}catch(t){Me(o||(o=new Ue),2,t)}}(),a.return){var s=function(t){try{n.done||a.return()}catch(t){}return t};if(o&&o.then)return o.then(s,(function(t){throw s(t)}));s()}return o}if(!("length"in t))throw new TypeError("Object is not iterable");for(var u=[],c=0;c<t.length;c++)u.push(t[c]);return function(t,e,r){var n,o,i=-1;return function a(s){try{for(;++i<t.length&&(!r||!r());)if((s=e(i))&&s.then){if(!De(s))return void s.then(a,o||(o=Me.bind(null,n=new Ue,2)));s=s.v}n?Me(n,1,s):n=s}catch(t){Me(n||(n=new Ue),2,t)}}(),n}(u,(function(t){return e(u[t])}),r)}(n,(function(n){return i=function(){return function(r,o){try{var i=Ce(ke(t,n),(function(t){if("directory"!==t.type)throw new Error("Path includes a file: ".concat(e))}))}catch(t){return o(t)}return i&&i.then?i.then(void 0,o):i}(0,(function(e){var i=e;return function(){if(404===i.status)return o=!0,Re(Ve(t,n,$e($e({},r),{},{recursive:!1})));throw e}()}))},(a=function(){if(o)return Re(Ve(t,n,$e($e({},r),{},{recursive:!1})))}())&&a.then?a.then(i):i();var i,a}),(function(){return!1}))})),Ve=Ie((function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!0===r.recursive)return We(t,e,r);var n,o=ht({url:j(t.remoteURL,(n=x(e),n.endsWith("/")?n:n+"/")),method:"MKCOL"},t,r);return Ce(ft(o),(function(e){ge(t,e)}))}));var ze=r(227),qe=r.n(ze);function Ge(t){return Ge="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ge(t)}var He=function(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n={};if("object"===Ge(r.range)&&"number"==typeof r.range.start){var o="bytes=".concat(r.range.start,"-");"number"==typeof r.range.end&&(o="".concat(o).concat(r.range.end)),n.Range=o}var i,a,s=ht({url:j(t.remoteURL,x(e)),method:"GET",headers:n},t,r);return a=function(e){if(ge(t,e),n.Range&&206!==e.status){var o=new Error("Invalid response code for partial request: ".concat(e.status));throw o.status=e.status,o}return r.callback&&setTimeout((function(){r.callback(e)}),0),e.body},(i=ft(s))&&i.then||(i=Promise.resolve(i)),a?i.then(a):i})),Xe=function(){},Ze=function(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e,r){r.url||(r.url=j(t.remoteURL,x(e)));var n,o,i=ht(r,t,{});return o=function(e){return ge(t,e),e},(n=ft(i))&&n.then||(n=Promise.resolve(n)),o?n.then(o):n})),Ye=function(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){var r,n,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=ht({url:j(t.remoteURL,x(e)),method:"DELETE"},t,o);return n=function(e){ge(t,e)},(r=ft(i))&&r.then||(r=Promise.resolve(r)),n?r.then(n):r})),Ke=function(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return function(n,o){try{var i=(a=ke(t,e,r),s=function(){return!0},u?s?s(a):a:(a&&a.then||(a=Promise.resolve(a)),s?a.then(s):a))}catch(t){return o(t)}var a,s,u;return i&&i.then?i.then(void 0,o):i}(0,(function(t){if(404===t.status)return!1;throw t}))}));function Je(t,e,r){return r?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}var Qe=function(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=ht({url:j(t.remoteURL,x(e),"/"),method:"PROPFIND",headers:{Accept:"text/plain,application/xml",Depth:r.deep?"infinity":"1"}},t,r);return Je(ft(n),(function(n){return ge(t,n),Je(n.text(),(function(o){if(!o)throw new Error("Failed parsing directory contents: Empty response");return Je(Pe(o),(function(o){var i=O(e),a=function(t,e,r){var n=arguments.length>3&&void 0!==arguments[3]&&arguments[3],o=arguments.length>4&&void 0!==arguments[4]&&arguments[4],i=m().join(e,"/"),a=t.multistatus.response.map((function(t){var e=function(t){try{return t.replace(/^https?:\/\/[^\/]+/,"")}catch(t){throw new g(t,"Failed normalising HREF")}}(t.href);return Se(t.propstat.prop,"/"===i?decodeURIComponent(A(e)):A(m().relative(decodeURIComponent(i),decodeURIComponent(e))),n)}));return o?a:a.filter((function(t){return t.basename&&("file"===t.type||t.filename!==r.replace(/\/$/,""))}))}(o,O(t.remoteBasePath||t.remotePath),i,r.details,r.includeSelf);return r.glob&&(a=function(t,e){return t.filter((function(t){return _t(t.filename,e,{matchBase:!0})}))}(a,r.glob)),ve(n,a,r.details)}))}))}))}));function tr(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}var er=tr((function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=ht({url:j(t.remoteURL,x(e)),method:"GET",headers:{Accept:"text/plain"},transformResponse:[ir]},t,r);return rr(ft(n),(function(e){return ge(t,e),rr(e.text(),(function(t){return ve(e,t,r.details)}))}))}));function rr(t,e,r){return r?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}var nr=tr((function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=ht({url:j(t.remoteURL,x(e)),method:"GET"},t,r);return rr(ft(n),(function(e){var n;return ge(t,e),function(t,e){var r=t();return r&&r.then?r.then(e):e()}((function(){return rr(e.arrayBuffer(),(function(t){n=t}))}),(function(){return ve(e,n,r.details)}))}))})),or=tr((function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=r.format,o=void 0===n?"binary":n;if("binary"!==o&&"text"!==o)throw new g({info:{code:_.InvalidOutputFormat}},"Invalid output format: ".concat(o));return"text"===o?er(t,e,r):nr(t,e,r)})),ir=function(t){return t};function ar(t){return ar="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ar(t)}function sr(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function ur(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function cr(t){return new be.XMLBuilder({attributeNamePrefix:"@_",format:!0,ignoreAttributes:!1,suppressEmptyNode:!0}).build(lr({lockinfo:{"@_xmlns:d":"DAV:",lockscope:{exclusive:{}},locktype:{write:{}},owner:{href:t}}},"d"))}function lr(t,e){var r=function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?sr(Object(r),!0).forEach((function(e){ur(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):sr(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},t);for(var n in r)r.hasOwnProperty(n)&&(r[n]&&"object"===ar(r[n])&&-1===n.indexOf(":")?(r["".concat(e,":").concat(n)]=lr(r[n],e),delete r[n]):!1===/^@_/.test(n)&&(r["".concat(e,":").concat(n)]=r[n],delete r[n]));return r}function fr(t,e,r){return r?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}function hr(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}var pr=hr((function(t,e,r){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},o=ht({url:j(t.remoteURL,x(e)),method:"UNLOCK",headers:{"Lock-Token":r}},t,n);return fr(ft(o),(function(e){if(ge(t,e),204!==e.status&&200!==e.status)throw de(e)}))})),dr=hr((function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=r.refreshToken,o=r.timeout,i={Accept:"text/plain,application/xml",Timeout:void 0===o?gr:o};n&&(i.If=n);var a=ht({url:j(t.remoteURL,x(e)),method:"LOCK",headers:i,data:cr(t.contactHref)},t,r);return fr(ft(a),(function(e){return ge(t,e),fr(e.text(),(function(t){var r,n=(r=t,new be.XMLParser({removeNSPrefix:!0,parseAttributeValue:!0,parseTagValue:!0}).parse(r)),o=xe().get(n,"prop.lockdiscovery.activelock.locktoken.href"),i=xe().get(n,"prop.lockdiscovery.activelock.timeout");if(!o)throw de(e,"No lock token received: ");return{token:o,serverTimeout:i}}))}))})),gr="Infinite, Second-4100000000";function vr(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function yr(t,e,r){return r?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}var mr=function(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=e.path||"/",n=ht({url:j(t.remoteURL,r),method:"PROPFIND",headers:{Accept:"text/plain,application/xml",Depth:"0"}},t,e);return yr(ft(n),(function(r){return ge(t,r),yr(r.text(),(function(t){return yr(Pe(t),(function(t){var n=function(t){try{var e=(o=t.multistatus.response,i=1,function(t){if(Array.isArray(t))return t}(o)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i=[],a=!0,s=!1;try{for(r=r.call(t);!(a=(n=r.next()).done)&&(i.push(n.value),!e||i.length!==e);a=!0);}catch(t){s=!0,o=t}finally{try{a||null==r.return||r.return()}finally{if(s)throw o}}return i}}(o,i)||function(t,e){if(t){if("string"==typeof t)return vr(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?vr(t,e):void 0}}(o,i)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())[0].propstat.prop,r=e["quota-used-bytes"],n=e["quota-available-bytes"];return void 0!==r&&void 0!==n?{used:parseInt(r,10),available:Ne(n)}:null}catch(t){}var o,i;return null}(t);return ve(r,n,e.details)}))}))}))}));function br(t,e,r){return r?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}var wr=function(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=r.details,o=void 0!==n&&n,i=ht({url:j(t.remoteURL,x(e)),method:"SEARCH",headers:{Accept:"text/plain,application/xml","Content-Type":t.headers["Content-Type"]||"application/xml; charset=utf-8"}},t,r);return br(ft(i),(function(r){return ge(t,r),br(r.text(),(function(t){return br(Pe(t),(function(t){var n=function(t,e,r){var n={truncated:!1,results:[]};return n.truncated=t.multistatus.response.some((function(t){var r,n;return"507"===(null===(r=(t.status||(null===(n=t.propstat)||void 0===n?void 0:n.status)).split(" ",3))||void 0===r?void 0:r[1])&&t.href.replace(/\/$/,"").endsWith(x(e).replace(/\/$/,""))})),t.multistatus.response.forEach((function(t){if(void 0!==t.propstat){var e=t.href.split("/").map(decodeURIComponent).join("/");n.results.push(Se(t.propstat.prop,e,r))}})),n}(t,e,o);return ve(r,n,o)}))}))}))})),xr=function(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e,r){var n,o,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},a=ht({url:j(t.remoteURL,x(e)),method:"MOVE",headers:{Destination:j(t.remoteURL,x(r))}},t,i);return o=function(e){ge(t,e)},(n=ft(a))&&n.then||(n=Promise.resolve(n)),o?n.then(o):n})),Or=r(918),Ar=function(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e,r){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},o=n.contentLength,i=void 0===o||o,a=n.overwrite,s=void 0===a||a,u={"Content-Type":"application/octet-stream"};!1===i||(u["Content-Length"]="".concat("number"==typeof i?i:function(t){if(ot(t))return t.byteLength;if(it(t))return t.length;if("string"==typeof t)return(0,Or.k)(t);throw new g({info:{code:_.DataTypeNoLength}},"Cannot calculate data length: Invalid type")}(r))),s||(u["If-None-Match"]="*");var c,l,f=ht({url:j(t.remoteURL,x(e)),method:"PUT",headers:u,data:r},t,n);return l=function(e){try{ge(t,e)}catch(t){var r=t;if(412!==r.status||s)throw r;return!1}return!0},(c=ft(f))&&c.then||(c=Promise.resolve(c)),l?c.then(l):c})),jr="https://github.com/perry-mitchell/webdav-client/blob/master/LOCK_CONTACT.md";function Pr(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=r.authType,o=void 0===n?null:n,i=r.remoteBasePath,a=r.contactHref,s=void 0===a?jr:a,u=r.ha1,c=r.headers,l=void 0===c?{}:c,f=r.httpAgent,h=r.httpsAgent,p=r.password,d=r.token,v=r.username,y=r.withCredentials,m=o;m||(m=v||p?I.Password:I.None);var b,w,O={authType:m,remoteBasePath:i,contactHref:s,ha1:u,headers:Object.assign({},l),httpAgent:f,httpsAgent:h,password:p,remotePath:(b=t,w=new(e())(b).pathname,w.length<=0&&(w="/"),A(w)),remoteURL:t,token:d,username:v,withCredentials:y};return function(t,e,r,n,o){switch(t.authType){case I.Digest:t.digest=function(t,e,r){return{username:t,password:e,ha1:r,nc:0,algorithm:"md5",hasDigestAuth:!1}}(e,r,o);break;case I.None:break;case I.Password:t.headers.Authorization=function(t,e){var r,n=(r="".concat(t,":").concat(e),k().encode(r));return"Basic ".concat(n)}(e,r);break;case I.Token:t.headers.Authorization="".concat((i=n).token_type," ").concat(i.access_token);break;default:throw new g({info:{code:_.InvalidAuthType}},"Invalid auth type: ".concat(t.authType))}var i}(O,v,p,d,u),{copyFile:function(t,e,r){return me(O,t,e,r)},createDirectory:function(t,e){return Ve(O,t,e)},createReadStream:function(t,e){return function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=new(0,qe().PassThrough);return He(t,e,r).then((function(t){t.pipe(n)})).catch((function(t){n.emit("error",t)})),n}(O,t,e)},createWriteStream:function(t,e,r){return function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:Xe,o=new(0,qe().PassThrough),i={};!1===r.overwrite&&(i["If-None-Match"]="*");var a=ht({url:j(t.remoteURL,x(e)),method:"PUT",headers:i,data:o,maxRedirects:0},t,r);return ft(a).then((function(e){return ge(t,e)})).then((function(t){setTimeout((function(){n(t)}),0)})).catch((function(t){o.emit("error",t)})),o}(O,t,e,r)},customRequest:function(t,e){return Ze(O,t,e)},deleteFile:function(t,e){return Ye(O,t,e)},exists:function(t,e){return Ke(O,t,e)},getDirectoryContents:function(t,e){return Qe(O,t,e)},getFileContents:function(t,e){return or(O,t,e)},getFileDownloadLink:function(t){return function(t,e){var r=j(t.remoteURL,x(e)),n=/^https:/i.test(r)?"https":"http";switch(t.authType){case I.None:break;case I.Password:var o=C(t.headers.Authorization.replace(/^Basic /i,"").trim());r=r.replace(/^https?:\/\//,"".concat(n,"://").concat(o,"@"));break;default:throw new g({info:{code:_.LinkUnsupportedAuthType}},"Unsupported auth type for file link: ".concat(t.authType))}return r}(O,t)},getFileUploadLink:function(t){return function(t,e){var r="".concat(j(t.remoteURL,x(e)),"?Content-Type=application/octet-stream"),n=/^https:/i.test(r)?"https":"http";switch(t.authType){case I.None:break;case I.Password:var o=C(t.headers.Authorization.replace(/^Basic /i,"").trim());r=r.replace(/^https?:\/\//,"".concat(n,"://").concat(o,"@"));break;default:throw new g({info:{code:_.LinkUnsupportedAuthType}},"Unsupported auth type for file link: ".concat(t.authType))}return r}(O,t)},getHeaders:function(){return Object.assign({},O.headers)},getQuota:function(t){return mr(O,t)},lock:function(t,e){return dr(O,t,e)},moveFile:function(t,e,r){return xr(O,t,e,r)},putFileContents:function(t,e,r){return Ar(O,t,e,r)},search:function(t,e){return wr(O,t,e)},setHeaders:function(t){O.headers=Object.assign({},t)},stat:function(t,e){return ke(O,t,e)},unlock:function(t,e,r){return pr(O,t,e,r)}}}})();var o=n.Gr,i=n.jK,a=n.cf,s=n.HM,u=n.eI,c=n.lD,l=n.yY,f=n.sw,h=n.np,p=n._M;

/***/ }),

/***/ "./src/block/block.json":
/*!******************************!*\
  !*** ./src/block/block.json ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"create-block/nextcloud-block-plugin","version":"0.1.0","title":"Nextcloud Folder","category":"widgets","icon":"cloud","description":"Display a Nextcloud directory tree in a block.","example":{},"supports":{"html":false,"anchor":true},"textdomain":"nextcloud-block-plugin","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","viewScript":"file:./view.js","attributes":{"folderLink":{"type":"string","source":"attribute","selector":"div","attribute":"data-folder-link","default":"https://cloud.rpi-virtuell.de/index.php/s/GzXnLEDLxidtcyD"},"proxyurl":{"type":"string","default":"https://proxy.rpi-virtuell.de/webdav/"},"rootFolder":{"type":"string","default":"/"}}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"block/index": 0,
/******/ 			"block/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunknextcloud_block_plugin"] = globalThis["webpackChunknextcloud_block_plugin"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["block/style-index"], () => (__webpack_require__("./src/block/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map