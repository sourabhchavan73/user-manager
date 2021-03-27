import { createMuiTheme } from '@material-ui/core/styles';

const mainColor = "#435d7d";
const secondary = "#28a745"
const error = '#f44336';

export default createMuiTheme({
    palette: {
        primary: {
          main: mainColor
        },

        secondary: {
            main: secondary
        },

        error: {
          main: error
        }
      },



      typography: {
          button: {
              fontSize: "14px",
              fontWeight: 400, 
              textTransform: "none"
          },

          modalHeader: {
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: "0 15px"
          }
      },


});