describe('cgNotify', function() {
  beforeEach(function() {
    browser.get('http://localhost:9001/demo/index.html');
  });

  it('should show a single sample message when "Demo" button is clicked', function() {
    expect(element.all(by.css('.cg-notify-message')).count()).toBe(0);
    element(by.css('#demo')).click().then(function() {
      expect(element.all(by.css('.cg-notify-message')).count()).toBe(1);
    });
  });
});
