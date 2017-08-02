import 'react-hot-loader/patch'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Frame from './frame'

ReactDOM.render(<AppContainer><Frame /></AppContainer>, document.getElementById('app'))

if (module.hot) {
  module.hot.accept('./frame.js', () => {
    const NextRootContainer = require('./frame.js').default
    ReactDOM.render(<NextRootContainer />, document.getElementById('app'))
  })
}
