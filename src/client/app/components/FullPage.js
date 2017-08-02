import React from 'react'


const style= {
  width:'100%',
  height:'100%',
  position: 'fixed',
  top: 0,
  left: 0
}
class FullPage extends React.Component {

  render() {

    return (
      <div style={style}>
        {this.props.children}
      </div>
    )

  }
}

export default FullPage;