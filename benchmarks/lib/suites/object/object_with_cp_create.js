import Benchmark from 'benchmark';
import { implementations, lookupFeature } from '../../config';

var suite = new Benchmark.Suite('Computed Properties - Create');

implementations.forEach(function(implementation) {
  var ember  = lookupFeature(implementation, 'Ember'),
      obj    = null;

  suite.add('Creates object without CP', function(){
    obj = ember.Object.create({
      name: 'Alex',
      state: 'happy'
    });
  });

  suite.add('Creates object with CP', function(){
    obj = ember.Object.createWithMixins({
      name: 'Alex',
      state: 'happy',
      napTime: function() {}.property('state')
    });
  });
});

export suite;
