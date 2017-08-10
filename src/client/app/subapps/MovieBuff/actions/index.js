export const addMedia = (media) => ({
   type: 'ADD_MEDIA',
   media:media
})

export const removeMedia = (mediaId) => ({
   type: 'REMOVE_MEDIA',
   mediaId:mediaId
})

export const addToList = (mediaId) => ({
   type: 'ADD_TO_LIST',
   mediaId:mediaId
})

export const removeFromList = (mediaId) => ({
   type: 'REMOVE_FROM_LIST',
   mediaId:mediaId
})

export const setView = (viewType) => ({
   type: 'SET_VIEW',
   viewType:viewType
})

export const setFocus = (mediaId) => ({
   type: 'SET_FOCUS',
   mediaId:mediaId
})