<template>
  <div
    class="relative card-animated-border rounded-2xl shadow-2xl p-1 max-w-sm w-full mb-8 border-4 border-transparent transition-transform duration-300 hover:scale-105 group"
  >
    <div
      class="bg-white rounded-xl flex flex-col items-center justify-center text-center p-6"
    >
      <!-- Header -->
      <div class="w-full flex items-center justify-center mb-3">
        <h3
          class="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue via-pink to-mauve animate-gradient-x drop-shadow-lg tracking-wide uppercase"
        >
          <slot name="header">✨ Card Header ✨</slot>
        </h3>
      </div>
      <!-- Content -->
      <p class="text-gray-800 text-base mb-4">
        <slot>Yo dawg, you didn't set content</slot>
      </p>
      <!-- Footer -->
      <div class="w-full flex items-center justify-center mt-2">
        <span
          class="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-mauve via-blue to-pink animate-gradient-x"
        >
          <slot name="footer">Card Footer 🚀</slot>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @keyframes gradient-x {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
  .animate-gradient-x {
    background-size: 200% 100%;
    animation: gradient-x 3s ease-in-out infinite;
  }

  @keyframes border-animated {
    0% {
      border-image-source: linear-gradient(120deg, #f472b6, #60a5fa, #a78bfa);
      border-image-slice: 1;
      box-shadow: 0 0 16px 2px #f472b6, 0 0 0 0 #60a5fa, 0 0 0 0 #a78bfa;
    }
    50% {
      border-image-source: linear-gradient(300deg, #a78bfa, #60a5fa, #f472b6);
      border-image-slice: 1;
      box-shadow: 0 0 24px 4px #a78bfa, 0 0 0 0 #60a5fa, 0 0 0 0 #f472b6;
    }
    100% {
      border-image-source: linear-gradient(120deg, #f472b6, #60a5fa, #a78bfa);
      border-image-slice: 1;
      box-shadow: 0 0 16px 2px #f472b6, 0 0 0 0 #60a5fa, 0 0 0 0 #a78bfa;
    }
  }
  .card-animated-border {
    border-width: 4px;
    border-style: solid;
    border-image: linear-gradient(120deg, #f472b6, #60a5fa, #a78bfa) 1;
    animation: border-animated 4s linear infinite;
    transition: box-shadow 0.3s, border-image-source 0.3s;
  }
  .card-animated-border:hover {
    box-shadow: 0 0 32px 8px #f472b6, 0 0 24px 4px #60a5fa, 0 0 24px 4px #a78bfa;
    border-image: linear-gradient(300deg, #a78bfa, #60a5fa, #f472b6) 1;
  }
</style>
