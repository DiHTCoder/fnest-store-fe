import React, { useState, useEffect, useMemo } from 'react';
import lamp from '../assets/images/lamp.png';
import userServices from '../services/userServices';
import { FormInput, SubmitButton, Loading } from '../components';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

const Contact = () => {
    const initialValues = {
        fullName: '',
        email: '',
        content: '',
    };
    const resetForm = () => {
        formik.resetForm();
    };
    const validationSchema = Yup.object({
        fullName: Yup.string().required('Họ và tên không được để trống'),
        email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
        content: Yup.string().required('Nội dung không được để trống'),
    });

    const onSubmit = async (values) => {
        console.log(values);
        try {
            await userServices.sendFeedback(values.fullName, values.email, values.content);
            toast.success('Gửi feedback thành công!');
            resetForm();
        } catch (error) {
            console.error('Error sending feedback:', error);
            toast.error('Đã xảy ra lỗi khi gửi feedback');
        }
    };
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, { resetForm }) => onSubmit(values, { resetForm }),
    });
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
                    onSubmit={formik.handleSubmit}
                >
                    <h2 id="contact" class="text-3xl font-bold">
                        Thông tin của bạn
                    </h2>
                    <div class="relative">
                        <input
                            type="text"
                            id="name"
                            name="fullName"
                            onChange={formik.handleChange}
                            value={formik.values.fullName}
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
                            htmlFor="name"
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
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            name="email"
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
                            htmlFor="email"
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
                            onChange={formik.handleChange}
                            value={formik.values.content}
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
                            htmlFor="content"
                            name="content"
                            onChange={formik.handleChange}
                            value={formik.values.content}
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
                    <button
                        type="submit"
                        role="menuitem"
                        className="
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
                    >
                        Gửi
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
