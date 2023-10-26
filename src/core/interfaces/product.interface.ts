import { ProductTypeEnum } from "../enums/product-type.enum";

export interface IProduct {
    id: string;
    code: string;
    name: string;
    type: ProductTypeEnum,
}