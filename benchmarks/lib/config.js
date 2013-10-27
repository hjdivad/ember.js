var adapters = {
  ccp: {
    Ember: require('Ember')
  }
};

var logToConsole = false;

var implementations = Object.keys(adapters).filter(function(name) {
  return adapters[name].Ember;
});

function lookupFeature(implementation, item) {
  return adapters[implementation][item];
}

export lookupFeature;
export implementations;
export logToConsole;
