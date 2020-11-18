import { useTables } from "@/composables/useTables.js";

jest.mock("@/services/tables.js", () => {
  const TABLES = [
    {
      position: { x: 10, y: 20 },
      isOpen: false,
      name: "Table test 1"
    },

    {
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

describe("useTable", () => {
  it("Should load tables on fetch", async () => {
    const { tables, fetchTables } = useTables();

    expect(tables.value.length).toBe(0);
    await fetchTables();
    expect(tables.value.length).toBe(2);
  });

  it("Should select a table by name", async () => {
    const { tables, fetchTables, selectTable } = useTables();

    await fetchTables();
    selectTable({ name: "Table test 1" });
    expect(tables.value[0].isSelected).toBe(true);
  });

  it("Should have a sync selectedTable value", async () => {
    const { tables, fetchTables, selectedTable, selectTable } = useTables();

    await fetchTables();
    selectTable({ name: "Table test 1" });
    expect(tables.value[0]).toBe(selectedTable.value);
    selectTable({ name: "Table test 2" });
    expect(tables.value[1]).toBe(selectedTable.value);
  });

  it("Should have a selectedTable value", async () => {
    const { tables, fetchTables, selectedTable, selectTable } = useTables();

    await fetchTables();
    selectTable({ name: "Table test 1" });
    expect(tables.value[0]).toBe(selectedTable.value);
    selectTable({ name: "Table test 2" });
    expect(tables.value[1]).toBe(selectedTable.value);
  });

  it("Should has only one select table at a time", async () => {
    const { tables, fetchTables, selectTable } = useTables();

    await fetchTables();
    selectTable({ name: "Table test 1" });
    expect(tables.value[0].isSelected).toBe(true);
    expect(tables.value[1].isSelected).toBe(false);
    selectTable({ name: "Table test 2" });
    expect(tables.value[0].isSelected).toBe(false);
    expect(tables.value[1].isSelected).toBe(true);
  });

  it("Should deselect a table if no name is given", async () => {
    const { tables, fetchTables, selectTable } = useTables();

    await fetchTables();
    selectTable({ name: "Table test 1" });
    expect(tables.value[0].isSelected).toBe(true);
    selectTable();
    expect(tables.value[0].isSelected).toBe(false);
  });

  it.only("Should can open and close the selected table", async () => {
    const {
      fetchTables,
      selectTable,
      closeSelectedTable,
      openSelectedTable,
      findByName
    } = useTables();

    const name = "Table test 1";

    await fetchTables();
    selectTable({ name });
    expect(findByName(name).isOpen).toBe(false);
    openSelectedTable();
    expect(findByName(name).isOpen).toBe(true);
    closeSelectedTable();
    expect(findByName(name).isOpen).toBe(false);
  });
});
