<template>
  <div class="d-flex ai-center jc-center">
    <div class="d-flex flex-column ai-center jc-center">
      <div class="reg-header"></div>

      <auth-form
        title="С возвращением"
        description="Войдите для доступа к вашей библиотеке"
        type="Auth"
      />

      <div class="reg-footer"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthForm from "@/components/auth/AuthForm.vue";
</script>
