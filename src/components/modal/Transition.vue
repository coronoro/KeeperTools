<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        ...
      </div>
    </div>
  </transition>
</template>

<style>
 .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }
</style>