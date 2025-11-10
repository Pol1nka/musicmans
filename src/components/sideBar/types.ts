type TRoutes = "home" | "library" | "settings" | "upload" | "profile" | "packs" | "plans";

export interface INavItem {
  title: string;
  routeName: TRoutes;
}

export interface INavChapter {
  title: string;
}

export interface ISideBar {
  width?: string;
}
