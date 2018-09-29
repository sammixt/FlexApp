export class ProductsViewmodel {
    constructor(
              public product_id?: number,
              public name?: string,
              public images?: Array<any>,
              public oldPrice?: number,
              public newPrice?: number,
              public discount?: number,
              public ratingsCount?: number,
              public ratingsValue?: number,
              public product_description?: string,
              public availibilityCount?: number,
              public color?: Array<string>,
              public size?: Array<string>,
              public organisation?: Array<any>,
              public weight?: number,
              public categoryId?: number,
              public sub_category?: number,
              public detail?: string,
              public keywords?:string	){ }
}
