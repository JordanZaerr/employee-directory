(function () {
	'use strict';
	angular.module('app').directive('edEmployeeCard', edEmployeeCard);

	function edEmployeeCard() {
		var directive = {
			restrict: 'E',
			templateUrl: '/partials/employees/components/employee-card',
			scope: {
				employee: '='
			},
			link: linkFunc,
			controller: ctrlFunc,
			controllerAs: 'vm'
		};

		return directive;

		function linkFunc(scope, el, attrs) {
			scope.twEmail = scope.employee.email.split('@')[0] + '@towerswatson.com';
		}
	}

	ctrlFunc.$inject = ['$state', 'edEmployeeService', 'edIdentityService'];

	function ctrlFunc($state, edEmployeeService, edIdentityService) {
		var vm = this;
		vm.identity = edIdentityService;
		vm.mapEmployee = mapEmployee;
		vm.deselectEmployee = deselectEmployee;
		vm.editEmployee = editEmployee;

		function mapEmployee(employee) {
			edEmployeeService.updateMappedEmployee(employee);
			$state.go('employees.map.' + employee.location + '-' + employee.floor, {'seat': employee.seat});
		}

		function deselectEmployee(employee) {
			edEmployeeService.updateSelectedEmployees(employee);
		}

		function editEmployee(employee) {
			edEmployeeService.removeAllSelectedEmployees();
			edEmployeeService.updateSelectedEmployees(employee);
			$state.go('admin.update-employee');
		}
	}
})();