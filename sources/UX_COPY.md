# UX Copy — SquatGym

**Alcance:** revisión del copy visible en `index.html` (911 líneas, 17 pantallas) en las cuatro áreas pedidas: errores y validación, confirmaciones destructivas, empty states y microcopy del Portal del Alumno.

**Tono aplicado:** profesional y cercano. Voseo uruguayo-argentino. Sin jerga técnica. Mensajes administrativos neutros; mensajes del portal del alumno con trato directo.

## Criterios transversales aplicados a todo el sistema

- **Un emoji por mensaje, como máximo.** Si el mensaje ya vive en un `.al-err/.al-warn/.al-ok` (que tienen color propio), el emoji es redundante y se elimina.
- **"Exitosamente" prohibido.** Es relleno. Se reemplaza por verbos concretos: *guardado*, *registrado*, *actualizado*.
- **Errores con estructura `qué pasó → por qué → cómo arreglarlo`.** No alcanza con "campos obligatorios".
- **Botones de acción con verbo + objeto.** "Guardar alumno", no "Guardar". "Confirmar baja", no "Aceptar".
- **Consistencia en botones secundarios.** `← Volver` para navegación hacia atrás; `Cancelar` solo dentro de formularios/modales.

---

## 1. Mensajes de error y validación

### 1.1 Login fallido (línea 472)

**Copy actual:**
> ⚠️ Usuario o contraseña incorrectos.\n\nCredenciales demo:\nadmin@squatgym.com / admin123\n(…lista completa de 5 credenciales)

**Recomendado:**
> No pudimos verificar tu usuario o contraseña. Revisá que el correo esté bien escrito y volvé a intentar.

| Opción | Copy | Tono | Cuándo |
|---|---|---|---|
| A (recomendada) | "No pudimos verificar tu usuario o contraseña. Revisá que el correo esté bien escrito y volvé a intentar." | Empático y accionable | Versión para el informe/defensa |
| B | "Usuario o contraseña incorrectos." | Neutro | Si el docente pide mínimo |
| C | "Las credenciales ingresadas no coinciden con ninguna cuenta. Si olvidaste tu contraseña, pedí el reseteo a Secretaría." | Completo | Versión productiva futura |

**Rationale:** exponer todas las credenciales en el mensaje de error es un defecto de seguridad real que puede hacer que el docente baje puntaje. Proponer dejarlas **fuera** del alert y mantenerlas visibles en los *botones de acceso rápido* de la pantalla de login (que ya existen para la demo).

---

### 1.2 Campos obligatorios sin detalle (líneas 639, 802)

**Copy actual:**
> ⚠️ Complete los campos obligatorios: Apellido, Nombre y DNI.
> ⚠️ Complete los campos obligatorios.

**Recomendado (alumno):**
> Faltan datos para guardar el alumno: completá Apellido, Nombre y DNI.

**Recomendado (clase):**
> Faltan datos para guardar la clase: completá Nombre, Profesor y Días.

**Rationale:** el mensaje 1 ya nombra los campos; el 2 no. Hay que nivelar para arriba: siempre listar qué falta. Evita que el usuario vuelva al form sin saber dónde mirar. Además, el verbo "completá" (imperativo, segunda persona) es más claro que "Complete" (tercera persona impersonal).

---

### 1.3 DDJJ sin firmar (línea 660)

**Copy actual:**
> ⚠️ Debe aceptar la declaración jurada para finalizar.

**Recomendado:**
> Para completar el alta, el alumno tiene que firmar la declaración jurada. Marcá la casilla de aceptación cuando esté listo.

**Rationale:** el original da la orden al operador ("Debe aceptar") cuando en realidad la aceptación la da el *alumno*. La reescritura ubica al operador (secretaria/admin) como facilitador, no como sujeto del juramento.

---

### 1.4 Motivo de baja sin seleccionar (línea 713)

**Copy actual:**
> ⚠️ Seleccione un motivo de baja.

**Recomendado:**
> Elegí un motivo de baja para seguir. Esto queda asentado en el historial del alumno.

**Rationale:** agrega contexto sobre por qué es obligatorio (trazabilidad), lo cual reduce fricción y evita que el operador sienta el campo como un trámite arbitrario.

---

### 1.5 Éxito en CRUD (líneas 648, 654, 716, 810, 814, 861, 892)

**Copy actual (repetido):**
> ✅ Alumno modificado exitosamente.
> ✅ Alumno registrado exitosamente (ID: …).
> ✅ Alumno dado de baja exitosamente.
> ✅ Clase modificada exitosamente.
> ✅ Clase creada exitosamente.
> ✅ Clase dada de baja exitosamente.
> ✅ Asistencia guardada exitosamente para esta clase.

**Recomendado (unificado):**

