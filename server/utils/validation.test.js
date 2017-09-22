const { isRealString } = require('./validation');
const expect = require('expect');

describe('isRealString validation', () => {



    it('should return true if validate string on params', () => {
        let params = {
            name: 'mohamed',
            room: 'elhop keda'
        };

        expect(isRealString(params.name)).toBe(true);
        expect(isRealString(params.room)).toBe(true);
    });

    it('should return false if not validate string in any params', () => {
        let params = {
            name: '    ',
            room: 'elhop keda'
        };

        expect(isRealString(params.name)).toBe(false);
        expect(isRealString(params.room)).toBe(true);
    });

    it('should return false if give function a invaild value', () => {
        let params = {
            name: 456121,
            room: 'elhop keda'
        };

        expect(isRealString(params.name)).toBe(false);
        expect(isRealString(params.room)).toBe(true);
    });

});