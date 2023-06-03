import Cookie from "js-cookie";
export default {
  state: {
    isCollapse: false, // 控制菜单展开与否
    tabsList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "s-home",
        url: "Home/Home",
      },
    ], // 面包屑的数据
    menu: [],
  },
  mutations: {
    // 修改菜单展开收起的方法
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    // 更新面包屑数据
    selectMenu(state, val) {
      // console.log("val", val);
      // console.log("state", state);
      // 判断添加的数据是否为首页
      if (val.name !== "home") {
        const index = state.tabsList.findIndex(
          (item) => item.name === val.name
        );
        // 如果不存在
        if (index === -1) {
          state.tabsList.push(val);
        }
      }
    },
    // 删除指定tag数组
    closeTag(state, item) {
      const index = state.tabsList.findIndex((val) => val.name === item.name);
      state.tabsList.splice(index, 1);
    },
    // 设置menu的数据
    setMenu(state, val) {
      state.menu = val;
      Cookie.set("menu", JSON.stringify(val));
    },
    // 动态注册路由
    addMenu(state, router) {
      // 判断缓存中是否有数据
      // 不存在后续无操作
      if (!Cookie.get("menu")) return;
      // cookie中都是字符串,所以这里要转成数组
      const menu = JSON.parse(Cookie.get("menu"));
      // 更新menu
      state.menu = menu;
      // 组装动态路由的数据
      const menuArray = []; // 定义空数组用来转后面的成品
      menu.forEach((item) => {
        // 遍历children数组
        // 有子菜单
        if (item.children) {
          item.children.map((item) => {
            // 使用模板字符串语法来构造一个模块的路径
            // 然后使用 import() 函数来动态导入该模块
            item.component = () => import(`../views/${item.url}`);
            return item;
          });
          menuArray.push(...item.children);
        }
        // 无子菜单
        else {
          item.component = () => import(`../views/${item.url}`);
          menuArray.push(item);
        }
      });
      console.log(menuArray, "menuArray");
      // 路由的动态添加
      menuArray.forEach((item) => {
        router.addRoute("Main", item);
      });
    },
  },
};
