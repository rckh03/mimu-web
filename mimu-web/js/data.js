// Datos de ejemplo, estado y almacenamiento (localStorage)
const $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ymd=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const T=new Date(),TD=ymd(T),add=n=>{const d=new Date(T);d.setDate(d.getDate()+n);return ymd(d)};
const fd=d=>new Date(d+'T12:00').toLocaleDateString('es-PA',{day:'numeric',month:'short'});
const NM=['Sofia Morales','Carlos Gonzalez','Sebastián Sanchez','Gabriel Pérez','Zara Almedo','Valentina Ríos','Mateo Castro','Isabella Vega','Daniel Ortiz','Camila Herrera'];
const S={};NM.forEach((n,i)=>S['s'+(i+1)]={n});const ALL=Object.keys(S);
const MAT=['Matemáticas','Español','Ciencias','Artes','Inglés'];
const KC={r:['Reunión','#E0D4F7'],e:['Evento/actividad','#4FBF9B'],o:['Recordatorio','#FF9B71'],b:['Entrega','#FFF3B0']};
const seed=()=>{const ym=TD.slice(0,8);return{session:null,nid:10,notifs:[],users:{
'admin@mimu.edu':{pw:'Admin123',name:'Administración MIMU',role:'admin',active:true},
'profe@mimu.edu':{pw:'Profe123',name:'Prof. Marta Ríos',role:'teacher',active:true},
'padre@mimu.edu':{pw:'Padre123',name:'Sandra Morales',role:'parent',kids:['s1'],phone:'6563-8594',active:true,requiere_cambio_password:false,terminos_aceptados:true},
'padre2@mimu.edu':{pw:'Temp12345',name:'Luis Gonzalez',role:'parent',kids:['s2'],phone:'',active:true,requiere_cambio_password:true,terminos_aceptados:false}},track:{},reg:{},
tasks:[{id:1,title:'Suma y resta',mat:'Matemáticas',due:add(14),st:ALL},{id:2,title:'Dibujo libre',mat:'Artes',due:add(-3),st:ALL}],
grades:{Matemáticas:{s1:[10,9,7],s2:[10,9,10],s3:[9,9,7],s4:[10,9,10],s5:[10,8,7]}},
events:[{d:ym+'16',t:'Reunión padres',k:'r'},{d:ym+'20',t:'Día del deporte',k:'e'},{d:ym+'25',t:'Salida temprano',k:'o'},{d:ym+'30',t:'Entrega boletines',k:'b'}],
avisos:[{id:3,title:'Salida temprano el viernes',to:'Kinder A',date:add(-4)},{id:4,title:'Fotos del día del deporte',to:'Kinder A',date:add(-2)},{id:5,title:'Reunión de padres',to:'Kinder A',date:add(5)}]}};
let db;try{db=JSON.parse(localStorage.getItem('mimu3')||'null')}catch(e){}db=db||seed();
const U=db.users; // cuentas (en producción: tabla usuarios de la BD)
const save=()=>{try{localStorage.setItem('mimu3',JSON.stringify(db))}catch(e){}};
let ui={sec:'inicio',ac:'notas',mat:'Matemáticas',stu:null,tr:null,evf:0,msg:'',err:''};
const parentsOf=ids=>Object.entries(U).filter(([,x])=>x.role==='parent'&&x.kids.some(k=>ids.includes(k)));
const notify=(ids,fn)=>{const ps=parentsOf(ids);ps.forEach(([em,x])=>x.kids.filter(k=>ids.includes(k)).forEach(k=>db.notifs.push({id:db.nid++,to:em,txt:fn(S[k].n),read:0,t:Date.now()})));return ps.length};
