/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Record = mongoose.model('Record'),
    _ = require('underscore');


/**
 * Find record by id
 */
exports.record = function(req, res, next, id) {
    Record.load(id, function(err, record) {
        if (err) return next(err);
        if (!record) return next(new Error('Failed to load record ' + id));
        req.record = record;
        next();
    });
};

/**
 * Create a record
 */
exports.create = function(req, res) {
    var record = new Record(req.body);
    record.user = req.user;

    record.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                record: record
            });
        } else {
            res.jsonp(record);
        }
    });
};

/**
 * Update a record
 */
exports.update = function(req, res) {
    var record = req.record;

    record = _.extend(record, req.body);

    record.save(function(err) {
        res.jsonp(record);
    });
};

/**
 * Delete an record
 */
exports.destroy = function(req, res) {
    var record = req.record;

    record.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(record);
        }
    });
};

/**
 * Show an record
 */
exports.show = function(req, res) {
    res.jsonp(req.record);
};

/**
 * List of records
 */
exports.all = function(req, res) {
    Record.find().sort('-created').populate('user', 'name username').exec(function(err, records) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(records);
        }
    });
};
