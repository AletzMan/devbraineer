export interface MenuItem {
    label: string;
    path: string;
    color?: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    children?: MenuItem[];
}

export type MenuData = MenuItem[];