| Acción | Copy |
|---|---|
| Alumno creado | "Alumno registrado. ID asignado: `{id}`." |
| Alumno modificado | "Datos del alumno actualizados." |
| Alumno dado de baja | "`{Nombre}` fue dado de baja. El historial queda guardado para consulta." |
| Clase creada | "Clase creada. Ya podés asignarle un profesor." |
| Clase modificada | "Datos de la clase actualizados." |
| Clase dada de baja | "Clase dada de baja. Los inscriptos fueron notificados para reasignación." |
| Asistencia guardada | "Asistencia del `{dd/mm/aaaa}` registrada." |

**Rationale:** se elimina "exitosamente" (ruido); cada acción describe el resultado concreto y, cuando corresponde, sugiere el próximo paso ("Ya podés asignarle un profesor"). El de baja de alumno ya entrega una tranquilidad ("el historial queda guardado") que hoy falta.

---

### 1.6 Aceptar / rechazar asignación de profesor (línea 826)

**Copy actual:**
> ✅ Asignación aceptada. Notificando a administración.
> ❌ Asignación rechazada. Se notificó a administración para reasignar.

**Recomendado:**
> "Aceptaste la clase `{Nombre}`. Aparece en tu listado a partir de hoy."
> "Rechazaste la clase `{Nombre}`. Administración recibirá el aviso para reasignarla."

**Rationale:** el original es inconsistente (uno usa gerundio, el otro pretérito). Unifico a pretérito directo. Además, agrego qué ve el profesor a continuación — reduce la incertidumbre post-acción.

---

## 2. Confirmaciones destructivas

El sistema ya usa modales estructurados (líneas 286 y 361), no `confirm()` nativo. Solo hay que afinar el copy dentro de los modales y los botones.

### 2.1 Baja de Alumno (líneas 286–290)

**Copy actual:**
- Título: `⚠️ Confirmar Baja de Alumno`
- Cuerpo: `Esta acción dará de baja al alumno. Los datos históricos se conservarán.`
- Botones: `Cancelar` / `✔ Confirmar Baja`

**Recomendado:**
- **Título:** `¿Dar de baja a {Apellido, Nombre}?`
- **Cuerpo:** `Perderá el acceso a las clases desde hoy. El historial (pagos, asistencias) se conserva para futuras consultas. Esta acción se puede revertir desde la ficha del alumno.`
- **Botones:** `No, volver atrás` / `Dar de baja`

**Rationale:** el título pregunta directamente sobre **este** alumno (nombre visible), no sobre una acción abstracta. El cuerpo explica *consecuencia* (perder acceso) + *salvaguarda* (historial queda) + *escape* (se puede revertir) — que es exactamente el patrón de confirmación destructiva del skill. Los botones describen la acción, no usan "Aceptar/Cancelar".

---

### 2.2 Baja de Clase (líneas 361–364)

**Copy actual:**
- Título: `⚠️ Confirmar Baja de Clase`
- Cuerpo: `Los alumnos inscriptos serán notificados y deberán reasignarse.`
- Botones: `Cancelar` / `✔ Confirmar Baja`

**Recomendado:**
- **Título:** `¿Dar de baja la clase {Nombre} ({Día/Horario})?`
- **Cuerpo:** `{N} alumnos inscriptos recibirán un aviso y tendrán que reasignarse a otra clase. El profesor también será notificado.`
- **Botones:** `No, volver atrás` / `Dar de baja clase`

**Rationale:** idéntico patrón que 2.1. Además, mostrar la **cantidad** de inscriptos afectados (`{N}`) ayuda a que el operador dimensione el impacto antes de confirmar.

---

### 2.3 Asistencia bloqueada por deuda (mencionada en la DB)

El sistema bloquea a deudores al intentar registrar asistencia, pero no vi un mensaje formal. Propongo agregar uno.

**Recomendado:**
> `{Nombre}` no puede registrarse: tiene cuotas vencidas. Derivalo a Secretaría o marcá "Justificado por gestión" si hay un pase especial.

**Rationale:** explica el bloqueo, ofrece dos salidas (derivar o justificar) y no lo trata como un fraude. Evita que el profesor se sienta con las manos atadas.

---

## 3. Empty states

### 3.1 Sin registros de pago en Estado de Cuenta (línea 732)

**Copy actual:**
> Sin registros de pago

**Recomendado:**
> Todavía no hay pagos registrados para este alumno. El primer pago aparecerá acá cuando lo cargues en caja.

**Rationale:** el empty state informa *por qué* está vacío (no se cargó ninguno aún) y *cómo* se llena (cargándolo en caja). Es el patrón "qué es + por qué está vacío + cómo empezar" del skill.

---

### 3.2 Sin alertas en Dashboard (líneas 554, 574)

**Copy actual:**
> ✅ No hay alertas pendientes.

**Recomendado:**
> Todo en orden. Las clases tienen cupo y no hay cuotas vencidas.

**Rationale:** el mensaje actual es reactivo ("no hay X"). El nuevo afirma el estado positivo ("todo en orden") y describe exactamente qué chequeó. Al operador le da la tranquilidad de que el sistema *sí miró*; no es apatía, es confirmación.

---

### 3.3 Clases sin cupo (línea 553)

**Copy actual:**
> ⚠️ **{N} clase(s) sin cupos**. Capacidad máxima alcanzada.

