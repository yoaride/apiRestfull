const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/index');

chai.should();

chai.use(chaiHttp);

describe('Restfull API Tests', () => {

    /**
     * Test Get
     */
    describe ('GET /app/', () =>{
        it('Should GET all the existing persons', (done) => {
            chai.request(server).get('/app').end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('Array');
            done();
            });
        });

        it('NOT GET any persons by a wrong route', (done) => {
            chai.request(server).get('/ap').end((err, res) => {
                res.should.have.status(404);
            done();
            });
        });
    });

     /**
     * Test Get (by id)
     */
    describe ('GET /app/:id', () =>{
        it('Should GET a person by id', (done) => {
            const id = 1;
            chai.request(server).get(`/app/${id}`).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('Object');
                res.body.should.have.property('id');
                res.body.should.have.property('fullname');
                res.body.should.have.property('birth');
                res.body.should.have.property('mother');
                res.body.should.have.property('father');
                res.body.should.have.property('children');
                res.body.should.have.property('id').eq(1);
            done();
            });
        });

        it('NOT Should GET any person by id not exist yet', (done) => {
            const id = 123;
            chai.request(server).get(`/app/${id}`).end((err, res) => {
                res.should.have.status(404);
            done();
            });
        });
    });

     /**
     * Test POST
     */
    describe ('POST /app', () =>{
        it('Should POST a new person', (done) => {
            const person = {
                id: 0,
                firstname: 'Nombre Apellido',
                brith: '1800-01-01',
                mother: 'Madre',
                father: 'Padre',
                children: 'Hijo'
            };
            chai.request(server).post('/app').send(person).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('Object');
                res.body.should.have.property('Status').eq('Person Save');
            done();
            });
        });

        it('Can NOT POST a new person', (done) => {
            const person = {
                id: 2,
                firstname: 'Nombre Apellido',
                brith: '1800-01-01',
                mother: 'Madre',
                father: 'Padre',
                children: 'Hijo'
            };
            chai.request(server).post('/app').send(person).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('Object');
                res.body.should.have.property('Status').eq('The id have to be 0 for post a new person');
            done();
            });
        });
    });

     /**
     * Test PUT
     */
    describe ('PUT /app/:id', () =>{
        it('Should PUT a new person', (done) => {
            const id = 1;
            const person = {
                firstname: 'Maria Rodriguez',
                brith: '1883-08-08',
                mother: null,
                father: null,
                children: 'Carlos Gaviria - Helena Gaviria'
            };
            chai.request(server).put(`/app/${id}`).send(person).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('Object');
                res.body.should.have.property('Status').eq('Person Updated');
            done();
            });
        });

        it('Can\'t PUT a new person', (done) => {
            const id = 0;
            const person = {
                firstname: 'Maria Rodriguez',
                brith: '1883-08-08',
                mother: null,
                father: null,
                children: 'Carlos Gaviria - Helena Gaviria'
            };
            chai.request(server).put(`/app/${id}`).send(person).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('Object');
                res.body.should.have.property('Status').eq('Person Can\'t be Updated');
            done();
            });
        });
    });

     /**
     * Test DELETE
     */
    describe ('DELETE /app/:id', () =>{
        it('Should DELETE an existing person', (done) => {
            const id = 1;
            chai.request(server).delete(`/app/${id}`).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('Object');
                res.body.should.have.property('Status').eq('Person Deleted');
            done();
            });
        });

        it('can\'t DELETE any person', (done) => {
            const id = 1234;
            chai.request(server).delete(`/app/${id}`).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('Object');
                res.body.should.have.property('Status').eq('The Person can\'t be Deleted');
            done();
            });
        });
    });

})