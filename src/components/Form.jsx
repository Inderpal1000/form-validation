import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Form = () => {
    const initialValues = {
        name: '',
        email: '',
        password: '',
        phone: ''
    };

    const [formValues, setFormValues] = useState(initialValues);
    const [submittedForms, setSubmittedForms] = useState([]);
    const [captchaValue, setCaptchaValue] = useState('');
    const [captcha, setCaptcha] = useState(false);
    const [firstNo, setFirstNo] = useState(0);
    const [secondNo, setSecondNo] = useState(0);

    const generateCaptcha = () => {
        setFirstNo(Math.floor(Math.random() * 10));
        setSecondNo(Math.floor(Math.random() * 10));
        setCaptchaValue('');
        setCaptcha(false);
    };

    useEffect(() => {
        generateCaptcha(); 
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleCaptcha = () => {
        const answer = firstNo + secondNo;
        if (parseInt(captchaValue) !== answer) {
            toast.error('Wrong Captcha! Try again.');
            generateCaptcha();
        } else {
            setCaptcha(true);
            toast.success('Captcha Verified!');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^[1-9][0-9]{9}$/;

        if (formValues.name.trim() === '') return toast.error('Name is required!');
        if (formValues.name.length < 3) return toast.error('Name must be at least 3 characters');
        if (formValues.email.trim() === '') return toast.error('Email is required!');
        if (!emailRegex.test(formValues.email)) return toast.error('Invalid Email Address!');
        if (formValues.password.trim() === '') return toast.error('Password is required!');
        if (formValues.password.length < 6) return toast.error('Password must be at least 6 characters');
        if (formValues.phone.trim() === '') return toast.error('Phone Number is required!');
        if (!phoneRegex.test(formValues.phone)) return toast.error('Invalid Phone Number');

        if (!captcha) return toast.error('Please verify the captcha first!');

        toast.success('Form Submitted!');
        console.log(formValues);
        setSubmittedForms([...submittedForms, formValues]);
        setFormValues(initialValues);
        generateCaptcha(); 
    };

    useEffect(() => {
        const storedData = localStorage.getItem('formData');
        if (storedData) {
            setSubmittedForms(JSON.parse(storedData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify(submittedForms));
    }, [submittedForms]);

    return (
        <>
            <ToastContainer position="bottom-right" autoClose={1500} theme="colored" />
            <div className='w-[400px] h-auto py-3 px-4 bg-white rounded-md shadow-md'>
                <form onSubmit={handleSubmit} autoComplete='off'>
                    <h1 className='text-2xl font-bold mb-4'>Registration Form</h1>

                    <div className='my-2'>
                        <label className='font-semibold text-lg' htmlFor="name">Name</label>
                        <input className='w-full border border-violet-500 p-2 rounded-sm font-semibold text-md focus:border-violet-500 focus:outline-none'
                            onChange={handleChange} value={formValues.name} type="text" id='name' name='name' placeholder='Enter UserName' />
                    </div>

                    <div className='my-2'>
                        <label className='font-semibold text-lg' htmlFor="email">Email</label>
                        <input className='w-full border border-violet-500 p-2 rounded-sm font-semibold text-md focus:border-violet-500 focus:outline-none'
                            onChange={handleChange} value={formValues.email} type="email" id='email' name='email' placeholder='Enter Email' />
                    </div>

                    <div className='my-2'>
                        <label className='font-semibold text-lg' htmlFor="password">Password</label>
                        <input className='w-full border border-violet-500 p-2 rounded-sm font-semibold text-md focus:border-violet-500 focus:outline-none'
                            onChange={handleChange} value={formValues.password} type="password" id='password' name='password' placeholder='Enter Password' />
                    </div>

                    <div className='my-2'>
                        <label className='font-semibold text-lg' htmlFor="phone">Phone Number</label>
                        <input className='w-full border border-violet-500 p-2 rounded-sm font-semibold text-md focus:border-violet-500 focus:outline-none'
                            onChange={handleChange} value={formValues.phone} type="number" id='phone' name='phone' placeholder='Enter Phone Number' />
                    </div>

                    <div className='my-2'>
                        <span className='font-semibold text-lg'>Captcha</span>
                        <div className='flex items-center mt-1'>
                            <span className='text-lg font-bold'>{firstNo}</span>
                            <span className='mx-1 text-lg font-bold'>+</span>
                            <span className='text-lg font-bold'>{secondNo}</span>
                            <span className='mx-1 text-lg font-bold'>=</span>
                            <input type="number" value={captchaValue} onChange={(e) => setCaptchaValue(e.target.value)}
                                className='border border-black p-1 text-lg w-16 focus:outline-none' />
                        </div>
                    </div>

                    <button type='button' onClick={handleCaptcha} className='bg-green-700 mt-3 text-white py-2 px-4 rounded-sm font-semibold hover:bg-green-500'>
                        Verify Captcha
                    </button>

                    <button type='submit' className='bg-violet-700 mt-3 ml-2 text-white py-2 px-4 rounded-sm font-semibold hover:bg-violet-500'>
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default Form;
