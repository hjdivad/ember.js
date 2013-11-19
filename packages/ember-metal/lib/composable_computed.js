require('ember-metal/core');
require('ember-metal/platform');
require('ember-metal/utils');
require('ember-metal/mixin');

if (Ember.FEATURES.isEnabled('composableComputedProperties')) {
  var a_slice = Array.prototype.slice,
      guidFor = Ember.guidFor,
      forEach = Ember.EnumerableUtils.forEach,
      map = Ember.EnumerableUtils.map,
      filter = Ember.EnumerableUtils.filter,
      typeOf = Ember.typeOf,
      mixin = Ember.mixin;

  Ember.ComputedHelpers = {};

  var implicitKey = Ember.ComputedHelpers.implicitKey = function (cp) {
    return [guidFor(cp)].concat(cp._dependentKeys).join('_');
  };

  var normalizeDependentKeys = Ember.ComputedHelpers.normalizeDependentKeys = function (keys) {
    return map(keys, function (key) {
      if (typeof key === "string" || key instanceof String) {
        return key;
      } else if (key instanceof Ember.ComputedProperty) {
        return implicitKey(key);
      } else {
        Ember.assert("Unexpected dependent key  " + key + " of type " + typeof(key), false);
      }
    });
  };

  var selectDependentCPs = Ember.ComputedHelpers.selectDependentCPs = function (keys) {
    return filter(keys, function (key) {
      return key instanceof Ember.ComputedProperty;
    });
  };

  var setDependentKeys = Ember.ComputedHelpers.setDependentKeys = function(cp, dependentKeys) {
    if (dependentKeys) {
      cp._dependentKeys = normalizeDependentKeys(dependentKeys);
      cp._dependentCPs = selectDependentCPs(dependentKeys);
      cp.implicitCPKey = implicitKey(cp);
    } else {
      cp._dependentKeys = cp._dependentCPs = [];
      delete cp.implicitCPKey;
    }
  };

  var cpFunc = function(propertyName) {
    var args = a_slice.call(arguments),
        cp = args.pop(),
        func = args.pop(),
        implicitCPMixin, reifiedCPargs;

    if (cp._dependentCPs.length) {
      implicitCPMixin = {};

      forEach(cp._dependentCPs, function (dependentCP) {
        implicitCPMixin[dependentCP.implicitCPKey] = dependentCP;
      }, this);

      reifiedCPargs = a_slice.call(cp._dependentKeys);
      reifiedCPargs.push(func);
      implicitCPMixin[propertyName] = Ember.computed.apply(null, reifiedCPargs);

      
      switch (typeOf(this)) {
        case "instance":
        case "class":
          this.reopen(implicitCPMixin);
          break;
        default:
          mixin(this, implicitCPMixin);
      }
    }
    return func.apply(this, args);
  };

  var makeLazyFunc = Ember.ComputedHelpers.makeLazyFunc = function(func, cp) {
    var arityThreeFunc = function (propertyName, value, cachedValue) {
      var args = a_slice.call(arguments);
      args.push(func);
      args.push(cp);
      return cpFunc.apply(this, args);
    }, arityTwoFunc = function (propertyName, value) {
      var args = a_slice.call(arguments);
      args.push(func);
      args.push(cp);
      return cpFunc.apply(this, args);
    }, arityOneFunc = function (propertyName) {
      var args = a_slice.call(arguments);
      args.push(func);
      args.push(cp);
      return cpFunc.apply(this, args);
    };

    switch (func.length) {
      case 2:
        return arityTwoFunc;
      case 3:
        return arityThreeFunc;
      default:
        return arityOneFunc;
    }
  };
}
