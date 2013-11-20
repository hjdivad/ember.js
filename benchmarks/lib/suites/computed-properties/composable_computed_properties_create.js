/* jshint esnext:true */

import Benchmark from 'benchmark';
import { implementations, lookupFeature } from '../../config';

export var suite = new Benchmark.Suite('Composable Computed Properties - Create');

implementations.forEach(function(implementation) {
  var ember  = lookupFeature(implementation, 'Ember'),
      not    = ember.computed.not,
      obj    = null,
      equals = ember.computed.equal,
      ObjClass = ember.Object.extend({
        napTime: not(equals('state', 'sleepy'))
      });

  if (!ember.ComputedHelpers) {
    suite.add(implementation + ': Creates object without CCP', function(){
      obj = ember.Object.create({
        name: 'Alex',
        state: 'happy'
      });
    });
  } else {
    suite.add(implementation + ': Creates object with CCP', function(){
      obj = ObjClass.create({
        name: 'Alex',
        state: 'happy'
      });
    });
  }
});
