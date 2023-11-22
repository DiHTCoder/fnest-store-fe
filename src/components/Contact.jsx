import React from 'react';
import lamp from '../assets/images/lamp.png';

const Contact = () => {
    return (
        <section aria-labelledby="contact" class="container mx-auto px-8 overflow-hidden">
            <div class="flex flex-wrap justify-center gap-12 md:gap-6 lg:gap-20">
                <div class="md:flex-1 md:max-w-sm relative">
                    <img src={lamp} alt="Lamp" class="mx-auto mt-[30px]" />
                    <a
                        href="#"
                        class="
        py-2
        px-6
        bg-info
        text-xl
        text-white
        dark:text-neutral-900
        w-max
        mx-auto
        mt-12
        md:mb-12
        flex
        gap-2
        shadow-xl
        hover:shadow-none
        transition-shadow
        focus:outline-none
        focus-visible:ring-4
        ring-neutral-900
        rounded-md
        ring-offset-4
        ring-offset-white
        dark:ring-amber-400
        dark:ring-offset-neutral-800
      "
                    >
                        <span>VỀ FNEST</span>
                    </a>
                    {/* <img src="/assets/app.svg" alt="app" width="240" class="hidden md:block drop-shadow-xl absolute left-1/2 -translate-x-1/2 max-w-16 xl:max-w-xs"/> */}
                </div>
                <form
                    class="
      relative
      border-8
      border-neutral-900
      p-6
      rounded-lg
      grid
      gap-8
      md:flex-1
      md:max-w-lg
      my-4
      md:my-12
      lg:my-16
      bg-white
      dark:bg-neutral-800
      w-full
  "
                >
                    <h2 id="contact" class="text-3xl font-bold">
                        Thông tin của bạn
                    </h2>
                    <div class="relative">
                        <input
                            type="text"
                            id="name"
                            class="
      peer
      form-input
      w-full
      border-4
      border-amber-400
      rounded-md
      focus:ring-4
      dark:focus:ring-offset-2
      focus:ring-amber-400
      focus:border-amber-400
      focus:outline-none
      dark:bg-amber-400
      dark:text-neutral-900
      placeholder-transparent
  "
                            placeholder="Họ và tên"
                        />
                        <label
                            for="name"
                            class="
    text-neutral-500
    text-sm
    font-bold
    uppercase
    absolute
    -top-4
    left-2
    -translate-y-1/2
    transition-all
    peer-placeholder-shown:left-4
    peer-placeholder-shown:top-1/2
    peer-placeholder-shown:text-neutral-900
    peer-focus:-top-4
    peer-focus:left-2
    peer-focus:text-neutral-600
    dark:peer-focus:text-neutral-300
  "
                        >
                            Họ và tên
                        </label>
                    </div>
                    <div class="relative">
                        <input
                            type="email"
                            id="email"
                            class="
      peer
      form-input
      w-full
      border-4
      border-amber-400
      rounded-md
      focus:ring-4
      dark:focus:ring-offset-2
      focus:ring-amber-400
      focus:border-amber-400
      focus:outline-none
      dark:bg-amber-400
      dark:text-neutral-900
      placeholder-transparent
    "
                            placeholder="Your Email"
                        />
                        <label
                            for="email"
                            class="
    text-neutral-500
    text-sm
    font-bold
    uppercase
    absolute
    -top-4
    left-2
    -translate-y-1/2
    transition-all
    peer-placeholder-shown:left-4
    peer-placeholder-shown:top-1/2
    peer-placeholder-shown:text-neutral-900
    peer-focus:-top-4
    peer-focus:left-2
    peer-focus:text-neutral-600
    dark:peer-focus:text-neutral-300
  "
                        >
                            Địa chỉ email
                        </label>
                    </div>
                    <div class="relative">
                        <textarea
                            name="content"
                            id="content"
                            cols="20"
                            rows="5"
                            class="
    peer
    form-textarea
    resize-none
    w-full
    border-4
    border-amber-400
    rounded-md
    focus:ring-4
    dark:focus:ring-offset-2
    focus:ring-amber-400
    focus:border-amber-400
    focus:outline-none
    dark:bg-amber-400
    dark:text-neutral-900
    placeholder-transparent
  "
                            placeholder="How can we help?"
                        ></textarea>
                        <label
                            for="content"
                            class="
      text-neutral-500
      text-sm
      font-bold
      uppercase
      absolute
      -top-3
      left-2
      -translate-y-1/2
      transition-all
      peer-placeholder-shown:left-4
      peer-placeholder-shown:top-6
      peer-placeholder-shown:text-neutral-900
      peer-focus:-top-4
      peer-focus:left-2
      peer-focus:text-neutral-600
      dark:peer-focus:text-neutral-300
    "
                        >
                            Bạn cần chúng tôi hỗ trợ?
                        </label>
                    </div>
                    <a
                        role="menuitem"
                        class="
    py-2
    px-6
    bg-neutral-900
    text-white
    w-max
    shadow-xl
    hover:shadow-none
    transition-shadow
    focus:outline-none
    focus-visible:ring-4
    ring-neutral-900
    rounded-md
    ring-offset-4
    ring-offset-white
    dark:ring-offset-amber-400
  "
                        href="/"
                    >
                        Gửi
                    </a>
                </form>
            </div>
        </section>
    );
};

export default Contact;
