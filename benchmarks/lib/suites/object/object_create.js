import Benchmark from 'benchmark';
import { implementations, lookupFeature } from '../../config';

var suite = new Benchmark.Suite('Object - Create');

implementations.forEach(function(implementation) {
  var ember  = lookupFeature(implementation, 'Ember'),
      obj    = null;

  suite.add('Creates Ember Object', function(){
    obj = ember.Object.create();
  });

  suite.add('Creates a native object', function(){
    obj = Object.create({});
  });
});

export suite;
