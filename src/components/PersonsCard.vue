<template>
  <main class="persons">
    <div class="container">
      <h3 class="persons__title">People</h3>
      <div class="persons__filters">
        <div class="persons__filters-options filter">
          <label>
            <select
              class="filter__color"
              @change="changeColor(filterColor)"
              v-model="filterColor"
            >
              <option selected>Eye color</option>
              <option v-for="color in filterColors" :key="color.id"
                >{{ color }}
              </option>
            </select>
          </label>

          <div class="filter__height">
            <p @click="showModal = true" class="filter__height-dropdown">
              Height
            </p>
            <i class="fas fa-chevron-down"></i>
            <modal-filters
              v-if="showModal"
              @closeModalHeight="closeModalHeight"
            >
              <template v-slot:title>
                <label>
                  <input
                    class="vmodal__inputs"
                    type="text"
                    placeholder="-"
                    v-model="rangeValue[0]"
                  />
                </label>
                <label>
                  <input
                    class="vmodal__inputs"
                    type="text"
                    placeholder="-"
                    v-model="rangeValue[1]"
                  />
                </label>
              </template>
              <template v-slot:rangeValue>
                <Slider
                  class="vmodal__range"
                  @change="changeHeight(rangeValue)"
                  v-model="rangeValue"
                  :format="format"
                  :min="min"
                  :max="max"
                  :height="height"
                />
              </template>
            </modal-filters>

            <modal-filters
              v-if="showModalAge"
              @closeModalHeight="closeModalHeight"
            >
              <template v-slot:title>
                <label>
                  <input
                    class="vmodal__inputs"
                    type="text"
                    placeholder="-"
                    v-model="rangeValueAge[0]"
                  />
                </label>
                <label>
                  <input
                    class="vmodal__inputs"
                    type="text"
                    placeholder="-"
                    v-model="rangeValueAge[1]"
                  />
                </label>
              </template>
              <template v-slot:rangeValue>
                <Slider
                  class="vmodal__range"
                  @change="changeAge(rangeValueAge)"
                  v-model="rangeValueAge"
                  :format="formatAge"
                  :min="minAge"
                  :max="maxAge"
                  :height="height"
                />
              </template>
            </modal-filters>
          </div>

          <div class="filter__age">
            <p class="filter__age-dropdown" @click="showModalAge = true">Age</p>
            <i class="fas fa-chevron-down"></i>
          </div>
        </div>

        <label>
          <select
            class="sort"
            @change="selectCategory(category)"
            v-model="category"
          >
            <option selected>Sort by</option>
            <option v-for="category in sortBy" :key="category.id"
              >{{ category }}
            </option>
          </select>
        </label>
      </div>
      <div class="persons__inner">
        <div
          class="persons__inner-item persons__item"
          v-for="person in allPersons"
          :key="person.id"
          :style="{
            backgroundImage:
              'url(' + require(`@/assets/images/${person.homeworld}`) + ')'
          }"
        >
          <div class="persons__item-bb">{{ person.birth_year }}BBY</div>
          <div class="persons__item-name">{{ person.name }}</div>
          <div class="persons__item-characteristic">
            <ul class="characteristic__list">
              <li>Eye color : {{ person.eye_color }}</li>
              <li>Height : {{ person.height }}</li>
              <li>Mass : {{ person.mass }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import Slider from "@vueform/slider";
import ModalFilters from "@/components/ModalFilters";

export default {
  name: "PersonsCard",
  data() {
    return {
      showModal: false,
      showModalAge: false,
      filterColor: "Eye color",
      category: "Sort by",
      searchPersons: [],
      heightMin: "",
      heightMax: "",
      rangeValue: [96, 200],
      min: 96,
      max: 206,
      height: 100,
      format: {
        suffix: " cm"
      },
      rangeValueAge: [12, 112],
      minAge: 12,
      maxAge: 112,
      formatAge: {
        suffix: " BBY"
      }
    };
  },
  components: {
    ModalFilters,
    Slider
  },
  computed: {
    ...mapGetters(["allPersons", "filterColors", "sortBy"])
  },
  methods: {
    changeColor(color) {
      this.$store.commit("changeColor", color);
    },
    closeModalHeight() {
      this.showModal = false;
      this.showModalAge = false;
    },
    selectCategory(category) {
      this.$store.commit("changeCategory", category);
    },
    changeHeight(rangeValue) {
      this.$store.commit("changeHeight", rangeValue);
    },
    changeAge(rangeValue) {
      this.$store.commit("changeAge", rangeValue);
    }
  },
  watch: {
    rangeValue() {
      window.history.pushState(
        null,
        document.title,
        `${window.location.pathname}?Height=${this.rangeValue}`
      );
    },
    rangeValueAge() {
      window.history.pushState(
        null,
        document.title,
        `${window.location.pathname}?Age=${this.rangeValueAge}`
      );
    },
    filterColor() {
      window.history.pushState(
        null,
        document.title,
        `${window.location.pathname}?Eye_color=${this.filterColor}`
      );
    },
    category() {
      window.history.pushState(
        null,
        document.title,
        `${window.location.pathname}?Sort_by=${this.category}`
      );
    }
  }
};
</script>

<style lang="scss">
.persons {
  &__title {
    margin: 64px 0 24px;
    font-size: 32px;
  }
}

.persons__filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter__color,
.filter__height,
.filter__age,
.sort {
  background-color: transparent;
  font-family: "HelveticaRegular";
  border: none;
  font-size: 16px;
}
.persons__inner {
  display: flex;
  flex-wrap: wrap;
  margin-top: 48px;
}

.persons__item {
  width: 608px;
  height: 410px;
  background-color: bisque;
  border-radius: 6px;
  margin-bottom: 10px;
  background-position: center;
  color: white;

  &:nth-child(odd) {
    margin-right: 10px;
  }

  &-bb {
    padding: 21px 0 0 24px;
  }

  &-name {
    padding: 21px 0 0 24px;
  }
}

.filter {
  display: flex;
  align-items: center;

  &__height {
    display: flex;
    position: relative;
    margin: 0 55px;

    &-dropdown {
      cursor: pointer;
    }

    i {
      position: absolute;
      right: -15px;
      top: 22px;
      font-size: 10px;
    }
  }

  &__age {
    display: flex;
    position: relative;

    &-dropdown {
      cursor: pointer;
    }

    i {
      position: absolute;
      right: -15px;
      top: 22px;
      font-size: 10px;
    }
  }
}

.characteristic__list {
  display: flex;
  align-items: center;
  padding-left: 24px;
  font-family: "HelveticaThin";
  font-size: 14px;

  li {
    list-style: none;
    padding: 0 10px;

    &:nth-child(1) {
      padding-left: 0;
    }
  }
}

@media (max-width: 1250px) {
  .persons__inner {
    justify-content: center;
  }
  .persons__item:nth-child(odd) {
    margin-right: 0;
  }
}
@media (max-width: 440px) {
  .persons__filters {
    flex-direction: column-reverse;
  }
  .filter__height {
    margin: 0 50px 0 35px;
  }
  .persons__filters-options {
    width: 280px;
  }
}
</style>
