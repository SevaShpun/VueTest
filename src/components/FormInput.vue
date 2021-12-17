<template>
  <input @input="$emit('input', $event.target.value)">
</template>