export function renderUsersList(data) {
    function escapeHtml(s) {
        if (!s)
            return "";
        return String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
    }
    return `
     <div class="d-flex justify-content-between align-items-center mb-3">
          <h4>Usuarios (${data.length})</h4>
          <div>
          <button id="btnAddUser" class="btn btn-info btn-sm">Agregar</button>
          <button id="btnRefreshUsers" class="btn btn-outline-secondary btn-sm">Refrescar</button>
          </div>
     </div>

     <div class="table-responsive">
          <table class="table table-striped">
          <thead><tr><th>Nombre</th><th>Email</th><th>Acciones</th></tr></thead>
          <tbody>
               ${data.map(u => `
               <tr data-id="${u._id}">
               <td>${escapeHtml(u.name)}</td>
               <td>${escapeHtml(u.email)}</td>
               <td><button class="btn btn-danger btn-sm btn-delete-user">Eliminar</button></td>
               </tr>
               `).join("")}
          </tbody>
          </table>
     </div>
     `;
}
