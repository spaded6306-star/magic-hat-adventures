/* Official map coordinates: 1672 × 941. Feet are the collision anchor. */
window.MHA = {};
MHA.DATA = {
  width:1672,height:941,saveKey:'magic-hat-treasure-v1',
  nouns:['chair','box','computer','table','desk','bag'],prepositions:['in','on','under','by'],
  gems:['ruby','sapphire','emerald','topaz','amethyst','aquamarine','rose_quartz','diamond'],
  gemNames:['Ruby','Sapphire','Emerald','Topaz','Amethyst','Aquamarine','Rose Quartz','Diamond'],
  missions:[
    {id:'parrot',name:'Parrot',asset:'parrot',x:684,y:275,count:3,type:'prep',focus:'In, on, under, by',intro:'Squawk! Where’s the parrot?\nLook carefully and choose a word.'},
    {id:'firstMate',name:'First Mate',asset:'first_mate',x:1295,y:268,count:4,type:'vocab',focus:'Find the object',intro:'Let’s find some things!\nCan you find the right picture?'},
    {id:'sailor1',name:'Red Sailor',asset:'sailor_red',x:395,y:572,count:3,type:'prepSentence',focus:'Choose the preposition',intro:'Where’s the treasure?\nChoose the missing word.'},
    {id:'sailor2',name:'Blue Sailor',asset:'sailor_blue',x:503,y:545,count:3,type:'noun',focus:'Choose the object',intro:'Look at the treasure.\nWhat is it in, on, under, or by?'},
    {id:'sailor3',name:'Green Sailor',asset:'sailor_green',x:975,y:475,count:3,type:'listen',focus:'Listen and look',intro:'Listen carefully.\nChoose the matching picture.'},
    {id:'sailor4',name:'Yellow Sailor',asset:'sailor_yellow',x:1032,y:280,count:3,type:'drag',focus:'Move the treasure',intro:'Move the treasure!\nDrag it to the right place.'},
    {id:'sailor5',name:'Purple Sailor',asset:'sailor_purple',x:745,y:660,count:3,type:'sentence',focus:'Build the sentence',intro:'Make a sentence with the word cards.\nDon’t forget “the”!',},
    {id:'sailor6',name:'Orange Sailor',asset:'sailor_orange',x:1400,y:307,count:5,type:'integrated',focus:'Pirate challenge',intro:'You can do it!\nTell me where the treasure is.'}
  ],
  captain:{id:'captain',name:'Captain',asset:'captain',x:435,y:230},
  chests:Array.from({length:8},(_,i)=>({id:'chest'+(i+1),index:i,x:1212+(i%4)*66,y:i<4?552:651})),
  mapDisplay:{id:'map',x:850,y:658},
  hull:[[310,96],[580,96],[608,158],[1098,158],[1134,98],[1435,98],[1572,215],[1601,310],[1595,461],[1500,614],[1410,700],[1050,742],[1000,772],[693,772],[649,741],[304,682],[240,597],[196,482],[195,250],[240,168]],
  walls:[
    [292,77,26,211],[574,78,25,220],[312,78,263,23],[299,272,104,45],[459,272,121,45],
    [313,143,37,118],[515,148,56,112],
    [1104,80,34,241],[1443,92,30,241],[1138,84,307,96],[1210,325,249,44],
    [287,385,202,39],[551,385,31,295],[287,411,26,250],[310,658,256,31],
    [315,431,88,87],[312,584,69,67],[525,510,27,137],[408,640,90,19],
    [1118,385,32,291],[1478,384,28,281],[1210,385,270,98],[1160,685,324,29],
    [654,537,36,211],[1007,536,32,211],[692,510,122,74],[884,510,123,74],
    [696,722,304,32],[781,615,135,84],[694,596,34,116],[972,595,33,121],
    [788,305,134,141],[839,145,28,171],[650,339,80,76],[974,341,76,74],
    [610,153,172,63],[916,153,165,66],[208,375,53,53],[209,450,41,64],
    [1480,173,72,89],[1520,316,69,109]
  ]
};
MHA.DATA.validPairs=MHA.DATA.prepositions.flatMap(prep=>(prep==='in'?['box','bag']:prep==='under'?['chair','table','desk']:MHA.DATA.nouns).map(noun=>({prep,noun})));
MHA.shuffle=a=>{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b};
MHA.makeQuestions=(mission)=>{
 const pairs=MHA.shuffle(MHA.DATA.validPairs),nouns=MHA.shuffle(MHA.DATA.nouns);
 return Array.from({length:mission.count},(_,i)=>{
  const pair=pairs[i%pairs.length];
  return {...pair,noun:mission.type==='vocab'?nouns[i%6]:pair.noun};
 });
};
