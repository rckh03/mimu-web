// "API" simulada: reglas de negocio y permisos (reemplazar por fetch al backend)
/* "API" simulada: permisos y reglas viven aquí, no en la pantalla */
const api={
 login(e,p){if(!e.trim()||!p)return{error:'Completa el correo y la contraseña.'};const em=e.trim().toLowerCase(),u=U[em];if(!u||u.pw!==p)return{error:'Correo o contraseña incorrectos.'};
  if(u.role==='parent')return{error:'Las cuentas de padres y tutores se usan desde la app MIMU en Android.'};
  if(u.active===false)return{error:'Esta cuenta está desactivada. Contacta a la administración.'};
  db.session=em;save();return{ok:1}},
 me(){return db.session&&U[db.session]?{email:db.session,...U[db.session]}:null},
 publishTask(u,t){if(u.role!=='teacher')return{error:403};const task={...t,id:db.nid++,st:ALL};db.tasks.push(task);db.events.push({d:t.due,t:'Entrega: '+t.title,k:'b'});
  const n=notify(ALL,k=>`Nueva tarea para ${k}: ${t.title} (${t.mat}), entrega ${fd(t.due)}.`);save();return{ok:1,n}},
 publishAviso(u,a){if(u.role!=='teacher')return{error:403};db.avisos.push({...a,id:db.nid++});let n=0;if(a.date<=TD&&a.to!=='Kinder B')n=notify(ALL,k=>`Nuevo aviso para ${k}: ${a.title}.`);save();return{ok:1,n}},
 saveTrack(u,tr){if(u.role!=='teacher')return{error:403};ALL.forEach(k=>{const p=(db.track[TD]||{})[k];if(tr[k].a==='Ausente'&&(!p||p.a!=='Ausente'))notify([k],n=>`Se registró una ausencia de ${n} hoy.`)});db.track[TD]=JSON.parse(JSON.stringify(tr));db.reg[TD]=Object.fromEntries(ALL.map(k=>[k,1]));save();return{ok:1}},
 createTutor(u,x){if(u.role!=='admin')return{error:'No tienes permiso para crear cuentas.'};
  const name=(x.name||'').trim(),em=(x.email||'').trim().toLowerCase(),ph=(x.phone||'').trim();
  if(name.length<3)return{error:'Escribe el nombre completo.'};
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em))return{error:'El correo no tiene un formato válido.'};
  if(U[em])return{error:'Ya existe una cuenta con ese correo.'};
  if(ph&&!/^6\d{3}-?\d{4}$/.test(ph))return{error:'El teléfono debe tener 8 dígitos y empezar con 6.'};
  if((x.pw||'').length<8)return{error:'La contraseña temporal debe tener al menos 8 caracteres.'};
  if(!x.kids||!x.kids.length)return{error:'Asocia al menos un estudiante.'};
  U[em]={pw:x.pw,name,role:'parent',kids:x.kids,phone:ph,active:true,requiere_cambio_password:true,terminos_aceptados:false,created:Date.now()};save();return{ok:1}},
 toggleUser(u,em){if(u.role!=='admin'||!U[em]||U[em].role!=='parent')return{error:403};U[em].active=U[em].active===false;save();return{ok:1}},
 tempPass(){const c='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789',r=new Uint32Array(10);crypto.getRandomValues(r);return[...r].map(n=>c[n%c.length]).join('')}};
const avg=a=>{const v=(a||[]).filter(x=>x!==''&&x!=null).map(Number);return v.length?String(+(v.reduce((s,x)=>s+x,0)/v.length).toFixed(1)):'—'};
