<script lang="ts">
  import { Link, page, useForm } from "@inertiajs/svelte";

  let { children } = $props();
  const logout = useForm({});
  const name = $derived(String(page.props.name ?? "Javel"));
</script>

<div class="kit">
  <header class="kit-nav">
    <Link href="/dashboard" class="font-serif text-2xl">{name}</Link>
    <nav>
      <Link href="/dashboard" class="kit-link">Dashboard</Link>
      <Link href="/profile" class="kit-link">Profile</Link>
      <button type="button" class="kit-link" onclick={() => logout.post("/logout")}>Log out</button>
    </nav>
  </header>
  <main class="kit-main">
    {@render children()}
  </main>
</div>
