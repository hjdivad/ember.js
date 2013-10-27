var BenchmarkApp = Ember.Application.create();

BenchmarkApp.IndexController = Ember.ObjectController.extend({
  suites: Ember.A()
});

export default BenchmarkApp;
