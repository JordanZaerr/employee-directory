(function () {
	'use strict';
	angular.module('app').directive('edSidebarLeft', edSidebarLeft);

	function edSidebarLeft() {
		var directive = {
			restrict: 'E',
			templateUrl: '/partials/common/components/sidebar-left',
			scope: {},
			controller: ctrlFunc,
			controllerAs: 'vm'
		};

		return directive;
	}

	ctrlFunc.$inject = ['$scope', 'edSidebarService', 'edIdentityService'];

	function ctrlFunc($scope, edSidebarService, edIdentityService) {
		var vm = this;
		vm.identity = edIdentityService;
		vm.sidebarOpen = false;
		vm.sidebarLocked = edSidebarService.getLockSidebar();
		vm.toggleSidebar = toggleSidebar;
		vm.closeSidebar = closeSidebar;
		vm.scrollSidebarTop = scrollSidebarTop;

		activate();

		// If the sidebar is locked open, make sure it is open
		function activate() {
			if (vm.sidebarLocked) {
				vm.sidebarOpen = true;
			}
		}

		// If the sidebar is not locked open, toggle it
		function toggleSidebar() {
			if (!vm.sidebarLocked) {
				vm.sidebarOpen = !vm.sidebarOpen;
			}
		}

		// If the sidebar is not locked open, close it
		function closeSidebar() {
			if (!vm.sidebarLocked) {
				vm.sidebarOpen = false;
			}
		}

		// Watch for the sidebar locked change event
		var deregister = $scope.$on('sidebarLockedChange', function (event, sidebarLocked) {
			vm.sidebarLocked = sidebarLocked;
			vm.sidebarOpen = vm.sidebarLocked ? true : false;
		});

		$scope.$on('$destroy', deregister);

		function scrollSidebarTop() {
			$('.nano').nanoScroller({scroll: 'top'});
		}

		// Use this to trigger the highlighter directive
		var deregisterSelectedEventChange = $scope.$on('selectedEventChange', function (event, selectedEvent) {
			if (selectedEvent) {
				vm.selectedEvent = angular.copy(selectedEvent._id);
			}
		});

		$scope.$on('$destroy', deregisterSelectedEventChange);
	}
})();