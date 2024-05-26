import {expect , type Locator, type Page} from '@playwright/test';
import { BasePage } from './base';

export class SearchPage extends BasePage{
    readonly locators_extend: any;
    constructor(page: Page){
        super(page);
        this.locators_extend = {
            searchResult: page.locator('//h2[contains(.,"Search Result")]'),
            feeds: page.locator('.main-column > .blog-feed'),
            firstPost: page.locator('.col-md-6').first()
        }
    }

    async get_search_result(){
        return await this.locators_extend.searchResult.textContent();
    }
    
}
            