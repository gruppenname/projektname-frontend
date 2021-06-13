import AddTask from '@/components/AddTask.vue';
import { shallowMount } from '@vue/test-utils';

describe('AddTask.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(AddTask, () => {});
  });

  it('does div exist', () => {
    expect(wrapper.find('label').text()).toBe('Todo');
  });
});
