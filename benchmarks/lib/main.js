import Benchmark from 'benchmark';
import app from 'app';

import { logToConsole as logging } from 'config';

import { suite as ccp_get } from './suites/computed-properties/composable_computed_properties_get';
import { suite as ccp_create } from './suites/computed-properties/composable_computed_properties_create';

import { suite as obj } from './suites/object/object_create';
import { suite as obj_scalar } from './suites/object/object_create_with_scalar';
import { suite as obj_cp } from './suites/object/object_with_cp_create';

import { suite as obj_obsrv } from './suites/object/object_with_observer_create';

var suites = [
      ccp_get,
      // ccp_create,
      // obj,
      // obj_scalar,
      // obj_cp,
      // obj_obsrv
    ],
    indexController = app.__container__.lookup('controller:index'),
    currentSuite    = {};

// JDD will be making this change for 2.0
Benchmark.Deferred.prototype.end = Benchmark.Deferred.prototype.resolve;

function log(message) {
  if (logging) {
    console.log(message);
  }
}

function groupStart(message) {
  if (logging) {
    console.group(message);
  }
}

function groupEnd() {
  if (logging) {
    console.groupEnd();
  }
}

function startSuite(event) {
  groupStart('[' + this.name + ']');
  currentSuite = indexController.get('suites').pushObject({
    suiteInfo: {
      name: this.name,
      target: event.target,
      benchmarksCount: event.currentTarget.length + 1
    },
    benchmarks: []
  });
}

function onCycle(event) {
  currentSuite.benchmarks.pushObject(Ember.Object.create({
    benchmarkInfo: event.target,
    isFastest: false
  }));
  log('- ' + String(event.target));
}

function onComplete(event) {
  groupEnd();
  log('Fastest for ' + this.name + ' is ' +  this.filter('fastest').pluck('name')[0]);
  currentSuite.benchmarks.filterBy('benchmarkInfo.id', this.filter('fastest')[0].id)[0].set('isFastest', true);
  run();
}

function run() {
  if (!suites.length) { return; }
  var suite = suites.shift();

  suite.on('start', function(event) {
    startSuite.call(this, event);
  })
  .on('cycle', function(event) {
    onCycle.call(this, event);
  })
  .on('complete', function(event) {
    onComplete.call(this, event);
  })
  .run({ async: true });
}

export run;
