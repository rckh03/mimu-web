// "API" simulada: reglas de negocio y permisos (reemplazar por fetch al backend)
/* "API" simulada: permisos y reglas viven aquí, no en la pantalla */
const api={
 login(e,p){if(!e.trim()||!p)return{error:'Completa el correo y la contraseña.'};const u=U[e.trim().toLowerCase()];if(!u||u.pw!==p)return{error:'Correo o contraseña incorrectos.'};db.session=e.trim().toLowerCase();save();return{ok:1}},
 me(){return db.session?{email:db.session,...U[db.session]}:null},
 tasks(u,sid){if(!(u.kids||[]).includes(sid))return{error:403};return{data:db.tasks.filter(t=>t.st.includes(sid)).sort((a,b)=>a.due.localeCompare(b.due))}},
 isDone:(sid,id)=>!!db.done[sid+':'+id],
 pending(u,sid){const r=this.tasks(u,sid);return r.error?r:{n:r.data.filter(t=>!this.isDone(sid,t.id)).length}},
 deliver(u,sid,id){if(!(u.kids||[]).includes(sid))return{error:403};db.done[sid+':'+id]=1;save();return{ok:1}},
 publishTask(u,t){if(u.role!=='teacher')return{error:403};const task={...t,id:db.nid++,st:ALL};db.tasks.push(task);db.events.push({d:t.due,t:'Entrega: '+t.title,k:'b'});
  const n=notify(ALL,k=>`Nueva tarea para ${k}: ${t.title} (${t.mat}), entrega ${fd(t.due)}.`);save();return{ok:1,n}},
 publishAviso(u,a){if(u.role!=='teacher')return{error:403};db.avisos.push({...a,id:db.nid++});let n=0;if(a.date<=TD&&a.to!=='Kinder B')n=notify(ALL,k=>`Nuevo aviso para ${k}: ${a.title}.`);save();return{ok:1,n}},
 saveTrack(u,tr){if(u.role!=='teacher')return{error:403};ALL.forEach(k=>{const p=(db.track[TD]||{})[k];if(tr[k].a==='Ausente'&&(!p||p.a!=='Ausente'))notify([k],n=>`Se registró una ausencia de ${n} hoy.`)});db.track[TD]=JSON.parse(JSON.stringify(tr));db.reg[TD]=Object.fromEntries(ALL.map(k=>[k,1]));save();return{ok:1}},
 notifs:u=>db.notifs.filter(n=>n.to===u.email).sort((a,b)=>b.t-a.t),
 readN(u,id){const n=db.notifs.find(x=>x.id===id&&x.to===u.email);if(n){n.read=1;save()}}};
const avg=a=>{const v=(a||[]).filter(x=>x!==''&&x!=null).map(Number);return v.length?String(+(v.reduce((s,x)=>s+x,0)/v.length).toFixed(1)):'—'};
