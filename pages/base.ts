import { expect, type Locator, type Page} from '@playwright/test';

export class BasePage{
    readonly page: Page;
    url: string;
    readonly locators: any;
    readonly locators_extend: any;
    readonly locators_widget: any;
    constructor(page: Page){
        this.page = page;
        this.url = '';
        this.locators = {
            // Header
            logo: page.locator('//div[@class="logo"]'),
            aboutMeTab: page.locator('//ul[@class="nav navbar-nav"]').getByRole('link', { name: 'About me' }),
            asiaTab: page.locator('//ul[@class="nav navbar-nav"]').getByRole('link', { name: 'Asia' }),
            middleEastTab: page.locator('//ul[@class="nav navbar-nav"]').getByRole('link', { name: 'Middle East' }),
            caucasusTab: page.locator('//ul[@class="nav navbar-nav"]').getByRole('link', { name: 'Caucasus' }),
            easternEuropeTab: page.locator('//ul[@class="nav navbar-nav"]').getByRole('link', { name: 'Eastern Europe' }),
            europeTab: page.locator('//ul[@class="nav navbar-nav"]').getByRole('link', { name: 'Europe' }).nth(1),
            americasTab: page.locator('//ul[@class="nav navbar-nav"]').getByRole('link', { name: 'America' }),
            searchButton: page.locator('//a[@id="toggle-main_search"]'),
            //searchField: page.locator('//input[@class="form-control"]'),
            //footer
            copyRight: page.getByText('Copyright © 2023 Ellis Veen'),
            addition: page.getByText('Kale by LyraThemes.com.')
        };
        this.locators_widget = {
            aboutMeLabelWidget: page.getByRole('complementary').locator('//span[text()="About me"]'),
            aboutMeAvatarWidget: page.getByRole('complementary').locator('#text-5 img'),
            aboutMeMessageWidget: page.getByRole('complementary').getByText('Hello, I am Ellis. A cultural'),
            followMeLabelWidget: page.getByRole('complementary').locator('//span[text()="Follow me"]'),
            instagramLinkWidget: page.getByRole('complementary').locator('//a[@href="https://www.instagram.com/ellis.veen"]'),
            twitterLinkWidget: page.getByRole('complementary').locator('//a[@href="https://twitter.com/EllisVeen"]'),
            facebookLinkWidget: page.getByRole('complementary').locator('//a[@href="https://www.facebook.com/backpackadventures.org"]'),
            searchFieldWidget: page.getByRole('searchbox'),
            searchButtonWidget: page.getByRole('button', { name: 'Search' }),
        }
    }

    async are_elements_visible(widget: boolean){
        const visibilityMap: {[key: string]: boolean} = {};
        for (const [key, locator] of Object.entries(this.locators)){
            await (locator as Locator).waitFor({state: 'visible'});
            visibilityMap[key] = await (locator as Locator).isVisible();
        }
        for (const [key, locator] of Object.entries(this.locators_extend)){
            await (locator as Locator).waitFor({state: 'visible'});
            visibilityMap[key] = await (locator as Locator).isVisible();
        }
        if (widget){
            for (const [key, locator] of Object.entries(this.locators_widget)){
                await (locator as Locator).waitFor({state: 'visible'});
                visibilityMap[key] = await (locator as Locator).isVisible();
            }
        }
        return visibilityMap;
    }

    async click_on_logo(){
        await this.locators.logo.click();
    }

    async click_on_about_me_tab(){
        await this.locators.aboutMeTab.click();
    }

    async toggle_search(){
        await this.locators.searchButton.click();
    }

    async search_1(text: string){
        await this.locators.searchField.fill(text);
        await this.locators.searchField.press('Enter');
    }

    async search_2(text: string){
        await this.locators_widget.searchFieldWidget.fill(text);
        await this.locators_widget.searchButtonWidget.click();
    }

    async filter_country(region: string, country: string){
        await this.page.locator('//ul[@class="nav navbar-nav"]').getByRole('link', { name: region }).click();
        await this.page.getByRole('link', { name: country }).waitFor({state: 'visible'});
        await this.page.getByRole('link', { name: country }).click();
    }
}
