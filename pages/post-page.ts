import { expect, type Locator, type Page} from '@playwright/test';
import { BasePage } from '../pages/base';

export class PostPage extends BasePage{
    readonly locators_extend: any;
    constructor(page: Page){
        super(page);
        this.locators_extend = {
            postDate: page.locator('//div[@class="entry-date date updated"]'),
            postTitle: page.locator('//h1[@class="entry-title"]'),
            postContent: page.locator('//div[@class="single-content"]'),
            tweetButton: page.getByRole('link', { name: 'N Tweet' }),
            pinButton: page.locator('a').filter({ hasText: 'Pin' }),
            shareButton: page.getByRole('link', { name: 'k Share' }),
            replyTitle: page.locator('//h3[@id="reply-title"]'),
            nameLabel: page.locator('//label[text()="Name"]'),
            nameField: page.locator('//input[@id="author"]'),
            emailLabel: page.locator('//label[text()="Email Address"]'),
            emailField: page.locator('//input[@id="email"]'),
            websiteLabel: page.locator('//label[text()="Website"]'),
            websiteField: page.locator('//input[@id="url"]'),
            commentLabel: page.locator('//label[text()="Comment"]'),
            commentField: page.locator('//textarea[@id="comment"]'),
            saveInfoCheckbox: page.locator('//input[@id="comment-cookies-consent"]'),
            saveInfoLabel: page.locator('//label[@for="comment-cookies-consent"]'),
            submitButton: page.locator('//input[@id="submit"]'),
        };
    }

    async reply_to_post(name: string, email: string, website: string, comment: string, saveInfo: boolean){
        await this.locators_extend.nameField.fill(name);
        await this.locators_extend.emailField.fill(email);
        await this.locators_extend.websiteField.fill(website);
        await this.locators_extend.commentField.fill(comment);
        if(saveInfo){
            await this.locators_extend.saveInfoCheckbox.check();
        }
        await this.locators_extend.submitButton.click();
    }
}