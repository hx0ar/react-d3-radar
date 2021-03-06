// @flow
import React from 'react';
import type {TickScale} from './types';

type RadarAxisProps = {
  scale: TickScale,
  offsetAngle: number,
  domainMax: number,
  label: string,
  color: string,
  style?: {},
};

const defaultRadarAxisStyle = {
  axisOverreach: 1.1,
  labelOverreach: 1.23,
  fontSize: 10,
  fontFamily: 'sans-serif',
  textFill: 'black',
  axisWidth: 2,
};

export default function RadarAxis(props: RadarAxisProps) {
  const {scale, offsetAngle, domainMax, label, color, style} = props;
  const {
    axisOverreach,
    labelOverreach,
    fontSize,
    fontFamily,
    textFill,
    axisWidth,
  } = {...defaultRadarAxisStyle, style};
  const xFactor = Math.cos(offsetAngle - Math.PI / 2);
  const yFactor = Math.sin(offsetAngle - Math.PI / 2);
  const lineToX = scale(domainMax * axisOverreach) * xFactor;
  const lineToY = scale(domainMax * axisOverreach) * yFactor;
  let labelX = scale(domainMax * labelOverreach) * xFactor;
  let labelY = scale(domainMax * labelOverreach) * yFactor;
  return (
    <g>
      <line
        x1={0}
        y1={0}
        x2={lineToX}
        y2={lineToY}
        stroke={color}
        strokeWidth={axisWidth}
      />
      <text
        x={labelX}
        y={labelY}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fill={textFill}
        textAnchor={'middle'}
        dy={'0.35em'}
      >
        {label.split('\n').map((part, index) => (
          <tspan x={labelX} dy={index === 0 ? '0.6em' : '1.2em'} key={part}>
            {part}
          </tspan>
        ))}
      </text>
    </g>
  );
}
