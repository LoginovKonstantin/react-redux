import React from 'react'
import PropTypes from 'prop-types'

export const About = ({ str, myAction }) => (
  <div style={{ margin: '0 auto' }} >
    <h2>About</h2>
    <button className='btn btn-primary' onClick={() =>myAction(2)}>
      Go to my action {str}
    </button>
  </div>
)
About.propTypes = {
  myAction: PropTypes.func,
  str: PropTypes.number
}

export default About
