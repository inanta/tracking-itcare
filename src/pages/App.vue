<template>
  <div class="pt-0 pb-2">
    <div class="pb-7">
      <h1 class="bg-primary font-semibold p-5 text-center text-white text-xl">
        LACAK TIKET LAYANAN
      </h1>
    </div>
    <div class="max-w-xl mx-auto">
      <div class="text-center">
        <div class="pb-8">
          <img class="" src="../assets/img/undraw_development_re_g5hq.svg" />
        </div>
        <p class="text-secondary">
          Untuk Melihat Status Permintaan Layanan, Silahkan Masukan
          <a href="#" class="font-bold italic text-primary">Nomor Tiket</a>.
        </p>
        <div class="flex items-center justify-center mt-6 mb-5">
          <input
            v-model="ticketNumber"
            :disabled="isSearching"
            class="border border-primary font-semibold mr-3 outline-none px-5 py-3 uppercase md:w-96"
            type="number"
            pattern="[0-9]*"
            inputmode="numeric"
            placeholder="Nomor Tiket"
            @keyup.enter="fetch"
          />
          <button
            :class="{ '!bg-primary': !isSearching }"
            :disabled="isSearching"
            class="bg-secondary border border-primary font-semibold px-5 py-3 text-white uppercase"
            @click="onTrackButtonClick"
          >
            Lacak
          </button>
        </div>
      </div>
      <template v-if="isSearching">
        <div class="p-5">
          <span class="block loader"></span>
        </div>
      </template>
      <template v-else-if="isStatusShown">
        <div v-if="isTicketFound" class="animate__animated animate__fadeInUp">
          <div>
            <hr class="border border-primary mx-auto w-14" />
          </div>
          <div>
            <div class="timeline">
              <ul>
                <li v-for="item in items" :key="item.title">
                  <span>{{ item.title }}</span>
                  <div class="content">
                    <h3>{{ item.subtitle }}</h3>
                    <p>
                      {{ item.content }}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div v-else class="animate__animated animate__fadeInUp">
          <div class="p-5">
            <div>
              <h2 class="font-semibold pb-3 text-center text-primary text-xl">
                Nomor Tiket Tidak Ditemukan
              </h2>
            </div>
            <div>
              <img class="" src="../assets/img/undraw_empty_re_opql.svg" />
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      isSearching: false,
      isStatusShown: false,
      isTicketFound: false,
      items: [],
      ticketNumber: ""
    };
  },
  fetch: function () {},
  mounted: function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (id) {
      this.ticketNumber = id;
      this.fetch();
    }
  },
  methods: {
    onTrackButtonClick: function () {
      this.fetch();
    },
    fetch: function () {
      const self = this;

      self.isSearching = true;

      fetch(
        "https://dev.itcare.maranatha.edu/itcare/api/servicerequest/track/" +
          self.ticketNumber
      )
        .then((response) => response.json())
        .then((data) => {
          self.isSearching = false;
          self.isStatusShown = true;

          if (
            typeof data === "object" &&
            typeof data.length !== "undefined" &&
            data.length > 0
          ) {
            self.items = data;

            self.isTicketFound = true;
          } else {
            self.isTicketFound = false;
          }
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss">
.timeline {
  /* width: 800px; */
  /* background-color: #072736; */
  color: #fff;
  padding: 30px 20px;
  /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); */
}
.timeline ul {
  @apply border-l border-primary;

  list-style-type: none;
  /* border-left: 2px solid #094a68; */
  padding: 10px 5px;
}
.timeline ul li {
  /* @apply ml-2; */
  border-radius: 2px;
  margin-left: 5px;
  padding: 20px 20px;
  position: relative;
  cursor: pointer;
  transition: 0.5s;
}
.timeline ul li span {
  @apply bg-primary;

  display: inline-block;
  /* background-color: #1685b8; */
  border-radius: 25px;
  padding: 2px 10px;
  font-size: 15px;
  text-align: center;
}
.timeline ul li .content h3 {
  @apply font-semibold text-primary;

  /* color: #34ace0; */
  font-size: 17px;
  padding-top: 5px;
}
.timeline ul li .content p {
  @apply text-secondary;

  padding: 5px 0px 15px 0px;
  font-size: 15px;
}
.timeline ul li:before {
  @apply bg-secondary;

  display: block;
  position: absolute;
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 50%;
  left: -15px;
  top: 28px;
  transition: 0.5s;
}

.timeline ul li:first-child::before {
  @apply bg-primary;

  animation: flash; /* referring directly to the animation's @keyframe declaration */
  animation-iteration-count: infinite;
  animation-duration: 2s; /* don't forget to set a duration! */
}

.timeline ul li:hover {
  @apply bg-primary;
}
.timeline ul li:hover span {
  @apply bg-white text-primary;
}
.timeline ul li:hover .content h3 {
  @apply text-white;
}
.timeline ul li:hover .content p {
  @apply text-white;
}
.timeline ul li:hover:before {
  @apply bg-primary shadow shadow-primary;
}
</style>
