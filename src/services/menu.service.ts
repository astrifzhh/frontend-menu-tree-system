import { api } from "@/src/lib/api";

export interface MenuDto {
  name: string;
  parentId?: string | null;
  sortOrder?: number;
}

export interface MoveMenuDto {
  parentId: string | null;
  sortOrder: number;
}

export const MenuService = {
  // 1. GET ALL
  async getAll() {
    const res = await api.get("/api/menus");
    return res.data;
  },

  // 2. CREATE
  async create(data: MenuDto) {
    const res = await api.post("/api/menus", data);
    return res.data;
  },

  // 3. UPDATE (Ganti Nama)
  // Backend: @Put(':id') -> Frontend: api.put
  async update(id: string, data: Partial<MenuDto>) {
    const res = await api.put(`/api/menus/${id}`, data); // <--- GANTI JADI PUT
    return res.data;
  },

  // 4. DELETE
  async delete(id: string) {
    const res = await api.delete(`/api/menus/${id}`);
    return res.data;
  },

  // 5. MOVE (Pindah Parent)
  // Backend: @Patch(':id/move') -> Frontend: api.patch
  async move(id: string, data: MoveMenuDto) {
    const res = await api.patch(`/api/menus/${id}/move`, data); // <--- GANTI JADI PATCH
    return res.data;
  },

  // 6. REORDER (Ganti Urutan)
  // Backend: @Patch(':id/reorder') -> Frontend: api.patch
  async reorder(id: string, data: MoveMenuDto) {
    const res = await api.patch(`/api/menus/${id}/reorder`, data); // <--- GANTI JADI PATCH
    return res.data;
  },
};
