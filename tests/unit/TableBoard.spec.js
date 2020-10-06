import { mount } from "@vue/test-utils";
import TableBoard from "@/components/TableBoard.vue";

describe("TableBoard", () => {
  it("Should renders position", () => {
    const props = {
      position: { x: 10, y: 20 },
      isSelected: false,
      isOpen: false,
      name: "Table test"
    };

    const wrapper = mount(TableBoard, { props });
    const rect = wrapper.find("rect");

    expect(rect).toBeDefined();
    expect(rect.attributes("x")).toBe("10");
    expect(rect.attributes("y")).toBe("20");
    expect(wrapper.text()).toBe("Table test");
  });

  it("Should renders table name", () => {
    const props = {
      position: { x: 10, y: 20 },
      isSelected: false,
      isOpen: false,
      name: "Table test"
    };

    const wrapper = mount(TableBoard, { props });

    expect(wrapper.text()).toBe("Table test");
  });

  it("Should renders table open state", () => {
    const props = {
      position: { x: 10, y: 20 },
      isSelected: false,
      isOpen: true,
      name: "Table test"
    };

    const wrapper = mount(TableBoard, { props });

    expect(wrapper.text()).toBe("Table testOpen");
  });
});
