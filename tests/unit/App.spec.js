import App from '@/App.vue';
import { shallowMount } from '@vue/test-utils';

describe('App.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(App, () => {});
  });

  it('does div exist', () => {
    expect(wrapper.find('button').text()).toBe('Aufgabe hinzufügen');
  });
});
