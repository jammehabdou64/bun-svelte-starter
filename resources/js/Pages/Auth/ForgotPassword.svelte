<script lang="ts">
  import { Link, page, useForm } from "@inertiajs/svelte";
  import GuestLayout from "../../Layouts/GuestLayout.svelte";

  const form = useForm({ email: "" });
  const status = $derived(
    (page.props.flash as { type?: string; message?: string } | undefined)?.type === "status"
      ? String((page.props.flash as { message?: string }).message ?? "")
      : "",
  );

  function submit(event: SubmitEvent) {
    event.preventDefault();
    form.post("/forgot-password");
  }
</script>

<svelte:head><title>Forgot password</title></svelte:head>

<GuestLayout>
  <h1 class="kit-title">Forgot password</h1>
  <p class="kit-muted mt-3">We will email a reset link. With the log mailer, that link is printed in the server log.</p>
  {#if status}<p class="kit-status mt-4">{status}</p>{/if}
  <form class="mt-6" onsubmit={submit}>
    <label class="kit-label" for="email">Email</label>
    <input id="email" type="email" class="kit-input" bind:value={form.email} />
    {#if form.errors.email}<p class="kit-error">{form.errors.email}</p>{/if}
    <div class="kit-row">
      <Link href="/login" class="kit-link">Back to log in</Link>
      <button class="kit-button" disabled={form.processing}>Email reset link</button>
    </div>
  </form>
</GuestLayout>
