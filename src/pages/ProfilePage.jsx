import { useDispatch, useSelector } from "react-redux";

import {
  selectProfileTab,
  setProfileTab,
} from "../features/profile/profileSlice";

import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileDashboard from "../components/profile/ProfileDashboard";
import ProfileOrders from "../components/profile/ProfileOrders";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfileAddresses from "../components/profile/ProfileAddresses";
import ProfileFavorites from "../components/profile/ProfileFavorites";

export default function ProfilePage() {
  const dispatch = useDispatch();

  const activeTab = useSelector(selectProfileTab);

  const setActiveTab = (tab) => {
    dispatch(setProfileTab(tab));
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <ProfileDashboard />;

      case "orders":
        return <ProfileOrders />;

      case "profile":
        return <ProfileInfo />;

      case "addresses":
        return <ProfileAddresses />;

      case "favorites":
        return <ProfileFavorites />;

      default:
        return <ProfileInfo />;
    }
  };

  return (
    <main
      dir="rtl"
      className="min-h-[calc(100vh-74px)] bg-somak-950 px-4 pb-20 pt-10 sm:px-6 sm:pt-14"
    >
      {/* PAGE TITLE */}
      <div className="mx-auto mb-8 max-w-[900px]">
        <h1 className="text-center text-2xl font-medium text-white sm:text-[27px]">
          پروفایل
        </h1>
      </div>

      {/* PROFILE */}
      <div className="mx-auto flex w-full max-w-[900px] flex-col gap-5 lg:flex-row lg:items-start lg:gap-6">
        {/* SIDEBAR */}
        <ProfileSidebar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* MAIN CONTENT */}
        {renderContent()}
      </div>
    </main>
  );
}
