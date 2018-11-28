import React from 'react'
import PropTypes from 'prop-types'

class EditEntity extends React.Component {
  static propTypes = {
    // store: PropTypes.object.isRequired,
    // routes: PropTypes.object.isRequired,
  }

  shouldComponentUpdate () {
    // return false
  }

  render () {
    console.log(window.location);
    return (
      <div>EDit</div>
    )
  }
}

export default EditEntity
