# Notas de Sesión — SquatGym TPI

## Estado del proyecto
TPI de Diseño de Sistemas de Información — UTN FRRe 2026  
Grupo: Los Patrones del Diseño  
Módulo asignado: xiii — Gestión de Alumnos y Clases

---

## Archivos en la carpeta

| Archivo | Descripción |
|---|---|
| `index.html` | Prototipo funcional SPA (renombrado desde SquatGym_Pantallas.html) |
| `SquatGym_Documentacion_v3.pdf` | Documentación técnica final (10 páginas) |
| `PROMPTS_para_generar.md` | 4 prompts listos para generar los diagramas y reportes que faltan |

---

## Qué tiene el index.html

- 17 pantallas funcionales con navegación real
- Base de datos en memoria (8 alumnos, 6 clases)
- Control de acceso por roles (PERMS matrix en JS)
- Login con credenciales reales + botones de acceso rápido

### Credenciales demo
| Rol | Usuario | Contraseña |
|---|---|---|
| Admin | admin@squatgym.com | admin123 |
| Encargado | encargado@squatgym.com | enc123 |
| Secretaria | secretaria@squatgym.com | sec123 |
| Profesor | profesor@squatgym.com | prof123 |
| Alumno | alumno@squatgym.com | alumno123 |

### Permisos (PERMS matrix)
```javascript
admin:     { navAl:1, navCl:1, addAl:1, editAl:1, delAl:1, viewAl:1, addCl:1, editCl:1, delCl:1, att:1, portal:0 }
encargado: { navAl:1, navCl:1, addAl:0, editAl:0, delAl:0, viewAl:1, addCl:0, editCl:0, delCl:0, att:1, portal:0 }
secretaria:{ navAl:1, navCl:1, addAl:1, editAl:1, delAl:1, viewAl:1, addCl:0, editCl:0, delCl:0, att:1, portal:0 }
profesor:  { navAl:0, navCl:1, addAl:0, editAl:0, delAl:0, viewAl:0, addCl:0, editCl:0, delCl:0, att:1, portal:0 }
alumno:    { navAl:0, navCl:0, addAl:0, editAl:0, delAl:0, viewAl:0, addCl:0, editCl:0, delCl:0, att:0, portal:1 }
```

### Pantallas implementadas
1. Login
2. Dashboard (stats y acciones por rol — profesor ve solo SUS clases)
3. Lista de Alumnos (búsqueda + 3 filtros: estado, plan, sede)
4. Form Alumno — Alta/Modificación (con cupón, sede Ambas, método de pago)
5. Declaración Jurada de Salud (con adjuntar certificado médico)
6. Ficha del Alumno
7. Estado de Cuenta
8. Historial de Asistencia
9. Baja de Alumno
10. Lista de Clases
11. Form Clase — Alta/Modificación (solo Admin)
12. Ficha de Clase (con botones Aceptar/Rechazar para Profesor)
13. Registro de Asistencia (deudores bloqueados)
14. Baja de Clase
15. Mi Portal (Alumno)
16. Mi Plan y Horarios
17. Mi Cuenta
18. Mis Asistencias (con botones Exportar PDF/Excel)

---

## Qué tiene la documentación (v3)

- Carátula + índice
- Descripción del módulo y tabla de pantallas
- Trazabilidad por rol: Admin (3.1.1–5), Encargado (3.1.6–9), Secretaria (3.1.11–17), Profesor (3.1.19–21), Alumno (3.1.24–28)
- Requisitos generales (3.1.29–34)
- Matriz resumen de permisos por rol

**Nota:** los apartados de diagramas de navegación y reportes fueron eliminados del PDF intencionalmente. Se generan por separado usando los prompts del archivo `PROMPTS_para_generar.md`.

---

## Qué falta hacer (pendiente)

- [ ] Generar **Diagrama de Navegación — Gestión de Alumnos** (usar Prompt 1 del .md)
- [ ] Generar **Diagrama de Navegación — Gestión de Clases** (usar Prompt 2 del .md)
- [ ] Generar **Reporte Simple — Listado de Alumnos** con Warnier-Orr + Layout (Prompt 3)
- [ ] Generar **Reporte con Corte de Control — Asistencia por Clase y Sede** (Prompt 4)
- [ ] Incorporar los diagramas y reportes al informe final si el docente lo pide

---

## GitHub Pages

El proyecto está publicado (o se va a publicar) en:  
**https://juanr8234.github.io/squatgym-tpi/**

Para actualizar: subir los archivos al repo, asegurarse de que `index.html` está en la raíz, y que GitHub Pages esté configurado en Settings → Pages → main → / (root).

---

## Decisiones técnicas tomadas

- El **profesor** solo ve sus propias clases (filtrado por `c.profesor.includes('Torres')` — hardcodeado al único prof de la demo)
- El **encargado** tiene `viewAl:1` pero `addAl/editAl/delAl:0` — puede ver fichas pero no modificar
- Las fechas de vto. se almacenan como `dd/mm/yyyy` en la DB y se convierten con `vtoToInput()`/`inputToVto()` al trabajar con inputs tipo date
- La **Declaración Jurada** se activa automáticamente al crear un alumno nuevo; en modo edición no aparece
- Los archivos de la sesión en Linux pueden mostrar el archivo truncado por caché del mount — el archivo real en Windows siempre está completo. Usar el Read tool para verificar, no bash `tail`
