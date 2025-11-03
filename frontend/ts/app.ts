// frontend/ts/app.ts
import * as api from "./services/api.js";
import { renderInstrumentsList } from "./components/instruments.js";
import { renderTypesList } from "./components/types.js";
import { renderUsersList } from "./components/users.js";

const btnInstruments = document.getElementById("btnInstruments")!;
const btnTypes = document.getElementById("btnTypes")!;
const btnUsers = document.getElementById("btnUsers")!;
const contentArea = document.getElementById("contentArea")!;

const modalAddInstrumentEl = document.getElementById("modalAddInstrument")!;
const modalAddTypeEl = document.getElementById("modalAddType")!;
const modalAddUserEl = document.getElementById("modalAddUser")!;

const bsModalInstrument = new (window as any).bootstrap.Modal(modalAddInstrumentEl);
const bsModalType = new (window as any).bootstrap.Modal(modalAddTypeEl);
const bsModalUser = new (window as any).bootstrap.Modal(modalAddUserEl);

btnInstruments.addEventListener("click", async () => { await showInstruments(); });
btnTypes.addEventListener("click", async () => { await showTypes(); });
btnUsers.addEventListener("click", async () => { await showUsers(); });

/* --- INSTRUMENTS --- */
async function showInstruments() {
     try {
     const items = await api.getInstruments();
     contentArea.innerHTML = renderInstrumentsList(items);

     // llenar select tipos para modal
     const select = document.getElementById("selectInstrumentType") as HTMLSelectElement | null;
     if (select) {
          const types = await api.getTypes();
          select.innerHTML = types.map((t: any) => `<option value="${t._id}">${t.name}</option>`).join("");
     }

     document.getElementById("btnAddInstrument")?.addEventListener("click", () => bsModalInstrument.show());
     document.getElementById("btnRefreshInstruments")?.addEventListener("click", showInstruments);

     document.querySelectorAll(".btn-delete-instrument").forEach(btn => {
          btn.addEventListener("click", async (e) => {
          const row = (e.target as HTMLElement).closest("tr")!;
          const id = row.getAttribute("data-id")!;
          if (!confirm("Eliminar instrumento?")) return;
          await api.deleteInstrument(id);
          await showInstruments();
          });
     });
     } catch (err) {
     console.error(err);
     contentArea.innerHTML = `<div class="alert alert-danger">Error cargando instrumentos</div>`;
     }
}

const formAddInstrument = document.getElementById("formAddInstrument") as HTMLFormElement | null;
if (formAddInstrument) {
     formAddInstrument.addEventListener("submit", async (e) => {
     e.preventDefault();
     const fd = new FormData(formAddInstrument);
     const payload = {
          name: String(fd.get("name") ?? ""),
          brand: String(fd.get("brand") ?? ""),
          year: fd.get("year") ? Number(fd.get("year")) : undefined,
          type: String(fd.get("type") ?? ""),
          details: String(fd.get("details") ?? "")
     };
     await api.createInstrument(payload);
     bsModalInstrument.hide();
     formAddInstrument.reset();
     await showInstruments();
     });
}

/* --- TYPES --- */
async function showTypes() {
     try {
     const data = await api.getTypes();
     contentArea.innerHTML = renderTypesList(data);

     document.getElementById("btnAddType")?.addEventListener("click", () => bsModalType.show());
     document.getElementById("btnRefreshTypes")?.addEventListener("click", showTypes);

     document.querySelectorAll(".btn-delete-type").forEach(btn => {
          btn.addEventListener("click", async (e) => {
          const li = (e.target as HTMLElement).closest("li")!;
          const id = li.getAttribute("data-id")!;
          if (!confirm("Eliminar tipo?")) return;
          await api.deleteType(id);
          await showTypes();
          });
     });
     } catch (err) {
     console.error(err);
     contentArea.innerHTML = `<div class="alert alert-danger">Error cargando tipos</div>`;
     }
}

const formAddType = document.getElementById("formAddType") as HTMLFormElement | null;
if (formAddType) {
     formAddType.addEventListener("submit", async (e) => {
     e.preventDefault();
     const fd = new FormData(formAddType);
     const payload = { name: String(fd.get("name") ?? ""), description: String(fd.get("description") ?? "") };
     await api.createType(payload);
     bsModalType.hide();
     formAddType.reset();
     await showTypes();
     });
}

/* --- USERS --- */
async function showUsers() {
     try {
     const data = await api.getUsers();
     contentArea.innerHTML = renderUsersList(data);

     document.getElementById("btnAddUser")?.addEventListener("click", () => bsModalUser.show());
     document.getElementById("btnRefreshUsers")?.addEventListener("click", showUsers);

     document.querySelectorAll(".btn-delete-user").forEach(btn => {
          btn.addEventListener("click", async (e) => {
          const row = (e.target as HTMLElement).closest("tr")!;
          const id = row.getAttribute("data-id")!;
          if (!confirm("Eliminar usuario?")) return;
          await api.deleteUser(id);
          await showUsers();
          });
     });
     } catch (err) {
     console.error(err);
     contentArea.innerHTML = `<div class="alert alert-danger">Error cargando usuarios</div>`;
     }
}

const formAddUser = document.getElementById("formAddUser") as HTMLFormElement | null;
if (formAddUser) {
     formAddUser.addEventListener("submit", async (e) => {
     e.preventDefault();
     const fd = new FormData(formAddUser);
     const payload = { name: String(fd.get("name") ?? ""), email: String(fd.get("email") ?? ""), password: String(fd.get("password") ?? "") };
     await api.createUser(payload);
     bsModalUser.hide();
     formAddUser.reset();
     await showUsers();
     });
}

/* initial hint */
contentArea.innerHTML = `<div class="text-center text-muted">Selecciona una sección.</div>`;