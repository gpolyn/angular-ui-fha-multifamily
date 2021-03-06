exports.config = { 
  specs: [ 
    './e2e/**/*.e2e-spec.ts' 
  ], 
  capabilities: { 
    'browserName': 'chrome' 
  }, 
  baseUrl: 'http://localhost:4200/', 
  framework: 'jasmine', 
  useAllAngular2AppRoots: true,
	beforeLaunch: function() { 
		require('ts-node').register({ 
			project: 'e2e' 
		}); 
  } 
} 
