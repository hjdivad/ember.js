import Benchmark from 'benchmark';
import { implementations, lookupFeature } from '../../config';

var suite = new Benchmark.Suite('Composable Computed Properties - Get');

implementations.forEach(function(implementation) {
  var ember  = lookupFeature(implementation, 'Ember'),
      not    = ember.computed.not,
      obj    = null,
      equals = ember.computed.equal;

  suite.add('Creates object without CCP & gets regular property', function(){
    obj = ember.Object.create({
      name: 'Alex',
      state: 'happy'
    });

    obj.get('state');
  });

  suite.add('Creates object with CCP & gets it', function(){
    obj = ember.Object.createWithMixins({
      name: 'Alex',
      state: 'happy',
      napTime: not(equals('state', 'sleepy'))
    });

    obj.get('napTime');
  });
});

export suite;
