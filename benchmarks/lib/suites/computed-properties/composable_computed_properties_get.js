/* jshint esnext:true */

import Benchmark from 'benchmark';
import { implementations, lookupFeature } from '../../config';

export var suite = new Benchmark.Suite('Composable Computed Properties - Get');

implementations.forEach(function(implementation) {
  var ember  = lookupFeature(implementation, 'Ember'),
      not    = ember.computed.not,
      obj    = null,
      equals = ember.computed.equal;

  suite.add(implementation + ': create explicit cp retrieve once', function(){
    obj = ember.Object.extend({
      stateSleepy: equals('state', 'sleepy'),
      napTime: not('stateSleepy'),
    }).create({
      name: 'Alex',
      state: 'happy'
    });

    obj.get('state');
  });

  if (ember.ComputedHelpers) {
    suite.add(implementation + ': create ccp retrieve once', function(){
      obj = ember.Object.extend({
        napTime: not(equals('state', 'sleepy')),
      }).create({
        name: 'Alex',
        state: 'happy',
      });

      obj.get('napTime');
    });
  }
});

// implementations.forEach(function(implementation) {
//   // TODO: create obj outside of test & run get many times
// });
