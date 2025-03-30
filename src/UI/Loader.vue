<template>
  <div
    class="loader loader--style6"
    title="5"
    :id="id"
  >
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="24px"
      height="30px"
      viewBox="0 0 24 30"
      style="enable-background:new 0 0 50 50;"
      xml:space="preserve"
    >
      <rect
        x="0"
        y="13"
        width="4"
        height="5"
        fill="#333"
      >
        <animate
          attributeName="height"
          attributeType="XML"
          values="5;21;5"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          attributeType="XML"
          values="13; 5; 13"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="10"
        y="13"
        width="4"
        height="5"
        fill="#333"
      >
        <animate
          attributeName="height"
          attributeType="XML"
          values="5;21;5"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          attributeType="XML"
          values="13; 5; 13"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="20"
        y="13"
        width="4"
        height="5"
        fill="#333"
      >
        <animate
          attributeName="height"
          attributeType="XML"
          values="5;21;5"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          attributeType="XML"
          values="13; 5; 13"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  </div>
</template>

<style scoped lang="scss">
.loader {
  width: 100%;
  text-align: center;
  padding: 1em;
  position: absolute;
  z-index: 10;
  height: 97%;
  cursor: progress;
  margin-left: -16px;

  & svg {
    height: 100%;

    & path,
    & rect {
      fill: var(--blue-france-sun-113-625);
    }
  }
}
</style>

<script lang="ts">
export default {
  name: 'Loader',
  props: ['id']
};
</script>