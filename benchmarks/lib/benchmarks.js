/* jshint esnext:true */

import { suite as ccpGet } from './suites/computed-properties/composable_computed_properties_get';
import { suite as ccpCreate } from './suites/computed-properties/composable_computed_properties_create';
// import { suite as obj } from './suites/object/object_create';
// import { suite as obj_scalar } from './suites/object/object_create_with_scalar';
// import { suite as obj_cp } from './suites/object/object_with_cp_create';
// import { suite as obj_obsrv } from './suites/object/object_with_observer_create';

var benchmarks = [
      // ccpGet,
      ccpCreate
      // obj,
      // obj_scalar,
      // obj_cp,
      // obj_obsrv
    ];

export benchmarks;
