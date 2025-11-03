// frontend/ts/services/api.ts
const API = `${location.protocol}//${location.hostname}:${location.port}/api`;

export async function getInstruments(): Promise<any[]> {
     const res = await fetch(`${API}/instruments`);
     if (!res.ok) throw new Error("Error fetching instruments");
     return res.json();
}

export async function createInstrument(payload: any): Promise<any> {
     const res = await fetch(`${API}/instruments`, {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(payload)
     });
     if (!res.ok) throw new Error("Error creating instrument");
     return res.json();
}

export async function deleteInstrument(id: string): Promise<any> {
     const res = await fetch(`${API}/instruments/${id}`, { method: "DELETE" });
     if (!res.ok) throw new Error("Error deleting instrument");
     return res.json();
}

/* Types */
export async function getTypes(): Promise<any[]> {
     const res = await fetch(`${API}/types`);
     if (!res.ok) throw new Error("Error fetching types");
     return res.json();
}
export async function createType(payload: any): Promise<any> {
     const res = await fetch(`${API}/types`, {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(payload)
     });
     if (!res.ok) throw new Error("Error creating type");
     return res.json();
}
export async function deleteType(id: string): Promise<any> {
     const res = await fetch(`${API}/types/${id}`, { method: "DELETE" });
     if (!res.ok) throw new Error("Error deleting type");
     return res.json();
}

/* Users */
export async function getUsers(): Promise<any[]> {
     const res = await fetch(`${API}/users`);
     if (!res.ok) throw new Error("Error fetching users");
     return res.json();
}
export async function createUser(payload: any): Promise<any> {
     const res = await fetch(`${API}/users`, {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(payload)
     });
     if (!res.ok) throw new Error("Error creating user");
     return res.json();
}
export async function deleteUser(id: string): Promise<any> {
     const res = await fetch(`${API}/users/${id}`, { method: "DELETE" });
     if (!res.ok) throw new Error("Error deleting user");
     return res.json();
}