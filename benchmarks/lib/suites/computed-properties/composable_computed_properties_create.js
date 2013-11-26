/* jshint esnext:true */

import Benchmark from 'benchmark';

export var suite = new Benchmark.Suite('Composable Computed Properties - Create');

var not    = Ember.computed.not,
    obj    = null,
    equals = Ember.computed.equal,
    ObjClass = Ember.Object.extend({
      napTime: not(equals('state', 'sleepy'))
    });

if (!Ember.ComputedHelpers) {
  suite.add('Creates object without CCP', function(){
    obj = Ember.Object.create({
      name: 'Alex',
      state: 'happy'
    });
  });
} else {
  suite.add('Creates object with CCP', function(){
    obj = ObjClass.create({
      name: 'Alex',
      state: 'happy'
    });
  });
}
