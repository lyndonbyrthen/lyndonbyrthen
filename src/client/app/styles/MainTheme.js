import createMuiTheme from 'material-ui/styles/theme';

const MainTheme = createMuiTheme({
  overrides: {
    MuiButton: {
      // Name of the styleSheet
      root: {
        // Name of the rule
        borderRadius: 0,
        border: 0,
        // color: 'white',
        // height: 42,
        padding: '0px',
        // boxShadow: '',
      },
    },

    MuiBackdrop: {
      root: {
        backgroundColor:'transparent'
      }
    }
  },
});

export default MainTheme