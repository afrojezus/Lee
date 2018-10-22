import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  withStyles
} from '@material-ui/core';
import React from 'react';

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
    filter: 'brightness(0.1)',
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
  },
  userAvatar: {
    height: 192,
    width: 192,
    margin: 'auto'
  }
});

class User extends React.Component<any> {
  public constructor(props: any) {
    super(props);
  }

  public render() {
    const { classes } = this.props;
    return (
      <div className="routeContainer">
        <Grid container={true} className={classes.grid}>
          <Grid item={true} xs={'auto'} className={classes.bannerGrid}>
            <img
              src="https://cdn.discordapp.com/attachments/495368554678321163/502233186911387679/1508887494012.png"
              alt=""
              className={classes.bannerImage}
            />
            <Grid container={true}>
              <Grid item={true} style={{ marginRight: 32 }}>
                <Avatar
                  src="https://cdn.discordapp.com/attachments/495368554678321163/502233186911387679/1508887494012.png"
                  alt=""
                  className={classes.userAvatar}
                />
              </Grid>
              <Grid item={true} xs={true}>
                <Typography style={{ fontWeight: 700 }} variant="display2">
                  Anonymous
                </Typography>
                <Typography variant="title">A Lee User</Typography>
                <Grid
                  container={true}
                  spacing={8}
                  className={classes.bannerButtons}
                >
                  <Grid item={true}>
                    <Button color="primary" variant="outlined">
                      Follow
                    </Button>
                  </Grid>
                  <Grid item={true}>
                    <Button variant="outlined">Message</Button>
                  </Grid>
                  <div style={{ flex: 1 }} />
                  <Grid item={true}>
                    <Button
                      style={{ color: 'red', borderColor: 'red' }}
                      variant="outlined"
                    >
                      Block
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item={true} xs={'auto'} className={classes.section}>
            <Typography className={classes.sectionTitle} variant="title">
              Newly shared media
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
              Popular shared media
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
              Likes
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

export default withStyles(styles as any)(User);
