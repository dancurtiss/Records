/**
 * Module dependencies.
 */
var should = require('should'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Record = mongoose.model('Record');

//Globals
var user;
var record;

//The tests
describe('<Unit Test>', function() {
    describe('Model Record:', function() {
        beforeEach(function(done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function(err) {
                record = new Record({
                    artist: 'Record Artist',
                    sidea: 'Side A Song',
                    sideb: 'Side B Song',
                    user: user
                });

                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return record.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without artist', function(done) {
                record.artist = '';

                return record.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            Record.remove({});
            User.remove({});
            done();
        });
        after(function(done){
            Record.remove().exec();
            User.remove().exec();
            done();
        });
    });
});
