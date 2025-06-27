import { mount, VueWrapper } from '@vue/test-utils';
import CalculatorView from './CalculatorView.vue';

describe('CalculatorView UI Integration', () => {
  let wrapper: VueWrapper<typeof CalculatorView>;

  beforeEach(() => {
    wrapper = mount(CalculatorView);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe('UI Rendering', () => {
    it('should render calculator title', () => {
      expect(wrapper.text()).toContain('Vue Calculator');
    });

    it('should render display input', () => {
      const display = wrapper.find('#result');
      expect(display.exists()).toBe(true);
      expect((display.element as HTMLInputElement).value).toBe('0');
    });

    it('should render all calculator buttons', () => {
      const buttons = wrapper.findAll('button');
      expect(buttons.length).toBe(26); // All calculator buttons

      // Check for key buttons
      const buttonTexts = buttons.map((button) => button.text());
      expect(buttonTexts).toContain('0');
      expect(buttonTexts).toContain('1');
      expect(buttonTexts).toContain('=');
      expect(buttonTexts).toContain('C');
      expect(buttonTexts).toContain('MC');
    });

    it('should have display input disabled', () => {
      const display = wrapper.find('#result');
      expect((display.element as HTMLInputElement).disabled).toBe(true);
    });
  });

  describe('Basic Button Interactions', () => {
    it('should update display when digit button is clicked', async () => {
      const button5 = wrapper.findAll('button').find((btn) => btn.text() === '5');
      if (button5) {
        await button5.trigger('click');
        const display = wrapper.find('#result');
        expect((display.element as HTMLInputElement).value).toBe('5');
      }
    });

    it('should perform basic arithmetic', async () => {
      const button5 = wrapper.findAll('button').find((btn) => btn.text() === '5');
      const buttonPlus = wrapper.findAll('button').find((btn) => btn.text() === '+');
      const button3 = wrapper.findAll('button').find((btn) => btn.text() === '3');
      const buttonEquals = wrapper.findAll('button').find((btn) => btn.text() === '=');
      
      if (button5 && buttonPlus && button3 && buttonEquals) {
        await button5.trigger('click');
        await buttonPlus.trigger('click');
        await button3.trigger('click');
        await buttonEquals.trigger('click');
        
        const display = wrapper.find('#result');
        expect((display.element as HTMLInputElement).value).toBe('8');
      }
    });

    it('should clear display with C button', async () => {
      const button5 = wrapper.findAll('button').find((btn) => btn.text() === '5');
      const buttonClear = wrapper.findAll('button').find((btn) => btn.text() === 'C');
      
      if (button5 && buttonClear) {
        await button5.trigger('click');
        expect((wrapper.find('#result').element as HTMLInputElement).value).toBe('5');
        
        await buttonClear.trigger('click');
        expect((wrapper.find('#result').element as HTMLInputElement).value).toBe('0');
      }
    });
  });

  describe('Button Styling', () => {
    it('should apply correct styles to different button types', () => {
      const buttons = wrapper.findAll('button');
      
      // Find Clear button and check its style
      const clearButton = buttons.find((btn) => btn.text() === 'C');
      if (clearButton) {
        expect(clearButton.classes()).toContain('bg-red-500');
      }
      
      // Find Memory button and check its style
      const memoryButton = buttons.find((btn) => btn.text() === 'MC');
      if (memoryButton) {
        expect(memoryButton.classes()).toContain('bg-blue-500');
      }
      
      // Find regular button and check its style
      const digitButton = buttons.find((btn) => btn.text() === '5');
      if (digitButton) {
        expect(digitButton.classes()).toContain('bg-slate-500');
      }
    });
  });

  describe('Display Properties', () => {
    it('should have correct display styling', () => {
      const display = wrapper.find('#result');
      expect(display.classes()).toContain('font-mono');
      expect(display.classes()).toContain('bg-green-700');
      expect(display.classes()).toContain('text-black');
    });
  });

  describe('Integration with Calculator Logic', () => {
    it('should handle complex operations through UI', async () => {
      const buttons = wrapper.findAll('button');
      
      // Find buttons by text
      const button1 = buttons.find((btn) => btn.text() === '1');
      const button2 = buttons.find((btn) => btn.text() === '2');
      const button3 = buttons.find((btn) => btn.text() === '3');
      const buttonPlus = buttons.find((btn) => btn.text() === '+');
      const buttonMultiply = buttons.find((btn) => btn.text() === '*');
      const buttonEquals = buttons.find((btn) => btn.text() === '=');
      
      if (button1 && button2 && button3 && buttonPlus && buttonMultiply && buttonEquals) {
        // Test: 1 + 2 * 3 = should give 9 (operator chaining: (1+2)*3)
        await button1.trigger('click');
        await buttonPlus.trigger('click');
        await button2.trigger('click');
        await buttonMultiply.trigger('click');
        await button3.trigger('click');
        await buttonEquals.trigger('click');
        
        const display = wrapper.find('#result');
        expect((display.element as HTMLInputElement).value).toBe('9');
      }
    });

    it('should handle memory operations through UI', async () => {
      const buttons = wrapper.findAll('button');
      
      const button5 = buttons.find((btn) => btn.text() === '5');
      const buttonMPlus = buttons.find((btn) => btn.text() === 'M+');
      const button3 = buttons.find((btn) => btn.text() === '3');
      const buttonMR = buttons.find((btn) => btn.text() === 'MR');
      
      if (button5 && buttonMPlus && button3 && buttonMR) {
        // Store 5 in memory, enter 3, then recall memory
        await button5.trigger('click');
        await buttonMPlus.trigger('click');
        await button3.trigger('click');
        await buttonMR.trigger('click');
        
        const display = wrapper.find('#result');
        expect((display.element as HTMLInputElement).value).toBe('5');
      }
    });
  });
});
