import {
  AppBar,
  Avatar,
  Button,
  Divider,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  Paper,
  Switch as MUISwitch,
  TextField,
  Toolbar,
  Typography,
  withStyles
} from '@material-ui/core';
import * as MICON from '@material-ui/icons';
import classnames from 'classnames';
import * as React from 'react';
import { Link, NavLink, Route, Switch, withRouter } from 'react-router-dom';
import LeeIcon from './assets/Icon.png';
import LeeNetIcon from './assets/IconNet.png';
import Anime from './routes/anime';
import Discover from './routes/discover';
import Home from './routes/home';
import Music from './routes/music';
import User from './routes/user';
import Video from './routes/video';
import withRoot from './withRoot';

const elec = window['require'] ? window['require']('electron') : null;

const styles = (theme: any) => ({
  appTitle: {
    fontWeight: 700,
    letterSpacing: -2,
    fontSize: 24
  },
  appIcon: {
    height: 24,
    margin: 'auto'
  },
  appNameButton: {
    display: 'inline-flex'
  },
  sideContent: {
    width: 300,
    backgroundColor: '#111',
    position: 'fixed',
    height: '100%',
    display: 'inline-flex',
    flexDirection: 'column'
  },
  sideToolbar: {
    width: 300,
    backgroundColor: '#111',
    ['-webkitAppRegion']: 'drag'
  },
  sideToolbarPadding: {
    paddingLeft: 4,
    paddingRight: 4
  },
  mainContent: {
    marginLeft: 'auto',
    width: 'calc(100% - 300px)',
    position: 'relative'
  },
  mainToolbar: {
    width: 'calc(100% - 300px)',
    ['-webkitAppRegion']: 'drag',
    background: 'linear-gradient(to bottom, rgba(0,0,0,.8), transparent)'
  },
  mainToolbarInternal: {
    paddingLeft: 8,
    paddingRight: 8
  },
  App: {
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  searchBar: {
    ['-webkitAppRegion']: 'no-drag',
    background: 'rgba(255,255,255,.05)',
    border: '1px solid rgba(255,255,255,.1)',
    boxShadow: 'none',
    maxWidth: 1970,
    minWidth: 300,
    display: 'flex',
    transition: theme.transitions.create(['all']),
    '&:hover': {
      background: 'rgba(255,255,255,.08)',
      border: '1px solid rgba(255,255,255,.15)'
    },
    '&:focus': {
      background: 'rgba(255,255,255,.08)',
      border: '1px solid rgba(255,255,255,.15)'
    },
    margin: 'auto',
    marginLeft: theme.spacing.unit * 2
  },
  searchInput: {},
  searchIcon: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    margin: 'auto 0',
    width: 'auto',
    color: 'white'
  },
  userMenu: {
    width: 200
  },
  menuListItem: {
    marginRight: theme.spacing.unit
  },
  nicoIcon: {
    width: 24,
    height: 24,
    margin: 'auto'
  },
  sidePlayer: {
    borderRadius: 0,
    padding: theme.spacing.unit
  }
});

class App extends React.Component<any> {
  public state = {
    anchorEl: undefined,
    searchValue: '',
    netMode: false
  };
  public constructor(props: any) {
    super(props);
    this.handleModeSwitch();
  }

  public toggleNetMode = () =>
    this.setState({ netMode: !this.state.netMode }, () =>
      this.handleModeSwitch()
    );

  public handleModeSwitch = () =>
    this.state.netMode
      ? this.props.history.push('/')
      : this.props.history.push('/music');

  public handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  public closeMenu = () => this.setState({ anchorEl: undefined });

  public handleAppMenu = () => {
    if (!elec) {
      return this.props.history.push('/');
    }
    const menu = elec.remote.Menu.getApplicationMenu();
    return menu.popup({});
  };

