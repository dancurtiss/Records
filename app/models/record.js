/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * Record Schema
 */
var RecordSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    artist: {
        type: String,
        default: '',
        trim: true
    },
    sidea: {
        type: String,
        default: '',
        trim: true
    },
    sideb: {
        type: String,
        default: '',
        trim: true
    },
    year: {
        type: Number,
        default: 1900
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
RecordSchema.path('artist').validate(function(artist) {
    return artist.length;
}, 'Artist cannot be blank');
RecordSchema.path('sidea').validate(function(sidea) {
    return sidea.length;
}, 'Side A cannot be blank');
RecordSchema.path('sideb').validate(function(sideb) {
    return sideb.length;
}, 'Side B cannot be blank');
RecordSchema.path('year').validate(function(year) {
    return year > 1900 && year < 2020;
}, 'Year must be valid');
/**
 * Statics
 */
RecordSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).populate('user', 'name username').exec(cb);
    }
};

mongoose.model('Record', RecordSchema);