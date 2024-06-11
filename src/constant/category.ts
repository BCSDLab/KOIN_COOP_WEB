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

export const TOTAL_CATEGORY = 1;

export const CATEGORY_COOP: HeaderCategory[] = [
  {
    title: '식단관리',
    planFlag: true,
    submenu: [
      {
        title: '식단정보',
        link: '/coop',
        newFlag: true,
        planFlag: true,
        tag: null,
      },
    ],
  },
];
