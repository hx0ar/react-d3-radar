'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = RadarAxis;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultRadarAxisStyle = {
  axisOverreach: 1.1,
  labelOverreach: 1.23,
  fontSize: 10,
  fontFamily: 'sans-serif',
  textFill: 'black',
  axisWidth: 2
};

function RadarAxis(props) {
  var scale = props.scale,
      offsetAngle = props.offsetAngle,
      domainMax = props.domainMax,
      label = props.label,
      color = props.color,
      style = props.style;

  var _defaultRadarAxisStyl = _extends({}, defaultRadarAxisStyle, { style: style }),
      axisOverreach = _defaultRadarAxisStyl.axisOverreach,
      labelOverreach = _defaultRadarAxisStyl.labelOverreach,
      fontSize = _defaultRadarAxisStyl.fontSize,
      fontFamily = _defaultRadarAxisStyl.fontFamily,
      textFill = _defaultRadarAxisStyl.textFill,
      axisWidth = _defaultRadarAxisStyl.axisWidth;

  var xFactor = Math.cos(offsetAngle - Math.PI / 2);
  var yFactor = Math.sin(offsetAngle - Math.PI / 2);
  var lineToX = scale(domainMax * axisOverreach) * xFactor;
  var lineToY = scale(domainMax * axisOverreach) * yFactor;
  var labelX = scale(domainMax * labelOverreach) * xFactor;
  var labelY = scale(domainMax * labelOverreach) * yFactor;
  return _react2.default.createElement(
    'g',
    null,
    _react2.default.createElement('line', {
      x1: 0,
      y1: 0,
      x2: lineToX,
      y2: lineToY,
      stroke: color,
      strokeWidth: axisWidth
    }),
    _react2.default.createElement(
      'text',
      {
        x: labelX,
        y: labelY,
        fontSize: fontSize,
        fontFamily: fontFamily,
        fill: textFill,
        textAnchor: 'middle',
        dy: '0.35em'
      },
      label.split('\n').map(function (part, index) {
        return _react2.default.createElement(
          'tspan',
          { x: labelX, dy: index === 0 ? '0.6em' : '1.2em', key: part },
          part
        );
      })
    )
  );
}