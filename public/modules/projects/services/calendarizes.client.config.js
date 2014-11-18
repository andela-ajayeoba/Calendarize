'use strict';

// Configuring the Articles module
angular.module('calendarizes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Calendarizes', 'calendarizes', 'dropdown', '/calendarizes(/create)?');
		Menus.addSubMenuItem('topbar', 'calendarizes', 'List Calendarizes', 'calendarizes');
		Menus.addSubMenuItem('topbar', 'calendarizes', 'New Calendarize', 'calendarizes/create');
	}
]);