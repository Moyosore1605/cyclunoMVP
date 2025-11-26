import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { IoAddCircleOutline } from "react-icons/io5";
import { VscBeaker } from "react-icons/vsc";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { FaBug,} from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import {toast} from 'react-toastify';
import { createProduct } from '../../api/products';
import Spinner from '../../components/Spinner';

export default function CreateProduct() {
    const navigate = useNavigate();
    const [form, setForm] = useState({name:"",description:"",industry:"",platform:""});
    const [loading,setLoading] = useState(false);

    // const handleChange = (e) => {
    // setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
    // };

    const handleSubmit = async (e) => {
    e.preventDefault();
    // basic validation
    if (!form.name || !form.description || !form.industry || !form.platform) {
        toast.error("Please fill all fields");
        return;
    }

    setLoading(true);
    try {
        const res = await createProduct(form);
        localStorage.setItem("product", JSON.stringify(res.data));
        console.log('create product response',res);
        toast.success("Product created");
      navigate("/products"); // adjust route to your product list/detail
    } catch (err) {
    console.error("create product error:", err);
    const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        "Failed to create product";
        toast.error(typeof msg === "string" ? msg : JSON.stringify(msg));
    } finally {
    setLoading(false);
    }
};
if (loading) {
    return <Spinner/>
}

return (
    <main className='flex gap-5 h-screen'>
        <Link className='text-3xl text-gray-500' to='/dashboard'> <IoIosArrowBack /></Link>
        <div className='w-[70%]'>
            <h1 className='font-fraunces text-3xl font-normal mb-1'>Create Product</h1>
            <span className='text-gray-500 text-sm'>Create new product to test and execute.</span>
            <form onSubmit={handleSubmit} className='flex flex-col mt-5'>
                <label htmlFor="Product Name" className='mb-2 text-sm'>Product Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className='p-2 border border-gray-300 rounded-md bg-gray-100' />
                <label htmlFor="Description" className='mb-2 mt-5 text-sm'>Description</label>
                <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className='p-2 border border-gray-300 rounded-md bg-gray-100 h-[100px]'/>
                <label htmlFor="Industry" className='mb-2 mt-5 text-sm'>Industry</label>
                <select required value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} className="border p-3 rounded-md bg-gray-100 border-gray-300 text-gray-500 text-sm">
                    <option value="">Select industry</option>
                    <option value="Fintech">Fintech</option>
                    <option value="Banking">Banking</option>
                    <option value="Insurance">Insurance</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="EdTech">EdTech</option>
                    <option value="Saas">SaaS</option>
                    <option value="Others">Others</option>
                </select>
                <label htmlFor="Platform" className='mb-2 mt-5 text-sm'>Platform</label>
                <select required value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })} className="border p-3 rounded-md bg-gray-100 border-gray-300 text-gray-500 text-sm">
                    <option value="">Select platform</option>
                    <option value="Web App">Web App</option>
                    <option value="iOS App">iOS App</option>
                    <option value="Android App">Android App</option>
                    <option value="API">API</option>
                    <option value="Microservices">Microservices</option>
                    <option value="Desktop App">Desktop App</option>
                </select>
                <label htmlFor="Features" className='mb-2 mt-5 text-sm'>Features to be Tested</label>
                <section className='text-gray-500 flex gap-5 mb-5'>
                    <button className='p-3 w-[47%] text-sm border rounded-md'>Upload PRD</button>
                    <button className='p-3 w-[47%] text-sm border border-blue-300 rounded-md'>Enter Manually</button>
                </section>
                <button type='submit' className='w-[75%] bg-[#1B365D] text-white p-3 rounded-lg mx-auto'>Create</button>
            </form>
        </div>
        <section className='w-[24%]'>
            <div className='shadow-lg text-gray-500 p-4 rounded-md h-[200px] flex flex-col'>
                <h1 className='font-semibold'>Recent Activity</h1>
                <span className='mx-auto mt-10'>No recent activity</span>
            </div>
            <div className='shadow-lg text-gray-500 p-4 rounded-md h-[300px] flex flex-col mt-7'>
                <h1 className='font-semibold mb-2'>Quick Actions</h1>
                <p className='flex items-center mb-2 gap-2'> <HiOutlineViewGridAdd className='text-lg'/> Create Product</p>
                <p className='flex items-center mb-2 gap-2'> <IoAddCircleOutline className='text-lg'/> Add Features</p>
                <p className='flex items-center mb-2 gap-2'> <VscBeaker className='text-lg'/> Generate Test Cases</p>
                <p className='flex items-center mb-2 gap-2'> <FaBug className='text-lg'/> Log Bug</p>
            </div>
        </section>
    </main>
)
}   
