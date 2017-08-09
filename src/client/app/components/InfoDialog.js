import React from 'react'
import { default as styles} from '../styles/styles'

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

import Typography from 'material-ui/Typography';

import IconButton from 'material-ui/IconButton';
import HighlightOff from 'material-ui-icons/HighlightOff';

class InfoDialog extends React.Component {

  render() {

    if (this.props.deltas[this.props.curAppId]===undefined || !this.props.descriptions[this.props.curAppId]) return <span/>
    
    return (
      <Dialog 
      open={this.props.infoOpen}
      onRequestClose={() => {this.props.setInfoOpen(false)}}
      >
        <IconButton 
        style={{
          position:'absolute',
          right: 0,
          top:0
        }}
        onClick={() => {this.props.setInfoOpen(false)}}

        >
        <HighlightOff/>
        </IconButton>
        <DialogTitle>
            {this.props.descriptions[this.props.curAppId].name}
        </DialogTitle>

          <DialogContent>
            <Typography paragraph component="div" type="body1">
              {this.props.descriptions[this.props.curAppId]}
            </Typography>
          </DialogContent>
        </Dialog>
    )
  }
}

export default InfoDialog

