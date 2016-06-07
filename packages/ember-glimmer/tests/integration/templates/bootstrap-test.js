import { moduleFor, RenderingTest } from '../../utils/test-case';
import { Component } from '../../utils/helpers';
import jQuery from 'ember-views/system/jquery';
import bootstrap from 'ember-templates/bootstrap';
import { setTemplates, get as getTemplate } from 'ember-templates/template_registry';

moduleFor('Templates bootstrap test', class extends RenderingTest {

  getOwnerOptions() {
    return {
      _registryOptions: {
        resolver: {
          resolve(fullName) {
            if (/^template:/.test(fullName)) {
              let [, templateName] = /^template:(.*)/.exec(fullName);
              return getTemplate(templateName);
            }
          }
        }
      }
    };
  }

  teardown() {
    setTemplates({});
  }

  bootstrapTemplates() {
    this.runTask(() => bootstrap(jQuery('#qunit-fixture')));
  }

  checkTemplate(name, assert) {
    let TywinComponent = Component.extend({
      layoutName: name,

      init() {
        this._super(...arguments);
        this.name = 'Tywin';
      }
    });

    this.bootstrapTemplates();

    let templateFromRegistry = getTemplate(name);

    assert.ok(templateFromRegistry, 'template is available on Ember.TEMPLATES');

    assert.equal(jQuery('#qunit-fixture script').length, 0, 'script removed');

    this.registerComponent('l-tywin', { ComponentClass: TywinComponent });

    this.render('{{l-tywin}}');

    this.assertText('Tywin always pays his debts');
  }

  ['@test templates with data-template-name are added to Ember.TEMPLATES'](assert) {
    jQuery('#qunit-fixture').html('<script type="text/x-handlebars" data-template-name="lannisters">{{name}} always pays his debts</script>');

    this.checkTemplate('lannisters', assert);
  }
});
