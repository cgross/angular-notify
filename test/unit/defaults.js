describe('cgNotify', function() {
    beforeEach(module('cgNotify'));

    var notify;
    var $httpBackend;
    var $http;
    var $templateCache;
    beforeEach(inject(function(_notify_, _$httpBackend_, _$http_, _$templateCache_) {
      notify = _notify_;
      $httpBackend = _$httpBackend_;
      $http = _$http_;
      $templateCache = _$templateCache_;
    }))

    describe('options', function() {
      it('should GET the default template when no templateUrl is provided', function() {
        $httpBackend.when('GET', 'angular-notify.html')
          .respond('<div/>');

        spyOn($http, 'get').and.callThrough();
        notify('Test message');
        expect($http.get).toHaveBeenCalledWith('angular-notify.html', { cache: $templateCache });
      });

      it('should GET the default template when no templateUrl is provided', function() {
        $httpBackend.when('GET', 'test-url.html')
          .respond('<div/>');

        spyOn($http, 'get').and.callThrough();

        notify({
          message: 'Test message',
          templateUrl: 'test-url.html'
        })

        expect($http.get).toHaveBeenCalledWith('test-url.html', { cache: $templateCache });
      });
    });

    afterEach(function() {
      $httpBackend.flush();
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
});
