import { HelloAngularCliPage } from './app.po';
import { async } from '@angular/core/testing';

describe('hello-angular-cli App', () => {
  let page: HelloAngularCliPage;

  beforeEach(() => {
    page = new HelloAngularCliPage();
  });

  it('should display message saying app works', async() => {
    page.navigateTo();
    const subject = await page.getParagraphText();
    //expect(page.getParagraphText()).toEqual('FHA Sec. 223(f) refinance/purchase demo');
    expect(subject).toEqual('FHA Sec. 223(f) refinance/purchase demo');
  });
});
