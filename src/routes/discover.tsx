import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  withStyles
} from '@material-ui/core';
import React from 'react';
import Ripple from '../assets/DiscoverBG.png';

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
  bannerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.7)',
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

class Discover extends React.Component<any> {
  public constructor(props: any) {
    super(props);
  }

  public render() {
    const { classes } = this.props;
    return (
      <div className="routeContainer">
        <Grid container={true} className={classes.grid}>
          <Grid item={true} xs={'auto'} className={classes.bannerGrid}>
            <img src={Ripple} alt="" className={classes.bannerImage} />
            <Typography style={{ fontWeight: 700 }} variant="display4">
              Discover
            </Typography>
            <Typography variant="title">
              Discover shared media within the span of 90 days.
            </Typography>
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
              Popular
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
              Favourites by the community
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

export default withStyles(styles as any)(Discover);
