import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/base';
import { MainPage } from '../pages/main-page';
import { AboutMePage } from '../pages/about-me-page';
import { PostPage } from '../pages/post-page';
import { SearchPage } from '../pages/search-page';
import { FilterCountryPage } from '../pages/filter-country-page';

test.describe('Functional testing', () => {
    let page: any;
    let main: MainPage;
    let aboutMe: AboutMePage;
    let post: PostPage;
    let search: SearchPage;
    let filterCountry: FilterCountryPage;

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        main = new MainPage(page);
        aboutMe = new AboutMePage(page);
        post = new PostPage(page);
        search = new SearchPage(page);
        filterCountry = new FilterCountryPage(page);
        await page.goto('https://backpackadventures.org/');
    });

    test('Main page check loading', async () => {
        const visibilityMap = await main.are_elements_visible(true);
        // Check if all elements are visible
        expect(visibilityMap.logo).toBe(true);
        expect(visibilityMap.aboutMeTab).toBe(true);
        expect(visibilityMap.asiaTab).toBe(true);
        expect(visibilityMap.middleEastTab).toBe(true);
        expect(visibilityMap.caucasusTab).toBe(true);
        expect(visibilityMap.easternEuropeTab).toBe(true);
        expect(visibilityMap.europeTab).toBe(true);
        expect(visibilityMap.americasTab).toBe(true);
        expect(visibilityMap.searchButton).toBe(true);
        expect(visibilityMap.copyRight).toBe(true);
        expect(visibilityMap.addition).toBe(true);
        expect(visibilityMap.aboutMeLabelWidget).toBe(true);
        expect(visibilityMap.aboutMeAvatarWidget).toBe(true);
        expect(visibilityMap.aboutMeMessageWidget).toBe(true);
        expect(visibilityMap.followMeLabelWidget).toBe(true);
        expect(visibilityMap.instagramLinkWidget).toBe(true);
        expect(visibilityMap.twitterLinkWidget).toBe(true);
        expect(visibilityMap.facebookLinkWidget).toBe(true);
        expect(visibilityMap.searchFieldWidget).toBe(true);
        expect(visibilityMap.searchButtonWidget).toBe(true);
    });

    test('About me page check loading', async () => {
        await main.click_on_about_me_tab();
        const visibilityMap = await aboutMe.are_elements_visible(true);
        // Check if all elements are visible
        expect(visibilityMap.aboutMeTitle).toBe(true);
        expect(visibilityMap.content).toBe(true);
        expect(visibilityMap.tweetButton).toBe(true);
        expect(visibilityMap.pinButton).toBe(true);
        expect(visibilityMap.shareButton).toBe(true);
    });

    test('Post page check loading', async () => {
        //Select the first post
        await main.click_on_first_post();
        const visibilityMap = await post.are_elements_visible(true);
        // Check if all elements are visible
        expect(visibilityMap.postTitle).toBe(true);
        expect(visibilityMap.postContent).toBe(true);
        expect(visibilityMap.tweetButton).toBe(true);
        expect(visibilityMap.pinButton).toBe(true);
        expect(visibilityMap.shareButton).toBe(true);
        expect(visibilityMap.replyTitle).toBe(true);
        expect(visibilityMap.nameLabel).toBe(true);
        expect(visibilityMap.nameField).toBe(true);
        expect(visibilityMap.emailLabel).toBe(true);
        expect(visibilityMap.emailField).toBe(true);
        expect(visibilityMap.websiteLabel).toBe(true);
        expect(visibilityMap.websiteField).toBe(true);
        expect(visibilityMap.commentLabel).toBe(true);
        expect(visibilityMap.commentField).toBe(true);
        expect(visibilityMap.saveInfoCheckbox).toBe(true);
        expect(visibilityMap.saveInfoLabel).toBe(true);
        expect(visibilityMap.submitButton).toBe(true);
    });

    test('Search page check loading', async () => {
        //Search for Georgia
        await main.search_2('Georgia');
        const visibilityMap = await search.are_elements_visible(true);
        // Check if all elements are visible
        expect(visibilityMap.feeds).toBe(true);
        expect(visibilityMap.firstPost).toBe(true);
        // Check if the search result is correct
        expect(await search.get_search_result()).toBe('Search Results: Georgia');
    });

    test('Search page with nothing', async () => {
        //Search for Georgia
        await main.search_2('Georgia');
        const visibilityMap = await search.are_elements_visible(true);
        // Check if all elements are visible
        expect(visibilityMap.feeds).toBe(true);
        expect(visibilityMap.firstPost).toBe(true);
        // Check if the search result is correct
        expect(await search.get_search_result()).toBe('Search Results:');
    });

    test('Filter by country', async () => {
        await main.filter_country('Asia', 'Cambodia');
        const visibilityMap = await filterCountry.are_elements_visible(false);
        // Check if all elements are visible
        expect(visibilityMap.filterTitle).toBe(true);
        expect(visibilityMap.feeds).toBe(true);
        expect(visibilityMap.firstPost).toBe(true);
        // Check if the filter title is correct
        expect(await filterCountry.get_filter_title()).toBe('Cambodia');
    });

    // test('Reply to post', async () => {
    //     await main.click_on_first_post();
    //     await post.reply_to_post('John Doe', 'johndoe@gmail.com', 'https://johndoe.com', 'This is a test comment', true);
    //     // Check if the reply was successful

    // });

    // test('Reply to post without name', async () => {
    //     await main.click_on_first_post();
    //     await post.reply_to_post('', 'johndoe@gmail.com', 'https://johndoe.com', 'This is a test comment', true);
    //     // Check if the reply was successful
    // });

    // test('Reply to post without email', async () => {
    //     await main.click_on_first_post();
    //     await post.reply_to_post('John Doe', '', 'https://johndoe.com', 'This is a test comment', true);
    //     // Check if the reply was successful
    // });

});
