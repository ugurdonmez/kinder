describe('Cookie service test', function() {

    var mockCookieService;

    beforeEach(angular.mock.module('kinder-app'));

    beforeEach(inject(function(_CookieService_) {
        mockCookieService = _CookieService_;
    }));

    it('should exist', function() {
        expect(mockCookieService).toBeDefined();
    });

    it('should exist', function() {
        expect(mockCookieService.addToCookie).toBeDefined();
    });
    
    it('should exist', function() {
        expect(mockCookieService.getFromCookie).toBeDefined();
    });
    
    it('should return from cookie', function() {
        mockCookieService.addToCookie('testKey', 'testValue');
        expect(mockCookieService.getFromCookie('testKey')).toEqual('testValue');
    });
    
    it('should not return deleted key', function() {
        mockCookieService.addToCookie('testKey', 'testValue');
        mockCookieService.deleteFromCookie('testKey');
        expect(mockCookieService.getFromCookie('testKey')).toBe(undefined);
    });
});