  public render() {
    const { anchorEl, searchValue } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.App}>
        <div className={classes.sideContent}>
          <AppBar
            position="relative"
            color="default"
            className={classes.sideToolbar}
          >
            <Toolbar className={classes.sideToolbarPadding}>
              <IconButton onClick={this.handleAppMenu}>
                {this.state.netMode ? (
                  <img alt="" src={LeeNetIcon} className={classes.appIcon} />
                ) : (
                  <img alt="" src={LeeIcon} className={classes.appIcon} />
                )}
              </IconButton>
              <Typography variant="title">
                Lee
                {this.state.netMode ? 'Net' : null}
              </Typography>
              <Typography
                variant="title"
                style={{ color: 'rgba(255,255,255,.2)' }}
              >
                0.1
              </Typography>
              <div style={{ flex: 1 }} />
              <MUISwitch
                checked={this.state.netMode}
                onChange={this.toggleNetMode}
                value={true}
                color="primary"
              />
            </Toolbar>
          </AppBar>
          <List component="nav">
            {this.state.netMode ? (
              <div>
                <NavLink to="/" exact={true} activeClassName="activeList">
                  <ListItem button={true}>
                    <ListItemIcon>
                      <MICON.HomeOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                </NavLink>
                <NavLink
                  to="/discover"
                  exact={true}
                  activeClassName="activeList"
                >
                  <ListItem button={true}>
                    <ListItemIcon>
                      <MICON.ExploreOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Discover" />
                  </ListItem>
                </NavLink>
                <Divider style={{ marginTop: 16, marginBottom: 16 }} />
              </div>
            ) : null}
            <NavLink to="/music" exact={true} activeClassName="activeList">
              <ListItem button={true}>
                <ListItemIcon>
                  <MICON.MusicNoteOutlined />
                </ListItemIcon>
                <ListItemText primary="Music" />
              </ListItem>
            </NavLink>
            <NavLink to="/video" exact={true} activeClassName="activeList">
              <ListItem button={true}>
                <ListItemIcon>
                  <MICON.VideoLibraryOutlined />
                </ListItemIcon>
                <ListItemText primary="Video" />
              </ListItem>
            </NavLink>
            {this.state.netMode ? (
              <NavLink to="/anime" exact={true} activeClassName="activeList">
                <ListItem button={true}>
                  <ListItemIcon>
                    <Typography className={classnames(classes.nicoIcon)}>
                      uwu
                    </Typography>
                  </ListItemIcon>
                  <ListItemText primary="Anime" />
                </ListItem>
              </NavLink>
            ) : null}
            <Divider style={{ marginTop: 16, marginBottom: 16 }} />
            <List
              component="nav"
              subheader={
                <ListSubheader component="div">Playlists</ListSubheader>
              }
            >
              <ListItem button={true}>
                <ListItemIcon>
                  <MICON.LibraryMusicOutlined />
                </ListItemIcon>
                <ListItemText inset={true} primary="Most played" />
              </ListItem>
            </List>
            {this.state.netMode ? (
              <List
                component="nav"
                subheader={
                  <ListSubheader component="div">Communities</ListSubheader>
                }
              >
                <ListItem button={true}>
                  <ListItemIcon>
                    <MICON.ListAltOutlined />
                  </ListItemIcon>
                  <ListItemText inset={true} primary="Onigiri" />
                </ListItem>
              </List>
            ) : null}
          </List>
          <div style={{ flex: 1 }} />
          <Paper className={classes.sidePlayer}>
            <Typography variant="subheading">Nothing is playing</Typography>
          </Paper>
        </div>
        <div className={classes.mainContent}>
          <AppBar color="default" className={classes.mainToolbar}>
            <Toolbar className={classes.mainToolbarInternal}>
              {elec ? (
                <div>
                  <IconButton
                    disabled={Boolean(this.props.history.length < 0)}
                    onClick={this.routeNavigateGoBack}
                  >
                    <MICON.ArrowBackOutlined />
                  </IconButton>
                  <IconButton onClick={this.routeNavigateGoForward}>
                    <MICON.ArrowForwardOutlined />
                  </IconButton>
                </div>
              ) : null}
              <div>
                <Paper className={classes.searchBar}>
                  <MICON.SearchOutlined className={classes.searchIcon} />
                  <form onSubmit={this.searchSubmit} style={{ width: '100%' }}>
                    <TextField
                      autoFocus={true}
                      onChange={this.searchChangeText}
                      fullWidth={true}
                      value={searchValue}
                      placeholder={'Search'}
                      InputProps={{
                        className: classes.searchInput,
                        disableUnderline: true,
                        fullWidth: true
                      }}
                      type="search"
                    />
                  </form>
                </Paper>
              </div>
              <div style={{ flex: 1 }} />
              {this.state.netMode ? (
                <div>
                  <IconButton>
                    <MICON.MessageOutlined />
                  </IconButton>
                  <Button
                    aria-owns={anchorEl ? 'user-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    style={{ marginRight: 16 }}
                  >
                    <Avatar
                      src="https://cdn.discordapp.com/attachments/495368554678321163/502233186911387679/1508887494012.png"
                      style={{ backgroundColor: '#111' }}
                    />
                    <Typography style={{ margin: '0 16px' }}>
                      Anonymous
                    </Typography>
                    <Icon>
                      <MICON.ArrowDropDownOutlined />
                    </Icon>
                  </Button>
                  <Menu
                    id="user-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.closeMenu}
                    classes={{ paper: classes.userMenu }}
                    anchorReference={anchorEl}
                  >
                    <Link to="user" onClick={this.closeMenu}>
                      <MenuItem>Profile</MenuItem>
                    </Link>
                    <Link to="settings" onClick={this.closeMenu}>
                      <MenuItem>Settings</MenuItem>
                    </Link>
                    <Divider />
                    <MenuItem>Log out</MenuItem>
                  </Menu>
                </div>
              ) : null}
              {elec ? (
                <div>
                  <IconButton onClick={this.eMinimize}>
                    <MICON.MinimizeOutlined />
                  </IconButton>
                  <IconButton onClick={this.eMaximize}>
                    {window['require']('electron')
                      .remote.getCurrentWindow()
                      .isMaximized() ? (
                      <MICON.FullscreenExitOutlined />
                    ) : (
                      <MICON.FullscreenOutlined />
                    )}
                  </IconButton>
                  <IconButton onClick={this.eClose}>
                    <MICON.CloseOutlined />
                  </IconButton>
                </div>
              ) : null}
            </Toolbar>
          </AppBar>
          <div>
            <Switch>
              <Route path="/" exact={true} component={Home} />
              <Route path="/user" exact={true} component={User} />
              <Route path="/discover" exact={true} component={Discover} />
              <Route path="/music" exact={true} component={Music} />
              <Route path="/video" exact={true} component={Video} />
              <Route path="/anime" exact={true} component={Anime} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }

  public routeNavigateGoBack = () =>
    this.props.history.length > 0 ? this.props.history.goBack() : null;

  public routeNavigateGoForward = () => this.props.history.goForward();

  public routeGoToSettings = () => this.props.history.push('/settings');

  public searchChangeText = (event: any) =>
    this.setState({ searchValue: event.target.value });

  // tslint:disable-next-line:no-empty
  public searchSubmit = () => {};

  // Electron functions
  public eMaximize = () => {
    const electron = window['require']('electron').remote.getCurrentWindow();
    if (electron.isMaximized()) {
      return electron.unmaximize();
    } else {
      return electron.maximize();
    }
  };

  public eMinimize = () => {
    const electron = window['require']('electron').remote.getCurrentWindow();
    return electron.minimize();
  };

  public eClose = () => {
    const electron = window['require']('electron').remote.getCurrentWindow();
    return electron.close();
  };
}

export default withRoot(withStyles(styles as any)(withRouter(App)));
