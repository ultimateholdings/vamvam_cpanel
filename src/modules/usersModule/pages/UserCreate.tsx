import * as React from "react";
import ReactDOM from "react-dom";
import { useForm,SubmitHandler } from "react-hook-form";
import Breadcrumb from '../../../components/Breadcrumb'


enum GenderEnum {
    female = "female",
    male = "male"
  }
enum RoleEnum {
    role1 = "role1",
    role2 = "role2"
  }


interface IFormInput {
  firstname: string
  lastname: string
  email: string
  available: boolean
  gender: GenderEnum
  age: number
  position: string
  role: RoleEnum
  avatar: number
}


export default function App() {
    const {
        form,
        handleSubmit,
        watch,
        formState: { errors }
      } = useForm<IFormInput>();
    
      const onSubmit = (data: IFormInput) => {
        alert(JSON.stringify(data));
      };


  return (
    <>
    <Breadcrumb pageName="Create new user" />

    <div className="grid">
        <div className="flex flex-col gap-9">
            {/* <!-- Contact Form --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        add user Form
                    </h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-6.5">
                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    First name
                                </label>
                                <input
                                    type="text"
                                    {...form("firstname", {
                                        required: true
                                      })}
                                    placeholder="Enter your first name"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                                {errors?.firstname?.type === "required" && <p>This field is required</p>}
                            </div>

                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Last name
                                </label>
                                <input
                                    type="text"
                                    {...form("firstname", {
                                        required: true
                                      })}
                                    placeholder="Enter your last name"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                                {errors?.firstname?.type === "required" && <p>This field is required</p>}
                            </div>
                        </div>
                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    {...form("firstname", {
                                        required: true,
                                        maxLength: 20,
                                        pattern: /^[A-Za-z]+$/i
                                      })}
                                    placeholder="Enter your email"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                                {errors?.firstname?.type === "required" && <p>This field is required</p>}
                            </div>

                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Available
                                </label>
                                <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                                    <option value="">Select an availability</option>
                                    <option value="">Yes</option>
                                    <option value="">No</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Gender
                                </label>
                                <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                                    <option value="">Select a gender</option>
                                    <option value="">Male</option>
                                    <option value="">Female</option>
                                </select>
                            </div>

                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Age
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter a age"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                        </div>
                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Position
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter a position"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Role
                                </label>
                                <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                                    <option value="">Select role</option>
                                    <option value="">USA</option>
                                    <option value="">UK</option>
                                    <option value="">Canada</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Avatar
                            </label>
                            <input
                                type="file"
                                placeholder="Choice an avatar"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>
                        
                        <button className="flex justify-center rounded bg-primary p-3 font-medium text-gray float-right" style={{margin:"10px"}}>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</>
  )
}