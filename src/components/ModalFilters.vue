<template>
  <div class="vmodal hmodal">
    <slot name="modal">
      <div class="vmodal__overlay hmodal__overlay">
        <div
          class="vmodal__window hmodal__window"
          v-clickOutside="closeModalHeight"
        >
          <div class="vmodal__window-top">
            <slot name="title"> </slot>
          </div>
          <slot name="rangeValue"> </slot>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: "ModalFilters",
  data() {
    return {
      heightMin: "",
      heightMax: "",
      rangeValue: [96, 200],
      min: 96,
      max: 206,
      height: 100,
      format: {
        suffix: " cm"
      }
    };
  },
  directives: {
    clickOutside: {
      beforeMount: function(el, binding) {
        // Define ourClickEventHandler
        const ourClickEventHandler = event => {
          if (
            !el.contains(event.target) &&
            el !== event.target &&
            event.target !==
              document.querySelector(".filter__height-dropdown") &&
            event.target !== document.querySelector(".filter__age-dropdown")
          ) {
            // as we are attaching an click event listern to the document (below)
            // ensure the events target is outside the element or a child of it
            binding.value(event); // before binding it
          }
        };
        // attached the handler to the element so we can remove it later easily
        el.__vueClickEventHandler__ = ourClickEventHandler;

        // attaching ourClickEventHandler to a listener on the document here
        document.addEventListener("click", ourClickEventHandler);
      },
      unmounted: function(el) {
        // Remove Event Listener
        document.removeEventListener("click", el.__vueClickEventHandler__);
      }
    }
  },
  methods: {
    changeHeight(rangeValue) {
      this.$store.commit("changeHeight", rangeValue);
    },
    closeModalHeight() {
      this.$emit("closeModalHeight");
    }
  }
};
</script>
<style src="@vueform/slider/themes/default.css"></style>
<style lang="scss">
.vmodal {
  &__window {
    width: 250px;
    height: 140px;
    background: #ffffff;
    box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.04);
    border-radius: 6px;
    position: absolute;
    top: 45px;
    left: -100px;

    &-top {
      display: flex;
      justify-content: space-between;
      padding: 12px 8px 0 8px;
    }
  }

  &__range {
    width: 194px;
    display: block;
    margin: 65px auto 0;
  }

  &__inputs {
    width: 100px;
    padding: 9px 0 9px 12px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 6px;
  }
}

.slider-connect {
  background: #ff634a;
}

.slider-tooltip {
  background: transparent;
  border: none;
  color: black;

  &:before {
    display: none;
  }
}
</style>
