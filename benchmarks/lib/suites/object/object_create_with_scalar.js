import Benchmark from 'benchmark';
import { implementations, lookupFeature } from '../../config';

var suite = new Benchmark.Suite('Object - Create with scalar');

implementations.forEach(function(implementation) {
  var ember  = lookupFeature(implementation, 'Ember'),
      obj    = null;

  suite.add('Creates Ember Object with scalar', function(){
    obj = ember.Object.create({
      foo: 'bar'
    });
  });

  suite.add('Creates a native object with scalar', function(){
    obj = Object.create({
      foo: 'bar'
    });
  });
});

export suite;
