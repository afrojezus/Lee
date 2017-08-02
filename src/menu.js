import React, { Component } from 'react'
import electron from 'electron'

import menuSvg from './res/assets/icons8-Menu.svg'

export default class Menu extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  _shelfTheMenu = () => {
    var dropdowns = document.getElementsByClassName("appbarMenuContent");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
  

  _toggledev = () => {
    electron.remote.getCurrentWebContents().isDevToolsOpened() ? electron.remote.getCurrentWebContents().closeDevTools() : electron.remote.getCurrentWebContents().openDevTools()
  }

  _openMenu = (e) => {
    document.getElementById('fileMenu').classList.toggle('show')
  }

  _close = () => electron.remote.getCurrentWindow().close()

  _openFile = (e) => {
    electron.remote.dialog.showOpenDialog({
      title: 'Open file',
      filters: [
        {
          name: 'Video',
          extensions: [
            'mkv',
            'avi',
            'mp4',
            'webm'
          ]
        },
        {
          name: 'Audio',
          extensions: [
            'mp3',
            'flac',
            'ogg',
            'wav',
            'aac',
            'alac',
            'm4a'
          ]
        }
      ],
      properties: [
        'openFile'
      ],
    }, (video) => {
      if (video) {
      this.props.setVideo(video)
      this._shelfTheMenu()
      } else {
        return
      }
    })
  }

  _hideTitleBar = () => {
    document.getElementById('appbar').classList.toggle('visible')
    document.getElementById('appbar-flex').classList.toggle('visible')
    this._shelfTheMenu()
  }

  _openAbout = () => {
    const player = document.getElementById('media')
    const about = document.getElementById('about')
    const isAboutVisible = document.getElementById('about').classList.contains('show')
    if (!isAboutVisible) {
      about.classList.add('show')
    } else {
      about.classList.remove('show')
    }
    this._shelfTheMenu()
  }

  _shaders = () => {
    const player = document.getElementById('media')
    const about = document.getElementById('shaders')
    const isAboutVisible = document.getElementById('shaders').classList.contains('show')
    if (!isAboutVisible) {
      about.classList.add('show')
    } else {
      about.classList.remove('show')
    }
    this._shelfTheMenu()
  }

  _openURL = () => {
    const player = document.getElementById('media')
    const about = document.getElementById('openurl')
    const isAboutVisible = document.getElementById('openurl').classList.contains('show')
    if (!isAboutVisible) {
      about.classList.add('show')
    } else {
      about.classList.remove('show')
    }
    this._shelfTheMenu()
  }

  _stopPlay = () => {
    this.props.stopVideo()
    this._shelfTheMenu()
  }

  _togglePlay = () => {
    this.props.togglePlaying()
    this._shelfTheMenu()
  }

  render () {
    return (
      <div className='appbar'>
        <div className='appbar-flex'>
          <div className='appbarMenu'>
            <div className='appbarButton' onClick={this._openMenu}><img src={menuSvg} alt='' /></div>
            <div id='fileMenu' className='appbarMenuContent'>
              <li onClick={this._openFile}>Open File</li>
              <li onClick={this._openDVD}>Open DVD/BD</li>
              <li onClick={this._openURL}>Open Web URL</li>
              <div className='seperator' />
              <li onClick={this._hideTitleBar}>Persistent Titlebar</li>
              <div className='seperator' />
              <li onClick={this._togglePlay}>Play/Pause</li>
              <li onClick={this._stopPlay}>Stop</li>
              <div className='seperator' />
              <li onClick={this._shaders}>Shaders</li>
              <div className='seperator' />
              <li onClick={this._volume}>Volume</li>
              <div className='seperator' />
              <li onClick={this._navPrev}>Previous</li>
              <li onClick={this._navNext}>Next</li>
              <li onClick={this._navTitleMenu}>Title Menu</li>
              <div className='seperator' />
              <li onClick={this._openChangeLog}>Changelog</li>
              <li onClick={this._openAbout}>About</li>
              <div className='seperator' />
              <a onClick={() => electron.shell.openExternal('http://www.google.com/')}>Get Help</a>
              <div className='seperator' />
              <li onClick={this._openSettings}>Settings</li>
              <div className='seperator' />
              <li onClick={this._close}>Exit</li>
            </div>
          </div>
          <div className='appbarSpace' />
        </div>
      </div>
    )
  }
}
