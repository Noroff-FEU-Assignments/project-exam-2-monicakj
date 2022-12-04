import "../../sass/Global.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
    name: yup.string().required("Please enter your name.").min(3, "Your name must contain at least 3 characters."),
    age: yup.number().positive().integer().required("Please enter a number value with a minimum value of 10 and a maximum value of 20.").min(10, "Required number value with a minimum value of 10.").max(20, "Required number value with a maximum value of 20."),
    website: yup.string()
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Please enter a valid URL.'
        )
        .required('Please enter a valid URL.'),
});

function Form () {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    function onSubmit(data) {
        console.log(data);
    }

    console.log(errors);

    return (
        <>
        <h1 className="index--title">Lorem Ipsum</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Email</label>
            <input {...register("email")} />
            {errors.email && <span className="error">{errors.email.message}</span>}

            <label>Password</label>
            <input {...register("password")} />
            {errors.password && <span className="error">{errors.password.message}</span>}

            <Link className="password">Forgot password?</Link>

            <br></br>
            <button type="submit">Log In</button>
            <button type="register">Register</button>
        </form>
        </>
    );
}

export default Form;