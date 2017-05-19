var express = require('../config/express');
var supertest = require('supertest')(express);

var http = require('http');

describe('RulesController', function () {

    // beforeEach(function () {
    //     originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    //     jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    // });

    // afterEach(function () {
    //     jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    // });

    // it('listagem json', function (done) {

    //     var config = {
    //         hostname: 'localhost',
    //         port: 3300,
    //         path: '/v1/rules',
    //         headers: {
    //             'Accept': 'application/json'
    //         }
    //     }
    //     http.get(config, function (res) {
    //         expect(res.statusCode).toEqual(200);
    //         expect(res.headers['content-type']).toEqual('application/json; charset=utf-8');
    //         done();
    //     });

    // });

    it('listagem json', function (done) {
        supertest
            .get('/v2/rules')
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(280, done);
            // .end(function (err, res) {
            //     if (err) {
            //         done.fail(err);
            //     } else {
            //         //console.log(res.status);
            //         done();
            //     }
            // });
    });
});