const AWS = require("aws-sdk");

let mocks = [];

function AWSClass (type) {
	const C = class {
		constructor (credentials) {
			this.credentials = credentials;

			mocks.filter((mock) => mock.type === type).forEach((mock) => {
				this[mock.action] = (params, callback) => {
					if (callback) {
						mock.callback(params, callback);
					} else {
						return {
							"promise": () => new Promise((resolve, reject) => {
								mock.callback(params, (error, result) => {
									const isError = Boolean(error);
									(isError ? reject : resolve)(isError ? error : result);
								});
							})
						};
					}
				};
			});
		}
	};
	return C;
}

module.exports = Object.keys(AWS).filter((service) => AWS[service].hasOwnProperty("serviceIdentifier")).reduce((object, service) => {
	object[service] = AWSClass(service);
	return object;
}, {
	"restore": () => mocks = [],
	"mock": (type, action, callback) => {
		mocks.push({type, action, callback});
	}
});
