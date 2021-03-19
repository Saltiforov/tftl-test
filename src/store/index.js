import { createStore } from "vuex";

export default createStore({
  state: {
    persons: [],
    filteredPersons: [],
    eyeColor: ["blue", "blue-gray", "brown", "red", "yellow"],
    sortBy: ["age", "mass", "height"],
    sortCategory: [],
    photoPersons: [
      "Luke-Skywalker.jpg",
      "C-3PO.png",
      "R2-D2.jpg",
      "Darth-Vader.jpg",
      "Leia-Organa.jpg",
      "Owen-Lars.jpg",
      "Beru-Whitesun-lars.jpg",
      "R5-D4.jpeg",
      "Biggs-Darklighter.jpg",
      "Obi-Wan-Kenobi.jpg"
    ]
  },
  getters: {
    allPersons(state) {
      return state.filteredPersons;
    },
    filterColors(state) {
      return state.eyeColor;
    },
    sortBy(state) {
      return state.sortBy;
    }
  },
  mutations: {
    changeColor(state, payload) {
      if (payload !== "Eye color") {
        state.filteredPersons = state.persons.filter(
          item => item.eye_color === payload
        );
      } else {
        state.filteredPersons = state.persons;
      }
    },
    changeHeight(state, payload) {
      state.filteredPersons = state.persons.filter(
        item => payload[0] <= item.height && item.height <= payload[1]
      );
    },
    changeAge(state, payload) {
      state.filteredPersons = state.persons.filter(
        item => payload[0] <= item.birth_year && item.birth_year <= payload[1]
      );
    },
    changeCategory(state, payload) {
      if (payload === "mass") {
        state.filteredPersons.sort(function(a, b) {
          return a.mass - b.mass;
        });
        console.log(state.filteredPersons);
      } else if (payload === "height") {
        state.filteredPersons.sort(function(a, b) {
          return a.height - b.height;
        });
      } else if (payload === "age") {
        console.log(state.filteredPersons);
        state.filteredPersons.sort(function(a, b) {
          return a.birth_year - b.birth_year;
        });
      } else {
        state.filteredPersons = state.persons;
      }
    }
  },
  actions: {
    async getPersons() {
      const numberPattern = /\d+/g;
      const response = await fetch("https://swapi.dev/api/people/");
      const resData = await response.json();
      resData.results.map(item => this.state.persons.push(item));
      resData.results.map(item => this.state.filteredPersons.push(item));
      this.state.filteredPersons.forEach(
        item =>
          (item.birth_year = item.birth_year.match(numberPattern)?.toString())
      );
      this.state.filteredPersons.forEach(
        (item, index) => (item.homeworld = this.state.photoPersons[index])
      );
    }
  },
  modules: {}
});
