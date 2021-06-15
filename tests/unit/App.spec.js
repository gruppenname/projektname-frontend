import App from '@/App.vue';
import { shallowMount } from '@vue/test-utils';

describe('App.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(App, () => {});
  });

  it('does button with id exist', () => {
    const addButton = wrapper.find('#addButton');
    expect(addButton.element.id).toBe('addButton');
  });
});
