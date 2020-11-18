import { mount } from "@vue/test-utils";
import TableBoard from "@/components/TableBoard.vue";
import ReadyIcon from "@/components/Icons/Ready.vue";
import PeopleIcon from "@/components/Icons/People.vue";

describe("TableBoard", () => {
  it("Should renders position", () => {
    const props = {
      position: { x: 10, y: 20 },
      isSelected: false,
      isOpen: false,
      name: "Table test"
    };

    const wrapper = mount(TableBoard, { props });
    const table = wrapper.find("rect");

    expect(table).toBeDefined();
    expect(table.attributes("x")).toBe("10");
    expect(table.attributes("y")).toBe("20");
    expect(wrapper.find("[data-testid=tableName]").text()).toBe(
      "Mesa Table test"
    );
  });

  it("Should renders table name", () => {
    const props = {
      position: { x: 10, y: 20 },
      isSelected: false,
      isOpen: false,
      name: "Table test"
    };

    const wrapper = mount(TableBoard, { props });

    expect(wrapper.find("[data-testid=tableName]").text()).toBe(
      "Mesa Table test"
    );
  });

  it("Should renders table close state", () => {
    const props = {
      position: { x: 10, y: 20 },
      isSelected: false,
      isOpen: false,
      name: "Table test"
    };

    const wrapper = mount(TableBoard, { props });

    expect(wrapper.find("[data-testid=tableState]").text()).toBe("Disponible");
    expect(wrapper.findComponent(ReadyIcon).exists()).toBe(true);
  });

  it("Should renders table open state", () => {
    const props = {
      position: { x: 10, y: 20 },
      isSelected: false,
      isOpen: true,
      name: "Table test"
    };

    const wrapper = mount(TableBoard, { props });

    expect(wrapper.find("[data-testid=tableState]").text()).toBe("Ocupada");
    expect(wrapper.findComponent(PeopleIcon).exists()).toBe(true);
  });
});
