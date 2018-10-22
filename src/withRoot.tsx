import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: grey[300],
      main: grey[100],
      dark: grey[700]
    },
    secondary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700]
    },
    background: {
      paper: grey[800],
      default: grey[900]
    }
  },
  overrides: {
    MuiAppBar: {
      root: {
        boxShadow: 'none'
      }
    },
    MuiIconButton: {
      root: {
        ['-webkitAppRegion']: 'no-drag'
      }
    },
    MuiButton: {
      root: {
        ['-webkitAppRegion']: 'no-drag'
      }
    },
    MuiBackdrop: {
      root: {
        ['-webkitAppRegion']: 'no-drag'
      }
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily:
      "'CircularStd', BlinkMacSystemFont, -apple-system, 'Segoe UI', 'Roboto', 'Ubuntu', 'Arial'"
  }
});

function withRoot(Component: any) {
  function WithRoot(props: any) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
