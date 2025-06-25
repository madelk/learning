import { describe, it, expect } from 'vitest';
import router from '../router';
import { mount } from '@vue/test-utils';
import App from './App.vue';
import { getHomepageText } from '@study/pagetext';

describe('App', () => {
  it('renders properly', async () => {
   const text = getHomepageText()
    const wrapper = mount(App, { global: { plugins: [router] } });
    await router.isReady();
    expect(wrapper.text()).toContain(text.title.text);
  });
});
