import axios from 'axios';


// https://techumen-razorpay.herokuapp.com

// http://localhost:5000

const instance=axios.create({
    baseURL:'https://techumen-razorpay.herokuapp.com',
})

export default instance;