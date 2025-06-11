<script module lang="ts">
  // Export IconName type for use in other Svelte files
  export type IconName =
    | "bar-chart-3"
    | "brain-circuit"
    | "layout-dashboard"
    | "code"
    | "layers"
    | "cloud"
    | "mic"
    | "network"
    | "strategy"
    | "cpu"
    | "megaphone"
    | "shield-check"
    | "briefcase"
    | "users"
    | "package"
    | "lightbulb"
    | "globe"
    | "database"
    | "clipboard-check"
    | "refresh-cw"
    | "monitor-smartphone"
    | "monitor-cog"
    | "share-2"
    | "layout-template"
    | "file-sql"
    | "webhooks-logo"
    | "shuffle"
    | "file-code-2"
    | "book-open"
    | "graduation-cap"
    | "goal"
    | "list-checks"
    | "search-code"
    | "radio-tower"
    | "star"
    | "heart"
    | "user";
</script>

<script lang="ts">
  // Import only the icons you want to support
  import IconGlobe from "~icons/lucide/globe";
  import IconDatabase from "~icons/lucide/database";
  import IconBarChart3 from "~icons/lucide/bar-chart-3";
  import IconClipboardCheck from "~icons/lucide/clipboard-check";
  import IconRefreshCw from "~icons/lucide/refresh-cw";
  import IconCpu from "~icons/lucide/cpu";
  import IconBrainCircuit from "~icons/lucide/brain-circuit";
  import IconLightbulb from "~icons/lucide/lightbulb";
  import IconLayoutDashboard from "~icons/lucide/layout-dashboard";
  import IconUsers from "~icons/lucide/users";
  import IconLayers from "~icons/lucide/layers";
  import IconStrategy from "~icons/ph/strategy";
  import IconCode from "~icons/lucide/code";
  import IconCloud from "~icons/lucide/cloud";
  import IconMic from "~icons/lucide/mic";
  import IconMegaphone from "~icons/lucide/megaphone";
  import IconShieldCheck from "~icons/lucide/shield-check";
  import IconBriefcase from "~icons/lucide/briefcase";
  import IconPackage from "~icons/lucide/package";
  import IconMonitorSmartphone from "~icons/lucide/monitor-smartphone";
  import IconMonitorCog from "~icons/lucide/monitor-cog";
  import IconNetwork from "~icons/lucide/network";
  import IconShare2 from "~icons/lucide/share-2";
  import IconLayoutTemplate from "~icons/lucide/layout-template";
  import IconFileSql from "~icons/ph/file-sql";
  import IconApi from "~icons/ph/webhooks-logo";
  import IconShuffle from "~icons/ph/shuffle";
  import IconFileCode2 from "~icons/lucide/file-code-2";
  import IconBookOpen from "~icons/ph/book-open";
  import IconGraduationCap from "~icons/ph/graduation-cap";
  import IconGoal from "~icons/lucide/goal";
  import IconListChecks from "~icons/ph/list-checks";
  import IconSearchCode from "~icons/lucide/search-code";
  import IconRadioTower from "~icons/lucide/radio-tower";
  import LucideStar from "~icons/lucide/star";
  import LucideHeart from "~icons/lucide/heart";
  import LucideUser from "~icons/lucide/user";
  import LucideAlertCircle from "~icons/lucide/alert-circle"; // fallback

  // Map icon names to imported components
  const iconMap = {
    "bar-chart-3": IconBarChart3,
    "brain-circuit": IconBrainCircuit,
    "layout-dashboard": IconLayoutDashboard,
    code: IconCode,
    layers: IconLayers,
    cloud: IconCloud,
    mic: IconMic,
    network: IconNetwork,
    strategy: IconStrategy,
    cpu: IconCpu,
    megaphone: IconMegaphone,
    "shield-check": IconShieldCheck,
    briefcase: IconBriefcase,
    users: IconUsers,
    package: IconPackage,
    lightbulb: IconLightbulb,
    globe: IconGlobe,
    database: IconDatabase,
    "clipboard-check": IconClipboardCheck,
    "refresh-cw": IconRefreshCw,
    "monitor-smartphone": IconMonitorSmartphone,
    "monitor-cog": IconMonitorCog,
    "share-2": IconShare2,
    "layout-template": IconLayoutTemplate,
    "file-sql": IconFileSql,
    "webhooks-logo": IconApi,
    shuffle: IconShuffle,
    "file-code-2": IconFileCode2,
    "book-open": IconBookOpen,
    "graduation-cap": IconGraduationCap,
    goal: IconGoal,
    "list-checks": IconListChecks,
    "search-code": IconSearchCode,
    "radio-tower": IconRadioTower,
    star: LucideStar,
    heart: LucideHeart,
    user: LucideUser,
  };

  
  let {
    iconName = "star",
    size = "1.2em",
    color = "currentColor",
  } = $props<{
    iconName?: keyof typeof iconMap;
    size?: string | number;
    color?: string;
  }>();

  // Use fallback if iconName not found
  let Icon = $state(LucideAlertCircle);
$effect(() => {
  Icon = iconMap[iconName as keyof typeof iconMap] ?? LucideAlertCircle;
});
</script>

<Icon width={size} height={size} {color} />
