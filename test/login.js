const assert = require('assert');
const test = require('selenium-webdriver/testing');
require('chromedriver');
const webdriver = require('selenium-webdriver');
const By = require('selenium-webdriver').By;
const until = require('selenium-webdriver').until;

let browser;

test.describe('Login', function() {
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
    test.it('User login and logout', function(done) {
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

        browser
            .findElement(By.xpath('//*[contains(text(), "Logout")]'))
            .then(function(element) {
                element.click();
            });

        browser.wait(
            until.elementLocated(By.xpath('//*[@href = "/login"]')),
            5000,
        );
        done();
    });
});
