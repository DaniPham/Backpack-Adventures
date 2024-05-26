import {expect , type Locator, type Page} from '@playwright/test';
import { BasePage } from './base';

export class FilterCountryPage extends BasePage{
    readonly locators_extend: any;
    constructor(page: Page){
        super(page);
        this.locators_extend = {
            filterTitle: page.locator('//h1[@class="block-title"]/span'),
            feeds: page.locator('//div[@class="blog-feed"]'),
            firstPost: page.locator('.col-md-4').first()
        }
    }

    async get_filter_title(){
        return await this.locators_extend.filterTitle.textContent();
    }
}
            