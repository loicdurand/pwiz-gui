<script lang="ts">

export default {
  name: 'SquareCard',
  props: {
    logo: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: false
    }
  }
}

</script>

<template>

  <div class="square-wrap">
    <div class="square">

      <button
        type="button"
        class="app-card"
        :class="logo"
      >
        <div class="card-logo">
          {{ logo }}
        </div>

        <div class="card-content">
          <h2 class="card-title">{{ title }}</h2>
        </div>

      </button>

    </div>

  </div>

</template>

<style lang="scss" scoped>
.square-wrap {
  position: relative;
  width: 100%;

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  & .square {
    position: absolute;
    width: 100%;
    height: 100%;

    & .app-card {
      cursor: pointer;
      padding: 0;
      position: relative;
      border: none;
      background: white;
      display: inline-block;
      margin: auto auto 1rem auto;
      border-radius: 19px;
      position: relative;
      text-align: center;
      box-shadow: -1px 15px 30px -12px black;
      z-index: 9999;
      width: 100%;
      height: 100%;

      &.sh {
        background-color: var(--blue-10);
        color: #fff;

        & .card-logo {
          background: var(--yellow-6);
          color: var(--grey-10);
        }
      }

      /* logo */
      & .card-logo {
        top: 0;
        height: 60%;
        border-bottom: 1px solid var(--grey-5);
        font-size: 5rem;
        text-transform: uppercase;
        font-weight: 700;
        border-top-right-radius: 19px;
        border-top-left-radius: 19px;
        position: absolute;
        width: 100%;
        padding-top: 15px;
      }

      /* fin logo */

      /* content */
      & .card-content {
        position: absolute;
        bottom: 0;
        border: none;
        height: 40%;
        width: 100%;

        & .card-title {
          font-weight: 700;
          padding: 6px 0 0 0;
          margin: 0;
          line-height: 2.2vh;
        }

      }

      /* fin content */
    }
  }
}
</style>