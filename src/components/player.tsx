import { withStyles } from '@material-ui/core';
import React from 'react';
import ReactPlayer from 'react-player';

interface IVideoPlayerProps {
  playing: boolean;
  source: string | string[];
  classes: any;
}

const styles = (theme: any) => ({
  root: {}
});

class Player extends React.Component<IVideoPlayerProps> {
  public state = {};

  constructor(props: any) {
    super(props);
  }

  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ReactPlayer playing={this.props.playing} url={this.props.source} />
      </div>
    );
  }
}

export default withStyles(styles)(Player);
