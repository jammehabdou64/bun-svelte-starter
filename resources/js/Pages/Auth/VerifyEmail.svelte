<script lang="ts">
  import { page, useForm } from "@inertiajs/svelte";
  import GuestLayout from "../../Layouts/GuestLayout.svelte";

  const form = useForm({});
  const logout = useForm({});
  const status = $derived(
    (page.props.flash as { type?: string; message?: string } | undefined)?.type === "status"
      ? String((page.props.flash as { message?: string }).message ?? "")
      : "",
  );
</script>

<svelte:head><title>Verify email</title></svelte:head>

<GuestLayout>
  <h1 class="kit-title">Verify email</h1>
  <p class="kit-muted mt-3">
    Thanks for signing up. Open the verification link before using the dashboard. The log mailer writes that link to the terminal running this app.
  </p>
  {#if status}<p class="kit-status mt-4">{status}</p>{/if}
  <div class="kit-row">
    <button type="button" class="kit-link" onclick={() => logout.post("/logout")}>Log out</button>
    <button type="button" class="kit-button" disabled={form.processing} onclick={() => form.post("/email/verification-notification")}>Resend link</button>
  </div>
</GuestLayout>
