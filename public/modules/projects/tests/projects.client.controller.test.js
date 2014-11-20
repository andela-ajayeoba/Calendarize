'use strict';

(function() {
	// Projects Controller Spec
	describe('Projects Controller Tests', function() {
		// Initialize global variables
		var ProjectsController,
		scope,
		$httpBackend,
		$stateParams;

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
		beforeEach(inject(function($controller, $rootScope, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();
			$httpBackend = _$httpBackend_;
			$stateParams = _$stateParams_;
			// Initialize the Projects controller.
			ProjectsController = $controller('ProjectsController', {
				$scope: scope
			});
		}));

		it('$scope.listProjects() should return an array of projects', function(){

			var dummyProject = {
				name: 'New Projects'
			};
			var dummyProjects = [dummyProject];

			$httpBackend.expectGET('projects').respond(dummyProjects);

			scope.listProjects();
			$httpBackend.flush();

			expect(scope.projects).toEqualData(dummyProjects);

		});

		it('$scope.removeProject() should send a DELETE request with a valid projectId and remove the Project from the scope', inject(function(Projects){

			var dummyProject = new Projects({
				_id: '525a8422f6d0f87f0e407a33',
				name: 'Project'
			});
			scope.projects = [dummyProject];
			$httpBackend.expectDELETE(/projects\/([0-9a-fA-F]{24})$/).respond(204);
			scope.removeProject(dummyProject);
			$httpBackend.flush();
			expect(scope.projects.length).toBe(0);
		}));

		it('$scope.findOneProject() should be able to return an array with project object with a valid projectId from the URL parmeter', inject(function(Projects){

			var dummyProject = new Projects({
				_id: '525a8422f6d0f87f0e407a33',
				name: 'Project'
			});
			$stateParams.projectId = dummyProject._id;
			$httpBackend.expectGET(/projects\/([0-9a-fA-F]{24})$/).respond(dummyProject);
			scope.findOneProject();
			$httpBackend.flush();
			expect(scope.project).toEqualData(dummyProject);
		}));

		it('$scope.addProject() should be able to save a project object without errors' ,inject (function(Projects){
			var dummyProject  = new Projects({
				name : 'project'
			});
			$httpBackend.expectPOST('projects').respond(dummyProject);
			scope.addProject();
			$httpBackend.flush();
			expect(scope.project).toBe('');
		}));
		
	});
}());
