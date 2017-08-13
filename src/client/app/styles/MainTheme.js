import createMuiTheme from 'material-ui/styles/theme';
import createPalette from 'material-ui/styles/palette';
import pink from 'material-ui/colors/pink';
import amber from 'material-ui/colors/amber';

const MainTheme = createMuiTheme({

  palette: createPalette({
    primary: pink,
    accent:amber
  }),
  
  overrides: {
    
    MuiDialog: {
      
    },

    MuiButton: {
      // Name of the styleSheet
      root: {
        // Name of the rule
        borderRadius: 0,
        border: 0,
        // color: 'white',
        // height: 42,
        // padding: '0px',
        // boxShadow: '',
      },
    },

    MuiBackdrop: {
      root: {
        backgroundColor:'transparent'
      }
    },

    MuiPaper: {
      root: {
        // backgroundColor:'rgba(255,255,255,.8)'
      }
    }
  },
});

export default MainTheme