export const SampleEvent = {
    "version": "1.0",
    "context": {
        "eventType": "viewer-request"
    },
    "viewer": {
        "ip": "0.0.0.0"
    },
    "request": {
        "method": "GET",
        "uri": "/home",
        "querystring": {
            "test": {
                "value": "true"
            },
            "arg": {
                "value": "val1",
                "multiValue": [
                    {
                        "value": "val1"
                    },
                    {
                        "value": "val2"
                    }
                ]
            }
        },
        "headers": {
            "host": {
                "value": "skrlabs.io"
            },
            "accept": {
                "value": "text/html",
                "multiValue": [
                    {
                        "value": "text/html"
                    },
                    {
                        "value": "application/xhtml+xml"
                    }
                ]
            },
            "user-agent": {
                "value": "some value"
            },
            "cloudfront-viewer-country": {
                "value": "en"
            }
        }
    }
}

export const SampleEventNoQs = {
    "version": "1.0",
    "context": {
        "eventType": "viewer-request"
    },
    "viewer": {
        "ip": "0.0.0.0"
    },
    "request": {
        "method": "GET",
        "uri": "/home",
        "querystring": {},
        "headers": {
            "host": {
                "value": "skrlabs.io"
            },
            "accept": {
                "value": "text/html",
                "multiValue": [
                    {
                        "value": "text/html"
                    },
                    {
                        "value": "application/xhtml+xml"
                    }
                ]
            },
            "user-agent": {
                "value": "some value"
            },
            "cloudfront-viewer-country": {
                "value": "en"
            }
        }
    }
}