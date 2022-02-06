# cloudfront-function-ts

A boilerplate repository for writing CloudFront functions in Typescript with unit testing.

# Why?

The AWS CloudFront documentation for CloudFront functions provides examples in Javascript, and don't provide a whole lot of information on making the functions testable and still function within the CloudFront Functions Javascript execution environment.

This project can serve as a simple starting point, or reference for creating a CloudFront Function project. It also provides the ability to automatically minify and stringify the function output for easy inclusion in CloudFormation templates.

# Getting Started

## Installation

```bash
$ git clone https://github.com/skr-labs/cloudfront-function-ts
$ cd cloudfront-function-ts
$ npm install
```

## Running

```bash
$ npm run build && npm run test
```

# Working with CloudFront

## Via the AWS Console

Simply copy and paste the output in `build/src/index.js` directly into the function definition in the console.

![Function in the AWS Console](/docs/cfn-func-console.png)

## Via CloudFormation

This project contains a helper function to minify and stringfy the function output that you can copy directly into your CloudFormation template. Replace `FunctionCode` with the output in `build/src/index.min.js`.

```json
"MyFunction": {
    "Type": "AWS::CloudFront::Function",
    "Properties": {
        "Name": "MyFunction",
        "FunctionConfig": {
        "Comment": "Performs a redirect",
        "Runtime": "cloudfront-js-1.0"
        },
        "AutoPublish": true,
        "FunctionCode": "var exports={};Object.defineProperty(exports,\"__esModule\",{value:!0}),exports.testable=void 0;var querystring_1=require(\"querystring\");function handler(e){var r=e.request,t=r.uri,a=r.headers.host.value,n=r.headers[\"cloudfront-viewer-country\"].value,u=(0,querystring_1.stringify)(convertQueryStringObject(r.querystring));return{statusCode:301,statusDescription:\"Moved Permanently\",headers:{location:{value:\"https://\".concat(a,\"/\").concat(n).concat(t).concat(u?\"?\"+u:\"\")}}}}function convertQueryStringObject(e){for(var r={},t=0,a=Object.keys(e);t<a.length;t++){var n=a[t];if(e[n].multiValue){for(var u=[],o=0,s=e[n].multiValue;o<s.length;o++){var i=s[o];u.push(i.value)}r[n]=u}else r[n]=e[n].value}return r}exports.testable=handler;"
    }
},
```

### Secret Sauce

The CloudFront Javascript execution environment is either missing, or running a stripped down version of the `commonjs` module which will error if you attempt to use an `export` directive without first defining the object - which is missed by the Typescript transpiler.

The `cfnify` script takes care of this for you via the `scripts/postbuild.js` file.