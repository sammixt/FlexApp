export class ProductViewmodel {
    constructor(
        public product_description?: string,
        public product_id?: number,              
        public related_product?: string,              
        public product_name?: string,              
        public product_detail?: string,
        public option ?: Array<any> 
    ){}
    
}
