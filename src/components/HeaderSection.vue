<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <h2 class="header__inner-title">Star Wars</h2>

        <div
          :class="{ active: isActive }"
          class="header__burger"
          @click="openBurger"
        >
          <span></span>
        </div>
        <div :class="{ show: isShow }" class="header__inner-menu">
          <label>
            <select class="multilingualism">
              <option value="value1">Ru</option>
              <option value="value2" selected>En</option>
            </select>
          </label>
          <button class="header__inner-log">Log in</button>
          <button class="header__inner-sign">Sign up</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderSection",
  data() {
    return {
      isActive: false,
      isShow: false
    };
  },
  mounted() {
    this.$store.dispatch("getPersons");
  },
  methods: {
    openBurger() {
      this.isActive = !this.isActive;
      this.isShow = !this.isShow;
    }
  }
};
</script>

<style lang="scss">
.header {
  background: #f2eeee;
  box-shadow: 0 0 32px rgba(0, 0, 0, 0.03);
}

.header__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-title {
    padding: 25px 0 25px 0;
    font-weight: bold;
    font-size: 26px;
  }

  &-menu {
    padding: 16px 0 16px 0;
  }

  &-sign {
    cursor: pointer;
    color: white;
    border: none;
    background: #ff634a;
    border-radius: 6px;
    padding: 16px 57px;
  }

  &-log {
    background-color: transparent;
    border: none;
    margin: 0 50px;
  }

  .multilingualism {
    background-color: transparent;
    border: none;
  }
}

.header__burger {
  display: none;
}
.header__inner-menu.show {
  transition: all 0.3s ease 0s;
  top: 80px;
}

@media (max-width: 650px) {
  .show {
    transition-delay: 1s;
    top: 80px;
  }
  .header__inner-menu {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: -300px;
    right: 0;
    text-align: center;
    background-color: silver;
    z-index: 200;
    border-radius: 4px;
  }
  .header__inner-log {
    margin: 20px 0 20px;
  }
  .header__burger {
    display: block;
    position: relative;
    width: 30px;
    height: 20px;
    position: relative;
    z-index: 3;
  }
  .header__burger span {
    position: absolute;
    background-color: #000;
    left: 0;
    width: 100%;
    height: 2px;
    top: 9px;
    transition: all 0.3s ease 0s;
  }
  .header__burger:before,
  .header__burger:after {
    content: "";
    background-color: #000;
    position: absolute;
    width: 100%;
    height: 2px;
    left: 0;
    transition: all 0.3s ease 0s;
  }
  .header__burger:before {
    top: 0;
  }
  .header__burger:after {
    bottom: 0;
  }

  .header__burger.active span {
    transform: scale(0);
  }

  .header__burger.active:before {
    transform: rotate(45deg);
    top: 9px;
  }
  .header__burger.active:after {
    transform: rotate(-45deg);
    bottom: 9px;
  }
}
</style>
