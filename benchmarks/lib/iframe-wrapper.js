/* jshint esnext: true */
/* globals $ */

function createFrame(name, libPath) {
  var iframe = $('<iframe>', {
        display: 'none',
        id: name,
        style: 'border: 0'
      }).appendTo('body')[0],
      write  = function(content) { iframe.contentDocument.write(content); };

  iframe.name = name;
  write('<title>' + name + '</title>');
  write('<script src="lib/dependencies/jquery.js"></script>');
  write('<script src="lib/dependencies/hbs.js"></script>');
  write('<script src="implementations/' + libPath + '.js"></script>');
  write('<script src="node_modules/lodash/lodash.js"></script>');
  write('<script src="node_modules/benchmark/benchmark.js"></script>');
  write('<script src="vendor/loader.js"></script>');
  write('<script src="tmp/public/ember-benchmarks.amd.js"></script>');
  write('<script>define("benchmark",[],function(){return Benchmark;});</script>');
  write('<script>require("runner").run();</script>');

  return iframe;
}

export function wrapper(name, libPath) {
  createFrame(name, libPath);
}
