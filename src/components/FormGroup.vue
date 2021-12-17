<template>
  <div class="form-group">
    <slot/>
  </div>
</template>

<style>
.form-group > :not(:first-child) {
  margin-top: 0.5em;
}
</style>
