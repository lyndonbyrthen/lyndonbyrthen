let apps = [
   
   { 
   	 name: 'Audio Visualizer',
   	 id: 'AudioVisualizer',
   	 description: 'An audio visualizer using Matter.js',
     loadfunc: require("bundle-loader?lazy&name=[name]!../subapps/AudioVisualizer.js"),
   },

   /*{ 
   	 name: 'App1',
   	 id: 'App1',
   	 description: '',
     loadfunc: require("bundle-loader?lazy&name=[name]!../subapps/App1.js"),
   },

   { 
   	 name: 'App2',
   	 id: 'App2',
   	 description: '',
     loadfunc: require("bundle-loader?lazy&name=[name]!../subapps/App2.js"),
   },

   { 
   	 name: 'App3',
   	 id: 'App3',
   	 description: '',
     loadfunc: require("bundle-loader?lazy&name=[name]!../subapps/App3.js"),
   },*/

   { 
   	 name: 'About',
   	 id: 'About',
   	 description: '',
     loadfunc: require("bundle-loader?lazy&name=[name]!../subapps/About.js"),
   },
   
]

let map={}, arr=[]

for (let i in apps) {
  apps[i].delta = i
  map[apps[i].id] = apps[i]
  arr.push(apps[i])
}

export const appDataArr = arr;
export const appDataMap = map;



