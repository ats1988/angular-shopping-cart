moduLe = angular.module('angularValidator', []);


moduLe.directive('mwValidate', function($log) {
    var noop = function() {};

    var nullFormCtrl = {
        isNull: true,
        $addControl: noop,
        $removeControl: noop,
        $setValidity: noop,
        $setDirty: noop
    };
   
    $log.info('Initializing mw-validate');
    
    return {
        restrict: 'A',
        require: '^form', // Looks on parent also

        // The linking function will add behavior to the template
        // The fourth parameter is a NgModelController (http://docs.angularjs.org/api/ng.directive:ngModel.NgModelController)
        link: function(scope, element, attrs, parentFormCtrl) {
            var modelCtrl = { $name: attrs.name || attrs.mwName },
                nameExp = attrs.mwNameExp,
                validateExpr = attrs.mwValidate;
            
            var $error = this.$error = {}; // keep invalid keys here

            parentFormCtrl = parentFormCtrl || nullFormCtrl ;
            
            $log.info('Creating controller for: ' + modelCtrl.$name );
            
            validateExpr = scope.$eval(validateExpr);

            if ( ! validateExpr) {
              return;
            }

            if (angular.isFunction(validateExpr)) {
              validateExpr = { validator: validateExpr };
            }

            // TODO Is necessary?
            parentFormCtrl.$addControl(modelCtrl);

            element.bind('$destroy', function() {
                parentFormCtrl.$removeControl(modelCtrl);
            });

            if ( nameExp ) {
                scope.$watch( nameExp, function( newValue ) {
                    modelCtrl.$name = newValue;
                });
            }

            scope.xxxform = parentFormCtrl;
            // Register watches
            angular.forEach(validateExpr, function(validExp, validationErrorKey) {
                // Check for change in "boolean" value (true or false)
                scope.$watch( '(' + validExp + ') && true', function(newIsValid, oldIsValid) {
                    $log.info('validating ' + validExp + ' as ' + validationErrorKey + ' with value ' +  newIsValid + '? ' + $error[validationErrorKey]);
                    if ( ($error[validationErrorKey] || false) === newIsValid) {
                        $error[validationErrorKey] = ! newIsValid;

                        parentFormCtrl.$setValidity(validationErrorKey, newIsValid, modelCtrl);
                    }
                });
            });

        }
    };
});