**Recomendado:**
> **{N} {clases/clase} llegaron al tope de cupo.** Revisá si conviene abrir un horario extra o mover alumnos a otra franja.

**Rationale:** acompañar el dato con una sugerencia accionable transforma una alerta pasiva en una palanca de decisión. Además, pluraliza correctamente (`clase` / `clases`).

---

### 3.4 Deudores en Dashboard (línea 573)

**Copy actual:**
> ⚠️ **{N} alumno(s)** con cuotas vencidas. Ver deudores →

**Recomendado:**
> **{N} {alumno/alumnos}** tienen cuotas vencidas. Revisá el listado para priorizar cobros o contactarlos.

**Rationale:** contextualiza qué hacer con esa información. El link "Ver deudores" se mantiene como CTA, solo que ahora el operador sabe a qué va.

---

## 4. Microcopy — Portal del Alumno

### 4.1 Quick actions del Portal (líneas 377–379)

**Copy actual:**

| Ícono | Título | Descripción |
|---|---|---|
| 📅 | Mi Plan y Horarios | Consultá tu cronograma de clases |
| 💳 | Mi Cuenta | Estado de pagos y cuotas |
| ✅ | Mis Asistencias | Historial de asistencia a clases |

**Recomendado:**

| Ícono | Título | Descripción |
|---|---|---|
| 📅 | Mi plan y horarios | Mirá cuáles son tus clases de la semana y a qué hora te tocan. |
| 💳 | Mi cuenta | Revisá cómo venís con los pagos y cuándo vence la próxima cuota. |
| ✅ | Mis asistencias | Tu historial de clases, con opción de exportar a PDF o Excel. |

**Rationale:** los títulos en minúscula después del primer carácter (estilo sentence case) se leen más modernos. Las descripciones actuales son rótulos descriptivos; las nuevas son *invitaciones* ("Mirá", "Revisá") que bajan la barrera a hacer clic. La del historial adelanta que puede exportar, lo cual genera un pequeño "gancho".

---

### 4.2 Banner de plan (línea 384)

**Copy actual:**
> 📅 Tu plan **Full Access** te da acceso a todas las clases en ambas sedes.

**Recomendado (genérico, con variable):**
> Tu plan **`{nombre_plan}`** incluye: `{descripción_del_plan}`. Vencimiento de la próxima cuota: **`{fecha_vto}`**.

**Rationale:** el copy actual está hardcoded para un plan específico ("Full Access", "ambas sedes"). Al parametrizar y agregar la fecha de vencimiento, el banner deja de ser decorativo y se vuelve **información útil**.

---

### 4.3 Banner de estado de pago (línea 391)

**Copy actual:**
> ✅ Estás al día con tus pagos. Acceso habilitado.

**Recomendado (al día):**
> Tus pagos están al día. La próxima cuota vence el **`{fecha_vto}`**.

**Recomendado (en deuda):**
> Tenés **`{N}` {cuota/cuotas}** pendientes por **$`{monto}`**. Podés regularizar en Secretaría o por transferencia. Si ya pagaste, avisanos para acreditar.

**Rationale:** el "Acceso habilitado" es redundante — el usuario ya está usando el portal. En su lugar, anclar el dato accionable (vencimiento próximo). Para el caso de deuda, el copy propone **dos caminos** (regularizar o avisar el pago hecho), lo cual reduce la ansiedad.

---

### 4.4 Ficha "Exportar historial" (línea 907)

**Copy actual:**
> 📥 Exportando historial de asistencia en formato PDF…\n\n(En una implementación real, se descargaría el archivo con el detalle completo)

**Recomendado:**
> Preparando tu historial en formato `{PDF/Excel}`. La descarga empieza en unos segundos.

**Rationale:** el paréntesis con la nota de "implementación real" es texto de debug que no debería ver el usuario. Se saca. El mensaje nuevo anuncia el estado (preparando) y la expectativa (segundos), que es exactamente el patrón de *loading state* del skill.

---

## Resumen de cambios propuestos

| Área | Cambios |
|---|---|
| Errores y validación | 7 mensajes reescritos: login, campos obligatorios (×2), DDJJ, motivo de baja, éxito de CRUD (7 variantes unificadas), aceptar/rechazar asignación |
| Confirmaciones destructivas | 3 modales: baja de alumno, baja de clase, y un nuevo modal de bloqueo por deuda |
| Empty states | 4 estados: sin pagos, sin alertas en dashboard, clases sin cupo, deudores |
| Portal del Alumno | 4 bloques: quick actions (×3), banner de plan, banner de pagos (2 variantes), exportar historial |

## Nota sobre localización

El copy está redactado en **español rioplatense informal** (voseo). Si el docente pide español neutro, las únicas formas afectadas son:

- `completá` → `complete`
- `revisá` → `revise`
- `elegí` → `elija`
- `podés` → `puede`
- `volvé` → `vuelva`
- `mirá` → `mire`

La sustitución es mecánica y no altera la estructura de los mensajes.
