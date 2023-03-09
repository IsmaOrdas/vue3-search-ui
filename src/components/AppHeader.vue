<template>
  <header class="header">
    <slot />
  </header>
</template>

<style lang="scss" scoped>
.header {
  align-items: center;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: center;
  height: 60px;
}
</style>