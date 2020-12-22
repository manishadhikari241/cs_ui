<template>
  <div :class="`group-items ${className}`">
    <button v-for="(tag, $index) in tags" :key="`tag_${$index}`" @click="$emit('tmpsearch', tag.value[$i18n.locale]); $emit('search');">
      {{ tag.label[$i18n.locale] }}
    </button>
  </div>
</template>

<script>
export default {
  props: ['tags', 'className']
}
</script>

<style lang="scss" scoped>

</style>