// Screens — Login, Dashboard, Alumnos list, Alumno form, Detalle, Estado de cuenta
const { useState: useS } = React;

const ALUMNOS = [
  { id:1, ap:'García', no:'María Laura', dni:'40.123.456', plan:'Full Access', sede:'Centro', vto:'2026-04-28', estado:'Habilitada' },
  { id:2, ap:'López',  no:'Carlos Andrés', dni:'38.456.789', plan:'Musculación', sede:'Centro', vto:'2026-03-15', estado:'Deudor' },
  { id:3, ap:'Pérez',  no:'Sofía Belén',  dni:'42.987.654', plan:'Zumba',       sede:'Norte',  vto:'2026-05-02', estado:'Habilitada' },
  { id:4, ap:'Martínez', no:'Juan Pablo', dni:'36.541.987', plan:'Kickboxing',  sede:'Centro', vto:'2026-04-30', estado:'Habilitada' },
  { id:5, ap:'Rodríguez', no:'Valentina', dni:'44.221.330', plan:'Spinning',    sede:'Norte',  vto:'2026-04-10', estado:'Deudor' },
  { id:6, ap:'Fernández', no:'Lucas Iván', dni:'39.112.008', plan:'CrossFit',   sede:'Centro', vto:'2026-04-22', estado:'Habilitada' },
  { id:7, ap:'Gómez', no:'Camila Rocío',  dni:'41.555.222', plan:'Yoga',        sede:'Norte',  vto:'2026-04-18', estado:'Inactivo' },
  { id:8, ap:'Silva', no:'Nicolás',       dni:'37.888.444', plan:'Full Access', sede:'Centro', vto:'2026-05-05', estado:'Habilitada' },
];

const ROLE_SVG = {
  admin:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="15" r="4"/><path d="m10.85 12.15 7.4-7.4"/><path d="m18 6 2 2"/><path d="m17 7 3 3"/></svg>,
  encargado:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  secretaria: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6M9 16h4"/></svg>,
  profesor:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M14.4 14.4 9.6 9.6"/><path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z"/><path d="m21.5 21.5-1.4-1.4"/><path d="M3.9 3.9 2.5 2.5"/><path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z"/></svg>,
  alumno:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
};

