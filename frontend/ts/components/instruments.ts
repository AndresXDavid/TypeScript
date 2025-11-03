// frontend/ts/components/instruments.ts
export function renderInstrumentsList(data: any[]): string {
     function escapeHtml(s: string | undefined) {
     if (!s) return "";
     return String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]!));
     }

     return `
     <div class="d-flex justify-content-between align-items-center mb-3">
          <h4>Instrumentos (${data.length})</h4>
          <div>
          <button id="btnAddInstrument" class="btn btn-primary btn-sm">Agregar</button>
          <button id="btnRefreshInstruments" class="btn btn-outline-secondary btn-sm">Refrescar</button>
          </div>
     </div>

     <div class="table-responsive">
          <table class="table table-hover">
          <thead>
               <tr>
               <th>Nombre</th><th>Marca</th><th>Año</th><th>Tipo</th><th>Acciones</th>
               </tr>
          </thead>
          <tbody>
               ${data.map(i => `
               <tr data-id="${i._id}">
               <td>${escapeHtml(i.name)}</td>
               <td>${escapeHtml(i.brand ?? "")}</td>
               <td>${i.year ?? ""}</td>
               <td>${escapeHtml(i.type?.name ?? "—")}</td>
               <td>
                    <button class="btn btn-danger btn-sm btn-delete-instrument">Eliminar</button>
               </td>
               </tr>
               `).join("")}
          </tbody>
          </table>
     </div>
     `;
}