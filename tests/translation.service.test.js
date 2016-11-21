describe('Translation service', function() {

    var mockTranslationService;

    beforeEach(angular.mock.module('kinder-app'));

    beforeEach(inject(function(_TranslationService_) {
        mockTranslationService = _TranslationService_;
    }));

    it('should exist', function() {
        expect(mockTranslationService).toBeDefined();
    });

    it('should exist', function() {
        expect(mockTranslationService.getTranslation).toBeDefined();
    });
    
    /*
    it('should return english translation', function() {
        var scope = {};
        mockTranslationService.getTranslation(scope, 'en');
        expect(scope.translation.HELLO).toEqual('Hello');
    });
    */
});
