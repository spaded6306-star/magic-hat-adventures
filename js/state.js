/* Pure progression functions, also exercised by tests/state.test.cjs. */
(function(){
const fresh=()=>({version:1,openingCompleted:false,completedChallenges:{},unlockedChests:{},openedChests:{},gemsCollected:[],mapPieces:0,treasureMapComplete:false,finalMissionUnlocked:false,finalMissionCompleted:false,gameCompleted:false,playerPosition:{x:694,y:474},soundEnabled:true});
function normalize(raw){
 const s={...fresh(),...raw};s.completedChallenges={...s.completedChallenges};s.openedChests={...s.openedChests};s.unlockedChests={...s.unlockedChests};
 MHA.DATA.missions.forEach((m,i)=>{if(s.openedChests[i])s.completedChallenges[m.id]=true;if(s.completedChallenges[m.id])s.unlockedChests[i]=true;else delete s.unlockedChests[i]});
 s.gemsCollected=MHA.DATA.gems.filter((g,i)=>s.openedChests[i]);s.mapPieces=s.gemsCollected.length;
 s.treasureMapComplete=s.mapPieces===8;s.finalMissionUnlocked=s.treasureMapComplete;
 if(!s.finalMissionUnlocked){s.finalMissionCompleted=false;s.gameCompleted=false}
 if(!s.playerPosition||!Number.isFinite(s.playerPosition.x)||!Number.isFinite(s.playerPosition.y))s.playerPosition={x:694,y:474};
 return s;
}
function unlock(s,id){const i=MHA.DATA.missions.findIndex(m=>m.id===id);if(i<0)return false;s.completedChallenges[id]=true;s.unlockedChests[i]=true;return true}
function openChest(s,i){if(!Number.isInteger(i)||i<0||i>7||!s.unlockedChests[i]||s.openedChests[i])return false;s.openedChests[i]=true;s.gemsCollected.push(MHA.DATA.gems[i]);s.mapPieces=s.gemsCollected.length;s.treasureMapComplete=s.mapPieces===8;s.finalMissionUnlocked=s.treasureMapComplete;return true}
function finish(s){if(!s.finalMissionUnlocked||s.gemsCollected.length!==8||s.mapPieces!==8)return false;s.finalMissionCompleted=true;return true}
function load(){try{const raw=JSON.parse(localStorage.getItem(MHA.DATA.saveKey));return normalize(raw||fresh())}catch{return fresh()}}
function save(s){try{localStorage.setItem(MHA.DATA.saveKey,JSON.stringify(s));return true}catch{return false}}
MHA.State={fresh,normalize,unlock,openChest,finish,load,save};
})();
