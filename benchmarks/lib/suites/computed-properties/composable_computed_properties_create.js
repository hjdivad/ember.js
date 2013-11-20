/* jshint esnext:true */
import Benchmark from 'benchmark';
import { implementations, lookupFeature } from '../../config';

var suite = new Benchmark.Suite('Composable Computed Properties - Create');

implementations.forEach(function(implementation) {
  var ember  = lookupFeature(implementation, 'Ember'),
      not    = ember.computed.not,
      obj    = null,
      equals = ember.computed.equal;

  suite.add(implementation + ': Creates object without CCP', function(){
    obj = ember.Object.create({
      name: 'Alex',
      state: 'happy'
    });
  });

  if (ember.ComputedHelpers) {
    suite.add(implementation + ': Creates object with CCP', function(){
      obj = ember.Object.createWithMixins({
        name: 'Alex',
        state: 'happy',
        napTime: not(equals('state', 'sleepy'))
      });
    });
  }
});

export suite;
