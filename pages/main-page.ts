import { expect, type Locator, type Page} from '@playwright/test';
import { BasePage } from '../pages/base';

export class MainPage extends BasePage{
    readonly locators_extend: any;
    constructor(page: Page){
        super(page);
        this.locators_extend = {
            feeds: page.locator('.main-column > .blog-feed'),
            firstPost: page.locator('.col-md-6').first()
        };
    }

    async click_on_first_post(){
        await this.locators_extend.firstPost.locator('a').nth(0).click();
    }
}