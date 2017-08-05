import React, { Component } from "react";
import Menu from "./menu";
import Player from "./player";
import { About, Settings, Shaders, OpenURL } from "./modals.js";
import "./style.scss";
const awoo = require("./res/assets/logo.png");

class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      file: null,
      playing: false,
      url: ""
    };
  }

  componentWillMount = () => {
    setTimeout(() => {
      document.querySelector(".frame").style.transform = "scale(0.6)";
      document.querySelector(".frame").style.filter = "blur(20px)";
      document.querySelector(".frame").style.opacity = "0";
      setTimeout(() => {
        this.setState({ isLoading: false }, () => {
          document.querySelector(".frame").style.transform = "initial";
          document.querySelector(".frame").style.filter = "initial";
          document.querySelector(".frame").style.opacity = "1";
        });
      }, 1000);
    }, 1500);
  };

  _setVideo = e => {
    this.setState({ file: e[0], playing: true });
  };

  _setVideoURL = e => {
    if (this.state.url) {
      this.setState({ file: this.state.url, playing: true });
    } else {
      return;
    }
  };

  _stopPlay = () => {
    this.setState({ file: null });
  };

  _togglePlay = () => {
    this.setState({ playing: !this.state.playing });
  };

  render() {
    const { state, props } = this;
    if (state.isLoading) {
      return <Loading />;
    }
    return (
      <div className="frame">
        <Menu
          setVideo={this._setVideo}
          stopVideo={this._stopPlay}
          togglePlaying={this._togglePlay}
        />
        <Settings settings={state.settings} />
        <About about={state.about} />
        <OpenURL
          openUrl={state.openUrl}
          urlChange={e => this.setState({ url: e.target.value })}
          loadURL={this._setVideoURL.bind(this)}
        />
        <Shaders shaders={state.shaders} />
        <Player playing={state.playing} file={state.file} />
      </div>
    );
  }
}

const Loading = props =>
  <div className="frame">
    <div className="absolute-center">
      <img src={awoo} alt="" />
    </div>
  </div>;

export default Frame;
