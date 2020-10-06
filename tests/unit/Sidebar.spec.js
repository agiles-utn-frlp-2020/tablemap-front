import { mount } from "@vue/test-utils";
import Sidebar from "@/components/Sidebar/Sidebar.vue";

describe("Sidebar", () => {
  it("Should renders the correct button if selected table is closed", () => {
    const props = {
      table: { isOpen: false }
    };

    const wrapper = mount(Sidebar, { props });
    const button = wrapper.find("button");
    expect(button.text()).toBe("Abrir mesa");
  });

  it("Should trigger 'open-table' event when clicked on sidebar button when closed table is selected", async () => {
    const props = {
      table: { isOpen: false }
    };

    const wrapper = mount(Sidebar, { props });
    const button = wrapper.find("button");

    await button.trigger("click");
    const event = wrapper.emitted()["open-table"];

    expect(event).toBeTruthy();
  });

  it("Should trigger 'close-table' event when clicked on sidebar button when open table is selected", async () => {
    const props = {
      table: { isOpen: true }
    };

    const wrapper = mount(Sidebar, { props });
    const button = wrapper.find("button");

    await button.trigger("click");
    const event = wrapper.emitted()["close-table"];

    expect(event).toBeTruthy();
  });

  it("Should renders the correct button if selected table is open", () => {
    const props = {
      table: { isOpen: true }
    };

    const wrapper = mount(Sidebar, { props });
    const button = wrapper.find("button");
    expect(button.text()).toBe("Cerrar mesa");
  });

  it("Should renders a message if no table is selected", () => {
    const props = {};

    const wrapper = mount(Sidebar, { props });
    expect(wrapper.text()).toBe("Por favor seleccione una mesa.");
  });
});
