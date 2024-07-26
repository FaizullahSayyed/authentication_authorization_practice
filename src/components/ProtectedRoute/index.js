import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

// import Home from '../Home' we don't need since we are getting Home from props

const ProtectedRoute = props => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }
  //   return <Route exact path="/" component={Home} />
  return <Route {...props} />
}

export default ProtectedRoute
