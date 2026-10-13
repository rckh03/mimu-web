// Piezas reutilizables: logos, títulos, mensajes, menú lateral
const LN='assets/logo_nav.png',LG='assets/logo.png';
const ttl=(h,p)=>`<div class="ttl"><h1>${h}</h1><p>${p}</p></div>`;
const mg=()=>ui.err?`<p class="msg e" role="alert">${esc(ui.err)}</p>`:ui.msg?`<p class="msg" role="status">${esc(ui.msg)}</p>`:'';
const shell=(items,body)=>`<div class="shell"><aside class="side${ui.menu?' open':''}"><div class="sh"><div class="lg"><img src="${LN}" alt="mimu" height="40"></div><button class="hb" data-a="menu" aria-label="Menú" aria-expanded="${!!ui.menu}">${ui.menu?'✕':'☰'}</button></div><nav>${items.map(([i,l])=>`<button data-a="go" data-v="${i}" class="${ui.sec===i?'on':''}">${l}</button>`).join('')}</nav><button class="out" data-a="out"><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 3a9 9 0 1 0 0 18V3zM14 8l4 4-4 4v-3H9v-2h5z" fill="#fff"/></svg>Cerrar sesión</button></aside><main class="mn">${body}</main></div>`;
const dateLbl=(s=>s[0].toUpperCase()+s.slice(1))(T.toLocaleDateString('es-PA',{weekday:'long',day:'numeric',month:'long'}));
const regd=k=>(db.reg[TD]||{})[k];
const row=(k,extra)=>`<tr><td class="l">${esc(S[k].n)}</td>${extra}</tr>`;
const regBtn=`<td><button class="act" data-a="go" data-v="seg">Registrar</button></td>`;
