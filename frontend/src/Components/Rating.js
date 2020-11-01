import React from 'react'
import PropTypes from 'prop-types'

import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'

const Rating = ({ value, text, color }) => {
    return (
        <div className='rating'>
            <span style={{ color }}>
                {value >= 1 ? <FaStar /> : value >= 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span style={{ color }}>
                {value >= 2 ? <FaStar /> : value >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span style={{ color }}>
                {value >= 3 ? <FaStar /> : value >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span style={{ color }}>
                {value >= 4 ? <FaStar /> : value >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span style={{ color }}>
                {value >= 5 ? <FaStar /> : value >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span>{text && text}</span>
        </div>
    )
}

Rating.defaultProps = {
    color: 'red'
}

Rating.propTypes = {
    value: PropTypes.number,
    text: PropTypes.string,
    color: PropTypes.string,
}

export default Rating
