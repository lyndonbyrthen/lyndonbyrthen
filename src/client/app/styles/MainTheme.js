import createMuiTheme from 'material-ui/styles/theme';
import createPalette from 'material-ui/styles/palette';
import cyan from 'material-ui/colors/cyan';
import amber from 'material-ui/colors/amber';
import createTypography from 'material-ui/styles/typography';
import Typography from 'material-ui/Typography';

let palette = createPalette({
                primary: cyan,
                accent:amber
              })
let typography = createTypography(palette, {
                  // System font
                  fontFamily:
                    '"Roboto Slab",Roboto,"Helvetica Neue",Arial,sans-serif',
                })

const MainTheme = createMuiTheme({

  palette: palette,

  // typography: typography,
  typography: {

      ...typography,
     
      body1: {
        fontFamily:'Roboto,"Helvetica Neue",Arial,sans-serif',
        color:'#333',
        fontWeight:'300'
      }
  },

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