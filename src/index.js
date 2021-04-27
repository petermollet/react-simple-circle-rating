import React from "react"
import PropTypes from 'prop-types';

const RATIO = 2.65
const COLOR_DEFAULT = ["#28a745","#ffc107","#dc3545"]

const cleanPercentage = (percentage) => {
    const tooLow = !Number.isFinite(+percentage) || percentage < 0
    const tooHigh = percentage > 100
    return tooLow ? 0 : tooHigh ? 100 : +percentage
}

const colorFg = (color, percentage) => {
    const isArray = Array.isArray(color)
    return (isArray && color.length===3) ?  colorsPercentage(color, percentage) 
                : isArray ? color[0] 
                    : color ?? colorsPercentage(COLOR_DEFAULT, percentage)
} 

const colorsPercentage = (colors, percentage) => {
    return percentage>60 ? colors[0] 
            : percentage>40 ? colors[1]
                : colors[2]
} 

const Circle = ({ color, pct, size, center }) => {
    const radius = size;
    const circ = 2 * Math.PI * radius;
    const strokePct = ((100 - pct) * circ) / 100;
    const width = center ? size/60 : size/25
    const cdiff = (200 - size * RATIO)/2
    return (
        <circle
            r={radius}
            cx={100 + cdiff}
            cy={100 - cdiff}
            fill="transparent"
            stroke={color}
            strokeWidth={`${width}rem`}
            strokeDasharray={circ}
            strokeDashoffset={pct ? strokePct : 0}
            strokeLinecap="round"
        />
    )
}

const Text = ({ percentage, color, size }) => {
    const width = size/15
    return (
        <text
            x="50%"
            y="48%"
            dominantBaseline="central"
            textAnchor="middle"
            fontSize={`${width}rem`}
            style={{ fill: color}}
        >
            {percentage.toFixed(0)}
        </text>
    )
}

export const ProgressCircle = ({ percentage, color, colorBackground, textColor, size }) => {
    const pct = cleanPercentage(percentage);
    const width = size * RATIO
    return (
        <svg width={width} height={width}>
            <g transform={`rotate(-90 ${"100 100"})`}>
                <Circle color={colorBackground} size={size} />
                <Circle color={colorFg(color, pct)} pct={pct} size={size} center />
            </g>
            <Text percentage={pct} color={textColor??'white'} size={size}/>
        </svg>
    )
}

ProgressCircle.propTypes = {
    percentage: PropTypes.number.isRequired, 
    color: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string
    ]),
    colorBackground: PropTypes.string, 
    textColor: PropTypes.string, 
    size: PropTypes.number,
}

ProgressCircle.defaultProps = {
    color:COLOR_DEFAULT,
    colorBackground:"#070707",
    textColor:"black",
    size:20
}