describe('app ', function () {

    var mocksdata = {data: [{"name": "Andrei", "status": "1", 'id': 1},
        {"name": "Dima", "status": "1", 'id': 2}]};
    var $httpBackend,
    users;

    beforeEach(module('app'));

    beforeEach(inject(function (_$httpBackend_, _users_) {
        users = _users_;
        $httpBackend = _$httpBackend_;

        $httpBackend.whenGET('DBUsers.php?get=allUsers').respond(mocksdata);
        $httpBackend.whenGET('DBUsers.php?autho=autho').respond(mocksdata);
        $httpBackend.whenGET('DBUsers.php?registr=reg').respond(true);
        $httpBackend.whenGET('DBUsers.php?del=user').respond(1);

    }));

    describe('should do call delete',function () {
        beforeEach(function () {
            spyOn(users, 'getAllUsers').and.returnValue(mocksdata.data);
            spyOn(users.connect, 'delUser');
        });

        it('should do call method delete and return value', function () {
            users.users = users.getAllUsers();
            expect(users.getAllUsers).toHaveBeenCalled();
            users.delUser(1);
            expect(users.users[0].name).toEqual(mocksdata.data[0].name)
        })

    });

    describe('should do call registration', function (done) {

        it('should return true if success', function () {
            users.registration().$promise.then(function (response) {
                expect(response).toEqual(true);
                done();
            });
        });
        $httpBackend.flush();
    });

    describe('should do call inLogin', function (done) {

        it('call the method inLogin', function () {
            users.inLogin().then(function (response) {
                expect(response.data).toEqual(mocksdata.data);
                done();
            });
        });
        $httpBackend.flush();

    });


    describe('should do call update', function () {

        beforeEach(function () {
            spyOn(users, 'update');
        });

        it('call to update', function(){
            users.update(mocksdata.data[0]);
            users.update();
            expect(users.update).toHaveBeenCalled();
            expect(users.update.calls.count()).toEqual(2);
            expect(users.update).toHaveBeenCalledWith(mocksdata.data[0]);

        })

    });

    describe('should do factories', function () {

        beforeEach(function () {
            spyOn(users, 'getAllUsers').and.returnValue(mocksdata.data)
        });

        it('should find user by id', function () {

            users.users = users.getAllUsers();
            users.users = users.getAllUsers();
            expect(users.getAllUsers).toHaveBeenCalled();
            expect(users.getAllUsers.calls.count()).toEqual(2);
            expect(users.users).toEqual(mocksdata.data);
            expect(users.users.length).toEqual(1);
            expect(users.getUserById(2).name).toEqual(mocksdata.data[0].name)
        })
    });

     describe('should do factories getAll', function () {

           it('should do users', function (done) {
               expect(users).toBeDefined();

               users.getAllUsers().then(function (response) {
                   expect(response).toEqual(mocksdata.data);
                   done();
               });

               $httpBackend.flush();
           });
        });
});