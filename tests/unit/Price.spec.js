import { mount } from "@vue/test-utils";
import Price from "@/components/Price.vue";

describe("Price", () => {
  it("Should renders price", () => {
    const props = {
      price: 100
    };

    const wrapper = mount(Price, { props });

    expect(wrapper.text()).toBe("$ 100.00");
  });
});
