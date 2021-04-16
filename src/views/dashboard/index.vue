<template>
  <div class="dashboard-container">
    <editor-dashboard />
  </div>
</template>

<script>
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { editorDashboard }
}
</script>
