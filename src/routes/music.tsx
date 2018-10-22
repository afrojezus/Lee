import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  withStyles
} from '@material-ui/core';
import * as MICON from '@material-ui/icons';
import React from 'react';
// import Ripple from '../assets/MusicBG.png';

const styles = (theme: any) => ({
  grid: {
    flexDirection: 'column'
  },
  bannerGrid: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    paddingTop: theme.mixins.toolbar.minHeight,
    background: 'rgba(0,0,0,.8)'
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
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

class Music extends React.Component<any> {
  public constructor(props: any) {
    super(props);
  }

  public render() {
    const { classes } = this.props;
    return (
      <div className="routeContainer">
        <Grid container={true} className={classes.grid}>
          <Grid item={true} xs={'auto'} className={classes.bannerGrid}>
            <Toolbar>
              <Typography>Amount of music on your PC</Typography>
              <div style={{ flex: 1 }} />
              <IconButton>
                <MICON.MoreHorizOutlined />
              </IconButton>
            </Toolbar>
          </Grid>
          <Grid item={true} xs={'auto'} className={classes.section}>
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
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles as any)(Music);
