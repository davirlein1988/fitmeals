/*
*Configuration variables
*/
var environments = {};

//Stging default environment

environments.staging = {
	'httpPort' : 3000,
	'httpsPort' : 3001,
	'envName' : 'staging',
	'hashingSecret' : 'thisIsASecret',
	'maxChecks' : 5,
	'templateGlobals': {
		'appName' : 'Fit Meals',
		'companyName' : 'Lein Development, Inc',
		'yearCreated' : '2019',
		'baseUrl' : 'https://localhost:3001/'
	}
};


//Production environment

environments.production = {
	'httpPort' : 4000,
	'httpsPort' : 4001,
	'envName' : 'production',
	'hashingSecret' : 'thisIsAlsoASecret',
	'templateGlobals' : {
		'appName' : 'Fit Meals',
		'companyName' : 'Lein Development, Inc',
		'yearCreated' : '2019'
	}
};

//testing environment
environments.test = {
    'httpPort' : 5000,
	'httpsPort' : 5001,
	'envName' : 'test',
	'hashingSecret' : 'thisIsAlsoASecret',
	'templateGlobals' : {
		'appName' : 'Fit Meals',
		'companyName' : 'Lein Development, Inc',
		'yearCreated' : '2019'
	}
}

//Passing environment by command line

var currentEnvironment =  typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

//Check current environent exist if not default staging

var environentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

//Export module

module.exports = environentToExport;