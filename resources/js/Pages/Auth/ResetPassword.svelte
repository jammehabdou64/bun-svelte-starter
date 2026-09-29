<script lang="ts">
  import { useForm } from "@inertiajs/svelte";
  import GuestLayout from "../../Layouts/GuestLayout.svelte";

  let { token = "", email = "" } = $props();
  const form = useForm(() => ({
    token,
    email,
    password: "",
    password_confirmation: "",
  }));

  function submit(event: SubmitEvent) {
    event.preventDefault();
    form.post("/reset-password");
  }
</script>

<svelte:head><title>Reset password</title></svelte:head>

<GuestLayout>
  <h1 class="kit-title">Reset password</h1>
  <form class="mt-6" onsubmit={submit}>
    <label class="kit-label" for="email">Email</label>
    <input id="email" type="email" class="kit-input" bind:value={form.email} />
    {#if form.errors.email}<p class="kit-error">{form.errors.email}</p>{/if}
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
      <span></span>
      <button class="kit-button" disabled={form.processing}>Reset password</button>
    </div>
  </form>
</GuestLayout>
