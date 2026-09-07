const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const context={window:{},Math,console};context.window=context;vm.createContext(context);for(const f of ['data.js','state.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../js',f),'utf8'),context);
const {DATA:D,State:S}=context.MHA;let s=S.fresh();assert.equal(S.finish(s),false);
for(let i=0;i<8;i++){
 assert.equal(S.openChest(s,i),false,'locked chest refuses reward');
 assert.equal(S.unlock(s,D.missions[i].id),true);assert.equal(s.gemsCollected.length,i,'unlock does not award');assert.equal(s.mapPieces,i);
 assert.equal(S.openChest(s,i),true);assert.equal(s.gemsCollected.length,i+1);assert.equal(s.mapPieces,i+1);
 assert.equal(S.openChest(s,i),false,'cannot duplicate reward');assert.equal(s.gemsCollected.length,i+1);
 assert.equal(s.finalMissionUnlocked,i===7);
}
assert.equal(S.finish(s),true);assert.equal(s.finalMissionCompleted,true);
const restored=S.normalize(JSON.parse(JSON.stringify(s)));assert.equal(restored.gemsCollected.length,8);assert.equal(restored.mapPieces,8);
const damaged=S.normalize({...S.fresh(),mapPieces:8,gemsCollected:['ruby'],finalMissionUnlocked:true});assert.equal(damaged.finalMissionUnlocked,false);assert.equal(damaged.mapPieces,0);
for(const m of D.missions)for(let n=0;n<50;n++){const qs=context.MHA.makeQuestions(m);assert.equal(qs.length,m.count);if(m.type!=='vocab')for(const q of qs)assert.ok(D.validPairs.some(p=>p.prep===q.prep&&p.noun===q.noun))}
assert.deepEqual(Array.from(D.missions,m=>m.count),[3,4,3,3,3,3,3,5]);
console.log('PASS: chest gating, single rewards, all eight mappings, final gating, save normalization, and 400 randomized mission sets.');
