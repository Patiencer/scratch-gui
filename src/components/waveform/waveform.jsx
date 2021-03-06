import React from 'react';
import PropTypes from 'prop-types';
import styles from './waveform.css';

const Waveform = props => {
    const {
        width,
        height,
        data
    } = props;

    const cappedData = [0, ...data, 0];

    const points = [
        ...cappedData.map((v, i) =>
            [width * i / cappedData.length, height * v / 2]
        ),
        ...cappedData.reverse().map((v, i) =>
            [width * (cappedData.length - i - 1) / cappedData.length, -height * v / 2]
        )
    ];

    const pathComponents = points.map(([x, y], i) => {
        const [nx, ny] = points[i < points.length - 1 ? i + 1 : 0];
        return `Q${x} ${y} ${(x + nx) / 2} ${(y + ny) / 2}`;
    });

    return (
        <svg
            height={height}
            width={width}
        >
            <g transform={`scale(1, -1) translate(0, -${height / 2})`}>
                <path
                    className={styles.waveformPath}
                    d={`M0 0${pathComponents.join()}Z`}
                    strokeLinejoin={'round'}
                    strokeWidth={2}
                />
            </g>
        </svg>
    );
};

Waveform.propTypes = {
    data: PropTypes.arrayOf(PropTypes.number),
    height: PropTypes.number,
    width: PropTypes.number
};

module.exports = Waveform;
