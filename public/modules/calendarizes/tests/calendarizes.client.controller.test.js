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

		afterEach(function() {
	      $httpBackend.verifyNoOutstandingExpectation();
	      $httpBackend.verifyNoOutstandingRequest();
	   	});

		it('$scope.listProjects() should return an array with at least one Project object fetched from XHR', inject(function(Projects) {
			//Create sample Project using the Apicall service
			var sampleProject = new Projects({

				name: 'New Project'
			});

			// Create a sample Projects array that includes the new Project
			var sampleProjects = [sampleProject];

			// Set GET response
			$httpBackend.expectGET('projects').respond(sampleProjects);

			// Run controller functionality
			scope.listProjects();
			$httpBackend.flush();

			// Test scope value
			expect(scope.projects).toEqualData(sampleProjects);
		}));


		it('$scope.findOneProject() should return an array with one Project object fetched from XHR using a projectId URL parameter', inject(function(Projects) {
			// Define a sample Project object
			var sampleProject = new Projects({

				name: 'New Project'
			});

			// Set the URL parameter
			$stateParams.projectId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/projects\/([0-9a-fA-F]{24})$/).respond(sampleProject);

			// Run controller functionality
			scope.findOneProject();
			$httpBackend.flush();

			// Test scope value
			expect(scope.project).toEqualData(sampleProject);
		}));

		it('$scope.addProject() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Projects) {
			// Create a sample Calendarize object
			var sampleProjectPostData = new Projects({
				name: 'New Project'
			});

			// Create a sample Calendarize response
			var sampleProjectResponse = new Projects({
				_id: '525cf20451979dea2c000001',
				name: 'New Project'
			});

			// Fixture mock form input values
			scope.project = { name:'New Project'};

			// Set POST response
			$httpBackend.expectPOST('projects', sampleProjectPostData).respond(sampleProjectResponse);

			// Run controller functionality
			scope.addProject();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.project).toEqual('');

		}));

		it('$scope.updateProject() should update a valid Project', inject(function(Projects) {
			// Define a sample Project put data
			var sampleProjectPutData = new Projects({
				_id: '525cf20451979dea2c000001',
				name: 'New Project'
			});

			// Mock Project in scope
			scope.project = sampleProjectPutData;

			// Set PUT response
			$httpBackend.expectPUT(/projects\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.updateProject();
			$httpBackend.flush();

		}));

		it('$scope.removeProject() should send a DELETE request with a valid projectId and remove the Project from the scope', inject(function(Projects) {
			// Create new Project object
			var sampleProject = new Projects({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Projects array and include the Project
			scope.projects = [sampleProject];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/projects\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.removeProject(sampleProject);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.projects.length).toBe(0);
		}));

		// TODO PERSONS TEST
		it('$scope.addPerson() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Persons) {
			// Create a sample Person object
			var samplePersonPostData = new Persons({
				name: 'New Project'
			});

			// Create a sample Person response
			var samplePersonResponse = new Persons({
				_id: '525cf20451979dea2c000001',
				name: 'New Project'
			});

			// Fixture mock form input values
			scope.person = { name:'New Project'};

			// Set POST response
			$httpBackend.expectPOST('persons', samplePersonPostData).respond(samplePersonResponse);

			// Run controller functionality
			scope.addPerson();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.person).toEqual('');

		}));

	});
}());
