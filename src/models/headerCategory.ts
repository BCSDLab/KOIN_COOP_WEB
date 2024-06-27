export interface SubMenu {
  title: string;
  link: string;
  newFlag: boolean;
  planFlag: boolean;
  tag: number | null;
}

export interface HeaderCategory {
  title: string;
  planFlag: boolean;
  submenu: SubMenu[]
}

export const HEADER_CATEGORY: HeaderCategory[] = [
  {
    title: '식단관리',
    planFlag: true,
    submenu: [
      {
        title: '식단정보',
        link: '/',
        newFlag: true,
        planFlag: true,
        tag: null,
      },
    ],
  },
];
