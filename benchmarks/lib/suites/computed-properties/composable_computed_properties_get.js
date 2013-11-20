/* jshint esnext:true */

import Benchmark from 'benchmark';
import { implementations, lookupFeature } from '../../config';

export var suite = new Benchmark.Suite('Composable Computed Properties - Get');

implementations.forEach(function(implementation) {
  var ember    = lookupFeature(implementation, 'Ember'),
      not      = ember.computed.not,
      equals = ember.computed.equal,
      obj      = null,
      ObjClass = Ember.Object.extend({
        stateSleepy: equals('state', 'sleepy'),
        napTime: not('stateSleepy')
      }),
      ObjClass2 = {};

  suite.add(implementation + ': create explicit cp retrieve once', function(){
    obj = ObjClass.create({
      name: 'Alex',
      state: 'happy'
    });

    obj.get('napTime');
  });

  if (ember.ComputedHelpers) {
    ObjClass2 = Ember.Object.extend({
        napTime: not(equals('state', 'sleepy')),
    });

    suite.add(implementation + ': create ccp retrieve once', function(){
      obj = ObjClass2.create({
        name: 'Alex',
        state: 'happy'
      });

      obj.get('napTime');
    });
  }
});
