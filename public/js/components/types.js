export function renderTypesList(data) {
    function escapeHtml(s) {
        if (!s)
            return "";
        return String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
    }
    return `
     <div class="d-flex justify-content-between align-items-center mb-3">
          <h4>Tipos (${data.length})</h4>
          <div>
          <button id="btnAddType" class="btn btn-success btn-sm">Agregar</button>
          <button id="btnRefreshTypes" class="btn btn-outline-secondary btn-sm">Refrescar</button>
          </div>
     </div>

     <ul class="list-group">
          ${data.map(t => `
          <li class="list-group-item d-flex justify-content-between align-items-center" data-id="${t._id}">
               <div>
               <strong>${escapeHtml(t.name)}</strong><br />
               <small class="text-muted">${escapeHtml(t.description ?? "")}</small>
               </div>
               <div>
               <button class="btn btn-danger btn-sm btn-delete-type">Eliminar</button>
               </div>
          </li>
          `).join("")}
     </ul>
     `;
}
