(function () {
	'use strict';
	angular.module('app').value('edToastr', toastr);

	angular.module('app').factory('edNotifierService', edNotifierService);

	edNotifierService.$inject = ['edToastr'];

	function edNotifierService(edToastr) {
		var service = {
			notify: notify,
			error: error
		};
		return service;

		function notify(msg) {
			edToastr.success(msg);
			console.log(msg);
		}

		function error(msg) {
			edToastr.error(msg);
			console.log(msg);
		}
	}
})();
