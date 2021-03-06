import { shallowMount } from "@vue/test-utils";
import Home from "@/views/Home.vue";

jest.mock("@/services/tables.js", () => {
  const TABLES = [
    {
      id: 1,
      position: { x: 10, y: 20 },
      isOpen: false,
      name: "Table test 1"
    },

    {
      id: 2,
      position: { x: 300, y: 200 },
      isOpen: false,
      name: "Table test 2"
    }
  ];

  return {
    getTables() {
      return Promise.resolve(TABLES);
    }
  };
});

describe("Home", () => {
  it("should has only one select table at a time", async () => {
    const home = shallowMount(Home, {});
    await home.vm.$nextTick();

    home.vm.onSelectTable({ id: 1 });

    expect(home.vm.tables[0].isSelected).toBe(true);
    expect(home.vm.tables[1].isSelected).toBe(false);

    home.vm.onSelectTable({ id: 2 });

    expect(home.vm.tables[0].isSelected).toBe(false);
    expect(home.vm.tables[1].isSelected).toBe(true);

    home.vm.onSelectTable({});

    expect(home.vm.tables[0].isSelected).toBe(false);
    expect(home.vm.tables[1].isSelected).toBe(false);
  });
});
