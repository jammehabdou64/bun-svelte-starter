<script lang="ts">
  import { page } from "@inertiajs/svelte";
  import AuthenticatedLayout from "../Layouts/AuthenticatedLayout.svelte";

  const userName = $derived(String((page.props.auth as { user?: { name?: string } | null } | undefined)?.user?.name ?? ""));
  const status = $derived(
    (page.props.flash as { type?: string; message?: string } | undefined)?.type === "status"
      ? String((page.props.flash as { message?: string }).message ?? "")
      : "",
  );
</script>

<svelte:head><title>Dashboard</title></svelte:head>

<AuthenticatedLayout>
  {#if status}<p class="kit-status">{status}</p>{/if}
  <div class="kit-card kit-wide">
    <h1 class="kit-title">Dashboard</h1>
    <p class="kit-muted mt-3">You're logged in{userName ? ` as ${userName}` : ""}.</p>
  </div>
</AuthenticatedLayout>
