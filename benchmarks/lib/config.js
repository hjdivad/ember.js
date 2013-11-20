/* jshint esnext:true */

var adapters = {
  noCCP: {
    Ember: require('Ember')
  },
  // ccpFlagged: {
    // Ember: require('EmberCCPFlagged')
  // },
  ccp: {
    Ember: require('EmberCCPOn')
  },
};

export var logToConsole = true;

export var implementations = Object.keys(adapters).filter(function(name) {
  return adapters[name].Ember;
});

export function lookupFeature(implementation, item) {
  return adapters[implementation][item];
}
