<script lang="ts">
  import { Link, page, useForm } from "@inertiajs/svelte";
  import GuestLayout from "../../Layouts/GuestLayout.svelte";

  const form = useForm({ email: "", password: "" });
  const status = $derived(
    (page.props.flash as { type?: string; message?: string } | undefined)?.type === "status"
      ? String((page.props.flash as { message?: string }).message ?? "")
      : "",
  );

  function submit(event: SubmitEvent) {
    event.preventDefault();
    form.post("/login");
  }
</script>

<svelte:head><title>Log in</title></svelte:head>

<GuestLayout>
  <h1 class="kit-title">Log in</h1>
  {#if status}<p class="kit-status mt-4">{status}</p>{/if}
  <form class="mt-6" onsubmit={submit}>
    <label class="kit-label" for="email">Email</label>
    <input id="email" type="email" class="kit-input" autocomplete="username" bind:value={form.email} />
    {#if form.errors.email}<p class="kit-error">{form.errors.email}</p>{/if}
    <div class="kit-field">
      <label class="kit-label" for="password">Password</label>
      <input id="password" type="password" class="kit-input" autocomplete="current-password" bind:value={form.password} />
      {#if form.errors.password}<p class="kit-error">{form.errors.password}</p>{/if}
    </div>
    <div class="kit-row">
      <Link href="/forgot-password" class="kit-link">Forgot your password?</Link>
      <button class="kit-button" disabled={form.processing}>Log in</button>
    </div>
  </form>
  <p class="kit-muted mt-6">Need an account? <Link href="/register" class="kit-link">Register</Link></p>
</GuestLayout>
