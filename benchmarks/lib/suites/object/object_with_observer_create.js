import Benchmark from 'benchmark';
import { implementations, lookupFeature } from '../../config';

var suite = new Benchmark.Suite('Observers - Create');

implementations.forEach(function(implementation) {
  var ember  = lookupFeature(implementation, 'Ember'),
      obj    = null;

  suite.add('Creates object without observer', function(){
    obj = ember.Object.create({
      name: 'Alex',
      state: 'happy'
    });
  });

  suite.add('Creates object with observer', function(){
    obj = ember.Object.create({
      name: 'Alex',
      state: 'happy',
      napTime: function() {}.observes('state')
    });
  });
});

export suite;
