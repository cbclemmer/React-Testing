import { connect } from 'react-redux'
import Nav from '../page-partials/nav'

export default connect(
  (state: any) => ({
    isAuthenticated: state.isAuthenticated
  }),
  () => ({ })
)(Nav)
