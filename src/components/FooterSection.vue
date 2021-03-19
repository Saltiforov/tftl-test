<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <h2 class="footer__top-title">Star Wars</h2>
        <div class="footer__top-social">
          <a class="facebook-link" href="#"><img src="../assets/images/rounds-facebook.png" alt="facebook-link"></a>
          <a href="#"><img src="../assets/images/rounds.png" alt="instagram-link"></a>
        </div>
      </div>
      <div class="footer__copy">
        <p>All rights Reserved.</p>
        <p>Privacy Policy</p>
      </div>

    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterSection"
}
</script>

<style lang="scss">
.footer {
  background: #F2EEEE;

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0 65px;

    &-social {
      .facebook-link{
      padding-right: 10px;
    }

    }
  }

  &__copy {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
  }
}
</style>
