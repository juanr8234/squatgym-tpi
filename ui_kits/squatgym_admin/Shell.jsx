// Shell — Topbar, Sidebar, page chrome for SquatGym admin app
const { useState } = React;

const ROLES = {
  admin:      { label: 'Administrador General', user: 'admin@squatgym.com', ico: '🔑' },
  encargado:  { label: 'Encargado de Sede',     user: 'encargado@squatgym.com', ico: '🏠' },
  secretaria: { label: 'Secretaria',            user: 'secretaria@squatgym.com', ico: '📋' },
  profesor:   { label: 'Profesor',              user: 'profesor@squatgym.com', ico: '🏋️' },
  alumno:     { label: 'Alumno',                user: 'alumno@squatgym.com',  ico: '🎓' },
};

const NAV_BY_ROLE = {
  admin: [
    { section: 'PRINCIPAL', items: [['dashboard','📊','Panel Principal']] },
    { section: 'GESTIÓN',   items: [['alumnos','👥','Alumnos'],['pagos','💳','Pagos y Cuotas'],['asistencia','✅','Asistencia']] },
    { section: 'CONFIG',    items: [['sedes','🏢','Sedes'],['reportes','📈','Reportes']] },
  ],
  encargado: [
    { section: 'PRINCIPAL', items: [['dashboard','📊','Panel']] },
    { section: 'SEDE',      items: [['alumnos','👥','Alumnos'],['asistencia','✅','Asistencia'],['horarios','📅','Horarios']] },
  ],
  secretaria: [
    { section: 'PRINCIPAL', items: [['dashboard','📊','Panel']] },
    { section: 'OPERACIÓN', items: [['alumnos','👥','Alumnos'],['pagos','💳','Pagos']] },
  ],
  profesor: [
    { section: 'PRINCIPAL', items: [['dashboard','📊','Panel']] },
    { section: 'CLASES',    items: [['asistencia','✅','Tomar Asistencia'],['horarios','📅','Mis Clases']] },
  ],
  alumno: [
    { section: 'MI CUENTA', items: [['dashboard','🏠','Inicio'],['mi-plan','📅','Mi Plan'],['mis-pagos','💳','Mis Pagos'],['mi-asistencia','✅','Mis Asistencias']] },
  ],
};

function Topbar({ role, onLogout, onHome }) {
  const r = ROLES[role];
  return (
    <div className="topbar">
      <div className="logo" onClick={onHome}>SQUAT<span>GYM</span></div>
      <div className="topbar-r">
        <span className="role-badge">{r.label}</span>
        <span className="user-label">{r.user}</span>
        <button className="btn-out" onClick={onLogout}>Salir</button>
      </div>
    </div>
  );
}

function Sidebar({ role, active, onNav }) {
  const nav = NAV_BY_ROLE[role] || NAV_BY_ROLE.admin;
  return (
    <aside className="sidebar">
      {nav.map((sec, i) => (
        <React.Fragment key={i}>
          <div className="sb-section">{sec.section}</div>
          {sec.items.map(([key, ico, label]) => (
            <div key={key}
                 className={'sb-item' + (active === key ? ' active' : '')}
                 onClick={() => onNav(key)}>
              <span className="sb-ico">{ico}</span>
              <span>{label}</span>
            </div>
          ))}
        </React.Fragment>
      ))}
    </aside>
  );
}

function PageHeader({ title, accent, sub, children }) {
  return (
    <div className="ph">
      <div>
        <div className="ph-title">{title} <span>{accent}</span></div>
        {sub && <div className="ph-sub">{sub}</div>}
      </div>
      {children && <div className="flex gap1">{children}</div>}
    </div>
  );
}

Object.assign(window, { ROLES, NAV_BY_ROLE, Topbar, Sidebar, PageHeader });
