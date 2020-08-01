var NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'production') {
    module.exports = require('./dist/cjs/react-photo-crop.min.js');
} else if (NODE_ENV === 'development') {
    module.exports = require('./dist/cjs/react-photo-crop.js');
}
