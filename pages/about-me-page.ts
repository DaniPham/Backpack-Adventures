import { expect, type Locator, type Page} from '@playwright/test';
import { BasePage } from '../pages/base';

export class AboutMePage extends BasePage{
    readonly locators_extend: any;
    constructor(page: Page){
        super(page);
        this.locators_extend = {
            aboutMeTitle: page.locator('//h1[@class="entry-title"]/center'),
            content: page.locator('//div[@class="page-content"]'),
            tweetButton: page.getByRole('link', { name: 'N Tweet' }),
            pinButton: page.locator('a').filter({ hasText: 'Pin' }),
            shareButton: page.getByRole('link', { name: 'k Share' }),
        };
    }
}