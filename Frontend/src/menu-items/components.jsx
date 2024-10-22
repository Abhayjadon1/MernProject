// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  DollarOutlined,
  RocketOutlined,
  LoadingOutlined,
  ReadOutlined,
  KeyOutlined,
  GlobalOutlined,
  FileDoneOutlined,
  NotificationOutlined,
  SettingOutlined,
} from "@ant-design/icons";

// icons
const icons = {
  RocketOutlined,
  DollarOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  ReadOutlined,
  KeyOutlined,
  GlobalOutlined,
  FileDoneOutlined,
  NotificationOutlined,
  SettingOutlined,
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //
<FileDoneOutlined />;

const components = {
  id: "components",
  title: "Components",
  type: "group",
  children: [
    {
      id: "employee-management",
      title: "Employee Management",
      type: "item",
      url: "/employee-management",
      icon: icons.SettingOutlined,
    },

    // {
    //   id: "common",
    //   title: "common",
    //   type: "item",
    //   url: "/common",
    //   icon: icons.BarcodeOutlined,
    // },
  ],
};

export default components;
