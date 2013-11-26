/* jshint esnext:true */

import Benchmark from 'benchmark';

import { logToConsole as logging } from 'config';
// import { suite as ccp_get } from './suites/computed-properties/composable_computed_properties_get';
import { suite as ccp_create } from './suites/computed-properties/composable_computed_properties_create';
// import { suite as obj } from './suites/object/object_create';
// import { suite as obj_scalar } from './suites/object/object_create_with_scalar';
// import { suite as obj_cp } from './suites/object/object_with_cp_create';
// import { suite as obj_obsrv } from './suites/object/object_with_observer_create';
// import { iframeWrapper as wrapper } from './wrapper';

var suites = [
      // ccp_get,
      ccp_create
      // obj,
      // obj_scalar,
      // obj_cp,
      // obj_obsrv
    ];

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

function onError(event) {
  if (logging) {
    console.error('Error occured "' + event.target.error.message + '" in ' + event.target.name);
  }
}

function startSuite(event) {
  groupStart('[' + this.name + ']');
}

function onCycle(event) {
  log('- ' + String(event.target));
}

function onComplete(event) {
  groupEnd();
  log('Fastest for ' + this.name + ' is ' +  this.filter('fastest').pluck('name')[0]);
  run();
}

export function run() {
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
  .on('error', function(event) {
    onError.call(this, event);
  })
  .run();
}
