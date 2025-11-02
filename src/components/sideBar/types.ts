type TRoutes = "home" | "library" | "settings" | "upload" | "account";

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
