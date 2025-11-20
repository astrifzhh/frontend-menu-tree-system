import { MenuService } from "@/src/services/menu.service";
import Sidebar from "../components/Sidebar";
import MenuManager from "../components/MenuManager";

export default async function Home() {
  const menus = await MenuService.getAll();

  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* SIDEBAR UTAMA (BIRU) */}
      {/* Fixed width w-64 (256px) di desktop */}
      <div className="hidden lg:block h-full flex-none w-auto lg:mr-4">
        <Sidebar items={menus} />
      </div>

      {/* AREA KONTEN UTAMA */}
      <main className="flex-1 flex overflow-hidden">
        <MenuManager items={menus} />
      </main>
    </div>
  );
}
