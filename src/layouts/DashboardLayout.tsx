import { NavLink, Outlet } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Mes cours" },
  { to: "/instructor", label: "Espace instructeur" },
  { to: "/admin", label: "Administration" },
];

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-black">
      <aside className="w-64 border-r bg-black p-6">
        <div className="mb-8 text-xl font-bold text-indigo-600">
          nexoralearn
        </div>
        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive
                    ? "bg-black text-indigo-400"
                    : "text-gray-300 hover:bg-gray-900"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
