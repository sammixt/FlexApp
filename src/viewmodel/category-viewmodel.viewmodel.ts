export class CategoryViewmodel {
     constructor(public id?: number, 
              public name?:string, 
              public hasSubCategory: boolean = false,
              public parentId: number = 0){ }
}
