<script lang="ts">
  import { Link, useForm } from "@inertiajs/svelte";
  import GuestLayout from "../../Layouts/GuestLayout.svelte";

  const form = useForm({ name: "", email: "", password: "", password_confirmation: "" });

  function submit(event: SubmitEvent) {
    event.preventDefault();
    form.post("/register");
  }
</script>

<svelte:head><title>Register</title></svelte:head>

<GuestLayout>
  <h1 class="kit-title">Register</h1>
  <form class="mt-6" onsubmit={submit}>
    <label class="kit-label" for="name">Name</label>
    <input id="name" class="kit-input" autocomplete="name" bind:value={form.name} />
    {#if form.errors.name}<p class="kit-error">{form.errors.name}</p>{/if}
    <div class="kit-field">
      <label class="kit-label" for="email">Email</label>
      <input id="email" type="email" class="kit-input" autocomplete="username" bind:value={form.email} />
      {#if form.errors.email}<p class="kit-error">{form.errors.email}</p>{/if}
    </div>
    <div class="kit-field">
      <label class="kit-label" for="password">Password</label>
      <input id="password" type="password" class="kit-input" autocomplete="new-password" bind:value={form.password} />
      {#if form.errors.password}<p class="kit-error">{form.errors.password}</p>{/if}
    </div>
    <div class="kit-field">
      <label class="kit-label" for="password_confirmation">Confirm password</label>
      <input id="password_confirmation" type="password" class="kit-input" autocomplete="new-password" bind:value={form.password_confirmation} />
    </div>
    <div class="kit-row">
      <Link href="/login" class="kit-link">Already registered?</Link>
      <button class="kit-button" disabled={form.processing}>Register</button>
    </div>
  </form>
</GuestLayout>
