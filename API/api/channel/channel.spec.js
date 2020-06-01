const should = require('should');
const request = require('supertest');
const app = require('../../app');

setTimeout(() => {
    describe('GET /channels', () => {
        it('should return 200 status code', (done) => {
            request(app)
                .get('/channels')
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                    done();
                });
        });
    
        it('should return array', (done) => {
            request(app)
                .get('/channels')
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                    res.body.should.be.and.instanceof(Array);
                    // res.body.should.be.an.instanceof(Array).and.have.length(3);
                    // res.body.map((channel) => {
                    //     channel.should.have.properties('id', 'name');
                    //     channel.id.should.be.a.Number();
                    //     channel.name.should.be.a.String();
                    // });
                    done();
                });
        });
    });

    run();
}, 5000);
