import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  withStyles
} from '@material-ui/core';
import React from 'react';
import Ripple from '../assets/Ripple.mp4';

const styles = (theme: any) => ({
  grid: {
    flexDirection: 'column'
  },
  bannerGrid: {
    padding: theme.spacing.unit * 8,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    paddingTop: theme.mixins.toolbar.minHeight * 2
  },
  bannerVideo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.1) grayscale(1)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1
  },
  bannerButtons: {
    marginTop: theme.spacing.unit * 4
  },
  section: {
    width: '100%'
  },
  sectionTitle: {
    padding: theme.spacing.unit * 4
  },
  sectionGrid: {
    padding: `0 ${theme.spacing.unit * 4}px`
  }
});

class Home extends React.Component<any> {
  public video: HTMLVideoElement | null;

  public constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    (this.video as HTMLVideoElement).playbackRate = 0.5;
  }

  public render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container={true} className={classes.grid}>
          <Grid item={true} xs={'auto'} className={classes.bannerGrid}>
            <video
              src={Ripple}
              muted={true}
              loop={true}
              autoPlay={true}
              ref={video => (this.video = video)}
              className={classes.bannerVideo}
            />
            <Typography style={{ fontWeight: 700 }} variant="display2">
              Lee. A place for your media, online and offline.
            </Typography>
            <Typography variant="title">
              What would you like to do today?
            </Typography>
            <Grid
              container={true}
              spacing={8}
              className={classes.bannerButtons}
            >
              <Grid item={true}>
                <Button variant="outlined">Listen to music</Button>
              </Grid>
              <Grid item={true}>
                <Button variant="outlined">Watch videos</Button>
              </Grid>
              <Grid item={true}>
                <Button variant="outlined">Discover what's being shared</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item={true} xs={'auto'} className={classes.section}>
            <Typography className={classes.sectionTitle} variant="title">
              Newly shared
            </Typography>
            <Grid className={classes.sectionGrid} container={true} spacing={8}>
              <Grid item={true}>
                <Card>
                  <CardMedia />
                  <CardContent>
                    <Typography variant="title">A</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item={true}>
                <Card>
                  <CardMedia />
                  <CardContent>
                    <Typography variant="title">B</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item={true}>
                <Card>
                  <CardMedia />
                  <CardContent>
                    <Typography variant="title">C</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item={true} xs={'auto'} className={classes.section}>
            <Typography className={classes.sectionTitle} variant="title">
              Local Music
            </Typography>
            <Grid className={classes.sectionGrid} container={true} spacing={8}>
              <Grid item={true}>
                <Card>
                  <CardMedia />
                  <CardContent>
                    <Typography variant="title">C</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item={true} xs={'auto'} className={classes.section}>
            <Typography className={classes.sectionTitle} variant="title">
              Local Video
            </Typography>
            <Grid className={classes.sectionGrid} container={true} spacing={8}>
              <Grid item={true}>
                <Card>
                  <CardMedia />
                  <CardContent>
                    <Typography variant="title">C</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles as any)(Home);
