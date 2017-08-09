import React from 'react'
import { Link } from 'react-router-dom'

import { default as styles} from '../styles/styles'

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';


class Page404Dialog extends React.Component {

  render() {

      if (this.props.curAppId !== '404') return <span/>

      const actions = [
        <Link style={styles.link} to='/'>
        <Button raised color="primary">OK</Button>
        </Link>
      ];

     return(
      <Dialog style={{backgroundColor:'transparent'}} open={this.props.curAppId==='404'}>
          <DialogTitle>
            {"404 Page not found"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {"Go to home page?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {actions}
          </DialogActions>
        </Dialog>
    )
  }
}

export default Page404Dialog




