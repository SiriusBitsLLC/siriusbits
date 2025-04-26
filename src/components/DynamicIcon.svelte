<script lang="ts">
  export let iconName: string;
  export let size: string | number = '1.2em';
  export let color: string = 'currentColor';

  // Use unplugin-icons for dynamic, tree-shakeable icon imports
  import Icon from 'unplugin-icons/svelte';
</script>

<Icon name={`lucide:${iconName}`} width={size} height={size} color={color} />

<style>
  .icon {
    display: inline-block;
    vertical-align: middle;
  }
</style>
