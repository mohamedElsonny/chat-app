const expect = require('expect');

const { Users } = require('./users');




describe('Users', () => {
    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Hassan',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Ossama',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Mohamed',
            room: 'Node Course'
        }];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Mohamed',
            room: 'The Office Fans'
        };

        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });


    it('should return alist of specific room', () => {
        var namesArray = users.getUserList('Node Course');
        expect(namesArray.length).toBe(2);
        expect(namesArray[0]).toBeA('string');
        expect(namesArray).toEqual(['Hassan', 'Mohamed']);
    });

    it('should return the user removed and remove the user', () => {
        var id = '2';
        var removedUser = users.removeUser(id);
        expect(users.users.length).toBe(2);
        expect(removedUser).toInclude({ id });
    });

    it('should not return the user by id and remove the user', () => {
        var id = '9';
        var removedUser = users.removeUser(id);
        expect(users.users.length).toBe(3);
        expect(removedUser).toNotExist();
    });

    it('should return specific user with id', () => {
        var id = '1';
        var user = users.getUser(id);
        console.log(user);
        expect(user).toInclude({ id, name: 'Hassan' });
    });

    it('should not return specific user with id not exist', () => {
        var id = '99';
        var user = users.getUser(id);
        console.log(user);
        expect(user).toNotExist();
    });
});