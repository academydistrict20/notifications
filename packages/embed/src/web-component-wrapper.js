import Vue from 'vue'
import wrap from '@vue/web-component-wrapper'
import * as components from './index'

if (typeof Vue !== 'undefined') {
  for (const name in components) {
    window.customElements.define(components[name].name, wrap(Vue, components[name]))
  }
}
