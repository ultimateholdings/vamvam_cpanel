import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Breadcrumb from '../../../components/Breadcrumb'
import { GENDER, LANG, ROLE_USER } from "../../../utils/constants/enums";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { driverRegister, newAdmi } from "../../../store/users/users.repository";


interface IFormInput {
    firstName?: string,
    lastName?: string,
    email?: string,
    gender?: GENDER,
    age?: number,
    phoneNumber?: string,
    position?: string,
    role?: ROLE_USER,
    avatar?: any,
    carInfos?: File,
    sponsorCode?: string,
    lang?: string,
    password?: string,
    cpassword?: string,

}


export default function App() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IFormInput>({
        mode: "onTouched",
    });
    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = (data: IFormInput) => {
        if (data.role == ROLE_USER.Driver) {
            dispatch(driverRegister(data));
        } else {
            dispatch(newAdmi(data));
        }
    };

    const [form, setform] = useState<IFormInput>()


    React.useEffect(() => {
        const subscription = watch((value) => 
            setform(value)
        )
        return () => subscription.unsubscribe()
    }, [watch])


    return (
        <>
            <Breadcrumb pageName="Create new user" />

            <div className="grid">
                <div className="flex flex-col gap-9">
                    {/* <!-- Contact Form --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Add user form
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
                                            {...register("firstName", {
                                                required: false
                                            })}
                                            placeholder="Enter your first name"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Last name
                                        </label>
                                        <input
                                            type="text"
                                            {...register("lastName", {
                                                required: true
                                            })}
                                            placeholder="Enter your last name"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            {...register("email", {
                                                required: false,
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                    message: 'Enter a valid e-mail address',
                                                },
                                            })}
                                            placeholder="Enter your email"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            {...register("phoneNumber", {
                                                required: false,
                                            })}
                                            placeholder="Enter your phoneNumber"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>

                                    {/* <div className="w-full xl:w-1/2"> */}
                                    {/* <label className="mb-2.5 block text-black dark:text-white">
                                            Available
                                        </label> */}
                                    {/* <select {...register("available")} className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                                            <option value="">Select an availability</option>
                                            <option value="">Yes</option>
                                            <option value="">No</option>
                                        </select> */}
                                    {/* </div> */}


                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Gender
                                        </label>
                                        <select {...register("gender")} className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                                            {Object.values(GENDER).map((gender) => {
                                                if (typeof gender === "string") {
                                                    return <option value={gender}>{gender}</option>
                                                }
                                            })}
                                        </select>
                                    </div>
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Role
                                        </label>
                                        <select {...register("role")} className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                                            {Object.values(ROLE_USER).map((role) => {
                                                if (typeof role === "string") {
                                                    return <option value={role}>{role}</option>
                                                }
                                            })}
                                        </select>
                                    </div>

                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="mb-4.5  xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Avatar
                                        </label>
                                        <input
                                            type="file"
                                            {...register("avatar", {
                                                required: false,
                                                validate: {
                                                    lessThan10MB: (files: any) => (files[0]!.size < 10000000 || "Max 10MB"),
                                                    acceptedFormats: (files: any) => (["image/jpeg", "image/png", "image/gif", "application/pdf"].includes(files[0]!.type))
                                                },
                                            })}
                                            placeholder="Choice an avatar"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Age
                                        </label>
                                        <input
                                            type="number"
                                            {...register("age", {
                                                required: false,
                                                min: 10, max: 120
                                            })}
                                            placeholder="Enter a age"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>

                                </div>
                                {form?.role == ROLE_USER.Driver && <div className=" flex flex-col gap-6 xl:flex-row">
                                    <div className="mb-4.5 w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Sponsor Code
                                        </label>
                                        <input
                                            type="text"
                                            {...register("sponsorCode", {
                                                required: false
                                            })}
                                            placeholder="Enter your Sponsor Code"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>

                                    <div className="mb-4.5  xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Informations véhicule
                                        </label>
                                        <input
                                            type="file"
                                            {...register("carInfos", {
                                                required: false,
                                            })}
                                            placeholder="Choice a File"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>
                                </div>}

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            {...register("password", {
                                                required: false
                                            })}
                                            placeholder="Enter your Password"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            {...register("cpassword", {
                                                required: false,
                                                validate: value =>
                                                    value === watch('password') || "The passwords do not match"
                                            })}
                                            placeholder="Enter your Password"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>
                                    {errors.cpassword && <p>{errors.cpassword.message}</p>}
                                </div>
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Langue
                                        </label>
                                        <select {...register("lang")} className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                                            {Object.values(LANG).map((role) => {
                                                if (typeof role === "string") {
                                                    return <option value={role}>{role}</option>
                                                }
                                            })}
                                        </select>
                                    </div>
                                </div>

                                {/* <input type="submit" className="flex justify-center rounded bg-primary p-3 font-medium text-gray float-right" style={{ margin: "10px" }} value='En' /> */}
                                <button type="submit" className="flex justify-center rounded bg-primary p-3 font-medium text-gray float-right" style={{ margin: "10px" }}>
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}