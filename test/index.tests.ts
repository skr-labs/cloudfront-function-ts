import { expect } from 'chai';
import { SampleEvent, SampleEventNoQs } from './test-events/events';

describe('Redirector', () => {
    const redirector = require('../src/index');

    it('should redirect path prefixed with cloudfront viewer country and maintain querystring', () => {
        const response = redirector.testable(SampleEvent);
        const expectedTarget = 'https://skrlabs.io/en/home?test=true&arg=val1&arg=val2'
        expect(response).to.not.be.undefined;
        expect(response.statusCode).to.be.equal(301);
        expect(response.headers['location']).to.have.property('value');
        expect(response.headers['location'].value).to.equal(expectedTarget);
    });

    it('should redirect path prefixed with cloudfront viewer country without a querystring', () => {
        const response = redirector.testable(SampleEventNoQs);
        const expectedTarget = 'https://skrlabs.io/en/home'
        expect(response).to.not.be.undefined;
        expect(response.statusCode).to.be.equal(301);
        expect(response.headers['location']).to.have.property('value');
        expect(response.headers['location'].value).to.equal(expectedTarget);
    });
});