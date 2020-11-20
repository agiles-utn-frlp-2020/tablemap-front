import { mount } from "@vue/test-utils";
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import SidebarOpenTableSelected from "@/components/Sidebar/SidebarOpenTableSelected.vue";
import SidebarClosedTableSelected from "@/components/Sidebar/SidebarClosedTableSelected.vue";

jest.mock("@/services/products.js", () => {
  const PRODUCTS = [
    {
      id: 1,
      title: "Cerveza IPA",
      price: 100,
      image: ""
    },
    {
      id: 2,
      title: "Cerveza SCOTCH",
      price: 100,
      image: ""
    }
  ];

  return {
    getProducts() {
      return Promise.resolve(PRODUCTS);
    }
  };
});

jest.mock("@/services/orders.js", () => {
  return {
    createOrder() {
      return Promise.resolve(1);
    },
    closeOrder() {
      return Promise.resolve();
    }
  };
});

try {
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
      const sidebar = wrapper.findComponent(SidebarClosedTableSelected);
      const button = wrapper.find("button");

      await button.trigger("click");

      const event = sidebar.emitted()["open-table"];

      expect(event).toBeTruthy();
    });

    it("Should trigger 'close-table' event when clicked on sidebar button when open table is selected", async () => {
      const props = {
        table: { isOpen: true }
      };

      const wrapper = mount(Sidebar, { props });
      const button = wrapper.find("button[data-test-id=close]");

      await button.trigger("click");
      const sidebar = wrapper.findComponent(SidebarOpenTableSelected);
      const event = sidebar.emitted()["close-table"];

      expect(event).toBeTruthy();
    });

    it("Should renders the correct button if selected table is open", () => {
      const props = {
        table: { isOpen: true }
      };

      const wrapper = mount(Sidebar, { props });
      const button = wrapper.find("button[data-test-id=close]");
      expect(button.text()).toBe("Cerrar mesa");
    });

    it("Should renders a message if no table is selected", () => {
      const props = {};

      const wrapper = mount(Sidebar, { props });
      expect(wrapper.text()).toBe("Por favor seleccione una mesa.");
    });
  });
} catch (e) {
  console.log(e);
}
