import {
  AppBar,
  Avatar,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  TextField,
  Toolbar,
  Typography,
  withStyles
} from '@material-ui/core';
import * as MICON from '@material-ui/icons';
import classnames from 'classnames';
import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LeeIcon from './assets/Icon.png';
import Nico from './assets/Nico.png';
import Home from './routes/home';
import withRoot from './withRoot';

const elec = window['require']('electron');

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
    height: '100%'
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
    backgroundColor: 'transparent'
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
    height: 24
  }
});

class App extends React.Component<any> {
  public state = {
    anchorEl: undefined,
    searchValue: ''
  };

  public handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  public closeMenu = () => this.setState({ anchorEl: undefined });

  public handleAppMenu = () => {
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
                <img alt="" src={LeeIcon} className={classes.appIcon} />
              </IconButton>
            </Toolbar>
          </AppBar>
          <MenuList>
            <MenuItem>
              <MICON.HomeOutlined className={classes.menuListItem} />
              Home
            </MenuItem>
            <MenuItem>
              <MICON.ExploreOutlined className={classes.menuListItem} />
              Discover
            </MenuItem>
            <Divider style={{ marginTop: 16, marginBottom: 16 }} />
            <MenuItem>
              <MICON.MusicNoteOutlined className={classes.menuListItem} />
              Music
            </MenuItem>
            <MenuItem>
              <MICON.VideoLibraryOutlined className={classes.menuListItem} />
              Video
            </MenuItem>
            <MenuItem>
              <img
                alt=""
                src={Nico}
                className={classnames(classes.nicoIcon, classes.menuListItem)}
              />
              Anime
            </MenuItem>
          </MenuList>
        </div>
        <div className={classes.mainContent}>
          <AppBar color="default" className={classes.mainToolbar}>
            <Toolbar className={classes.mainToolbarInternal}>
              <IconButton>
                <MICON.ArrowBackOutlined />
              </IconButton>
              <IconButton>
                <MICON.ArrowForwardOutlined />
              </IconButton>
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
              <Button
                aria-owns={anchorEl ? 'user-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
                style={{ marginRight: 16 }}
              >
                <Avatar src="" style={{ backgroundColor: '#111' }} />
                <Typography style={{ marginLeft: 16 }}>Anonymous</Typography>
              </Button>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.closeMenu}
                classes={{ paper: classes.userMenu }}
                anchorReference={anchorEl}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem>Log out</MenuItem>
              </Menu>
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
            </Toolbar>
          </AppBar>
          <div>
            <BrowserRouter>
              <Switch>
                <Route path="/" exact={true} component={Home} />
              </Switch>
            </BrowserRouter>
          </div>
        </div>
      </div>
    );
  }

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

export default withRoot(withStyles(styles as any)(App));
