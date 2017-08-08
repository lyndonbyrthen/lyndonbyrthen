import React from 'react'
import { normalize, schema } from 'normalizr';

import { default as theme} from '../styles/ui-theme'

import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

import InfoOutline from 'material-ui/svg-icons/action/info-outline';
import HighlightOff from 'material-ui/svg-icons/action/Highlight-off';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

let infoFootnote = (
    <div>
    This site is build on React with a PHP backend. To read more about it,
    please see the 
    <Link style={theme.link} to='/about'>
    <FlatButton primary={true} style={theme.inlineButton}>
      About
    </FlatButton>
    </Link> section.
    </div>
  )

let apps = [
   
   { 
   	 name: 'Audio Visualizer',
   	 id: 'AudioVisualizer',
   	 description: (
      <div>
        This app uses Matter.js, a physics engine and the AnalyserNode in javascript.
        <p/>
        The music used is a remix from a 1990 Super Nintendo game, ActRaiser.
        <p/>
        {infoFootnote}

      </div>
      ),
     loadfunc: require("bundle-loader?lazy&name=[name]!../subapps/AudioVisualizer.js"),
   },

   { 
     name: 'Movie Buff',
     id: 'MovieBuff',
     description: (
      <div>
        This app connects to "The Movie DB"
        <p/>
        <p/>
        {infoFootnote}

      </div>
      ),
     loadfunc: require("bundle-loader?lazy&name=[name]!../subapps/MovieBuff.js"),
   },

   { 
   	 name: 'About',
   	 id: 'About',
   	 description: '',
     loadfunc: require("bundle-loader?lazy&name=[name]!../subapps/About.js"),
   },
   
]


let appsMap={}
for (let i in apps) {
  apps[i].id = apps[i].id.toLowerCase()
  apps[i].delta = i
  appsMap[apps[i].id] = apps[i]
}

let curAppId = window.appid ? window.appid.toLowerCase() : apps[0].id;

if (!appsMap[curAppId]) curAppId = '404'

// console.log('appData.js run')

const initState = {
  curAppId:curAppId,
  apps:apps,
  appsMap:appsMap,
  menuOpen:false,
  infoOpen:false
}

export default initState
