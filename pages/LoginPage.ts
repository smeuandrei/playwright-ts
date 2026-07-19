import {Page, expect} from '@playwright/test';

export class LoginPage {

    readonly url:string;
    readonly username:string;
    readonly password:string;
    readonly submitButton:string;
    readonly inventoryContainer:string;
    readonly errorMessage:string;

    constructor(private page: Page){
        this.url= 'https://www.saucedemo.com';
        this.username = '#user-name';
        this.password = '#password';
        this.submitButton = '#login-button';
        this.inventoryContainer = '#inventory_container';
        this.errorMessage = '#login_button_container > div > form > div.error-message-container.error > h3';
    }

    async accessSite(){
        await this.page.goto(this.url);
        await this.page.waitForSelector(this.username);
    }

    async validLogin(username: string, password: string){
        await this.page.fill(this.username,username);
        await this.page.fill(this.password,password);
        await this.page.click(this.submitButton);
        await this.page.waitForSelector(this.inventoryContainer);
    }

    async invalidLogin(username: string, password: string, errorMessage: string){
        await this.page.fill(this.username,'');
        await this.page.fill(this.password,'');
        await this.page.fill(this.username,username);
        await this.page.fill(this.password,password);
        await this.page.click(this.submitButton);
        await expect(this.page.locator(this.errorMessage)).toHaveText(errorMessage);
    }
}
