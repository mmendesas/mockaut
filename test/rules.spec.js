var expect = require('chai').expect;
var http = require('http');
var unirest = require('unirest');
var path = require('path')
var helperFile = require('../app/helper/file');
var config = require('../config//config');


// describe('RulesController-Supertest', function () {
//     // implementing supertest
//     var express = require('../config/express')
//     var request = require('supertest');


//     it('#implementar depois com supertest', function (done) {
//         request(express)
//             .get('/v2/projects')
//             .expect('Content-Type', /json/)
//             .expect('Content-Length', '4881')
//             .expect(200, done);
//     });
// });


describe('Rules Controller', function () {

    config.port = 3300;
    // it('#Valida content type json', function (done) {
    //     unirest
    //         .get(server + '/v2/rules')
    //         .header('Accept', 'application/json')
    //         .end(function (res) {
    //             assert.equal(res.statusCode, 200);
    //             assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
    //             done();
    //         });
    // });

    it("should be block more than one item with the same name", function (done) {

        var project = { "name": "ProjectX", "description": "project sample" };
        var _project;

        unirest
            .post(config.getServer() + '/v1/projects')
            .header('Content-type', 'application/json')
            .send(project)
            .end(function (res) {
                _project = res.body;
                expect(res.statusCode).to.equal(201);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');

                //check duplicates
                unirest
                    .post(config.getServer() + '/v1/projects')
                    .send(project)
                    .end(function (res) {
                        expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                        expect(res.statusCode).to.equal(422);

                        //remove from DB
                        unirest
                            .delete(config.getServer() + '/v1/projects/' + _project._id)
                            .end(function (res) {
                                expect(res.statusCode).to.equal(204);
                                done();
                            });
                    });
            });

    });

    // it('#Cadastra item no db', function (done) {

    //     var ruleContent = helperFile.readContentFromFile(path.resolve('./test/samples/json_samples/rule.json'));
    //     var rule = JSON.parse(ruleContent);

    //     unirest
    //         .post(config.getServer() + '/v1/rules')
    //         .header('Accept', 'application/json')
    //         .header('Content-Type', 'application/json')
    //         .send(rule)
    //         .end(function (res) {
    //             expect(res.statusCode).to.equal(201);
    //             expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
    //             done();
    //         });
    // });

});