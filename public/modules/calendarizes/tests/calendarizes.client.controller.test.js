'use strict';

(function() {
	// Calendarizes Controller Spec
	describe('Calendarizes Controller Tests', function() {
		// Initialize global variables
		var CalendarizesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Calendarizes controller.
			CalendarizesController = $controller('CalendarizesController', {
				$scope: scope
			});
		}));

		it('$scope.findProjects() should create an array with at least one projects object fetched from XHR', inject(function(Apicall) {
			// Create sample Project using the Apicall service
			var samplePerson = new Apicall.Projects({
				name: 'New Project',
			});

			// Create a sample Persons array that includes the new Person
			var sampleProjects = [sampleProjects];

			// Set GET response
			$httpBackend.expectGET('projects').respond(sampleProjects);

			// Run controller functionality
			scope.findProjects();
			$httpBackend.flush();

			// Test scope value
			expect(scope.projects).toEqualData(sampleProjects);
		}));

		// it('$scope.findOneProject() should create an array with one Project object fetched from XHR using a projectId URL parameter', inject(function(Apicall) {
		// 	// Define a sample Calendarize object
		// 	var sampleProject = new Apicall.Projects({
		// 		name: 'New Project',
		// 	});

		// 	// Set the URL parameter
		// 	$stateParams.projectId = '525a8422f6d0f87f0e407a33';

		// 	// Set GET response
		// 	$httpBackend.expectGET(/projects\/([0-9a-fA-F]{24})$/).respond(sampleProject);

		// 	// Run controller functionality
		// 	scope.findOneProject();
		// 	$httpBackend.flush();

		// 	// Test scope value
		// 	expect(scope.project).toEqualData(sampleProject);
		// }));

		// it('$scope.createProject() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Apicall) {
		// 	// Create a sample Project object
		// 	var sampleProjectPostData = new Apicall.Projects({
		// 		name: 'New Project'
		// 	});

		// 	// Create a sample Calendarize response
		// 	var sampleProjectResponse = new Apicall.Projects({
		// 		_id: '525cf20451979dea2c000001',
		// 		name: 'New Project'
		// 	});

		// 	// Fixture mock form input values
		// 	scope.name = 'New Project';

		// 	// Set POST response
		// 	$httpBackend.expectPOST('projects', sampleProjectPostData).respond(sampleProjectResponse);

		// 	// Run controller functionality
		// 	scope.addProject();
		// 	$httpBackend.flush();

		// 	// Test form inputs are reset
		// 	expect(scope.name).toEqual('');

		// 	// Test URL redirection after the Calendarize was created
		// 	// expect($location.path()).toBe('/calendarizes/' + sampleCalendarizeResponse._id);
		// }));

		// it('$scope.update() should update a valid Calendarize', inject(function(Calendarizes) {
		// 	// Define a sample Calendarize put data
		// 	var sampleCalendarizePutData = new Calendarizes({
		// 		_id: '525cf20451979dea2c000001',
		// 		name: 'New Calendarize'
		// 	});

		// 	// Mock Calendarize in scope
		// 	scope.calendarize = sampleCalendarizePutData;

		// 	// Set PUT response
		// 	$httpBackend.expectPUT(/calendarizes\/([0-9a-fA-F]{24})$/).respond();

		// 	// Run controller functionality
		// 	scope.update();
		// 	$httpBackend.flush();

		// 	// Test URL location to new object
		// 	expect($location.path()).toBe('/calendarizes/' + sampleCalendarizePutData._id);
		// }));

		// it('$scope.remove() should send a DELETE request with a valid calendarizeId and remove the Calendarize from the scope', inject(function(Calendarizes) {
		// 	// Create new Calendarize object
		// 	var sampleCalendarize = new Calendarizes({
		// 		_id: '525a8422f6d0f87f0e407a33'
		// 	});

		// 	// Create new Calendarizes array and include the Calendarize
		// 	scope.calendarizes = [sampleCalendarize];

		// 	// Set expected DELETE response
		// 	$httpBackend.expectDELETE(/calendarizes\/([0-9a-fA-F]{24})$/).respond(204);

		// 	// Run controller functionality
		// 	scope.remove(sampleCalendarize);
		// 	$httpBackend.flush();

		// 	// Test array after successful delete
		// 	expect(scope.calendarizes.length).toBe(0);
		// }));
	});
}());