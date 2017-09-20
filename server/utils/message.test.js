const expect = require('expect');

var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {

    it('should generate correct message object', () => {
        let from = 'Admin';
        let text = 'some text';
        let result = generateMessage(from, text);

        expect(result).toInclude({ from, text });
        expect(result.createdAt).toBeA('number');
    });

});

describe('generateLocationMessage', () => {

    it('should generate correct location object', () => {
        let from = 'Admin';
        let lat = '30.0444196';
        let lng = '31.2357116';
        let result = generateLocationMessage(from, lat, lng);

        expect(result).toInclude({
            from: from,
            url: `https://www.google.com/maps?q=${lat},${lng}`
        });
        expect(result.createdAt).toBeA('number');
    });
});