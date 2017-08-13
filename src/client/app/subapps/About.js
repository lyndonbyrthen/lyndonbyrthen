import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import { default as styles} from '../styles/styles'

class About extends React.Component {


  render() {

  	return (
      <div style={styles.aboutPage.fullpage}>
      <div style={styles.aboutPage.root} >

          <Typography paragraph type="title">
            Lyndon Byrthen
          </Typography>
          <Typography paragraph type="body1">
            I am a software engineer and a few other things in life. Just so you have a vague idea, I have a Bachelor's in Fine Arts (Sculpture) and a Master's in Computer Science.
            I am reachable via email, LyndonByrthen@gmail.com.
          </Typography>

          <Typography paragraph type="title">
            About this site
          </Typography>

          <Typography paragraph component="p" type="body1">
            This site is built on React with a PHP backend.

            The main building blocks also include
            Redux, Router and Greensock. Other tools used are more individual to each app,
            so they are mentioned in each app's own info section.
          </Typography>

          <Typography component="p" type="body1">
            This site demonstrates:
          </Typography>

          <Typography component="p" type="body1">
            - With Router, it is possible to do animated
             transitions of components without unmounting them.
          </Typography>

          <Typography component="p" type="body1">
            - A single page app can be optimized to
            load only the requested features on demand.
          </Typography>


          <Typography component="p" type="body1">
            - Using Redux to persist app states.
          </Typography>


          <Typography component="p" type="body1">
            - Server side rendering . (in progress)")
          </Typography>

          <Typography paragraph component="p" type="body1">
                    The
            <Link style={styles.link} to='https://github.com/lyndonbyrthen/lyndonbyrthen/tree/lb_production' target="_blank">
            <Button color="primary" style={styles.inlineButton}>
              source code
            </Button>
            </Link>
            can be found on GitHub.
          </Typography>
   
      </div>
      </div>
    )
  }
}

export default About