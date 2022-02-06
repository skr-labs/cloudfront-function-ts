const querystring = require('querystring');

function handler(event: event) {
    const request = event.request;
    const path = request.uri;
    const host = request.headers['host'].value;
    const country = request.headers['cloudfront-viewer-country'].value;
    const qs = querystring.stringify(convertQueryStringObject(request.querystring));

    const newUrl = `https://${host}/${country}${path}${!!qs ? '?' + qs : ''}`;

    const response: response = {
        statusCode: 301,
        statusDescription: 'Moved Permanently',
        headers: {
            'location': { value: newUrl }
        }
    }
    return response;
}

function convertQueryStringObject(src: keyValuePair) {
    const convertedQs: any = {};
    const keys = Object.keys(src);
    for (const qs of keys) {
        if (src[qs].multiValue) {
            const values = [];
            for (const value of src[qs].multiValue) {
                values.push(value.value);
            }
            convertedQs[qs] = values;
        } else {
            convertedQs[qs] = src[qs].value;
        }
    }
    return convertedQs;
}

export const testable = handler;

interface event {
    version: string;
    context: context;
    viewer: viewer;
    request: request;
    response: response;
}

interface viewer {
    ip: string
}

interface context {
    distributionDomainName: string;
    distributionID: string;
    eventType: string;
    requestId: string;
}

interface keyValuePair {
    [key: string]: { value: string, multiValue?: [{ value: string }] }
}

interface request {
    method: string;
    uri: string;
    querystring: keyValuePair;
    headers: keyValuePair;
    cookies: keyValuePair;
}

interface response {
    statusCode: number;
    statusDescription?: string;
    headers: keyValuePair;
    cookies?: keyValuePair;
}