import { useTables } from "@/composables/useTables.js";

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
    selectTable({ id: 1 });
    expect(tables.value[0].isSelected).toBe(true);
  });

  it("Should have a sync selectedTable value", async () => {
    const { tables, fetchTables, selectedTable, selectTable } = useTables();

    await fetchTables();
    selectTable({ id: 1 });
    expect(selectedTable.value.id).toBe(tables.value[0].id);
    selectTable({ id: 2 });
    expect(selectedTable.value.id).toBe(tables.value[1].id);
  });

  it("Should have a selectedTable value", async () => {
    const { tables, fetchTables, selectedTable, selectTable } = useTables();

    await fetchTables();
    selectTable({ id: 1 });
    expect(tables.value[0]).toBe(selectedTable.value);
    selectTable({ id: 2 });
    expect(tables.value[1]).toBe(selectedTable.value);
  });

  it("Should has only one select table at a time", async () => {
    const { tables, fetchTables, selectTable } = useTables();

    await fetchTables();
    selectTable({ id: 1 });
    expect(tables.value[0].isSelected).toBe(true);
    expect(tables.value[1].isSelected).toBe(false);
    selectTable({ id: 2 });
    expect(tables.value[0].isSelected).toBe(false);
    expect(tables.value[1].isSelected).toBe(true);
  });

  it("Should deselect a table if no name is given", async () => {
    const { tables, fetchTables, selectTable } = useTables();

    await fetchTables();
    selectTable({ id: 1 });
    expect(tables.value[0].isSelected).toBe(true);
    selectTable();
    expect(tables.value[0].isSelected).toBe(false);
  });

  it("Should can open and close the selected table", async () => {
    const {
      fetchTables,
      selectTable,
      closeSelectedTable,
      openSelectedTable,
      findById
    } = useTables();

    await fetchTables();
    selectTable({ id: 1 });
    expect(findById(1).isOpen).toBe(false);
    openSelectedTable();
    expect(findById(1).isOpen).toBe(true);
    closeSelectedTable();
    expect(findById(1).isOpen).toBe(false);
  });
});
