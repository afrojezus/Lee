import React from 'react'
import {
    Grid, Col, Row
} from 'react-flexbox-grid'

import awoo from './res/assets/logo.png'

import pjson from '../package.json'

export const Settings = props => {
  return (
    <div id='settings' className={props.settings ? 'modal show' : 'modal'}>
      <h1>Settings</h1>
      <div className='space' />
      <button onClick={(e) => document.getElementById('settings').classList.remove('show')} className='button'>Close</button>
    </div>
  )
}

export const About = props => {
  return (
    <div id='about' className={props.about ? 'modal show' : 'modal'} style={{height: 'auto'}}>
      <img src={awoo} alt='' />
      <h1>Lee.js</h1>
      <h2>The 2K17 media player (JavaScript version)</h2>
      <span>Electron {process.versions.electron}, Chromium {process.versions.chrome}, Node {process.versions.node}, Lee {pjson.version} running on {process.env.os}</span>
      <br />
      <span>Plays every format you throw at it, including the most obscure ones. UI designed with modern web technologies of today.<br />Media playback powered by mpv.js and Chrome</span>
      <br />
      <span>Logo by elterrasense</span>
      <span>Developed by afroJ</span>
      <br />
      <div className='space' />
      <button onClick={(e) => document.getElementById('about').classList.remove('show')} className='button'>Close</button>
    </div>
  )
}

export const Shaders = props => {
  return (
    <div id='shaders' className={props.shaders ? 'modal show' : 'modal'}>
      <h1>Shaders</h1>
      <h2>Pick a shader (a lot of it is WIP)</h2>
      <span>CSS shaders</span>
      <Grid fluid className='modalGrid'>
        <Row className='modalRow'>
          <button className='button'>LeeSaturate</button>
          <button className='button'>LeeBrightness</button>
          <button className='button'>LeeContrast</button>
        </Row>
      </Grid>
      <span>HLSL shaders</span>
      <Grid fluid className='modalGrid'>
        <Row className='modalRow'>
          <button className='button'>LeeScanlines</button>
          <button className='button'>LeeBitcrush</button>
          <button className='button'>LeeWaifu2X</button>
        </Row>
      </Grid>
      <span>Video renderers</span>
      <Grid fluid className='modalGrid'>
        <Row className='modalRow'>
          <button className='button'>Chrome</button>
          <button className='button'>Retina</button>
          <button className='button'>MADVR</button>
        </Row>
      </Grid>
      <div className='space' />
      <div className='space' />
      <button onClick={(e) => document.getElementById('shaders').classList.remove('show')} className='button'>Close</button>
    </div>
  )
}

export const OpenURL = props => {
  return (
    <div id='openurl' className={props.openUrl ? 'modal show' : 'modal'} style={{height: 'auto'}}>
      <h1>Open Web URL</h1>
      <span>Enter the URL here</span>
      <Grid fluid className='modalGrid'>
        <Row className='modalRow'>
          <input style={{flex: 1}} placeholder='...' value={props.url} onChange={props.urlChange} />
          <button onClick={props.loadURL} className='button'><i className='material-icons'>search</i></button>
        </Row>
      </Grid>
      <div className='space' />
      <button onClick={(e) => document.getElementById('openurl').classList.remove('show')} className='button'>Close</button>
    </div>
  )
}
