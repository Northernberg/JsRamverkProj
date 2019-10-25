const assert = require('assert');
const test = require('selenium-webdriver/testing');
const { By, until } = require('selenium-webdriver');
require('chromedriver');
const webdriver = require('selenium-webdriver');

let browser;

test.describe('Reports', function() {
    test.beforeEach(function(done) {
        this.timeout(20000);
        browser = new webdriver.Builder()
            .forBrowser('chrome')
            .build();

        browser.get('https://onlinesoppa.me/');
        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });

    test.it('Anonymous updates report', function(done) {
        // Check correct title
        browser.getTitle().then(function(title) {
            assert.equal(title, 'React App');
        });

        // Go into reports page
        browser
            .findElement(By.xpath('//*[@href = "/reports"]'))
            .then(function(element) {
                element.click();
            });

        browser
            .wait(
                until.elementLocated(
                    By.xpath('//a[@href = "/reports/week/1"]'),
                ),
                5000,
            )
            .click();

        browser.wait(
            until.elementIsVisible(
                browser.findElement(By.css('.reportInfo')),
            ),
            5000,
        );
        // Sleep so that content can load
        browser.sleep(2000);
        browser
            .wait(
                until.elementIsVisible(
                    browser.findElement(
                        By.xpath('//button[@type="submit"]'),
                    ),
                ),
                5000,
            )
            .click();

        browser.wait(until.elementLocated(By.name('data')), 5000);

        // Type in new text
        browser.findElement(By.name('data')).then(function(element) {
            element.sendKeys('This is new text');
        });

        done();
    });

    test.it('User updates report', function(done) {
        // Check correct title
        browser.getTitle().then(function(title) {
            assert.equal(title, 'React App');
        });

        // Go to login page
        browser
            .findElement(By.xpath('//*[@href = "/login"]'))
            .then(function(element) {
                element.click();
            });
        // Find login heading
        browser.findElement(By.css('h1')).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, 'Login');
            });
        });

        browser
            .findElement(By.xpath('//*[@name = "email"]'))
            .then(function(element) {
                element.sendKeys('testsson@gmail.com');
            });

        browser
            .findElement(By.xpath('//*[@name = "password"]'))
            .then(function(element) {
                element.sendKeys('test12345');
                element.submit();
            });

        browser.wait(
            until.elementLocated(
                By.xpath('//h1[contains(text(), "Home")]'),
            ),
            5000,
        );

        // Go into reports page
        browser
            .findElement(By.xpath('//a[@href = "/reports"]'))
            .then(function(element) {
                element.click();
            });

        browser.wait(until.elementLocated(By.xpath('//h2[1]')), 5000);

        // Create test report
        browser
            .findElement(By.css('#select-week'))
            .then(function(element) {
                element.click();
            });

        browser
            .findElement(By.xpath('//li[@data-value = 5]'))
            .then(function(element) {
                element.click();
            });

        browser.sleep(1000);
        browser
            .findElement(By.xpath('//button[@type="submit"]'))
            .then(function(element) {
                element.click();
            });

        //Press 5th week's report
        browser
            .findElement(By.xpath('//a[@href = "/reports/week/5"]'))
            .then(function(element) {
                element.click();
            });

        browser.sleep(2000);

        browser.wait(
            until.elementLocated(
                By.xpath('//button[@type="submit"]'),
            ),
            2000,
        );
        // Press update report
        browser
            .findElement(By.xpath('//button[@type="submit"]'))
            .then(function(element) {
                element.click();
            });

        browser.wait(until.elementLocated(By.name('data')), 2000);

        browser.findElement(By.name('data')).then(function(element) {
            element.clear();
        });

        // Type in new text
        browser.findElement(By.name('data')).then(function(element) {
            element.sendKeys('This is new text');
        });

        browser
            .findElement(By.xpath('//button[@type = "submit"][1]'))
            .then(function(element) {
                element.click();
            });

        browser.wait(until.elementLocated(By.xpath('//h1[1]')), 2000);

        browser
            .findElement(
                By.xpath(
                    '//button//span[contains(text(), "Delete")]',
                ),
            )
            .then(function(element) {
                element.click();
            });
        done();
    });
});
