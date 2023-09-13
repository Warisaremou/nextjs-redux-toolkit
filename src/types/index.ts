export interface NavItem {
    title: string;
    href?: string;
    disabled?: boolean;
    external?: boolean;
    // icon?: keyof typeof Icons;
    label?: string;
    description?: string;
}

export interface NavItemWithChildren extends NavItem {
    items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
    items?: NavItemWithChildren[];
}

// Products Types
// export interface ProductType {
//     id: string;
//     name: string;
//     price: number;
//     image: string;
// }

export interface ProductType {
    id: string;
    title: string;
    description: string;
    featuredImage: {
        id: string;
        url: string;
    };
    variants: {
        edges: {
            cursor: string;
            node: {
                id: string;
                title: string;
                image: {
                    url: string;
                };
                price: {
                    amount: string;
                    currencyCode: string;
                };
            };
        }[];
    };
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;
