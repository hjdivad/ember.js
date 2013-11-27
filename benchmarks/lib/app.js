/* global window */
var benchmarkApp = Ember.Application.create(),
    Benchmark    = Ember.Object.extend({
                     name: null,
                     info: null
                   });

benchmarkApp.IndexController = Ember.ObjectController.extend({
  benchmarks: Ember.A([]),
  libNames: function() {
    return this.get('benchmarks').mapBy('version');
  }.property('benchmarks.@each.[]')
});

var indexController = benchmarkApp.__container__.lookup('controller:index'),
    benchmarks = {};

window.addEventListener('message', function(event) {
  if (event.origin === 'http://localhost:8000') {
    var data = JSON.parse(event.data);
    indexController.set('name', data.name);
    indexController.get('benchmarks').pushObject(Benchmark.create({
      version: data.version,
      info: data.info,
      infoString: data.infoString
    }));
  }
}, false);

export default benchmarkApp;
