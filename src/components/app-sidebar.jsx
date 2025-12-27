import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Settings,
  Users,
} from "lucide-react";

const NAVIGATION_CONFIG = [
  {
    title: "Dashboard",
    url: "/home",
    icon: Frame,
  },
  {
    title: "Master",
    url: "#",
    icon: Settings,
    items: [
      {
        title: "Buyer",
        url: "/buyer",
        icon: Users,
      },
    ],
  },

  {
    title: "User Management",
    url: "/userManagement",
    icon: Frame,
  },
  {
    title: "UserType",
    url: "/user-type",
    icon: Frame,
  },
];

const isAllowedByAPI = (item, pagePermissions, userId) => {
  if (!item?.url || item.url === "#") return true;

  const cleanUrl = item.url.replace(/^\//, "");

  return pagePermissions.some(
    (p) =>
      p.page === item.title &&
      p.url === cleanUrl &&
      p.userIds?.includes(String(userId)) &&
      p.status === "Active"
  );
};

const filterSidebarByAPI = (items, pagePermissions, userId) => {
  if (!Array.isArray(items)) return [];

  return items.reduce((acc, item) => {
    if (item.items?.length) {
      const children = filterSidebarByAPI(item.items, pagePermissions, userId);

      if (children.length > 0) {
        acc.push({ ...item, items: children });
      }
    } else if (isAllowedByAPI(item, pagePermissions, userId)) {
      acc.push(item);
    }

    return acc;
  }, []);
};

/* =========================
   TEAMS
========================= */

const TEAMS_CONFIG = [
  {
    name: "AIA",
    logo: GalleryVerticalEnd,
    plan: "",
  },
  {
    name: "Acme Corp.",
    logo: AudioWaveform,
    plan: "Startup",
  },
  {
    name: "Evil Corp.",
    logo: Command,
    plan: "Free",
  },
];

export function AppSidebar({ ...props }) {
  const [openItem, setOpenItem] = useState(null);
  const userId = useSelector((state) => state.auth.user.id);
  const user = useSelector((state) => state.auth.user);
  const { pagePermissions, loading } = useSelector(
    (state) => state.permissions
  );
  const filteredNavMain = useMemo(() => {
    return filterSidebarByAPI(NAVIGATION_CONFIG, pagePermissions, userId);
  }, [pagePermissions, userId]);

  const sidebarData = {
    user: {
      name: user?.name || "User",
      email: user?.email || "user@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: TEAMS_CONFIG,
    navMain: filteredNavMain,
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} />
      </SidebarHeader>

      <SidebarContent className="sidebar-content">
        <NavMain
          items={sidebarData.navMain}
          openItem={openItem}
          setOpenItem={setOpenItem}
        />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
