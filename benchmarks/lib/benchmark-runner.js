/* jshint esnext:true */
/* globals $ */

import w from 'iframe-wrapper';

export function run() {
  $(document).ready(function() {
    w.wrapper('master', 'ember');
    w.wrapper('ccp-feature', 'ember-ccp-on');
    w.wrapper('ccp-flagged', 'ember-ccp-flagged');
  });
}
