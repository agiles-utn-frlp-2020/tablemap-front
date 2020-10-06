<script>
import { h } from "vue";

import SidebarClosedTableSelected from "./SidebarClosedTableSelected.vue";
import SidebarOpenTableSelected from "./SidebarOpenTableSelected.vue";
import SidebarNoTableSelected from "./SidebarNoTableSelected.vue";

export default {
  emits: ["open-table"],

  props: ["table"],

  render() {
    if (!this.table) {
      return h(SidebarNoTableSelected);
    }
    if (this.table.isOpen) {
      return h(SidebarOpenTableSelected);
    }
    return h(SidebarClosedTableSelected);
  }
};
</script>
