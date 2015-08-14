describe('cgNotify', function() {
  beforeEach(module('cgNotify'));

  beforeEach(module('cgNotify', function(notifyProvider) {
    notifyProvider.setDefaults({
      startTop: 20,
      verticalSpacing: 30,
      duration: 20000,
      templateUrl: 'non-default.html',
      position: 'right',
      container: 'nothing',
      maximumOpen: 1,
    });
  }));

  var notify;
  beforeEach(inject(function(_notify_) {
    notify = _notify_;
  }));

  describe('provider', function() {
    it('should allow global configuration of notify options', function() {
      var args = notify._setupArgs('Test message');
      expect(args.startTop).toBe(20);
      expect(args.verticalSpacing).toBe(30);
      expect(args.duration).toBe(20000);
      expect(args.templateUrl).toBe('non-default.html');
      expect(args.position).toBe('right');
      expect(args.container).toBe('nothing');
      expect(args.maximumOpen).toBe(1);
    });
  });
});
