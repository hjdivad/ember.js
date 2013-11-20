/* jshint esnext:true */

import Benchmark from 'benchmark';
import { implementations, lookupFeature } from '../../config';

export var suite = new Benchmark.Suite('Composable Computed Properties - Get');

implementations.forEach(function(implementation) {
  var ember    = lookupFeature(implementation, 'Ember'),
      not      = ember.computed.not,
      equals = ember.computed.equal,
      obj      = null,
      ObjClass = ember.Object.extend({
        stateSleepy: equals('state', 'sleepy'),
        napTime: not('stateSleepy')
      }),
      ObjClass2 = {};

  if (ember.ComputedHelpers) {
    ObjClass2 = ember.Object.extend({
        napTime: not(equals('state', 'sleepy')),
    });

    suite.add(implementation + ': create ccp retrieve once', function(){
      obj = ObjClass2.create({
        name: 'Alex',
        state: 'happy'
      });

      obj.get('napTime');
    });
  } else {
    suite.add(implementation + ': creates explicit cp retrieve once', function(){
      obj = ObjClass.create({
        name: 'Alex',
        state: 'happy'
      });

      obj.get('napTime');
    });
  }
});
