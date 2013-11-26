/* jshint esnext:true */

import Benchmark from 'benchmark';

export var suite = new Benchmark.Suite('Composable Computed Properties - Get');

var not      = Ember.computed.not,
    equals   = Ember.computed.equal,
    obj      = null,
    ObjClass = Ember.Object.extend({
      stateSleepy: equals('state', 'sleepy'),
      napTime: not('stateSleepy')
    }),
    ObjClass2 = {};

if (Ember.ComputedHelpers) {
  ObjClass2 = Ember.Object.extend({
      napTime: not(equals('state', 'sleepy')),
  });

  suite.add('create ccp retrieve once', function(){
    obj = ObjClass2.create({
      name: 'Alex',
      state: 'happy'
    });

    obj.get('napTime');
  });
} else {
  suite.add('creates explicit cp retrieve once', function(){
    obj = ObjClass.create({
      name: 'Alex',
      state: 'happy'
    });

    obj.get('napTime');
  });
}
