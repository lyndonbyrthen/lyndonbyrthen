import React from 'react'
import { normalize, schema } from 'normalizr';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Button from 'material-ui/Button';
import { default as styles} from '../styles/styles'

let infoFootnote = (
    <span>
    This site is build on React with a PHP backend. To read more about it,
    please see the 
    <Link style={styles.link} to='/about'>
    <Button color="primary" style={styles.inlineButton}>
      About
    </Button>
    </Link> section.
    </span>
  )

let apps = [
   
   { 
   	 name: 'Audio Visualizer',
   	 id: 'audiovisualizer',
   	 description: (
      <span>
        This app uses Matter.js, a physics engine and the AnalyserNode in javascript.
        The music used is a remix from a 1990 Super Nintendo game, ActRaiser.
        {infoFootnote}
      </span>
      ),
     loadfunc: require("bundle-loader?lazy&name=[name]!../subapps/AudioVisualizer.js"),
   },

   { 
     name: 'Movie Buff',
     id: 'moviebuff',
     description: (
      <div>
        This app connects to "The Movie DB" and retrieves recently released titles.
        And you may also add titles to your favorite list.
        The app state is persisted in a separate Redux store nested within, since
        the app is dynamically loaded. This demonstrates that multiple instances of
        redux stores can work well together.
        <p/>
        <p/>
        {infoFootnote}

      </div>
      ),
     loadfunc: require("bundle-loader?lazy&name=[name]!../subapps/MovieBuff.js"),
   },

   { 
   	 name: 'About',
   	 id: 'about',
   	 description: '',
     loadfunc: require("bundle-loader?lazy&name=[name]!../subapps/About.js"),
   },
   
]


let appsMap={deltas:{},ids:[],names:{},descriptions:{},loadfuncs:{},appDatas:{}}
for (let i in apps) {
  apps[i].id = apps[i].id.toLowerCase()
  let id = apps[i].id
  appsMap['deltas'][id] = Number(i)
  appsMap['ids'][i] = id
  appsMap['names'][id] = apps[i].name
  appsMap['descriptions'][id] = apps[i].description
  appsMap['loadfuncs'][id] = apps[i].loadfunc
}

let curAppId = window.appid ? window.appid.toLowerCase() : apps[0].id;

if (appsMap['deltas'][curAppId]===undefined) curAppId = '404'

const initState = {
  ...appsMap,
  curAppId:curAppId,
  menuOpen:false,
  infoOpen:false
}

export default initState

console.log('initState',initState)
