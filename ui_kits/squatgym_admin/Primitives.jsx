// Primitives — Button, Badge, Stat, Alert, Avatar
const Btn = ({ variant='p', children, ...props }) => {
  const cls = { p:'btn btn-p', s:'btn btn-s', d:'btn btn-d', ok:'btn btn-ok' }[variant] || 'btn btn-s';
  return <button className={cls} {...props}>{children}</button>;
};

const Badge = ({ variant='mut', children }) => (
  <span className={'badge b-' + variant}>{children}</span>
);

const Stat = ({ label, value, color }) => (
  <div className="stat">
    <div className="stat-lbl">{label}</div>
    <div className={'stat-val' + (color ? ' c-'+color : '')}>{value}</div>
  </div>
);

const Alert = ({ variant='info', children }) => (
  <div className={'alert al-' + variant}>{children}</div>
);

const Avatar = ({ name, size=56 }) => {
  const initials = (name || '??').split(/\s+/).map(w => w[0]).slice(0,2).join('').toUpperCase();
  return (
    <div className="profile-avatar" style={{ width:size, height:size, fontSize:size*.5 }}>
      {initials}
    </div>
  );
};

const QuickAction = ({ ico, title, desc, onClick }) => (
  <div className="qa" onClick={onClick}>
    <div className="qa-ico">{ico}</div>
    <div className="qa-title">{title}</div>
    <div className="qa-desc">{desc}</div>
  </div>
);

const FormField = ({ label, children, full }) => (
  <div className={'fg' + (full ? ' full' : '')}>
    <label>{label}</label>
    {children}
  </div>
);

const FormSection = ({ title, children }) => (
  <div className="fsec">
    <div className="fsec-t">{title}</div>
    {children}
  </div>
);

Object.assign(window, { Btn, Badge, Stat, Alert, Avatar, QuickAction, FormField, FormSection });
