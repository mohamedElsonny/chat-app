const expect = require('expect');

var { generareMessage } = require('./message');

describe('generateMessage', () => {

    it('should generate correct message object', () => {
        let from = 'Admin';
        let text = 'some text';
        let result = generareMessage(from, text);

        expect(result).toInclude({ from, text });
        expect(result.createdAt).toBeA('number');
    });

});