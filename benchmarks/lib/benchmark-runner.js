/* jshint esnext:true */
/* globals $ */

import w from 'iframe-wrapper';

export function run() {
  $(document).ready(function() {
    w.wrapper('CCP', 'ember');
    w.wrapper('CCP', 'ember-ccp-on');
    w.wrapper('CCP', 'ember-ccp-flagged');
  });
}
