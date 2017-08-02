import React, { Component } from 'react'

import ReactPlayer from 'react-player'

const {
  ReactMPV
} = require('mpv.js')


export default class Player extends Component {
  constructor (props) {
    super(props)
    this.mpv = null
    this.state = {
      playing: false,
      "time-pos": 0,
      media: null
    }
    this.handleMPVReady = this.handleMPVReady.bind(this);
    this.handlePropertyChange = this.handlePropertyChange.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.togglePause = this.togglePause.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleSeek = this.handleSeek.bind(this);
    this.handleSeekMouseDown = this.handleSeekMouseDown.bind(this);
    this.handleSeekMouseUp = this.handleSeekMouseUp.bind(this);
  }
  componentWillMount() {
    
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.file !== this.props.media) {
      if (nextProps.file) {
        this._loadVideo(nextProps.file)
      } else {
        this._removeVideo()
      }
    }
    if (nextProps.playing !== this.state.playing) {

      if (this.mpv) {
        if (nextProps.isPlaying) {
        if (!this.state.duration) return;
         this.mpv.property("pause", false);
      } else {
        if (!this.state.duration) return;
       this.mpv.property("pause", true);
      }
      } else {
        if (nextProps.isPlaying) {
        this.setState({playing: true})
      } else {
        this.setState({playing: false})
      }
      }
    }
  }

  _removeVideo = () => {
    if (this.mpv) this.handleStop()
      setTimeout(() => {
        this.setState({playing: false, media: null})
            console.log('[lee] Media stopped and removed. Directory list shown.')
      }, 1000)
  }
  
  _loadVideo = (e) => {
    if (e.includes('http')) {
      this.setState({media: e, playing: true})
    console.info('[lee] Media received and playing!')
    } else {
       console.info('[lee] Media received, loading MPV!')
      this.setState({media: e}, () => {
        if (this.mpv) this.handleStop()
        setTimeout(() => {
        this.mpv.command("loadfile", this.state.media, 'append-play')
        this.mpv.property('pause', false)
         console.info('[lee] MPV playing!')
        }, 1000);
      })
    }
    }


  // MPV.js
  handleMPVReady(mpv) {
    this.mpv = mpv; 
    const observe = mpv.observe.bind(mpv);
    ["pause", "time-pos", "duration", "eof-reached"].forEach(observe);
  }
  handlePropertyChange(name, value) {
     if (name === "time-pos" && this.seeking) {
      return;
    } else if (name === "eof-reached" && value) {
      this.mpv.property("time-pos", 0);
    } else {
      this.setState({[name]: value});
    }
  }
   toggleFullscreen() {
    if (this.state.fullscreen) {
      document.webkitExitFullscreen();
    } else {
      this.mpv.fullscreen();
    }
    this.setState({fullscreen: !this.state.fullscreen});
  }
  togglePause(e) {
    e.target.blur();
    if (!this.state.duration) return;
    this.mpv.property("pause", !this.state.pause);
  }
  handleStop(e) {
    this.mpv.property("pause", true);
    this.mpv.command("stop");
    this.setState({"time-pos": 0, duration: 0});
  }
  handleSeekMouseDown() {
    this.seeking = true;
  }
  handleSeek(e) {
    e.target.blur();
    const timePos = +e.target.value;
    this.setState({"time-pos": timePos});
    this.mpv.property("time-pos", timePos);
  }
  handleSeekMouseUp() {
    this.seeking = false;
  }






  // ReactPlayer
  playPause = () => {
    this.setState({ playing: !this.state.playing })
  }
  setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }
  mute = e => {
    if (this.state.volume > 0) {
      this.setState({ volume: 0 })
    } else {
      this.setState({ volume: 0.8})
    }
  }
  setPlaybackRate = e => {
    console.log(parseFloat(e.target.value))
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }
  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }
  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }
  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }
  onProgress = state => {
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }
  render () {
    const { state, props } = this // If it's an URL, we use ReactPlayer (a <video> wrapper), if it's a file, we use mpv.js
    return (
      <div id='player' className='playerContainer'>
      {state.media ? state.media.includes('http') ? <div id='media'>
        <ReactPlayer className='media'
        playing={state.playing}
          height='100%'
          width='100%'
          controls
          url={state.media}
          ref={player => { this.player = player }}
          playbackRate={state.playbackRate}
          volume={state.volume}
          onReady={() => this.setState({ playing: true, buffering: false })}
          onStart={() => console.info('[lee] Playback started!')}
          onPlay={() => {
            this.setState({ playing: true })
          }}
          onPause={() => {
            this.setState({ playing: false })
          }}
          onBuffer={() => this.setState({ buffering: true })}
          onEnded={() => {
            this.setState({ playing: false })
          }}
          onError={e => {
            console.log('onError', e)
            this.setState({ errorOn: true, errorMsg: e.path[0].attributes.src.value})
          }}
          onProgress={this.onProgress}
          onDuration={duration => this.setState({ duration })}
          fileConfig={{
            attributes: {
              crossOrigin: 'anonymous'
            },
            tracks: [
              {kind: 'subtitles', src: state.subtitles, srcLang: 'en', default: true}
            ]
          }}
          /></div>
        :
          <div id='media'><ReactMPV
        className="mpv"
        onReady={this.handleMPVReady}
        onPropertyChange={this.handlePropertyChange}
       />
       
       <div className="controls">
          <div className='controls-flex'>
          <button className="control" onClick={this.togglePause}><i className='material-icons'>{this.state.pause ? 'play_arrow' : 'pause'}</i>
          </button>
          <input
            className="seek"
            type="range"
            min={0}
            step={0.1}
            max={this.state.duration}
            value={this.state["time-pos"]}
            onChange={this.handleSeek}
            onMouseDown={this.handleSeekMouseDown}
            onMouseUp={this.handleSeekMouseUp}
          />
           <button className="control" onClick={this.toggleFullscreen}><i className='material-icons'>fullscreen</i></button>
        </div>
        </div>
       
       
       
       
       
       
       
      
       </div>
      : null}
      </div>
    )
  }
}
