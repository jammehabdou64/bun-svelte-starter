<script lang="ts">
  import { page, useForm } from "@inertiajs/svelte";
  import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout.svelte";

  const user = (page.props.auth as { user?: { name?: string; email?: string } | null } | undefined)?.user;
  const profile = useForm({ name: user?.name ?? "", email: user?.email ?? "" });
  const password = useForm({ current_password: "", password: "", password_confirmation: "" });
  const destroy = useForm({ password: "" });
  const status = $derived(
    (page.props.flash as { type?: string; message?: string } | undefined)?.type === "status"
      ? String((page.props.flash as { message?: string }).message ?? "")
      : "",
  );

  function saveProfile(event: SubmitEvent) {
    event.preventDefault();
    profile.patch("/profile");
  }

  function savePassword(event: SubmitEvent) {
    event.preventDefault();
    password.put("/password", { onSuccess: () => password.reset() });
  }

  function deleteAccount(event: SubmitEvent) {
    event.preventDefault();
    destroy.delete("/profile");
  }
</script>

<svelte:head><title>Profile</title></svelte:head>

<AuthenticatedLayout>
  <div class="kit-stack">
    {#if status}<p class="kit-status">{status}</p>{/if}
    <section class="kit-card kit-wide">
      <h1 class="kit-title">Profile</h1>
      <p class="kit-muted mt-2">Update your name and email address.</p>
      <form class="mt-4" onsubmit={saveProfile}>
        <label class="kit-label" for="name">Name</label>
        <input id="name" class="kit-input" bind:value={profile.name} />
        {#if profile.errors.name}<p class="kit-error">{profile.errors.name}</p>{/if}
        <div class="kit-field">
          <label class="kit-label" for="email">Email</label>
          <input id="email" type="email" class="kit-input" bind:value={profile.email} />
          {#if profile.errors.email}<p class="kit-error">{profile.errors.email}</p>{/if}
        </div>
        <div class="kit-row"><span></span><button class="kit-button" disabled={profile.processing}>Save</button></div>
      </form>
    </section>
    <section class="kit-card kit-wide">
      <h2 class="kit-title">Password</h2>
      <form class="mt-4" onsubmit={savePassword}>
        <label class="kit-label" for="current_password">Current password</label>
        <input id="current_password" type="password" class="kit-input" autocomplete="current-password" bind:value={password.current_password} />
        {#if password.errors.current_password}<p class="kit-error">{password.errors.current_password}</p>{/if}
        <div class="kit-field">
          <label class="kit-label" for="password">New password</label>
          <input id="password" type="password" class="kit-input" autocomplete="new-password" bind:value={password.password} />
          {#if password.errors.password}<p class="kit-error">{password.errors.password}</p>{/if}
        </div>
        <div class="kit-field">
          <label class="kit-label" for="password_confirmation">Confirm password</label>
          <input id="password_confirmation" type="password" class="kit-input" autocomplete="new-password" bind:value={password.password_confirmation} />
        </div>
        <div class="kit-row"><span></span><button class="kit-button" disabled={password.processing}>Update password</button></div>
      </form>
    </section>
    <section class="kit-card kit-wide">
      <h2 class="kit-title">Delete account</h2>
      <p class="kit-muted mt-2">This permanently deletes the account. Enter the current password to confirm.</p>
      <form class="mt-4" onsubmit={deleteAccount}>
        <label class="kit-label" for="delete_password">Password</label>
        <input id="delete_password" type="password" class="kit-input" autocomplete="current-password" bind:value={destroy.password} />
        {#if destroy.errors.password}<p class="kit-error">{destroy.errors.password}</p>{/if}
        <div class="kit-row"><span></span><button class="kit-button kit-button-danger" disabled={destroy.processing}>Delete account</button></div>
      </form>
    </section>
  </div>
</AuthenticatedLayout>
