<script lang="ts">
  import { Link, page } from "@inertiajs/svelte";

  const name = $derived(String(page.props.name ?? "Javel"));
  const email = $derived(String((page.props.auth as { user?: { email?: string } | null } | undefined)?.user?.email ?? ""));
</script>

<svelte:head>
  <title>{name} · Svelte</title>
</svelte:head>

<main class="min-h-screen bg-[#10130f] font-sans text-[#f4f1ea] antialiased">
  <div class="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
    <p class="text-[11px] tracking-[0.32em] text-[#c6f25c] uppercase">Svelte</p>
    <h1 class="mt-4 font-serif text-7xl tracking-tight">{name}</h1>
    <p class="mt-6 max-w-md text-lg leading-relaxed font-light text-[#b7b1a6]">
      Register, sign in, and open the dashboard. The server owns the routes. This page is an Inertia component.
    </p>
    <div class="mt-8 flex gap-4 text-sm">
      {#if email}
        <Link href="/dashboard" class="rounded-full bg-[#c6f25c] px-5 py-2 text-[#10130f]">Dashboard</Link>
      {:else}
        <Link href="/login" class="rounded-full bg-[#c6f25c] px-5 py-2 text-[#10130f]">Log in</Link>
        <Link href="/register" class="rounded-full border border-[#f4f1ea]/30 px-5 py-2">Register</Link>
      {/if}
    </div>
  </div>
</main>
