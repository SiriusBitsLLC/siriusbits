<script lang="ts">
  // Import only the icons you want to support
  import LucideStar from '~icons/lucide/star';
  import LucideHeart from '~icons/lucide/heart';
  import LucideUser from '~icons/lucide/user';
  import LucideAlertCircle from '~icons/lucide/alert-circle'; // fallback

  // Map icon names to imported components
  const iconMap = {
    star: LucideStar,
    heart: LucideHeart,
    user: LucideUser
  };

  export let iconName: keyof typeof iconMap = 'star';
  export let size: string | number = '1.2em';
  export let color: string = 'currentColor';

  // Use fallback if iconName not found
  $: Icon = iconMap[iconName] || LucideAlertCircle;
</script>

<svelte:component this={Icon} width={size} height={size} color={color} />

<style>
  .icon {
    display: inline-block;
    vertical-align: middle;
  }
</style>
