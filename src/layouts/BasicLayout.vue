<template>
 <div id="basicLayout">
   <a-layout>
     <a-layout-header class="header">
        <global-header></global-header>
     </a-layout-header>
     <a-layout-content class="content">
       <router-view></router-view>
     </a-layout-content>
     <a-layout-footer class="footer">
       <a href="www.baidu.com" target="_blank">
         导航到百度
       </a>
     </a-layout-footer>
   </a-layout>
 </div>
</template>
<script setup>

import GlobalHeader from "@/components/GlobalHeader.vue";
</script>



<style scoped>
#basicLayout .footer{
  background: #efefef;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
}
#basicLayout .content{
  padding: 20px;
  margin-bottom: 20px;
  background: linear-gradient(to right, #ffffff, #efefef);
}
#basicLayout .header{
  background: white;
  margin-bottom:  16px;
  color: unset;
  padding-inline: 20px;
}
</style>