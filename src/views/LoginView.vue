<template>
  <LoginForm @login-event="handleLoginEvent" />
</template>
<script setup>
import { useRouter } from 'vue-router'
import LoginForm from '../components/login/LoginForm.vue'

const router = useRouter()
// login event
function handleLoginEvent() {
  router.push('/home/m/1')
}
</script>
