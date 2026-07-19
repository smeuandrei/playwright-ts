import { Page, expect } from "@playwright/test";

export class ProductPage{

    readonly productCard: string;
    readonly productName: string;
    readonly productDescription: string;
    readonly productPrice: string;
    readonly filterDropdown: string;
    readonly productPageName: string;

    constructor(private page: Page){
        this.productCard = '.inventory_item';
        this.productName = '.inventory_item_name';
        this.productDescription = '.inventory_item_desc';
        this.productPrice = '.inventory_item_price'
        this.filterDropdown = '.product_sort_container';
        this.productPageName = '.inventory_details_name.large_size';

    }

    async verifyFirstProductName(productName: string){
        await expect(this.page.locator(this.productName).first()).toHaveText(productName);
    }

    async verifyLastProductName(productName: string){
        await expect(this.page.locator(this.productName).last()).toHaveText(productName);
    }

    async verifyProductNameFromList(productName: string, listNumber: number){
        listNumber = listNumber - 1;
        await expect(this.page.locator(this.productName).nth(listNumber)).toHaveText(productName);
    }

    async filterProduct(filterOption: string){
        await this.page.selectOption(this.filterDropdown, filterOption);
    }

    async checkProductData(productName: string, productDescription: string, productPrice: string){
        const currentProduct = this.page.locator(this.productCard).filter({hasText: productName});
        await expect(currentProduct.locator(this.productName)).toHaveText(productName);
        await expect(currentProduct.locator(this.productDescription)).toHaveText(productDescription);
        await expect(currentProduct.locator(this.productPrice)).toHaveText(productPrice);
    }

    async accessProductPage(prouctName: string){
        const currentProduct = this.page.locator(this.productCard).filter({hasText: prouctName});
        await currentProduct.locator(this.productName).click();
        await expect(this.page.locator(this.productPageName)).toHaveText(prouctName);
    }

    

}