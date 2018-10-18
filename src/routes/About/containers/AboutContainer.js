import { connect } from 'react-redux'
import { myAction } from '../modules/about';

import About from '../components/About'

const mapDispatchToProps = {
  myAction : (a) => myAction(a),
}

const mapStateToProps = (state) => ({
  str : state.about
})

export default connect(mapStateToProps, mapDispatchToProps)(About)
