<template>
  <header-section/>
  <persons-card/>
  <footer-section/>
</template>

<script>
import HeaderSection from "@/components/HeaderSection";
import FooterSection from "@/components/FooterSection";
import PersonsCard from "@/components/PersonsCard";
export default {
  name: "Home",
  components: {
    PersonsCard,
    FooterSection,
    HeaderSection
  }
}
</script>

<style scoped>

</style>
