// Router, eventos y arranque
function render(){const u=api.me(),h=location.hash||'#/';let html;
 if(h==='#/login'){if(u){location.hash='#/app';return}html=login()}else if(h==='#/app'){if(!u){location.hash='#/login';return}html=u.role==='admin'?admin(u):teacher(u)}else html=landing();
 $('#app').innerHTML=html;scrollTo(0,0)}
const re=()=>{const y=scrollY;render();scrollTo(0,y)};
document.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a,v=b.dataset.v,u=api.me();ui.err='';ui.msg='';
 if(a==='login'){location.hash='#/login';return}
 if(a==='forgot'){$('#le').textContent='Pide a tu administrador que restablezca tu contraseña.';return}
 if(a==='out'){db.session=null;save();ui={...ui,sec:'inicio',stu:null,tr:null,menu:0};location.hash='#/';return}
 if(a==='menu'){ui.menu=!ui.menu;re();return}
 if(a==='go'){ui.sec=v;ui.stu=null;ui.menu=0;ui.cred=null;render();return}
 if(a==='stu'){ui.stu=v}if(a==='back')ui.stu=null;if(a==='ac')ui.ac=v;if(a==='evf')ui.evf=!ui.evf;
 if(a==='set'){ui.tr[b.dataset.k][b.dataset.f]=b.dataset.f==='m'?+v:v}
 if(a==='allp')ALL.forEach(k=>ui.tr[k].a='Presente');
 if(a==='saveall'){api.saveTrack(u,ui.tr);ui.msg='Seguimiento guardado. Los tutores con ausencias fueron notificados.'}
 if(a==='savegr'){const g=db.grades[ui.mat]||{};document.querySelectorAll('[data-g]').forEach(i=>{const[k,x]=i.dataset.g.split(':');g[k]=g[k]||['','',''];const n=parseFloat(i.value);g[k][x]=isNaN(n)?'':Math.min(10,Math.max(0,n))});db.grades[ui.mat]=g;save();ui.msg='Calificaciones guardadas.'}
 if(a==='gen'){$('#cw').value=api.tempPass();return}
 if(a==='tog')api.toggleUser(u,v);
 re()});
document.addEventListener('change',e=>{if(e.target.dataset.a==='mat'){ui.mat=e.target.value;ui.msg='';re()}});
document.addEventListener('input',e=>{if(e.target.id==='q'){const q=e.target.value.toLowerCase();document.querySelectorAll('tr[data-n]').forEach(r=>r.hidden=!r.dataset.n.includes(q))}});
document.addEventListener('submit',e=>{e.preventDefault();const id=e.target.id,u=api.me(),v=i=>$('#'+i).value.trim();ui.err='';ui.msg='';
 if(id==='lf'){const r=api.login($('#e').value,$('#p').value);if(r.error){$('#le').textContent=r.error;return}ui.sec='inicio';location.hash='#/app';return}
 if(id==='tf'){if(!v('tt')||!$('#td').value)ui.err='Escribe un título y elige la fecha límite.';else{const r=api.publishTask(u,{title:v('tt'),mat:$('#tm').value,due:$('#td').value});ui.msg=r.error?'':`Tarea publicada. Se notificó a ${r.n} tutores.`;if(r.error)ui.err='No tienes permiso para publicar.'}}
 if(id==='af'){if(!v('at')||!v('am')||!$('#ad').value)ui.err='Completa título, mensaje y fecha de envío.';else{const r=api.publishAviso(u,{title:v('at'),to:$('#ato').value,date:$('#ad').value});ui.msg=r.error?'':'Aviso guardado.'+(r.n?` Se notificó a ${r.n} tutores.`:'')}}
 if(id==='ef'){if(!v('et')||!$('#edt').value)ui.err='Escribe un título y elige la fecha.';else{db.events.push({d:$('#edt').value,t:v('et'),k:$('#ek').value});save();ui.msg='Evento guardado.';ui.evf=0}}
 if(id==='cf'){const r=api.createTutor(u,{name:v('cn'),email:v('ce'),phone:v('cp'),pw:$('#cw').value,kids:[...document.querySelectorAll('[name=ck]:checked')].map(x=>x.value)});
  if(r.error){const m=$('#cfm');m.textContent=r.error;m.className='msg e';return}
  ui.cred={name:v('cn'),email:v('ce').toLowerCase(),pw:$('#cw').value};ui.msg='Cuenta creada.'}
 re()});
addEventListener('hashchange',()=>{ui.err='';ui.msg='';render()});render();
