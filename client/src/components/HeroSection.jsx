export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[70vh] flex items-center justify-center text-center px-6">
      <img
        src="https://i.ytimg.com/vi/HvPVR9iKFFg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCM1DvCL5wpFnrIi6faTdnzv32ToQ"
        alt="Study Background"
        className="w-full h-auto object-contain"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg max-w-3xl">
          StudBuddy – Your Smart Study Companion
        </h1>
        <p className="mt-4 max-w-xl text-white text-lg drop-shadow-md">
          Plan smarter, track progress, and achieve your study goals.
        </p>
        <div className="mt-8 flex gap-6">
          <button className="bg-yellow-400 text-green-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-all shadow-lg">
            Get Started
          </button>
          <button className="border-2 border-yellow-400 text-yellow-400 px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 hover:text-green-900 transition-all shadow-lg">
            Plan a Session
          </button>
        </div>
      </div>
    </section>
  );
}
