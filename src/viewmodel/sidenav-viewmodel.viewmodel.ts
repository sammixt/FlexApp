export class SidenavViewmodel {
     constructor(public id: number,
                public name: string,
                public routerLink?: string,
                public href?: string,
                public target?: string,
                public hasSubMenu?: boolean,
                public parentId?: number) { }
}
