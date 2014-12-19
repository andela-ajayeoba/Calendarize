// 'use strict';

// (function() {
// 	// Verificationtokens Controller Spec
// 	describe('Verificationtokens Controller Tests', function() {
// 		// Initialize global variables
// 		var VerificationtokensController,
// 		scope,
// 		$httpBackend,
// 		$stateParams,
// 		$location;

// 		// The $resource service augments the response object with methods for updating and deleting the resource.
// 		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
// 		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
// 		// When the toEqualData matcher compares two objects, it takes only object properties into
// 		// account and ignores methods.
// 		beforeEach(function() {
// 			jasmine.addMatchers({
// 				toEqualData: function(util, customEqualityTesters) {
// 					return {
// 						compare: function(actual, expected) {
// 							return {
// 								pass: angular.equals(actual, expected)
// 							};
// 						}
// 					};
// 				}
// 			});
// 		});

// 		// Then we can start by loading the main application module
// 		beforeEach(module(ApplicationConfiguration.applicationModuleName));

// 		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
// 		// This allows us to inject a service but then attach it to a variable
// 		// with the same name as the service.
// 		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
// 			// Set a new global scope
// 			scope = $rootScope.$new();

// 			// Point global variables to injected services
// 			$stateParams = _$stateParams_;
// 			$httpBackend = _$httpBackend_;
// 			$location = _$location_;

// 			// Initialize the Verificationtokens controller.
// 			VerificationtokensController = $controller('VerificationtokensController', {
// 				$scope: scope
// 			});
// 		}));

// 		it('$scope.find() should create an array with at least one Verificationtoken object fetched from XHR', inject(function(Verificationtokens) {
// 			// Create sample Verificationtoken using the Verificationtokens service
// 			var sampleVerificationtoken = new Verificationtokens({
// 				name: 'New Verificationtoken'
// 			});

// 			// Create a sample Verificationtokens array that includes the new Verificationtoken
// 			var sampleVerificationtokens = [sampleVerificationtoken];

// 			// Set GET response
// 			$httpBackend.expectGET('verificationtokens').respond(sampleVerificationtokens);

// 			// Run controller functionality
// 			scope.find();
// 			$httpBackend.flush();

// 			// Test scope value
// 			expect(scope.verificationtokens).toEqualData(sampleVerificationtokens);
// 		}));

// 		it('$scope.findOne() should create an array with one Verificationtoken object fetched from XHR using a verificationtokenId URL parameter', inject(function(Verificationtokens) {
// 			// Define a sample Verificationtoken object
// 			var sampleVerificationtoken = new Verificationtokens({
// 				name: 'New Verificationtoken'
// 			});

// 			// Set the URL parameter
// 			$stateParams.verificationtokenId = '525a8422f6d0f87f0e407a33';

// 			// Set GET response
// 			$httpBackend.expectGET(/verificationtokens\/([0-9a-fA-F]{24})$/).respond(sampleVerificationtoken);

// 			// Run controller functionality
// 			scope.findOne();
// 			$httpBackend.flush();

// 			// Test scope value
// 			expect(scope.verificationtoken).toEqualData(sampleVerificationtoken);
// 		}));

// 		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Verificationtokens) {
// 			// Create a sample Verificationtoken object
// 			var sampleVerificationtokenPostData = new Verificationtokens({
// 				name: 'New Verificationtoken'
// 			});

// 			// Create a sample Verificationtoken response
// 			var sampleVerificationtokenResponse = new Verificationtokens({
// 				_id: '525cf20451979dea2c000001',
// 				name: 'New Verificationtoken'
// 			});

// 			// Fixture mock form input values
// 			scope.name = 'New Verificationtoken';

// 			// Set POST response
// 			$httpBackend.expectPOST('verificationtokens', sampleVerificationtokenPostData).respond(sampleVerificationtokenResponse);

// 			// Run controller functionality
// 			scope.create();
// 			$httpBackend.flush();

// 			// Test form inputs are reset
// 			expect(scope.name).toEqual('');

// 			// Test URL redirection after the Verificationtoken was created
// 			expect($location.path()).toBe('/verificationtokens/' + sampleVerificationtokenResponse._id);
// 		}));

// 		it('$scope.update() should update a valid Verificationtoken', inject(function(Verificationtokens) {
// 			// Define a sample Verificationtoken put data
// 			var sampleVerificationtokenPutData = new Verificationtokens({
// 				_id: '525cf20451979dea2c000001',
// 				name: 'New Verificationtoken'
// 			});

// 			// Mock Verificationtoken in scope
// 			scope.verificationtoken = sampleVerificationtokenPutData;

// 			// Set PUT response
// 			$httpBackend.expectPUT(/verificationtokens\/([0-9a-fA-F]{24})$/).respond();

// 			// Run controller functionality
// 			scope.update();
// 			$httpBackend.flush();

// 			// Test URL location to new object
// 			expect($location.path()).toBe('/verificationtokens/' + sampleVerificationtokenPutData._id);
// 		}));

// 		it('$scope.remove() should send a DELETE request with a valid verificationtokenId and remove the Verificationtoken from the scope', inject(function(Verificationtokens) {
// 			// Create new Verificationtoken object
// 			var sampleVerificationtoken = new Verificationtokens({
// 				_id: '525a8422f6d0f87f0e407a33'
// 			});

// 			// Create new Verificationtokens array and include the Verificationtoken
// 			scope.verificationtokens = [sampleVerificationtoken];

// 			// Set expected DELETE response
// 			$httpBackend.expectDELETE(/verificationtokens\/([0-9a-fA-F]{24})$/).respond(204);

// 			// Run controller functionality
// 			scope.remove(sampleVerificationtoken);
// 			$httpBackend.flush();

// 			// Test array after successful delete
// 			expect(scope.verificationtokens.length).toBe(0);
// 		}));
// 	});
// }());
