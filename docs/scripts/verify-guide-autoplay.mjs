import assert from 'node:assert/strict';
import { attachGuideVideo } from '../.vitepress/theme/guide-video-playback.js';
const emitter = props => Object.assign({ handlers: new Map(), addEventListener(k,f) { this.handlers.set(k,f); }, removeEventListener(k) { this.handlers.delete(k); }, emit(k) { this.handlers.get(k)?.(); } },props);
function fixture(reduced=false) {
  const queue=[];
  const doc=emitter({hidden:false}), motion=emitter({matches:reduced});
  const video=emitter({paused:true,ended:false,plays:0,pauses:0,reject:false,
    play() { this.plays++; if(this.reject) return Promise.reject(new Error('NotAllowedError')); this.paused=false; queue.push(()=>this.emit('play')); return Promise.resolve(); },
    pause() { if(this.paused) return; this.pauses++; this.paused=true; queue.push(()=>this.emit('pause')); }
  });
  let callback,disconnected=false;
  class Observer { constructor(cb) { callback=cb; } observe() {} disconnect(){disconnected=true;} }
  const release=attachGuideVideo(video,{document:doc,Observer,motion});
  const flush=async()=>{while(queue.length)queue.shift()();await Promise.resolve();await Promise.resolve();};
  return {video,doc,motion,release,flush,get disconnected(){return disconnected;},view(r){callback([{target:video,isIntersecting:r>0,intersectionRatio:r}]);},batch(rs){callback(rs.map(r=>({target:video,isIntersecting:r>0,intersectionRatio:r})));}};
}
let f=fixture();
assert(f.video.muted && f.video.defaultMuted);
f.view(.2);assert.equal(f.video.plays,0);
f.view(.5);await f.flush();assert.equal(f.video.plays,1);
f.view(0);await f.flush();assert(f.video.paused);
f.view(.5);await f.flush();assert.equal(f.video.plays,2);
f.video.pause();await f.flush();f.view(0);f.view(.5);await f.flush();assert.equal(f.video.plays,2,'Manual pause persists');
await f.video.play();await f.flush();f.doc.hidden=true;f.doc.emit('visibilitychange');await f.flush();assert(f.video.paused);
f.doc.hidden=false;f.doc.emit('visibilitychange');await f.flush();assert.equal(f.video.plays,4);
f.video.ended=true;f.video.pause();await f.flush();f.view(0);f.view(.5);await f.flush();assert.equal(f.video.plays,4,'Do not restart ended video');
f.release();assert(f.disconnected);assert.equal(f.doc.handlers.size,0);assert.equal(f.motion.handlers.size,0);
f=fixture(true);f.view(.8);await f.flush();assert.equal(f.video.plays,0);
await f.video.play();await f.flush();assert(!f.video.paused,'Manual play allowed with reduced motion');f.view(0);await f.flush();f.view(.8);await f.flush();assert.equal(f.video.plays,1);f.release();
f=fixture();f.video.reject=true;f.view(.8);await f.flush();f.view(.9);await f.flush();assert.equal(f.video.plays,1,'Rejected autoplay must not loop');f.video.reject=false;await f.video.play();await f.flush();assert(!f.video.paused);f.release();
f=fixture();f.view(.8);f.view(0);f.view(.8);await f.flush();assert(!f.video.paused,'Queued system pause must not become user pause');f.release();await f.flush();assert(f.video.paused);
f=fixture();f.batch([.8,0]);await f.flush();assert.equal(f.video.plays,0,'Use latest observer entry');f.release();
console.log('PASS: guide autoplay threshold, mute, manual pause/replay, background/offscreen resume, reduced motion, ended hold, play rejection and cleanup (logic simulation; not device QA).');
