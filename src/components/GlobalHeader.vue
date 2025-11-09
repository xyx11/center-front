<template>
  <div id="globalHeader">
    <a-row :wrap="false">
      <!-- LOGO + 标题 -->
      <a-col flex="200px">
        <div class="title-bar">
          <img class="logo" src="../assets/logo.png" alt="logo" />
          <div class="title">用户中心</div>
        </div>
      </a-col>

      <!-- 菜单 -->
      <a-col flex="auto">
        <!-- 这里的 selectedKeys 必须是数组 -->
        <a-menu
            v-model:selectedKeys="selectedKeys"
            mode="horizontal"
            :items="items"
            @click="doMenuClick"
        />
      </a-col>

      <!-- 登录按钮 -->
      <a-col flex="80px">
        <div class="user-login-status">
          <a-button type="primary" href="">登录</a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { h, ref, onBeforeUnmount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';

// ------------------------
// Router
// ------------------------
const router = useRouter();
const route = useRoute();

/**
 * 菜单点击后跳转路由
 * 这里使用路由 **name** 与 menu.item.key 对齐
 */
const doMenuClick = (e: { key: string }) => {
  router.push({ name: e.key });               // ← 使用 name 跳转
};

/**
 * 选中项必须是数组，如 ['mail']
 * 初始值读取当前路由的 name（如果没有 name，fallback 到 path 去掉首个 '/'）
 */
const selectedKeys = ref<string[]>([
  (route.name as string) ?? route.path.replace(/^\//, '')
]);

/**
 * 监听路由变化，保持菜单高亮同步
 * router.afterEach 返回一个“取消订阅”函数，离开组件时要手动调用
 */
const cancelAfterEach = router.afterEach((to) => {
  const key = (to.name as string) ?? to.path.replace(/^\//, '');
  selectedKeys.value = [key];
});

onBeforeUnmount(() => {
  cancelAfterEach();                         // ← 清理钩子，防止内存泄漏
});

// ------------------------
// 菜单数据
// ------------------------
const items = ref([
  {
    key: 'mail',                     // 与路由 name 对应
    icon: () => h(MailOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: 'app',
    icon: () => h(AppstoreOutlined),
    label: 'Navigation Two',
    title: 'Navigation Two',
  },
  {
    key: 'sub1',
    icon: () => h(SettingOutlined),
    label: 'Navigation Three - Submenu',
    title: 'Navigation Three - Submenu',
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          { label: 'Option 1', key: 'setting:1' },
          { label: 'Option 2', key: 'setting:2' },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          { label: 'Option 3', key: 'setting:3' },
          { label: 'Option 4', key: 'setting:4' },
        ],
      },
    ],
  },
  {
    key: 'alipay',
    label: h(
        'a',
        { href: 'https://antdv.com', target: '_blank' },
        'Navigation Four - Link'
    ),
    title: 'Navigation Four - Link',
  },
]);
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}
.title {
  color: black;
  font-size: 18px;
  margin-left: 16px;
}
.logo {
  height: 48px;
}
</style>
