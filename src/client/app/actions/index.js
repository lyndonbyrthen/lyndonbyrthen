import {appDataArr, appDataMap} from '../data/appData'

export const setCurApp = (appId) => ({
   type: 'SET_CUR_APP',
   curAppId:appId
})

export const setTransitionState = (transState) => ({
   type: 'SET_TRANSITION_STATE',
   transitionState:transState
})

export const setMenuOpen = (bool)=> ({
	type: 'SET_MENU_OPEN',
	menuOpen: bool
})

export const setInfoOpen = (bool)=> ({
	type: 'SET_INFO_OPEN',
	infoOpen: bool
})

export const initAppData = (appId,data)=> ({
	type: 'INIT_APP_DATA',
	pair: {appId,data}
})