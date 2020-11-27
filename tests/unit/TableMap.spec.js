import { mount } from "@vue/test-utils";
import TableMap from "@/components/TableMap.vue";
import TableBoard from "@/components/TableBoard.vue";

describe("TableMap", () => {
  it("Should renders two tables", () => {
    const props = {
      canMove: () => true,
      tables: [
        {
          position: { x: 10, y: 20 },
          isSelected: false,
          isOpen: false,
          name: "Table test 1"
        },

        {
          position: { x: 300, y: 200 },
          isSelected: false,
          isOpen: false,
          name: "Table test 2"
        }
      ]
    };

    const wrapper = mount(TableMap, { props });
    const tables = wrapper.findAllComponents(TableBoard);
    expect(tables.length).toBe(2);
  });

  it("Should trigger 'select-table' when click a table", async () => {
    const props = {
      canMove: () => true,
      tables: [
        {
          position: { x: 10, y: 20 },
          isSelected: false,
          isOpen: false,
          name: "Table test 1"
        },

        {
          position: { x: 300, y: 200 },
          isSelected: false,
          isOpen: false,
          name: "Table test 2"
        }
      ]
    };

    const wrapper = mount(TableMap, { props });
    const tables = wrapper.findAllComponents(TableBoard);

    await tables[0].trigger("click");
    const event = wrapper.emitted()["select-table"];

    expect(event).toBeTruthy();
    expect(event[0][0]).toEqual(props.tables[0]);
  });

  it("Should trigger 'select-table' when click the map", async () => {
    const props = {
      canMove: () => true,
      tables: []
    };

    const wrapper = mount(TableMap, { props });

    await wrapper.trigger("click");
    const event = wrapper.emitted()["select-table"];

    expect(event).toBeTruthy();
    expect(event[0][0]).toEqual({});
  });
});
