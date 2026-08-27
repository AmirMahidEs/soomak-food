import { useDispatch, useSelector } from "react-redux";
import { selectAdminTab, setAdminTab } from "../../features/admin/adminSlice";

import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

import AdminPage from "../../pages/admin/AdminPage";
import AdminProductsPage from "../../pages/admin/AdminProductsPage";
import AdminOrdersPage from "../../pages/admin/AdminOrdersPage";
import AdminCategoriesPage from "../../pages/admin/AdminCategoriesPage";
import AdminUsersPage from "../../pages/admin/AdminUserPage";

export default function AdminLayout() {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectAdminTab);
  const setActiveTab = (tab) => dispatch(setAdminTab(tab));

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminPage />;

      case "products":
        return <AdminProductsPage />;

      case "orders":
        return <AdminOrdersPage />;

      case "categories":
        return <AdminCategoriesPage />;

      case "users":
        return <AdminUsersPage />;

      default:
        return <AdminPage />;
    }
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-somak-950 px-4 pb-16 pt-6 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-start gap-5">
        {/* SIDEBAR */}
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* MAIN */}
        <div className="min-w-0 flex-1">
          <AdminHeader activeTab={activeTab} />

          <div className="mt-5">{renderContent()}</div>
        </div>
      </div>
    </main>
  );
}
