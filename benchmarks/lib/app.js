/* jshint esnext:true */

var BenchmarkApp = Ember.Application.create();

BenchmarkApp.IndexController = Ember.ObjectController.extend({
  suites: Ember.A(),
  benchmarkErrors: Ember.A()
});

export default BenchmarkApp;
