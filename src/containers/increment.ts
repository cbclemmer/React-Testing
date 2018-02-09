import { connect } from 'react-redux'
import Hello from '../components/hello'

export default connect(
  (state: any) => ({
    counter: state.counter
  }),
  () => ({ })
)(Hello)
