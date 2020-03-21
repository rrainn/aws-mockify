# aws-mockify

## General

aws-mockify is a mock system for the AWS-SDK package in Node.js.

## APIs

### MOCKAWS.mock(service, action, callback)

This function is the entry point to creating a new mock. Define the AWS service, action, and pass in a callback that will be called with the params and a callback function to handle the request.

```js
const MOCKAWS = require("aws-mockify");
MOCKAWS.mock("DynamoDB", "getItem", (params, callback) => {
	callback(null, {
		"Item": {
			"id": {
				"N": "1"
			}
		}
	});
});
```

### new MOCKAWS.service()

This function allows you to create a new instance of an aws-mockify service.

```js
const MOCKAWS = require("aws-mockify");

const ddb = new MOCKAWS.DynamoDB();
ddb.getItem({"Key": {"id": {"N": "1"}}, "TableName": "User"}).promise().then((item) => {
	console.log(item);
});
```

### MOCKAWS.restore()

This function removes all the existing `MOCKAWS.mock` calls that are stored in the system.

```js
const MOCKAWS = require("aws-mockify");

MOCKAWS.restore();
```
