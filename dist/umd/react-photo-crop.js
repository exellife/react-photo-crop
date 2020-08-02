(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ReactPhotoCrop = {}, global.React));
}(this, (function (exports, React) { 'use strict';

  React = React && Object.prototype.hasOwnProperty.call(React, 'default') ? React['default'] : React;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  class Styles {
    constructor() {
      this.styles = {
        modal: {
          position: 'fixed',
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          height: '100%',
          width: '100%',
          background: 'rgba(0, 0, 0, 0.548)'
        },
        window: {
          position: 'relative',
          top: '15%',
          margin: '0 auto',
          padding: '20px',
          maxWidth: '600px',
          background: 'rgb(0, 0, 0)',
          borderRadius: '2px',
          boxShadow: '',
          display: 'flex',
          flexDirection: 'column'
        },
        cropOut: {
          position: 'relative',
          padding: '12px 12px 20px',
          overflow: 'hidden',
          background: 'transparent'
        },
        crop: {
          padding: '20px',
          display: 'block'
        },
        cropIn: {
          margin: 'auto',
          width: '240px',
          height: '240px',
          position: 'relative',
          display: 'block'
        },
        photoCrop: {
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'block'
        },
        img: {
          position: 'absolute',
          cursor: 'move'
        },
        after: {
          content: '',
          position: 'absolute',
          boxShadow: '0 0 100vw 10vh rgba(0, 0, 0, 0.788)',
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          borderRadius: '100%',
          pointerEvents: 'none'
        },
        zoom: {
          padding: '8px',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
        rangeWrap: {
          boxSizing: 'border-box',
          padding: '8px',
          width: '260px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
        range: {
          width: '100%',
          cursor: 'pointer'
        },
        rangeVal: {
          marginLeft: '4px'
        },
        buttons: {
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '10px 10px 0'
        },
        cancelBtn: {},
        actionBtn: {},
        inputFileBtn: {}
      };
      this.classes = {
        modal: ['rpc-modal'],
        window: ['rpc-window'],
        cropOut: ['rpc-crop-out'],
        crop: ['rpc-crop'],
        cropIn: ['rpc-crop-in'],
        photoCrop: ['rpc-photo-crop'],
        img: ['rpc-img'],
        after: ['rpc-after'],
        rangeWrap: ['rpc-range-wrap'],
        rangeVal: ['rpc-range-val'],
        cancelBtn: ['rpc-cancel-btn'],
        actionBtn: ['rpc-action-btn'],
        inputFileBtn: ['rpc-input-file']
      };
      this.ids = {
        photoCrop: 'rpc-photo-crop',
        img: 'rpc-img',
        zoom: 'rpc-zoom',
        buttons: 'rpc-buttons',
        inputFileBtn: 'rpc-input-file-btn'
      };
      this.nameValues = {
        inputFileBtn: 'Change',
        cancelBtn: 'Cancel',
        actionBtn: 'Upload'
      };
    }

    addStyle(target, style) {

      for (var k in this.styles) {
        if (k === target) {
          this.styles[k] = _objectSpread2(_objectSpread2({}, this.styles[k]), style);
        }
      }
    }

    addClassName(target, classNames) {
      if (this.classes[target]) {
        Array.isArray(classNames) ? this.classes[target] = this.classes[target].concat(classNames) : this.classes[target].push(classNames);
      }
    }

    removeClassName(target, className) {
      if (this.classes[target]) {
        var newClasses = [];

        for (var clsName of this.classes[target]) {
          if (clsName !== className) newClasses.push(className);
        }

        this.classes[target] = newClasses;
      }
    }

    setBtnName(target, name) {
      this.nameValues[target] = name;
    }

    get config() {
      return {
        styles: this.styles,
        classes: this.classes,
        ids: this.ids,
        nameValues: this.nameValues
      };
    }

  }

  var RPCStyles = new Styles();

  function evaluatePosition(str) {
    var reg = /([\-]?\d+)/gm;
    var data = str.match(reg);
    return [+data[1], +data[2], +data[3]];
  }

  var types = {
    open: 'open',
    close: 'close',
    setImageConfig: 'setImageConfig',
    setBoundaries: 'setBoundaries',
    setMouseCoords: 'setMouseCoords',
    setImageSrc: 'setImageSrc'
  };
  var initState = {
    open: false,
    imageConfig: {
      width: '',
      height: '',
      top: '50%',
      left: '50%',
      transform: ''
    },
    boundaries: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    imageSrc: ''
  };
  function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case types.open:
        return _objectSpread2(_objectSpread2({}, state), {}, {
          open: true
        });

      case types.close:
        return _objectSpread2(_objectSpread2({}, state), {}, {
          open: false
        });

      case types.setImageConfig:
        return _objectSpread2(_objectSpread2({}, state), {}, {
          imageConfig: _objectSpread2(_objectSpread2({}, state.imageConfig), action.payload)
        });

      case types.setBoundaries:
        return _objectSpread2(_objectSpread2({}, state), {}, {
          boundaries: _objectSpread2({}, action.payload)
        });

      case types.setMouseCoords:
        return _objectSpread2(_objectSpread2({}, state), {}, {
          mouseCoords: _objectSpread2({}, action.payload)
        });

      case types.setImageSrc:
        {
          return _objectSpread2(_objectSpread2({}, state), {}, {
            open: true,
            imageSrc: action.payload
          });
        }

      default:
        throw Error('Shouldn\'t have happend');
    }
  }

  var RPCContext = React.createContext(initState);

  var useEffect = React.useEffect;
  var useState = React.useState;
  var useContext = React.useContext;
  var useRef = React.useRef;

  function coords() {
    var coords = {
      x: null,
      y: null
    };

    function X() {
      return coords.x;
    }

    function Y() {
      return coords.y;
    }

    function setX(x) {
      coords.x = x;
    }

    function setY(y) {
      coords.y = y;
    }

    function getCoords() {
      return coords;
    }

    return {
      X,
      Y,
      setX,
      setY,
      getCoords
    };
  }

  function Img(_ref) {
    var {
      id,
      imgStyles,
      classNames
    } = _ref;
    var {
      state,
      setDimensions,
      setTransform,
      setImageBounds
    } = useContext(RPCContext);
    var imgRef = useRef();
    var imageSrc = state.imageSrc ? state.imageSrc : '';
    var [listen, setListen] = useState(false);

    var _coords = coords();

    useEffect(() => {
      setTransform('translate3d(-50%, -50%, 0)');
      setDimensions(imageSrc);
      var {
        top,
        bottom,
        left,
        right
      } = imgRef.current.getBoundingClientRect();
      setImageBounds({
        top,
        bottom,
        left,
        right
      });
    }, [imageSrc]);
    useEffect(() => {
      var {
        top,
        bottom,
        left,
        right
      } = imgRef.current.getBoundingClientRect();
      setImageBounds({
        top,
        bottom,
        left,
        right
      });
    }, [state.imageConfig]);

    function mouseMove(evt) {
      if (listen) {
        var el = evt.target;
        var {
          clientX,
          clientY
        } = evt;
        var {
          top,
          bottom,
          left,
          right
        } = el.getBoundingClientRect();
        setImageBounds({
          top,
          bottom,
          left,
          right
        });
        if (!_coords.X()) _coords.setX(clientX);
        if (!_coords.Y()) _coords.setY(clientY);
        var [x, y] = [_coords.X(), _coords.Y()];

        function _toTransform(direction) {
          var position = state.imageConfig.transform;
          var [a, b, c] = evaluatePosition(position);
          direction === 'right' ? a++ : direction === 'left' ? a-- : direction === 'down' ? b++ : direction === 'up' ? b-- : null;
          var toTransform = "translate3d(".concat(a, "%, ").concat(b, "%, ").concat(c, ")");
          setTransform(toTransform);
        }

        if (clientX > x) {
          _coords.setX(clientX - 1);

          if (left < state.boundaries.left) {
            _toTransform('right');
          }
        }

        if (clientX < x) {
          _coords.setX(clientX + 1);

          if (right > state.boundaries.right) {
            _toTransform('left');
          }
        }

        if (clientY > y) {
          _coords.setY(clientY - 1);

          if (top < state.boundaries.top) {
            _toTransform('down');
          }
        }

        if (clientY < y) {
          _coords.setY(clientY + 1);

          if (bottom > state.boundaries.bottom) {
            _toTransform('up');
          }
        }
      }
    }

    function mouseDown(e) {
      setListen(true);
    }

    function mouseUp(e) {
      setListen(false);
    }

    function mouseLeave(e) {
      setListen(false);
    }

    return React.createElement("img", {
      src: imageSrc,
      alt: "image being cropped...",
      ref: imgRef,
      id: id,
      draggable: false,
      style: _objectSpread2(_objectSpread2({}, imgStyles), state.imageConfig),
      onMouseDown: e => mouseDown(),
      onMouseUp: e => mouseUp(),
      onMouseMove: e => mouseMove(e),
      onMouseLeave: e => mouseLeave(),
      className: classNames
    });
  }

  var useEffect$1 = React.useEffect;
  var useRef$1 = React.useRef;
  var useContext$1 = React.useContext;
  function PhotoCrop(_ref) {
    var {
      id,
      pcStyles,
      classNames
    } = _ref;
    var {
      setBoundaries
    } = useContext$1(RPCContext);
    var pcRef = useRef$1();
    useEffect$1(() => {
      setBoundaries(pcRef.current);
    }, []);
    return React.createElement("div", {
      id: id,
      style: _objectSpread2({}, pcStyles),
      ref: pcRef,
      className: classNames
    });
  }

  var useState$1 = React.useState;
  var useContext$2 = React.useContext;
  function Zoom(_ref) {
    var {
      id,
      zoomStyles,
      rangeWrap,
      rangeStyles,
      rangeVal,
      classNames
    } = _ref;
    var {
      zoom
    } = useContext$2(RPCContext);
    var [value, setValue] = useState$1(0);
    var {
      rangeWrapCls,
      rangeValCls
    } = classNames;

    function handleRange(e) {
      e.preventDefault();
      zoom(+e.target.value);
      setValue(e.target.value);
    }

    return React.createElement("div", {
      id: id,
      style: _objectSpread2({}, zoomStyles)
    }, React.createElement("div", {
      className: rangeWrapCls,
      style: _objectSpread2({}, rangeWrap)
    }, React.createElement("input", {
      id: "rpc-range",
      type: "range",
      min: "0",
      max: "5",
      value: value,
      onChange: e => handleRange(e),
      step: "1",
      style: _objectSpread2({}, rangeStyles)
    }), React.createElement("span", {
      className: rangeValCls,
      style: _objectSpread2({}, rangeVal)
    }, value)));
  }

  var useContext$3 = React.useContext;
  function Buttons(_ref) {
    var {
      ids,
      btnStyles,
      btnNames,
      classNames,
      rpcHandler
    } = _ref;
    var {
      buttonId
    } = ids;
    var {
      closeModal
    } = useContext$3(RPCContext);
    var {
      actionBtn,
      cancelBtn
    } = classNames;
    var {
      actionBtnStyle,
      cancelBtnStyle,
      buttonStyles
    } = btnStyles;
    var {
      actionBtnName,
      cancelBtnName
    } = btnNames;

    function uploadHandler(e) {
      rpcHandler(e);
      closeModal();
    }

    return React.createElement("div", {
      id: buttonId,
      style: _objectSpread2({}, buttonStyles)
    }, React.createElement("button", {
      style: _objectSpread2({}, actionBtnStyle),
      className: actionBtn,
      onClick: e => uploadHandler(e)
    }, actionBtnName), React.createElement("button", {
      style: _objectSpread2({}, cancelBtnStyle),
      className: cancelBtn,
      onClick: e => closeModal()
    }, cancelBtnName));
  }

  class CropHandler {
    constructor() {
      this.imgInstance = null;
      this.boundaries = {};
      this._imageSrc = {};
      this.canvas = null;
      this.size = {
        width: '',
        height: ''
      };
    }

    set imageSrc(src) {
      this._imageSrc = src;
    }

    setBoundaries(_boundaries) {
      this.boundaries = _objectSpread2({}, _boundaries);
    }

    setImageBounds(_imgBounds) {
      this.imageBounds = _objectSpread2({}, _imgBounds);
    }

    setCanvas(canvas) {
      this.canvas = canvas;
    }

    setSize(size) {
      this.size = _objectSpread2({}, size);
    }

    getDataURL() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rpc-img';
      if (!id) id = 'rpc-img';
      var imgOriginal = document.getElementById(id);
      if (!imgOriginal) throw Error("Could not find any image with id ".concat(id, "... if you changed default styles, make sure to pass an 'id' to useRPC.getDataURL function in the component where it called"));
      var [oWidth, oHeight] = [imgOriginal.width, imgOriginal.height];
      var flag = false;
      var count = 20;
      var dataURL = '';
      var canvas = document.createElement('canvas');
      canvas.width = 240;
      canvas.height = 240;
      var ctx = canvas.getContext('2d');
      var targetPoints = this.boundaries;
      var imagePoints = this.imageBounds;
      var sx = targetPoints.left - imagePoints.left;
      var sy = targetPoints.top - imagePoints.top;
      var [sWidth, sHeight] = [240, 240];
      var img = new Image(oWidth, oHeight);

      img.onload = () => {
        var imgCanvas = document.createElement('canvas');
        imgCanvas.width = oWidth;
        imgCanvas.height = oHeight;
        var imgCtx = imgCanvas.getContext('2d');
        imgCtx.drawImage(img, 0, 0, oWidth, oHeight);
        ctx.drawImage(imgCanvas, sx, sy, sWidth, sHeight, 0, 0, 240, 240);
        dataURL = canvas.toDataURL();
        flag = true;
      };

      img.src = this._imageSrc;
      return new Promise((resolve, reject) => {
        function checkFlag() {
          if (count) {
            count--;
            if (flag) resolve(dataURL);
            if (!flag) setTimeout(checkFlag, 300);
          } else {
            reject('There is an issues reeding file');
          }
        }

        checkFlag();
      });
    }

  }

  var cropHandler = new CropHandler();

  var useContext$4 = React.useContext;
  var useEffect$2 = React.useEffect;
  var useRef$2 = React.useRef;
  function useRPC() {
    return {
      getDataURL: () => cropHandler.getDataURL()
    };
  }
  function RPCButton(_ref) {
    var {
      styles,
      classes,
      nameValues,
      ids
    } = _ref;
    var inputRef = useRef$2();
    var {
      state,
      setImageSrc
    } = useContext$4(RPCContext);
    useEffect$2(() => {
      if (!state.open) inputRef.current.value = "";
    }, [state.open]);

    function downloadFile(e) {
      var file = e.target.files[0];

      if (file) {
        var reader = new FileReader();

        reader.onload = evt => {
          setImageSrc(reader.result);
        };

        if (file.type && file.type.indexOf('image') === -1) {
          throw Error("File is not an image: ".concat(file.type, ", ").concat(file));
        }

        reader.readAsDataURL(file);
      }
    }

    return React.createElement("label", {
      htmlFor: ids.inputFileBtn,
      style: _objectSpread2({}, styles.inputFileBtnStyles),
      className: classes.inputFileBtn.join(" ")
    }, nameValues.inputFileBtn, React.createElement("input", {
      ref: inputRef,
      type: "file",
      accept: "image/png, image/jpeg, image/webp",
      id: ids.inputFileBtn,
      onChange: e => downloadFile(e),
      style: {
        visibility: 'hidden',
        width: '0.1px'
      }
    }));
  }
  function RPCModal(_ref2) {
    var {
      styles,
      classes,
      ids,
      nameValues,
      rpcHandler
    } = _ref2;
    if (!styles || !classes || !ids || !nameValues) throw Error('most likely RPCStyles configs were not passed to component -> RPCModal');
    if (!rpcHandler) throw Error("handler function wasn't provided to component -> RPCModal");
    var {
      state
    } = useContext$4(RPCContext);
    return React.createElement(React.Fragment, null, state.open ? React.createElement("div", {
      className: classes.modal.join(" "),
      style: _objectSpread2({}, styles.modal)
    }, React.createElement("div", {
      className: classes.window.join(" "),
      style: _objectSpread2({}, styles.window)
    }, React.createElement("div", {
      className: classes.cropOut.join(" "),
      style: _objectSpread2({}, styles.cropOut)
    }, React.createElement("div", {
      className: classes.crop.join(" "),
      style: _objectSpread2({}, styles.crop)
    }, React.createElement("div", {
      className: classes.cropIn.join(" "),
      style: _objectSpread2({}, styles.cropIn)
    }, React.createElement(PhotoCrop, {
      classNames: classes.photoCrop.join(" "),
      id: ids.photoCrop,
      pcStyles: styles.photoCrop
    }), React.createElement(Img, {
      imgStyles: styles.img,
      id: ids.img,
      classNames: classes.img.join(" ")
    }), React.createElement("div", {
      className: classes.after.join(" "),
      style: _objectSpread2({}, styles.after)
    })))), React.createElement(Zoom, {
      id: ids.zoom,
      zoomStyles: styles.zoom,
      rangeWrap: styles.rangeWrap,
      rangeStyles: styles.range,
      rangeVal: styles.rangeVal,
      classNames: {
        rangeWrapCls: classes.rangeWrap.join(' '),
        rangeValCls: classes.rangeVal.join(' ')
      }
    }), React.createElement(Buttons, {
      id: ids.buttons,
      ids: {
        buttonsId: ids.buttons
      },
      classNames: {
        cancelBtn: classes.cancelBtn.join(' '),
        actionBtn: classes.actionBtn.join(' ')
      },
      btnStyles: {
        actionBtnStyle: styles.actionBtn,
        cancelBtnStyle: styles.cancelBtn,
        buttonStyles: styles.buttons
      },
      btnNames: {
        cancelBtnName: nameValues.cancelBtn,
        actionBtnName: nameValues.actionBtn
      },
      rpcHandler: rpcHandler
    }))) : null);
  }

  var useReducer = React.useReducer;
  function RPCCtxState(_ref) {
    var {
      children
    } = _ref;
    var [state, dispatch] = useReducer(reducer, initState);

    function openModal() {
      dispatch({
        type: types.open
      });
    }

    function closeModal() {
      dispatch({
        type: types.close
      });
    }

    function setImageSrc(dataURL) {
      cropHandler.image = dataURL;
      dispatch({
        type: types.setImageSrc,
        payload: dataURL
      });
    }

    function setDimensions(defaultSrc) {
      var [a, b] = ['100%', 'auto'];
      var h, w;
      var img = new Image();

      img.onload = function () {
        [h, w] = img.height > img.width ? [b, a] : [a, b];
        dispatch({
          type: types.setImageConfig,
          payload: {
            width: w,
            height: h
          }
        });
      };

      img.src = defaultSrc;
      cropHandler.imageSrc = defaultSrc;
    }

    function setBoundaries(el) {
      var {
        top,
        bottom,
        left,
        right
      } = el.getBoundingClientRect();
      dispatch({
        type: types.setBoundaries,
        payload: {
          top,
          bottom,
          left,
          right
        }
      });
      cropHandler.setBoundaries({
        top,
        bottom,
        left,
        right
      });
    }

    function setImageBounds(bounds) {
      cropHandler.setImageBounds(bounds);
    }

    function setCanvas(canvas) {
      cropHandler.setCanvas(canvas);
    }

    function setTransform(toTransform) {
      dispatch({
        type: types.setImageConfig,
        payload: {
          transform: toTransform
        }
      });
    }

    function zoom(n) {
      if (n > 5 || n < 0) return;
      var size = n === 0 ? 100 : n === 1 ? 120 : n === 2 ? 140 : n === 3 ? 160 : n === 4 ? 180 : n === 5 ? 200 : null;
      var {
        width,
        height
      } = state.imageConfig;

      if (width === 'auto') {
        cropHandler.setSize({
          width,
          height: "".concat(size, "%")
        });
        dispatch({
          type: types.setImageConfig,
          payload: {
            width,
            height: "".concat(size, "%"),
            transform: 'translate3d(-50%, -50%, 0)'
          }
        });
      } else {
        cropHandler.setSize({
          width: "".concat(size, "%"),
          height
        });
        dispatch({
          type: types.setImageConfig,
          payload: {
            width: "".concat(size, "%"),
            height,
            transform: 'translate3d(-50%, -50%, 0)'
          }
        });
      }
    }

    return React.createElement(RPCContext.Provider, {
      value: {
        setBoundaries,
        setDimensions,
        setTransform,
        setImageBounds,
        setImageSrc,
        setCanvas,
        zoom,
        closeModal,
        openModal,
        state: state
      }
    }, children);
  }

  exports.RPCButton = RPCButton;
  exports.RPCCtxState = RPCCtxState;
  exports.RPCModal = RPCModal;
  exports.RPCStyles = RPCStyles;
  exports.useRPC = useRPC;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
