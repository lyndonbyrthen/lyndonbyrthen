import React from 'react'
import { default as styles} from '../styles/styles'

import Button from 'material-ui/Button';

class ToolBarButton extends React.Component {

  render() {
      // console.log(this.props.children)
      let children = React.Children.map(this.props.children,
       (child) => {

        if (!child.type) return child

        let props = {...child.props}

        if (child.type == 'input') {
          props = {...props, style:styles.hiddenInput}
        } else if (child.type.muiName && child.type.muiName == 'SvgIcon') {
          props = {...props, color:styles.icon.color}
        } else return child

         return React.cloneElement(child, props)
      });
    
  	return (
  		<Button {...this.props} style={styles.toolBarButton} >
          {children}<span/>
      </Button>
    )
  }
}

export default ToolBarButton