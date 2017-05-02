import { browser, element, by } from 'protractor';

export class HelloAngularCliPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('#inner_page_title h1')).getText();
  }
}
