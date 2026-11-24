(() => {
  const modules = [
    {id:'reader',name:'Jus Reader',icon:'📖',desc:'Read and organize your documents, books and files.',detail:'Document reading workspace. Your existing Reader interface and features will be connected here.'},
    {id:'study',name:'Jus Exam Study',icon:'🎓',desc:'Subjects, notes, question banks and exam preparation.',detail:'Study workspace. Your existing subjects, question banks, answers, progress and themes will be connected here.'},
    {id:'dictator',src:'dictator/',name:'Jus Dictator',icon:'✍️',desc:'Dictate PDF, Word and text files aloud in English, Hindi or Hinglish.',detail:'Writing workspace. Your existing Dictator interface and tools will be connected here.'}
  ];
  const main=document.getElementById('mainContent'),drawer=document.getElementById('drawer'),backdrop=document.getElementById('drawerBackdrop'),nav=document.getElementById('appNav');
  let active=location.hash.slice(1)||localStorage.getItem('jusSuite.active')||'home';
  const iconFor=(id)=>modules.find(m=>m.id===id)?.icon||'⌂';
  function navItems(){nav.innerHTML=modules.map(m=>`<button class="nav-item ${active===m.id?'active':''}" data-page="${m.id}"><span class="nav-icon">${m.icon}</span><span>${m.name}</span></button>`).join('');nav.querySelectorAll('[data-page]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.page)));}
  function openDrawer(){drawer.classList.add('open');backdrop.classList.add('show');drawer.setAttribute('aria-hidden','false');}
  function closeDrawer(){drawer.classList.remove('open');backdrop.classList.remove('show');drawer.setAttribute('aria-hidden','true');}
  function go(page){active=page;localStorage.setItem('jusSuite.active',page);try{history.replaceState(null,'','#'+page)}catch(e){}closeDrawer();render();navItems();}
  function home(){return `<section class="hero"><div class="eyebrow">YOUR PERSONAL WORKSPACE</div><h1>Welcome to Jus.</h1><p>Everything you need, in one place. Pick up where you left off.</p></section><section class="module-grid">${modules.map(m=>`<button class="module-card" data-launch="${m.id}" style="text-align:left;color:inherit"><div class="module-icon">${m.icon}</div><h2>${m.name}</h2><p>${m.desc}</p><div class="launch">Open workspace&nbsp; →</div></button>`).join('')}</section><h2 class="section-title">Quick access</h2><div class="quick-row"><div class="quick-card">☰ &nbsp;Use the menu to switch apps anytime.</div><div class="quick-card">↗ &nbsp;Your modules stay separate while sharing one shell.</div></div>`;}
  function modulePage(m){return `<section class="module-page"><div class="module-head"><div class="module-icon">${m.icon}</div><div><h1>${m.name}</h1><p>Jus Suite module</p></div></div><div class="module-placeholder"><strong>Integration slot ready.</strong><br>${m.detail}<br><br>When you provide the original repository, we can mount its app here and preserve its own UI, theme, scripts and storage.</div><button class="nav-item" style="margin-top:18px;background:var(--surface);border:1px solid var(--border);width:auto" data-page="home">← Back to Jus Suite home</button></section>`;}
  function settings(){return `<section class="module-page"><div class="eyebrow">WORKSPACE</div><h1>Settings</h1><div class="settings-row"><strong>Jus Suite shell</strong><p>Shell appearance is independent from the themes inside your three modules.</p></div><div class="settings-row"><strong>Active module</strong><p>${active==='settings'?'Settings':active}</p></div><p class="small-note">This starter stores the last opened section locally on this device.</p></section>`;}
  function render(){const m=modules.find(x=>x.id===active);if(m&&m.src){showFrame(m);return}hideFrames();main.innerHTML=active==='home'?home():active==='settings'?settings():m?modulePage(m):home();main.querySelectorAll('[data-launch],[data-page]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.launch||b.dataset.page)));document.getElementById('topSubtitle').textContent=active==='home'?'Your workspace':m?m.name:'Workspace settings';}
  const frames=document.getElementById('frames'),floatBtn=document.getElementById('floatMenu'),loaded={};let readyTimer;
  function showFrame(m){main.hidden=true;frames.hidden=false;document.body.classList.add('in-module');
    let f=loaded[m.id];
    if(!f){f=document.createElement('iframe');f.src=m.src;f.title=m.name;f.allow='autoplay; fullscreen; screen-wake-lock; clipboard-read; clipboard-write';frames.appendChild(f);loaded[m.id]=f;f.dataset.ready='';
      floatBtn.hidden=true;clearTimeout(readyTimer);readyTimer=setTimeout(()=>{if(!f.dataset.ready)floatBtn.hidden=false},2500);}
    else floatBtn.hidden=!!f.dataset.ready;
    Object.values(loaded).forEach(x=>x.hidden=x!==f);document.getElementById('topSubtitle').textContent=m.name;}
  function hideFrames(){frames.hidden=true;main.hidden=false;floatBtn.hidden=true;document.body.classList.remove('in-module');}
  addEventListener('message',e=>{if(e.origin!==location.origin)return;const d=e.data||{};
    if(d.jus==='menu')openDrawer();else if(d.jus==='home')go('home');
    else if(d.jus==='ready'){const f=Object.values(loaded).find(x=>x.contentWindow===e.source);if(f){f.dataset.ready='1';if(!f.hidden)floatBtn.hidden=true}}});
  floatBtn.addEventListener('click',openDrawer);
  document.getElementById('menuBtn').addEventListener('click',openDrawer);document.getElementById('closeDrawer').addEventListener('click',closeDrawer);backdrop.addEventListener('click',closeDrawer);document.getElementById('homeBtn').addEventListener('click',()=>go('home'));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDrawer()});render();navItems();
})();
