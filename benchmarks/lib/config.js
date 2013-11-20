/* jshint esnext:true */

var adapters = {
  master: {
    Ember: require('EmberMaster')
  },
  featureFlagged: {
    Ember: require('EmberFeatureFlagged')
  },
  featured: {
    Ember: require('EmberFeatured')
  },
};

export var logToConsole = false;

export var implementations = Object.keys(adapters).filter(function(name) {
  return adapters[name].Ember;
});

export function lookupFeature(implementation, item) {
  return adapters[implementation][item];
}