function LoginScreen({ onLogin }) {
  const [user, setU] = useS('admin@squatgym.com');
  const [pass, setP] = useS('admin123');
  return (
    <div id="login-screen">
      <div className="login-l">
        <div className="login-logo">SQUAT<span>GYM</span></div>
        <div className="login-tag">Sistema Integrado de Gestión · Módulo Alumnos y Clases</div>
        <div className="login-form">
          <div className="login-t">Iniciar Sesión</div>
          <div className="fg mb1"><label>Usuario</label>
            <input type="text" value={user} onChange={e=>setU(e.target.value)} placeholder="usuario@squatgym.com"/></div>
          <div className="fg mb1"><label>Contraseña</label>
            <input type="password" value={pass} onChange={e=>setP(e.target.value)} placeholder="••••••••"/></div>
          <button className="btn btn-p" style={{width:'100%',justifyContent:'center',padding:'.9rem',fontSize:'.9rem'}}
                  onClick={()=>onLogin('admin')}>▶ &nbsp;INGRESAR</button>
          <div style={{marginTop:'1.7rem',paddingTop:'1.3rem',borderTop:'1px solid rgba(255,255,255,.09)'}}>
            <div style={{fontFamily:"'Inter',sans-serif",fontSize:'.78rem',fontWeight:600,letterSpacing:'.08em',textTransform:'uppercase',marginBottom:'.8rem',color:'var(--sg-acc)'}}>Acceso rápido</div>
            <div className="role-btns">
              {['admin','encargado','secretaria','profesor','alumno'].map(r => (
                <div key={r} className="role-btn" onClick={()=>onLogin(r)}>
                  <span className="role-ico">{ROLE_SVG[r]}</span>
                  <span>{r[0].toUpperCase()+r.slice(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="login-r">
        <div className="login-r-num">SG</div>
        <div style={{position:'relative',zIndex:2,textAlign:'center',color:'#FFFFFF'}}>
          <div style={{fontFamily:"'Bebas Neue'",fontSize:'3rem',lineHeight:1,letterSpacing:'.04em',textShadow:'0 2px 18px rgba(0,0,0,.25)'}}>GESTIÓN<br/>INTEGRAL</div>
          <div style={{fontSize:'.95rem',marginTop:'.7rem',fontWeight:500,letterSpacing:'.02em',color:'rgba(255,255,255,.92)'}}>Alumnos · Clases · Asistencia</div>
        </div>
      </div>
    </div>
  );
}

const QA_ICO = {
  add:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5v14"/></svg>,
  pay:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
  check:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m9 12 2 2 4-4"/></svg>,
  chart:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m7 15 4-4 4 4 5-5"/></svg>,
  cal:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  card:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/></svg>,
  heart:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"/></svg>,
};

function DashboardScreen({ role, onNav }) {
  const isAdmin = role === 'admin';
  const isAlumno = role === 'alumno';
  const isProf  = role === 'profesor';
  return (
    <div className="scr active">
      <PageHeader title="PANEL" accent="PRINCIPAL" sub={isAdmin ? 'Vista consolidada · Todas las sedes' : isAlumno ? 'Hola Carlos · Plan Musculación · Sede Centro' : 'Sede Centro · Turno mañana'}>
        {isAdmin && <Btn variant="p" onClick={()=>onNav('alumnos')}>+ Nuevo Alumno</Btn>}
        {isProf  && <Btn variant="p" onClick={()=>onNav('asistencia')}>▶ Tomar Asistencia</Btn>}
      </PageHeader>
      {!isAlumno && (
        <div className="g4 mb1">
          <Stat label="Total Alumnos" value="128" color="acc"/>
          <Stat label="Activos" value="96" color="ok"/>
          <Stat label="Deudores" value="18" color="err"/>
          <Stat label="Clases hoy" value="6" color="warn"/>
        </div>
      )}
      {isAlumno && (
        <div className="g3 mb1">
          <Stat label="Próximo Vto." value="30/04" color="warn"/>
          <Stat label="Asistencias / mes" value="12" color="ok"/>
          <Stat label="Plan" value="MUSC." color="acc"/>
        </div>
      )}
      <div className="sec-t">Acciones Rápidas</div>
      <div className="g4">
        {isAlumno ? (
          <>
            <QuickAction ico={QA_ICO.cal} title="Mi plan y horarios" desc="Mirá tus clases"/>
            <QuickAction ico={QA_ICO.card} title="Mi cuenta" desc="Estado de pagos"/>
            <QuickAction ico={QA_ICO.check} title="Mis asistencias" desc="Historial"/>
            <QuickAction ico={QA_ICO.heart} title="Declaración Jurada" desc="Estado de salud"/>
          </>
        ) : (
          <>
            <QuickAction ico={QA_ICO.add} title="Nuevo Alumno" desc="Inscripción completa" onClick={()=>onNav('alumnos')}/>
            <QuickAction ico={QA_ICO.pay} title="Registrar Pago" desc="Cuota mensual"/>
            <QuickAction ico={QA_ICO.check} title="Tomar Asistencia" desc="Clase del día" onClick={()=>onNav('asistencia')}/>
            <QuickAction ico={QA_ICO.chart} title="Ver Reportes" desc="KPIs y exportación"/>
          </>
        )}
      </div>
      <div className="sec-t mt1">Alertas</div>
      <Alert variant="warn">⚠️ <strong>18 alumnos</strong> con cuotas vencidas. Revisá el listado para priorizar cobros.</Alert>
      <Alert variant="info">ℹ️ 3 declaraciones juradas pendientes de firma.</Alert>
    </div>
  );
}

function AlumnosScreen({ onNav, onSelect }) {
  const [q, setQ] = useS('');
  const [estado, setEstado] = useS('');
  const filtered = ALUMNOS.filter(a => {
    if (estado && a.estado !== estado) return false;
    if (q) {
      const s = (a.ap + ' ' + a.no + ' ' + a.dni + ' ' + a.plan).toLowerCase();
      return s.includes(q.toLowerCase());
    }
    return true;
  });
  return (
    <div className="scr active">
      <PageHeader title="GESTIÓN DE" accent="ALUMNOS" sub="Buscá, filtrá y gestioná el padrón">
        <Btn variant="p" onClick={()=>onNav('form-alumno')}>+ Nuevo Alumno</Btn>
      </PageHeader>
      <div className="tbl-wrap">
        <div className="tbl-top">
          <div className="srch">
            <input type="text" placeholder="🔍 Buscar por nombre, DNI o plan..."
                   value={q} onChange={e=>setQ(e.target.value)}/>
            <select value={estado} onChange={e=>setEstado(e.target.value)}>
              <option value="">Todos los estados</option>
              <option>Habilitada</option><option>Deudor</option><option>Inactivo</option>
            </select>
            <select><option>Todas las sedes</option><option>Centro</option><option>Norte</option></select>
          </div>
        </div>
        <table>
          <thead><tr>
            <th>#</th><th>Apellido y Nombre</th><th>DNI</th><th>Plan</th>
            <th>Sede</th><th>Vto.</th><th>Estado</th><th>Acciones</th>
          </tr></thead>
          <tbody>
            {filtered.map((a,i) => (
              <tr key={a.id}>
                <td style={{color:'var(--sg-mut)'}}>{String(i+1).padStart(3,'0')}</td>
                <td><strong>{a.ap}, {a.no}</strong></td>
                <td>{a.dni}</td><td>{a.plan}</td><td>{a.sede}</td>
                <td>{a.vto.split('-').reverse().join('/')}</td>
                <td><Badge variant={a.estado==='Habilitada'?'ok':a.estado==='Deudor'?'err':'mut'}>{a.estado}</Badge></td>
                <td>
                  <button className="ab ab-v" onClick={()=>onSelect(a)}>Ver</button>
                  <button className="ab ab-e">Editar</button>
                  <button className="ab ab-d">Baja</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-sm text-mut">Mostrando {filtered.length} de {ALUMNOS.length} alumnos</div>
    </div>
  );
}

function AlumnoFormScreen({ onNav }) {
  return (
    <div className="scr active">
      <PageHeader title="NUEVO" accent="ALUMNO" sub="Complete el formulario de inscripción"/>
      <FormSection title="📋 Datos Personales">
        <div className="fr">
          <FormField label="Apellido *"><input type="text" defaultValue=""/></FormField>
          <FormField label="Nombre/s *"><input type="text" defaultValue=""/></FormField>
        </div>
        <div className="fr3">
          <FormField label="DNI *"><input type="text" /></FormField>
          <FormField label="Fecha Nacimiento"><input type="date"/></FormField>
          <FormField label="Sexo"><select><option>Femenino</option><option>Masculino</option><option>Otro</option></select></FormField>
        </div>
      </FormSection>
      <FormSection title="📞 Contacto">
        <div className="fr">
          <FormField label="Teléfono *"><input type="tel"/></FormField>
          <FormField label="Email"><input type="email"/></FormField>
        </div>
      </FormSection>
      <FormSection title="🏋️ Plan y Actividad">
        <div className="fr">
          <FormField label="Plan / Actividad *">
            <select><option>Full Access</option><option>Musculación</option><option>Zumba</option><option>Kickboxing</option></select>
          </FormField>
          <FormField label="Sede *">
            <select><option>Centro</option><option>Norte</option></select>
          </FormField>
        </div>
        <div className="fr">
          <FormField label="Fecha de Alta"><input type="date"/></FormField>
          <FormField label="Vto. Cuota"><input type="date"/></FormField>
        </div>
      </FormSection>
      <div className="factions">
        <Btn variant="s" onClick={()=>onNav('alumnos')}>Cancelar</Btn>
        <Btn variant="p" onClick={()=>onNav('alumnos')}>💾 Guardar Alumno</Btn>
      </div>
    </div>
  );
}

function DetalleAlumnoScreen({ alumno, onNav }) {
  const a = alumno || ALUMNOS[0];
  return (
    <div className="scr active">
      <PageHeader title="FICHA DEL" accent="ALUMNO">
        <Btn variant="s" onClick={()=>onNav('alumnos')}>← Volver</Btn>
        <Btn variant="p">✏ Editar</Btn>
      </PageHeader>
      <div className="profile-box">
        <Avatar name={a.ap + ' ' + a.no}/>
        <div>
          <div className="profile-name">{a.ap}, {a.no}</div>
          <div className="profile-sub">DNI {a.dni} · Plan {a.plan} · Sede {a.sede}</div>
          <div className="mt1">
            <Badge variant={a.estado==='Habilitada'?'ok':a.estado==='Deudor'?'err':'mut'}>{a.estado}</Badge>
            {' '}<Badge variant="mut">Alta: 12/08/2024</Badge>
          </div>
        </div>
      </div>
      <div className="g2">
        <div className="fsec">
          <div className="fsec-t">📋 Datos de Contacto</div>
          <div className="dr"><span className="dr-lbl">Teléfono</span><span className="dr-val">+54 351 555-4433</span></div>
          <div className="dr"><span className="dr-lbl">Email</span><span className="dr-val">{a.no.toLowerCase().split(' ')[0]}@email.com</span></div>
          <div className="dr"><span className="dr-lbl">Dirección</span><span className="dr-val">Av. Colón 1234</span></div>
          <div className="dr"><span className="dr-lbl">Emergencia</span><span className="dr-val">+54 351 555-9912</span></div>
        </div>
        <div className="fsec">
          <div className="fsec-t">💳 Estado Financiero</div>
          <div className="dr"><span className="dr-lbl">Plan</span><span className="dr-val">{a.plan}</span></div>
          <div className="dr"><span className="dr-lbl">Vto. Cuota</span><span className="dr-val">{a.vto.split('-').reverse().join('/')}</span></div>
          <div className="dr"><span className="dr-lbl">Método</span><span className="dr-val">Transferencia</span></div>
          <div className="dr"><span className="dr-lbl">Última cuota</span><span className="dr-val" style={{color:'var(--sg-ok)'}}>Pagada</span></div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   TOMAR ASISTENCIA — Flow de profesor
   Diseño: clase seleccionada arriba (hero con datos de la clase), grid
   3-col de tarjetas de alumno, cada una con avatar + nombre + plan +
   control Presente/Ausente. Footer sticky con conteo + acción principal.
   Atajos: P = marcar todos presentes, A = todos ausentes.
   ═══════════════════════════════════════════════════════════════════ */

const CLASE_HOY = {
  nombre: 'Musculación',
  dia:    'Viernes 17/04',
  hora:   '19:00 – 20:30',
  sala:   'Sala 2 · Sede Centro',
  prof:   'Prof. Martín Acosta',
};

// 12 alumnos inscriptos en esta clase (reutilizamos ALUMNOS + variaciones)
const CLASE_ALUMNOS = [
  ...ALUMNOS,
  { id:9,  ap:'Benítez',   no:'Agustina', dni:'43.220.118', plan:'Musculación', sede:'Centro', estado:'Habilitada' },
  { id:10, ap:'Castro',    no:'Mateo',    dni:'38.001.445', plan:'Musculación', sede:'Centro', estado:'Habilitada' },
  { id:11, ap:'Herrera',   no:'Julieta',  dni:'42.330.901', plan:'Full Access', sede:'Centro', estado:'Habilitada' },
  { id:12, ap:'Ibarra',    no:'Franco',   dni:'40.775.220', plan:'Musculación', sede:'Centro', estado:'Deudor'     },
];

function AsistenciaScreen({ onNav }) {
  // status por alumno: undefined / 'p' / 'a'
  const [status, setStatus] = useS({});
  const [obs,    setObs]    = useS({});
  const [notaOpen, setNotaOpen] = useS(null);
  const [saved,    setSaved]    = useS(false);

  const total    = CLASE_ALUMNOS.length;
  const presentes = Object.values(status).filter(v => v === 'p').length;
  const ausentes  = Object.values(status).filter(v => v === 'a').length;
  const pendientes = total - presentes - ausentes;
  const pct = Math.round((presentes / total) * 100);

  const mark = (id, v) => setStatus(s => ({ ...s, [id]: s[id] === v ? undefined : v }));
  const markAll = (v) => {
    const next = {};
    CLASE_ALUMNOS.forEach(a => { next[a.id] = v; });
    setStatus(next);
  };

  // Shortcuts P / A
  React.useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'p' || e.key === 'P') markAll('p');
      if (e.key === 'a' || e.key === 'A') markAll('a');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (saved) {
    return (
      <div className="scr active">
        <div style={{maxWidth:560,margin:'3rem auto',background:'var(--sg-sur)',border:'1px solid rgba(255,255,255,.08)',borderTop:'3px solid var(--sg-ok)',padding:'2rem'}}>
          <div style={{fontFamily:"'Bebas Neue'",fontSize:'1.8rem',letterSpacing:'.04em',color:'var(--sg-ok)',marginBottom:'.4rem'}}>✔ ASISTENCIA REGISTRADA</div>
          <div style={{color:'#C9C9CF',fontSize:'.95rem',marginBottom:'1.2rem',lineHeight:1.5}}>
            Clase de <strong>{CLASE_HOY.nombre}</strong> · {CLASE_HOY.dia} {CLASE_HOY.hora}.<br/>
            {presentes} presentes · {ausentes} ausentes · {pendientes} sin marcar.
          </div>
          <div style={{display:'flex',gap:'.6rem'}}>
            <Btn variant="s" onClick={()=>{setSaved(false);}}>← Seguir editando</Btn>
            <Btn variant="p" onClick={()=>onNav('dashboard')}>Volver al panel</Btn>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="scr active" style={{paddingBottom:'8rem'}}>
      <PageHeader title="TOMAR" accent="ASISTENCIA" sub={`${CLASE_HOY.prof} · ${CLASE_HOY.sala}`}>
        <Btn variant="s" onClick={()=>onNav('dashboard')}>← Cancelar</Btn>
      </PageHeader>

      {/* ── Clase hero ─────────────────────────────── */}
      <div style={{
        background:'linear-gradient(135deg, rgba(255,107,0,.10), rgba(255,107,0,.02) 55%, transparent 100%)',
        border:'1px solid rgba(255,107,0,.25)',
        borderLeft:'3px solid var(--sg-acc)',
        padding:'1.2rem 1.4rem',
        marginBottom:'1.1rem',
        display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'1rem'
      }}>
        <div>
          <div style={{fontSize:'.68rem',letterSpacing:'.18em',textTransform:'uppercase',color:'#B0B0B8',fontWeight:700,marginBottom:'.2rem'}}>Clase en curso</div>
          <div style={{fontFamily:"'Bebas Neue'",fontSize:'2rem',letterSpacing:'.04em',lineHeight:1}}>
            {CLASE_HOY.nombre.toUpperCase()} <span style={{color:'var(--sg-acc)'}}>· {CLASE_HOY.dia.toUpperCase()}</span>
          </div>
          <div style={{color:'#C9C9CF',fontSize:'.9rem',marginTop:'.3rem'}}>{CLASE_HOY.hora} · {total} alumnos inscriptos</div>
        </div>
        <div style={{display:'flex',gap:'.4rem'}}>
          <button className="ab ab-v" onClick={()=>markAll('p')} style={{padding:'.5rem 1rem',fontSize:'.75rem'}}>
            ✔ Todos presentes <kbd style={{marginLeft:'.4rem',padding:'.05rem .3rem',border:'1px solid rgba(255,255,255,.15)',borderRadius:3,fontSize:'.65rem',fontFamily:'monospace'}}>P</kbd>
          </button>
          <button className="ab ab-d" onClick={()=>markAll('a')} style={{padding:'.5rem 1rem',fontSize:'.75rem'}}>
            ✗ Todos ausentes <kbd style={{marginLeft:'.4rem',padding:'.05rem .3rem',border:'1px solid rgba(255,255,255,.15)',borderRadius:3,fontSize:'.65rem',fontFamily:'monospace'}}>A</kbd>
          </button>
          <button className="ab ab-v" onClick={()=>setStatus({})} style={{padding:'.5rem .9rem',fontSize:'.75rem'}}>↺ Limpiar</button>
        </div>
      </div>

      {/* ── Progress bar ───────────────────────────── */}
      <div style={{marginBottom:'1.2rem'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'.4rem'}}>
          <div style={{fontSize:'.72rem',letterSpacing:'.12em',textTransform:'uppercase',color:'#B0B0B8',fontWeight:700}}>
            Progreso · {presentes + ausentes} de {total} marcados
          </div>
          <div style={{fontFamily:"'Bebas Neue'",fontSize:'1.4rem',letterSpacing:'.04em',color:'var(--sg-acc)'}}>{pct}% <span style={{fontSize:'.7rem',color:'#B0B0B8',letterSpacing:'.1em'}}>DE PRESENTES</span></div>
        </div>
        <div style={{height:6,background:'rgba(255,255,255,.06)',overflow:'hidden',position:'relative'}}>
          <div style={{position:'absolute',left:0,top:0,bottom:0,width:`${(presentes/total)*100}%`,background:'var(--sg-ok)',transition:'width .25s ease'}}/>
          <div style={{position:'absolute',left:`${(presentes/total)*100}%`,top:0,bottom:0,width:`${(ausentes/total)*100}%`,background:'var(--sg-err)',transition:'all .25s ease'}}/>
        </div>
      </div>

      {/* ── Alumno grid ────────────────────────────── */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(300px,1fr))',gap:'.75rem'}}>
        {CLASE_ALUMNOS.map((a,i) => {
          const st = status[a.id];
          const borderColor = st === 'p' ? 'var(--sg-ok)' : st === 'a' ? 'var(--sg-err)' : 'rgba(255,255,255,.08)';
          const bg = st === 'p' ? 'rgba(34,197,94,.04)' : st === 'a' ? 'rgba(232,52,58,.04)' : 'var(--sg-sur)';
          const tone = a.estado === 'Deudor';
          return (
            <div key={a.id} style={{
              background: bg,
              border: `1px solid ${borderColor}`,
              borderLeft: `3px solid ${st ? borderColor : 'rgba(255,255,255,.08)'}`,
              padding:'.85rem 1rem',
              transition:'all .15s ease',
              position:'relative',
            }}>
              {/* Fila 1: avatar + nombre + plan */}
              <div style={{display:'flex',alignItems:'center',gap:'.75rem',marginBottom:'.7rem'}}>
                <div style={{
                  width:38,height:38,borderRadius:'50%',flexShrink:0,
                  background:'linear-gradient(135deg, var(--sg-acc), var(--sg-acc2))',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  fontFamily:"'Bebas Neue'",fontSize:'1rem',color:'#000',letterSpacing:'.04em',
                }}>{a.ap[0]}{a.no[0]}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:'.88rem',fontWeight:600,color:'#F0F0F0',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{a.ap}, {a.no}</div>
                  <div style={{fontSize:'.7rem',color:'#B0B0B8',marginTop:'.1rem',letterSpacing:'.02em'}}>
                    {a.plan}
                    {tone && <span style={{marginLeft:'.4rem',color:'var(--sg-err)',fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase',fontSize:'.62rem'}}>· Deudor</span>}
                  </div>
                </div>
                <div style={{fontFamily:"'Bebas Neue'",fontSize:'.85rem',color:'#555',letterSpacing:'.04em',flexShrink:0}}>#{String(i+1).padStart(2,'0')}</div>
              </div>
              {/* Fila 2: toggle P/A */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.35rem'}}>
                <button
                  onClick={()=>mark(a.id,'p')}
                  style={{
                    border:'1px solid ' + (st==='p' ? 'var(--sg-ok)' : 'rgba(255,255,255,.08)'),
                    background: st==='p' ? 'var(--sg-ok)' : 'transparent',
                    color: st==='p' ? '#000' : '#C9C9CF',
                    padding:'.5rem 0',
                    fontFamily:"'Inter',sans-serif",fontSize:'.72rem',fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase',
                    cursor:'pointer',transition:'all .12s ease',
                    display:'flex',alignItems:'center',justifyContent:'center',gap:'.3rem'
                  }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Presente
                </button>
                <button
                  onClick={()=>mark(a.id,'a')}
                  style={{
                    border:'1px solid ' + (st==='a' ? 'var(--sg-err)' : 'rgba(255,255,255,.08)'),
                    background: st==='a' ? 'var(--sg-err)' : 'transparent',
                    color: st==='a' ? '#fff' : '#C9C9CF',
                    padding:'.5rem 0',
                    fontFamily:"'Inter',sans-serif",fontSize:'.72rem',fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase',
                    cursor:'pointer',transition:'all .12s ease',
                    display:'flex',alignItems:'center',justifyContent:'center',gap:'.3rem'
                  }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Ausente
                </button>
              </div>
              {/* Nota opcional */}
              <div style={{marginTop:'.5rem'}}>
                {notaOpen === a.id ? (
                  <input
                    autoFocus
                    placeholder="Nota (lesión, retiro anticipado, etc.)"
                    value={obs[a.id] || ''}
                    onChange={e=>setObs(o=>({...o,[a.id]:e.target.value}))}
                    onBlur={()=>setNotaOpen(null)}
                    onKeyDown={e=>{if(e.key==='Enter')setNotaOpen(null);}}
                    style={{
                      width:'100%',background:'rgba(0,0,0,.25)',
                      border:'1px solid rgba(255,107,0,.5)',color:'#F0F0F0',
                      padding:'.35rem .55rem',fontFamily:"'Inter',sans-serif",fontSize:'.78rem',outline:'none',
                    }}/>
                ) : obs[a.id] ? (
                  <div onClick={()=>setNotaOpen(a.id)} style={{fontSize:'.72rem',color:'var(--sg-acc)',cursor:'pointer',padding:'.2rem 0'}}>
                    ✎ {obs[a.id]}
                  </div>
                ) : (
                  <button onClick={()=>setNotaOpen(a.id)} style={{
                    background:'none',border:'none',color:'#777',fontSize:'.7rem',cursor:'pointer',
                    fontFamily:"'Inter',sans-serif",letterSpacing:'.04em',padding:'.2rem 0',
                  }}>+ Agregar nota</button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Sticky footer ──────────────────────────── */}
      <div style={{
        position:'fixed',bottom:0,left:210,right:0,
        background:'rgba(14,14,16,.96)',
        backdropFilter:'blur(14px)',
        borderTop:'1px solid rgba(255,107,0,.2)',
        padding:'.9rem 2rem',
        display:'flex',alignItems:'center',justifyContent:'space-between',gap:'1rem',
        zIndex:50,
      }}>
        <div style={{display:'flex',gap:'1.8rem',alignItems:'center'}}>
          <div>
            <div style={{fontSize:'.62rem',letterSpacing:'.15em',textTransform:'uppercase',color:'#B0B0B8',fontWeight:700}}>Presentes</div>
            <div style={{fontFamily:"'Bebas Neue'",fontSize:'1.8rem',lineHeight:1,color:'var(--sg-ok)'}}>{presentes}</div>
          </div>
          <div>
            <div style={{fontSize:'.62rem',letterSpacing:'.15em',textTransform:'uppercase',color:'#B0B0B8',fontWeight:700}}>Ausentes</div>
            <div style={{fontFamily:"'Bebas Neue'",fontSize:'1.8rem',lineHeight:1,color:'var(--sg-err)'}}>{ausentes}</div>
          </div>
          <div>
            <div style={{fontSize:'.62rem',letterSpacing:'.15em',textTransform:'uppercase',color:'#B0B0B8',fontWeight:700}}>Pendientes</div>
            <div style={{fontFamily:"'Bebas Neue'",fontSize:'1.8rem',lineHeight:1,color: pendientes ? 'var(--sg-warn)' : '#555'}}>{pendientes}</div>
          </div>
          {pendientes > 0 && (
            <div style={{color:'var(--sg-warn)',fontSize:'.82rem',maxWidth:260,lineHeight:1.4}}>
              Hay alumnos sin marcar. Se registrarán como <strong>pendientes</strong> si confirmás ahora.
            </div>
          )}
        </div>
        <div style={{display:'flex',gap:'.6rem'}}>
          <Btn variant="s" onClick={()=>onNav('dashboard')}>Cancelar</Btn>
          <Btn variant="ok" onClick={()=>setSaved(true)}>✔ Confirmar Asistencia</Btn>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ALUMNOS, QA_ICO, LoginScreen, DashboardScreen, AlumnosScreen, AlumnoFormScreen, DetalleAlumnoScreen, AsistenciaScreen, CLASE_HOY });
