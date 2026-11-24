/* Stickman – animovaný panáčik (SVG + CSS animácie), bez knižníc.
   Použitie:
     const sm = Stickman.mount(elem, { size: 90, greet: true });
     sm.play('cheer', 'Super!');   // stavy: idle, wave, cheer, sad, think, walk, celebrate
*/
(function(){
  const MOUTHS = {
    smile:   'M44 28 Q50 33 56 28',
    frown:   'M44 31 Q50 26 56 31',
    neutral: 'M45 29.5 L55 29.5',
    open:    'M45 27.5 Q50 35 55 27.5 Z',
    hmm:     'M45 30 Q48 28 51 30 T56 29'
  };
  const MOOD = { idle:'smile', wave:'smile', cheer:'open', celebrate:'open', sad:'frown', think:'hmm', walk:'neutral' };
  const DEFAULT_MS = { wave:2200, cheer:1800, celebrate:3200, sad:2200, think:0, walk:0, idle:0 };
  const STATES = Object.keys(MOOD);

  const SVG = `
  <svg class="stickman" viewBox="0 0 100 140" aria-hidden="true">
    <ellipse class="sm-shadow" cx="50" cy="133" rx="16" ry="3"/>
    <g class="sm-root">
      <g class="sm-head">
        <circle class="sm-skull" cx="50" cy="25" r="12"/>
        <g class="sm-eyes"><circle cx="45.5" cy="22.5" r="1.6"/><circle cx="54.5" cy="22.5" r="1.6"/></g>
        <path class="sm-mouth" d="${MOUTHS.smile}"/>
        <circle class="sm-tear" cx="44" cy="26" r="1.3"/>
      </g>
      <line x1="50" y1="37" x2="50" y2="85"/>
      <g class="sm-arm sm-arm-l"><line x1="50" y1="48" x2="35" y2="64"/>
        <g class="sm-fore sm-fore-l"><line x1="35" y1="64" x2="28" y2="80"/></g></g>
      <g class="sm-arm sm-arm-r"><line x1="50" y1="48" x2="65" y2="64"/>
        <g class="sm-fore sm-fore-r"><line x1="65" y1="64" x2="72" y2="80"/></g></g>
      <g class="sm-leg sm-leg-l"><line x1="50" y1="85" x2="41" y2="106"/>
        <g class="sm-shin sm-shin-l"><line x1="41" y1="106" x2="37" y2="129"/></g></g>
      <g class="sm-leg sm-leg-r"><line x1="50" y1="85" x2="59" y2="106"/>
        <g class="sm-shin sm-shin-r"><line x1="59" y1="106" x2="63" y2="129"/></g></g>
    </g>
    <g class="sm-fx sm-fx-think"><text x="74" y="16">?</text></g>
    <g class="sm-fx sm-fx-stars">
      <text class="s1" x="14" y="30">★</text><text class="s2" x="80" y="26">★</text><text class="s3" x="50" y="6">★</text>
      <text class="s4" x="10" y="70">✦</text><text class="s5" x="86" y="66">✦</text>
    </g>
  </svg>`;

  function mount(host, opts={}){
    if(!host) return null;
    const wrap = document.createElement('div');
    wrap.className = 'sm-wrap' + (opts.className ? ' '+opts.className : '');
    if(opts.size) wrap.style.setProperty('--sm-size', opts.size+'px');
    wrap.innerHTML = SVG + '<div class="sm-bubble" role="status" aria-live="polite"></div>';
    host.appendChild(wrap);
    const svg = wrap.querySelector('svg'), mouth = wrap.querySelector('.sm-mouth'), bubble = wrap.querySelector('.sm-bubble');
    let timer = null, bubbleTimer = null, current = 'idle';

    function setState(s){
      STATES.forEach(x=> svg.classList.remove('sm-'+x));
      // restart animation even when the same state repeats
      void svg.getBoundingClientRect();
      svg.classList.add('sm-'+s); mouth.setAttribute('d', MOUTHS[MOOD[s]]); current = s;
    }
    function say(text, ms=1800){
      clearTimeout(bubbleTimer);
      if(!text){ bubble.classList.remove('show'); return; }
      bubble.textContent = text; bubble.classList.add('show');
      if(ms) bubbleTimer = setTimeout(()=> bubble.classList.remove('show'), ms);
    }
    function play(state, text, ms){
      if(!STATES.includes(state)) state = 'idle';
      clearTimeout(timer); setState(state);
      const dur = ms ?? DEFAULT_MS[state];
      if(text !== undefined) say(text, dur || 2000);
      if(dur) timer = setTimeout(()=> setState('idle'), dur);
    }
    wrap.addEventListener('click', ()=>{
      const r = [['wave','Hallo!'],['cheer','Los geht’s!'],['celebrate','Wunderbar!'],['wave','Servus!']][Math.floor(Math.random()*4)];
      play(r[0], r[1]);
    });

    setState('idle');
    if(opts.greet) setTimeout(()=> play('wave', opts.greetText || 'Hallo!'), 400);
    return { play, say, el: wrap, get state(){ return current; } };
  }

  window.Stickman = { mount };
})();
